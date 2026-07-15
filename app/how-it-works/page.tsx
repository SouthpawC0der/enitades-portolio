import Link from "next/link";
import { getPageBlocks, richTextToString, type Block } from "@/lib/notion";

export const metadata = { title: "How It Works — Enitades" };

const STEPS = ["Discovery", "Design & planning", "Custom development", "Review & revisions", "Launch", "Ongoing management"];

function getStepDescription(block: Block): string {
  const child = block.children?.[0];
  if (!child) return "";
  return richTextToString(child[child.type]?.rich_text ?? []);
}

function PackageCard({ block }: { block: Block }) {
  const title = richTextToString(block.toggle?.rich_text ?? []);
  const children = block.children ?? [];

  const management = richTextToString(children[0]?.paragraph?.rich_text ?? []);

  const sections: { label: string; items: string[] }[] = [];
  let current: { label: string; items: string[] } | null = null;

  for (const child of children.slice(1)) {
    if (child.type === "paragraph") {
      if (current) sections.push(current);
      current = { label: richTextToString(child.paragraph?.rich_text ?? []), items: [] };
    } else if (child.type === "bulleted_list_item" && current) {
      current.items.push(richTextToString(child.bulleted_list_item?.rich_text ?? []));
    }
  }
  if (current) sections.push(current);

  return (
    <div
      className="rounded-2xl border border-[var(--card-border)] overflow-hidden flex flex-col"
      style={{ backgroundColor: "var(--card-bg)" }}
    >
      <div className="h-1.5 w-full" style={{ backgroundColor: "#9DC183" }} />
      <div className="p-6 flex flex-col gap-4 flex-1">
        <div>
          <h3 className="text-lg font-bold">{title.split("—")[0].trim()}</h3>
          <p className="text-2xl font-bold mt-1" style={{ color: "#9DC183" }}>
            {title.split("—")[1]?.trim()}
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>{management}</p>
        </div>
        {sections.map((s) => (
          <div key={s.label}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--muted)" }}>
              {s.label}
            </p>
            <ul className="space-y-1">
              {s.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "var(--muted)" }}>
                  <span style={{ color: "#9DC183" }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function HowItWorksPage() {
  const blocks = await getPageBlocks(process.env.NOTION_PAGE_ID!);

  const introBlock = blocks.find((b) => b.type === "paragraph");
  const intro = richTextToString(introBlock?.paragraph?.rich_text ?? []);

  const stepBlocks = blocks.filter(
    (b) => b.type === "numbered_list_item" && STEPS.includes(richTextToString(b.numbered_list_item?.rich_text ?? []))
  );

  const toggles = blocks.filter((b) => b.type === "toggle");
  const webPackages = toggles.filter((b) => richTextToString(b.toggle?.rich_text ?? []).toLowerCase().includes("web"));
  const mobilePackages = toggles.filter((b) => richTextToString(b.toggle?.rich_text ?? []).toLowerCase().includes("mobile"));

  const notesBlock = blocks.find(
    (b) => b.type === "paragraph" && richTextToString(b.paragraph?.rich_text ?? []).startsWith("Final pricing")
  );
  const notes = richTextToString(notesBlock?.paragraph?.rich_text ?? []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      {/* Nav back link */}
      <div className="max-w-5xl mx-auto px-6 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm transition-colors"
          style={{ color: "var(--muted)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to portfolio
        </Link>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-16 space-y-20">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ backgroundColor: "#9DC183" }} />
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "#9DC183" }}>
              process
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-4">How It Works</h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: "var(--muted)" }}>
            {intro}
          </p>
        </div>

        {/* Development Process */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Development Process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {stepBlocks.map((block, i) => {
              const title = richTextToString(block.numbered_list_item?.rich_text ?? []);
              const desc = getStepDescription(block);
              return (
                <div
                  key={block.id}
                  className="rounded-2xl border border-[var(--card-border)] p-6"
                  style={{ backgroundColor: "var(--card-bg)" }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white mb-4"
                    style={{ backgroundColor: "#9DC183" }}
                  >
                    {i + 1}
                  </div>
                  <h3 className="font-bold mb-2">{title}</h3>
                  <p className="text-sm leading-6" style={{ color: "var(--muted)" }}>{desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Web Packages */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-8" style={{ backgroundColor: "#9DC183" }} />
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "#9DC183" }}>
              pricing
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Web Development</h2>
          <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>
            3 tiers to fit your project size and budget.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {webPackages.map((b) => <PackageCard key={b.id} block={b} />)}
          </div>
        </div>

        {/* Mobile Packages */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Mobile Development</h2>
          <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>
            Native and cross-platform mobile apps built to ship.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mobilePackages.map((b) => <PackageCard key={b.id} block={b} />)}
          </div>
        </div>

        {/* Notes */}
        {notes && (
          <div
            className="rounded-2xl border border-[var(--card-border)] p-6"
            style={{ backgroundColor: "var(--card-bg)" }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#9DC183" }}>
              Notes
            </p>
            <p className="text-sm leading-6" style={{ color: "var(--muted)" }}>{notes}</p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center py-8">
          <h2 className="text-3xl font-bold mb-4">Ready to build something?</h2>
          <p className="mb-8" style={{ color: "var(--muted)" }}>Let&apos;s talk about your project.</p>
          <a
            href="mailto:hello@enitades.dev"
            className="btn-accent px-8 py-4 rounded-full font-medium inline-block"
          >
            Get in touch
          </a>
        </div>
      </main>
    </div>
  );
}
