"use client";

import Link from "next/link";
import { useEffect, useState, type MouseEvent } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Check,
  ChevronRight,
  Globe,
  Menu,
  Minus,
  Moon,
  Plus,
  ShoppingCart,
  Sun,
  X,
  type LucideIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
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
  return (
    <motion.div
      className={cn(
        "flex h-14 w-14 items-center justify-center rounded-[1rem] border border-white/10 bg-white/5 text-primary shadow-hard sm:h-16 sm:w-16",
        className,
      )}
      animate={forceHover ? { y: -2, boxShadow: "var(--app-shadow-dark)" } : { y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
    >
      <Icon className="h-7 w-7" strokeWidth={1.6} />
    </motion.div>
  );
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-10 w-10 rounded-full border border-app-border bg-app-surface" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-app-border bg-app-surface text-app-text transition-all hover:scale-110 active:scale-95"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-primary" />
      ) : (
        <Moon className="h-4 w-4 text-primary" />
      )}
    </button>
  );
}

export function Navbar({ cartCount, route }: { cartCount: number; route: DigicalRoute }) {
  const { lang, setLang, t } = useDigicalI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const navItems = [
    { href: "/", label: t("navHome"), active: route === "home" },
    { href: "/catalogue", label: t("navCatalog"), active: route === "catalog" },
    { href: "/services", label: t("navServices"), active: route === "services" },
    { href: "/expertise", label: t("navExpertise"), active: route === "expertise" },
    { href: "/contact", label: t("navContact"), active: route === "contact" },
  ] as const;

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-5"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="relative flex items-center justify-between rounded-full border border-app-border bg-app-surface/60 px-5 py-2.5 backdrop-blur-2xl transition-all duration-500 hover:border-app-border-strong">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-app-border bg-app-surface text-app-text lg:hidden"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? t("navCloseMenu") : t("navOpenMenu")}
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>

            <Link href="/" className="group flex items-center" onClick={() => setMobileOpen(false)}>
              <div className="relative h-9 w-32 shrink-0 sm:h-10 sm:w-40">
                <Image
                  src="/logo-png.png"
                  alt="Digical Metrologie"
                  fill
                  priority
                  className="object-contain object-left dark:invert-0 invert"
                />
              </div>
            </Link>
          </div>

          <nav className="hidden items-center gap-2 lg:flex" aria-label="Navigation principale">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-5 py-2 font-display text-[10px] font-extrabold uppercase tracking-[0.2em] transition-all duration-300",
                  item.active
                    ? "text-primary"
                    : "text-app-text/60 hover:text-app-text"
                )}
              >
                {item.label}
                {item.active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-app-text/5"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden items-center rounded-full border border-app-border bg-app-bg/20 p-1 sm:flex">
              {["FR", "AR"].map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l as any)}
                  className={cn(
                    "rounded-full px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-300",
                    lang === l ? "bg-primary text-primary-foreground" : "text-app-text/40 hover:text-app-text"
                  )}
                >
                  {l}
                </button>
              ))}
            </div>

            <ThemeToggle />

            <Link href="/contact" className="btn-machined !h-10 !px-5" onClick={() => setMobileOpen(false)}>
              <ShoppingCart className="h-4 w-4" />
              <span className="font-mono text-[10px] tabular-nums">{cartCount}</span>
            </Link>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-x-0 top-full mt-2 px-4 lg:hidden"
        >
          <div className="rounded-3xl border border-white/10 bg-black/90 p-6 shadow-2xl backdrop-blur-2xl">
            <nav className="space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-5 py-4 font-display text-[11px] font-bold uppercase tracking-[0.2em]",
                    item.active ? "border-primary/30 text-primary" : "text-white/70"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </header>
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
      return;
    }
    onLocalChange(Math.min(99, Math.max(1, localQuantity + delta)));
  };

  return (
    <div className="flex h-11 shrink-0 items-stretch overflow-hidden rounded-full border border-app-border bg-app-surface shadow-sm" dir="ltr">
      <button
        type="button"
        className="flex w-8 items-center justify-center border-e border-app-border text-app-text hover:bg-app-bg/50"
        onClick={() => bump(-1)}
        aria-label={t("reduceQty")}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="flex min-w-[1.8rem] items-center justify-center px-1 font-mono text-xs font-bold tabular-nums text-app-text" aria-live="polite">
        {display}
      </span>
      <button
        type="button"
        disabled={display >= 99}
        className="flex w-8 items-center justify-center border-s border-app-border text-app-text hover:bg-app-bg/50 disabled:opacity-40"
        onClick={() => bump(1)}
        aria-label={t("increaseQty")}
      >
        <Plus className="h-4 w-4" />
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
  const { t } = useDigicalI18n();
  const [localQty, setLocalQty] = useState(1);
  const inCart = lineQuantity > 0;

  const handleToggle = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (inCart) {
      setLocalQty(1);
    }
    onSetLineQuantity(product, inCart ? 0 : localQty);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("paper-panel group flex h-full flex-col overflow-hidden", inCart && "glow-accent")}
    >
      <div className="flex items-center justify-between border-b border-app-border px-4 py-3">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-app-text/50">{product.ref}</span>
        <div className="flex flex-wrap justify-end gap-1.5">
          {(product.tags ?? []).slice(0, 2).map((tag) => (
            <span key={tag} className="technical-chip">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <Link href={`/produit?id=${product.id}`} className="block border-b border-app-border/70">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-0 transition-transform duration-300 group-hover:scale-105"
            onError={onCatalogueImageError}
          />
          <div className="pointer-events-none absolute inset-x-4 bottom-3 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-4 py-4 pb-5">
        <Link href={`/produit?id=${product.id}`}>
          <h3 className="min-h-[3.6rem] font-display text-lg font-bold uppercase leading-[1.02] tracking-[-0.04em] text-app-text">
            {product.name}
          </h3>
        </Link>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-app-text/60">{product.description_fr}</p>

        <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-app-border pt-4">
          <div>
            <dt className="surface-caption">{t("resolution")}</dt>
            <dd className="mt-1 font-mono text-xs font-bold uppercase text-app-text">{product.resolution || product.lecture || product.classe || "-"}</dd>
          </div>
          <div>
            <dt className="surface-caption">Plage</dt>
            <dd className="mt-1 font-mono text-xs font-bold uppercase text-app-text">{product.plage || "-"}</dd>
          </div>
          <div>
            <dt className="surface-caption">Erreur max</dt>
            <dd className="mt-1 font-mono text-xs font-bold uppercase text-app-text">{product.maxError || "-"}</dd>
          </div>
          <div>
            <dt className="surface-caption">Secteur</dt>
            <dd className="mt-1 font-mono text-xs font-bold uppercase text-app-text">{product.category || "-"}</dd>
          </div>
        </dl>

        <div className="mt-5 flex items-center justify-between gap-2 border-t border-app-border px-3 pt-4 pb-5">
          <CartLineQtyStepper
            product={product}
            lineQuantity={lineQuantity}
            localQuantity={localQty}
            onLocalChange={setLocalQty}
            onSetLineQuantity={onSetLineQuantity}
          />
          <button
            type="button"
            onClick={handleToggle}
            className={cn(
              "inline-flex h-11 shrink-0 min-w-[7.2rem] items-center justify-center gap-2 rounded-full border px-4 font-display text-[11px] font-bold uppercase tracking-[0.16em]",
              inCart
                ? "border-app-text bg-app-text text-white"
                : "border-primary bg-primary text-white shadow-[0_10px_24px_-14px_rgba(179,38,47,0.75)]",
            )}
            aria-label={inCart ? t("removeFromQuote") : t("addToQuote")}
          >
            {inCart ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
            <span>{inCart ? t("remove") : t("add")}</span>
          </button>
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
  const [localQty, setLocalQty] = useState(1);
  const inCart = lineQuantity > 0;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="paper-panel flex w-full flex-col gap-4 p-4 md:flex-row md:items-center"
    >
      <Link href={`/produit?id=${product.id}`} className="relative block h-28 overflow-hidden rounded-[1rem] md:w-32 md:shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="128px"
          className="object-contain p-4"
          onError={onCatalogueImageError}
        />
      </Link>

      <div className="min-w-0 flex-1">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-app-text/50">{product.ref}</p>
        <h3 className="mt-2 truncate font-display text-lg font-bold uppercase tracking-[-0.04em] text-app-text">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-app-text/60">{product.description_fr}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="technical-chip">{product.resolution || product.lecture || "-"}</span>
          <span className="technical-chip">{product.plage || "-"}</span>
          {(product.tags ?? []).slice(0, 2).map((tag) => (
            <span key={tag} className="technical-chip">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3 md:w-auto">
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
            if (inCart) {
              setLocalQty(1);
            }
            onSetLineQuantity(product, inCart ? 0 : localQty);
          }}
          className={cn(
            "inline-flex h-11 shrink-0 min-w-[7.2rem] items-center justify-center gap-2 rounded-full border px-4 font-display text-[11px] font-bold uppercase tracking-[0.16em]",
            inCart ? "border-app-text bg-app-text text-white" : "border-primary bg-primary text-white",
          )}
        >
          {inCart ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
          <span>{inCart ? t("remove") : t("add")}</span>
        </button>
      </div>
    </motion.article>
  );
}

export function Footer() {
  const { t } = useDigicalI18n();
  return (
    <footer className="mt-20 border-t border-app-border bg-app-footer-bg py-20 text-app-text">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="space-y-8">
            <Link href="/" className="inline-block">
              <div className="relative h-12 w-48">
              <Image
                src="/logo-png.png"
                alt="Digical Metrologie"
                fill
                className="object-contain object-left dark:invert-0 invert"
              />
            </div>
          </Link>
          <p className="max-w-xs text-[13px] leading-relaxed text-app-text/50">
            {t("footerDescription")}
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="status-pill">Precision Engineering</span>
            <span className="status-pill">ISO Certified</span>
          </div>
          </div>

          <div>
            <h4 className="font-display text-[10px] font-extrabold uppercase tracking-[0.3em] text-primary">{t("navSection")}</h4>
            <ul className="mt-8 space-y-4 text-[13px] text-app-text/40">
              <li><Link href="/" className="transition-colors hover:text-app-text">{t("navHome")}</Link></li>
              <li><Link href="/catalogue" className="transition-colors hover:text-app-text">{t("navCatalog")}</Link></li>
              <li><Link href="/services" className="transition-colors hover:text-app-text">{t("navServices")}</Link></li>
              <li><Link href="/expertise" className="transition-colors hover:text-app-text">{t("navExpertise")}</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-app-text">{t("navContact")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-[10px] font-extrabold uppercase tracking-[0.3em] text-primary">{t("legalSection")}</h4>
            <ul className="mt-8 space-y-4 text-[13px] text-app-text/40">
              <li className="transition-colors hover:text-app-text">{t("legalNotice")}</li>
              <li className="transition-colors hover:text-app-text">{t("privacyPolicy")}</li>
              <li className="transition-colors hover:text-app-text">{t("terms")}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-[10px] font-extrabold uppercase tracking-[0.3em] text-primary">{t("contactSection")}</h4>
            <div className="mt-8 space-y-6">
              <div>
                <p className="text-[13px] font-bold text-app-text">{t("contactAgency")}</p>
                <p className="mt-2 font-mono text-xs tracking-wider text-app-text/40 uppercase">Casablanca, Morocco</p>
              </div>
              <div className="inline-block rounded-2xl border border-app-border bg-app-surface p-4">
                <p className="font-mono text-sm font-bold text-primary">+212 661 406 490</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-app-border pt-10 md:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-app-text/20">
            &copy; {new Date().getFullYear()} Digical Metrologie. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            {["LinkedIn", "YouTube", "Twitter"].map((social) => (
              <span key={social} className="cursor-pointer font-display text-[10px] font-bold uppercase tracking-[0.2em] text-app-text/30 transition-colors hover:text-primary">
                {social}
              </span>
            ))}
          </div>
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
      className="fixed z-50 inline-flex h-12 items-center justify-center gap-2 rounded-full border border-app-border bg-app-surface/90 px-4 text-[11px] font-bold uppercase tracking-[0.16em] text-app-text shadow-hard backdrop-blur-xl hover:scale-105 transition-transform"
      style={{
        bottom: "max(1.5rem, env(safe-area-inset-bottom, 0px))",
        insetInlineEnd: "max(1.5rem, env(safe-area-inset-right, 0px))",
      }}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-[#25D366]" fill="currentColor">
        <path d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.74.45 3.44 1.3 4.95L2 22l5.3-1.39a9.88 9.88 0 0 0 4.73 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.12-2.89-7zM12.04 20.1h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.15.83.84-3.07-.2-.31a8.15 8.15 0 0 1-1.26-4.33c0-4.52 3.68-8.2 8.21-8.2 2.19 0 4.24.85 5.79 2.4a8.15 8.15 0 0 1 2.4 5.8c0 4.52-3.68 8.2-8.2 8.2zm4.5-6.15c-.25-.13-1.47-.73-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.98-.14.17-.29.19-.54.06-.25-.13-1.04-.38-1.98-1.22-.73-.65-1.22-1.46-1.37-1.71-.14-.25-.02-.39.11-.52.12-.12.25-.3.37-.45.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.76-1.85-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.23.9 2.43 1.03 2.6.13.17 1.76 2.69 4.26 3.77.59.26 1.05.41 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.17.21-.58.21-1.07.15-1.17-.06-.1-.22-.16-.47-.29z" />
      </svg>
      <span className="hidden sm:inline">WhatsApp</span>
      <Globe className="h-4 w-4 sm:hidden" />
    </a>
  );
}
