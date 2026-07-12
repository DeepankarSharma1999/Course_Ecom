"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bold, Italic, Underline, Strikethrough, Heading2, Heading3, List, ListOrdered, Link2,
  Image as ImageIcon, Loader2, Quote, Minus, AlignLeft, AlignCenter, AlignRight,
  Undo2, Redo2, Eraser, FileCode2,
} from "lucide-react";

// Full-featured WYSIWYG editor built on contentEditable. Outputs HTML into a
// hidden input named `name`, so server actions that read the HTML field are
// unchanged. No new dependency.
// ponytail: uses document.execCommand — deprecated but universally supported and
// perfectly adequate for an internal admin tool. Swap for TipTap only if needed.

export function RichTextEditor({ name, defaultValue = "", minHeight = 260 }: { name: string; defaultValue?: string; minHeight?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const savedRange = useRef<Range | null>(null);
  const [html, setHtml] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [showHtml, setShowHtml] = useState(false);

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

  const toggleHtml = () => setShowHtml((v) => !v);

  // The editable div remounts with `defaultValue` when leaving HTML view; push
  // the current (possibly source-edited) HTML back into it after the remount.
  useEffect(() => {
    if (!showHtml && ref.current && ref.current.innerHTML !== html) ref.current.innerHTML = html;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showHtml]);

  const Btn = ({ on, title, children }: { on: () => void; title: string; children: React.ReactNode }) => (
    <button
      type="button"
      title={title}
      disabled={showHtml}
      // Prevent the toolbar from stealing the caret/selection from the editor.
      onMouseDown={(e) => { e.preventDefault(); saveSelection(); }}
      onClick={on}
      className="p-2 rounded hover:bg-ink-100 text-ink-600 disabled:opacity-30 disabled:pointer-events-none"
    >
      {children}
    </button>
  );

  const Sep = () => <span className="w-px h-5 bg-ink-200 mx-1" />;

  return (
    <div className="rounded-lg border border-ink-200 overflow-hidden bg-white">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-ink-200 bg-ink-50 px-2 py-1">
        <Btn on={() => exec("undo")} title="Undo (Ctrl+Z)"><Undo2 className="w-4 h-4" /></Btn>
        <Btn on={() => exec("redo")} title="Redo (Ctrl+Y)"><Redo2 className="w-4 h-4" /></Btn>
        <Sep />
        <Btn on={() => exec("bold")} title="Bold (Ctrl+B)"><Bold className="w-4 h-4" /></Btn>
        <Btn on={() => exec("italic")} title="Italic (Ctrl+I)"><Italic className="w-4 h-4" /></Btn>
        <Btn on={() => exec("underline")} title="Underline (Ctrl+U)"><Underline className="w-4 h-4" /></Btn>
        <Btn on={() => exec("strikeThrough")} title="Strikethrough"><Strikethrough className="w-4 h-4" /></Btn>
        <Sep />
        <Btn on={() => exec("formatBlock", "h2")} title="Heading"><Heading2 className="w-4 h-4" /></Btn>
        <Btn on={() => exec("formatBlock", "h3")} title="Subheading"><Heading3 className="w-4 h-4" /></Btn>
        <Btn on={() => exec("formatBlock", "p")} title="Paragraph"><span className="text-xs font-bold px-1">P</span></Btn>
        <Btn on={() => exec("formatBlock", "blockquote")} title="Quote"><Quote className="w-4 h-4" /></Btn>
        <Sep />
        <Btn on={() => exec("insertUnorderedList")} title="Bullet list"><List className="w-4 h-4" /></Btn>
        <Btn on={() => exec("insertOrderedList")} title="Numbered list"><ListOrdered className="w-4 h-4" /></Btn>
        <Btn on={() => exec("insertHorizontalRule")} title="Divider line"><Minus className="w-4 h-4" /></Btn>
        <Sep />
        <Btn on={() => exec("justifyLeft")} title="Align left"><AlignLeft className="w-4 h-4" /></Btn>
        <Btn on={() => exec("justifyCenter")} title="Align centre"><AlignCenter className="w-4 h-4" /></Btn>
        <Btn on={() => exec("justifyRight")} title="Align right"><AlignRight className="w-4 h-4" /></Btn>
        <Sep />
        <Btn on={link} title="Link"><Link2 className="w-4 h-4" /></Btn>
        <button
          type="button"
          title="Insert image"
          disabled={showHtml}
          onMouseDown={(e) => { e.preventDefault(); saveSelection(); }}
          onClick={() => fileRef.current?.click()}
          className="p-2 rounded hover:bg-ink-100 text-ink-600 inline-flex items-center gap-1 disabled:opacity-30 disabled:pointer-events-none"
        >
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
        </button>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ""; }} />
        <Btn on={() => exec("removeFormat")} title="Clear formatting"><Eraser className="w-4 h-4" /></Btn>
        <span className="flex-1" />
        <button
          type="button"
          onClick={toggleHtml}
          title="Toggle HTML source view"
          className={`p-1.5 rounded text-xs font-semibold inline-flex items-center gap-1 transition-colors ${showHtml ? "bg-ink-800 text-white" : "hover:bg-ink-100 text-ink-600"}`}
        >
          <FileCode2 className="w-4 h-4" /> HTML
        </button>
      </div>

      {showHtml ? (
        <textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          spellCheck={false}
          className="w-full px-4 py-3 font-mono text-xs outline-none resize-y"
          style={{ minHeight }}
        />
      ) : (
        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          onInput={sync}
          onBlur={sync}
          className="course-prose max-w-none px-4 py-3 outline-none focus:ring-0 text-sm"
          style={{ minHeight }}
          dangerouslySetInnerHTML={{ __html: defaultValue }}
        />
      )}
      <input type="hidden" name={name} value={html} readOnly />
    </div>
  );
}
