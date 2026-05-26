// Server-only geo helpers (uses next/headers + cookies).
import { cookies, headers } from "next/headers";
import { CURRENCIES, type CurrencyCode } from "./currency";

export type { CurrencyCode };
export { CURRENCIES, formatInCurrency, convertFromInr } from "./currency";

const COUNTRY_TO_CURRENCY: Record<string, CurrencyCode> = {
  IN: "INR", US: "USD", CA: "USD",
  GB: "GBP", UK: "GBP", IE: "EUR", DE: "EUR", FR: "EUR", ES: "EUR", IT: "EUR", NL: "EUR",
  AE: "AED", SA: "AED", QA: "AED",
  SG: "SGD",
  AU: "AUD", NZ: "AUD",
};

export async function getDisplayCurrency(): Promise<CurrencyCode> {
  const c = await cookies();
  const override = c.get("mc_currency")?.value as CurrencyCode | undefined;
  if (override && CURRENCIES.some((x) => x.code === override)) return override;

  const h = await headers();
  const country = (
    h.get("x-vercel-ip-country") ||
    h.get("cf-ipcountry") ||
    h.get("x-country-code") ||
    ""
  ).toUpperCase();
  if (country && COUNTRY_TO_CURRENCY[country]) return COUNTRY_TO_CURRENCY[country];

  const lang = (h.get("accept-language") || "").toLowerCase();
  if (lang.includes("en-gb")) return "GBP";
  if (lang.includes("en-au")) return "AUD";
  if (lang.includes("en-sg")) return "SGD";
  if (lang.includes("en-us")) return "USD";

  return "INR";
}
