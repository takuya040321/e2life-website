"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { CSSProperties } from "react";
import type { ReactNode } from "react";

type HeroAnimationProps = {
  children: ReactNode;
};

const ensoMaskStyle: CSSProperties = {
  WebkitMaskImage: "url('/illustrations/enso.webp')",
  maskImage: "url('/illustrations/enso.webp')",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskSize: "contain",
  maskSize: "contain",
};

export function EnsoAnimation() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      data-testid="enso-layer"
      className="pointer-events-none absolute right-[-11rem] bottom-[3%] z-0 aspect-square w-[clamp(22rem,92vw,31rem)] sm:top-1/2 sm:right-auto sm:left-[-8rem] sm:w-[clamp(30rem,43vw,38rem)] sm:-translate-y-1/2 lg:left-[-6rem]"
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.2, ease: "easeOut" }}
    >
      <div
        data-testid="enso-illustration"
        className="bg-primary dark:bg-gold size-full opacity-20 sm:opacity-35 dark:opacity-25 dark:sm:opacity-30"
        style={ensoMaskStyle}
      />
    </motion.div>
  );
}

export function HeroAnimation({ children }: HeroAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
