"use client";

import { useState } from "react";
import { Plus, Trash2, Upload, Loader2 } from "lucide-react";
import {
  DEFAULT_REVIEWS, DEFAULT_REVIEW_STATS, DEFAULT_DEMAND_TIERS,
  type Instructor, type Review, type Certificate, type Accreditation, type Demand, type DemandTier, type ReviewStat,
} from "@/lib/course-section-defaults";

// ---- shared bits -------------------------------------------------------------
const inputCls = "w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none";
const lbl = "block text-xs font-medium text-ink-600 mb-1";

function Hidden({ name, value }: { name: string; value: unknown }) {
  // The existing server action reads these JSON fields by name (ps_*).
  return <input type="hidden" name={name} value={JSON.stringify(value)} readOnly />;
}

function Text({ label, value, onChange, placeholder, textarea }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; textarea?: boolean }) {
  return (
    <label className="block">
      <span className={lbl}>{label}</span>
      {textarea
        ? <textarea className={inputCls} rows={3} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
        : <input className={inputCls} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />}
    </label>
  );
}

function ImageField({ label, value, onChange, kind }: { label: string; value: string; onChange: (v: string) => void; kind: string }) {
  const [busy, setBusy] = useState(false);
  async function upload(file: File) {
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("kind", kind);
      const r = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const d = await r.json();
      if (d.url) onChange(d.url);
      else alert(d.error || "Upload failed");
    } finally { setBusy(false); }
  }
  return (
    <div>
      <span className={lbl}>{label}</span>
      <div className="flex items-center gap-3">
        {value && <img src={value} alt="" className="w-12 h-12 rounded-md object-cover border border-ink-200 shrink-0" />}
        <input className={inputCls} value={value} placeholder="https://… or upload →" onChange={(e) => onChange(e.target.value)} />
        <label className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-ink-200 px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50 cursor-pointer">
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />} Upload
          <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); }} />
        </label>
      </div>
    </div>
  );
}

/**
 * Greyed, read-only view of the site defaults this section falls back to while empty.
 * Display only — nothing here is submitted, so the course keeps tracking the defaults
 * until an admin actually adds a row.
 */
function LiveDefaults({ what, rows }: { what: string; rows: string[] }) {
  return (
    <div className="rounded-xl border border-dashed border-ink-300 bg-ink-50/50 p-4">
      <p className="text-xs text-ink-500 mb-2.5">
        Currently live: the site defaults below. Add {what} here to override them for this course.
      </p>
      <ul className="space-y-1.5 opacity-60 select-none">
        {rows.map((r, i) => (
          <li key={i} className="text-xs text-ink-700 truncate">• {r}</li>
        ))}
      </ul>
    </div>
  );
}

function Card({ children, onRemove, title }: { children: React.ReactNode; onRemove: () => void; title: string }) {
  return (
    <div className="rounded-xl border border-ink-200 bg-ink-50/40 p-4 space-y-3 relative">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wide text-ink-400">{title}</span>
        <button type="button" onClick={onRemove} className="text-ink-400 hover:text-red-600" aria-label="Remove"><Trash2 className="w-4 h-4" /></button>
      </div>
      {children}
    </div>
  );
}

function AddBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-ink-300 px-4 py-2 text-sm font-medium text-ink-600 hover:bg-ink-50 hover:border-brand-400">
      <Plus className="w-4 h-4" /> {label}
    </button>
  );
}

// update one item in an array by index
function patch<T>(arr: T[], i: number, p: Partial<T>): T[] {
  return arr.map((x, j) => (j === i ? { ...x, ...p } : x));
}

// ---- Instructors -------------------------------------------------------------
export function InstructorsEditor({ name, value }: { name: string; value?: Instructor[] }) {
  const [rows, setRows] = useState<Instructor[]>(value ?? []);
  return (
    <div className="space-y-3">
      <Hidden name={name} value={rows} />
      <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
        Not shown on course pages — the section is switched off in the page template
        (trainer names only appear on the homepage). Anything added here saves but won&apos;t appear publicly.
      </p>
      {rows.map((r, i) => (
        <Card key={i} title={`Instructor ${i + 1}`} onRemove={() => setRows(rows.filter((_, j) => j !== i))}>
          <div className="grid grid-cols-2 gap-3">
            <Text label="Name" value={r.name ?? ""} onChange={(v) => setRows(patch(rows, i, { name: v }))} />
            <Text label="Role" value={r.role ?? ""} onChange={(v) => setRows(patch(rows, i, { role: v }))} />
          </div>
          <Text label="Bio" textarea value={r.desc ?? ""} onChange={(v) => setRows(patch(rows, i, { desc: v }))} />
          <div className="grid grid-cols-2 gap-3">
            <Text label="Experience (e.g. 20+)" value={r.exp ?? ""} onChange={(v) => setRows(patch(rows, i, { exp: v }))} />
            <Text label="Companies (comma separated)" value={(r.companies ?? []).join(", ")} onChange={(v) => setRows(patch(rows, i, { companies: v.split(",").map((s) => s.trim()).filter(Boolean) }))} />
          </div>
          <ImageField label="Photo" kind="instructor" value={r.image ?? ""} onChange={(v) => setRows(patch(rows, i, { image: v }))} />
        </Card>
      ))}
      <AddBtn label="Add instructor" onClick={() => setRows([...rows, { name: "", role: "", desc: "" }])} />
    </div>
  );
}

// ---- Reviews -----------------------------------------------------------------
export function ReviewsEditor({ name, value }: { name: string; value?: Review[] }) {
  const [rows, setRows] = useState<Review[]>(value ?? []);
  return (
    <div className="space-y-3">
      <Hidden name={name} value={rows} />
      {rows.map((r, i) => (
        <Card key={i} title={`Review ${i + 1}`} onRemove={() => setRows(rows.filter((_, j) => j !== i))}>
          <Text label="Title" value={r.title ?? ""} onChange={(v) => setRows(patch(rows, i, { title: v }))} />
          <Text label="Content" textarea value={r.content ?? ""} onChange={(v) => setRows(patch(rows, i, { content: v }))} />
          <div className="grid grid-cols-3 gap-3">
            <Text label="Author" value={r.author ?? ""} onChange={(v) => setRows(patch(rows, i, { author: v }))} />
            <Text label="Author role" value={r.role ?? ""} onChange={(v) => setRows(patch(rows, i, { role: v }))} />
            <Text label="Source (Google/LinkedIn/SwitchUp)" value={r.source ?? ""} onChange={(v) => setRows(patch(rows, i, { source: v }))} />
          </div>
        </Card>
      ))}
      {!rows.length && <LiveDefaults what="a review" rows={DEFAULT_REVIEWS.map((d) => `“${d.title}” — ${d.author}${d.source ? ` (${d.source})` : ""}`)} />}
      <AddBtn label="Add review" onClick={() => setRows([...rows, { title: "", content: "", author: "", role: "", source: "Google" }])} />
    </div>
  );
}

// ---- Certificate -------------------------------------------------------------
export function CertificateEditor({ name, value, defaults }: { name: string; value?: Certificate; defaults?: Certificate }) {
  const [v, setV] = useState<Certificate>(value ?? {});
  const has = (v.heading || v.body || v.image) ? true : false;
  return (
    <div className="space-y-3">
      <Hidden name={name} value={has ? v : {}} />
      {defaults && !has && <p className="text-xs text-ink-500">Currently live: the greyed text below (auto-generated from the course title). Type here to override it.</p>}
      <Text label="Heading" value={v.heading ?? ""} placeholder={defaults?.heading ?? "Earn the Coveted … Credential"} onChange={(x) => setV({ ...v, heading: x })} />
      <Text label="Body" textarea value={v.body ?? ""} placeholder={defaults?.body} onChange={(x) => setV({ ...v, body: x })} />
      <ImageField label="Certificate image (optional — replaces the drawn certificate)" kind="certificate" value={v.image ?? ""} onChange={(x) => setV({ ...v, image: x })} />
    </div>
  );
}

// ---- Accreditation -----------------------------------------------------------
export function AccreditationEditor({ name, value, defaults }: { name: string; value?: Accreditation; defaults?: Accreditation }) {
  const [v, setV] = useState<Accreditation>(value ?? {});
  const more = v.more ?? [];
  const has = (v.heading || v.intro || more.length) ? true : false;
  return (
    <div className="space-y-3">
      <Hidden name={name} value={has ? v : {}} />
      {defaults && !has && <p className="text-xs text-ink-500">Currently live: the greyed text below (auto-generated from “Accredited By”). Type here to override it.</p>}
      <Text label="Heading" value={v.heading ?? ""} placeholder={defaults?.heading} onChange={(x) => setV({ ...v, heading: x })} />
      <Text label="Intro paragraph" textarea value={v.intro ?? ""} placeholder={defaults?.intro} onChange={(x) => setV({ ...v, intro: x })} />
      <div className="space-y-2">
        <span className={lbl}>Expanded paragraphs (shown under “Read more”)</span>
        {!more.length && defaults?.more?.length ? <LiveDefaults what="a paragraph" rows={defaults.more} /> : null}
        {more.map((p, i) => (
          <div key={i} className="flex gap-2">
            <textarea className={inputCls} rows={2} value={p} onChange={(e) => setV({ ...v, more: more.map((x, j) => (j === i ? e.target.value : x)) })} />
            <button type="button" onClick={() => setV({ ...v, more: more.filter((_, j) => j !== i) })} className="text-ink-400 hover:text-red-600 shrink-0"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
        <AddBtn label="Add paragraph" onClick={() => setV({ ...v, more: [...more, ""] })} />
      </div>
    </div>
  );
}

// ---- Demand & roles ----------------------------------------------------------
const emptyTier: DemandTier = { prefix: "", salary: { min: "", avg: "", max: "" }, companies: [], demand: { percent: "", text: "" } };
export function DemandEditor({ name, value }: { name: string; value?: Demand }) {
  const [v, setV] = useState<Demand>(value ?? {});
  const tiers = v.tiers ?? [];
  const setTier = (i: number, p: Partial<DemandTier>) => setV({ ...v, tiers: patch(tiers, i, p) });
  const has = (v.role || tiers.length) ? true : false;
  return (
    <div className="space-y-3">
      <Hidden name={name} value={has ? v : {}} />
      <Text label="Role title (e.g. Project Manager) — leave blank to auto-detect" value={v.role ?? ""} onChange={(x) => setV({ ...v, role: x })} />
      <div className="space-y-3">
        <span className={lbl}>Seniority tiers (salary / companies / demand)</span>
        {tiers.map((t, i) => (
          <Card key={i} title={`Tier ${i + 1}`} onRemove={() => setV({ ...v, tiers: tiers.filter((_, j) => j !== i) })}>
            <Text label="Prefix (e.g. Senior , Lead )" value={t.prefix ?? ""} onChange={(x) => setTier(i, { prefix: x })} />
            <div className="grid grid-cols-3 gap-3">
              <Text label="Salary min" value={t.salary?.min ?? ""} onChange={(x) => setTier(i, { salary: { ...t.salary, min: x } })} />
              <Text label="Salary avg" value={t.salary?.avg ?? ""} onChange={(x) => setTier(i, { salary: { ...t.salary, avg: x } })} />
              <Text label="Salary max" value={t.salary?.max ?? ""} onChange={(x) => setTier(i, { salary: { ...t.salary, max: x } })} />
            </div>
            <Text label="Companies (comma separated)" value={(t.companies ?? []).join(", ")} onChange={(x) => setTier(i, { companies: x.split(",").map((s) => s.trim()).filter(Boolean) })} />
            <div className="grid grid-cols-2 gap-3">
              <Text label="Demand %" value={t.demand?.percent ?? ""} onChange={(x) => setTier(i, { demand: { ...t.demand, percent: x } })} />
              <Text label="Demand text" value={t.demand?.text ?? ""} onChange={(x) => setTier(i, { demand: { ...t.demand, text: x } })} />
            </div>
          </Card>
        ))}
        {!tiers.length && <LiveDefaults what="a tier" rows={DEFAULT_DEMAND_TIERS.map((d) => `${d.prefix || "(base)"} — ${d.salary.min}–${d.salary.max} · ${d.companies.slice(0, 3).join(", ")}…`)} />}
        <AddBtn label="Add tier" onClick={() => setV({ ...v, tiers: [...tiers, { ...emptyTier }] })} />
      </div>
    </div>
  );
}

// ---- Review aggregate stats --------------------------------------------------
export function ReviewStatsEditor({ name, value }: { name: string; value?: ReviewStat[] }) {
  const [rows, setRows] = useState<ReviewStat[]>(value ?? []);
  return (
    <div className="space-y-3">
      <Hidden name={name} value={rows} />
      {rows.map((r, i) => (
        <Card key={i} title={`Stat ${i + 1}`} onRemove={() => setRows(rows.filter((_, j) => j !== i))}>
          <div className="grid grid-cols-3 gap-3">
            <Text label="Platform (e.g. Google)" value={r.label ?? ""} onChange={(v) => setRows(patch(rows, i, { label: v }))} />
            <Text label="Rating (e.g. 4.8/5)" value={r.rating ?? ""} onChange={(v) => setRows(patch(rows, i, { rating: v }))} />
            <Text label="Count (e.g. 6,028 Reviews)" value={r.count ?? ""} onChange={(v) => setRows(patch(rows, i, { count: v }))} />
          </div>
        </Card>
      ))}
      {!rows.length && <LiveDefaults what="a stat" rows={DEFAULT_REVIEW_STATS.map((d) => `${d.label} — ${d.rating} · ${d.count}`)} />}
      <AddBtn label="Add stat" onClick={() => setRows([...rows, { label: "", rating: "", count: "" }])} />
    </div>
  );
}
