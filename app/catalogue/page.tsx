"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, LayoutGrid, List, Trash2 } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import type { CartItem, Product } from "@/lib/types";
import { AppShell } from "@/components/digical/AppShell";
import { cn, ProductCard, ProductListRow } from "@/components/digical/shared";
import { useDigicalI18n } from "@/components/digical/language";
import { useDigicalCart } from "@/components/digical/useDigicalCart";

function CatalogContent({
  onSetLineQuantity,
  cartItems,
  onClearCart,
}: {
  onSetLineQuantity: (p: Product, qty: number) => void;
  cartItems: CartItem[];
  onClearCart: () => void;
}) {
  const [sector, setSector] = useState<"tous" | "industriel" | "agricole">("tous");
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"reference" | "name" | "precision">("reference");
  const [showOnlyCertified, setShowOnlyCertified] = useState(false);
  const [showHighPrecision, setShowHighPrecision] = useState(false);
  const [certISO, setCertISO] = useState(false);
  const [certCOFRAC, setCertCOFRAC] = useState(false);
  const [resolutionUnit, setResolutionUnit] = useState<string>("all");
  const [resolutionMax, setResolutionMax] = useState<number>(1);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 9;
  const { t, isArabic } = useDigicalI18n();
  const sectorActiveShadow = isArabic ? "[box-shadow:-2px_2px_0px_var(--app-shadow)]" : "[box-shadow:2px_2px_0px_var(--app-shadow)]";

  const sectorContent = {
    tous: { heading: t("catHeadingTous"), intro: t("catIntroTous") },
    industriel: { heading: t("catHeadingIndustriel"), intro: t("catIntroIndustriel") },
    agricole: { heading: t("catHeadingAgricole"), intro: t("catIntroAgricole") },
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    if (sector === "tous") return true;
    return !p.category || p.category.toLowerCase().includes(sector);
  });
  const unitValues = filteredProducts.reduce<Record<string, number[]>>((acc, p) => {
    const raw = p.resolution || p.lecture || "";
    const match = raw.match(/([\d.]+)\s*([^\d\s].*)$/);
    if (!match) return acc;
    const value = Number(match[1]);
    const unit = match[2].trim().toLowerCase();
    if (!Number.isFinite(value)) return acc;
    if (!acc[unit]) acc[unit] = [];
    acc[unit].push(value);
    return acc;
  }, {});
  const availableUnits = Object.keys(unitValues);
  const selectedUnitValues =
    resolutionUnit !== "all" && unitValues[resolutionUnit] ? unitValues[resolutionUnit] : [];
  const unitMin =
    selectedUnitValues.length > 0 ? Math.min(...selectedUnitValues) : 0;
  const unitMax =
    selectedUnitValues.length > 0 ? Math.max(...selectedUnitValues) : 1;
  const searchedProducts = filteredProducts.filter((p) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    const fr = (p.description_fr || p.description || "").toLowerCase();
    const ar = (p.description_ar || "").toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.ref.toLowerCase().includes(q) ||
      fr.includes(q) ||
      ar.includes(q)
    );
  });

  const advancedFilteredProducts = searchedProducts.filter((p) => {
    if (showOnlyCertified && !(p.tags?.includes("COFRAC") || p.tags?.includes("IP65"))) return false;
    if (showHighPrecision && !(p.resolution?.includes("0.001") || p.maxError?.includes("2"))) return false;
    if (certISO && !((p.tags || []).includes("ISO 9001"))) return false;
    if (certCOFRAC && !((p.tags || []).includes("COFRAC"))) return false;
    if (resolutionUnit !== "all") {
      const raw = p.resolution || p.lecture || "";
      const match = raw.match(/([\d.]+)\s*([^\d\s].*)$/);
      if (!match) return false;
      const value = Number(match[1]);
      const unit = match[2].trim().toLowerCase();
      if (unit !== resolutionUnit) return false;
      if (value > resolutionMax) return false;
    }
    return true;
  });
  const sortedProducts = [...advancedFilteredProducts].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "precision") {
      const ap = a.resolution || a.lecture || "9.99";
      const bp = b.resolution || b.lecture || "9.99";
      return ap.localeCompare(bp);
    }
    return a.ref.localeCompare(b.ref);
  });
  const totalPages = Math.max(1, Math.ceil(advancedFilteredProducts.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const pagedProducts = sortedProducts.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div
      className={cn(
        "mx-auto flex max-w-7xl flex-col items-start md:flex-row",
        isArabic && "md:flex-row-reverse",
      )}
    >
      <aside className="flex w-full shrink-0 flex-col gap-8 border-b border-tech-border bg-tech-bg/50 p-4 sm:gap-10 sm:p-6 md:sticky md:top-[73px] md:min-h-[calc(100vh-73px)] md:w-[280px] md:border-b-0 md:border-e md:p-8">
        <div>
          <h3 className="mb-6 flex items-center gap-2 border-b border-tech-border pb-2 font-display text-sm font-black uppercase tracking-widest text-primary">
            <LayoutGrid className="h-4 w-4" />
            {t("catSector")}
          </h3>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                setSector("tous");
                setPage(1);
              }}
              className={cn(
                "flex h-10 items-center rounded-xl border-2 border-tech-border px-4 font-mono text-[10px] font-bold uppercase transition-all",
                sector === "tous"
                  ? cn("bg-primary text-primary-foreground", sectorActiveShadow)
                  : "bg-tech-surface hover:bg-tech-bg",
              )}
            >
              {t("catSectorAll")}
            </button>
            <button
              onClick={() => {
                setSector("industriel");
                setPage(1);
              }}
              className={cn(
                "flex h-10 items-center rounded-xl border-2 border-tech-border px-4 font-mono text-[10px] font-bold uppercase transition-all",
                sector === "industriel"
                  ? cn("brutal-on-dark bg-black text-white", sectorActiveShadow)
                  : "bg-tech-surface hover:bg-tech-bg",
              )}
            >
              {t("catSectorIndustrial")}
            </button>
            <button
              onClick={() => {
                setSector("agricole");
                setPage(1);
              }}
              className={cn(
                "flex h-10 items-center rounded-xl border-2 border-tech-border px-4 font-mono text-[10px] font-bold uppercase transition-all",
                sector === "agricole"
                  ? cn(
                      "brutal-surface-invert border-tech-muted bg-tech-text text-white dark:text-tech-brand",
                      sectorActiveShadow,
                    )
                  : "bg-tech-surface hover:bg-tech-bg",
              )}
            >
              {t("catSectorFarm")}
            </button>
          </div>
        </div>

        <div>
          <h3 className="mb-4 border-b border-tech-border pb-2 font-display text-sm font-black uppercase tracking-widest text-primary">
            {t("catFilters")}
          </h3>
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs font-bold uppercase">
              <input type="checkbox" checked={showOnlyCertified} onChange={(e) => setShowOnlyCertified(e.target.checked)} />
              {t("catCertifiedOnly")}
            </label>
            <label className="flex items-center gap-2 text-xs font-bold uppercase">
              <input type="checkbox" checked={showHighPrecision} onChange={(e) => setShowHighPrecision(e.target.checked)} />
              {t("catHighPrecision")}
            </label>
            <div className="pt-2">
              <p className="font-mono text-[10px] font-bold uppercase text-tech-muted">{t("catCertifications")}</p>
              <label className="mt-2 flex items-center gap-2 text-xs font-bold uppercase">
                <input type="checkbox" checked={certISO} onChange={(e) => setCertISO(e.target.checked)} />
                ISO 9001
              </label>
              <label className="mt-2 flex items-center gap-2 text-xs font-bold uppercase">
                <input type="checkbox" checked={certCOFRAC} onChange={(e) => setCertCOFRAC(e.target.checked)} />
                COFRAC
              </label>
            </div>
            <div className="pt-2">
              <p className="font-mono text-[10px] font-bold uppercase text-tech-muted">{t("catResolutionUnit")}</p>
              <select
                value={resolutionUnit}
                onChange={(e) => {
                  const unit = e.target.value;
                  setResolutionUnit(unit);
                  if (unit === "all") {
                    setResolutionMax(1);
                  } else {
                    const vals = unitValues[unit] || [1];
                    setResolutionMax(Math.max(...vals));
                  }
                }}
                className="mt-2 h-10 w-full rounded-xl border-2 border-tech-border bg-tech-surface px-3 font-mono text-[10px] font-bold uppercase focus:border-primary focus:ring-0"
              >
                <option value="all">{t("catAllUnits")}</option>
                {availableUnits.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
              {resolutionUnit !== "all" && (
                <div className="mt-3">
                  <input
                    type="range"
                    min={unitMin}
                    max={unitMax}
                    step={(unitMax - unitMin) / 100 || 0.001}
                    value={Math.max(unitMin, Math.min(resolutionMax, unitMax))}
                    onChange={(e) => setResolutionMax(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                  <p className="font-mono text-[10px] font-bold uppercase text-primary">
                    max {resolutionMax.toFixed(3)} {resolutionUnit}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="hidden flex-col gap-6 md:flex">
          <div className="rounded-xl border-2 border-tech-border bg-tech-surface p-6 shadow-hard-sm">
            <h4 className="mb-3 font-display text-[11px] font-black uppercase tracking-tight">{t("catSupportTitle")}</h4>
            <p className="text-[10px] leading-relaxed text-tech-muted">{t("catSupportBody")}</p>
            <Link href="/contact" className="mt-4 inline-block text-[10px] font-black uppercase text-primary underline underline-offset-4">
              {t("catExpertLink")}
            </Link>
          </div>
        </div>
      </aside>
      
      <section className="flex-1 p-4 sm:p-6 md:p-10 lg:p-16">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 border-b border-tech-border pb-10 md:flex-row md:items-end">
          <div className="min-w-0">
            <span className="font-mono text-xs font-bold uppercase text-primary">{t("catLabel")}</span>
            <h1 className="mt-1 font-display text-3xl font-black uppercase tracking-tight sm:text-4xl md:text-5xl">{sectorContent[sector].heading}</h1>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-tech-text/75">
              {sectorContent[sector].intro}
            </p>
          </div>
          <p className="max-w-xs font-sans text-xs font-semibold uppercase leading-relaxed text-tech-muted">
            {t("catDisplayed")} {advancedFilteredProducts.length} {t("catRefCount")}
          </p>
        </div>

        <div className="mb-10 rounded-xl border-2 border-tech-border bg-tech-surface p-4 shadow-hard-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("catSearchPlaceholder")}
              className="h-11 w-full rounded-xl border-2 border-tech-border px-4 font-mono text-xs uppercase focus:border-primary focus:ring-0 md:max-w-md"
            />
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2 md:flex-initial md:flex-nowrap">
              <div className="flex shrink-0 rounded-xl border-2 border-tech-border bg-tech-bg shadow-hard-sm">
                <button
                  onClick={() => setViewType("grid")}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center",
                    viewType === "grid"
                      ? "brutal-surface-invert bg-tech-text text-white dark:text-tech-brand"
                      : "bg-tech-surface text-tech-text"
                  )}
                  aria-label={t("catAriaGrid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewType("list")}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center border-s border-tech-border",
                    viewType === "list"
                      ? "brutal-surface-invert bg-tech-text text-white dark:text-tech-brand"
                      : "bg-tech-surface text-tech-text"
                  )}
                  aria-label={t("catAriaList")}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={onClearCart}
                disabled={cartItems.length === 0}
                className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl border-2 border-tech-border bg-tech-surface px-3 font-styrene text-[11px] font-bold uppercase tracking-wider text-tech-text shadow-hard-sm transition-all hover:-translate-y-[2px] hover:shadow-hard disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-hard-sm"
              >
                <Trash2 className="h-3.5 w-3.5" />
                {t("clearAll")}
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "reference" | "name" | "precision")}
                className="h-10 min-w-0 flex-1 rounded-xl border-2 border-tech-border bg-tech-surface px-3 font-mono text-[11px] font-bold uppercase shadow-hard-sm focus:border-primary focus:ring-0 md:max-w-[280px] md:flex-initial"
              >
                <option value="reference">{t("catSortRef")}</option>
                <option value="name">{t("catSortName")}</option>
                <option value="precision">{t("catSortPrecision")}</option>
              </select>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {viewType === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {pagedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  lineQuantity={cartItems.find((item) => item.product.id === product.id)?.quantity ?? 0}
                  onSetLineQuantity={onSetLineQuantity}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              {pagedProducts.map((product) => (
                <ProductListRow
                  key={product.id}
                  product={product}
                  lineQuantity={cartItems.find((item) => item.product.id === product.id)?.quantity ?? 0}
                  onSetLineQuantity={onSetLineQuantity}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        {advancedFilteredProducts.length === 0 && (
          <div className="flex h-64 flex-col items-center justify-center rounded-xl border-2 border-tech-border border-dashed bg-tech-bg/30 text-tech-muted">
            <AlertCircle className="mb-2 h-10 w-10 opacity-20" />
            <p className="font-mono text-xs font-bold uppercase">{t("catEmpty")}</p>
          </div>
        )}

        {advancedFilteredProducts.length > 0 && (
          <div className="mt-10 flex max-w-full flex-nowrap items-center justify-start gap-2 overflow-x-auto overscroll-x-contain pb-2 [-webkit-overflow-scrolling:touch] sm:flex-wrap sm:justify-center">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="h-10 rounded-xl border-2 border-tech-border bg-tech-surface px-3 text-xs font-bold uppercase"
            >
              {t("catPrev")}
            </button>
            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={cn(
                    "h-10 w-10 rounded-xl border-2 border-tech-border text-xs font-bold",
                    currentPage === p ? "bg-primary text-primary-foreground" : "bg-tech-surface"
                  )}
                >
                  {p}
                </button>
              );
            })}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="h-10 rounded-xl border-2 border-tech-border bg-tech-surface px-3 text-xs font-bold uppercase"
            >
              {t("catNext")}
            </button>
          </div>
        )}

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl border-2 border-tech-border bg-tech-surface p-6 shadow-hard">
            <h3 className="font-display text-2xl font-bold uppercase tracking-tight">{t("catWhyTitle")}</h3>
            <ul className="mt-4 space-y-2 text-sm font-medium text-tech-text/80">
              <li>{t("catWhy1")}</li>
              <li>{t("catWhy2")}</li>
              <li>{t("catWhy3")}</li>
            </ul>
          </div>
          <div className="blueprint-bg rounded-xl border-2 border-tech-border bg-tech-bg/70 p-6 shadow-hard">
            <h3 className="font-display text-2xl font-bold uppercase tracking-tight">{t("catTailorTitle")}</h3>
            <p className="mt-3 text-sm font-medium text-tech-text/80">{t("catTailorBody")}</p>
            <Link
              href="/contact"
              className="mt-4 inline-flex h-11 items-center justify-center rounded-xl border-2 border-tech-border bg-primary px-5 font-styrene text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-hard-sm"
            >
              {t("catTailorCta")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function CataloguePage() {
  const { cartItems, cartCount, setCartLineQuantity, clearCart } = useDigicalCart();
  return (
    <AppShell route="catalog" cartCount={cartCount}>
      <CatalogContent onSetLineQuantity={setCartLineQuantity} onClearCart={clearCart} cartItems={cartItems} />
    </AppShell>
  );
}
