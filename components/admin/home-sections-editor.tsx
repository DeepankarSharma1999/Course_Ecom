"use client";

import { useState } from "react";
import { GripVertical, ArrowUp, ArrowDown, Eye, EyeOff } from "lucide-react";

type Section = { key: string; label: string; hidden: boolean };

export function HomeSectionsEditor({ initial }: { initial: Section[] }) {
  const [items, setItems] = useState<Section[]>(initial);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    const next = [...items];
    const [it] = next.splice(from, 1);
    next.splice(to, 0, it);
    setItems(next);
  };

  const toggle = (i: number) =>
    setItems((prev) => prev.map((s, idx) => (idx === i ? { ...s, hidden: !s.hidden } : s)));

  // Only key + hidden are persisted; order is the array order.
  const serialized = JSON.stringify(items.map((s) => ({ key: s.key, hidden: s.hidden })));

  return (
    <div className="space-y-2">
      <input type="hidden" name="sections" value={serialized} />
      <ul className="divide-y divide-ink-100 rounded-lg border border-ink-200 overflow-hidden">
        {items.map((s, i) => (
          <li
            key={s.key}
            draggable
            onDragStart={() => setDragIndex(i)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (dragIndex !== null && dragIndex !== i) move(dragIndex, i);
              setDragIndex(null);
            }}
            className={`flex items-center gap-3 bg-white px-3 py-2.5 ${dragIndex === i ? "opacity-50" : ""} ${s.hidden ? "bg-ink-50" : ""}`}
          >
            <GripVertical className="w-4 h-4 text-ink-300 cursor-grab shrink-0" />
            <span className={`flex-1 text-sm font-medium ${s.hidden ? "text-ink-400 line-through" : "text-ink-900"}`}>{s.label}</span>
            <button type="button" onClick={() => toggle(i)} title={s.hidden ? "Show" : "Hide"}
              className={`p-1.5 rounded ${s.hidden ? "text-ink-400 hover:bg-ink-100" : "text-emerald-600 hover:bg-emerald-50"}`}>
              {s.hidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            <button type="button" onClick={() => move(i, i - 1)} disabled={i === 0} title="Move up"
              className="p-1.5 rounded text-ink-500 hover:bg-ink-100 disabled:opacity-30"><ArrowUp className="w-4 h-4" /></button>
            <button type="button" onClick={() => move(i, i + 1)} disabled={i === items.length - 1} title="Move down"
              className="p-1.5 rounded text-ink-500 hover:bg-ink-100 disabled:opacity-30"><ArrowDown className="w-4 h-4" /></button>
          </li>
        ))}
      </ul>
      <p className="text-xs text-ink-500">Drag the handle or use the arrows to reorder. Toggle the eye to show/hide a section.</p>
    </div>
  );
}
