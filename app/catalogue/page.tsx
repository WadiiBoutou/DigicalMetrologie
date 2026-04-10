"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/lib/products";
import type { CartItem, Product } from "@/lib/types";
import { AppShell } from "@/components/digical/AppShell";
import { cn, ProductCard } from "@/components/digical/shared";
import { useDigicalI18n } from "@/components/digical/language";
import { useDigicalCart } from "@/components/digical/useDigicalCart";

function asBool(value: string | null) {
  return value === "1" || value === "true";
}

function CatalogContent({
  onSetLineQuantity,
  cartItems,
  onClearCart,
}: {
  onSetLineQuantity: (p: Product, qty: number) => void;
  cartItems: CartItem[];
  onClearCart: () => void;
}) {
  const { t } = useDigicalI18n();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sector = (searchParams.get("sector") as "tous" | "industriel" | "agricole" | null) ?? "tous";
  const sortBy = (searchParams.get("sort") as "reference" | "name" | "precision" | null) ?? "reference";
  const showOnlyCertified = asBool(searchParams.get("certified"));
  const showHighPrecision = asBool(searchParams.get("precision"));
  const certISO = asBool(searchParams.get("iso"));
  const resolutionUnit = searchParams.get("unit") ?? "all";
  const search = searchParams.get("search") ?? "";
  const pageParam = Number(searchParams.get("page") ?? "1");
  const requestedResolutionMax = Number(searchParams.get("max") ?? "0");
  const perPage = 9;

  const [searchDraft, setSearchDraft] = useState(search);

  useEffect(() => {
    setSearchDraft(search);
  }, [search]);

  const updateParams = useCallback((updates: Record<string, string | number | boolean | null>, resetPage = true) => {
    const next = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "" || value === false || value === "all") {
        next.delete(key);
      } else if (value === true) {
        next.set(key, "1");
      } else {
        next.set(key, String(value));
      }
    });

    if (resetPage) {
      next.delete("page");
    }

    const nextQuery = next.toString();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (searchDraft !== search) {
        updateParams({ search: searchDraft.trim() || null }, true);
      }
    }, 220);
    return () => window.clearTimeout(timeout);
  }, [searchDraft, search, updateParams]);

  const sectorContent = {
    tous: { heading: t("catHeadingTous"), intro: t("catIntroTous") },
    industriel: { heading: t("catHeadingIndustriel"), intro: t("catIntroIndustriel") },
    agricole: { heading: t("catHeadingAgricole"), intro: t("catIntroAgricole") },
  } as const;

  const sectorProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (sector === "tous") return true;
      return product.category?.toLowerCase().includes(sector);
    });
  }, [sector]);

  const unitValues = useMemo(() => {
    return sectorProducts.reduce<Record<string, number[]>>((acc, product) => {
      const raw = product.resolution || product.lecture || "";
      const match = raw.match(/([\d.]+)\s*([^\d\s].*)$/);
      if (!match) return acc;
      const value = Number(match[1]);
      const unit = match[2].trim().toLowerCase();
      if (!Number.isFinite(value)) return acc;
      acc[unit] = acc[unit] ? [...acc[unit], value] : [value];
      return acc;
    }, {});
  }, [sectorProducts]);

  const availableUnits = Object.keys(unitValues).sort();
  const selectedUnitValues = resolutionUnit !== "all" && unitValues[resolutionUnit] ? unitValues[resolutionUnit] : [];
  const unitMin = selectedUnitValues.length > 0 ? Math.min(...selectedUnitValues) : 0;
  const unitMax = selectedUnitValues.length > 0 ? Math.max(...selectedUnitValues) : 1;
  const effectiveResolutionMax = resolutionUnit === "all" ? 0 : Math.min(Math.max(requestedResolutionMax || unitMax, unitMin), unitMax);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return sectorProducts
      .filter((product) => {
        if (!query) return true;
        const fr = (product.description_fr || product.description || "").toLowerCase();
        const ar = (product.description_ar || "").toLowerCase();
        return (
          product.name.toLowerCase().includes(query) ||
          product.ref.toLowerCase().includes(query) ||
          fr.includes(query) ||
          ar.includes(query)
        );
      })
      .filter((product) => {
        if (showOnlyCertified && !((product.tags || []).some((tag) => tag.includes("COFRAC") || tag.includes("IP")))) {
          return false;
        }
        if (showHighPrecision && !((product.resolution || product.lecture || "").includes("0.001") || (product.maxError || "").includes("2"))) {
          return false;
        }
        if (certISO && !(product.tags || []).includes("Qualite verifiee")) return false;
        if (resolutionUnit !== "all") {
          const raw = product.resolution || product.lecture || "";
          const match = raw.match(/([\d.]+)\s*([^\d\s].*)$/);
          if (!match) return false;
          const value = Number(match[1]);
          const unit = match[2].trim().toLowerCase();
          if (unit !== resolutionUnit) return false;
          if (value > effectiveResolutionMax) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "precision") return (a.resolution || a.lecture || "9.99").localeCompare(b.resolution || b.lecture || "9.99");
        return a.ref.localeCompare(b.ref);
      });
  }, [
    certISO,
    effectiveResolutionMax,
    resolutionUnit,
    search,
    sectorProducts,
    showHighPrecision,
    showOnlyCertified,
    sortBy,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / perPage));
  const currentPage = Number.isFinite(pageParam) ? Math.min(Math.max(pageParam, 1), totalPages) : 1;
  const pagedProducts = filteredProducts.slice((currentPage - 1) * perPage, currentPage * perPage);

  const supportStats = [
    { label: "Refs", value: String(filteredProducts.length).padStart(2, "0") },
    { label: "ISO", value: certISO ? "ON" : "STBY" },
  ] as const;

  return (
    <div className="px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-7xl">
        <div className="paper-panel overflow-hidden">
          <div className="grid gap-6 border-b border-tech-border/70 px-5 py-6 md:px-8 md:py-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <span className="section-eyebrow">{t("catTechnicalLabel")}</span>
              <h1 className="section-title mt-4 text-5xl md:text-6xl">{sectorContent[sector].heading}</h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-tech-body md:text-base">{sectorContent[sector].intro}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-[1fr_auto] lg:grid-cols-1">
              <label className="relative block">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-tech-muted" />
                <input
                  value={searchDraft}
                  onChange={(event) => setSearchDraft(event.target.value)}
                  name="catalog-search"
                  autoComplete="off"
                  spellCheck={false}
                  placeholder={`${t("catSearchPlaceholder")}…`}
                  className="field-shell w-full pl-11 pr-4"
                />
              </label>
              <div className="flex flex-wrap gap-2 lg:justify-end">
                <span className="status-pill">{filteredProducts.length} {t("catRefCount")}</span>
                <span className="status-pill">FR / AR</span>
              </div>
            </div>
          </div>

          <div className="grid gap-0 lg:grid-cols-[320px_minmax(0,1fr)]">
            <aside className="border-b border-tech-border/70 bg-[rgba(255,253,249,0.66)] p-5 lg:border-b-0 lg:border-e lg:p-6">
              <div className="space-y-6 lg:sticky lg:top-28">
                <div>
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4 text-primary" />
                    <h2 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-tech-text">{t("catSector")}</h2>
                  </div>
                  <div className="mt-4 space-y-2">
                    {[
                      { key: "tous", label: t("catSectorAll") },
                      { key: "industriel", label: t("catSectorIndustrial") },
                      { key: "agricole", label: t("catSectorFarm") },
                    ].map((option) => (
                      <button
                        key={option.key}
                        type="button"
                        onClick={() => updateParams({ sector: option.key }, true)}
                        className={cn(
                          "flex min-h-11 w-full items-center justify-between rounded-[1rem] border px-4 py-3 text-left font-mono text-[11px] font-bold uppercase tracking-[0.16em]",
                          sector === option.key
                            ? "border-primary bg-primary text-white"
                            : "border-tech-border bg-white text-tech-text hover:border-primary/40",
                        )}
                      >
                        <span>{option.label}</span>
                        <span className="text-[10px]">0{option.key === "tous" ? 1 : option.key === "industriel" ? 2 : 3}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.2rem] border border-tech-border bg-white/80 p-4 shadow-tech-sm">
                  <h3 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-tech-text">{t("catFilters")}</h3>
                  <div className="mt-4 space-y-3">
                    <label className="flex min-h-11 items-center gap-3 rounded-[0.9rem] border border-tech-border bg-tech-bg/40 px-3 text-xs font-bold uppercase tracking-[0.12em] text-tech-text">
                      <input type="checkbox" checked={showOnlyCertified} onChange={(event) => updateParams({ certified: event.target.checked }, true)} />
                      {t("catCertifiedOnly")}
                    </label>
                    <label className="flex min-h-11 items-center gap-3 rounded-[0.9rem] border border-tech-border bg-tech-bg/40 px-3 text-xs font-bold uppercase tracking-[0.12em] text-tech-text">
                      <input type="checkbox" checked={showHighPrecision} onChange={(event) => updateParams({ precision: event.target.checked }, true)} />
                      {t("catHighPrecision")}
                    </label>
                    <label className="flex min-h-11 items-center gap-3 rounded-[0.9rem] border border-tech-border bg-tech-bg/40 px-3 text-xs font-bold uppercase tracking-[0.12em] text-tech-text">
                      <input type="checkbox" checked={certISO} onChange={(event) => updateParams({ iso: event.target.checked }, true)} />
                      {t("catQualityVerified")}
                    </label>
                  </div>

                  <div className="mt-5 border-t border-tech-border/70 pt-4">
                    <label className="surface-caption">{t("catResolutionUnit")}</label>
                    <select
                      value={resolutionUnit}
                      onChange={(event) => {
                        const unit = event.target.value;
                        const values = unitValues[unit] || [];
                        updateParams({ unit, max: values.length ? Math.max(...values) : null }, true);
                      }}
                      className="field-shell mt-2 w-full pr-10"
                    >
                      <option value="all">{t("catAllUnits")}</option>
                      {availableUnits.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>

                    {resolutionUnit !== "all" && selectedUnitValues.length > 0 ? (
                      <div className="mt-4 rounded-[0.9rem] border border-tech-border bg-tech-bg/40 px-3 py-3">
                        <input
                          type="range"
                          min={unitMin}
                          max={unitMax}
                          step={(unitMax - unitMin) / 100 || 0.001}
                          value={effectiveResolutionMax}
                          onChange={(event) => updateParams({ max: Number(event.target.value) }, true)}
                          className="w-full accent-primary"
                        />
                        <p className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                          max {effectiveResolutionMax.toFixed(3)} {resolutionUnit}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="blueprint-panel px-5 py-6">
                  <p className="dark-caption">{t("catSupportTitle")}</p>
                  <p className="mt-3 text-sm leading-7 text-white/72">{t("catSupportBody")}</p>
                  <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3">
                    {supportStats.map((item) => (
                      <div key={item.label} className="min-w-0 rounded-[1rem] border border-white/10 bg-white/5 px-2 py-3 text-center sm:px-3">
                        <p className="overflow-hidden text-ellipsis font-display text-[0.95rem] font-bold uppercase tracking-[-0.035em] text-white sm:text-base md:text-lg">{item.value}</p>
                        <p className="mt-1 font-mono text-[8px] font-bold uppercase tracking-[0.1em] text-white/52 sm:text-[9px] sm:tracking-[0.12em]">{item.label}</p>
                      </div>
                    ))}
                  </div>
                  <Link href="/contact" className="btn-machined mt-5 w-full justify-center px-4 text-[10px] leading-tight sm:text-[11px]">
                    {t("catExpertLink")}
                  </Link>
                </div>
              </div>
            </aside>

            <section className="p-5 md:p-6 lg:p-7">
              <div className="flex flex-col gap-4 border-b border-tech-border/70 pb-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="surface-caption">{t("catLabel")}</p>
                  <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-[-0.05em] text-tech-text md:text-4xl">
                    {sectorContent[sector].heading}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={onClearCart}
                    disabled={cartItems.length === 0}
                    className="cta-ghost px-4 disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    <Trash2 className="h-4 w-4" />
                    {t("clearAll")}
                  </button>
                  <select
                    value={sortBy}
                    onChange={(event) => updateParams({ sort: event.target.value }, true)}
                    className="field-shell min-w-[14rem] pr-10"
                  >
                    <option value="reference">{t("catSortRef")}</option>
                    <option value="name">{t("catSortName")}</option>
                    <option value="precision">{t("catSortPrecision")}</option>
                  </select>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${sector}-${sortBy}-${currentPage}-${filteredProducts.length}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
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
              </AnimatePresence>

              {filteredProducts.length === 0 ? (
                <div className="mt-6 flex min-h-72 flex-col items-center justify-center rounded-[1.25rem] border border-dashed border-tech-border bg-white/70 px-5 text-center text-tech-muted">
                  <AlertCircle className="mb-3 h-10 w-10 opacity-50" />
                  <p className="font-display text-xl font-bold uppercase tracking-[-0.04em] text-tech-text">{t("catEmpty")}</p>
                  <p className="mt-2 max-w-md text-sm leading-7">{t("catEmptySub")}</p>
                </div>
              ) : null}

              {filteredProducts.length > 0 ? (
                <div className="mt-8 flex flex-wrap items-center justify-center gap-2 border-t border-tech-border/70 pt-6">
                  <button
                    type="button"
                    onClick={() => updateParams({ page: Math.max(1, currentPage - 1) }, false)}
                    disabled={currentPage === 1}
                    className="cta-ghost px-4 disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    {t("catPrev")}
                  </button>
                  {Array.from({ length: totalPages }).map((_, index) => {
                    const page = index + 1;
                    return (
                      <button
                        key={page}
                        type="button"
                        onClick={() => updateParams({ page }, false)}
                        className={cn(
                          "flex h-11 w-11 items-center justify-center rounded-full border font-mono text-xs font-bold tabular-nums",
                          currentPage === page
                            ? "border-primary bg-primary text-white"
                            : "border-tech-border bg-white text-tech-text hover:border-primary/40",
                        )}
                      >
                        {page}
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => updateParams({ page: Math.min(totalPages, currentPage + 1) }, false)}
                    disabled={currentPage === totalPages}
                    className="cta-ghost px-4 disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    {t("catNext")}
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              ) : null}
            </section>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="blueprint-panel px-6 py-6 md:px-7 md:py-7">
            <p className="section-eyebrow text-white before:bg-white/40">{t("catWhyTitle")}</p>
            <div className="mt-5 space-y-4">
              {[t("catWhy1"), t("catWhy2"), t("catWhy3")].map((line) => (
                <div key={line} className="rounded-[1rem] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-white/72">
                  {line}
                </div>
              ))}
            </div>
          </div>

          <div className="paper-panel p-6 md:p-7">
            <span className="section-eyebrow">{t("catSelectionGuided")}</span>
            <h3 className="section-title mt-4 text-4xl md:text-5xl">{t("catTailorTitle")}</h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-tech-body md:text-base">{t("catTailorBody")}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-machined px-6">
                {t("catTailorCta")}
              </Link>
              <Link href="/services" className="cta-ghost px-6">
                {t("navServices")}
              </Link>
            </div>
          </div>
        </div>
      </div>
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


