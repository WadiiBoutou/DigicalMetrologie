"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useDigicalI18n } from "@/components/digical/language";
import { cn } from "@/lib/utils";
import { ClipboardList, CalendarDays, Wrench, FileCheck, LucideIcon } from "lucide-react";

type Step = {
  id: number;
  title: string;
  icon: LucideIcon;
  pos: "top" | "right" | "bottom" | "left";
};

export function PrecisionClock() {
  const { t, lang } = useDigicalI18n();
  const isAR = lang === "AR";
  
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const cycleIndex = currentStepCount % 4; // 0, 1, 2, 3

  const steps: Step[] = [
    { id: 1, title: t("homeProcStep1"), icon: ClipboardList, pos: "top" },
    { id: 2, title: t("homeProcStep2"), icon: CalendarDays, pos: "right" },
    { id: 3, title: t("homeProcStep3"), icon: Wrench, pos: "bottom" },
    { id: 4, title: t("homeProcStep4"), icon: FileCheck, pos: "left" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStepCount((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Radius needs to be smaller on mobile to prevent label overflow
  const [radius, setRadius] = useState(170);
  
  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 640) setRadius(100);
      else if (window.innerWidth < 768) setRadius(130);
      else setRadius(170);
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  const progress = cycleIndex / 4;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="relative mx-auto flex h-[460px] w-full max-w-[400px] items-center justify-center sm:h-[540px] sm:max-w-[540px] md:h-[640px] md:max-w-[640px]">
      {/* Background Rings & Circular Progressive Fill */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
           <circle cx="200" cy="200" r={radius} fill="none" stroke="currentColor" strokeWidth="2" className="text-tech-border/10" />
           <motion.circle
             cx="200"
             cy="200"
             r={radius}
             fill="none"
             stroke="currentColor"
             strokeWidth="6"
             strokeLinecap="round"
             strokeDasharray={circumference}
             /* DOM has no stroke-dashoffset until Motion sets it — without initial, animate runs from undefined */
             initial={{ strokeDashoffset: circumference, r: radius }}
             animate={{ strokeDashoffset: dashOffset, r: radius }}
             transition={{ type: "spring", stiffness: 45, damping: 15 }}
             className="text-primary"
           />
        </svg>

        <div className="h-[55%] w-[55%] rounded-full border-2 border-dashed border-tech-border/20 md:h-[65%] md:w-[65%]" />
        <div className="absolute h-[75%] w-[75%] rounded-full border border-tech-border/10 md:h-[85%] md:w-[85%]" />
      </div>

      {/* Ticking Needle */}
      <motion.div
        className="absolute w-[3px] origin-bottom bg-gradient-to-t from-primary via-primary/80 to-transparent shadow-[0_0_10px_rgba(var(--primary-rgb),0.3)]"
        initial={{ x: "-50%", y: "-100%", rotate: 0 }}
        animate={{ rotate: currentStepCount * 90 }}
        style={{ 
          top: "50%", 
          left: "50%", 
          height: radius,
          transformOrigin: "bottom center"
        }}
        transition={{ type: "spring", stiffness: 80, damping: 12 }}
      />
      
      {/* Center Hub */}
      <motion.div 
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
        className="relative z-30 flex h-20 w-20 flex-col items-center justify-center rounded-full border-4 border-tech-border bg-tech-surface shadow-hard sm:h-24 sm:w-24 md:h-28 md:w-28"
      >
        <span className="font-display text-xl font-black text-primary sm:text-2xl md:text-3xl">360°</span>
        <span className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-tech-text/40 sm:text-[10px]">
          Precision
        </span>
      </motion.div>

      {/* Steps */}
      {steps.map((step, idx) => {
        const isCurrentlyActive = idx === cycleIndex;
        const isStayedActive = idx <= cycleIndex;
        
        // Dynamic positioning strictly to the perimeter using the calculated radius
        // We use CSS variables or inline styles for exact radius positioning
        const angle = (idx * 90 - 90) * (Math.PI / 180);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        const posConfigs = {
          top: { card: "bottom-full mb-4 left-1/2 -translate-x-1/2" },
          right: { card: "left-full ms-4 top-1/2 -translate-y-1/2" },
          bottom: { card: "top-full mt-4 left-1/2 -translate-x-1/2" },
          left: { card: "right-full me-4 top-1/2 -translate-y-1/2" }
        }[step.pos];

        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            animate={{ 
              scale: isCurrentlyActive ? 1.15 : 1,
              zIndex: isCurrentlyActive ? 40 : 20,
              opacity: isStayedActive ? 1 : 0.4,
              x, 
              y
            }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            className="absolute"
          >
            {/* Icon Box Circle - ANCHOR */}
            <div className={cn(
              "relative flex flex-shrink-0 h-14 w-14 items-center justify-center !rounded-full border-2 transition-all duration-500 sm:h-16 sm:w-16 md:h-20 md:w-20",
              isStayedActive 
                ? "bg-primary border-primary shadow-hard" 
                : "bg-tech-bg border-secondary shadow-hard-sm"
            )}>
               <step.icon className={cn(
                 "h-6 w-6 transition-colors duration-500 sm:h-8 sm:w-8 md:h-10 md:w-10", 
                 isStayedActive ? "text-white" : "text-primary/60"
               )} />
               
               <div className={cn(
                 "absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-none border-2 border-tech-border bg-tech-surface font-mono text-[10px] font-black text-tech-text sm:h-7 sm:w-7 sm:text-[11px] md:h-8 md:w-8 md:text-sm",
                 isStayedActive && "bg-white text-primary border-primary shadow-hard-sm-primary"
               )}>
                 {step.id}
               </div>
            </div>

            {/* Content Card */}
            <div className={cn(
              "w-[120px] sm:w-[150px] md:w-[180px] absolute rounded-2xl border-2 border-tech-border p-2 sm:p-3 flex-shrink-0 transition-all duration-500 text-center",
              posConfigs.card,
              isStayedActive
                ? "bg-tech-surface border-primary shadow-hard scale-105"
                : "border-tech-border bg-white/30 shadow-hard-sm backdrop-blur-[2px]",
              isAR ? "rtl" : "ltr"
            )}>
              <p className={cn(
                "text-[9px] sm:text-[10px] md:text-xs font-black uppercase leading-tight tracking-tight transition-colors duration-500",
                isStayedActive ? "text-app-text" : "text-tech-text/40"
              )}>
                {step.title}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
