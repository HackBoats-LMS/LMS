"use client";

import React from "react";
import Link from "next/link";
import { OptionCardLProps } from "@/types";

const OptionCardL = ({
  name,
  href,
  description,
  icon,
  color = "#EDEDED",
  stats,
}: OptionCardLProps) => {

  const credits = stats?.Credits ?? 0;
  const modules = stats?.Modules ?? 0;

  return (
    <Link href={href} className="block group">
      <div
        className="bg-white rounded-none p-4 transition-all duration-300 border border-gray-200
                   hover:-translate-y-1 hover:shadow-[0px_12px_28px_rgba(0,0,0,0.1)]"
        style={{
          boxShadow: "0px 6px 18px rgba(0,0,0,0.04)",
        }}
      >

        {/* Icon container */}
        <div className="mb-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              backgroundColor:
                color && color.length ? color + "30" : "#F3F4F6",
            }}
          >
            {icon}
          </div>
        </div>

        {/* Title */}
        <h3
          className="font-bold text-xl mb-2"
          style={{ color: '#1F2933' }}
        >
          {name}
        </h3>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-6 line-clamp-3"
          style={{ color: '#9CA3AF', height: '63px' }}
        >
          {description}
        </p>

        {/* Stats Row */}
        <div
          className="flex items-center justify-between pt-4"
          style={{ borderTop: "1px solid #EFEFEF" }}
        >

          {/* Credits */}
          <div className="flex items-center gap-1">
            <svg
  width="14"
  height="14"
  viewBox="0 0 24 24"
  fill="none"
  stroke="#6B7280"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <path d="M12 3L4 9l8 12 8-12-8-6Z" />
</svg>



            <span className="text-xs" style={{ color: "#6B7280" }}>
              {credits} Credits
            </span>
          </div>

        </div>
      </div>
    </Link>
  );
};

export default OptionCardL;
