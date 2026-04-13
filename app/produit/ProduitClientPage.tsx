"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { onCatalogueImageError } from "@/lib/catalogue-image";
import { getProductDescription, PRODUCTS } from "@/lib/products";
import type { CartItem, Product } from "@/lib/types";
import { AppShell } from "@/components/digical/AppShell";
import { cn } from "@/components/digical/shared";
import { useDigicalI18n } from "@/components/digical/language";
import { useDigicalCart } from "@/components/digical/useDigicalCart";

function ProductDetailContent({
  productId,
  onSetLineQuantity,
  cartItems,
}: {
  productId?: string;
  onSetLineQuantity: (p: Product, qty: number) => void;
  cartItems: CartItem[];
}) {
  const router = useRouter();
  const { t, lang } = useDigicalI18n();
  const product = PRODUCTS.find((p) => p.id === productId) ?? PRODUCTS[0];
  const cartLine = cartItems.find((item) => item.product.id === product.id);
  const isInCart = Boolean(cartLine);
  const [quantity, setQuantity] = useState(cartLine?.quantity ?? 1);
  const description = getProductDescription(product, lang);

  useEffect(() => {
    setQuantity(cartLine?.quantity ?? 1);
  }, [cartLine?.quantity, product.id]);

  const displayedQuantity = isInCart ? (cartLine?.quantity ?? quantity) : quantity;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-12 md:py-16 bg-app-bg text-app-text min-h-screen">
      <button
        type="button"
        onClick={() => router.back()}
        className="cta-ghost mb-10 px-6 border-app-border text-app-text/60 hover:text-app-text"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("navCatalog")}
      </button>

      <div className="mb-20 flex flex-col gap-12 lg:flex-row lg:items-start">
        <div className="flex-1 lg:sticky lg:top-32">
          <div className="paper-panel relative aspect-square overflow-hidden border-app-border-strong bg-white/5 !p-0">
             <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-50" />
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-12 mix-blend-multiply dark:mix-blend-normal"
              onError={onCatalogueImageError}
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-primary" dir="ltr">
            {product.ref}
          </span>
          <h1 className="mt-4 mb-8 font-display text-4xl font-light uppercase tracking-tight text-app-text lg:text-6xl" lang="fr">
            {product.name}
          </h1>
          <div className="h-px w-20 bg-primary/30 mb-8" />
          <p className="mb-12 text-lg leading-relaxed text-app-text/60 font-light">{description}</p>
          
          <div className="mt-auto space-y-6 pt-10 border-t border-app-border">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex h-14 w-full items-center overflow-hidden rounded-xl border border-app-border bg-app-surface sm:w-40">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-full w-12 items-center justify-center hover:bg-app-bg/50 text-app-text/60"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  readOnly
                  value={displayedQuantity}
                  className="h-full w-full border-none bg-transparent p-0 text-center font-mono text-lg font-bold focus:ring-0 text-app-text"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-full w-12 items-center justify-center hover:bg-app-bg/50 text-app-text/60"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => onSetLineQuantity(product, isInCart ? 0 : quantity)}
                className={cn(
                  "flex h-14 flex-1 items-center justify-center gap-3 rounded-xl font-display font-extrabold uppercase tracking-widest transition-all duration-300",
                  isInCart 
                    ? "bg-app-text text-app-bg" 
                    : "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:scale-[1.02]",
                )}
              >
                {isInCart ? <Check className="h-5 w-5" /> : <ShoppingBag className="h-5 w-5" />}
                {isInCart ? t("prodRemoveQuote") : t("prodAddToQuote")}
              </button>
            </div>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-app-text/40 text-center sm:text-left">
              * {t("catCertifiedOnly")} & high precision components
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-10">
        <div className="flex items-center gap-6">
          <h2 className="font-display text-2xl font-light uppercase tracking-wider text-app-text md:text-3xl">
            {t("prodSpecsTitle")}
          </h2>
          <div className="h-px flex-1 bg-app-border" />
        </div>
        
        <div className="paper-panel !p-0 overflow-hidden border-app-border-strong" dir="ltr">
          <table className="w-full min-w-[320px] border-collapse text-start">
            <tbody className="divide-y divide-app-border">
              {Object.entries(product.specifications || {}).map(([k, v]) => (
                <tr key={k} className="transition-colors hover:bg-primary/[0.02]">
                  <td className="w-1/3 lg:w-1/4 bg-app-surface/50 px-6 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                    {k}
                  </td>
                  <td className="px-8 py-6 text-base text-app-text/70 font-light">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function ProduitClientPage({ productId }: { productId?: string }) {
  const { cartItems, cartCount, setCartLineQuantity } = useDigicalCart();

  return (
    <AppShell route="product" cartCount={cartCount}>
      <ProductDetailContent productId={productId} onSetLineQuantity={setCartLineQuantity} cartItems={cartItems} />
    </AppShell>
  );
}
