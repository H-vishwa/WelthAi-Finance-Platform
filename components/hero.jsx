"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  const imageRef = useRef();

  useEffect(() => {
    const imageElement = imageRef.current;
    const handleScroll = () => {
      if (window.scrollY > 100) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center pt-10 pb-20 px-4 overflow-hidden">

      {/* Ambient background glow orbs */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="orb orb-1 w-[500px] h-[500px] -top-24 -left-24 bg-blue-500/10" />
        <div className="orb orb-2 w-[600px] h-[600px] top-1/4 -right-32 bg-violet-500/8" />
        <div className="orb orb-3 w-[400px] h-[400px] bottom-10 left-[35%] bg-cyan-500/8" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* AI badge */}
      <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border border-blue-500/25 bg-blue-500/10 text-blue-300">
        <Sparkles size={14} className="text-blue-400" />
        AI-Powered Financial Intelligence
      </div>

      {/* Heading */}
      <div className="mx-auto text-center max-w-5xl px-2">
        <h1 className="text-5xl md:text-7xl lg:text-[88px] leading-[1.06] font-black mb-6 gradient-title-hero"
            style={{ textShadow: "0 0 60px rgba(59,130,246,0.3), 0 0 120px rgba(6,182,212,0.15)" }}>
          Manage Your Finances
          <br />
          <span className="text-4xl md:text-6xl lg:text-[72px]">
            with AI Intelligence
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          An AI-Powered financial platform that helps you track, analyze, and
          optimize your expenses with real-time insights and smart automation.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="btn-shimmer px-8 py-6 text-base font-semibold cursor-pointer gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 border-0 shadow-[0_0_30px_rgba(59,130,246,0.45)] hover:shadow-[0_0_50px_rgba(59,130,246,0.65)] transition-shadow"
            >
              Get Started Free
              <ArrowRight size={18} />
            </Button>
          </Link>
          <Link href="#">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-base font-semibold cursor-pointer rounded-xl bg-white/4 border border-white/12 text-slate-200 hover:bg-white/8 hover:text-white transition-all duration-300"
            >
              Watch Demo
            </Button>
          </Link>
        </div>

        {/* Hero image */}
        <div className="hero-image-wrapper w-full max-w-5xl mx-auto px-2">
          <div ref={imageRef} className="hero-image">
            <Image
              src={"/banner.jpeg"}
              width={1400}
              height={650}
              alt="Dashboard Preview"
              className="w-full rounded-xl"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
