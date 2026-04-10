"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  ArrowRight,
  Factory,
  FileCheck,
  FlaskConical,
  Search,
  Settings2,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { AppShell } from "@/components/digical/AppShell";
import { useDigicalI18n } from "@/components/digical/language";
import { useDigicalCart } from "@/components/digical/useDigicalCart";

function ServiceHero() {
  const { t } = useDigicalI18n();

  return (
    <section className="px-4 pb-6 pt-6 md:px-8 md:pb-8 md:pt-8">
      <div className="mx-auto max-w-7xl blueprint-panel px-5 py-7 md:px-8 md:py-8 lg:px-10 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <span className="status-pill-dark">Services techniques · Precision operations</span>
            <h1 className="section-title mt-5 text-5xl text-white sm:text-6xl lg:text-[5.2rem]">{t("srvHeroTitle")}</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/72 md:text-lg">{t("srvHeroLead")}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-machined px-6">
                {t("srvBannerStart")}
              </Link>
              <Link href="/catalogue" className="cta-ghost-dark px-6">
                {t("navCatalog")}
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { value: "01", label: t("homePillarVenteTitle") },
              { value: "02", label: t("srvRepairTitle") },
              { value: "03", label: t("homePillarEtalTitle") },
            ].map((item) => (
              <div key={item.label} className="metric-card-dark">
                <p className="font-display text-3xl font-bold uppercase tracking-[-0.05em] text-precision">{item.value}</p>
                <p className="mt-3 text-sm leading-6 text-white/68">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type ServiceBand = {
  id: string;
  title: string;
  lead: string;
  badge: string;
  href: string;
  icon: LucideIcon;
  imageSrc: string;
  imageAlt: string;
  middle: string[];
  specs: Array<{ label: string; value: string }>;
};

function ServicesContent() {
  const { t } = useDigicalI18n();

  const bands: ServiceBand[] = [
    {
      id: "vente",
      title: t("homePillarVenteTitle"),
      lead: t("catTailorBody"),
      badge: t("catSupportTitle"),
      href: "/catalogue",
      icon: Factory,
      imageSrc:
        "https://images.pexels.com/photos/36003973/pexels-photo-36003973.jpeg?cs=srgb&dl=pexels-michael-orshan-2159363670-36003973.jpg&fm=jpg",
      imageAlt: "Instrument de mesure de precision et materiel technique",
      middle: [t("srvPackEss1"), t("srvPackOp1"), t("srvPackPerf1")],
      specs: [
        { label: "Parcours", value: t("catHeadingTous") },
        { label: "Support", value: t("catExpertLink") },
        { label: "Couverture", value: `${t("catSectorIndustrial")} / ${t("catSectorFarm")}` },
      ],
    },
    {
      id: "reparation",
      title: t("srvRepairTitle"),
      lead: t("srvRepairLead"),
      badge: "Maintenance protocol",
      href: "/contact",
      icon: Wrench,
      imageSrc:
        "https://images.pexels.com/photos/35072819/pexels-photo-35072819.jpeg?cs=srgb&dl=pexels-bulat843-1243575272-35072819.jpg&fm=jpg",
      imageAlt: "Technicien intervenant sur une machine industrielle",
      middle: [t("srvRepD1"), t("srvRepD2"), t("srvRepD3"), t("srvRepD4")],
      specs: [
        { label: t("srvRepT1"), value: "01" },
        { label: t("srvRepT2"), value: "02" },
        { label: t("srvRepT3"), value: "03" },
        { label: t("srvRepT4"), value: "04" },
      ],
    },
    {
      id: "etalonnage",
      title: t("homePillarEtalTitle"),
      lead: t("srvLabLead"),
      badge: "Calibration stack",
      href: "/contact",
      icon: FlaskConical,
      imageSrc:
        "https://images.pexels.com/photos/8940466/pexels-photo-8940466.jpeg?cs=srgb&dl=pexels-thirdman-8940466.jpg&fm=jpg",
      imageAlt: "Equipement de laboratoire et banc d etalonnage",
      middle: [t("srvLabV1"), t("srvLabV2"), t("srvLabV3"), t("srvLabV4")],
      specs: [
        { label: t("srvLabK1"), value: t("srvLabV1") },
        { label: t("srvLabK2"), value: t("srvLabV2") },
        { label: t("srvLabK3"), value: t("srvLabV3") },
        { label: t("srvLabK4"), value: t("srvLabV4") },
      ],
    },
  ];

  const cycle = [t("srvCycle1"), t("srvCycle2"), t("srvCycle3"), t("srvCycle4"), t("srvCycle5")];
  const environments = [t("srvEnv1"), t("srvEnv2"), t("srvEnv3"), t("srvEnv4"), t("srvEnv5"), t("srvEnv6"), t("srvEnv7"), t("srvEnv8")];

  return (
    <div className="pb-10 md:pb-16">
      <ServiceHero />

      <section className="px-4 py-4 md:px-8 md:py-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {bands.map((band, index) => (
            <motion.article
              key={band.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="paper-panel overflow-hidden"
            >
              <div className="grid gap-0 lg:grid-cols-[0.9fr_0.9fr_0.8fr]">
                <div className="relative min-h-[320px] overflow-hidden border-b border-tech-border/70 lg:border-b-0 lg:border-e">
                  <Image
                    src={band.imageSrc}
                    alt={band.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 30vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,13,20,0.92)] via-[rgba(8,13,20,0.18)] to-transparent" />
                  <div className="absolute inset-x-5 bottom-5">
                    <span className="status-pill-dark">{band.badge}</span>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/14 bg-white/8 text-white">
                        <band.icon className="h-5 w-5" strokeWidth={1.6} />
                      </div>
                      <h2 className="font-display text-3xl font-bold uppercase tracking-[-0.05em] text-white md:text-4xl">
                        {band.title}
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-7">
                  <p className="surface-caption">{t("srvScopeTitle") || "Engineer-ready scope"}</p>
                  <p className="mt-4 text-sm leading-7 text-tech-body md:text-base">{band.lead}</p>
                  <div className="mt-6 space-y-3">
                    {band.middle.map((item, itemIndex) => (
                      <div key={item} className="flex items-start gap-3 rounded-[1rem] border border-tech-border bg-white/76 px-4 py-4 shadow-tech-sm">
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-white">
                          0{itemIndex + 1}
                        </span>
                        <p className="text-sm leading-7 text-tech-body">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="blueprint-panel m-4 px-5 py-5 md:m-6 md:px-6 md:py-6">
                  <p className="dark-caption">{t("prodSpecsTitle")}</p>
                  <div className="mt-5 space-y-3">
                    {band.specs.map((spec) => (
                      <div key={spec.label} className="rounded-[1rem] border border-white/10 bg-white/5 px-4 py-4">
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/52">{spec.label}</p>
                        <p className="mt-2 font-display text-base font-bold uppercase tracking-[-0.03em] text-white">{spec.value}</p>
                      </div>
                    ))}
                  </div>
                  <Link href={band.href} className="btn-machined mt-6 w-full justify-center">
                    {band.id === "vente" ? t("navCatalog") : t("quote")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="px-4 py-6 md:px-8 md:py-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="paper-panel p-6 md:p-8">
            <span className="section-eyebrow">{t("srvCycleTitle")}</span>
            <h3 className="section-title mt-4 text-4xl md:text-5xl">{t("srvCycleTitle")}</h3>
            <div className="mt-6 space-y-3">
              {cycle.map((line, index) => (
                <div key={line} className="flex items-start gap-3 rounded-[1rem] border border-tech-border bg-white/76 px-4 py-4 shadow-tech-sm">
                  <Search className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-tech-muted">0{index + 1}</p>
                    <p className="mt-1 text-sm leading-7 text-tech-body">{line}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="blueprint-panel px-6 py-7 md:px-8 md:py-8">
            <div>
              <span className="section-eyebrow text-white before:bg-white/40">{t("srvEnvTitle")}</span>
              <div className="mt-4 max-w-4xl">
                <h3 className="section-title text-4xl text-white md:text-5xl">{t("srvEnvTitle")}</h3>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-white/72 md:text-base">{t("srvEnvLead")}</p>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
                {environments.map((item) => (
                  <div
                    key={item}
                    className="flex min-h-[76px] items-center rounded-[1rem] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-6 text-white/74"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-6 md:px-8 md:py-10">
        <div className="mx-auto max-w-7xl blueprint-panel px-6 py-7 md:px-8 md:py-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <span className="section-eyebrow text-white before:bg-white/40">Service banner</span>
              <h3 className="section-title mt-4 text-4xl text-white md:text-5xl">{t("srvBannerTitle")}</h3>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/72 md:text-base">{t("srvBannerLead")}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
              <div className="metric-card-dark">
                <FileCheck className="h-5 w-5 text-primary" />
                <p className="mt-4 text-sm leading-6 text-white/74">{t("srvStructDoc")}</p>
              </div>
              <div className="metric-card-dark">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <p className="mt-4 text-sm leading-6 text-white/74">{t("srvCritProtocol")}</p>
              </div>
              <div className="metric-card-dark">
                <Settings2 className="h-5 w-5 text-primary" />
                <p className="mt-4 text-sm leading-6 text-white/74">{t("srvFastDecisions")}</p>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-machined px-6">
              {t("srvBannerStart")}
            </Link>
            <Link href="/expertise" className="cta-ghost-dark px-6">
              {t("srvBannerExpertise")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ServicesPage() {
  const { cartCount } = useDigicalCart();
  return (
    <AppShell route="services" cartCount={cartCount}>
      <ServicesContent />
    </AppShell>
  );
}

