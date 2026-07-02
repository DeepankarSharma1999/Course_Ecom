// Server-only geo helpers (uses next/headers + cookies).
import { cookies, headers } from "next/headers";
import { cache } from "react";
import { prisma } from "./prisma";
import { DEFAULT_CURRENCIES, resolveCurrencies, type CurrencyCode, type CurrencyConfig } from "./currency";

export type { CurrencyCode, CurrencyConfig };
export { CURRENCIES, DEFAULT_CURRENCIES, resolveCurrencies, formatInCurrency, convertFromUsd } from "./currency";

const COUNTRY_TO_CURRENCY: Record<string, CurrencyCode> = {
  US: "USD", IN: "INR", CA: "CAD",
  GB: "GBP", UK: "GBP",
  IE: "EUR", DE: "EUR", FR: "EUR", ES: "EUR", IT: "EUR", NL: "EUR", BE: "EUR", AT: "EUR", FI: "EUR",
  AE: "AED", SA: "SAR", QA: "QAR", KW: "KWD", BH: "BHD", OM: "OMR",
  SG: "SGD", AU: "AUD", NZ: "NZD",
  CH: "CHF", SE: "SEK", NO: "NOK", DK: "DKK", PL: "PLN",
  EG: "EGP", ZA: "ZAR", NG: "NGN", KE: "KES",
  MY: "MYR", ID: "IDR", TH: "THB", PH: "PHP", VN: "VND", JP: "JPY", KR: "KRW", HK: "HKD",
  BR: "BRL", MX: "MXN", AR: "ARS", CL: "CLP", CO: "COP",
  LK: "LKR", BD: "BDT", PK: "PKR", NP: "NPR", TR: "TRY",
};

/**
 * The resolved currency configuration (admin overrides merged over defaults),
 * cached per-request. Use this to format prices and populate the switcher.
 */
export const getCurrencyConfig = cache(async (): Promise<{
  currencies: CurrencyConfig[];
  enabled: CurrencyConfig[];
  defaultCurrency: CurrencyCode;
}> => {
  let currencies = DEFAULT_CURRENCIES;
  let defaultCurrency: CurrencyCode = "USD";
  try {
    const s = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });
    currencies = resolveCurrencies((s as any)?.currencyConfig);
    defaultCurrency = (s as any)?.defaultCurrency || "USD";
  } catch { /* defaults */ }
  const enabled = currencies.filter((c) => c.enabled);
  if (!enabled.some((c) => c.code === defaultCurrency)) defaultCurrency = enabled[0]?.code ?? "USD";
  return { currencies, enabled, defaultCurrency };
});

export async function getDisplayCurrency(): Promise<CurrencyCode> {
  const { enabled, defaultCurrency } = await getCurrencyConfig();
  const isEnabled = (code?: string) => !!code && enabled.some((x) => x.code === code);

  const c = await cookies();
  const override = c.get("mc_currency")?.value;
  if (isEnabled(override)) return override!;

  const h = await headers();
  const country = (
    h.get("x-vercel-ip-country") ||
    h.get("cf-ipcountry") ||
    h.get("x-country-code") ||
    ""
  ).toUpperCase();
  if (country && isEnabled(COUNTRY_TO_CURRENCY[country])) return COUNTRY_TO_CURRENCY[country];

  return defaultCurrency;
}
