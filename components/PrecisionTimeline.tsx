"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDigicalI18n } from "@/components/digical/language";

gsap.registerPlugin(ScrollTrigger);

type TimelineStep = {
  id: string;
  title: string;
  description: string;
};

export function PrecisionTimeline() {
  const { t, lang } = useDigicalI18n();

  const steps = useMemo<TimelineStep[]>(
    () => [
      { id: "01", title: t("tl1Title"), description: t("tl1Desc") },
      { id: "02", title: t("tl2Title"), description: t("tl2Desc") },
      { id: "03", title: t("tl3Title"), description: t("tl3Desc") },
      { id: "04", title: t("tl4Title"), description: t("tl4Desc") },
      { id: "05", title: t("tl5Title"), description: t("tl5Desc") },
    ],
    [t],
  );

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const shapeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const markerWrapRefs = useRef<Array<HTMLDivElement | null>>([]);
  const morphedRef = useRef<boolean[]>(steps.map(() => false));

  useEffect(() => {
    morphedRef.current = steps.map(() => false);
  }, [lang, steps]);

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      shapeRefs.current.forEach((el, index) => {
        if (!el) return;
        const direction = index % 2 === 0 ? 45 : -45;
        gsap.set(el, { rotate: direction });
      });

      const lineEl = lineRef.current!;
      const lineTop = lineEl.getBoundingClientRect().top + window.scrollY;
      const lineHeight = lineEl.offsetHeight;

      const thresholds = markerWrapRefs.current.map((wrap) => {
        if (!wrap) return 0;
        const markerTop = wrap.getBoundingClientRect().top + window.scrollY;
        const markerCenterY = markerTop + wrap.offsetHeight / 2;
        return (markerCenterY - lineTop) / lineHeight;
      });

      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;

              thresholds.forEach((threshold, index) => {
                const shapeEl = shapeRefs.current[index];
                if (!shapeEl) return;

                const shouldMorph = progress >= threshold;
                if (shouldMorph && !morphedRef.current[index]) {
                  morphedRef.current[index] = true;
                  gsap.to(shapeEl, {
                    rotate: 0,
                    duration: 1,
                    ease: "power2.out",
                    overwrite: true,
                  });
                } else if (!shouldMorph && morphedRef.current[index]) {
                  morphedRef.current[index] = false;
                  const direction = index % 2 === 0 ? 45 : -45;
                  gsap.to(shapeEl, {
                    rotate: direction,
                    duration: 0.75,
                    ease: "power2.in",
                    overwrite: true,
                  });
                }
              });
            },
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section ref={sectionRef} className="relative bento-card overflow-hidden p-4 text-tech-body sm:p-8 md:p-12">
      <div className="micro-dot-pattern pointer-events-none absolute inset-0 opacity-[0.05]" />

      <div className="relative">
        <div className="absolute right-10 top-0 h-full w-[2px] bg-tech-border/20 sm:right-14 md:left-1/2 md:right-auto md:-translate-x-1/2" />
        <div ref={lineRef} className="absolute right-10 top-0 h-full w-[2px] bg-primary sm:right-14 md:left-1/2 md:right-auto md:-translate-x-1/2" />

        <div className="space-y-12 md:space-y-24">
          {steps.map((step, index) => {
            const isRight = index % 2 === 1;
            return (
              <div key={step.id} className="grid grid-cols-[1fr_48px] items-center gap-4 md:grid-cols-[1fr_80px_1fr] md:gap-10">
                <div className={isRight ? "md:invisible" : ""}>
                  <div className="rounded-xl border border-tech-border bg-white/86 p-4 shadow-tech-sm transition-[transform,box-shadow,border-color,background-color] hover:-translate-y-0.5 hover:border-primary/20 hover:bg-white md:p-6 lg:p-8">
                    <p className="font-display text-lg font-medium uppercase tracking-tight text-tech-text md:text-xl">{step.title}</p>
                    <p className="mt-2 text-sm font-normal text-tech-muted md:text-base">{step.description}</p>
                  </div>
                </div>

                <div className="relative z-10 flex justify-center">
                  <div
                    ref={(el) => {
                      markerWrapRefs.current[index] = el;
                    }}
                    className="relative flex h-12 w-12 items-center justify-center md:h-16 md:w-16"
                  >
                    <div
                      ref={(el) => {
                        shapeRefs.current[index] = el;
                      }}
                      className="absolute inset-0 rounded-lg border border-primary/20 bg-tech-surface shadow-tech-sm"
                    />

                    <span className="relative z-10 select-none font-mono text-sm font-bold text-primary md:text-base">{step.id}</span>
                  </div>
                </div>

                <div className={`hidden md:block ${!isRight ? "md:invisible" : ""}`}>
                  <div className="rounded-xl border border-tech-border bg-white/86 p-4 shadow-tech-sm transition-[transform,box-shadow,border-color,background-color] hover:-translate-y-0.5 hover:border-primary/20 hover:bg-white md:p-6 lg:p-8">
                    <p className="font-display text-lg font-medium uppercase tracking-tight text-tech-text md:text-xl">{step.title}</p>
                    <p className="mt-2 text-sm font-normal text-tech-muted md:text-base">{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

