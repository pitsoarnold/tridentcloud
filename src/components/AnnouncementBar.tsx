import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#E31837] text-[#0a0a0a] px-4 py-2 flex items-center justify-center relative text-xs sm:text-sm font-medium">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-center pr-6 sm:pr-8">
        <span className="flex items-center gap-2">
          <span>🎉</span> Founding Client Programme — First 10 clients get special pricing.
        </span>
        <Link 
          to="/founding-clients" 
          className="underline underline-offset-2 hover:opacity-80 font-bold whitespace-nowrap"
        >
          Learn more
        </Link>
      </div>
      
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1 hover:opacity-75 transition-opacity"
        aria-label="Dismiss announcement"
      >
        <X size={16} />
      </button>
    </div>
  );
}