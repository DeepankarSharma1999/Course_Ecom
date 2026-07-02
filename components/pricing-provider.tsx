"use client";

import { createContext, useContext, useMemo } from "react";
import {
  convertFromUsd,
  formatInCurrency,
  DEFAULT_CURRENCIES,
  type CurrencyCode,
  type CurrencyConfig,
} from "@/lib/currency";

type PricingCtx = {
  currency: CurrencyCode;
  currencies: CurrencyConfig[];
  format: (amountUsd: number | null | undefined) => string;
  convert: (amountUsd: number | null | undefined) => number;
};

const Ctx = createContext<PricingCtx | null>(null);

export function PricingProvider({
  currency,
  currencies,
  children,
}: {
  currency: CurrencyCode;
  currencies: CurrencyConfig[];
  children: React.ReactNode;
}) {
  const value = useMemo<PricingCtx>(
    () => ({
      currency,
      currencies,
      format: (usd) => formatInCurrency(usd, currency, currencies),
      convert: (usd) => convertFromUsd(usd, currency, currencies),
    }),
    [currency, currencies],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

// Falls back to USD defaults if used outside a provider (e.g. isolated previews).
export function usePricing(): PricingCtx {
  const ctx = useContext(Ctx);
  if (ctx) return ctx;
  return {
    currency: "USD",
    currencies: DEFAULT_CURRENCIES,
    format: (usd) => formatInCurrency(usd, "USD", DEFAULT_CURRENCIES),
    convert: (usd) => convertFromUsd(usd, "USD", DEFAULT_CURRENCIES),
  };
}
