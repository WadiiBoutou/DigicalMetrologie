"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, Hourglass, ShoppingCart, Wrench } from "lucide-react";
import { AppShell } from "@/components/digical/AppShell";
import { useDigicalI18n } from "@/components/digical/language";
import { useDigicalCart } from "@/components/digical/useDigicalCart";
import { PrecisionClock } from "@/components/PrecisionClock";

/** Match pillar card surface (tech-surface) on black disc */
const pillarGlyphProps = {
  className: "h-7 w-7 shrink-0 text-tech-surface",
  strokeWidth: 2 as const,
  fill: "currentColor" as const,
  stroke: "currentColor" as const,
};

function PillarIcon({ children, isActive }: { children: ReactNode; isActive: boolean }) {
  return (
    <motion.div
      className="mb-6 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-black"
      animate={isActive ? { scale: 1.06 } : { scale: 1 }}
      whileHover={{ scale: 1.06 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
    >
      {children}
    </motion.div>
  );
}

function HomeContent() {
  const { t } = useDigicalI18n();
  const [pillarHover, setPillarHover] = useState<string | null>(null);

  const pillars = [
    { id: "vente", title: t("homePillarVenteTitle"), desc: t("homePillarVenteDesc") },
    { id: "reparation", title: t("homePillarRepTitle"), desc: t("homePillarRepDesc") },
    { id: "etalonnage", title: t("homePillarEtalTitle"), desc: t("homePillarEtalDesc") },
  ] as const;

  function pillarGlyph(id: (typeof pillars)[number]["id"]): ReactNode {
    switch (id) {
      case "vente":
        return <ShoppingCart {...pillarGlyphProps} aria-hidden />;
      case "reparation":
        return <Wrench {...pillarGlyphProps} aria-hidden />;
      case "etalonnage":
        return <Hourglass {...pillarGlyphProps} aria-hidden />;
    }
  }

  const kpiRows = [
    { value: "15+", label: t("homeKpiL1") },
    { value: "98.7%", label: t("homeKpiL2") },
    { value: "24/48h", label: t("homeKpiL3") },
    { value: "3200+", label: t("homeKpiL4") },
  ] as const;

  const processSteps = [
    t("homeProcStep1"),
    t("homeProcStep2"),
    t("homeProcStep3"),
    t("homeProcStep4"),
  ] as const;

  const showcaseCards = [
    {
      src: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=1200&h=800&fm=jpg&fit=crop&q=80",
      alt: t("homeCard1Alt"),
      kicker: t("homeCard1Kicker"),
      title: t("homeCard1Title"),
      blurb: t("homeCard1Blurb"),
    },
    {
      src: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=800&fm=jpg&fit=crop&q=80",
      alt: t("homeCard2Alt"),
      kicker: t("homeCard2Kicker"),
      title: t("homeCard2Title"),
      blurb: t("homeCard2Blurb"),
    },
    {
      src: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
      alt: t("homeCard3Alt"),
      kicker: t("homeCard3Kicker"),
      title: t("homeCard3Title"),
      blurb: t("homeCard3Blurb"),
    },
  ] as const;

  const quotes = [t("homeQ1"), t("homeQ2"), t("homeQ3")] as const;

  const faqs = [
    { q: t("homeFaq1Q"), a: t("homeFaq1A") },
    { q: t("homeFaq2Q"), a: t("homeFaq2A") },
    { q: t("homeFaq3Q"), a: t("homeFaq3A") },
  ] as const;
  const featuredTestimonials = [
    { quote: quotes[0], name: "Goraniie", role: "Novarenir" },
    { quote: quotes[1], name: "Georota", role: "Lassaorandsre" },
  ] as const;
  const featuredFaq = faqs[0];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative px-4 pb-8 pt-8 lg:px-10 lg:pb-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col overflow-hidden rounded-3xl border-2 border-app-border bg-tech-bg shadow-hard lg:flex-row"
          >
            {/* Left Content */}
            <div className="flex flex-col justify-center p-8 lg:w-[60%] lg:p-16">
              <h1 className="mb-6 font-display text-5xl font-black uppercase leading-[0.9] tracking-tighter sm:text-7xl md:text-8xl">
                <span className="block text-app-text">{t("homeHeroLine1")}</span>
                <span className="text-precision block">{t("homeHeroLine2Emphasis")}</span>
              </h1>
              <p className="mb-10 max-w-lg font-display text-lg font-bold uppercase tracking-tight text-app-text/80 md:text-xl">
                {t("homeHeroLead")}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/catalogue"
                  className="inline-flex h-12 items-center justify-center rounded-xl border-2 border-black bg-primary px-8 font-display text-xs font-black uppercase tracking-tight text-white shadow-hard-sm transition-all hover:-translate-y-0.5 hover:shadow-hard"
                >
                  {t("homeCtaCatalog")}
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-xl border-2 border-black bg-tech-surface px-8 font-display text-xs font-black uppercase tracking-tight text-app-text shadow-control transition-all hover:-translate-y-0.5"
                >
                  {t("homeCtaQuote")}
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative lg:w-[40%] p-8 lg:p-12">
               <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border-2 border-app-border">
                  <Image
                    src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=1400&h=1400&fm=jpg&fit=crop&q=80"
                    alt={t("homeHeroImgAlt")}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mid-page: each block is its own card (no outer grouper) */}
      <section className="px-4 pb-8 lg:px-10 lg:pb-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
            {/* Piliers */}
            <div className="rounded-3xl border-2 border-app-border bg-tech-bg p-6 shadow-hard lg:p-8">
              <h2 className="mb-6 font-display text-3xl font-black uppercase tracking-tight text-app-text md:text-4xl">
                {t("homePillarsTitle")}
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {pillars.map((p) => (
                  <div
                    key={p.id}
                    onMouseEnter={() => setPillarHover(p.id)}
                    onMouseLeave={() => setPillarHover(null)}
                    className="group rounded-xl border-2 border-app-border bg-tech-surface p-5 shadow-hard-sm transition-all hover:-translate-y-0.5 hover:shadow-hard"
                  >
                    <PillarIcon isActive={pillarHover === p.id}>{pillarGlyph(p.id)}</PillarIcon>
                    <h3 className="mb-2 font-display text-2xl font-black uppercase tracking-tight text-app-text">{p.title}</h3>
                    <p className="mb-4 text-sm font-semibold text-app-text/80">{p.desc}</p>
                    <Link href={p.id === "vente" ? "/catalogue" : "/services"} className="inline-flex items-center text-xs font-black uppercase tracking-wider text-app-text hover:text-primary">
                      {t("homePillarMore")} <ArrowRight className="ms-2 h-4 w-4" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* KPI */}
            <div className="rounded-3xl border-2 border-app-border bg-tech-bg p-6 shadow-hard lg:p-8">
              <h2 className="text-center font-display text-4xl font-black uppercase tracking-tight text-app-text md:text-5xl">
                {t("homeKpiTitle")}
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-center text-base font-semibold text-app-text/80">
                {t("homeKpiLead")}
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {kpiRows.map((kpi, idx) => (
                  <motion.div
                    key={kpi.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.35, delay: idx * 0.08 }}
                    className="rounded-xl border-2 border-app-border bg-tech-surface p-4 text-center shadow-hard-sm"
                  >
                    <div className="font-display text-4xl font-black text-primary">{kpi.value}</div>
                    <p className="mt-1 font-display text-xl font-black uppercase text-app-text">{kpi.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Process — full-width card (then Industrie below, same pattern as Piliers → KPI) */}
            <div className="rounded-3xl border-2 border-app-border bg-tech-bg p-6 shadow-hard lg:p-8">
              <div className="flex flex-col gap-8">
                <div className="min-w-0">
                  <h2 className="font-display text-4xl font-black uppercase tracking-tight text-app-text">{t("homeProcTitle")}</h2>
                  <p className="mt-3 text-sm font-semibold text-app-text/80">{t("homeProcLead")}</p>
                </div>
                <div className="min-w-0 w-full">
                  <PrecisionClock />
                </div>
              </div>
            </div>

            <div className="rounded-3xl border-2 border-app-border bg-tech-bg p-6 shadow-hard lg:p-8">
              <h2 className="font-display text-4xl font-black uppercase tracking-tight text-app-text">{t("homeCaseTitle")}</h2>
              <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                {showcaseCards.map((item, idx) => (
                  <motion.div
                    key={item.kicker}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.35, delay: idx * 0.08 }}
                    className="group relative aspect-square w-full overflow-hidden rounded-xl border-2 border-app-border bg-black/10 shadow-hard-sm"
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 30vw, (max-width: 1024px) 28vw, 280px"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/75 to-transparent p-1.5 sm:p-2">
                      <p className="font-display text-[10px] font-black uppercase leading-snug text-white sm:text-xs md:text-sm">{item.title}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Témoignages + FAQ */}
            <div className="grid grid-cols-1 gap-8 rounded-3xl border-2 border-app-border bg-tech-bg p-6 shadow-hard lg:grid-cols-2 lg:p-8">
              <div className="min-w-0">
                <h2 className="font-display text-4xl font-black uppercase tracking-tight md:text-5xl">
                  {t("homeTrustTitle")}
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {featuredTestimonials.map((item) => (
                    <motion.blockquote
                      key={item.name}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.35 }}
                      className="relative rounded-xl border-2 border-app-border bg-tech-surface p-4 pb-7 shadow-hard-sm"
                    >
                      <p className="text-sm font-semibold text-app-text/85">&ldquo;{item.quote}&rdquo;</p>
                      <p className="mt-4 text-sm font-black uppercase leading-none text-app-text">{item.name}</p>
                      <p className="mt-1 text-sm font-semibold leading-none text-app-text/80">{item.role}</p>
                      <span className="brutal-speech-tail absolute -bottom-3 left-7 h-5 w-5 rotate-45 border-b-2 border-r-2 border-app-border bg-tech-surface" />
                    </motion.blockquote>
                  ))}
                </div>
              </div>
              <div className="min-w-0">
                <h2 className="font-display text-4xl font-black uppercase tracking-tight md:text-5xl">
                  {t("homeCtaBoxTitle")}
                </h2>
                <div className="brutal-surface-invert mt-6 rounded-xl border-2 border-tech-muted bg-tech-text p-5 text-white shadow-hard md:p-6">
                  <h3 className="font-display text-5xl font-black uppercase leading-none text-white">FAQ</h3>
                  <p className="mt-3 text-sm font-semibold text-white/75">
                    {featuredFaq.a}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href="/contact"
                      className="inline-flex h-11 items-center justify-center rounded-xl border-2 border-black bg-tech-surface px-6 font-styrene text-xs font-bold uppercase tracking-wider text-black shadow-hard-sm transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-black hover:shadow-hard-hover-primary"
                    >
                      {t("homeCtaBoxPrimary")}
                    </Link>
                    <Link
                      href="/catalogue"
                      className="inline-flex h-11 items-center justify-center rounded-xl border-2 border-white/30 bg-tech-surface/10 px-6 font-styrene text-xs font-bold uppercase tracking-wider text-white"
                    >
                      {t("homeCtaBoxSecondary")}
                    </Link>
                  </div>
                </div>
              </div>
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
