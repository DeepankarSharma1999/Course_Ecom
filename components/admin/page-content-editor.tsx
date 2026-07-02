"use client";

import { useState } from "react";
import { Field, Input, Textarea } from "@/components/admin/ui";
import { ImageUploader } from "@/components/admin/image-uploader";

// Generic editor: renders a form from any JSON content tree (strings, nested objects,
// arrays of objects/strings) and submits the edited tree as JSON to a server action.
// Field type is inferred from the key name — no per-page form code needed.

const IMAGE_KEYS = /(image|logo|photo|banner|favicon|avatar)/i;
const LONG_KEYS = /(description|subtitle|body|summary|content|about|quote|intro)/i;
const label = (k: string) => k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

function clone<T>(v: T): T {
  return typeof structuredClone === "function" ? structuredClone(v) : JSON.parse(JSON.stringify(v));
}

function LeafField({ keyName, value, onChange }: { keyName: string; value: string; onChange: (v: string) => void }) {
  // Image fields: upload (Replace/Remove) plus a paste-URL fallback for external assets.
  // The uploader preview seeds from the saved value; the URL box stays the live editable mirror.
  if (IMAGE_KEYS.test(keyName)) {
    return (
      <Field label={label(keyName)}>
        <ImageUploader name={keyName} kind="asset" defaultValue={value} onChange={onChange} />
        <Input
          className="mt-2"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="…or paste an image URL / path"
        />
      </Field>
    );
  }
  if (LONG_KEYS.test(keyName) || (value?.length ?? 0) > 90) {
    return (
      <Field label={label(keyName)}>
        <Textarea rows={3} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
      </Field>
    );
  }
  return (
    <Field label={label(keyName)}>
      <Input value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
    </Field>
  );
}

function Node({ keyName, value, onChange }: { keyName: string; value: any; onChange: (v: any) => void }) {
  // Array of items (objects or strings)
  if (Array.isArray(value)) {
    const addItem = () => {
      const next = clone(value);
      next.push(typeof value[0] === "object" && value[0] ? clone({ ...value[0] }) : "");
      onChange(next);
    };
    return (
      <div className="border border-ink-200 rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-ink-700">{label(keyName)}</span>
          <button type="button" onClick={addItem} className="text-xs px-2 py-1 rounded bg-ink-100 hover:bg-ink-200">+ Add</button>
        </div>
        {value.map((item, i) => (
          <div key={i} className="relative border border-ink-100 rounded-md p-3 pt-7">
            <button
              type="button"
              onClick={() => onChange(value.filter((_, j) => j !== i))}
              className="absolute top-2 right-2 text-xs text-red-500 hover:text-red-700"
            >
              Remove
            </button>
            <Node
              keyName={`${keyName} ${i + 1}`}
              value={item}
              onChange={(nv) => {
                const next = clone(value);
                next[i] = nv;
                onChange(next);
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  // Nested object
  if (value && typeof value === "object") {
    return (
      <div className="space-y-3">
        {Object.keys(value).map((k) => (
          <Node
            key={k}
            keyName={k}
            value={value[k]}
            onChange={(nv) => onChange({ ...value, [k]: nv })}
          />
        ))}
      </div>
    );
  }

  // Leaf string/number
  return <LeafField keyName={keyName} value={value} onChange={onChange} />;
}

export function PageContentEditor({
  slug,
  initial,
  action,
}: {
  slug: string;
  initial: Record<string, any>;
  action: (slug: string, content: Record<string, any>) => Promise<void>;
}) {
  const [content, setContent] = useState<Record<string, any>>(() => clone(initial));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setSaving(true);
        setSaved(false);
        await action(slug, content);
        setSaving(false);
        setSaved(true);
      }}
      className="space-y-4"
    >
      <Node keyName={slug} value={content} onChange={(v) => setContent(v)} />
      <div className="flex items-center gap-3 sticky bottom-0 bg-white py-3 border-t">
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 rounded-lg bg-ink-900 text-white text-sm font-medium disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
        {saved && <span className="text-sm text-green-600">Saved.</span>}
      </div>
    </form>
  );
}
