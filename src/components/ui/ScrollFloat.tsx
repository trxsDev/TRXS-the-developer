"use client";

import { motion } from "framer-motion";
import React from "react";

interface ScrollFloatProps {
  text: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
}

export default function ScrollFloat({
  text,
  delay = 0,
  duration = 0.8,
  stagger = 0.05,
  className = "",
}: ScrollFloatProps) {
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        ease: [0.215, 0.61, 0.355, 1] as const, // easeOutCubic
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden mr-[0.25em] py-1">
          <motion.span
            variants={wordVariants}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
