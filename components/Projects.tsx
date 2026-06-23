import AnimateIn from "./AnimateIn";

const projects = [
  {
    title: "Joinveet",
    category: "Web App",
    description:
      "A professional networking platform for developers and recruiters. Features real-time chat, job listings, and profile matching powered by a recommendation engine.",
    tech: ["Next.js", "NestJS", "PostgreSQL", "Redis", "Socket.io"],
    links: { live: "https://joinveet.com", github: "#" },
    accent: "#e45447",
    featured: true,
  },
  {
    title: "Spasora",
    category: "SaaS Platform",
    description:
      "Appointment booking and business management SaaS for wellness and beauty professionals. Multi-tenant architecture with calendar integrations.",
    tech: ["React", "Node.js", "MongoDB", "Stripe", "Twilio"],
    links: { live: "https://spasora.xyz", github: "#" },
    accent: "#607393",
    featured: true,
  },
  {
    title: "Driftwood & Stone",
    category: "Client Website",
    description:
      "Multi-page luxury estate management website for a private concierge firm in Los Angeles. Full-screen video hero, parallax scrolling, rotating taglines, and an elegant, editorial design.",
    tech: ["Next.js", "Tailwind CSS v4", "TypeScript", "Vercel"],
    links: { live: "https://driftwoodandstonehomes.com", github: "#" },
    accent: "#8b7355",
    featured: true,
  },
  {
    title: "Mazino Makeovers",
    category: "Web App",
    description:
      "Portfolio and booking website for a makeup artist studio. Custom CMS for gallery management and online appointment scheduling.",
    tech: ["Next.js", "Sanity CMS", "TailwindCSS", "Vercel"],
    links: { live: "#", github: "#" },
    accent: "#e29d51",
    featured: false,
  },
  {
    title: "IPA Mastery",
    category: "Mobile App",
    description:
      "Cross-platform mobile app for learning the International Phonetic Alphabet. Interactive flashcards, quizzes, and audio pronunciation guides.",
    tech: ["Flutter", "Dart", "Firebase", "RevenueCat"],
    links: { live: "#", github: "#" },
    accent: "#4ade80",
    featured: false,
  },
  {
    title: "DevMetrics API",
    category: "Open Source",
    description:
      "REST API that aggregates developer productivity metrics from GitHub, Jira, and Linear. Provides actionable insights for engineering teams.",
    tech: ["Node.js", "TypeScript", "PostgreSQL", "Fastify"],
    links: { live: "#", github: "#" },
    accent: "#a78bfa",
    featured: false,
  },
  {
    title: "Realtime Collab",
    category: "Web App",
    description:
      "Collaborative whiteboard app with real-time cursors, shapes, and sticky notes. Built with operational transforms for conflict resolution.",
    tech: ["React", "Socket.io", "Canvas API", "Redis"],
    links: { live: "#", github: "#" },
    accent: "#fb923c",
    featured: false,
  },
];

function ExternalLinkIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <AnimateIn variant="fade-up" className="mb-14">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8" style={{ backgroundColor: "#e45447" }} />
            <span
              className="text-xs font-medium tracking-widest uppercase"
              style={{ color: "#e45447" }}
            >
              portfolio
            </span>
          </div>
          <h2 className="text-4xl font-bold">Selected work</h2>
          <p className="mt-3 text-lg max-w-md" style={{ color: "var(--muted)" }}>
            A collection of products and projects I&apos;ve built, from idea to production.
          </p>
        </AnimateIn>

        {/* Featured projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {featured.map((project, i) => (
            <AnimateIn key={project.title} variant="fade-up" delay={i * 120}>
              <div
                className="card-hover rounded-2xl border border-[var(--card-border)] overflow-hidden h-full"
                style={{ backgroundColor: "var(--card-bg)" }}
              >
                <div
                  className="h-1.5 w-full"
                  style={{ backgroundColor: project.accent }}
                />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span
                        className="text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: project.accent + "20",
                          color: project.accent,
                        }}
                      >
                        {project.category}
                      </span>
                      <h3 className="text-xl font-bold mt-2">{project.title}</h3>
                    </div>
                    <div className="flex gap-2 ml-4">
                      {project.links.github !== "#" && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg transition-colors hover:bg-[var(--card-border)]"
                          style={{ color: "var(--muted)" }}
                        >
                          <GithubIcon />
                        </a>
                      )}
                      {project.links.live !== "#" && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg transition-colors hover:bg-[var(--card-border)]"
                          style={{ color: "var(--muted)" }}
                        >
                          <ExternalLinkIcon />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-sm leading-6 mb-4" style={{ color: "var(--muted)" }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 rounded font-mono"
                        style={{
                          backgroundColor: "var(--card-border)",
                          color: "var(--foreground)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Other projects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rest.map((project, i) => (
            <AnimateIn key={project.title} variant="scale-up" delay={i * 100}>
              <div
                className="card-hover rounded-xl border border-[var(--card-border)] p-5 h-full"
                style={{ backgroundColor: "var(--card-bg)" }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: project.accent }}
                  >
                    {project.title[0]}
                  </div>
                  <div className="flex gap-1">
                    <a
                      href={project.links.github}
                      className="p-1 rounded hover:bg-[var(--card-border)] transition-colors"
                      style={{ color: "var(--muted)" }}
                    >
                      <GithubIcon />
                    </a>
                    <a
                      href={project.links.live}
                      className="p-1 rounded hover:bg-[var(--card-border)] transition-colors"
                      style={{ color: "var(--muted)" }}
                    >
                      <ExternalLinkIcon />
                    </a>
                  </div>
                </div>
                <div
                  className="text-[10px] font-medium tracking-widest uppercase mb-1"
                  style={{ color: project.accent }}
                >
                  {project.category}
                </div>
                <h3 className="font-bold mb-2">{project.title}</h3>
                <p className="text-xs leading-5 mb-3" style={{ color: "var(--muted)" }}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.tech.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-1.5 py-0.5 rounded font-mono"
                      style={{
                        backgroundColor: "var(--card-border)",
                        color: "var(--muted)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
