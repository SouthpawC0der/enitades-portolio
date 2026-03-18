"use client";

import { useInView } from "@/hooks/useInView";
import AnimateIn from "./AnimateIn";

const backendSkills = [
  { name: "Node.js", level: 95, desc: "REST APIs, microservices, real-time" },
  { name: "NestJS", level: 88, desc: "Enterprise-grade backend framework" },
  { name: "PostgreSQL", level: 85, desc: "Relational databases, query optimization" },
  { name: "MongoDB", level: 80, desc: "Document stores, aggregation pipelines" },
  { name: "Redis", level: 78, desc: "Caching, pub/sub, session management" },
  { name: "Docker", level: 82, desc: "Containerization and orchestration" },
  { name: "Swift Data", level: 75, desc: "Persistent data layer for Swift apps" },
  { name: "Core Data", level: 78, desc: "Apple's object graph and persistence framework" },
];

const frontendSkills = [
  { name: "React", level: 93, desc: "Components, hooks, state management" },
  { name: "Next.js", level: 90, desc: "SSR, SSG, App Router" },
  { name: "TypeScript", level: 92, desc: "Type safety across full stack" },
  { name: "TailwindCSS", level: 88, desc: "Utility-first rapid UI development" },
  { name: "GraphQL", level: 75, desc: "Schema design, Apollo, resolvers" },
  { name: "React Query", level: 85, desc: "Server state, caching, sync" },
  { name: "Swift", level: 83, desc: "Native iOS & macOS development" },
  { name: "SwiftUI", level: 85, desc: "Declarative UI framework for Apple platforms" },
];

function SkillCard({
  name,
  level,
  desc,
  index,
}: {
  name: string;
  level: number;
  desc: string;
  index: number;
}) {
  const { ref, inView } = useInView();

  return (
    <AnimateIn variant="fade-up" delay={index * 80}>
      <div
        className="card-hover p-4 rounded-xl border border-[var(--card-border)] cursor-default"
        style={{ backgroundColor: "var(--card-bg)" }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-sm">{name}</span>
          <span className="text-xs font-mono" style={{ color: "var(--muted)" }}>
            {level}%
          </span>
        </div>
        {/* Animated progress bar */}
        <div
          ref={ref}
          className="h-1 rounded-full mb-3 overflow-hidden"
          style={{ backgroundColor: "var(--card-border)" }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: inView ? `${level}%` : "0%",
              backgroundColor: "#e45447",
              transition: `width 900ms ease ${index * 80}ms`,
            }}
          />
        </div>
        <p className="text-xs leading-5" style={{ color: "var(--muted)" }}>
          {desc}
        </p>
      </div>
    </AnimateIn>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <AnimateIn variant="fade-up">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8" style={{ backgroundColor: "#e45447" }} />
              <span
                className="text-xs font-medium tracking-widest uppercase"
                style={{ color: "#e45447" }}
              >
                expertise
              </span>
            </div>
            <h2 className="text-4xl font-bold">What I work with</h2>
            <p className="mt-3 text-lg max-w-md" style={{ color: "var(--muted)" }}>
              A continuously evolving toolkit built from real-world project experience.
            </p>
          </div>
        </AnimateIn>

        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Backend */}
          <div>
            <AnimateIn variant="fade-left" delay={100}>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: "#e45447" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">Backend</div>
                  <div className="text-xs" style={{ color: "var(--muted)" }}>
                    Server-side development
                  </div>
                </div>
              </div>
            </AnimateIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {backendSkills.map((skill, i) => (
                <SkillCard key={skill.name} {...skill} index={i} />
              ))}
            </div>
          </div>

          {/* Frontend */}
          <div>
            <AnimateIn variant="fade-right" delay={100}>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: "#607393" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">Frontend</div>
                  <div className="text-xs" style={{ color: "var(--muted)" }}>
                    Client-side & UI development
                  </div>
                </div>
              </div>
            </AnimateIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {frontendSkills.map((skill, i) => (
                <SkillCard key={skill.name} {...skill} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
