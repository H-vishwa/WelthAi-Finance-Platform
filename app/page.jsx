"use client";
import HeroSection from "@/components/hero";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "@/data/landing";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/* Shared section width — consistent across all sections */
const INNER = "max-w-6xl mx-auto px-6 sm:px-8";

export default function Home() {
  useScrollReveal();

  return (
    <div className="w-full">

      {/* ── HERO (full-width by design) ── */}
      <HeroSection />

      {/* ── STATS ── */}
      <section className="py-20 reveal-stagger">
        <div className={INNER}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {statsData.map((stat, index) => (
              <div
                key={index}
                className="rounded-2xl p-6 text-center border border-blue-500/10 bg-[#0d1426]/70 backdrop-blur-xl shadow-[0_4px_40px_rgba(0,0,0,0.4)] hover:border-blue-500/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl font-black mb-1 gradient-title">
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24  reveal-stagger">
        <div className={INNER}>
          <div className="text-center mb-16">
            <div className="w-20 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything you need to manage{" "}
              <span className="gradient-title text-3xl md:text-4xl">your finances</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
              Powerful tools built for individuals and teams who take their finances seriously.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 reveal-stagger">
            {featuresData.map((feature, index) => (
              <div
                key={index}
                className="tilt-card rounded-2xl p-7 border border-blue-500/10 bg-[#0d1426]/70 backdrop-blur-xl shadow-[0_4px_40px_rgba(0,0,0,0.4)] hover:border-blue-500/30 hover:shadow-[0_8px_60px_rgba(59,130,246,0.1)] transition-all duration-300 cursor-default"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-blue-500/10 border border-blue-500/20">
                  {feature.icon}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-[#0a0f1e]/5 reveal">
        <div className={INNER}>
          <div className="text-center mb-16">
            <div className="w-20 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-slate-400 max-w-lg mx-auto text-sm">
              Get started in minutes. No complexity, just results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal-stagger">
            {howItWorksData.map((step, index) => (
              <div
                key={index}
                className="rounded-2xl p-8 text-center border border-blue-500/10 bg-[#0d1426]/70 backdrop-blur-xl shadow-[0_4px_40px_rgba(0,0,0,0.4)] hover:border-blue-500/30 hover:scale-[1.02] transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 bg-gradient-to-br from-blue-500/20 to-cyan-500/15 border border-blue-500/25">
                  {step.icon}
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-[#080d1a]/5 reveal-stagger">
        <div className={INNER}>
          <div className="text-center mb-16">
            <div className="w-20 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Loved by thousands</h2>
            <p className="text-slate-400 max-w-lg mx-auto text-sm">
              See what our users say about transforming their finances with Welth.
            </p>
          </div>

          {/* Carousel with enough horizontal room for nav arrows */}
          <div className="relative px-10">
            <Carousel className="w-full">
              <CarouselContent className="-ml-3">
                {testimonialsData.map((testimonial, index) => (
                  <CarouselItem key={index} className="pl-3 md:basis-1/2 lg:basis-1/3">
                    <div className="rounded-2xl p-6 h-full flex flex-col border border-blue-500/10 bg-[#0d1426]/70 backdrop-blur-xl shadow-[0_4px_40px_rgba(0,0,0,0.4)] hover:border-blue-500/25 transition-all duration-300">
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={13} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed italic mb-6 flex-1">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-center gap-3">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={40}
                          height={40}
                          className="rounded-full ring-2 ring-blue-500/30"
                          unoptimized
                        />
                        <div>
                          <div className="text-white font-semibold text-sm">{testimonial.name}</div>
                          <div className="text-slate-500 text-xs">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* Arrows now sit inside the px-10 padding zone — no overflow */}
              <CarouselPrevious className="left-0 border-white/10 bg-[#0d1426] text-slate-300 hover:bg-[#1a2540] hover:text-white" />
              <CarouselNext className="right-0 border-white/10 bg-[#0d1426] text-slate-300 hover:bg-[#1a2540] hover:text-white" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-[#080d1a]/5 reveal">
        <div className={INNER}>
          <div className="relative rounded-3xl p-12 md:p-20 text-center overflow-hidden border border-blue-500/5 bg-[#0f1f3d]/35 shadow-[0_0_80px_rgba(59,130,246,0.08)]">
            {/* Glow orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="orb orb-1 w-72 h-72 -top-12 -left-12 bg-blue-500/10" />
              <div className="orb orb-2 w-72 h-72 -bottom-12 -right-12 bg-violet-500/10" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                Ready to take control of{" "}
                <span className="gradient-title text-3xl md:text-5xl">your Finances?</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto">
                Join thousands of users already managing their finances smarter with Welth
              </p>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="btn-shimmer px-10 py-6 text-base font-semibold gap-2 rounded-xl cursor-pointer bg-gradient-to-r from-blue-500 to-cyan-400 border-0 shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:shadow-[0_0_50px_rgba(59,130,246,0.7)] transition-shadow"
                >
                  Start Free Trial
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
