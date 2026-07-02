"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

const inputCls = "w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none";
const lbl = "block text-xs font-medium text-ink-600 mb-1";

type Link = { label: string; href: string };
type Column = { title: string; links: Link[] };

// Footer columns: a list of columns, each with a nested list of links.
// Keeps a hidden JSON input named `name` so the existing save action is unchanged.
export function FooterColumnsEditor({ name, value }: { name: string; value?: Column[] }) {
  const [cols, setCols] = useState<Column[]>(Array.isArray(value) ? value : []);
  const update = (next: Column[]) => setCols(next);
  const setCol = (i: number, p: Partial<Column>) => update(cols.map((c, j) => (j === i ? { ...c, ...p } : c)));

  return (
    <div className="space-y-4">
      <input type="hidden" name={name} value={JSON.stringify(cols)} readOnly />
      {cols.map((col, i) => (
        <div key={i} className="rounded-xl border border-ink-200 bg-ink-50/40 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <input className={inputCls} placeholder="Column title" value={col.title ?? ""} onChange={(e) => setCol(i, { title: e.target.value })} />
            <button type="button" onClick={() => update(cols.filter((_, j) => j !== i))} className="text-ink-400 hover:text-red-600 shrink-0" aria-label="Remove column"><Trash2 className="w-4 h-4" /></button>
          </div>
          <div className="space-y-2 pl-2 border-l-2 border-ink-100">
            {(col.links ?? []).map((link, k) => (
              <div key={k} className="flex items-center gap-2">
                <input className={inputCls} placeholder="Label" value={link.label ?? ""} onChange={(e) => setCol(i, { links: col.links.map((l, m) => (m === k ? { ...l, label: e.target.value } : l)) })} />
                <input className={inputCls} placeholder="/href" value={link.href ?? ""} onChange={(e) => setCol(i, { links: col.links.map((l, m) => (m === k ? { ...l, href: e.target.value } : l)) })} />
                <button type="button" onClick={() => setCol(i, { links: col.links.filter((_, m) => m !== k) })} className="text-ink-400 hover:text-red-600 shrink-0" aria-label="Remove link"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            <button type="button" onClick={() => setCol(i, { links: [...(col.links ?? []), { label: "", href: "" }] })} className="text-xs inline-flex items-center gap-1 text-ink-600 hover:text-brand-600"><Plus className="w-3 h-3" /> Add link</button>
          </div>
        </div>
      ))}
      <button type="button" onClick={() => update([...cols, { title: "", links: [] }])} className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-ink-300 px-4 py-2 text-sm font-medium text-ink-600 hover:bg-ink-50 hover:border-brand-400">
        <Plus className="w-4 h-4" /> Add column
      </button>
    </div>
  );
}

// Social links: a fixed object of platform => URL. Keeps a hidden JSON input.
const PLATFORMS = ["linkedin", "twitter", "facebook", "instagram", "youtube"] as const;
export function SocialLinksEditor({ name, value }: { name: string; value?: Record<string, string> }) {
  const [links, setLinks] = useState<Record<string, string>>(value && typeof value === "object" ? value : {});
  return (
    <div className="space-y-2">
      <input type="hidden" name={name} value={JSON.stringify(links)} readOnly />
      {PLATFORMS.map((p) => (
        <label key={p} className="block">
          <span className={lbl}>{p[0].toUpperCase() + p.slice(1)}</span>
          <input className={inputCls} placeholder={`https://… ${p} URL`} value={links[p] ?? ""} onChange={(e) => setLinks({ ...links, [p]: e.target.value })} />
        </label>
      ))}
    </div>
  );
}
