import Image from "next/image";

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
                <span style={{ color: "#9DC183" }}>DEVELOPER</span>
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
                { value: "7+", label: "Years exp" },
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

          {/* Right: Cartoon illustration */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="animate-float relative">
              <Image
                src="/images/cartoon.png"
                alt="Enitan cartoon illustration"
                width={420}
                height={420}
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
