 import AnimateIn from "./AnimateIn";

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: README-style card */}
          <AnimateIn variant="fade-left">
            <div
              className="rounded-2xl border border-[var(--card-border)] overflow-hidden shadow-lg"
              style={{ backgroundColor: "var(--card-bg)" }}
            >
              {/* Card header */}
              <div
                className="px-5 py-3 flex items-center gap-2 border-b border-[var(--card-border)]"
                style={{ backgroundColor: "var(--card-border)" }}
              >
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#9DC183" }} />
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#e29d51" }} />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-2 text-xs font-mono" style={{ color: "var(--muted)" }}>
                  README.md
                </span>
              </div>

              {/* Markdown content */}
              <div className="p-6 font-mono text-sm leading-7">
                <div className="mb-4">
                  <span style={{ color: "#9DC183" }}># </span>
                  <span className="font-bold text-base">What&apos;s Up? I&apos;m Enitan 👋</span>
                </div>

                <p className="mb-4" style={{ color: "var(--muted)" }}>
                  I&apos;m a design-focused software engineer based in{" "}
                  <span style={{ color: "#e29d51" }}>Charlotte, NC</span>.
                  I build full-stack mobile &amp; web applications with a strong emphasis on
                  performance, scalability, and developer experience.
                </p>

                <div className="mb-4">
                  <span style={{ color: "#607393" }}>## </span>
                  <span className="font-semibold">What I do</span>
                </div>

                <div style={{ color: "var(--muted)" }}>
                  {[
                    "Design & build REST APIs and microservices",
                    "Create responsive, accessible frontend UIs",
                    "Architect database schemas and optimize queries",
                    "Set up CI/CD pipelines and containerization",
                    "Mentor junior developers and lead small teams",
                  ].map((item) => (
                    <div key={item} className="flex gap-2 mb-1">
                      <span style={{ color: "#4ade80" }}>→</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5">
                  <span style={{ color: "#607393" }}>## </span>
                  <span className="font-semibold">Currently</span>
                </div>
                <p className="mt-2" style={{ color: "var(--muted)" }}>
                  🚀 Building in public & open to{" "}
                  <span style={{ color: "#9DC183" }}>full-time / contract</span> roles.
                </p>
              </div>
            </div>
          </AnimateIn>

          {/* Right: Personal info */}
          <AnimateIn variant="fade-right" delay={150}>
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-8" style={{ backgroundColor: "#9DC183" }} />
                  <span
                    className="text-xs font-medium tracking-widest uppercase"
                    style={{ color: "#9DC183" }}
                  >
                    about me
                  </span>
                </div>
                <h2 className="text-4xl font-bold mb-4">The human behind the code</h2>
                <p className="text-lg leading-8" style={{ color: "var(--muted)" }}>
                  I started loving software back in my sophomore year in college when
                  the first ever iPhone released. Since then, I&apos;ve worked on SaaS
                  products, internal tools, mobile applications, and open-source
                  projects — always chasing knowledge and working with amazing people.
                  When I&apos;m not coding (or Vibing), you&apos;ll find me at the
                  basketball court or cooking something in the kitchen.
                </p>
              </div>

              {/* Values */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "⚡", title: "Performance", desc: "Fast by default" },
                  { icon: "🎯", title: "Product thinking", desc: "User-first approach" },
                  { icon: "🧱", title: "Clean code", desc: "Maintainable systems" },
                  { icon: "🌍", title: "Open source", desc: "Give back to the community" },
                ].map((v, i) => (
                  <AnimateIn key={v.title} variant="scale-up" delay={i * 80}>
                    <div
                      className="p-4 rounded-xl border border-[var(--card-border)]"
                      style={{ backgroundColor: "var(--card-bg)" }}
                    >
                      <div className="text-xl mb-1">{v.icon}</div>
                      <div className="font-semibold text-sm">{v.title}</div>
                      <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                        {v.desc}
                      </div>
                    </div>
                  </AnimateIn>
                ))}
              </div>

              {/* CTA */}
              <div className="flex gap-3">
                <a href="/resume.pdf" download="Enitan_Adesina_Resume.pdf" className="btn-outline px-5 py-2.5 rounded-full text-sm font-medium">
                  Download CV
                </a>
                <a href="mailto:hello@enitades.dev" className="btn-accent px-5 py-2.5 rounded-full text-sm font-medium">
                  Get in touch
                </a>
              </div>
            </div>
          </AnimateIn>

        </div>
      </div>
    </section>
  );
}
