"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OptionCardProps } from "@/types";

export default function OptionCard({ item }: OptionCardProps) {
  const router = useRouter();
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  return (
    <div
      onClick={() => router.push(item.link)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="relative border overflow-hidden cursor-pointer w-full transition-all duration-100"
      style={{
        backgroundColor: "#e1e3e6",
        boxShadow: isPressed
          ? "inset 2px 2px 4px rgba(0,0,0,0.6), inset -1px -1px 2px rgba(0,0,0,0.5)"
          : "4px 4px 0px 0px rgba(0,0,0,0.7)",
        transform: isPressed ? "translate(3px, 3px)" : "translate(0, 0)",
      }}
    >
      {/* TOP PART */}
      <div className="relative h-24 w-32 flex items-center justify-center overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id={`mesh-${item.id}`}
              width="3"
              height="3"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(-30)"
            >
              <path
                d="M 3 0 L 0 0 0 3"
                fill="none"
                stroke={item.color}

                strokeWidth="1.3"

              />
            </pattern>
          </defs>

          <rect
            width="100%"
            height="100%"
            fill={`url(#mesh-${item.id})`}
          />
        </svg>

        <img
          src={item.img}
          alt=""
          className={`relative z-10 object-contain ${item.id === 6 ? 'h-14 w-14' : 'h-9 w-9'}`}
          style={{ marginLeft: item.id === 6 ? '-12px' : '-8px' }}
        />
      </div>

      {/* BOTTOM PART */}
      <div className="flex items-center justify-center py-2 bg-white border-t-[0.8]">
        <p className="font-medium text-sm">{item.name}</p>
      </div>
    </div>
  );
}
