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
  Cpu,
  Fingerprint,
  Activity,
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
    if (resetPage) next.delete("page");
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
        if (showOnlyCertified && !((product.tags || []).some((tag) => tag.includes("COFRAC") || tag.includes("IP")))) return false;
        if (showHighPrecision && !((product.resolution || product.lecture || "").includes("0.001") || (product.maxError || "").includes("2"))) return false;
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
  }, [certISO, effectiveResolutionMax, resolutionUnit, search, sectorProducts, showHighPrecision, showOnlyCertified, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / perPage));
  const currentPage = Number.isFinite(pageParam) ? Math.min(Math.max(pageParam, 1), totalPages) : 1;
  const pagedProducts = filteredProducts.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="bg-app-bg text-app-text min-h-screen px-4 py-12 md:px-12 transition-colors duration-700">
      <div className="mx-auto max-w-[1600px]">
        {/* Cinematic Header Section */}
        <div className="mb-20 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <header className="space-y-6 max-w-4xl">
              <div className="inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-primary">{t("catTechnicalLabel")}</span>
              </div>
              <h1 className="font-display text-5xl md:text-6xl font-light uppercase tracking-tighter leading-[0.8]">
                {sectorContent[sector].heading.split(' ')[0]} <br />
                <span className="text-app-text/20 italic">{sectorContent[sector].heading.split(' ').slice(1).join(' ')}</span>
              </h1>
              <p className="text-xl md:text-2xl font-light leading-relaxed text-app-text/40 max-w-2xl border-l border-app-border-strong pl-8">
                {sectorContent[sector].intro}
              </p>
            </header>

            <div className="w-full lg:w-[450px] space-y-6">
              <div className="group relative">
                <Search className="absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-app-text/20 group-focus-within:text-primary transition-colors" />
                <input
                  value={searchDraft}
                  onChange={(e) => setSearchDraft(e.target.value)}
                  placeholder={`${t("catSearchPlaceholder")}...`}
                  className="h-20 w-full rounded-[2rem] border border-app-border-strong bg-app-surface/50 pl-16 pr-8 font-display text-xl transition-all focus:border-primary/50 focus:ring-8 focus:ring-primary/5 focus:outline-none"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1 rounded-2xl border border-app-border-strong bg-app-surface/30 p-4 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-app-text/30">Registry</span>
                  <span className="font-display text-2xl font-bold">{filteredProducts.length.toString().padStart(2, '0')}</span>
                </div>
                <div className="flex-1 rounded-2xl border border-app-border-strong bg-app-surface/30 p-4 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-app-text/30">System</span>
                  <span className="font-mono text-[10px] font-bold text-primary">v2.4.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[380px_1fr]">

          {/* Sidebar Filters */}
          <aside className="space-y-8 lg:sticky lg:top-32 h-fit">
            <div className="rounded-[2.5rem] border border-app-border-strong bg-app-surface/40 backdrop-blur-xl p-10 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Cpu className="w-32 h-32" />
              </div>

              <div className="relative z-10 space-y-12">
                <div className="space-y-6">
                  <h3 className="font-display text-xs font-bold uppercase tracking-[0.4em] text-app-text/30 flex items-center gap-3">
                    <SlidersHorizontal className="w-3 h-3 text-primary" /> Sector_Analysis
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { key: "tous", label: t("catSectorAll"), id: "01" },
                      { key: "industriel", label: t("catSectorIndustrial"), id: "02" },
                      { key: "agricole", label: t("catSectorFarm"), id: "03" },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => updateParams({ sector: opt.key }, true)}
                        className={cn(
                          "group relative flex h-16 items-center justify-between rounded-2xl border px-6 transition-all duration-500 overflow-hidden",
                          sector === opt.key
                            ? "border-primary bg-primary text-white shadow-lg shadow-primary/20"
                            : "border-app-border bg-app-bg/50 text-app-text/60 hover:border-primary/40"
                        )}
                      >
                        <span className="relative z-10 font-display text-sm font-bold uppercase tracking-widest">{opt.label}</span>
                        <span className="relative z-10 font-mono text-[10px] opacity-40 group-hover:translate-x-1 transition-transform">{opt.id}</span>
                        {sector === opt.key && (
                          <motion.div layoutId="activeSector" className="absolute inset-0 bg-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6 border-t border-app-border-strong pt-10">
                  <h3 className="font-display text-xs font-bold uppercase tracking-[0.4em] text-app-text/30 flex items-center gap-3">
                    <Fingerprint className="w-3 h-3 text-primary" /> Core_Parameters
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: t("catCertifiedOnly"), state: showOnlyCertified, name: "certified" },
                      { label: t("catHighPrecision"), state: showHighPrecision, name: "precision" },
                      { label: t("catQualityVerified"), state: certISO, name: "iso" },
                    ].map((f) => (
                      <label key={f.name} className="flex h-14 cursor-pointer items-center justify-between rounded-2xl border border-app-border bg-app-bg/30 px-6 transition-all hover:bg-app-bg/50">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-app-text/50">{f.label}</span>
                        <input
                          type="checkbox"
                          checked={f.state}
                          onChange={(e) => updateParams({ [f.name]: e.target.checked }, true)}
                          className="h-5 w-5 rounded-md accent-primary border-app-border transition-all"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-6 border-t border-app-border-strong pt-10">
                  <div className="space-y-4">
                    <label className="font-mono text-[9px] uppercase tracking-[0.3em] text-app-text/20 block">{t("catResolutionUnit")}</label>
                    <select
                      value={resolutionUnit}
                      onChange={(e) => {
                        const unit = e.target.value;
                        const values = unitValues[unit] || [];
                        updateParams({ unit, max: values.length ? Math.max(...values) : null }, true);
                      }}
                      className="h-14 w-full rounded-2xl border border-app-border bg-app-bg px-6 font-display text-sm focus:outline-none focus:border-primary"
                    >
                      <option value="all">{t("catAllUnits")}</option>
                      {availableUnits.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Support Card */}
            <div className="rounded-[2rem] bg-app-text text-app-bg p-8 space-y-6 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] group-hover:bg-primary/40 transition-colors" />
              <div className="relative z-10 space-y-4">
                <p className="font-display text-xl leading-none font-light uppercase tracking-tighter">{t("catSupportTitle")}</p>
                <p className="text-[11px] font-light leading-relaxed opacity-50 uppercase tracking-widest">{t("catSupportBody")}</p>
                <Link href="/contact" className="flex h-12 w-full items-center justify-center rounded-xl bg-app-bg text-app-text font-mono text-[10px] font-bold uppercase tracking-[0.3em] transition-all hover:bg-primary hover:text-white">
                  Request Quote
                </Link>
              </div>
            </div>
          </aside>

          {/* Catalog Section */}
          <section className="space-y-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-app-border-strong pb-10">
              <div className="space-y-1 text-center md:text-left">
                <h2 className="font-display text-4xl font-light uppercase tracking-tighter text-app-text">Registry_Data</h2>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <Activity className="w-3 h-3 text-primary animate-pulse" />
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.4em] text-app-text/20 italic">Live Filter Active</span>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <button
                  onClick={onClearCart}
                  disabled={cartItems.length === 0}
                  className="h-14 w-14 flex items-center justify-center rounded-2xl border border-app-border hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-500 transition-all disabled:opacity-0"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <select
                  value={sortBy}
                  onChange={(e) => updateParams({ sort: e.target.value }, true)}
                  className="h-14 flex-1 md:w-64 rounded-2xl border border-app-border bg-app-surface px-6 font-display text-sm focus:outline-none focus:border-primary"
                >
                  <option value="reference">{t("catSortRef")}</option>
                  <option value="name">{t("catSortName")}</option>
                  <option value="precision">{t("catSortPrecision")}</option>
                </select>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${sector}-${sortBy}-${currentPage}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="grid gap-10 sm:grid-cols-2 xl:grid-cols-3"
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

            {filteredProducts.length === 0 && (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-app-border bg-app-surface/20 text-center p-12">
                <AlertCircle className="w-16 h-16 text-primary opacity-20 mb-8" />
                <h3 className="font-display text-3xl font-light uppercase tracking-tighter mb-4">{t("catEmpty")}</h3>
                <p className="text-app-text/40 max-w-sm mx-auto font-light leading-relaxed">{t("catEmptySub")}</p>
              </div>
            )}

            {/* Premium Pagination */}
            {filteredProducts.length > 0 && (
              <div className="flex flex-col items-center gap-8 pt-20">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateParams({ page: Math.max(1, currentPage - 1) }, false)}
                    disabled={currentPage === 1}
                    className="h-16 px-8 rounded-2xl border border-app-border font-display text-[10px] font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-all disabled:opacity-20"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }).map((_, i) => {
                      const p = i + 1;
                      const isCurrent = currentPage === p;
                      return (
                        <button
                          key={p}
                          onClick={() => updateParams({ page: p }, false)}
                          className={cn(
                            "h-16 w-16 rounded-2xl border font-mono text-xs font-bold transition-all duration-500",
                            isCurrent ? "bg-primary border-primary text-white scale-110 shadow-xl" : "border-app-border hover:border-primary/40 text-app-text/40"
                          )}
                        >
                          {p.toString().padStart(2, '0')}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => updateParams({ page: Math.min(totalPages, currentPage + 1) }, false)}
                    disabled={currentPage === totalPages}
                    className="h-16 px-8 rounded-2xl border border-app-border font-display text-[10px] font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-all disabled:opacity-20"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Bottom Detailed Panels - Architectural Redesign */}
        <div className="mt-40 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">

          {/* Left Panel: Value Propositions with Kinetic Cards */}
          <div className="rounded-[3rem] border border-app-border-strong bg-app-surface/50 p-12 md:p-20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(white,transparent_85%)]" />
            <div className="relative z-10 space-y-10">
              <h4 className="font-display text-xs font-bold uppercase tracking-[0.6em] text-primary">{t("catWhyTitle")}</h4>
              <div className="space-y-4">
                {[t("catWhy1"), t("catWhy2"), t("catWhy3")].map((txt, idx) => (
                  <div key={idx} className="flex gap-6 p-8 rounded-3xl border border-app-border bg-app-bg/50 backdrop-blur-sm transition-all hover:scale-[1.02] hover:bg-app-bg">
                    <span className="font-mono text-xs font-bold text-primary/40">0{idx + 1}</span>
                    <p className="text-lg font-light leading-relaxed text-app-text/60">{txt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: CTA with Cinematic Impact */}
          <div className="relative rounded-[3.5rem] bg-app-text dark:bg-zinc-900 p-10 md:p-16 flex flex-col justify-between overflow-hidden shadow-2xl">
            {/* Decorative Elements */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />

            <div className="relative z-10 space-y-10">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-md border border-white/10 bg-white/5 backdrop-blur-sm">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-primary">
            // Engineering_Excellence
                  </span>
                </div>
                <h3 className="font-display text-5xl md:text-6xl font-light uppercase tracking-tighter leading-[0.9] text-white">
                  {t("catTailorTitle")}
                </h3>
              </div>

              <p className="text-lg font-light leading-relaxed text-white/50 max-w-md">
                {t("catTailorBody")}
              </p>
            </div>

            <div className="relative z-10 mt-20">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="group relative h-16 flex-1 flex items-center justify-center overflow-hidden rounded-2xl bg-primary text-white transition-all hover:shadow-[0_20px_40px_-10px_rgba(var(--primary),0.5)]"
                >
                  <span className="relative z-10 font-display text-[10px] font-black uppercase tracking-[0.2em]">
                    {t("catTailorCta")}
                  </span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <span className="absolute z-20 font-display text-[10px] font-black uppercase tracking-[0.2em] text-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    {t("catTailorCta")}
                  </span>
                </Link>

                <Link
                  href="/services"
                  className="h-16 flex-1 flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80 font-display text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white"
                >
                  {t("navServices")}
                </Link>
              </div>

              {/* Visual Tech ID */}
              <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-8">
                <span className="font-mono text-[8px] uppercase tracking-widest text-white/20">Ref: DG-CAT-2026</span>
                <div className="flex gap-1">
                  {[1, 2, 3].map(i => <div key={i} className="h-1 w-4 bg-primary/30 rounded-full" />)}
                </div>
              </div>
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