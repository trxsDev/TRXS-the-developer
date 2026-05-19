"use client";

import React from "react";

interface CircularTextProps {
  text: string;
  radius?: number;
  fontSize?: number;
  letterSpacing?: number;
  spinDuration?: number; // in seconds
  centerLogo?: React.ReactNode;
  className?: string;
  fillClassName?: string;
}

export default function CircularText({
  text,
  radius = 75,
  fontSize = 13,
  letterSpacing = 2.5,
  spinDuration = 20,
  centerLogo,
  className = "",
  fillClassName = "fill-accent-500",
}: CircularTextProps) {
  const size = (radius + 20) * 2;
  const center = size / 2;

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Spinning text container */}
      <div
        className="w-full h-full animate-[spin_var(--spin-duration)_linear_infinite]"
        style={{
          width: size,
          height: size,
          ["--spin-duration" as any]: `${spinDuration}s`,
        }}
      >
        <svg
          viewBox={`0 0 ${size} ${size}`}
          width="100%"
          height="100%"
          className="overflow-visible"
        >
          <defs>
            <path
              id="circular-text-path"
              d={`M ${center}, ${center - radius} A ${radius},${radius} 0 1,1 ${center - 0.01},${center - radius}`}
              fill="transparent"
            />
          </defs>
          <text 
            fontSize={fontSize} 
            className={`${fillClassName} font-bold uppercase tracking-widest`}
            style={{ letterSpacing: `${letterSpacing}px` }}
          >
            <textPath href="#circular-text-path" startOffset="0%">
              {text}
            </textPath>
          </text>
        </svg>
      </div>

      {/* Static center logo container */}
      {centerLogo && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            width: size,
            height: size,
          }}
        >
          <div className="pointer-events-auto">
            {centerLogo}
          </div>
        </div>
      )}
    </div>
  );
}
