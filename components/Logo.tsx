import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className, size = 32 }: LogoProps) {
  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Logo Background / Outer Ring (Subtle) */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="currentColor"
          fillOpacity="0.03"
          stroke="currentColor"
          strokeOpacity="0.1"
          strokeWidth="1"
        />

        {/* The 'M' Structure */}
        <path
          d="M25 70V30L50 55L75 30V70"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-foreground"
        />

        {/* The 'Core' (Emerald Pulse) */}
        <circle
          cx="50"
          cy="70"
          r="6"
          fill="#10b981"
          className="animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]"
        >
          <animate
            attributeName="r"
            values="5;7;5"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            values="0.8;1;0.8"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Subtle Rhythm Bars */}
        <rect
          x="35"
          y="80"
          width="4"
          height="6"
          rx="2"
          fill="currentColor"
          fillOpacity="0.2"
        >
          <animate
            attributeName="height"
            values="4;8;4"
            dur="2s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x="48"
          y="82"
          width="4"
          height="4"
          rx="2"
          fill="currentColor"
          fillOpacity="0.3"
        >
          <animate
            attributeName="height"
            values="2;6;2"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x="61"
          y="80"
          width="4"
          height="6"
          rx="2"
          fill="currentColor"
          fillOpacity="0.2"
        >
          <animate
            attributeName="height"
            values="4;8;4"
            dur="2.3s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
    </div>
  );
}
