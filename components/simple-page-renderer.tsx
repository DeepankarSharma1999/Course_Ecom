import Link from "next/link";
import { LeadForm } from "@/components/lead-form";

// Tiny markdown-ish renderer: supports **bold**, line breaks, "- " bullets, # headers.
function renderBody(body: string) {
  const lines = body.split("\n");
  const out: React.ReactNode[] = [];
  let listBuf: string[] = [];
  function flushList(k: number) {
    if (listBuf.length === 0) return;
    out.push(
      <ul key={`ul-${k}`} className="list-disc pl-6 space-y-1 my-4">
        {listBuf.map((it, i) => <li key={i} dangerouslySetInnerHTML={{ __html: it.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />)}
      </ul>
    );
    listBuf = [];
  }
  lines.forEach((raw, i) => {
    const line = raw.trim();
    if (line.startsWith("- ")) { listBuf.push(line.slice(2)); return; }
    flushList(i);
    if (!line) { out.push(<div key={`sp-${i}`} className="h-3" />); return; }
    if (line.startsWith("### ")) out.push(<h4 key={i} className="font-semibold text-ink-900 mt-5 mb-2">{line.slice(4)}</h4>);
    else if (line.startsWith("## ")) out.push(<h3 key={i} className="text-xl font-bold text-ink-900 mt-6 mb-2">{line.slice(3)}</h3>);
    else if (line.startsWith("# ")) out.push(<h2 key={i} className="text-2xl font-bold text-ink-900 mt-8 mb-3">{line.slice(2)}</h2>);
    else out.push(<p key={i} className="mb-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />);
  });
  flushList(9999);
  return out;
}

export function SimplePageRenderer({ page, source }: { page: any; source?: string }) {
  return (
    <>
      <section className="bg-gradient-to-br from-brand-950 to-brand-800 text-white">
        <div className="container-tight py-14">
          {page.heroBadge && <div className="badge mb-3 bg-white/10 text-white border border-white/20">{page.heroBadge}</div>}
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{page.heroHeadline || page.title}</h1>
          {page.heroSubheading && <p className="text-brand-100 text-lg max-w-2xl">{page.heroSubheading}</p>}
        </div>
      </section>
      <section className="section">
        <div className={`container-tight ${page.showLeadForm ? "grid lg:grid-cols-[1fr_400px] gap-10 items-start" : ""}`}>
          <div className="text-ink-700">
            {page.body && renderBody(page.body)}
            {page.ctaText && page.ctaLink && (
              <Link href={page.ctaLink} className="btn-primary mt-6">{page.ctaText}</Link>
            )}
          </div>
          {page.showLeadForm && (
            <aside className="lg:sticky lg:top-24 self-start">
              <LeadForm
                variant="card"
                title={page.leadFormTitle || "Get in touch"}
                subtitle={page.leadFormSubtitle || ""}
                source={source || `page-${page.slug}`}
                // Spoclearn-style consultation scheduling on the enquiry page.
                showScheduler={source === "enquire"}
              />
            </aside>
          )}
        </div>
      </section>
    </>
  );
}
