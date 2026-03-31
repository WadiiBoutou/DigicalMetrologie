"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Check, Menu, Minus, Plus, ShoppingCart, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { onCatalogueImageError } from "@/lib/catalogue-image";
import { useDigicalI18n } from "@/components/digical/language";
import type { Product } from "@/lib/types";

export type DigicalRoute = "home" | "catalog" | "product" | "contact" | "services" | "expertise";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function TechIcon({
  icon: Icon,
  className,
  forceHover = false,
}: {
  icon: LucideIcon;
  className?: string;
  forceHover?: boolean;
}) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <motion.div
      className={cn(
        "relative flex h-16 w-16 items-center justify-center rounded-xl",
        className
      )}
      style={{
        backgroundColor: "var(--tech-icon-bg)",
        border: "2px solid var(--tech-icon-border)",
        boxShadow: "4px 4px 0px 0px var(--tech-icon-shadow)",
      }}
      animate={
        forceHover
          ? { x: -2, y: -2, boxShadow: "6px 6px 0px 0px var(--tech-icon-shadow)" }
          : { x: 0, y: 0, boxShadow: "4px 4px 0px 0px var(--tech-icon-shadow)" }
      }
      whileHover={{
        x: -2,
        y: -2,
        boxShadow: "6px 6px 0px 0px var(--tech-icon-shadow)",
      }}
      whileTap={{
        backgroundColor: "var(--tech-icon-tap)",
      }}
      onTapStart={() => setIsPressed(true)}
      onTapCancel={() => setIsPressed(false)}
      onTap={() => {
        setTimeout(() => setIsPressed(false), 120);
      }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
    >
      <span className="pointer-events-none absolute left-0 top-0 h-2 w-2 border-l-2 border-t-2 border-[color:var(--tech-icon-border)]" />
      <span className="pointer-events-none absolute right-0 top-0 h-2 w-2 border-r-2 border-t-2 border-[color:var(--tech-icon-border)]" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 border-[color:var(--tech-icon-border)]" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2 border-[color:var(--tech-icon-border)]" />
      <Icon
        className="h-8 w-8"
        strokeWidth={2.5}
        color={isPressed ? "var(--tech-icon-on-tap)" : "var(--brand-primary)"}
      />
    </motion.div>
  );
}


export function Navbar({ cartCount, route }: { cartCount: number; route: DigicalRoute }) {
  const { lang, setLang, t } = useDigicalI18n();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const mobileNavLink = (href: string, label: string, isActive: boolean) => (
    <Link
      href={href}
      className={cn(
        "block border-b border-tech-border/25 py-3.5 font-styrene text-sm font-medium uppercase tracking-wider last:border-b-0",
        isActive ? "text-primary" : "text-tech-text hover:text-primary",
      )}
      onClick={() => setMobileOpen(false)}
    >
      {label}
    </Link>
  );

  return (
    <nav className="sticky top-4 z-50 mx-auto w-[calc(100%-2rem)] max-w-7xl">
      <div className="flex min-h-[72px] items-center justify-between gap-4 rounded-2xl border-2 border-app-border bg-tech-bg px-4 py-2 shadow-hard md:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex items-center" onClick={() => setMobileOpen(false)}>
            <div className="relative flex h-10 w-44 items-center overflow-hidden sm:h-12 sm:w-56">
              <Image
                src="/logo-png.png"
                alt="Digical Metrologie Logo"
                fill
                priority
                sizes="220px"
                className="object-contain object-left [image-rendering:-webkit-optimize-contrast] [image-rendering:crisp-edges] transition-all duration-300"
              />
            </div>
          </Link>
          <div className="hidden items-center gap-6 lg:flex">
            <Link className={cn("font-display text-sm font-black uppercase tracking-tight hover:text-primary transition-colors", route === "home" ? "text-primary" : "text-app-text")} href="/">{t("navHome")}</Link>
            <Link className={cn("font-display text-sm font-black uppercase tracking-tight hover:text-primary transition-colors", route === "catalog" ? "text-primary" : "text-app-text")} href="/catalogue">{t("navCatalog")}</Link>
            <Link className={cn("font-display text-sm font-black uppercase tracking-tight hover:text-primary transition-colors", route === "services" ? "text-primary" : "text-app-text")} href="/services">{t("navServices")}</Link>
            <Link className={cn("font-display text-sm font-black uppercase tracking-tight hover:text-primary transition-colors", route === "expertise" ? "text-primary" : "text-app-text")} href="/expertise">{t("navExpertise")}</Link>
            <Link className={cn("font-display text-sm font-black uppercase tracking-tight hover:text-primary transition-colors", route === "contact" ? "text-primary" : "text-app-text")} href="/contact">{t("navContact")}</Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 border-e border-app-border/20 pe-4 sm:flex">
            <div className="flex h-10 items-center gap-2 rounded-xl border-2 border-app-border bg-tech-surface px-3 font-display text-[11px] font-black uppercase tracking-tight text-app-text shadow-control transition-all hover:-translate-y-0.5">
              <button
                type="button"
                onClick={() => setLang("FR")}
                className={cn("transition-colors", lang === "FR" ? "text-primary" : "hover:text-primary")}
                aria-label="Français"
                aria-pressed={lang === "FR"}
              >
                FR
              </button>
              <span className="text-app-border/60">|</span>
              <button
                type="button"
                onClick={() => setLang("AR")}
                className={cn("transition-colors", lang === "AR" ? "text-primary" : "hover:text-primary")}
                aria-label="العربية"
                aria-pressed={lang === "AR"}
              >
                AR
              </button>
            </div>
          </div>

          <Link
            href="/contact"
            className="brutal-shadow-black flex h-11 items-center justify-center gap-2 rounded-xl border-2 border-black bg-primary px-4 font-display text-[11px] font-black uppercase tracking-tight text-white shadow-control transition-all hover:-translate-y-0.5"
            onClick={() => setMobileOpen(false)}
          >
            <span>{t("quote")} ({cartCount})</span>
          </Link>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-app-border bg-tech-bg text-app-text shadow-hard-sm lg:hidden focus:outline-none"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X size={20} strokeWidth={3} /> : <Menu size={20} strokeWidth={3} />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-x-0 bottom-0 top-[88px] z-40 bg-black/45 md:hidden"
            aria-label={t("navCloseMenu")}
            onClick={() => setMobileOpen(false)}
          />
          <div
            id="digical-mobile-nav"
            className="fixed inset-x-0 top-[88px] z-[41] max-h-[calc(100dvh-88px)] overflow-y-auto overscroll-contain border-b border-tech-border bg-tech-bg px-4 py-4 shadow-lg md:hidden"
          >
            <div className="mx-auto max-w-7xl">
              {mobileNavLink("/", t("navHome"), route === "home")}
              {mobileNavLink("/catalogue", t("navCatalog"), route === "catalog")}
              {mobileNavLink("/services", t("navServices"), route === "services")}
              {mobileNavLink("/expertise", t("navExpertise"), route === "expertise")}
              {mobileNavLink("/contact", t("navContact"), route === "contact")}
            </div>
          </div>
        </>
      ) : null}
    </nav>
  );
}

export function CartLineQtyStepper({
  product,
  lineQuantity,
  localQuantity,
  onLocalChange,
  onSetLineQuantity,
}: {
  product: Product;
  lineQuantity: number;
  localQuantity: number;
  onLocalChange: (n: number) => void;
  onSetLineQuantity: (p: Product, q: number) => void;
}) {
  const { t } = useDigicalI18n();
  const display = lineQuantity > 0 ? lineQuantity : localQuantity;
  const bump = (delta: number) => {
    if (lineQuantity > 0) {
      const next = lineQuantity + delta;
      if (next < 1) onSetLineQuantity(product, 0);
      else onSetLineQuantity(product, Math.min(99, next));
    } else {
      onLocalChange(Math.min(99, Math.max(1, localQuantity + delta)));
    }
  };

  return (
    <div className="flex h-9 shrink-0 items-stretch overflow-hidden rounded-lg border-2 border-tech-border bg-tech-surface shadow-hard-sm" dir="ltr">
      <button
        type="button"
        className="flex w-8 items-center justify-center border-e border-tech-border text-tech-text transition hover:bg-tech-bg"
        onClick={() => bump(-1)}
        aria-label={t("reduceQty")}
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span
        className="flex min-w-[2rem] items-center justify-center px-1 font-mono text-xs font-bold tabular-nums text-tech-text"
        aria-live="polite"
      >
        {display}
      </span>
      <button
        type="button"
        disabled={display >= 99}
        className="flex w-8 items-center justify-center border-s border-tech-border text-tech-text transition hover:bg-tech-bg disabled:opacity-40"
        onClick={() => bump(1)}
        aria-label={t("increaseQty")}
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}


export function ProductCard({
  product,
  lineQuantity,
  onSetLineQuantity,
}: {
  product: Product;
  lineQuantity: number;
  onSetLineQuantity: (p: Product, qty: number) => void;
}) {
  const { t, isArabic } = useDigicalI18n();
  const resolution = product.resolution || product.lecture || product.classe || "-";
  const inCart = lineQuantity > 0;
  const [localQty, setLocalQty] = useState(1);
  const inCartShadow = isArabic
    ? "[box-shadow:0_0_0_2px_var(--brand-primary),-4px_4px_0px_var(--app-shadow)]"
    : "[box-shadow:0_0_0_2px_var(--brand-primary),4px_4px_0px_var(--app-shadow)]";

  useEffect(() => {
    if (!inCart) setLocalQty(1);
  }, [inCart]);

  const handleIconCart = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCart) onSetLineQuantity(product, 0);
    else onSetLineQuantity(product, localQty);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.995 }}
      className={cn(
        "group flex w-full flex-col overflow-hidden rounded-xl border-2 border-tech-border bg-tech-surface transition-all duration-200 hover:-translate-y-1 hover:shadow-hard-hover",
        inCart ? inCartShadow : "shadow-hard"
      )}
    >
      <div className="relative h-[220px] overflow-hidden border-b border-tech-border/20 bg-tech-bg">
        <Link href={`/produit?id=${product.id}`} className="relative block h-full w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={onCatalogueImageError}
          />
        </Link>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="mb-1 font-mono text-[10px] font-bold uppercase tracking-wider text-tech-muted">{product.ref}</span>
        <h3 className="mb-2 text-base font-bold uppercase leading-tight text-tech-text">{product.name}</h3>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 border-t border-tech-border/30 pt-4 text-xs">
          <div className="flex flex-col">
            <span className="font-mono text-[9px] uppercase text-tech-muted">{t("resolution")}</span>
            <span className="font-mono font-bold">{resolution}</span>
          </div>
          <div className="ms-auto flex items-center gap-2">
            <CartLineQtyStepper
              product={product}
              lineQuantity={lineQuantity}
              localQuantity={localQty}
              onLocalChange={setLocalQty}
              onSetLineQuantity={onSetLineQuantity}
            />
            <button
              type="button"
              onClick={handleIconCart}
              className={cn(
                "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 border-black shadow-hard-sm transition-all duration-200",
                inCart ? "bg-green-900 text-white" : "bg-primary text-primary-foreground",
              )}
              aria-label={inCart ? t("removeFromQuote") : t("addToQuote")}
            >
              {inCart ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}


export function ProductListRow({
  product,
  lineQuantity,
  onSetLineQuantity,
}: {
  product: Product;
  lineQuantity: number;
  onSetLineQuantity: (p: Product, qty: number) => void;
}) {
  const { t } = useDigicalI18n();
  const resolution = product.resolution || product.lecture || product.classe || "-";
  const ipTag = product.tags?.find((t) => t.includes("IP")) || "IP65";
  const certTag = product.tags?.find((t) => t.includes("COFRAC")) || "ISO 9001";
  const inCart = lineQuantity > 0;
  const [localQty, setLocalQty] = useState(1);

  useEffect(() => {
    if (!inCart) setLocalQty(1);
  }, [inCart]);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex w-full flex-wrap items-center gap-4 rounded-xl border-2 border-tech-border bg-tech-bg p-4 shadow-hard md:flex-nowrap"
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border-2 border-tech-border bg-tech-surface">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="96px"
          className="object-cover"
          onError={onCatalogueImageError}
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-base font-bold uppercase text-tech-text">{product.name}</h3>
        <p className="mt-1 font-mono text-[11px] font-bold uppercase text-tech-muted">{product.ref}</p>
        <p className="mt-1 font-mono text-[10px] font-semibold uppercase text-tech-text/80 md:hidden">
          {t("productResShort")}: {resolution}
        </p>
      </div>

      <div className="hidden flex-wrap items-center gap-2 md:flex">
        <span className="rounded-md border-2 border-tech-border bg-tech-surface px-2 py-1 font-mono text-[10px] font-bold uppercase">
          {t("productResShort")}: {resolution}
        </span>
        <span className="rounded-md border-2 border-tech-border bg-tech-surface px-2 py-1 font-mono text-[10px] font-bold uppercase">
          {ipTag}
        </span>
        <span className="rounded-md border-2 border-tech-border bg-tech-surface px-2 py-1 font-mono text-[10px] font-bold uppercase">
          {certTag}
        </span>
      </div>

      <div className="flex w-full shrink-0 items-center justify-end gap-2 md:w-auto">
        <CartLineQtyStepper
          product={product}
          lineQuantity={lineQuantity}
          localQuantity={localQty}
          onLocalChange={setLocalQty}
          onSetLineQuantity={onSetLineQuantity}
        />
        <button
          type="button"
          onClick={() => {
            if (inCart) onSetLineQuantity(product, 0);
            else onSetLineQuantity(product, localQty);
          }}
          className={cn(
            "shrink-0 rounded-lg border-2 border-black px-4 py-2 text-xs font-bold uppercase shadow-hard-sm transition-all duration-200",
            inCart ? "bg-green-900 text-white" : "bg-primary text-primary-foreground",
          )}
        >
          {inCart ? t("remove") : t("add")}
        </button>
      </div>
    </motion.article>
  );
}


export function Footer() {
  const { t } = useDigicalI18n();
  return (
    <footer className="border-t border-tech-border bg-tech-footer py-12 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 md:grid-cols-4 md:px-10">
        <div className="flex flex-col gap-4">
          <div className="flex flex-nowrap items-center gap-3">
            <div className="relative h-10 w-10 shrink-0">
              <Image
                src="/LOGO.webp"
                alt="Digical Metrologie"
                fill
                sizes="40px"
                className="object-contain transition-all duration-300"
              />
            </div>
            <span className="min-w-0 font-display text-xl leading-none font-black uppercase tracking-tight">
              Digical Metrologie
            </span>
          </div>
          <p className="text-sm text-tech-muted font-medium">{t("footerDescription")}</p>
        </div>
        <div>
          <h4 className="mb-4 font-bold uppercase">{t("navSection")}</h4>
          <ul className="space-y-2 text-sm text-tech-muted">
            <li><Link href="/">{t("navHome")}</Link></li>
            <li><Link href="/catalogue">{t("navCatalog")}</Link></li>
            <li><Link href="/services">{t("navServices")}</Link></li>
            <li><Link href="/expertise">{t("navExpertise")}</Link></li>
            <li><Link href="/contact">{t("navContact")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-bold uppercase">{t("legalSection")}</h4>
          <ul className="space-y-2 text-sm text-tech-muted">
            <li>{t("legalNotice")}</li>
            <li>{t("privacyPolicy")}</li>
            <li>{t("terms")}</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-bold uppercase">{t("contactSection")}</h4>
          <ul className="space-y-2 text-sm text-tech-muted">
            <li>{t("contactAgency")}</li>
            <li>
              <span dir="ltr" className="inline-block [unicode-bidi:isolate]">
                +212661406490
              </span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}


export function WhatsAppFloatButton() {
  const { t } = useDigicalI18n();
  const message = encodeURIComponent(t("whatsappMessage"));
  const href = `https://wa.me/212661406490?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsappAria")}
      className="fixed z-50 inline-flex h-12 max-w-[calc(100vw-2rem)] items-center justify-center gap-2 truncate rounded-xl border-2 border-black bg-tech-bg px-3 text-xs font-bold uppercase tracking-wider text-app-text shadow-hard-sm transition-all hover:-translate-y-0.5 hover:shadow-hard sm:px-4"
      style={{
        bottom: "max(1.5rem, env(safe-area-inset-bottom, 0px))",
        insetInlineEnd: "max(1.5rem, env(safe-area-inset-right, 0px))",
      }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5 shrink-0 text-whatsapp"
        fill="currentColor"
      >
        <path d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.74.45 3.44 1.3 4.95L2 22l5.3-1.39a9.88 9.88 0 0 0 4.73 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.12-2.89-7zM12.04 20.1h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.15.83.84-3.07-.2-.31a8.15 8.15 0 0 1-1.26-4.33c0-4.52 3.68-8.2 8.21-8.2 2.19 0 4.24.85 5.79 2.4a8.15 8.15 0 0 1 2.4 5.8c0 4.52-3.68 8.2-8.2 8.2zm4.5-6.15c-.25-.13-1.47-.73-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.98-.14.17-.29.19-.54.06-.25-.13-1.04-.38-1.98-1.22-.73-.65-1.22-1.46-1.37-1.71-.14-.25-.02-.39.11-.52.12-.12.25-.3.37-.45.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.76-1.85-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.23.9 2.43 1.03 2.6.13.17 1.76 2.69 4.26 3.77.59.26 1.05.41 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.17.21-.58.21-1.07.15-1.17-.06-.1-.22-.16-.47-.29z" />
      </svg>
      WhatsApp
    </a>
  );
}
