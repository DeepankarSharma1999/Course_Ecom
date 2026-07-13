"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

// Table row that expands in place to show a detail panel. `cols` and `detail`
// are server-rendered nodes, so the server page keeps owning the data/markup.
// Clicks on links/buttons/forms inside the row don't toggle the expansion.
export function ExpandableRow({ cols, colSpan, detail }: { cols: React.ReactNode; colSpan: number; detail: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  function onRowClick(e: React.MouseEvent) {
    const t = e.target as HTMLElement;
    if (t.closest("a, button, form, input, select, textarea")) return;
    setOpen((v) => !v);
  }

  return (
    <>
      <tr onClick={onRowClick} className="hover:bg-ink-50/50 cursor-pointer" aria-expanded={open}>
        {cols}
        <td className="px-3 py-3 w-8 text-ink-400">
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </td>
      </tr>
      {open && (
        <tr className="bg-ink-50/40">
          <td colSpan={colSpan + 1} className="px-6 py-4">{detail}</td>
        </tr>
      )}
    </>
  );
}

// Label/value pair for the expanded detail grid.
export function DetailItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-wider text-ink-400 mb-0.5">{label}</div>
      <div className="text-sm text-ink-800 break-words">{value ?? <span className="text-ink-400">—</span>}</div>
    </div>
  );
}
