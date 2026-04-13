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
    <section className="relative pt-32 pb-20 px-6 lg:px-12 bg-app-bg overflow-hidden border-b border-app-border transition-colors duration-500">
      {/* Dynamic Grid Background - Adaptable to light/dark */}
      <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-end">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-px bg-primary" />
              <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-primary">
                Technical Solutions // 2026
              </span>
            </div>

            <h1 className="font-display text-7xl lg:text-[9rem] leading-[0.85] uppercase tracking-tighter text-app-text transition-colors">
              {t("srvHeroTitle").split(' ')[0]} <br />
              <span className="text-primary italic font-light drop-shadow-sm">
                {t("srvHeroTitle").split(' ')[1] || "Services"}
              </span>
            </h1>

            <p className="mt-12 max-w-xl text-xl text-app-text/60 font-light leading-relaxed">
              {t("srvHeroLead")}
            </p>
          </div>

          {/* Quick Nav / Indicators */}
          <div className="w-full lg:w-1/3 border-l border-app-border-strong pl-12">
            <div className="space-y-2">
              {[
                { v: "01", l: t("homePillarVenteTitle") },
                { v: "02", l: t("srvRepairTitle") },
                { v: "03", l: t("homePillarEtalTitle") },
              ].map((item) => (
                <div key={item.v} className="group py-5 flex items-center justify-between border-b border-app-border last:border-0 hover:translate-x-2 transition-all duration-500 cursor-default">
                  <span className="font-mono text-3xl text-app-text/10 group-hover:text-primary/30 transition-colors">{item.v}</span>
                  <span className="font-display text-xs uppercase tracking-[0.2em] text-app-text/40 group-hover:text-app-text transition-colors">{item.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesContent() {
  const { t } = useDigicalI18n();

  const bands = [
    {
      id: "vente",
      title: t("homePillarVenteTitle"),
      lead: t("catTailorBody"),
      badge: "Commercial / Unit",
      icon: Factory,
      imageSrc: "https://images.pexels.com/photos/36003973/pexels-photo-36003973.jpeg",
    },
    {
      id: "reparation",
      title: t("srvRepairTitle"),
      lead: t("srvRepairLead"),
      badge: "Technical / Maintenance",
      icon: Wrench,
      imageSrc: "https://images.pexels.com/photos/35072819/pexels-photo-35072819.jpeg",
    },
    {
      id: "etalonnage",
      title: t("homePillarEtalTitle"),
      lead: t("srvLabLead"),
      badge: "Precision / Laboratory",
      icon: FlaskConical,
      imageSrc: "https://images.pexels.com/photos/8940466/pexels-photo-8940466.jpeg",
    },
  ];

  return (
    <div className="bg-app-bg text-app-text transition-colors duration-500">
      <ServiceHero />

      <section className="py-32 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto space-y-48">
          {bands.map((band, index) => (
            <motion.div
              key={band.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 lg:gap-32 items-center`}
            >
              {/* Image Frame with Technical Border */}
              <div className="flex-1 relative h-[600px] w-full overflow-hidden group shadow-2xl">
                <Image
                  src={band.imageSrc}
                  alt={band.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                />
                <div className="absolute inset-0 border-[20px] border-app-bg transition-all duration-700 group-hover:border-[10px]" />
                <div className="absolute bottom-12 right-12 p-4 bg-app-bg border border-app-border-strong text-primary font-mono text-[9px] uppercase tracking-widest translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  Data.Node // 0{index + 1}
                </div>
              </div>

              {/* Technical Content Side */}
              <div className="flex-1 space-y-12">
                <div className="space-y-6">
                  <div className="inline-block px-4 py-1 border border-primary/20 bg-primary/5 text-primary font-mono text-[9px] uppercase tracking-[0.3em]">
                    {band.badge}
                  </div>
                  <h2 className="font-display text-6xl lg:text-7xl font-light uppercase tracking-tighter leading-[0.9] text-app-text">
                    {band.title}
                  </h2>
                </div>

                <p className="text-xl text-app-text/50 font-light leading-relaxed max-w-lg">
                  {band.lead}
                </p>

                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center pt-10 border-t border-app-border">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-app-bg bg-app-surface flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-primary" />
                      </div>
                    ))}
                  </div>
                  <div className="h-px w-12 bg-app-border hidden sm:block" />
                  <Link
                    href="/contact"
                    className="group relative flex items-center gap-12 px-8 py-5 bg-app-surface border border-app-border-strong hover:border-primary transition-all duration-500 overflow-hidden"
                  >
                    <span className="relative z-10 font-display text-xs uppercase tracking-widest">{t("quote")}</span>
                    <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-2" />
                    <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Environments Section: The Grid Console */}
      <section className="py-32 bg-app-surface/50 border-t border-app-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-20">
            <div className="lg:col-span-5">
              <div className="font-mono text-[10px] text-primary mb-6 uppercase tracking-[0.4em] flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Live Network Scope
              </div>
              <h3 className="font-display text-5xl lg:text-7xl uppercase tracking-tighter leading-none mb-12">
                Operational <br /> <span className="italic font-light opacity-50 text-app-text">Sectors</span>
              </h3>
              <p className="text-lg text-app-text/40 font-light max-w-md leading-relaxed">
                {t("srvEnvLead")}
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[t("srvEnv1"), t("srvEnv2"), t("srvEnv3"), t("srvEnv4"), t("srvEnv5"), t("srvEnv6")].map((env, i) => (
                <div key={env} className="group p-8 bg-app-bg border border-app-border hover:border-primary/40 transition-all duration-500">
                  <div className="flex justify-between items-start mb-12">
                    <span className="font-mono text-[9px] text-app-text/20">LOG_ID: 0x0{i}</span>
                    <div className="w-1 h-1 bg-app-border group-hover:bg-primary transition-colors" />
                  </div>
                  <h4 className="font-display text-xl uppercase tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                    {env}
                  </h4>
                </div>
              ))}
            </div>
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