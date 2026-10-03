import { prisma } from "./prisma";

// Ziina hosted checkout (https://docs.ziina.com). We create a payment intent,
// send the learner to its redirect_url, and re-read the intent server-side when
// they come back — the redirect itself is never trusted.
const API = "https://api-v2.ziina.com/api";

export const ziinaEnabled = () => !!process.env.ZIINA_API_KEY;

type PaymentIntent = { id: string; status: string; redirect_url: string };

async function ziina(path: string, body?: unknown): Promise<PaymentIntent> {
  const res = await fetch(`${API}${path}`, {
    method: body ? "POST" : "GET",
    headers: { Authorization: `Bearer ${process.env.ZIINA_API_KEY}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Ziina ${path} failed: ${res.status} ${await res.text().catch(() => "")}`);
  return res.json();
}

// ponytail: always charges USD (the site's base currency; Ziina settles in AED).
// Charge the visitor's display currency here if that's ever wanted.
export function createPaymentIntent(o: { amountUsd: number; message: string; successUrl: string; cancelUrl: string }) {
  return ziina("/payment_intent", {
    amount: Math.round(o.amountUsd * 100), // base units (cents)
    currency_code: "USD",
    message: o.message,
    success_url: o.successUrl,
    cancel_url: o.cancelUrl,
    failure_url: o.cancelUrl,
    test: process.env.ZIINA_TEST_MODE !== "false", // live only when explicitly switched off
  });
}

// Asks Ziina whether the enrollment's payment intent completed and records it.
// Idempotent; returns true when the enrollment is paid.
export async function syncPayment(e: { id: string; paymentId: string | null; paidAt: Date | null }) {
  if (e.paidAt) return true;
  if (!e.paymentId || !ziinaEnabled()) return false;
  const intent = await ziina(`/payment_intent/${e.paymentId}`);
  if (intent.status !== "completed") return false;
  await prisma.enrollment.update({ where: { id: e.id }, data: { paidAt: new Date() } });
  return true;
}
