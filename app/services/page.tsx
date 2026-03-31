"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check, CheckCircle2, Cpu, Factory, Scale, Search, ShieldCheck, Wrench } from "lucide-react";
import { PrecisionTimeline } from "@/components/PrecisionTimeline";
import { AppShell } from "@/components/digical/AppShell";
import { useDigicalI18n } from "@/components/digical/language";
import { cn, TechIcon } from "@/components/digical/shared";
import { useDigicalCart } from "@/components/digical/useDigicalCart";

function ServicesContent() {
  const { t, lang } = useDigicalI18n();
  const repairSteps = useMemo(
    () => [
      { id: 1, title: t("srvRepT1"), desc: t("srvRepD1"), icon: Search },
      { id: 2, title: t("srvRepT2"), desc: t("srvRepD2"), icon: Wrench },
      { id: 3, title: t("srvRepT3"), desc: t("srvRepD3"), icon: CheckCircle2 },
      { id: 4, title: t("srvRepT4"), desc: t("srvRepD4"), icon: ShieldCheck },
    ],
    [lang],
  );

  const [step, setStep] = useState(1);
  const [isRepairHovered, setIsRepairHovered] = useState(false);

  useEffect(() => {
    if (!isRepairHovered) {
      setStep(1);
      return;
    }

    setStep(2);
    const maxStep = repairSteps.length + 1;
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev >= maxStep) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 700);

    return () => clearInterval(timer);
  }, [isRepairHovered, repairSteps.length]);

  const progressPercent =
    ((Math.min(step - 1, repairSteps.length - 1) / (repairSteps.length - 1)) * 100);

  return (
    <div className="mx-auto w-full max-w-7xl px-3 py-6 sm:px-4 sm:py-10 md:px-10">
      <div className="mb-14 max-w-4xl">
        <span className="font-mono text-xs font-bold uppercase text-primary">{t("srvKicker")}</span>
        <h1 className="mt-2 font-display text-3xl font-black uppercase tracking-tight sm:text-4xl md:text-6xl">{t("srvHeroTitle")}</h1>
        <p className="mt-4 border-s-4 border-primary ps-5 text-base font-medium text-tech-text/80 md:text-lg">
          {t("srvHeroLead")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Left: Repair Workflow */}
        <div
          className="flex flex-col rounded-xl border-2 border-tech-border bg-tech-bg p-8 shadow-hard"
          onMouseEnter={() => setIsRepairHovered(true)}
          onMouseLeave={() => setIsRepairHovered(false)}
        >
          <div className="mb-6 flex items-center gap-3 border-b border-tech-border pb-4">
            <Wrench className="h-8 w-8 text-primary" />
            <h2 className="font-display text-2xl font-bold uppercase">{t("srvRepairTitle")}</h2>
          </div>
          <p className="mb-8 text-sm font-medium leading-relaxed">{t("srvRepairLead")}</p>
          
          <div className="relative mt-4 space-y-8">
            <div className="absolute left-[15px] top-0 h-full w-[2px] bg-tech-border/20" />
            <motion.div
              className="absolute left-[15px] top-0 w-[2px] bg-primary"
              initial={{ height: "0%" }}
              animate={{ height: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            {repairSteps.map((s) => (
              <div key={s.id} className="relative flex items-start gap-6">
                <div
                  className={cn(
                    "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center border-2 border-tech-border bg-tech-surface font-mono text-sm font-black transition-all",
                    step > s.id && "border-primary bg-primary text-primary-foreground",
                    step === s.id && "border-primary text-primary shadow-hard-sm",
                    step < s.id && "text-tech-muted"
                  )}
                >
                  {step > s.id ? <Check className="h-4 w-4" /> : s.id}
                </div>
                <div className="flex flex-col">
                  <h3 className="font-display text-lg font-bold uppercase tracking-tight">{s.title}</h3>
                  <p className="text-xs text-tech-muted">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Calibration Lab */}
        <div className="flex flex-col rounded-xl border-2 border-tech-border bg-tech-bg p-8 shadow-hard">
          <div className="mb-6 flex items-center gap-3 border-b border-tech-border pb-4">
            <Scale className="h-8 w-8 text-primary" />
            <h2 className="font-display text-2xl font-bold uppercase">{t("srvLabTitle")}</h2>
          </div>
          <p className="mb-8 text-sm font-medium leading-relaxed">{t("srvLabLead")}</p>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { title: t("srvLabK1"), val: t("srvLabV1") },
              { title: t("srvLabK2"), val: t("srvLabV2") },
              { title: t("srvLabK3"), val: t("srvLabV3") },
              { title: t("srvLabK4"), val: t("srvLabV4") },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border-2 border-tech-border bg-tech-surface p-4 shadow-hard-sm">
                <span className="mb-1 block font-mono text-[10px] uppercase text-tech-muted">{item.title}</span>
                <span className="block font-display text-xs font-bold uppercase text-primary">{item.val}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-10 flex flex-1 items-end">
            <div className="blueprint-bg relative flex h-32 w-full items-center justify-center rounded-xl border-2 border-tech-border p-6 text-center opacity-80">
              <span className="relative z-10 font-display text-sm font-black uppercase tracking-widest text-tech-text/40">{t("srvLabBadge")}</span>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-20 rounded-xl border-2 border-tech-border bg-tech-bg p-8 shadow-hard md:p-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-mono text-xs font-bold uppercase text-primary">{t("srvModulesKicker")}</span>
            <h2 className="mt-1 font-display text-3xl font-black uppercase tracking-tight md:text-4xl">
              {t("srvModulesTitle")}
            </h2>
          </div>
          <p className="max-w-md text-sm font-medium text-tech-text/70">
            {t("srvModulesLead")}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            {
              title: t("srvPackEss"),
              points: [t("srvPackEss1"), t("srvPackEss2"), t("srvPackEss3")],
            },
            {
              title: t("srvPackOp"),
              points: [t("srvPackOp1"), t("srvPackOp2"), t("srvPackOp3")],
            },
            {
              title: t("srvPackPerf"),
              points: [t("srvPackPerf1"), t("srvPackPerf2"), t("srvPackPerf3")],
            },
          ].map((pack) => (
            <motion.div
              key={pack.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="rounded-xl border-2 border-tech-border bg-tech-surface p-5 shadow-hard-sm"
            >
              <h3 className="font-display text-2xl font-black uppercase tracking-tight text-primary">{pack.title}</h3>
              <ul className="mt-4 space-y-2">
                {pack.points.map((point) => (
                  <li key={point} className="font-mono text-[11px] font-bold uppercase text-tech-text">
                    - {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-xl border-2 border-tech-border bg-tech-bg p-8 shadow-hard">
          <h2 className="font-display text-3xl font-black uppercase tracking-tight text-tech-text md:text-4xl">
            {t("srvCycleTitle")}
          </h2>
          <div className="mt-6 space-y-3">
            {[
              t("srvCycle1"),
              t("srvCycle2"),
              t("srvCycle3"),
              t("srvCycle4"),
              t("srvCycle5"),
            ].map((line, idx) => (
              <div
                key={line}
                className="rounded-xl border-2 border-tech-border bg-tech-surface px-4 py-3 text-sm font-semibold uppercase text-tech-text"
              >
                {idx + 1}. {line}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border-2 border-tech-border bg-tech-bg p-8 shadow-hard">
          <h2 className="font-display text-3xl font-black uppercase tracking-tight md:text-4xl">
            {t("srvEnvTitle")}
          </h2>
          <p className="mt-4 text-sm font-medium text-tech-text/75">
            {t("srvEnvLead")}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {[
              t("srvEnv1"),
              t("srvEnv2"),
              t("srvEnv3"),
              t("srvEnv4"),
              t("srvEnv5"),
              t("srvEnv6"),
              t("srvEnv7"),
              t("srvEnv8"),
            ].map((sector) => (
              <div key={sector} className="rounded-xl border-2 border-tech-border bg-tech-surface px-3 py-2 font-mono text-[10px] font-bold uppercase text-tech-text">
                {sector}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-20 rounded-xl border-2 border-tech-border bg-tech-bg p-8 shadow-hard md:p-10">
        <h2 className="font-display text-3xl font-black uppercase tracking-tight md:text-4xl">
          {t("srvBeforeTitle")}
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {[
            {
              title: t("srvColBefore"),
              lines: [t("srvBeforeL1"), t("srvBeforeL2"), t("srvBeforeL3")],
              tone: "bg-tech-surface",
            },
            {
              title: t("srvColTransition"),
              lines: [t("srvTransL1"), t("srvTransL2"), t("srvTransL3")],
              tone: "bg-tech-surface",
            },
            {
              title: t("srvColAfter"),
              lines: [t("srvAfterL1"), t("srvAfterL2"), t("srvAfterL3")],
              tone: "bg-tech-surface",
            },
          ].map((col) => (
            <div key={col.title} className={`rounded-xl border-2 border-tech-border p-5 shadow-hard-sm ${col.tone}`}>
              <h3 className="font-display text-2xl font-black uppercase tracking-tight text-tech-text">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {col.lines.map((line) => (
                  <li key={line} className="font-mono text-[11px] font-bold uppercase text-tech-text">
                    - {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="brutal-surface-invert mt-20 rounded-xl border-2 border-tech-muted bg-tech-text p-8 text-white shadow-hard md:p-10 [&_h3]:text-white">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <h3 className="font-display text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
              {t("srvBannerTitle")}
            </h3>
            <p className="mt-3 text-sm font-medium text-white/75">
              {t("srvBannerLead")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link href="/contact" className="inline-flex h-11 items-center justify-center rounded-xl border-2 border-black bg-tech-surface px-6 font-styrene text-xs font-bold uppercase tracking-wider text-black shadow-hard-sm transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-black hover:shadow-hard-hover-primary">
              {t("srvBannerStart")}
            </Link>
            <Link
              href="/expertise"
              className="inline-flex h-11 items-center justify-center rounded-xl border-2 border-white/30 bg-tech-surface/10 px-6 font-styrene text-xs font-bold uppercase tracking-wider text-white"
            >
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
