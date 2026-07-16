"use client";

import { useRef, useState } from "react";
import { FileText, Loader2, Upload } from "lucide-react";

const inputCls = "w-full rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none";

/** URL text input + upload button for the main course form (submits via `name`). */
export function UploadInput({ name, kind, defaultValue, placeholder, accept = "image/*", fallback }: {
  name: string;
  kind: string;
  defaultValue?: string | null;
  placeholder?: string;
  accept?: string;
  /** What the live site shows when this field is empty (auto-picked image). Preview only — never submitted. */
  fallback?: string | null;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const shown = value || fallback || "";
  const isAuto = !value && !!fallback;
  const isPdf = shown.toLowerCase().endsWith(".pdf");

  async function upload(file: File) {
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("kind", kind);
      const r = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const d = await r.json();
      if (d.url) setValue(d.url);
      else alert(d.error || "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        {shown && (isPdf
          ? <FileText className="w-12 h-12 p-3 rounded-md text-ink-500 border border-ink-200 shrink-0" />
          // eslint-disable-next-line @next/next/no-img-element
          : <img src={shown} alt="" className={`w-12 h-12 rounded-md object-cover border shrink-0 ${isAuto ? "border-dashed border-ink-300 opacity-70" : "border-ink-200"}`} />)}
        <input name={name} className={inputCls} value={value} placeholder={placeholder || "https://… or upload →"} onChange={(e) => setValue(e.target.value)} />
        <button type="button" onClick={() => fileRef.current?.click()} disabled={busy} className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-ink-200 px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50 disabled:opacity-50">
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />} Upload
        </button>
        <input ref={fileRef} type="file" accept={accept} className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ""; }} />
      </div>
      {isAuto && (
        <p className="text-xs text-ink-500 mt-1.5">
          Currently live: auto-picked from the course topic. Upload or paste a URL to override it.
        </p>
      )}
    </div>
  );
}
