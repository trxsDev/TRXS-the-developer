"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CircularText from "./CircularText";
import { usePathname } from "next/navigation";

type SectionType = "hero" | "frameworks" | "services" | "portfolio" | "cta";

export default function BackgroundWatermark() {
  const [activeSection, setActiveSection] = useState<SectionType>("hero");
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const sectionIds: SectionType[] = ["hero", "frameworks", "services", "portfolio", "cta"];
    
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -40% 0px", // Trigger when section occupies the active middle portion of the screen
      threshold: 0.15,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id as SectionType;
          if (sectionIds.includes(id)) {
            setActiveSection(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const [targetRect, setTargetRect] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (activeSection !== "cta") {
      setTargetRect(null);
      return;
    }

    const updatePosition = () => {
      const target = document.getElementById("cta-watermark-target");
      if (target) {
        const rect = target.getBoundingClientRect();
        setTargetRect({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition);

    let frameId = requestAnimationFrame(function tick() {
      updatePosition();
      frameId = requestAnimationFrame(tick);
    });

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
      cancelAnimationFrame(frameId);
    };
  }, [activeSection]);

  // Determine styles and props dynamically based on scroll focus
  const getWatermarkConfig = () => {
    if (!isHome) {
      return {
        scale: 0.9,
        logoOpacity: 0.04, // Extremely subtle logo
        textOpacity: 0.015, // Extremely subtle circular text
        spinDuration: 120, // Spin extremely slowly to prevent eye fatigue
        colorClass: "fill-accent-500",
        extraRings: 0, // No extra distracting rings
      };
    }

    switch (activeSection) {
      case "hero":
        return {
          scale: 1,
          logoOpacity: 0.4,
          textOpacity: 0.15,
          spinDuration: 45,
          colorClass: "fill-accent-500",
          extraRings: 0,
        };
      case "frameworks":
        return {
          scale: 1.1,
          logoOpacity: 0.5,
          textOpacity: 0.25,
          spinDuration: 25, // Spins faster on tech stack
          colorClass: "fill-accent-500",
          extraRings: 1, // Add outer dashed ring
        };
      case "services":
        return {
          scale: 1.3, // Expands to encompass the viewport
          logoOpacity: 0.3, // Keep logo visible but subtle
          textOpacity: 0.1, // Subtle text presence
          spinDuration: 60, // Slow, atmospheric rotation
          colorClass: "fill-primary-500",
          extraRings: 2, // Double pulsing ambient waves
        };
      case "portfolio":
        return {
          scale: 0.9, // Shrinks like a targeted aperture/lens
          logoOpacity: 0.08, // Faded on home scroll to prevent layout eye fatigue
          textOpacity: 0.04, // Faded on home scroll
          spinDuration: -50, // Much slower reverse spin
          colorClass: "fill-accent-500",
          extraRings: 0, // No extra distracting rings on portfolio section
        };
      case "cta":
        return {
          scale: 0.85,
          logoOpacity: 0.9,
          textOpacity: 0.75,
          spinDuration: 20,
          colorClass: "fill-accent-500",
          extraRings: 3,
        };
      default:
        return {
          scale: 1,
          logoOpacity: 0.4,
          textOpacity: 0.15,
          spinDuration: 45,
          colorClass: "fill-accent-500",
          extraRings: 0,
        };
    }
  };

  const config = getWatermarkConfig();

  return (
    <motion.div
      animate={{
        left: targetRect ? targetRect.x : "50%",
        top: targetRect ? targetRect.y : "50%",
      }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="watermark-bg flex items-center justify-center pointer-events-none select-none overflow-visible"
    >
      <motion.div
        animate={{
          scale: config.scale,
          rotate: activeSection === "portfolio" ? -15 : -5,
        }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} // smooth easeOutExpo
        className="relative flex items-center justify-center w-[400px] h-[400px] overflow-visible"
      >
        {/* Extra Ring Effects */}
        <AnimatePresence>
          {config.extraRings >= 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.15, scale: 1.15 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 border border-dashed border-primary-600 rounded-full animate-[spin_80s_linear_infinite]"
            />
          )}
          {config.extraRings >= 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0.05, 0.1, 0.05], scale: [1, 1.3, 1] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 border border-primary-500/20 rounded-full"
            />
          )}
          {config.extraRings >= 3 && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.2, scale: 0.95 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 border-2 border-accent-500/20 rounded-full"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 0.25, scale: 0.75 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 border border-primary-500/30 rounded-full"
              />
            </>
          )}
          {config.extraRings >= 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.1, 0.3, 0.1], scale: [0.2, 0.35, 0.2] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-24 h-24 bg-accent-500/20 rounded-full blur-md"
            />
          )}
        </AnimatePresence>

        {/* Dynamic Circular Text */}
        <div
          className="transition-opacity duration-1000"
          style={{ opacity: config.textOpacity }}
        >
          <CircularText
            text="TRXS THE DEVELOPER • TRXS THE DEVELOPER • TRXS THE DEVELOPER • "
            radius={170}
            fontSize={20}
            letterSpacing={5.6}
            spinDuration={Math.abs(config.spinDuration)}
            fillClassName={config.colorClass}
            className={config.spinDuration < 0 ? "[animation-direction:reverse]" : ""}
          />
        </div>

        {/* Central Logo Slot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.img
            src="/logo.svg"
            alt=""
            animate={{
              opacity: config.logoOpacity,
              scale: activeSection === "frameworks" ? 1.1 : activeSection === "portfolio" ? 0.85 : 1,
            }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="w-56 h-56 object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
