"use client";

import { useRef, useState } from "react";
import { Bold, Italic, Heading2, Heading3, List, ListOrdered, Link2, Image as ImageIcon, Loader2 } from "lucide-react";

// Minimal WYSIWYG editor built on contentEditable. Outputs HTML directly into a
// hidden input named `name`, so the existing server action (which reads the HTML
// field) is unchanged. No new dependency.
// ponytail: uses document.execCommand — deprecated but universally supported and
// perfectly adequate for an internal admin tool. Swap for TipTap only if needed.

export function RichTextEditor({ name, defaultValue = "" }: { name: string; defaultValue?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const savedRange = useRef<Range | null>(null);
  const [html, setHtml] = useState(defaultValue);
  const [busy, setBusy] = useState(false);

  const sync = () => setHtml(ref.current?.innerHTML ?? "");

  const exec = (command: string, value?: string) => {
    ref.current?.focus();
    document.execCommand(command, false, value);
    sync();
  };

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && ref.current?.contains(sel.anchorNode)) {
      savedRange.current = sel.getRangeAt(0).cloneRange();
    }
  };

  const insertImage = (url: string) => {
    ref.current?.focus();
    const sel = window.getSelection();
    if (savedRange.current && sel) { sel.removeAllRanges(); sel.addRange(savedRange.current); }
    document.execCommand("insertHTML", false, `<img src="${url}" alt="" />`);
    sync();
  };

  async function upload(file: File) {
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("kind", "asset");
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const d = await res.json();
      if (d.url) insertImage(d.url);
      else alert(d.error || "Upload failed");
    } finally { setBusy(false); }
  }

  const link = () => {
    const url = prompt("Link URL");
    if (url) exec("createLink", url);
  };

  const Btn = ({ on, title, children }: { on: () => void; title: string; children: React.ReactNode }) => (
    <button
      type="button"
      title={title}
      // Prevent the toolbar from stealing the caret/selection from the editor.
      onMouseDown={(e) => { e.preventDefault(); saveSelection(); }}
      onClick={on}
      className="p-2 rounded hover:bg-ink-100 text-ink-600"
    >
      {children}
    </button>
  );

  return (
    <div className="rounded-lg border border-ink-200 overflow-hidden bg-white">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-ink-200 bg-ink-50 px-2 py-1">
        <Btn on={() => exec("bold")} title="Bold"><Bold className="w-4 h-4" /></Btn>
        <Btn on={() => exec("italic")} title="Italic"><Italic className="w-4 h-4" /></Btn>
        <span className="w-px h-5 bg-ink-200 mx-1" />
        <Btn on={() => exec("formatBlock", "h2")} title="Heading"><Heading2 className="w-4 h-4" /></Btn>
        <Btn on={() => exec("formatBlock", "h3")} title="Subheading"><Heading3 className="w-4 h-4" /></Btn>
        <Btn on={() => exec("formatBlock", "p")} title="Paragraph"><span className="text-xs font-bold px-1">P</span></Btn>
        <span className="w-px h-5 bg-ink-200 mx-1" />
        <Btn on={() => exec("insertUnorderedList")} title="Bullet list"><List className="w-4 h-4" /></Btn>
        <Btn on={() => exec("insertOrderedList")} title="Numbered list"><ListOrdered className="w-4 h-4" /></Btn>
        <Btn on={link} title="Link"><Link2 className="w-4 h-4" /></Btn>
        <span className="w-px h-5 bg-ink-200 mx-1" />
        <button
          type="button"
          title="Insert image"
          onMouseDown={(e) => { e.preventDefault(); saveSelection(); }}
          onClick={() => fileRef.current?.click()}
          className="p-2 rounded hover:bg-ink-100 text-ink-600 inline-flex items-center gap-1"
        >
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
        </button>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ""; }} />
      </div>

      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={sync}
        onBlur={sync}
        className="course-prose max-w-none min-h-[260px] px-4 py-3 outline-none focus:ring-0 text-sm"
        dangerouslySetInnerHTML={{ __html: defaultValue }}
      />
      <input type="hidden" name={name} value={html} readOnly />
    </div>
  );
}
