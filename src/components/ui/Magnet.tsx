"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface MagnetProps {
  children: React.ReactNode;
  range?: number;
  strength?: number;
  className?: string;
}

export default function Magnet({
  children,
  range = 80,
  strength = 30,
  className = "",
}: MagnetProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const elementX = rect.left + rect.width / 2;
      const elementY = rect.top + rect.height / 2;

      const distanceX = e.clientX - elementX;
      const distanceY = e.clientY - elementY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < range) {
        setIsHovered(true);
        const pullX = (distanceX / range) * strength;
        const pullY = (distanceY / range) * strength;
        x.set(pullX);
        y.set(pullY);
      } else {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [range, strength, x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
