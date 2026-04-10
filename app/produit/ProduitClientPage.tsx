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
    <div className="mx-auto w-full max-w-7xl px-3 py-6 sm:px-4 sm:py-10 md:px-10">
      <button
        type="button"
        onClick={() => router.back()}
        className="cta-ghost mb-6 px-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour
      </button>

      <div className="mb-12 flex flex-col gap-10 lg:flex-row">
        <div className="flex-1">
          <div className="relative aspect-square overflow-hidden rounded-xl border border-tech-border bg-tech-surface shadow-tech">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-8"
              onError={onCatalogueImageError}
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <span className="font-mono text-sm uppercase text-tech-muted" dir="ltr">
            {product.ref}
          </span>
          <h1 className="mb-4 font-display text-3xl font-bold uppercase text-tech-text lg:text-4xl" lang="fr">
            {product.name}
          </h1>
          <p className="mb-8 font-sans text-tech-body/85">{description}</p>
          <div className="mt-auto flex flex-col gap-4 border-t border-tech-border pt-6 sm:flex-row">
            <div className="flex h-12 w-full items-center overflow-hidden rounded-xl border border-tech-border bg-tech-surface shadow-tech-sm sm:w-32">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-full w-10 items-center justify-center hover:bg-tech-bg"
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                readOnly
                value={displayedQuantity}
                className="h-full w-full border-none bg-transparent p-0 text-center font-mono font-bold focus:ring-0"
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-full w-10 items-center justify-center hover:bg-tech-bg"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => onSetLineQuantity(product, isInCart ? 0 : quantity)}
              className={cn(
                "flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-tech-border font-display font-bold uppercase shadow-tech-sm transition-[transform,box-shadow,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:shadow-tech",
                isInCart ? "bg-tech-text text-tech-bg border-tech-text" : "bg-primary text-primary-foreground",
              )}
            >
              {isInCart ? <Check className="h-5 w-5" /> : <ShoppingBag className="h-5 w-5" />}
              {isInCart ? t("prodRemoveQuote") : t("prodAddToQuote")}
            </button>
          </div>
        </div>
      </div>
      <h2 className="mb-6 inline-block border-b border-primary pb-2 font-display text-2xl font-medium uppercase">
        {t("prodSpecsTitle")}
      </h2>
      <div className="overflow-x-auto rounded-xl border border-tech-border bg-tech-surface shadow-tech [-webkit-overflow-scrolling:touch]" dir="ltr">
        <table className="w-full min-w-[320px] border-collapse text-start">
          <tbody className="divide-y divide-tech-border/10">
            {Object.entries(product.specifications || {}).map(([k, v]) => (
              <tr key={k} className="font-mono">
                <td className="border-e border-tech-border/10 bg-tech-bg/30 px-4 py-3 text-xs font-bold uppercase text-primary">
                  {k}
                </td>
                <td className="px-4 py-3 text-sm text-tech-muted font-normal">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
