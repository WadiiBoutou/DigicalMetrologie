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
    <div className="mx-auto w-full max-w-7xl px-3 py-8 sm:px-4 sm:py-12 md:px-10 md:py-16">
      <section className="mb-16">
        <span className="font-mono text-xs font-bold uppercase text-primary tracking-wider">{t("expKicker")}</span>
        <h1 className="mt-2 max-w-4xl font-display text-3xl font-medium uppercase tracking-tight sm:text-4xl md:text-6xl">
          {t("expHeroTitle")}
        </h1>
        <p className="mt-5 max-w-3xl border-s-2 border-primary ps-6 text-base font-normal text-tech-muted md:text-lg">
          {t("expHeroLead")}
        </p>
      </section>

      <section className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-3">
        {[
          { icon: ShieldCheck, title: t("expCard1Title"), desc: t("expCard1Desc") },
          { icon: Factory, title: t("expCard2Title"), desc: t("expCard2Desc") },
          { icon: Scale, title: t("expCard3Title"), desc: t("expCard3Desc") },
        ].map((item) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="bento-card p-8 bg-tech-surface"
          >
            <item.icon className="mb-6 h-10 w-10 text-primary" />
            <h3 className="mb-3 font-display text-xl font-medium uppercase tracking-tight">{item.title}</h3>
            <p className="text-sm leading-relaxed text-tech-muted font-normal">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      <section className="mb-20 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="bento-card p-8 bg-tech-surface">
          <h2 className="font-display text-3xl font-medium uppercase tracking-tight">{t("expDomainsTitle")}</h2>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {domains.map((d) => (
              <div key={d} className="rounded-xl border border-tech-border bg-tech-bg/30 px-4 py-3 font-mono text-[11px] font-bold uppercase text-tech-text">
                {d}
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm font-normal text-tech-muted">
            {t("expDomainsFoot")}
          </p>
        </div>

        <div className="bento-card p-8 bg-tech-surface">
          <h2 className="font-display text-3xl font-medium uppercase tracking-tight text-tech-text">
            {t("expDeliverTitle")}
          </h2>
          <div className="mt-6 space-y-3">
            {livrables.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-tech-border bg-tech-bg/30 px-4 py-3 text-sm font-semibold uppercase text-tech-text"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="mb-10 font-display text-3xl font-medium uppercase text-tech-text md:text-4xl">{t("expTimelineTitle")}</h2>
        <PrecisionTimeline />
      </section>

      <section className="mb-20 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="bento-card p-8 bg-tech-surface">
          <h3 className="font-display text-2xl font-medium uppercase tracking-tight text-tech-text">{t("expMethodTitle")}</h3>
          <p className="mt-3 text-sm font-normal text-tech-muted">
            {t("expMethodLead")}
          </p>
          <div className="mt-6 space-y-3">
            {methodLines.map((line, idx) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: idx * 0.05 }}
                className="rounded-xl border border-tech-border bg-tech-bg/30 px-4 py-3 font-mono text-[11px] font-bold uppercase text-tech-text"
              >
                {line}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="bento-card p-8 bg-tech-surface">
          <h3 className="font-display text-2xl font-medium uppercase tracking-tight text-tech-text">
            {t("expSectorsTitle")}
          </h3>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {sectors.map((sector) => (
              <div
                key={sector}
                className="rounded-xl border border-tech-border bg-tech-bg/30 px-3 py-2 text-xs font-bold uppercase tracking-wide text-tech-text"
              >
                {sector}
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm font-normal text-tech-muted">
            {t("expSectorsFoot")}
          </p>
        </div>
      </section>

      <section className="mb-20 bento-card p-8 bg-tech-surface md:p-10">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-mono text-xs font-bold uppercase text-primary tracking-wider">{t("expProofKicker")}</span>
            <h3 className="mt-1 font-display text-3xl font-medium uppercase tracking-tight md:text-4xl">
              {t("expProofTitle")}
            </h3>
          </div>
          <p className="max-w-md text-sm font-normal text-tech-muted">
            {t("expProofLead")}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {kpi.map((row) => (
            <div key={row.label} className="rounded-xl border border-tech-border bg-tech-bg/30 p-5 shadow-tech-sm">
              <p className="font-display text-3xl font-bold text-primary">{row.value}</p>
              <p className="mt-1 font-mono text-[11px] font-bold uppercase text-tech-text tracking-tight">{row.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 rounded-xl border border-tech-border bg-tech-text p-8 text-white shadow-tech md:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 blur-[100px] -mr-24 -mt-24" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.4fr_1fr] md:items-center relative z-10">
          <div>
            <h3 className="font-display text-3xl font-medium uppercase tracking-tight text-white md:text-4xl">
              {t("expBannerTitle")}
            </h3>
            <p className="mt-3 text-sm font-normal text-white/75">
              {t("expBannerLead")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link href="/contact" className="btn-machined h-11 px-8 text-tech-bg bg-tech-text">
              {t("expBannerCall")}
            </Link>
            <Link
              href="/services"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 font-display text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
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
