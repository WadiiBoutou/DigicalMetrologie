"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Factory, Scale, ShieldCheck } from "lucide-react";
import { PrecisionTimeline } from "@/components/PrecisionTimeline";
import { AppShell } from "@/components/digical/AppShell";
import { useDigicalI18n } from "@/components/digical/language";
import { useDigicalCart } from "@/components/digical/useDigicalCart";

function ExpertiseContent() {
  const { t } = useDigicalI18n();
  const domains = [t("expDom1"), t("expDom2"), t("expDom3"), t("expDom4"), t("expDom5"), t("expDom6")] as const;
  const livrables = [t("expLiv1"), t("expLiv2"), t("expLiv3"), t("expLiv4")] as const;
  const methodLines = [t("expMet1"), t("expMet2"), t("expMet3"), t("expMet4")] as const;
  const sectors = [t("expSec1"), t("expSec2"), t("expSec3"), t("expSec4"), t("expSec5"), t("expSec6")] as const;
  const kpi = [
    { value: "-31%", label: t("expKpi1L") },
    { value: "+22%", label: t("expKpi2L") },
    { value: "97%", label: t("expKpi3L") },
    { value: "4.8/5", label: t("expKpi4L") },
  ] as const;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-12 md:py-20 bg-app-bg text-app-text min-h-screen">
      <section className="mb-20">
        <span className="font-mono text-[10px] font-bold uppercase text-primary tracking-[0.3em]">{t("expKicker")}</span>
        <h1 className="mt-6 max-w-5xl font-display text-4xl font-light uppercase tracking-tighter leading-[0.9] sm:text-6xl md:text-8xl">
          {t("expHeroTitle")}
        </h1>
        <p className="mt-10 max-w-3xl border-s-2 border-primary ps-8 text-xl font-light leading-relaxed text-app-text/60">
          {t("expHeroLead")}
        </p>
      </section>

      <section className="mb-24 grid grid-cols-1 gap-8 md:grid-cols-3">
        {[
          { icon: ShieldCheck, title: t("expCard1Title"), desc: t("expCard1Desc") },
          { icon: Factory, title: t("expCard2Title"), desc: t("expCard2Desc") },
          { icon: Scale, title: t("expCard3Title"), desc: t("expCard3Desc") },
        ].map((item) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="paper-panel p-10 border-app-border-strong group hover:border-primary/30 transition-all duration-500"
          >
            <div className="mb-8 h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
              <item.icon className="h-6 w-6" />
            </div>
            <h3 className="mb-4 font-display text-2xl font-light uppercase tracking-tight">{item.title}</h3>
            <p className="text-base leading-relaxed text-app-text/50 font-light">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      <section className="mb-24 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="paper-panel p-10 border-app-border-strong bg-app-surface/30">
          <h2 className="font-display text-4xl font-light uppercase tracking-tight mb-8">{t("expDomainsTitle")}</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {domains.map((d) => (
              <div key={d} className="rounded-xl border border-app-border bg-app-bg px-5 py-4 font-mono text-[10px] font-bold uppercase tracking-widest text-app-text/70">
                {d}
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm font-light text-app-text/40 italic">
            {t("expDomainsFoot")}
          </p>
        </div>

        <div className="paper-panel p-10 border-app-border-strong bg-app-surface/30">
          <h2 className="font-display text-4xl font-light uppercase tracking-tight mb-8">
            {t("expDeliverTitle")}
          </h2>
          <div className="space-y-3">
            {livrables.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-app-border bg-app-bg px-6 py-5 text-sm font-medium uppercase tracking-wider text-app-text/80 shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-24">
        <div className="flex items-center gap-8 mb-12">
          <h2 className="font-display text-4xl font-light uppercase tracking-tight text-app-text">{t("expTimelineTitle")}</h2>
          <div className="h-px flex-1 bg-app-border" />
        </div>
        <PrecisionTimeline />
      </section>

      <section className="mb-24 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="paper-panel p-10 border-app-border-strong">
          <h3 className="font-display text-3xl font-light uppercase tracking-tight mb-4">{t("expMethodTitle")}</h3>
          <p className="text-base font-light text-app-text/50 mb-8 leading-relaxed">
            {t("expMethodLead")}
          </p>
          <div className="space-y-3">
            {methodLines.map((line, idx) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-xl border border-app-border bg-app-bg/50 px-6 py-4 font-mono text-[10px] font-bold uppercase tracking-widest text-app-text/60"
              >
                <span className="text-primary mr-4">{String(idx + 1).padStart(2, '0')}</span>
                {line}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="paper-panel p-10 border-app-border-strong">
          <h3 className="font-display text-3xl font-light uppercase tracking-tight mb-8">
            {t("expSectorsTitle")}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {sectors.map((sector) => (
              <div
                key={sector}
                className="rounded-xl border border-app-border bg-app-bg/50 px-5 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-app-text/70 hover:border-primary/20 transition-colors"
              >
                {sector}
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm font-light text-app-text/40 italic leading-relaxed">
            {t("expSectorsFoot")}
          </p>
        </div>
      </section>

      <section className="mb-24 paper-panel p-10 md:p-16 border-app-border-strong bg-app-surface/40">
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="font-mono text-[10px] font-bold uppercase text-primary tracking-[0.3em]">{t("expProofKicker")}</span>
            <h3 className="mt-4 font-display text-5xl font-light uppercase tracking-tighter md:text-7xl">
              {t("expProofTitle")}
            </h3>
          </div>
          <p className="max-w-md text-lg font-light leading-relaxed text-app-text/50">
            {t("expProofLead")}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {kpi.map((row) => (
            <div key={row.label} className="rounded-2xl border border-app-border bg-app-bg p-8 shadow-sm group hover:scale-[1.05] transition-transform duration-500">
              <p className="font-display text-5xl font-light text-primary">{row.value}</p>
              <p className="mt-4 font-mono text-[10px] font-bold uppercase text-app-text/40 tracking-widest">{row.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24 rounded-[3rem] border border-app-border bg-app-text p-10 md:p-20 text-app-bg shadow-2xl relative overflow-hidden dark:bg-app-surface dark:text-app-text">
         <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/20 blur-[150px] -mr-40 -mt-40 rounded-full" />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-center relative z-10">
          <div>
            <h3 className="font-display text-4xl font-light uppercase tracking-tighter leading-none md:text-7xl">
              {t("expBannerTitle")}
            </h3>
            <p className="mt-8 text-xl font-light text-app-bg/60 dark:text-app-text/60 leading-relaxed max-w-2xl">
              {t("expBannerLead")}
            </p>
          </div>
          <div className="flex flex-wrap gap-5 lg:justify-end">
            <Link href="/contact" className="btn-machined !h-16 px-10 text-base">
              {t("expBannerCall")}
            </Link>
            <Link
              href="/services"
              className="inline-flex h-16 items-center justify-center rounded-2xl border border-app-bg/20 bg-app-bg/5 dark:border-app-text/20 dark:bg-app-text/5 px-10 font-display text-sm font-bold uppercase tracking-widest hover:bg-app-bg/10 dark:hover:bg-app-text/10 transition-all"
            >
              {t("expBannerServices")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ExpertisePage() {
  const { cartCount } = useDigicalCart();
  return (
    <AppShell route="expertise" cartCount={cartCount}>
      <ExpertiseContent />
    </AppShell>
  );
}

