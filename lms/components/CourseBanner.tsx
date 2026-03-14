import React from 'react';
import { Bot, Cpu, Code, Database, Globe, Layers, Terminal } from 'lucide-react';

interface CourseBannerProps {
  title: string;
  description: string;
}

const CourseBanner: React.FC<CourseBannerProps> = ({ title, description }) => {
  return (
    <div className="relative w-full aspect-[800/531] overflow-hidden select-none bg-[#73C1D4] flex flex-col">
      {/* Original SVG Background */}
      <img 
        src="/course-banner.svg" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
        alt="" 
      />

      {/* Dynamic Text Overlay */}
      <div className="absolute inset-0 p-[8%] pt-[10%] flex flex-col justify-start z-10 pointer-events-none">
        <h2 className="text-[clamp(1.5rem,7vw,1.2rem)] font-bold text-gray-950 leading-[1] mb-[3%] line-clamp-1 tracking-tight">
          {title}
        </h2>
        <p className="text-[clamp(0.7rem,2.4vw,0.8rem)] text-gray-800 leading-normal font-semibold max-w-[80%] line-clamp-3 opacity-90">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CourseBanner;
