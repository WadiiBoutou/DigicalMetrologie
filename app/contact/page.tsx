"use client";

import Link from "next/link";
import { useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Minus, Send, ShoppingCart, Trash2 } from "lucide-react";
import { onCatalogueImageError } from "@/lib/catalogue-image";
import type { CartItem, Product } from "@/lib/types";
import { AppShell } from "@/components/digical/AppShell";
import { useDigicalI18n } from "@/components/digical/language";
import { useDigicalCart } from "@/components/digical/useDigicalCart";

function ContactContent({
  cartItems,
  onAddToCart,
  onClearCart,
}: {
  cartItems: CartItem[];
  onAddToCart: (p: Product) => void;
  onClearCart: () => void;
}) {
  const { t } = useDigicalI18n();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    contact: "",
    email: "",
    notes: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Construct WhatsApp Message
    const cartList = cartItems
      .map(
        (item) =>
          `- ${item.product.name} (${t("contactCartLineRef")}: ${item.product.ref}) × ${item.quantity}`,
      )
      .join("\n");
    
    const na = t("contactNa");
    const message =
      `*${t("contactMsgHeading")}*\n\n` +
      `*${t("contactMsgClient")}*\n` +
      `• ${t("contactMsgContact")} : ${formData.contact}\n` +
      `• ${t("contactMsgEmail")} : ${formData.email}\n` +
      `• ${t("contactMsgNotes")} : ${formData.notes || na}\n\n` +
      `*${t("contactMsgItems")}*\n${cartList}\n\n` +
      t("contactMsgClosing");

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/212661406490?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank");
    
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-1 items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-full max-w-lg overflow-hidden rounded-xl border border-tech-border bg-tech-text p-12 text-center text-white shadow-tech"
        >
          <div className="mb-8 inline-flex h-20 w-20 items-center justify-center border border-primary/20 bg-white/5 text-primary shadow-tech-sm rounded-2xl">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h2 className="font-display mb-4 text-3xl font-medium uppercase tracking-tight text-white">
            {t("contactSuccessTitle")}
          </h2>
          <p className="text-white/60 font-normal">
            {t("contactSuccessBody")}
          </p>
          <button
            onClick={() => setSubmitted(false)}
            formNoValidate
            className="mt-8 rounded-xl border border-white/20 bg-white/5 px-6 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
          >
            {t("contactBackForm")}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-3 py-6 sm:px-4 sm:py-10 md:px-10">
      <div className="flex flex-col gap-10 lg:flex-row">
        {/* Left: Cart Summary */}
        <div className="flex-1 order-2 lg:order-1">
          <div className="bento-card p-8 bg-tech-surface">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
              <h2 className="min-h-10 font-display text-2xl font-medium uppercase tracking-tight flex items-center gap-3">
                <ShoppingCart className="h-6 w-6 text-primary" />
                {t("contactCartTitle")}
              </h2>
              <button
                type="button"
                onClick={onClearCart}
                disabled={cartItems.length === 0}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-tech-border bg-tech-surface px-3 font-display text-[11px] font-bold uppercase tracking-wider text-tech-text shadow-tech-sm transition-all hover:bg-tech-bg disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Trash2 className="h-3.5 w-3.5" />
                {t("clearAll")}
              </button>
            </div>
            
            {cartItems.length === 0 ? (
              <div className="py-16 text-center">
                <p className="mb-6 font-medium text-tech-muted italic">{t("contactCartEmpty")}</p>
                <Link href="/catalogue" className="btn-machined h-11 px-8">
                  {t("contactExploreCat")}
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="group flex items-center gap-4 rounded-xl border border-tech-border/50 bg-tech-bg/10 p-4 transition-all hover:bg-tech-bg/30">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-tech-border bg-tech-surface shadow-tech-sm">
                       <Image
                         src={item.product.image}
                         alt={item.product.name}
                         fill
                         sizes="64px"
                         className="object-cover"
                         onError={onCatalogueImageError}
                       />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="truncate text-sm font-bold uppercase leading-tight text-tech-text">{item.product.name}</h4>
                      <span className="font-mono text-[10px] uppercase text-tech-muted font-bold tracking-wider">
                        {item.product.ref} · {t("contactQtyShort")} {item.quantity}
                      </span>
                    </div>
                    <button 
                      onClick={() => onAddToCart(item.product)} 
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-tech-border bg-tech-surface text-primary shadow-tech-sm transition-all hover:bg-primary/20"
                      title={t("contactRemoveCart")}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                
                <div className="mt-8 border-t border-tech-border pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold uppercase text-tech-muted">{t("contactTotalItems")}</span>
                    <span className="font-display text-xl font-bold text-primary">
                      {cartItems.reduce((n, i) => n + i.quantity, 0)}
                    </span>
                  </div>
                  <button 
                    onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-tech-border bg-tech-surface font-display text-xs font-bold uppercase tracking-wider text-tech-text shadow-tech transition-all hover:bg-tech-bg"
                  >
                    {t("contactFinalize")}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="w-full lg:w-[500px] order-1 lg:order-2">
          <div className="bento-card p-4 bg-tech-surface sm:p-6 md:p-8">
            <div className="mb-8 sm:mb-10">
              <h1 className="mb-3 font-display text-3xl font-medium uppercase tracking-tight text-tech-text sm:text-4xl">{t("contactPageTitle")}</h1>
              <p className="text-sm font-normal text-tech-muted">{t("contactPageLead")}</p>
            </div>
            <form id="contact-form" className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col">
                   <label className="mb-1 font-mono text-[10px] font-bold uppercase text-tech-muted">{t("contactLabelPerson")}</label>
                   <input 
                     required 
                     name="contact"
                     type="text" 
                     autoComplete="name"
                     value={formData.contact}
                     onChange={handleChange}
                     placeholder={t("contactPhPerson")} 
                     className="field-shell h-12 rounded-xl px-4 font-mono text-xs font-bold placeholder:text-tech-muted/40" 
                   />
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 font-mono text-[10px] font-bold uppercase text-tech-muted">{t("contactLabelEmail")}</label>
                  <input 
                     required 
                     name="email"
                     type="email" 
                     autoComplete="email"
                     spellCheck={false}
                     value={formData.email}
                     onChange={handleChange}
                     placeholder={t("contactPhEmail")} 
                     className="field-shell h-12 w-full rounded-xl px-4 font-mono text-xs font-bold placeholder:text-tech-muted/40" 
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-mono text-[10px] font-bold uppercase text-tech-muted">{t("contactLabelNotes")}</label>
                <textarea 
                  name="notes"
                  rows={4} 
                  autoComplete="off"
                  value={formData.notes}
                  onChange={handleChange}
                  className="field-shell w-full resize-none rounded-xl p-4 font-mono text-xs font-bold placeholder:text-tech-muted/40" 
                  placeholder={t("contactPhNotes")} 
                />
              </div>
              <button 
                disabled={cartItems.length === 0} 
                type="submit" 
                className="group btn-machined h-14 w-full text-white bg-tech-text"
              >
                {t("contactSubmit")}
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const { cartItems, cartCount, toggleCartItem, clearCart } = useDigicalCart();
  return (
    <AppShell route="contact" cartCount={cartCount}>
      <ContactContent onAddToCart={toggleCartItem} onClearCart={clearCart} cartItems={cartItems} />
    </AppShell>
  );
}
