"use client";

import { useRef, useState } from "react";
import { Image as ImageIcon, Loader2, Trash2, Upload } from "lucide-react";

type Props = {
  /** Hidden form field name — gets the uploaded URL so the parent form can save it. */
  name: string;
  /** Asset kind, used to prefix the saved filename. */
  kind: "logo" | "favicon" | "asset";
  /** Pre-existing URL (database value). */
  defaultValue?: string | null;
  /** Optional aspect-ratio hint for the preview. */
  previewAspect?: "square" | "wide";
  /** Optional small helper text. */
  hint?: string;
};

export function ImageUploader({ name, kind, defaultValue, previewAspect = "wide", hint }: Props) {
  const [url, setUrl] = useState<string | null>(defaultValue || null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File | null) {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.set("file", file);
      fd.set("kind", kind);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const body = await res.json();
      if (!res.ok) throw new Error(body?.error || "Upload failed");
      setUrl(body.url);
    } catch (e: any) {
      setError(e.message || "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  function clear() {
    setUrl(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  const aspect = previewAspect === "square" ? "aspect-square w-24" : "aspect-[4/1] w-full max-w-xs";

  return (
    <div>
      <input type="hidden" name={name} value={url ?? ""} />

      <div className="flex items-start gap-4">
        <div className={`${aspect} rounded-lg border-2 border-dashed border-ink-200 bg-ink-50 grid place-items-center overflow-hidden shrink-0`}>
          {url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url} alt="preview" className="w-full h-full object-contain" />
          ) : (
            <div className="text-center text-ink-400 text-xs px-2">
              <ImageIcon className="w-6 h-6 mx-auto mb-1" />
              No image
            </div>
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={busy}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-ink-200 bg-white text-sm font-medium hover:border-brand-300 disabled:opacity-50"
            >
              {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {url ? "Replace" : "Upload"}
            </button>
            {url && (
              <button
                type="button"
                onClick={clear}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-ink-200 bg-white text-sm font-medium text-red-600 hover:border-red-300"
              >
                <Trash2 className="w-4 h-4" /> Remove
              </button>
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml,image/x-icon,image/vnd.microsoft.icon"
            hidden
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
          />
          <div className="text-xs text-ink-500">
            {hint || "PNG / JPG / WebP / SVG · max 2 MB."}
          </div>
          {url && <div className="text-[11px] text-ink-400 break-all font-mono">{url}</div>}
          {error && <div className="text-xs text-red-600">{error}</div>}
        </div>
      </div>
    </div>
  );
}
