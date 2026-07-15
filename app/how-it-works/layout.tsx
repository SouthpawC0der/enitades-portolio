"use client";

import { useEffect, type ReactNode } from "react";

export default function HowItWorksLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return <>{children}</>;
}
