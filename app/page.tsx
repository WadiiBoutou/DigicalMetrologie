"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useLayoutEffect } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Factory,
  FlaskConical,
  Leaf,
  ShoppingCart,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { AppShell } from "@/components/digical/AppShell";
import { PrecisionClock } from "@/components/PrecisionClock";
import { useDigicalI18n } from "@/components/digical/language";
import { useDigicalCart } from "@/components/digical/useDigicalCart";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function HomeContent() {
  const { t } = useDigicalI18n();
  const heroRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance
      const tl = gsap.timeline();
      tl.from(".hero-char", {
        y: 100,
        opacity: 0,
        stagger: 0.05,
        duration: 1,
        ease: "expo.out",
      })
        .from(".hero-sub", { opacity: 0, y: 20 }, "-=0.5")
        .from(".hero-video", { scale: 1.1, filter: "blur(10px)", duration: 2 }, 0);

      // Scroll Reveal for sections
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });
    });
    return () => ctx.revert();
  }, []);

  const pillars = [
    { id: "01", title: t("homePillarVenteTitle"), icon: ShoppingCart, href: "/catalogue" },
    { id: "02", title: t("homePillarRepTitle"), icon: Wrench, href: "/services" },
    { id: "03", title: t("homePillarEtalTitle"), icon: FlaskConical, href: "/services" },
  ];

  return (
    <div className="bg-app-bg text-app-text selection:bg-primary selection:text-white overflow-hidden">

      {/* --- LUXE HERO SECTION --- */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 lg:px-12 pt-20">
        <div className="absolute inset-0 z-0 hero-video overflow-hidden">
          <video autoPlay muted loop playsInline className="h-full w-full object-cover opacity-40 grayscale">
            <source src="/video/video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-app-bg via-transparent to-app-bg" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px]">
          <div className="flex flex-col items-start space-y-8">
            <div className="overflow-hidden">
              <span className="hero-sub block font-mono text-xs uppercase tracking-[0.5em] text-primary mb-4">
                High-End Industrial Solutions
              </span>
            </div>
            <h1 className="font-display text-[12vw] sm:text-[10vw] lg:text-[8.5vw] leading-[0.85] tracking-tighter uppercase italic">
              <span className="hero-char inline-block">{t("homeHeroLine1")}</span><br />
              <span className="hero-char inline-block text-primary/80 ml-[10vw]">Precision.</span>
            </h1>

            <div className="hero-sub flex flex-col md:flex-row gap-12 items-end w-full justify-between pt-12">
              <p className="max-w-md text-lg text-app-text/60 font-light leading-relaxed border-l border-primary/30 pl-6">
                {t("homeHeroLead")}
              </p>
              <div className="flex gap-6">
                <Link href="/catalogue" className="h-16 px-10 flex items-center bg-primary text-white hover:bg-white hover:text-black transition-all duration-500 rounded-full font-display uppercase text-sm tracking-widest">
                  {t("homeCtaCatalog")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PILLARS: MINIMALIST TILES --- */}
      <section ref={pillarsRef} className="py-32 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-px bg-app-border-strong border border-app-border-strong">
          {pillars.map((pillar) => (
            <Link
              href={pillar.href}
              key={pillar.id}
              className="reveal group bg-app-bg p-12 lg:p-20 flex flex-col justify-between aspect-[4/5] hover:bg-app-surface transition-colors duration-700"
            >
              <div className="space-y-8">
                <span className="font-mono text-sm text-primary">{pillar.id}</span>
                <h3 className="font-display text-4xl lg:text-5xl font-light leading-none uppercase tracking-tighter">
                  {pillar.title}
                </h3>
              </div>
              <div className="flex items-center justify-between">
                <pillar.icon className="w-12 h-12 stroke-[0.5] text-app-text/30 group-hover:text-primary transition-colors" />
                <ArrowRight className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- TECHNICAL PRECISION METRICS --- */}
      <section ref={metricsRef} className="py-24 px-6 lg:px-12 bg-app-bg border-y border-app-border">
        <div className="max-w-[1400px] mx-auto">

          {/* Header Area */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-20 reveal">
            <div className="space-y-4">
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.5em] text-primary">
                <span className="w-8 h-px bg-primary" />
                System Calibration
              </div>
              <h2 className="font-display text-6xl lg:text-8xl font-light tracking-tighter leading-none">
                {t("homeKpiTitle")}
              </h2>
            </div>
            <p className="max-w-xs text-sm text-app-text/40 font-light leading-relaxed border-l border-app-border pl-6">
              {t("homeKpiLead")}
            </p>
          </div>

          {/* Metrics Grid with Blueprint Borders */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-app-border reveal overflow-hidden rounded-sm">
            {[
              { v: "5+", l: t("homeKpiL1"), tag: "EXP" },
              { v: "98.7%", l: t("homeKpiL2"), tag: "ACC" },
              { v: "24h", l: t("homeKpiL3"), tag: "RSP" },
              { v: "100+", l: t("homeKpiL4"), tag: "CLT" }
            ].map((k, idx) => (
              <div
                key={idx}
                className="group relative p-12 bg-app-bg hover:bg-app-surface transition-all duration-700 border-r last:border-r-0 border-app-border"
              >
                {/* Background Decor */}
                <div className="absolute top-4 right-6 font-mono text-[9px] text-app-muted opacity-30 group-hover:text-primary transition-colors">
                  // {k.tag}_0{idx + 1}
                </div>

                {/* Value */}
                <div className="relative">
                  <span className="absolute -left-4 top-0 w-[1px] h-0 group-hover:h-full bg-primary transition-all duration-500" />
                  <div className="text-6xl lg:text-7xl font-display font-light tracking-tighter text-app-text group-hover:translate-x-2 transition-transform duration-500">
                    {k.v}
                  </div>
                </div>

                {/* Label */}
                <div className="mt-8 space-y-4">
                  <div className="h-px w-6 bg-app-border group-hover:w-12 group-hover:bg-primary transition-all duration-500" />
                  <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-app-muted leading-loose max-w-[120px]">
                    {k.l}
                  </div>
                </div>

                {/* Corner Accent (only visible on hover) */}
                <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[10px] border-r-[10px] border-transparent group-hover:border-r-primary/20 group-hover:border-b-primary/20 transition-all" />
              </div>
            ))}
          </div>

          {/* Bottom Precision Accent */}
          <div className="mt-12 flex justify-between items-center opacity-20 font-mono text-[8px] tracking-[0.4em] uppercase">
            <span>Data integrity verified // 2026</span>
            <div className="flex gap-4">
              <span>Latency: 0.002ms</span>
              <span>Status: Optimal</span>
            </div>
          </div>

        </div>
      </section>

      {/* --- SECTORS: IMAGE REVEAL --- */}
      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto space-y-32">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 reveal">
            <h2 className="font-display text-7xl lg:text-9xl tracking-tighter leading-none">
              Industries <br /> <span className="text-primary italic">We Serve</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { t: "Industry", img: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=1200", icon: Factory },
              { t: "Agro", img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200", icon: Leaf },
              { t: "Laboratory", img: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1200", icon: Cpu }
            ].map((sector, i) => (
              <div key={i} className="reveal group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-8">
                  <Image
                    src={sector.img}
                    fill
                    alt={sector.t}
                    className="object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="flex justify-between items-center border-b border-app-border pb-6">
                  <h4 className="text-2xl font-display uppercase tracking-tight">{sector.t}</h4>
                  <sector.icon className="w-5 h-5 opacity-40 group-hover:text-primary group-hover:opacity-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS: LUXE MINIMAL --- */}
      <section className="py-32 px-6 lg:px-12 border-t border-app-border">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="reveal">
            <span className="section-eyebrow mb-8 inline-block">Testimonials</span>
            <h2 className="font-display text-6xl tracking-tighter">Trusted by the <br /> best in Morocco.</h2>
          </div>
          <div className="space-y-20">
            {[
              { q: t("homeQ1"), n: "Yassine El Idrissi", r: "Quality Manager" },
              { q: t("homeQ2"), n: "Salma Bennani", r: "Lab Head" }
            ].map((p, i) => (
              <div key={i} className="reveal space-y-6">
                <p className="text-3xl font-light leading-snug italic text-app-text/80">"{p.q}"</p>
                <div className="flex items-center gap-4">
                  <div className="h-px w-8 bg-primary" />
                  <div>
                    <p className="font-display uppercase text-sm">{p.n}</p>
                    <p className="text-[10px] uppercase tracking-widest opacity-40">{p.r}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function HomePage() {
  const { cartCount } = useDigicalCart();
  return (
    <AppShell route="home" cartCount={cartCount}>
      <HomeContent />
    </AppShell>
  );
}