import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { syncPayment } from "@/lib/ziina";

// Ziina sends the learner here after checkout. The query string proves nothing:
// the payment intent stored on the enrollment is re-read from Ziina.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const enrollment = await prisma.enrollment.findUnique({ where: { id: url.searchParams.get("e") ?? "" } });
  const paid = enrollment ? await syncPayment(enrollment).catch(() => false) : false;
  return NextResponse.redirect(new URL(`/home/purchases?payment=${paid ? "success" : "pending"}`, url.origin));
}
