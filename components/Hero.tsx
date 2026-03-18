export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className="space-y-7">
            {/* Availability badge */}
            <div className="animate-fade-in-up flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--card-border)] text-[var(--muted)]">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#4ade80" }}
                />
                Available for opportunities
              </div>
            </div>

            {/* Headline */}
            <div className="animate-fade-in-up-delay-1">
              <h1 className="text-6xl md:text-7xl font-bold leading-[0.95] tracking-tight">
                SOFTWARE
                <br />
                <span style={{ color: "#e45447" }}>DEVELOPER</span>
              </h1>
            </div>

            {/* Subtext */}
            <p
              className="animate-fade-in-up-delay-2 text-lg leading-relaxed max-w-md"
              style={{ color: "var(--muted)" }}
            >
              Fullstack developer who builds scalable backend systems and
              delightful frontend experiences. Deeply passionate about{" "}
              <span
                className="font-medium"
                style={{ color: "var(--foreground)" }}
              >
                JavaScript
              </span>{" "}
              and the modern web stack.
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up-delay-3 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="btn-accent px-6 py-3 rounded-full font-medium"
              >
                View Work
              </a>
              <a
                href="#about"
                className="btn-outline px-6 py-3 rounded-full font-medium"
              >
                About Me
              </a>
            </div>

            {/* Stats */}
            <div className="animate-fade-in-up-delay-4 flex gap-10 pt-2">
              {[
                { value: "3+", label: "Years exp" },
                { value: "20+", label: "Projects built" },
                { value: "10+", label: "Technologies" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div
                    className="text-sm mt-0.5"
                    style={{ color: "var(--muted)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Code card visual */}
          <div className="hidden lg:flex justify-end items-center">
            <div className="animate-float relative w-full max-w-sm">
              {/* Main code card */}
              <div
                className="rounded-2xl border border-[var(--card-border)] p-6 shadow-2xl"
                style={{ backgroundColor: "var(--card-bg)" }}
              >
                {/* Fake window dots */}
                <div className="flex gap-2 mb-5">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: "#e45447" }}
                  />
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: "#e29d51" }}
                  />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>

                {/* Code snippet */}
                <div
                  className="font-mono text-[13px] leading-6"
                  style={{ color: "var(--muted)" }}
                >
                  <div>
                    <span style={{ color: "#607393" }}>const</span>{" "}
                    <span style={{ color: "var(--foreground)" }}>
                      engineer
                    </span>{" "}
                    <span style={{ color: "#607393" }}>=</span>{" "}
                    <span>{"{"}</span>
                  </div>
                  <div className="pl-4">
                    <span style={{ color: "var(--foreground)" }}>name</span>
                    {": "}
                    <span style={{ color: "#4ade80" }}>&quot;Enitades&quot;</span>
                    {","}
                  </div>
                  <div className="pl-4">
                    <span style={{ color: "var(--foreground)" }}>role</span>
                    {": "}
                    <span style={{ color: "#4ade80" }}>
                      &quot;Software Developer&quot;
                    </span>
                    {","}
                  </div>
                  <div className="pl-4">
                    <span style={{ color: "var(--foreground)" }}>stack</span>
                    {": ["}
                  </div>
                  {[
                    "Node.js",
                    "React",
                    "TypeScript",
                    "PostgreSQL",
                  ].map((tech) => (
                    <div key={tech} className="pl-8">
                      <span style={{ color: "#4ade80" }}>
                        &quot;{tech}&quot;
                      </span>
                      {","}
                    </div>
                  ))}
                  <div className="pl-4">{"],"}</div>
                  <div className="pl-4">
                    <span style={{ color: "var(--foreground)" }}>
                      available
                    </span>
                    {": "}
                    <span style={{ color: "#e29d51" }}>true</span>
                  </div>
                  <div>{"}"}</div>
                </div>
              </div>

              {/* Floating badge: Open to work */}
              <div
                className="absolute -top-3 -right-3 px-3 py-1.5 text-white rounded-full text-xs font-medium shadow-lg"
                style={{ backgroundColor: "#e45447" }}
              >
                Open to work ✦
              </div>

              {/* Floating badge: Stack */}
              <div
                className="absolute -bottom-4 -left-4 px-3 py-2 rounded-xl text-xs font-medium shadow-lg border border-[var(--card-border)]"
                style={{ backgroundColor: "var(--card-bg)" }}
              >
                <div
                  className="text-[10px] uppercase tracking-widest mb-1"
                  style={{ color: "var(--muted)" }}
                >
                  current stack
                </div>
                <div className="flex gap-1">
                  {["TS", "RQ", "NX", "PG"].map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 rounded text-[10px] font-bold"
                      style={{
                        backgroundColor: "var(--card-border)",
                        color: "var(--foreground)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
