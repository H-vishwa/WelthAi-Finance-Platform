"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import HeroSection from "@/components/hero";
import { Button } from "@/components/ui/button";
import {
  featuresData,
  howItWorksData,
  pricingPlans,
  faqData,
} from "@/data/landing";
import {
  Check,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const [isYearly, setIsYearly] = useState(true);
  const [expandedFaq, setExpandedFaq] = useState(0); // First FAQ open by default

  const featuresRef = useRef(null);
  const stepsRef = useRef(null);
  const stepsCanvasRef = useRef(null);
  const pricingRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);
  const footerRef = useRef(null);

  // How It Works Section: Shooting Stars Canvas Animation
  useEffect(() => {
    const canvas = stepsCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const stars = [];

    const createStar = () => {
      // Recalculate width/height if still 0 to prevent spawning out of screen
      const currentWidth = width || canvas.offsetWidth || window.innerWidth;
      const currentHeight = height || canvas.offsetHeight || 500;
      return {
        x: Math.random() * currentWidth,
        y: Math.random() * (currentHeight / 1.8),
        length: Math.random() * 100 + 60, // slightly longer trails
        speed: Math.random() * 4 + 3.5,    // faster movement
        dx: Math.random() * 2.5 + 2.5,
        dy: Math.random() * 2 + 1.5,
        opacity: 1.0,
        fadeSpeed: Math.random() * 0.015 + 0.008,
      };
    };

    const animate = () => {
      const currentWidth = canvas.offsetWidth;
      const currentHeight = canvas.offsetHeight;

      // Update dimensions if they changed (critical for dynamic SPA layout loading)
      if (currentWidth !== width || currentHeight !== height) {
        width = canvas.width = currentWidth;
        height = canvas.height = currentHeight;
      }

      ctx.clearRect(0, 0, width, height);

      // Spawn stars slightly more often
      if (Math.random() < 0.025 && stars.length < 4) {
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
        grad.addColorStop(0.15, `rgba(168, 85, 247, ${star.opacity * 0.75})`); // Vibrant purple glow
        grad.addColorStop(0.5, `rgba(99, 102, 241, ${star.opacity * 0.35})`);  // Soft indigo trail
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6; // thicker line width for better visibility
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

  useEffect(() => {
    // Register GSAP ScrollTrigger plugin client-side
    gsap.registerPlugin(ScrollTrigger);

    // GSAP Entrance Animations for Section Headers
    const sections = [
      { ref: featuresRef, selector: ".features-header" },
      { ref: stepsRef, selector: ".steps-header" },
      { ref: pricingRef, selector: ".pricing-header" },
      { ref: faqRef, selector: ".faq-header" },
    ];

    sections.forEach(({ ref, selector }) => {
      const headerElements = ref.current.querySelectorAll(`${selector} > *`);
      gsap.fromTo(
        headerElements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    // Features Section Cards
    const featureCards = featuresRef.current.querySelectorAll(".feature-card");
    gsap.fromTo(
      featureCards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    // How It Works Steps
    const steps = stepsRef.current.querySelectorAll(".step-card");
    gsap.fromTo(
      steps,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: stepsRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    // Pricing Cards
    const pricingCards = pricingRef.current.querySelectorAll(".pricing-card");
    gsap.fromTo(
      pricingCards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: pricingRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    // FAQ Section
    const faqItems = faqRef.current.querySelectorAll(".faq-item");
    gsap.fromTo(
      faqItems,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: faqRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    // CTA Text & Button reveal
    const ctaElements = ctaRef.current.querySelectorAll(".cta-animate > *");
    gsap.fromTo(
      ctaElements,
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    // Big WELTH bottom text reveal
    const bigText = footerRef.current.querySelector(".gradient-welth-big");
    gsap.fromTo(
      bigText,
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 0.85,
        duration: 1.2,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: bigText,
          start: "top 95%",
          toggleActions: "play reverse play reverse",
        },
      }
    );
  }, []);

  const calculatePrice = (plan) => {
    if (plan.price === "Custom") return "Custom";
    const baseVal = parseInt(plan.price.replace(/,/g, ""));
    const finalVal = isYearly ? Math.round(baseVal * 0.8) : baseVal;
    return `₹${finalVal.toLocaleString("en-IN")}`;
  };

  return (
    <div className="w-full bg-[#030209] relative overflow-hidden">
      {/* Background ambient orbs blending with hero */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="orb w-[500px] h-[500px] top-[10%] left-[-10%] bg-amber-500/3 blur-[100px] animate-delay-0s" />
        <div className="orb w-[600px] h-[600px] top-[40%] right-[-10%] bg-violet-600/5 blur-[120px] animate-delay-2.5s" />
        <div className="orb w-[450px] h-[450px] top-[75%] left-[20%] bg-indigo-500/3 blur-[100px] animate-delay-5s" />
      </div>

      {/* ── HERO ── */}
      <HeroSection />

      {/* ── FEATURES SECTION ── */}
      <section
        id="features"
        ref={featuresRef}
        className="py-28 relative scroll-mt-20"
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-20 features-header">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-white/10 bg-white/5 text-slate-300 mb-6">
              <Sparkles size={12} />
              Platform Features
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Everything you need to manage{" "}
              <span className="gradient-title">your finances</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-base leading-relaxed">
              Powerful tools built for individuals and teams who take their finances seriously.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuresData.map((feature, index) => (
              <div
                key={index}
                className="feature-card tilt-card rounded-2xl p-8 border border-white/5 bg-neutral-900/30 backdrop-blur-xl hover:border-white/15 hover:shadow-[0_8px_40px_rgba(255,255,255,0.03)] transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white/3 border border-white/8 group-hover:bg-white/5 group-hover:border-white/20 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS SECTION ── */}
      <section
        id="how-it-works"
        ref={stepsRef}
        className="py-24 bg-[#0a0a0a]/40 border-y border-white/5 scroll-mt-20 relative overflow-hidden"
      >
        {/* Ambient background and Shooting Stars Canvas */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <canvas ref={stepsCanvasRef} className="absolute inset-0 w-full h-full opacity-75" />
          
          {/* Starry overlay */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.2) 1.2px, transparent 1.2px),
                                radial-gradient(circle, rgba(255,255,255,0.15) 1.8px, transparent 1.8px)`,
              backgroundSize: "40px 40px, 80px 80px",
              backgroundPosition: "0 0, 20px 20px",
            }}
          />

          {/* Indigo/purple soft ambient glow */}
          <div className="absolute top-[20%] left-[20%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-violet-600/10 blur-[100px] md:blur-[130px]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="text-center mb-20 steps-header">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-white/10 bg-white/5 text-slate-300 mb-6">
              Workflow
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Get Started in Minutes
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto text-base">
              No complexity, just results. Set up your workflow with ease.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksData.map((step, index) => (
              <div
                key={index}
                className="step-card rounded-2xl p-8 text-center border border-white/5 bg-neutral-900/20 backdrop-blur-xl hover:border-white/10 hover:translate-y-[-2px] transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                  {step.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING PLANS ── */}
      <section
        id="pricing"
        ref={pricingRef}
        className="py-28 relative scroll-mt-20 overflow-hidden"
      >
        {/* Starry Sky pattern and vertical light beams (matching reference image) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10 bg-black">
          {/* Starry Sky */}
          <div
            className="absolute inset-0 opacity-45"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px),
                                radial-gradient(circle, rgba(255,255,255,0.1) 1.5px, transparent 1px)`,
              backgroundSize: "32px 32px, 64px 64px",
              backgroundPosition: "0 0, 16px 16px",
            }}
          />
          {/* Left vertical violet beam */}
          <div className="absolute top-0 left-[15%] w-[180px] h-[120%] bg-gradient-to-b from-violet-500/8 via-purple-500/2 to-transparent blur-[90px] transform -rotate-3" />
          {/* Right vertical violet/blue beam */}
          <div className="absolute top-0 right-[15%] w-[200px] h-[120%] bg-gradient-to-b from-indigo-500/8 via-violet-500/2 to-transparent blur-[110px] transform rotate-3" />
          
          {/* Deep ambient glow in center */}
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-neutral-900/5 blur-[150px] rounded-full" />
        </div>

        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16 pricing-header">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-white/10 bg-white/5 text-slate-300 mb-6">
              Our Pricing
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-none">
              Flexible Plans for
              <br />
              Every Enterprise
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-base leading-relaxed mb-12">
              From startups to global enterprises, Welth offers AI-powered solutions.
            </p>

            {/* Toggle Switch */}
            <div className="inline-flex items-center p-1 rounded-full bg-neutral-900/40 border border-white/10 backdrop-blur-md">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  !isYearly
                    ? "bg-white/10 text-white shadow-[0_2px_10px_rgba(255,255,255,0.05)] border border-white/10"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isYearly
                    ? "bg-white/10 text-white shadow-[0_2px_10px_rgba(255,255,255,0.05)] border border-white/10"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Yearly
                <span className="text-[10px] bg-white/10 border border-white/15 text-white px-2 py-0.5 rounded-full uppercase tracking-normal">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {pricingPlans.map((plan, index) => {
              const isPopular = plan.isPopular;
              const isEnterprise = plan.price === "Custom";

              return (
                <div
                  key={index}
                  className={`pricing-card rounded-2xl flex flex-col justify-between p-8 ${
                    isPopular ? "glow-card-featured" : "glow-card"
                  } ${isEnterprise ? "lg:col-span-1" : ""}`}
                >
                  <div>
                    {isEnterprise && (
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                        Go for more power
                      </span>
                    )}
                    <h3 className="text-white font-extrabold text-2xl mb-4">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-1 mb-6 border-b border-white/5 pb-6">
                      <span className="text-4xl md:text-5xl font-black text-white tracking-tight">
                        {calculatePrice(plan)}
                      </span>
                      {plan.price !== "Custom" && (
                        <span className="text-slate-500 text-sm">/month</span>
                      )}
                    </div>

                    {isEnterprise && (
                      <p className="text-slate-400 text-sm leading-relaxed mb-6">
                        {plan.description}
                      </p>
                    )}

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed"
                        >
                          <span className="w-5 h-5 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white shrink-0 mt-0.5">
                            <Check size={11} strokeWidth={3} />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <Link href={isEnterprise ? "mailto:sales@welth.com" : "/dashboard"}>
                      <button
                        className={`w-full py-4 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                          isPopular
                            ? "bg-white text-black hover:bg-neutral-200 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_35px_rgba(255,255,255,0.25)] border-0"
                            : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                        }`}
                      >
                        {plan.buttonText}
                      </button>
                    </Link>

                    <div className="mt-6 text-center border-t border-white/5 pt-4">
                      <span className="text-xs text-slate-500 font-medium">
                        {plan.subtext}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section
        id="faq"
        ref={faqRef}
        className="py-28 border-t border-white/5 scroll-mt-20"
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-20 faq-header">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-white/10 bg-white/5 text-slate-300 mb-6">
              FAQ
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Curious About Welth?
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-base">
              Get answers to common questions about our AI-powered solution partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {faqData.map((faq, index) => {
              const isOpen = expandedFaq === index;

              return (
                <div
                  key={index}
                  className="faq-item border-b border-white/5 py-5 transition-all duration-300"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? -1 : index)}
                    className="w-full flex items-center justify-between text-left py-2 group cursor-pointer"
                  >
                    <span className="text-white font-semibold text-base group-hover:text-white transition-colors duration-200">
                      {faq.question}
                    </span>
                    <span className="text-slate-400 ml-4 shrink-0 transition-colors duration-200">
                      {isOpen ? (
                        <Minus size={18} className="text-white" />
                      ) : (
                        <Plus size={18} className="group-hover:text-white" />
                      )}
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-slate-400 text-sm leading-relaxed pr-6">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section
        ref={ctaRef}
        className="py-28 cta-fluid-bg relative overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="relative rounded-3xl p-6 sm:p-12 md:p-20 text-center overflow-hidden border border-white/10 bg-neutral-900/30 shadow-[0_0_80px_rgba(0,0,0,0.8)] backdrop-blur-xl">
            {/* Ambient gradients */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              {/* Teal glow in top-left */}
              <div className="absolute -top-[20%] -left-[20%] w-[350px] md:w-[500px] h-[350px] md:h-[500px] rounded-full bg-teal-500/10 blur-[80px] md:blur-[120px]" />
              
              {/* Violet/Purple glow in bottom-right */}
              <div className="absolute -bottom-[20%] -right-[20%] w-[350px] md:w-[500px] h-[350px] md:h-[500px] rounded-full bg-purple-600/15 blur-[100px] md:blur-[150px]" />
              
              {/* Starry overlay to give a premium feel */}
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                  backgroundSize: "36px 36px",
                }}
              />

              {/* Sparkling lights above the gradient */}
              <div className="absolute inset-0">
                <div className="absolute top-[20%] left-[15%] w-[3px] h-[3px] rounded-full bg-white animate-sparkle-1" />
                <div className="absolute top-[75%] left-[25%] w-[4px] h-[4px] rounded-full bg-teal-200 animate-sparkle-3" />
                <div className="absolute top-[30%] right-[20%] w-[4px] h-[4px] rounded-full bg-purple-200 animate-sparkle-4" />
                <div className="absolute top-[70%] right-[15%] w-[3px] h-[3px] rounded-full bg-white animate-sparkle-6" />
              </div>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto cta-animate">
              {/* Decorative badge similar to Hero Section */}
              <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-slate-300 backdrop-blur-md">
                <Sparkles size={14} className="text-white" />
                Unleash AI Financial Power
              </div>

              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
                Step Into WELTH
                <br />
                The Future of Intelligent Finance
              </h2>
              <p className="text-slate-400 text-base md:text-lg mb-10 leading-relaxed">
                Everything you need to track, analyze, and optimize your finances in one single workspace. Easy setup, no code required.
              </p>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="btn-shimmer px-10 py-6 text-base font-semibold gap-2 rounded-xl cursor-pointer bg-black hover:bg-black/75 border border-white/20 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(139,92,246,0.35)] transition-all duration-300"
                >
                  Get Started Free
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        ref={footerRef}
        className="pt-28 pb-10 bg-black border-t border-white/5 overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20 text-left">
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">
                Navigator
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/"
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#features"
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#how-it-works"
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:contact@welth.com"
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">
                Documentation
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Changelog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Terms and Conditions
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">
                Other Pages
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Launching Soon
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#faq"
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">
                Social Connect
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Reddit
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Large WELTH Rainbow text */}
          <div className="relative py-10 mb-12 select-none pointer-events-none">
            <div className="gradient-welth-big">
              WELTH
            </div>
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <div className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent blur-3xl z-0" />
          </div>

          {/* Bottom Copyright Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/5 pt-8 text-xs text-slate-500 space-y-4 sm:space-y-0 text-center sm:text-left">
            <div>All rights reserved for WELTH</div>
            <div>
              <Link href="#" className="hover:text-slate-300 transition-colors duration-200">
                Cookie Settings
              </Link>
            </div>
            <div>
              Designed by: UI-UX Tour (
              <a
                href="https://instagram.com/himanshu.design"
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition-colors duration-200"
              >
                @himanshu.design
              </a>
              )
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
