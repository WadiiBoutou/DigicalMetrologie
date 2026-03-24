"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { ArrowRight } from "lucide-react";
import { AppShell } from "@/components/digical/AppShell";
import { useDigicalI18n } from "@/components/digical/language";
import { useDigicalCart } from "@/components/digical/useDigicalCart";
import cartAnimation from "@/public/icons/Cart.json";
import maintenanceAnimation from "@/public/icons/Maintenance.json";
import accreditationAnimation from "@/public/icons/Accreditation.json";
import { cn } from "@/lib/utils";

function PillarLottieIcon({
  animationData,
  isActive,
}: {
  animationData: object;
  isActive: boolean;
}) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    const lottie = lottieRef.current;
    if (!lottie) return;

    if (isActive) {
      lottie.play();
      return;
    }

    lottie.stop();
  }, [isActive]);

  return (
    <motion.div
      className={cn(
        "relative mb-6 flex h-16 w-16 items-center justify-center",
        "border-2 border-[#daa971] bg-[#f8f0da] shadow-[4px_4px_0px_0px_#254633]",
        "group-hover:shadow-[6px_6px_0px_0px_#254633]",
        isActive && "shadow-[6px_6px_0px_0px_#254633]",
      )}
      animate={isActive ? { x: -2, y: -2 } : { x: 0, y: 0 }}
      whileHover={{ x: -2, y: -2 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
    >
      <span className="pointer-events-none absolute left-0 top-0 h-2 w-2 border-l-2 border-t-2 border-[#daa971]" />
      <span className="pointer-events-none absolute right-0 top-0 h-2 w-2 border-r-2 border-t-2 border-[#daa971]" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 border-[#daa971]" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2 border-[#daa971]" />
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        autoplay={false}
        loop
        className="h-10 w-10"
      />
    </motion.div>
  );
}

function HomeContent() {
  const { t } = useDigicalI18n();
  const [pillarHover, setPillarHover] = useState<string | null>(null);

  const pillars = [
    {
      id: "vente",
      title: t("homePillarVenteTitle"),
      animationData: cartAnimation,
      desc: t("homePillarVenteDesc"),
    },
    {
      id: "reparation",
      title: t("homePillarRepTitle"),
      animationData: maintenanceAnimation,
      desc: t("homePillarRepDesc"),
    },
    {
      id: "etalonnage",
      title: t("homePillarEtalTitle"),
      animationData: accreditationAnimation,
      desc: t("homePillarEtalDesc"),
    },
  ] as const;

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

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-tech-bg px-4 py-20 md:px-10 md:py-32">
        <div className="blueprint-bg absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-12 text-center md:items-start md:text-left lg:flex-row lg:items-center">
            <div className="flex-1">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h1 className="mb-6 font-display text-4xl font-[900] uppercase leading-[1] tracking-tighter sm:text-5xl md:text-7xl lg:text-8xl">
                  {t("homeHeroLine1")} <br />
                  <span className="text-primary">{t("homeHeroLine2")}</span>
                </h1>
                <p className="mb-10 max-w-xl border-s-4 border-primary ps-6 font-sans text-lg font-medium text-tech-text/80 md:text-xl">
                  {t("homeHeroLead")}
                </p>
                <div className="flex w-full max-w-xl flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-4">
                  <Link href="/catalogue" className="flex h-14 w-full items-center justify-center border border-tech-border bg-primary px-8 font-styrene text-sm font-bold uppercase tracking-wider text-white shadow-hard transition-all hover:-translate-y-1 hover:shadow-hard-hover sm:w-auto sm:px-10">
                    {t("homeCtaCatalog")}
                    <ArrowRight className="ms-2 h-5 w-5 shrink-0" />
                  </Link>
                  <Link href="/contact" className="flex h-14 w-full items-center justify-center border border-tech-border bg-tech-surface px-8 font-styrene text-sm font-bold uppercase tracking-wider text-tech-text shadow-hard-sm transition-all hover:-translate-y-1 hover:shadow-hard sm:w-auto sm:px-10">
                    {t("homeCtaQuote")}
                  </Link>
                </div>
              </motion.div>
            </div>
            <div className="relative w-full flex-1">
              <div className="relative mx-auto aspect-square max-w-lg overflow-hidden border border-tech-border shadow-hard lg:mx-0 lg:max-w-none">
                <img
                  src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=1400&h=1400&fm=jpg&fit=crop&q=80"
                  alt={t("homeHeroImgAlt")}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                  loading="eager"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Three Pillars — in .dark, bg-tech-text is light; use dark text for contrast (background unchanged). */}
      <section className="bg-tech-text py-24 text-white dark:text-tech-brand [&_h2]:text-white [&_h2]:dark:text-tech-brand [&_h3]:text-white [&_h3]:dark:text-tech-brand">
        <div className="mx-auto max-w-7xl px-4 md:px-10">
          <div className="mb-16 text-center md:text-left">
            <h2 className="mb-4 font-display text-3xl font-black uppercase tracking-tight text-white dark:text-tech-brand md:text-4xl">
              {t("homePillarsTitle")}
            </h2>
            <div className="h-1 w-20 bg-primary" />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {pillars.map((p) => (
              <div
                key={p.id}
                onMouseEnter={() => setPillarHover(p.id)}
                onMouseLeave={() => setPillarHover(null)}
                className="group border border-white/10 bg-tech-surface/5 p-8 transition-colors hover:bg-tech-surface/10"
              >
                <PillarLottieIcon animationData={p.animationData} isActive={pillarHover === p.id} />
                <h3 className="mb-3 font-display text-2xl font-bold uppercase tracking-tight text-white dark:text-tech-brand">
                  {p.title}
                </h3>
                <p className="mb-6 text-sm text-white/60 dark:text-tech-brand/80">{p.desc}</p>
                <Link href={p.id === "vente" ? "/catalogue" : "/services"} className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-primary hover:gap-2 transition-all">
                  {t("homePillarMore")} <ArrowRight className="ms-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="relative overflow-hidden border-y border-tech-border bg-tech-surface py-24">
        <div className="blueprint-bg absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-10">
          <div className="mb-12 max-w-3xl">
            <span className="font-mono text-xs font-bold uppercase text-primary">{t("homeKpiKicker")}</span>
            <h2 className="mt-2 font-display text-4xl font-black uppercase tracking-tight text-tech-text md:text-5xl">
              {t("homeKpiTitle")}
            </h2>
            <p className="mt-4 text-base font-medium text-tech-text/70">
              {t("homeKpiLead")}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {kpiRows.map((kpi, idx) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="border border-tech-border bg-tech-bg/70 p-6 shadow-hard"
              >
                <div className="font-display text-4xl font-black text-primary">{kpi.value}</div>
                <p className="mt-2 font-mono text-[11px] font-bold uppercase tracking-wide text-tech-text">
                  {kpi.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-tech-bg py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-10">
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl font-black uppercase tracking-tight md:text-5xl">
              {t("homeProcTitle")}
            </h2>
            <p className="mt-4 max-w-xl text-base font-medium text-tech-text/75">
              {t("homeProcLead")}
            </p>
            <div className="mt-8 space-y-4">
              {processSteps.map((step, idx) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  className="flex items-start gap-4 border border-tech-border bg-tech-surface p-4 shadow-hard-sm"
                >
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center border border-tech-border bg-primary font-mono text-[10px] font-black text-white">
                    {idx + 1}
                  </span>
                  <p className="text-sm font-semibold uppercase tracking-wide text-tech-text">{step}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Gallery */}
      <section className="bg-tech-text py-24 text-white dark:text-tech-brand [&_h2]:text-white [&_h2]:dark:text-tech-brand">
        <div className="mx-auto max-w-7xl px-4 md:px-10">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="font-mono text-xs font-bold uppercase text-tech-muted dark:text-tech-brand/70">
                {t("homeCaseKicker")}
              </span>
              <h2 className="mt-2 font-display text-4xl font-black uppercase tracking-tight text-white dark:text-tech-brand md:text-5xl">
                {t("homeCaseTitle")}
              </h2>
            </div>
            <p className="max-w-xl text-sm font-medium text-white/70 dark:text-tech-brand/85">
              {t("homeCaseLead")}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {showcaseCards.map((item, idx) => (
              <motion.div
                key={item.kicker}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.35, delay: idx * 0.1 }}
                className="group relative overflow-hidden border border-white/15 bg-black/20 shadow-hard"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-72 w-full object-cover opacity-85 transition duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-tech-muted">
                    {item.kicker}
                  </p>
                  <p className="mt-1 text-sm font-semibold uppercase text-white">{item.title}</p>
                  <p className="mt-2 text-xs font-medium leading-snug text-white/80">{item.blurb}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials + FAQ + CTA */}
      <section className="bg-tech-surface py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-4xl font-black uppercase tracking-tight md:text-5xl">
                {t("homeTrustTitle")}
              </h2>
              <div className="mt-8 space-y-5">
                {quotes.map((quote) => (
                  <motion.blockquote
                    key={quote}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    className="border border-tech-border bg-tech-bg p-5 shadow-hard-sm"
                  >
                    <p className="text-sm font-medium text-tech-text/80">&ldquo;{quote}&rdquo;</p>
                  </motion.blockquote>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              {faqs.map((faq) => (
                <div key={faq.q} className="border border-tech-border bg-tech-surface p-5 shadow-hard-sm">
                  <p className="font-display text-lg font-bold uppercase tracking-tight">{faq.q}</p>
                  <p className="mt-2 text-sm font-medium text-tech-text/75">{faq.a}</p>
                </div>
              ))}
              <div className="mt-2 border border-tech-muted bg-tech-text p-6 text-white shadow-hard dark:text-tech-brand [&_h3]:text-white [&_h3]:dark:text-tech-brand">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-tech-muted dark:text-tech-brand/70">
                  {t("homeCtaBoxKicker")}
                </p>
                <h3 className="mt-2 font-display text-2xl font-black uppercase text-white dark:text-tech-brand">
                  {t("homeCtaBoxTitle")}
                </h3>
                <p className="mt-2 text-sm font-medium text-white/75 dark:text-tech-brand/85">
                  {t("homeCtaBoxLead")}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex h-11 items-center justify-center border border-tech-border bg-primary px-6 font-styrene text-xs font-bold uppercase tracking-wider text-white shadow-hard-sm"
                  >
                    {t("homeCtaBoxPrimary")}
                  </Link>
                  <Link
                    href="/catalogue"
                    className="inline-flex h-11 items-center justify-center border border-white/30 bg-tech-surface/10 px-6 font-styrene text-xs font-bold uppercase tracking-wider text-white dark:border-tech-brand/30 dark:text-tech-brand"
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
