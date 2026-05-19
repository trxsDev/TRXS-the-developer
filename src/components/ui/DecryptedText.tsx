"use client";

import { useEffect, useState, useRef } from "react";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  animateOn?: "hover" | "view";
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
}

export default function DecryptedText({
  text,
  speed = 40,
  maxIterations = 10,
  sequential = true,
  animateOn = "hover",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLSpanElement | null>(null);

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:<>?-=[]\\;',./";

  const triggerAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    let iterations = 0;
    const textLength = text.length;
    
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      let nextText = "";
      
      if (sequential) {
        const revealedCount = Math.floor(iterations / maxIterations);
        
        for (let i = 0; i < textLength; i++) {
          if (i < revealedCount) {
            nextText += text[i];
          } else if (text[i] === " ") {
            nextText += " ";
          } else {
            nextText += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        
        if (revealedCount >= textLength) {
          nextText = text;
          clearInterval(intervalRef.current!);
          setIsAnimating(false);
        }
      } else {
        for (let i = 0; i < textLength; i++) {
          if (text[i] === " ") {
            nextText += " ";
          } else if (Math.random() < iterations / maxIterations) {
            nextText += text[i];
          } else {
            nextText += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        
        if (iterations >= maxIterations) {
          nextText = text;
          clearInterval(intervalRef.current!);
          setIsAnimating(false);
        }
      }
      
      setDisplayText(nextText);
      iterations++;
    }, speed);
  };

  useEffect(() => {
    // Initial scramble to make it look active on mount
    let initialScramble = "";
    for (let i = 0; i < text.length; i++) {
      initialScramble += text[i] === " " ? " " : chars[Math.floor(Math.random() * chars.length)];
    }
    setDisplayText(initialScramble);

    if (animateOn === "view" && containerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            triggerAnimation();
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    } else {
      triggerAnimation();
    }
  }, [animateOn, text]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (animateOn === "hover") {
      triggerAnimation();
    }
  };

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={`inline-block select-none cursor-default ${parentClassName}`}
    >
      {displayText.split("").map((char, index) => {
        const isRevealed = char === text[index];
        return (
          <span
            key={index}
            className={isRevealed ? className : `${encryptedClassName} text-accent-500 font-mono`}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}
