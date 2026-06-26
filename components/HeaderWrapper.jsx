"use client";
import { useEffect, useState } from "react";

export default function HeaderWrapper({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    // Check initial scroll on mount
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? "bg-black border-b border-white/10 backdrop-blur-md py-1 shadow-[0_4px_30px_rgba(0,0,0,0.8)]" 
        : "bg-transparent border-b border-transparent py-4"
    }`}>
      {children}
    </header>
  );
}
