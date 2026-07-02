import { prisma } from "@/lib/prisma";
import { AdminTopbar } from "@/components/admin/topbar";
import { PageHeader } from "@/components/admin/ui";
import { resolveCurrencies } from "@/lib/currency";
import { saveCurrencySettings } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default async function CurrencyAdminPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const sp = await searchParams;
  const s = (await prisma.siteSettings.findUnique({ where: { id: "singleton" } })) as any;
  const currencies = resolveCurrencies(s?.currencyConfig);
  const defaultCurrency = s?.defaultCurrency || "USD";

  return (
    <>
      <AdminTopbar title="Currency & Pricing" />
      <div className="p-6 max-w-4xl">
        <PageHeader
          title="Currency & Pricing"
          description="Course prices are set in USD. Each currency shows: USD × FX rate × (1 + premium/discount %). Set the FX rate and a premium (+) or discount (−) per currency, and toggle which appear in the switcher."
        />
        {sp.saved && <div className="mb-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2 text-sm">Saved.</div>}

        <form action={saveCurrencySettings} className="space-y-6">
          <div className="card p-4 flex items-center gap-3">
            <label className="text-sm font-semibold text-ink-800">Default currency</label>
            <select name="defaultCurrency" defaultValue={defaultCurrency} className="border border-ink-200 rounded-lg px-3 py-2 text-sm">
              {currencies.map((c) => <option key={c.code} value={c.code}>{c.code} — {c.label}</option>)}
            </select>
            <span className="text-xs text-ink-500">Used when a visitor&apos;s country/currency can&apos;t be detected.</span>
          </div>

          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-ink-50 text-left text-xs uppercase text-ink-500">
                <tr>
                  <th className="px-4 py-3">On</th>
                  <th className="px-4 py-3">Currency</th>
                  <th className="px-4 py-3">FX rate <span className="normal-case font-normal">(per 1 USD)</span></th>
                  <th className="px-4 py-3">Premium / Discount %</th>
                  <th className="px-4 py-3">Example ($100 base)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {currencies.map((c) => {
                  const example = Math.round(100 * c.perUsd * (1 + c.premiumPct / 100));
                  return (
                    <tr key={c.code} className="hover:bg-ink-50/50">
                      <td className="px-4 py-2">
                        <input type="checkbox" name={`enabled_${c.code}`} defaultChecked={c.enabled} className="h-4 w-4" />
                      </td>
                      <td className="px-4 py-2">
                        <div className="font-medium text-ink-900">{c.code} <span className="text-ink-400">{c.symbol}</span></div>
                        <div className="text-xs text-ink-500">{c.label}</div>
                      </td>
                      <td className="px-4 py-2">
                        <input type="number" step="any" min="0" name={`perUsd_${c.code}`} defaultValue={c.perUsd}
                          className="w-28 border border-ink-200 rounded-lg px-2 py-1" disabled={c.code === "USD"} />
                      </td>
                      <td className="px-4 py-2">
                        <input type="number" step="any" name={`premium_${c.code}`} defaultValue={c.premiumPct}
                          className="w-24 border border-ink-200 rounded-lg px-2 py-1" placeholder="0" />
                      </td>
                      <td className="px-4 py-2 text-ink-600">{c.symbol}{example.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <button type="submit" className="btn-primary">Save Currency Settings</button>
          <p className="text-xs text-ink-500">USD FX rate is fixed at 1 (it is the base). Positive % = premium (dearer); negative % = discount (cheaper).</p>
        </form>
      </div>
    </>
  );
}
