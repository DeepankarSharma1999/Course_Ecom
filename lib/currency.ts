// Pure currency helpers — safe for both client and server components.
// Do NOT import next/headers here.
//
// Model: course prices are stored in USD (the base). Every other currency is
//   displayed = usd * perUsd * (1 + premiumPct/100)
// `perUsd` (FX rate) and `premiumPct` (markup/markdown) are admin-editable and
// live in SiteSettings.currencyConfig; the values below are the built-in
// fallback defaults used when the admin hasn't overridden a currency.

export type CurrencyCode = string;

export type CurrencyConfig = {
  code: CurrencyCode;
  label: string;
  symbol: string;
  perUsd: number;      // units of this currency per 1 USD
  premiumPct: number;  // + = premium (dearer), - = discount (cheaper)
  enabled: boolean;    // show in the switcher
  locale?: string;     // Intl locale for formatting
};

// perUsd = approximate FX (admin overrides live). premiumPct default 0.
export const DEFAULT_CURRENCIES: CurrencyConfig[] = [
  { code: "USD", label: "US Dollar",         symbol: "$",   perUsd: 1,     premiumPct: 0, enabled: true, locale: "en-US" },
  { code: "INR", label: "Indian Rupee",      symbol: "₹",   perUsd: 83,    premiumPct: 0, enabled: true, locale: "en-IN" },
  { code: "GBP", label: "British Pound",     symbol: "£",   perUsd: 0.78,  premiumPct: 0, enabled: true, locale: "en-GB" },
  { code: "EUR", label: "Euro",              symbol: "€",   perUsd: 0.92,  premiumPct: 0, enabled: true, locale: "en-IE" },
  { code: "AED", label: "UAE Dirham",        symbol: "د.إ", perUsd: 3.67,  premiumPct: 0, enabled: true, locale: "en-AE" },
  { code: "SGD", label: "Singapore Dollar",  symbol: "S$",  perUsd: 1.35,  premiumPct: 0, enabled: true, locale: "en-SG" },
  { code: "AUD", label: "Australian Dollar", symbol: "A$",  perUsd: 1.52,  premiumPct: 0, enabled: true, locale: "en-AU" },
  { code: "CAD", label: "Canadian Dollar",   symbol: "C$",  perUsd: 1.36,  premiumPct: 0, enabled: true, locale: "en-CA" },
  { code: "CHF", label: "Swiss Franc",       symbol: "CHF", perUsd: 0.88,  premiumPct: 0, enabled: true, locale: "de-CH" },
  { code: "SEK", label: "Swedish Krona",     symbol: "kr",  perUsd: 10.5,  premiumPct: 0, enabled: true, locale: "sv-SE" },
  { code: "NOK", label: "Norwegian Krone",   symbol: "kr",  perUsd: 10.7,  premiumPct: 0, enabled: true, locale: "nb-NO" },
  { code: "DKK", label: "Danish Krone",      symbol: "kr",  perUsd: 6.9,   premiumPct: 0, enabled: true, locale: "da-DK" },
  { code: "PLN", label: "Polish Złoty",      symbol: "zł",  perUsd: 3.95,  premiumPct: 0, enabled: true, locale: "pl-PL" },
  { code: "SAR", label: "Saudi Riyal",       symbol: "﷼",   perUsd: 3.75,  premiumPct: 0, enabled: true, locale: "ar-SA" },
  { code: "QAR", label: "Qatari Riyal",      symbol: "﷼",   perUsd: 3.64,  premiumPct: 0, enabled: true, locale: "ar-QA" },
  { code: "KWD", label: "Kuwaiti Dinar",     symbol: "د.ك", perUsd: 0.31,  premiumPct: 0, enabled: true, locale: "ar-KW" },
  { code: "BHD", label: "Bahraini Dinar",    symbol: ".د.ب",perUsd: 0.38,  premiumPct: 0, enabled: true, locale: "ar-BH" },
  { code: "OMR", label: "Omani Rial",        symbol: "﷼",   perUsd: 0.38,  premiumPct: 0, enabled: true, locale: "ar-OM" },
  { code: "EGP", label: "Egyptian Pound",    symbol: "£",   perUsd: 48,    premiumPct: 0, enabled: true, locale: "ar-EG" },
  { code: "ZAR", label: "South African Rand",symbol: "R",   perUsd: 18.5,  premiumPct: 0, enabled: true, locale: "en-ZA" },
  { code: "NGN", label: "Nigerian Naira",    symbol: "₦",   perUsd: 1500,  premiumPct: 0, enabled: true, locale: "en-NG" },
  { code: "KES", label: "Kenyan Shilling",   symbol: "KSh", perUsd: 130,   premiumPct: 0, enabled: true, locale: "en-KE" },
  { code: "MYR", label: "Malaysian Ringgit", symbol: "RM",  perUsd: 4.7,   premiumPct: 0, enabled: true, locale: "ms-MY" },
  { code: "IDR", label: "Indonesian Rupiah", symbol: "Rp",  perUsd: 15800, premiumPct: 0, enabled: true, locale: "id-ID" },
  { code: "THB", label: "Thai Baht",         symbol: "฿",   perUsd: 36,    premiumPct: 0, enabled: true, locale: "th-TH" },
  { code: "PHP", label: "Philippine Peso",   symbol: "₱",   perUsd: 57,    premiumPct: 0, enabled: true, locale: "en-PH" },
  { code: "VND", label: "Vietnamese Dong",   symbol: "₫",   perUsd: 25000, premiumPct: 0, enabled: true, locale: "vi-VN" },
  { code: "JPY", label: "Japanese Yen",      symbol: "¥",   perUsd: 150,   premiumPct: 0, enabled: true, locale: "ja-JP" },
  { code: "KRW", label: "South Korean Won",  symbol: "₩",   perUsd: 1350,  premiumPct: 0, enabled: true, locale: "ko-KR" },
  { code: "HKD", label: "Hong Kong Dollar",  symbol: "HK$", perUsd: 7.8,   premiumPct: 0, enabled: true, locale: "en-HK" },
  { code: "NZD", label: "New Zealand Dollar",symbol: "NZ$", perUsd: 1.66,  premiumPct: 0, enabled: true, locale: "en-NZ" },
  { code: "BRL", label: "Brazilian Real",    symbol: "R$",  perUsd: 5.4,   premiumPct: 0, enabled: true, locale: "pt-BR" },
  { code: "MXN", label: "Mexican Peso",      symbol: "$",   perUsd: 18,    premiumPct: 0, enabled: true, locale: "es-MX" },
  { code: "ARS", label: "Argentine Peso",    symbol: "$",   perUsd: 950,   premiumPct: 0, enabled: true, locale: "es-AR" },
  { code: "CLP", label: "Chilean Peso",      symbol: "$",   perUsd: 950,   premiumPct: 0, enabled: true, locale: "es-CL" },
  { code: "COP", label: "Colombian Peso",    symbol: "$",   perUsd: 4000,  premiumPct: 0, enabled: true, locale: "es-CO" },
  { code: "LKR", label: "Sri Lankan Rupee",  symbol: "Rs",  perUsd: 300,   premiumPct: 0, enabled: true, locale: "si-LK" },
  { code: "BDT", label: "Bangladeshi Taka",  symbol: "৳",   perUsd: 118,   premiumPct: 0, enabled: true, locale: "bn-BD" },
  { code: "PKR", label: "Pakistani Rupee",   symbol: "₨",   perUsd: 278,   premiumPct: 0, enabled: true, locale: "en-PK" },
  { code: "NPR", label: "Nepalese Rupee",    symbol: "रू",  perUsd: 133,   premiumPct: 0, enabled: true, locale: "ne-NP" },
  { code: "TRY", label: "Turkish Lira",      symbol: "₺",   perUsd: 33,    premiumPct: 0, enabled: true, locale: "tr-TR" },
];

// ponytail: back-compat alias; call sites still import CURRENCIES.
export const CURRENCIES = DEFAULT_CURRENCIES;

/**
 * Merge admin overrides (from SiteSettings.currencyConfig) onto the defaults.
 * Unknown/missing fields fall back to the built-in value. Currencies not in the
 * defaults are appended (lets admin add exotic ones).
 */
export function resolveCurrencies(config?: any): CurrencyConfig[] {
  if (!Array.isArray(config) || config.length === 0) return DEFAULT_CURRENCIES;
  const byCode = new Map<string, CurrencyConfig>(DEFAULT_CURRENCIES.map((c) => [c.code, { ...c }]));
  for (const o of config) {
    if (!o || !o.code) continue;
    const base = byCode.get(o.code) ?? { code: o.code, label: o.label ?? o.code, symbol: o.symbol ?? o.code, perUsd: 1, premiumPct: 0, enabled: true, locale: "en-US" };
    byCode.set(o.code, {
      ...base,
      label: o.label ?? base.label,
      symbol: o.symbol ?? base.symbol,
      perUsd: num(o.perUsd, base.perUsd),
      premiumPct: num(o.premiumPct, base.premiumPct),
      enabled: o.enabled === undefined ? base.enabled : !!o.enabled,
      locale: o.locale ?? base.locale,
    });
  }
  return Array.from(byCode.values());
}

function num(v: any, fallback: number): number {
  const n = typeof v === "string" ? parseFloat(v) : v;
  return Number.isFinite(n) ? n : fallback;
}

function cfgFor(code: CurrencyCode, currencies: CurrencyConfig[]): CurrencyConfig {
  return currencies.find((c) => c.code === code) ?? DEFAULT_CURRENCIES.find((c) => c.code === code) ?? DEFAULT_CURRENCIES[0];
}

/** Convert a USD base amount into `target`, applying FX rate + premium/discount. */
export function convertFromUsd(amountUsd: number | null | undefined, target: CurrencyCode, currencies: CurrencyConfig[] = DEFAULT_CURRENCIES): number {
  if (amountUsd == null) return 0;
  const cfg = cfgFor(target, currencies);
  return Math.round(amountUsd * cfg.perUsd * (1 + cfg.premiumPct / 100));
}

/** Format a USD base amount in `currency` (FX + premium/discount applied). */
export function formatInCurrency(amountUsd: number | null | undefined, currency: CurrencyCode, currencies: CurrencyConfig[] = DEFAULT_CURRENCIES): string {
  if (amountUsd == null) return "—";
  const cfg = cfgFor(currency, currencies);
  const v = convertFromUsd(amountUsd, currency, currencies);
  try {
    return new Intl.NumberFormat(cfg.locale ?? "en-US", { style: "currency", currency: cfg.code, maximumFractionDigits: 0 }).format(v);
  } catch {
    return `${cfg.symbol}${v.toLocaleString()}`;
  }
}
