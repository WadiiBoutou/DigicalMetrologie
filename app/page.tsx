"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Factory,
  FlaskConical,
  Leaf,
  ShieldCheck,
  ShoppingCart,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { AppShell } from "@/components/digical/AppShell";
import { PrecisionClock } from "@/components/PrecisionClock";
import { useDigicalI18n } from "@/components/digical/language";
import { useDigicalCart } from "@/components/digical/useDigicalCart";

function HomeContent() {
  const { t } = useDigicalI18n();

  const pillars: Array<{
    id: string;
    title: string;
    desc: string;
    href: string;
    icon: LucideIcon;
  }> = [
    {
      id: "vente",
      title: t("homePillarVenteTitle"),
      desc: t("homePillarVenteDesc"),
      href: "/catalogue",
      icon: ShoppingCart,
    },
    {
      id: "reparation",
      title: t("homePillarRepTitle"),
      desc: t("homePillarRepDesc"),
      href: "/services",
      icon: Wrench,
    },
    {
      id: "etalonnage",
      title: t("homePillarEtalTitle"),
      desc: t("homePillarEtalDesc"),
      href: "/services",
      icon: FlaskConical,
    },
  ];

  const kpis = [
    { value: "15+", label: t("homeKpiL1") },
    { value: "98.7%", label: t("homeKpiL2") },
    { value: "24/48h", label: t("homeKpiL3") },
    { value: "3200+", label: t("homeKpiL4") },
  ] as const;

  const sectors = [
    {
      title: t("homeCard1Title"),
      blurb: t("homeCard1Blurb"),
      kicker: t("homeCard1Kicker"),
      src: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=1200&h=800&fm=jpg&fit=crop&q=80",
      alt: t("homeCard1Alt"),
      icon: Factory,
      href: "/services",
    },
    {
      title: t("homeCard2Title"),
      blurb: t("homeCard2Blurb"),
      kicker: t("homeCard2Kicker"),
      src: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=800&fm=jpg&fit=crop&q=80",
      alt: t("homeCard2Alt"),
      icon: Leaf,
      href: "/catalogue",
    },
    {
      title: t("homeCard3Title"),
      blurb: t("homeCard3Blurb"),
      kicker: t("homeCard3Kicker"),
      src: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop",
      alt: t("homeCard3Alt"),
      icon: Cpu,
      href: "/expertise",
    },
  ] as const;

  const proofPoints = [
    { quote: t("homeQ1"), name: "Yassine El Idrissi", role: "Responsable qualite · Casablanca" },
    { quote: t("homeQ2"), name: "Salma Bennani", role: "Cheffe laboratoire · Rabat" },
    { quote: t("homeQ3"), name: "Mehdi Alaoui", role: "Maintenance industrielle · Tanger" },
  ] as const;

  return (
    <div className="pb-10 md:pb-16">
      <section className="relative min-h-[calc(100svh-72px)] overflow-hidden">
        <div className="absolute inset-0 blueprint-grid">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,13,20,0.76)_0%,rgba(7,13,20,0.62)_36%,rgba(7,13,20,0.2)_62%,rgba(7,13,20,0.74)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(179,38,47,0.32),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(7,13,20,0.3),transparent_24%)]" />
        </div>

        <div className="absolute inset-0">
          <div className="relative h-full w-full overflow-hidden">
            <video
              autoPlay
              muted
              playsInline
              preload="metadata"
              poster="/video/video-lastframe.jpg"
              className="h-full w-full object-cover"
              aria-hidden="true"
              onEnded={(event) => {
                event.currentTarget.pause();
              }}
            >
              <source src="/video/video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,13,20,0.1)_0%,rgba(8,13,20,0.35)_100%)]" />
          </div>
        </div>

        <div className="relative z-10 flex min-h-[calc(100svh-72px)] items-start">
          <div className="w-full px-4 pb-10 pt-16 sm:px-6 sm:pb-12 sm:pt-20 md:px-8 md:pb-14 md:pt-24 lg:px-12 lg:pb-16 lg:pt-28">
            <div className="max-w-4xl">
              <h1 className="section-title text-5xl text-white sm:text-6xl lg:text-8xl">
                <span className="block">{t("homeHeroLine1")}</span>
                <span className="block text-white">
                  {t("homeHeroLine2Prefix")}
                  <span className="text-precision">{t("homeHeroLine2Emphasis")}</span>
                </span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/78 md:text-lg">
                {t("homeHeroLead")}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/catalogue" className="btn-machined px-6">
                  {t("homeCtaCatalog")}
                </Link>
                <Link href="/contact" className="cta-ghost-dark px-6">
                  {t("homeCtaQuote")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-6 md:px-8 md:py-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="text-center">
            <span className="section-eyebrow justify-center">{t("homePillarsTitle")}</span>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className="paper-panel p-6 md:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[1rem] border border-tech-border bg-primary/6 text-primary">
                    <pillar.icon className="h-6 w-6" strokeWidth={1.6} />
                  </div>
                  <span className="status-pill">0{index + 1}</span>
                </div>
                <h2 className="mt-6 font-display text-3xl font-bold uppercase tracking-[-0.05em] text-tech-text">
                  {pillar.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-tech-body">{pillar.desc}</p>
                <Link href={pillar.href} className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                  {t("homePillarMore")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-6 md:px-8 md:py-10">
          <div className="mx-auto max-w-7xl blueprint-panel px-5 py-6 md:px-8 md:py-8">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-2xl">
                <span className="section-eyebrow text-white before:bg-white/40">{t("homeKpiKicker")}</span>
              <h2 className="section-title mt-4 text-4xl text-white md:text-5xl">{t("homeKpiTitle")}</h2>
                <p className="mt-4 text-sm leading-7 text-white/72 md:text-base">{t("homeKpiLead")}</p>
              </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:min-w-[44rem] xl:grid-cols-4">
                {kpis.map((item) => (
                <div key={item.label} className="metric-card-dark min-w-0 xl:min-w-[10rem]">
                  <p className="font-display text-4xl font-bold uppercase tracking-[-0.06em] text-precision">{item.value}</p>
                    <p className="mt-2 text-sm leading-6 text-white/68">{item.label}</p>
                  </div>
                ))}
              </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-6 md:px-8 md:py-10">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div className="paper-panel p-6 hover:!translate-y-0 hover:!shadow-tech md:p-8">
            <span className="section-eyebrow">{t("homeProcTitle")}</span>
            <h2 className="section-title mt-4 text-4xl md:text-5xl">{t("homeProcTitle")}</h2>
            <p className="section-body mt-5">{t("homeProcLead")}</p>
            <div className="technical-rule mt-8" />
            <div className="mt-8 space-y-4">
              <div className="rounded-[1rem] border border-tech-border bg-white/72 px-5 py-4 shadow-tech-sm">
                <p className="surface-caption">{t("homeProcSeqTitle")}</p>
                <p className="mt-2 text-sm leading-7 text-tech-body">
                  {t("homeProcSeqDesc")}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1rem] border border-tech-border bg-white/72 px-4 py-4 shadow-tech-sm">
                  <p className="surface-caption">{t("homeProcCadence")}</p>
                  <p className="mt-2 font-display text-2xl font-bold uppercase tracking-[-0.04em] text-tech-text">{t("homeProcStepsCount")}</p>
                </div>
                <div className="rounded-[1rem] border border-tech-border bg-white/72 px-4 py-4 shadow-tech-sm">
                  <p className="surface-caption">{t("homeProcLivrable")}</p>
                  <p className="mt-2 font-display text-2xl font-bold uppercase tracking-[-0.04em] text-tech-text">{t("homeProcReporting")}</p>
                </div>
              </div>
            </div>
          </div>

            <div className="paper-panel overflow-hidden p-4 hover:!translate-y-0 hover:!shadow-tech md:p-6">
              <PrecisionClock />
            </div>
        </div>
      </section>

      <section className="px-4 py-6 md:px-8 md:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="section-eyebrow">{t("homeCaseKicker")}</span>
              <h2 className="section-title mt-4 text-4xl md:text-5xl">{t("homeCaseTitle")}</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-tech-body md:text-base">{t("homeCaseLead")}</p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {sectors.map((sector, index) => (
              <motion.article
                key={sector.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="paper-panel overflow-hidden"
              >
                <div className="relative h-56 overflow-hidden border-b border-tech-border/70">
                  <Image
                    src={sector.src}
                    alt={sector.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,13,20,0.92)] via-[rgba(8,13,20,0.18)] to-transparent" />
                  <div className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/65">{sector.kicker}</p>
                      <p className="mt-2 font-display text-2xl font-bold uppercase tracking-[-0.05em] text-white">{sector.title}</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/6 text-white">
                      <sector.icon className="h-5 w-5" strokeWidth={1.6} />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm leading-7 text-tech-body">{sector.blurb}</p>
                  <Link href={sector.href} className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                    {t("homePillarMore")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-6 md:px-8 md:py-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="paper-panel p-6 md:p-8">
            <span className="section-eyebrow">{t("homeTrustTitle")}</span>
            <h2 className="section-title mt-4 text-4xl md:text-5xl">{t("homeTrustTitle")}</h2>
              <div className="mt-6 space-y-4">
                {proofPoints.map((item) => (
                  <div key={item.name} className="rounded-[1rem] border border-tech-border bg-white/76 px-5 py-5 shadow-tech-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <p className="text-sm leading-7 text-tech-body">{item.quote}</p>
                        <p className="mt-3 font-display text-sm font-bold uppercase tracking-[0.08em] text-tech-text">
                          {item.name}
                        </p>
                        <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-tech-muted">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="blueprint-panel px-6 py-7 md:px-8 md:py-8">
            <span className="section-eyebrow text-white before:bg-white/40">{t("homePilotageTitle")}</span>
            <h2 className="section-title mt-4 text-4xl text-white md:text-5xl">{t("homeCtaBoxTitle")}</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/72 md:text-base">{t("homeFaq1A")}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="metric-card-dark">
                <p className="dark-caption">{t("homeParcTitle")}</p>
                <p className="mt-2 text-sm leading-6 text-white/74">{t("homeParcDesc")}</p>
              </div>
              <div className="metric-card-dark">
                <p className="dark-caption">{t("homeTraceTitle")}</p>
                <p className="mt-2 text-sm leading-6 text-white/74">{t("homeTraceDesc")}</p>
              </div>
              <div className="metric-card-dark">
                <p className="dark-caption">{t("homeTempoTitle")}</p>
                <p className="mt-2 text-sm leading-6 text-white/74">{t("homeTempoDesc")}</p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-machined px-6">
                {t("homeCtaBoxPrimary")}
              </Link>
              <Link href="/catalogue" className="cta-ghost-dark px-6">
                {t("homeCtaBoxSecondary")}
              </Link>
            </div>
            <div className="mt-8 rounded-[1.25rem] border border-white/10 bg-white/5 px-5 py-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <p className="font-display text-base font-bold uppercase tracking-[0.14em] text-white">{t("homeProtocolTitle")}</p>
              </div>
              <p className="mt-3 text-sm leading-7 text-white/68">{t("homeProtocolDesc")}</p>
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

