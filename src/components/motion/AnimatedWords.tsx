"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

interface AnimatedWordsProps {
  text: string;
  as?: "p" | "span" | "h3";
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
}

/**
 * Lightweight word-by-word reveal for subtitles and paragraphs — each
 * word slides up and sharpens from a soft blur as it scrolls into view.
 */
export function AnimatedWords({
  text,
  as = "p",
  className,
  stagger = 0.045,
  delay = 0,
  once = true,
}: AnimatedWordsProps) {
  const reducedMotion = useReducedMotion();
  const Tag = as === "p" ? motion.p : as === "h3" ? motion.h3 : motion.span;
  const words = text.split(" ");

  return (
    <Tag className={cn(className)}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="mr-[0.25em] inline-block last:mr-0"
          initial={
            reducedMotion
              ? { opacity: 1 }
              : { opacity: 0, y: "0.5em", filter: "blur(6px)" }
          }
          whileInView={{ opacity: 1, y: "0em", filter: "blur(0px)" }}
          viewport={{ once, margin: "-50px" }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : {
                  duration: 0.5,
                  delay: delay + index * stagger,
                  ease: [0.16, 1, 0.3, 1],
                }
          }
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
