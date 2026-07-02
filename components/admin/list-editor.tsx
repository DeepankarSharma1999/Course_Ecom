"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { ImageUploader } from "./image-uploader";

// Generic friendly editor for an array of flat objects. Keeps a hidden JSON
// input named `name` so existing server actions (which read JSON) are unchanged.
type FieldDef = { key: string; label: string; textarea?: boolean; image?: boolean };

const inputCls = "w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none";

export function ListEditor({ name, value, fields, itemLabel }: { name: string; value?: any[]; fields: FieldDef[]; itemLabel: string }) {
  const [rows, setRows] = useState<Record<string, string>[]>(Array.isArray(value) ? value : []);
  const set = (i: number, k: string, v: string) => setRows(rows.map((r, j) => (j === i ? { ...r, [k]: v } : r)));

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={JSON.stringify(rows)} readOnly />
      {rows.map((row, i) => (
        <div key={i} className="rounded-xl border border-ink-200 bg-ink-50/40 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wide text-ink-400">{itemLabel} {i + 1}</span>
            <button type="button" onClick={() => setRows(rows.filter((_, j) => j !== i))} className="text-ink-400 hover:text-red-600" aria-label="Remove"><Trash2 className="w-4 h-4" /></button>
          </div>
          {fields.map((f) => (
            <label key={f.key} className="block">
              <span className="block text-xs font-medium text-ink-600 mb-1">{f.label}</span>
              {f.image ? (
                <ImageUploader name={`_tmp_${name}_${i}_${f.key}`} kind="asset" defaultValue={row[f.key] ?? ""} onChange={(url) => set(i, f.key, url)} />
              ) : f.textarea ? (
                <textarea className={inputCls} rows={3} value={row[f.key] ?? ""} onChange={(e) => set(i, f.key, e.target.value)} />
              ) : (
                <input className={inputCls} value={row[f.key] ?? ""} onChange={(e) => set(i, f.key, e.target.value)} />
              )}
            </label>
          ))}
        </div>
      ))}
      <button type="button" onClick={() => setRows([...rows, Object.fromEntries(fields.map((f) => [f.key, ""]))])} className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-ink-300 px-4 py-2 text-sm font-medium text-ink-600 hover:bg-ink-50 hover:border-brand-400">
        <Plus className="w-4 h-4" /> Add {itemLabel.toLowerCase()}
      </button>
    </div>
  );
}
