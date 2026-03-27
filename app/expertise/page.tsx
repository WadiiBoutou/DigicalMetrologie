"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Cpu, Factory, Scale, ShieldCheck } from "lucide-react";
import { PrecisionTimeline } from "@/components/PrecisionTimeline";
import { AppShell } from "@/components/digical/AppShell";
import { useDigicalI18n } from "@/components/digical/language";
import { TechIcon } from "@/components/digical/shared";
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
  const faq = [
    { q: t("expFaq1Q"), a: t("expFaq1A") },
    { q: t("expFaq2Q"), a: t("expFaq2A") },
    { q: t("expFaq3Q"), a: t("expFaq3A") },
  ] as const;

  return (
    <div className="mx-auto w-full max-w-7xl px-3 py-8 sm:px-4 sm:py-12 md:px-10 md:py-16">
      <section className="mb-16">
        <span className="font-mono text-xs font-bold uppercase text-primary">{t("expKicker")}</span>
        <h1 className="mt-2 max-w-4xl font-display text-3xl font-black uppercase tracking-tight sm:text-4xl md:text-6xl">
          {t("expHeroTitle")}
        </h1>
        <p className="mt-5 max-w-3xl border-s-4 border-primary ps-6 text-base font-medium text-tech-text/80 md:text-lg">
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
            className="rounded-xl border-2 border-tech-border bg-tech-surface p-8 shadow-hard"
          >
            <item.icon className="mb-6 h-10 w-10 text-primary" />
            <h3 className="mb-3 font-display text-xl font-bold uppercase tracking-tight">{item.title}</h3>
            <p className="text-sm leading-relaxed text-tech-muted">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      <section className="mb-20 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-xl border-2 border-tech-border bg-tech-surface p-8 shadow-hard">
          <h2 className="font-display text-3xl font-black uppercase tracking-tight">{t("expDomainsTitle")}</h2>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {domains.map((d) => (
              <div key={d} className="rounded-xl border-2 border-tech-border bg-tech-bg px-4 py-3 font-mono text-[11px] font-bold uppercase text-tech-text">
                {d}
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm font-medium text-tech-text/75">
            {t("expDomainsFoot")}
          </p>
        </div>

        <div className="brutal-surface-invert relative overflow-hidden rounded-xl border-2 border-tech-muted bg-tech-text p-8 text-white shadow-hard dark:text-tech-brand [&_h2]:text-white [&_h2]:dark:text-tech-brand">
          <div className="blueprint-bg absolute inset-0 opacity-20" />
          <div className="relative">
            <h2 className="font-display text-3xl font-black uppercase tracking-tight text-white dark:text-tech-brand">
              {t("expDeliverTitle")}
            </h2>
            <div className="mt-6 space-y-3">
              {livrables.map((item) => (
                <div
                  key={item}
                  className="rounded-lg border-2 border-white/20 bg-tech-surface/5 px-4 py-3 text-sm font-semibold uppercase text-white dark:text-tech-brand"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="mb-10 font-display text-3xl font-black uppercase text-tech-text md:text-4xl">{t("expTimelineTitle")}</h2>
        <PrecisionTimeline />
      </section>

      <section className="mb-20 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-xl border-2 border-tech-border bg-tech-surface p-8 shadow-hard">
          <h3 className="font-display text-2xl font-black uppercase tracking-tight">{t("expMethodTitle")}</h3>
          <p className="mt-3 text-sm font-medium text-tech-text/75">
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
                className="rounded-xl border-2 border-tech-border bg-tech-bg px-4 py-3 font-mono text-[11px] font-bold uppercase text-tech-text"
              >
                {line}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="brutal-surface-invert relative overflow-hidden rounded-xl border-2 border-tech-muted bg-tech-text p-8 text-white shadow-hard dark:text-tech-brand [&_h3]:text-white [&_h3]:dark:text-tech-brand">
          <div className="blueprint-bg absolute inset-0 opacity-20" />
          <div className="relative">
            <h3 className="font-display text-2xl font-black uppercase tracking-tight text-white dark:text-tech-brand">
              {t("expSectorsTitle")}
            </h3>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {sectors.map((sector) => (
                <div
                  key={sector}
                  className="rounded-lg border-2 border-white/20 bg-tech-surface/5 px-3 py-2 text-xs font-bold uppercase tracking-wide text-white dark:text-tech-brand"
                >
                  {sector}
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm font-medium text-white/75 dark:text-tech-brand/85">
              {t("expSectorsFoot")}
            </p>
          </div>
        </div>
      </section>

      <section className="mb-20 rounded-xl border-2 border-tech-border bg-tech-surface p-8 shadow-hard md:p-10">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-mono text-xs font-bold uppercase text-primary">{t("expProofKicker")}</span>
            <h3 className="mt-1 font-display text-3xl font-black uppercase tracking-tight md:text-4xl">
              {t("expProofTitle")}
            </h3>
          </div>
          <p className="max-w-md text-sm font-medium text-tech-text/70">
            {t("expProofLead")}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {kpi.map((row) => (
            <div key={row.label} className="rounded-xl border-2 border-tech-border bg-tech-bg p-5 shadow-hard-sm">
              <p className="font-display text-3xl font-black text-primary">{row.value}</p>
              <p className="mt-1 font-mono text-[11px] font-bold uppercase text-tech-text">{row.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-xl border-2 border-tech-border bg-tech-bg p-8 shadow-hard-sm">
          <h3 className="font-display text-2xl font-black uppercase tracking-tight">{t("expFaqTitle")}</h3>
          <div className="mt-5 space-y-4">
            {faq.map((f) => (
              <div key={f.q} className="rounded-xl border-2 border-tech-border bg-tech-surface p-4">
                <p className="font-display text-lg font-bold uppercase tracking-tight">{f.q}</p>
                <p className="mt-1 text-sm font-medium text-tech-text/75">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border-2 border-tech-border bg-tech-surface p-8 shadow-hard">
          <h3 className="font-display text-2xl font-black uppercase tracking-tight">{t("expActionTitle")}</h3>
          <p className="mt-3 text-sm font-medium text-tech-text/80">
            {t("expActionLead")}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="inline-flex h-11 items-center justify-center rounded-xl border-2 border-tech-border bg-primary px-6 font-styrene text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-hard-sm-primary transition-all hover:-translate-y-0.5 hover:shadow-hard-hover-primary">
              {t("expCtaScope")}
            </Link>
            <Link href="/catalogue" className="inline-flex h-11 items-center justify-center rounded-xl border-2 border-tech-border bg-tech-bg px-6 font-styrene text-xs font-bold uppercase tracking-wider text-tech-text shadow-hard-sm">
              {t("expCtaCatalog")}
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-20 rounded-xl border-2 border-tech-muted bg-tech-text p-8 text-white shadow-hard dark:text-tech-brand md:p-10 [&_h3]:text-white [&_h3]:dark:text-tech-brand">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <h3 className="font-display text-3xl font-black uppercase tracking-tight text-white dark:text-tech-brand md:text-4xl">
              {t("expBannerTitle")}
            </h3>
            <p className="mt-3 text-sm font-medium text-white/75 dark:text-tech-brand/85">
              {t("expBannerLead")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link href="/contact" className="inline-flex h-11 items-center justify-center rounded-xl border-2 border-tech-border bg-primary px-6 font-styrene text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-hard-sm-primary transition-all hover:-translate-y-0.5 hover:shadow-hard-hover-primary">
              {t("expBannerCall")}
            </Link>
            <Link
              href="/services"
              className="inline-flex h-11 items-center justify-center rounded-xl border-2 border-white/30 bg-tech-surface/10 px-6 font-styrene text-xs font-bold uppercase tracking-wider text-white dark:border-tech-brand/30 dark:text-tech-brand"
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
