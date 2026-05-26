// Pure currency helpers — safe for both client and server components.
// Do NOT import next/headers here.

export type CurrencyCode = "INR" | "USD" | "GBP" | "AED" | "SGD" | "AUD" | "EUR";

export const CURRENCIES: { code: CurrencyCode; label: string; symbol: string; inrPer: number }[] = [
  { code: "INR", label: "Indian Rupee",     symbol: "₹",  inrPer: 1 },
  { code: "USD", label: "US Dollar",        symbol: "$",  inrPer: 83 },
  { code: "GBP", label: "British Pound",    symbol: "£",  inrPer: 106 },
  { code: "EUR", label: "Euro",             symbol: "€",  inrPer: 90 },
  { code: "AED", label: "UAE Dirham",       symbol: "د.إ", inrPer: 22.6 },
  { code: "SGD", label: "Singapore Dollar", symbol: "S$", inrPer: 62 },
  { code: "AUD", label: "Australian Dollar",symbol: "A$", inrPer: 55 },
];

export function convertFromInr(amountInr: number, target: CurrencyCode) {
  const cfg = CURRENCIES.find((c) => c.code === target);
  if (!cfg) return amountInr;
  if (cfg.code === "INR") return amountInr;
  return Math.round(amountInr / cfg.inrPer);
}

export function formatInCurrency(amountInr: number | null | undefined, currency: CurrencyCode) {
  if (amountInr == null) return "—";
  const cfg = CURRENCIES.find((c) => c.code === currency)!;
  const v = convertFromInr(amountInr, currency);
  const locale =
    currency === "INR" ? "en-IN" :
    currency === "GBP" ? "en-GB" :
    currency === "EUR" ? "en-IE" :
    currency === "AUD" ? "en-AU" :
    currency === "SGD" ? "en-SG" :
    currency === "AED" ? "en-AE" : "en-US";
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency: cfg.code, maximumFractionDigits: 0 }).format(v);
  } catch {
    return `${cfg.symbol}${v.toLocaleString()}`;
  }
}
