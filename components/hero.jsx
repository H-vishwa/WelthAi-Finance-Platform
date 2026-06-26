"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { gsap } from "gsap";
import {
  ArrowRight,
  Sparkles,
  Globe,
  Activity,
  Shield,
  MapPin,
  Sparkle,
  CreditCard,
  Wallet,
  LineChart,
  DollarSign
} from "lucide-react";

const HeroSection = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations for Left column (Text & Controls)
      gsap.fromTo(
        ".hero-animate-badge",
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(
        ".hero-animate-title",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.15, ease: "power3.out" }
      );

      gsap.fromTo(
        ".hero-animate-text",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" }
      );

      gsap.fromTo(
        ".hero-animate-btn",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.45, stagger: 0.12, ease: "power3.out" }
      );

      // Entrance animation for Right column (Orbits)
      gsap.fromTo(
        ".hero-animate-orbit",
        { scale: 0.82, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.6, delay: 0.25, ease: "elastic.out(1, 0.75)" }
      );

      // Entrance animation for bottom Partner logos
      gsap.fromTo(
        ".hero-animate-logo",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.6, stagger: 0.08, ease: "power2.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Shooting Stars Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const stars = [];

    const createStar = () => {
      return {
        x: Math.random() * width,
        y: Math.random() * (height / 2),
        length: Math.random() * 80 + 50,
        speed: Math.random() * 4 + 3,
        dx: Math.random() * 2 + 2,
        dy: Math.random() * 2 + 2,
        opacity: 1,
        fadeSpeed: Math.random() * 0.012 + 0.005,
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Spawn stars occasionally
      if (Math.random() < 0.012 && stars.length < 3) {
        stars.push(createStar());
      }

      for (let i = stars.length - 1; i >= 0; i--) {
        const star = stars[i];
        star.x += star.dx;
        star.y += star.dy;
        star.opacity -= star.fadeSpeed;

        if (star.opacity <= 0 || star.x > width || star.y > height) {
          stars.splice(i, 1);
          continue;
        }

        const grad = ctx.createLinearGradient(
          star.x,
          star.y,
          star.x - star.length * (star.dx / Math.sqrt(star.dx * star.dx + star.dy * star.dy)),
          star.y - star.length * (star.dy / Math.sqrt(star.dx * star.dx + star.dy * star.dy))
        );
        grad.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        grad.addColorStop(0.1, `rgba(168, 85, 247, ${star.opacity * 0.4})`);
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(
          star.x - star.length * (star.dx / Math.sqrt(star.dx * star.dx + star.dy * star.dy)),
          star.y - star.length * (star.dy / Math.sqrt(star.dx * star.dx + star.dy * star.dy))
        );
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 px-4 md:px-8 overflow-hidden hero-fluid-bg">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Amber/Peach glow in top-left */}
        <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-amber-300/10 blur-[80px] md:blur-[120px]" />
        
        {/* Center purple glow */}
        <div className="absolute top-[20%] left-[15%] w-[400px] md:w-[700px] h-[400px] md:h-[700px] rounded-full bg-violet-600/15 blur-[100px] md:blur-[150px]" />
        
        {/* Shooting Stars Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full z-0 opacity-25" />

        {/* Starry overlay to give a premium feel */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Sparkling lights above the gradient */}
        <div className="absolute inset-0">
          <div className="absolute top-[12%] left-[25%] w-[3px] h-[3px] rounded-full bg-white animate-sparkle-1" />
          <div className="absolute top-[28%] left-[8%] w-[4px] h-[4px] rounded-full bg-amber-200 animate-sparkle-2" />
          <div className="absolute top-[68%] left-[45%] w-[3px] h-[3px] rounded-full bg-white animate-sparkle-3" />
          <div className="absolute top-[22%] right-[28%] w-[4px] h-[4px] rounded-full bg-violet-200 animate-sparkle-4" />
          <div className="absolute top-[52%] right-[8%] w-[3px] h-[3px] rounded-full bg-white animate-sparkle-5" />
          <div className="absolute top-[78%] right-[38%] w-[4px] h-[4px] rounded-full bg-amber-200 animate-sparkle-6" />
          <div className="absolute top-[48%] left-[32%] w-[3px] h-[3px] rounded-full bg-violet-200 animate-sparkle-7" />
        </div>
      </div>

      {/* Main Grid: Left side text, Right side orbits */}
      <div className="container mx-auto max-w-7xl z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center px-4 my-auto">
        
        {/* Left Side: Text & Controls */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* AI badge */}
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs md:text-sm font-medium border border-white/10 bg-white/5 text-slate-300 backdrop-blur-md hero-animate-badge opacity-0">
            <Sparkles size={14} className="text-white" />
            AI-Powered Financial Intelligence
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-[60px] xl:text-[76px] leading-[1.08] font-black mb-6 text-white tracking-tight hero-animate-title opacity-0"
              style={{ textShadow: "0 0 60px rgba(255,255,255,0.1)" }}>
            Manage Your Finances
            <br />
            <span className="text-slate-400 text-3xl md:text-4xl lg:text-[48px] xl:text-[60px] font-extrabold">
              with AI Intelligence
            </span>
          </h1>

          {/* Paragraph */}
          <p className="text-base md:text-lg text-slate-400 mb-8 max-w-xl leading-relaxed hero-animate-text opacity-0">
            An AI-Powered financial platform that helps you track, analyze, and
            optimize your expenses with real-time insights and smart automation.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/dashboard" className="w-full sm:w-auto hero-animate-btn opacity-0">
              <Button
                size="lg"
                className="w-full sm:w-auto px-8 py-6 text-base font-semibold cursor-pointer gap-2 rounded-xl bg-black hover:bg-black/75 border border-white/20 hover:border-white/5 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all duration-300"
              >
                Get Started Free
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="#" className="w-full sm:w-auto hero-animate-btn opacity-0">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto px-8 py-6 text-base font-semibold cursor-pointer rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300"
              >
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Side: Slowly Rotating Orbits Graphic */}
        <div className="lg:col-span-6 w-full flex justify-center items-center hero-animate-orbit opacity-0">
          <div className="relative w-[280px] h-[280px] md:w-[440px] md:h-[440px] flex items-center justify-center aspect-square select-none">
            {/* Center Badges */}
            <div className="absolute w-[110px] h-[110px] md:w-[150px] md:h-[150px] rounded-full bg-black/60 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center z-20 shadow-[0_0_40px_rgba(139,92,246,0.2)]">
              <div className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">50k+</div>
              <div className="text-slate-400 text-[10px] md:text-xs font-semibold uppercase tracking-widest mt-1">Active Users</div>
            </div>

            {/* Inner Orbit (50% diameter) */}
            <div className="absolute w-[50%] h-[50%] rounded-full border border-white/10 animate-orbit-slow-1">
              {/* Inner Avatar */}
              <div className="absolute bottom-[8%] left-[20%] w-7 h-7 md:w-9 md:h-9 -translate-x-1/2 translate-y-1/2">
                <div className="animate-counter-orbit-slow-1">
                  <Image
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop"
                    width={36}
                    height={36}
                    alt="Team Specialist 1"
                    className="w-full h-full rounded-full border border-purple-500/40 object-cover shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                    unoptimized
                  />
                </div>
              </div>

              {/* Inner Icon: CreditCard */}
              <div className="absolute top-[8%] right-[20%] w-[34px] h-[34px] md:w-[46px] md:h-[46px] translate-x-1/2 -translate-y-1/2">
                <div className="animate-counter-orbit-slow-1">
                  <div className="w-full h-full rounded-xl bg-black/85 border border-blue-500/30 flex items-center justify-center p-2 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                    <CreditCard size={16} className="text-blue-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Orbit (75% diameter) */}
            <div className="absolute w-[75%] h-[75%] rounded-full border border-white/5 animate-orbit-slow-2">
              {/* Middle Avatar 1 */}
              <div className="absolute top-[15%] left-[10%] w-7 h-7 md:w-9 md:h-9 -translate-x-1/2 -translate-y-1/2">
                <div className="animate-counter-orbit-slow-2">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop"
                    width={36}
                    height={36}
                    alt="Team Specialist 2"
                    className="w-full h-full rounded-full border border-pink-500/40 object-cover shadow-[0_0_15px_rgba(236,72,153,0.4)]"
                    unoptimized
                  />
                </div>
              </div>

              {/* Middle Avatar 2 */}
              <div className="absolute bottom-[25%] right-[5%] w-7 h-7 md:w-9 md:h-9 translate-x-1/2 translate-y-1/2">
                <div className="animate-counter-orbit-slow-2">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop"
                    width={36}
                    height={36}
                    alt="Team Specialist 3"
                    className="w-full h-full rounded-full border border-blue-500/40 object-cover shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                    unoptimized
                  />
                </div>
              </div>

              {/* Middle Icon 1: Wallet */}
              <div className="absolute top-[10%] right-[15%] w-[34px] h-[34px] md:w-[46px] md:h-[46px] translate-x-1/2 -translate-y-1/2">
                <div className="animate-counter-orbit-slow-2">
                  <div className="w-full h-full rounded-xl bg-black/85 border border-pink-500/30 flex items-center justify-center p-2 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                    <Wallet size={16} className="text-pink-400" />
                  </div>
                </div>
              </div>

              {/* Middle Icon 2: DollarSign */}
              <div className="absolute bottom-[10%] left-[15%] w-[34px] h-[34px] md:w-[46px] md:h-[46px] -translate-x-1/2 translate-y-1/2">
                <div className="animate-counter-orbit-slow-2">
                  <div className="w-full h-full rounded-xl bg-black/85 border border-amber-500/30 flex items-center justify-center p-2 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                    <DollarSign size={16} className="text-amber-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Outer Orbit (100% diameter) */}
            <div className="absolute w-[100%] h-[100%] rounded-full border border-white/5 animate-orbit-slow-3">
              {/* Outer Avatar 1 */}
              <div className="absolute top-[5%] right-[20%] w-7 h-7 md:w-9 md:h-9 translate-x-1/2 -translate-y-1/2">
                <div className="animate-counter-orbit-slow-3">
                  <Image
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop"
                    width={36}
                    height={36}
                    alt="Team Specialist 4"
                    className="w-full h-full rounded-full border border-yellow-500/40 object-cover shadow-[0_0_15px_rgba(234,179,8,0.4)]"
                    unoptimized
                  />
                </div>
              </div>

              {/* Outer Avatar 2 */}
              <div className="absolute bottom-[5%] left-[30%] w-7 h-7 md:w-9 md:h-9 -translate-x-1/2 translate-y-1/2">
                <div className="animate-counter-orbit-slow-3">
                  <Image
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop"
                    width={36}
                    height={36}
                    alt="Team Specialist 5"
                    className="w-full h-full rounded-full border border-purple-500/40 object-cover shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                    unoptimized
                  />
                </div>
              </div>

              {/* Outer Icon 1: LineChart */}
              <div className="absolute top-[15%] left-[10%] w-[34px] h-[34px] md:w-[46px] md:h-[46px] -translate-x-1/2 -translate-y-1/2">
                <div className="animate-counter-orbit-slow-3">
                  <div className="w-full h-full rounded-xl bg-black/85 border border-purple-500/30 flex items-center justify-center p-2 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                    <LineChart size={16} className="text-purple-400" />
                  </div>
                </div>
              </div>

              {/* Outer Icon 2: Sparkles */}
              <div className="absolute bottom-[15%] right-[10%] w-[34px] h-[34px] md:w-[46px] md:h-[46px] translate-x-1/2 translate-y-1/2">
                <div className="animate-counter-orbit-slow-3">
                  <div className="w-full h-full rounded-xl bg-black/85 border border-cyan-500/30 flex items-center justify-center p-2 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    <Sparkles size={16} className="text-cyan-400" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Bottom Sponsor/Partner Logo Strip */}
      <div className="container mx-auto max-w-7xl z-10 w-full pt-12 border-t border-white/5 mt-12">
        <div className="flex flex-wrap justify-center lg:justify-between items-center gap-8 md:gap-12 px-4 opacity-50 hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 text-sm md:text-base font-semibold tracking-wider cursor-pointer hero-animate-logo opacity-0">
            <Shield size={18} className="text-white/60" />
            <span>Dreamure</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 text-sm md:text-base font-semibold tracking-wider cursor-pointer hero-animate-logo opacity-0">
            <Activity size={18} className="text-white/60" />
            <span>SWITCH.WIN</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 text-sm md:text-base font-semibold tracking-wider cursor-pointer hero-animate-logo opacity-0">
            <Globe size={18} className="text-white/60" />
            <span>Glow sphere</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 text-sm md:text-base font-semibold tracking-wider cursor-pointer hero-animate-logo opacity-0">
            <MapPin size={18} className="text-white/60" />
            <span>PinSpace</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 text-sm md:text-base font-semibold tracking-wider cursor-pointer hero-animate-logo opacity-0">
            <Sparkle size={18} className="text-white/60" />
            <span>Visionix</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
