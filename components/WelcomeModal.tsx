"use client";

import { useState, useEffect } from "react";

type Step = "interest" | "contact" | "done";

export default function WelcomeModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("interest");

  const [interests, setInterests] = useState({ web: false, mobile: false });
  const [wantsMobileDiscount, setWantsMobileDiscount] = useState<boolean | null>(null);
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!localStorage.getItem("welcomed")) {
      const t = setTimeout(() => setOpen(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem("welcomed", "1");
    setOpen(false);
  };

  const toggleInterest = (key: "web" | "mobile") =>
    setInterests((prev) => ({ ...prev, [key]: !prev[key] }));

  const validateContact = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validateContact()) return;

    const interestList = [
      interests.web && "Web Development",
      interests.mobile && "Mobile Development",
    ]
      .filter(Boolean)
      .join(", ") || "Not specified";

    const discount = wantsMobileDiscount === true ? "Yes" : wantsMobileDiscount === false ? "No" : "Not answered";

    const body = [
      `Name: ${form.name}`,
      form.company ? `Company: ${form.company}` : null,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Interested in: ${interestList}`,
      `50% off mobile deal: ${discount}`,
      form.description ? `Description: ${form.description}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:hello@enitades.dev?subject=New Inquiry from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(body)}`;

    localStorage.setItem("welcomed", "1");
    setStep("done");
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-[var(--card-border)] shadow-2xl overflow-hidden"
        style={{ backgroundColor: "var(--card-bg)" }}
      >
        {/* Accent bar */}
        <div className="h-1.5 w-full" style={{ backgroundColor: "#9DC183" }} />

        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 p-1.5 rounded-lg transition-colors hover:bg-[var(--card-border)]"
          style={{ color: "var(--muted)" }}
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="p-8">
          {/* Step 1 — Interest */}
          {step === "interest" && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-medium tracking-widest uppercase mb-1" style={{ color: "#9DC183" }}>
                  Welcome
                </p>
                <h2 className="text-2xl font-bold">Welcome to Enitades Labs 👋</h2>
                <p className="mt-2 text-sm leading-6" style={{ color: "var(--muted)" }}>
                  I build custom software for businesses. Tell me a bit about what you&apos;re looking for.
                </p>
              </div>

              {/* Interest checkboxes */}
              <div>
                <p className="text-sm font-semibold mb-3">What are you interested in?</p>
                <div className="flex flex-col gap-3">
                  {(["web", "mobile"] as const).map((key) => (
                    <label
                      key={key}
                      onClick={() => toggleInterest(key)}
                      className="flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all"
                      style={{
                        borderColor: interests[key] ? "#9DC183" : "var(--card-border)",
                        backgroundColor: interests[key] ? "#9DC18318" : "transparent",
                      }}
                    >
                      <div
                        className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-colors"
                        style={{
                          backgroundColor: interests[key] ? "#9DC183" : "transparent",
                          border: interests[key] ? "none" : "2px solid var(--card-border)",
                        }}
                      >
                        {interests[key] && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span className="font-medium text-sm">
                        {key === "web" ? "Web Development" : "Mobile Development"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mobile discount offer */}
              {interests.mobile && (
                <div
                  className="rounded-xl border p-4"
                  style={{ borderColor: "#9DC183", backgroundColor: "#9DC18312" }}
                >
                  <p className="text-sm font-semibold mb-1" style={{ color: "#9DC183" }}>
                    🎉 Limited Offer
                  </p>
                  <p className="text-sm mb-3" style={{ color: "var(--muted)" }}>
                    Are you interested in saving <strong>50% off</strong> mobile development?
                  </p>
                  <div className="flex gap-2">
                    {[true, false].map((val) => (
                      <button
                        key={String(val)}
                        onClick={() => setWantsMobileDiscount(val)}
                        className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
                        style={{
                          backgroundColor: wantsMobileDiscount === val ? "#9DC183" : "var(--card-border)",
                          color: wantsMobileDiscount === val ? "white" : "var(--foreground)",
                        }}
                      >
                        {val ? "Yes, count me in!" : "No thanks"}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setStep("contact")}
                disabled={!interests.web && !interests.mobile}
                className="w-full py-3 rounded-full font-medium text-sm transition-all"
                style={{
                  backgroundColor: interests.web || interests.mobile ? "#9DC183" : "var(--card-border)",
                  color: interests.web || interests.mobile ? "white" : "var(--muted)",
                  cursor: interests.web || interests.mobile ? "pointer" : "not-allowed",
                }}
              >
                Continue →
              </button>
            </div>
          )}

          {/* Step 2 — Contact */}
          {step === "contact" && (
            <div className="space-y-5">
              <div>
                <p className="text-xs font-medium tracking-widest uppercase mb-1" style={{ color: "#9DC183" }}>
                  Almost there
                </p>
                <h2 className="text-2xl font-bold">Your details</h2>
                <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                  I&apos;ll reach out within 24 hours.
                </p>
              </div>

              <div className="space-y-3">
                {/* Name */}
                <div>
                  <label className="text-xs font-medium mb-1 block" style={{ color: "var(--muted)" }}>
                    Name <span style={{ color: "#9DC183" }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none transition-colors"
                    style={{
                      backgroundColor: "var(--background)",
                      borderColor: errors.name ? "#ef4444" : "var(--card-border)",
                      color: "var(--foreground)",
                    }}
                  />
                  {errors.name && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.name}</p>}
                </div>

                {/* Company */}
                <div>
                  <label className="text-xs font-medium mb-1 block" style={{ color: "var(--muted)" }}>
                    Company <span className="text-xs" style={{ color: "var(--muted)" }}>(optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your company name"
                    value={form.company}
                    onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none"
                    style={{
                      backgroundColor: "var(--background)",
                      borderColor: "var(--card-border)",
                      color: "var(--foreground)",
                    }}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="text-xs font-medium mb-1 block" style={{ color: "var(--muted)" }}>
                    Phone <span style={{ color: "#9DC183" }}>*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none"
                    style={{
                      backgroundColor: "var(--background)",
                      borderColor: errors.phone ? "#ef4444" : "var(--card-border)",
                      color: "var(--foreground)",
                    }}
                  />
                  {errors.phone && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.phone}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs font-medium mb-1 block" style={{ color: "var(--muted)" }}>
                    Email <span style={{ color: "#9DC183" }}>*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none"
                    style={{
                      backgroundColor: "var(--background)",
                      borderColor: errors.email ? "#ef4444" : "var(--card-border)",
                      color: "var(--foreground)",
                    }}
                  />
                  {errors.email && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.email}</p>}
                </div>

                {/* Description */}
                <div>
                  <label className="text-xs font-medium mb-1 block" style={{ color: "var(--muted)" }}>
                    What are you looking to build?
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Brief description of your project..."
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl text-sm border outline-none resize-none"
                    style={{
                      backgroundColor: "var(--background)",
                      borderColor: "var(--card-border)",
                      color: "var(--foreground)",
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => setStep("interest")}
                  className="px-5 py-2.5 rounded-full text-sm font-medium border transition-colors"
                  style={{ borderColor: "var(--card-border)", color: "var(--muted)" }}
                >
                  ← Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-2.5 rounded-full text-sm font-medium text-white transition-all"
                  style={{ backgroundColor: "#9DC183" }}
                >
                  Send inquiry
                </button>
              </div>
            </div>
          )}

          {/* Step 3 — Done */}
          {step === "done" && (
            <div className="text-center py-6 space-y-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto text-2xl"
                style={{ backgroundColor: "#9DC18320" }}
              >
                ✅
              </div>
              <h2 className="text-2xl font-bold">You&apos;re all set!</h2>
              <p className="text-sm leading-6" style={{ color: "var(--muted)" }}>
                Thanks for reaching out. I&apos;ll be in touch within 24 hours.
              </p>
              <button
                onClick={dismiss}
                className="mt-2 px-8 py-3 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: "#9DC183" }}
              >
                Explore the site
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
