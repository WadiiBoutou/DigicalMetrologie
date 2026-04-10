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
  Plus,
  ShoppingCart,
  X,
  type LucideIcon,
} from "lucide-react";
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

export function Navbar({ cartCount, route }: { cartCount: number; route: DigicalRoute }) {
  const { lang, setLang, t } = useDigicalI18n();
  const [mobileOpen, setMobileOpen] = useState(false);

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
    <header className="sticky top-0 z-50 border-b border-white/6 bg-[rgba(7,13,20,0.86)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="digical-mobile-nav"
            aria-label={mobileOpen ? t("navCloseMenu") : t("navOpenMenu")}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link href="/" className="group flex min-w-0 items-center" onClick={() => setMobileOpen(false)}>
            <div className="relative h-11 w-40 shrink-0 overflow-visible sm:h-12 sm:w-48">
              <Image
                src="/logo-png.png"
                alt=""
                aria-hidden="true"
                fill
                sizes="(max-width: 640px) 160px, 192px"
                className="object-contain object-left opacity-60 [filter:brightness(0)_invert(1)_blur(0.9px)]"
              />
              <Image
                src="/logo-png.png"
                alt="Digical Metrologie"
                fill
                priority
                sizes="(max-width: 640px) 160px, 192px"
                className="object-contain object-left [filter:drop-shadow(0_0_12px_rgba(255,255,255,0.08))]"
              />
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 font-display text-[11px] font-bold uppercase tracking-[0.16em]",
                item.active
                  ? "border border-white/12 bg-white/8 text-white"
                  : "text-white/68 hover:bg-white/6 hover:text-white",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center rounded-full border border-white/12 bg-white/5 p-1 sm:flex">
            <button
              type="button"
              onClick={() => setLang("FR")}
              aria-pressed={lang === "FR"}
              aria-label="Francais"
              className={cn(
                "rounded-full px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em]",
                lang === "FR" ? "bg-white text-app-bg" : "text-white/72 hover:text-white",
              )}
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => setLang("AR")}
              aria-pressed={lang === "AR"}
              aria-label="Arabic"
              className={cn(
                "rounded-full px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em]",
                lang === "AR" ? "bg-white text-app-bg" : "text-white/72 hover:text-white",
              )}
            >
              AR
            </button>
          </div>

          <Link href="/contact" className="btn-machined px-5" onClick={() => setMobileOpen(false)}>
            <span>{t("quote")}</span>
            <span className="rounded-full bg-white/16 px-2 py-1 font-mono text-[10px] tabular-nums">{cartCount}</span>
          </Link>
        </div>
      </div>

      {mobileOpen ? (
        <div id="digical-mobile-nav" className="border-t border-white/8 bg-[#08111a] px-4 py-4 lg:hidden">
          <div className="mx-auto max-w-7xl space-y-4">
            <div className="flex items-center justify-between rounded-[1.25rem] border border-white/10 bg-white/5 p-3">
              <div>
                <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-white">{t("languageToggle")}</p>
                <p className="mt-1 text-xs text-white/58">FR / AR</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLang("FR")}
                  className={cn(
                    "rounded-full border px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em]",
                    lang === "FR"
                      ? "border-white bg-white text-app-bg"
                      : "border-white/14 bg-transparent text-white/72",
                  )}
                >
                  FR
                </button>
                <button
                  type="button"
                  onClick={() => setLang("AR")}
                  className={cn(
                    "rounded-full border px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em]",
                    lang === "AR"
                      ? "border-white bg-white text-app-bg"
                      : "border-white/14 bg-transparent text-white/72",
                  )}
                >
                  AR
                </button>
              </div>
            </div>

            <nav className="rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-2" aria-label="Navigation mobile">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between border-b border-white/8 py-4 font-display text-sm font-bold uppercase tracking-[0.14em] last:border-b-0",
                    item.active ? "text-white" : "text-white/72",
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
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
    <div className="flex h-11 shrink-0 items-stretch overflow-hidden rounded-full border border-tech-border bg-white shadow-tech-sm" dir="ltr">
      <button
        type="button"
        className="flex w-8 items-center justify-center border-e border-tech-border text-tech-text hover:bg-tech-bg"
        onClick={() => bump(-1)}
        aria-label={t("reduceQty")}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="flex min-w-[1.8rem] items-center justify-center px-1 font-mono text-xs font-bold tabular-nums text-tech-text" aria-live="polite">
        {display}
      </span>
      <button
        type="button"
        disabled={display >= 99}
        className="flex w-8 items-center justify-center border-s border-tech-border text-tech-text hover:bg-tech-bg disabled:opacity-40"
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
      className={cn("catalog-sheet group flex h-full flex-col overflow-hidden", inCart && "glow-accent")}
    >
      <div className="flex items-center justify-between border-b border-tech-border/80 px-4 py-3">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-tech-muted">{product.ref}</span>
        <div className="flex flex-wrap justify-end gap-1.5">
          {(product.tags ?? []).slice(0, 2).map((tag) => (
            <span key={tag} className="technical-chip">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <Link href={`/produit?id=${product.id}`} className="block border-b border-tech-border/70">
        <div className="tech-inset relative aspect-[4/3] overflow-hidden">
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
          <h3 className="min-h-[3.6rem] font-display text-lg font-bold uppercase leading-[1.02] tracking-[-0.04em] text-tech-text">
            {product.name}
          </h3>
        </Link>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-tech-body">{product.description_fr}</p>

        <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-tech-border/70 pt-4">
          <div>
            <dt className="surface-caption">{t("resolution")}</dt>
            <dd className="mt-1 font-mono text-xs font-bold uppercase text-tech-text">{product.resolution || product.lecture || product.classe || "-"}</dd>
          </div>
          <div>
            <dt className="surface-caption">Plage</dt>
            <dd className="mt-1 font-mono text-xs font-bold uppercase text-tech-text">{product.plage || "-"}</dd>
          </div>
          <div>
            <dt className="surface-caption">Erreur max</dt>
            <dd className="mt-1 font-mono text-xs font-bold uppercase text-tech-text">{product.maxError || "-"}</dd>
          </div>
          <div>
            <dt className="surface-caption">Secteur</dt>
            <dd className="mt-1 font-mono text-xs font-bold uppercase text-tech-text">{product.category || "-"}</dd>
          </div>
        </dl>

        <div className="mt-5 flex items-center justify-between gap-2 border-t border-tech-border/70 px-3 pt-4 pb-5">
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
                ? "border-tech-text bg-tech-text text-white"
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
      className="catalog-sheet flex w-full flex-col gap-4 p-4 md:flex-row md:items-center"
    >
      <Link href={`/produit?id=${product.id}`} className="tech-inset relative block h-28 overflow-hidden rounded-[1rem] md:w-32 md:shrink-0">
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
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-tech-muted">{product.ref}</p>
        <h3 className="mt-2 truncate font-display text-lg font-bold uppercase tracking-[-0.04em] text-tech-text">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-tech-body">{product.description_fr}</p>
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
            inCart ? "border-tech-text bg-tech-text text-white" : "border-primary bg-primary text-white",
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
    <footer className="mt-16 border-t border-white/8 bg-tech-footer text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] md:px-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/10 bg-white/6">
              <Image src="/LOGO.webp" alt="Digical Metrologie" fill sizes="48px" className="object-contain p-1" />
            </div>
            <div>
              <p className="font-display text-base font-bold uppercase tracking-[0.18em]" translate="no">
                Digical Metrologie
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/48">Kinetic Industrial System</p>
            </div>
          </div>
          <p className="max-w-md text-sm leading-7 text-white/68">{t("footerDescription")}</p>
          <div className="flex flex-wrap gap-2">
            <span className="status-pill-dark">Qualite verifiee</span>
            <span className="status-pill-dark">COFRAC</span>
            <span className="status-pill-dark">Maroc</span>
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-white">{t("navSection")}</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/68">
            <li><Link href="/">{t("navHome")}</Link></li>
            <li><Link href="/catalogue">{t("navCatalog")}</Link></li>
            <li><Link href="/services">{t("navServices")}</Link></li>
            <li><Link href="/expertise">{t("navExpertise")}</Link></li>
            <li><Link href="/contact">{t("navContact")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-white">{t("legalSection")}</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/68">
            <li>{t("legalNotice")}</li>
            <li>{t("privacyPolicy")}</li>
            <li>{t("terms")}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-white">{t("contactSection")}</h4>
          <div className="mt-4 space-y-3 text-sm text-white/68">
            <p>{t("contactAgency")}</p>
            <p dir="ltr" className="font-mono text-xs uppercase tracking-[0.14em] text-white">
              +212 661 406 490
            </p>
            <p>Casablanca · Services metrologiques & devis B2B</p>
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
      className="fixed z-50 inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-[rgba(7,13,20,0.9)] px-4 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-hard backdrop-blur-xl"
      style={{
        bottom: "max(1.5rem, env(safe-area-inset-bottom, 0px))",
        insetInlineEnd: "max(1.5rem, env(safe-area-inset-right, 0px))",
      }}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-whatsapp" fill="currentColor">
        <path d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.74.45 3.44 1.3 4.95L2 22l5.3-1.39a9.88 9.88 0 0 0 4.73 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.12-2.89-7zM12.04 20.1h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.15.83.84-3.07-.2-.31a8.15 8.15 0 0 1-1.26-4.33c0-4.52 3.68-8.2 8.21-8.2 2.19 0 4.24.85 5.79 2.4a8.15 8.15 0 0 1 2.4 5.8c0 4.52-3.68 8.2-8.2 8.2zm4.5-6.15c-.25-.13-1.47-.73-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.98-.14.17-.29.19-.54.06-.25-.13-1.04-.38-1.98-1.22-.73-.65-1.22-1.46-1.37-1.71-.14-.25-.02-.39.11-.52.12-.12.25-.3.37-.45.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.76-1.85-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.23.9 2.43 1.03 2.6.13.17 1.76 2.69 4.26 3.77.59.26 1.05.41 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.17.21-.58.21-1.07.15-1.17-.06-.1-.22-.16-.47-.29z" />
      </svg>
      <span className="hidden sm:inline">WhatsApp</span>
      <Globe className="h-4 w-4 sm:hidden" />
    </a>
  );
}
