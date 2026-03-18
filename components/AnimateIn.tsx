"use client";

import { useInView } from "@/hooks/useInView";

type Variant = "fade-up" | "fade-left" | "fade-right" | "fade-in" | "scale-up";

interface Props {
  children: React.ReactNode;
  variant?: Variant;
  delay?: number;       // ms
  duration?: number;    // ms
  className?: string;
}

const variants: Record<Variant, { hidden: string; visible: string }> = {
  "fade-up": {
    hidden: "opacity-0 translate-y-10",
    visible: "opacity-100 translate-y-0",
  },
  "fade-left": {
    hidden: "opacity-0 -translate-x-10",
    visible: "opacity-100 translate-x-0",
  },
  "fade-right": {
    hidden: "opacity-0 translate-x-10",
    visible: "opacity-100 translate-x-0",
  },
  "fade-in": {
    hidden: "opacity-0",
    visible: "opacity-100",
  },
  "scale-up": {
    hidden: "opacity-0 scale-90",
    visible: "opacity-100 scale-100",
  },
};

export default function AnimateIn({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 600,
  className = "",
}: Props) {
  const { ref, inView } = useInView();
  const { hidden, visible } = variants[variant];

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${inView ? visible : hidden} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: inView ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}
