"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "section" | "div" | "article";
};

export function Reveal({
  children,
  delay = 0,
  y = 36,
  className,
  as = "div"
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  const initial = reduceMotion ? false : { opacity: 0, y };
  const whileInView = reduceMotion ? undefined : { opacity: 1, y: 0 };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
