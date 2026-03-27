"use client";

import Link from "next/link";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, ChevronDown, Minus, Send, ShoppingCart, Trash2 } from "lucide-react";
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
    entreprise: "",
    contact: "",
    email: "",
    secteur: "",
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
      `• ${t("contactMsgCompany")} : ${formData.entreprise}\n` +
      `• ${t("contactMsgContact")} : ${formData.contact}\n` +
      `• ${t("contactMsgEmail")} : ${formData.email}\n` +
      `• ${t("contactMsgSector")} : ${formData.secteur}\n` +
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
          className="brutal-surface-invert relative w-full max-w-lg overflow-hidden rounded-xl border-2 border-tech-muted bg-tech-text p-12 text-center text-white shadow-hard dark:text-tech-brand [&_h2]:text-white [&_h2]:dark:text-tech-brand"
        >
          <div className="mb-8 inline-flex h-20 w-20 items-center justify-center border-2 border-primary bg-tech-bg text-primary shadow-hard-sm">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h2 className="font-display mb-4 text-3xl font-bold uppercase tracking-tight text-white dark:text-tech-brand">
            {t("contactSuccessTitle")}
          </h2>
          <p className="text-tech-bg/80 dark:text-tech-brand/85">
            {t("contactSuccessBody")}
          </p>
          <button
            onClick={() => setSubmitted(false)}
            formNoValidate
            className="mt-8 rounded-xl border-2 border-white/20 bg-tech-surface/10 px-6 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-tech-surface/20 dark:border-tech-brand/30 dark:text-tech-brand"
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
          <div className="rounded-xl border-2 border-tech-border bg-tech-surface p-8 shadow-hard">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
              <h2 className="min-h-10 font-display text-2xl font-bold uppercase tracking-tight flex items-center gap-3">
                <ShoppingCart className="h-6 w-6 text-primary" />
                {t("contactCartTitle")}
              </h2>
              <button
                type="button"
                onClick={onClearCart}
                disabled={cartItems.length === 0}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border-2 border-tech-border bg-tech-surface px-3 font-styrene text-[11px] font-bold uppercase tracking-wider text-tech-text shadow-hard-sm transition-all hover:-translate-y-[2px] hover:shadow-hard disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-hard-sm"
              >
                <Trash2 className="h-3.5 w-3.5" />
                {t("clearAll")}
              </button>
            </div>
            
            {cartItems.length === 0 ? (
              <div className="py-16 text-center">
                <p className="mb-6 font-medium text-tech-muted italic">{t("contactCartEmpty")}</p>
                <Link href="/catalogue" className="inline-flex h-11 items-center justify-center rounded-xl border-2 border-tech-border bg-primary px-8 font-styrene text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-hard-sm hover:-translate-y-1 transition-all">
                  {t("contactExploreCat")}
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="group flex items-center gap-4 rounded-xl border-2 border-tech-border/10 bg-tech-bg/20 p-4 transition-all hover:bg-tech-bg/40">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 border-tech-border bg-tech-surface shadow-hard-sm">
                       <img
                         src={item.product.image}
                         alt={item.product.name}
                         className="product-image h-full w-full object-cover"
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
                      className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-tech-border bg-tech-surface text-primary shadow-hard-sm transition-all hover:bg-primary hover:text-primary-foreground"
                      title={t("contactRemoveCart")}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                
                <div className="mt-8 border-t border-tech-border pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold uppercase text-tech-muted">{t("contactTotalItems")}</span>
                    <span className="font-display text-xl font-black text-primary">
                      {cartItems.reduce((n, i) => n + i.quantity, 0)}
                    </span>
                  </div>
                  <button 
                    onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border-2 border-tech-border bg-tech-surface font-styrene text-xs font-bold uppercase tracking-wider text-tech-text shadow-hard transition-all hover:-translate-y-1 hover:shadow-hard-hover active:translate-y-0"
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
          <div className="rounded-xl border-2 border-tech-border bg-tech-surface p-4 shadow-hard sm:p-6 md:p-8">
            <div className="mb-8 sm:mb-10">
              <h1 className="mb-3 font-display text-3xl font-black uppercase tracking-tight text-tech-text sm:text-4xl">{t("contactPageTitle")}</h1>
              <p className="text-sm font-medium text-tech-text/70">{t("contactPageLead")}</p>
            </div>
            <form id="contact-form" className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col">
                   <label className="mb-1 font-mono text-[10px] font-bold uppercase text-tech-muted">{t("contactLabelCompany")}</label>
                   <input 
                     required 
                     name="entreprise"
                     type="text" 
                     value={formData.entreprise}
                     onChange={handleChange}
                     placeholder={t("contactPhCompany")} 
                     className="h-12 rounded-xl border-2 border-tech-border px-4 font-mono text-xs font-bold placeholder:text-tech-muted/40 focus:border-primary focus:outline-none focus:ring-0" 
                   />
                </div>
                <div className="flex flex-col">
                   <label className="mb-1 font-mono text-[10px] font-bold uppercase text-tech-muted">{t("contactLabelPerson")}</label>
                   <input 
                     required 
                     name="contact"
                     type="text" 
                     value={formData.contact}
                     onChange={handleChange}
                     placeholder={t("contactPhPerson")} 
                     className="h-12 rounded-xl border-2 border-tech-border px-4 font-mono text-xs font-bold placeholder:text-tech-muted/40 focus:border-primary focus:outline-none focus:ring-0" 
                   />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-mono text-[10px] font-bold uppercase text-tech-muted">{t("contactLabelEmail")}</label>
                <input 
                  required 
                  name="email"
                  type="email" 
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("contactPhEmail")} 
                  className="h-12 w-full rounded-xl border-2 border-tech-border px-4 font-mono text-xs font-bold placeholder:text-tech-muted/40 focus:border-primary focus:outline-none focus:ring-0" 
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-mono text-[10px] font-bold uppercase text-tech-muted">{t("contactLabelSector")}</label>
                <div className="relative">
                  <select 
                    required 
                    name="secteur"
                    value={formData.secteur}
                    onChange={handleChange}
                    className="h-12 w-full appearance-none rounded-xl border-2 border-tech-border px-4 font-mono text-xs font-bold focus:border-primary focus:outline-none focus:ring-0 bg-transparent"
                  >
                    <option value="">{t("contactSelectPlaceholder")}</option>
                    <option value="Agricole">{t("contactSectorAgri")}</option>
                    <option value="Industriel">{t("contactSectorInd")}</option>
                    <option value="Laboratoire">{t("contactSectorLab")}</option>
                    <option value="Autre">{t("contactSectorOther")}</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute end-4 top-1/2 h-4 w-4 -translate-y-1/2 text-tech-muted" />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-mono text-[10px] font-bold uppercase text-tech-muted">{t("contactLabelNotes")}</label>
                <textarea 
                  name="notes"
                  rows={4} 
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full resize-none rounded-xl border-2 border-tech-border p-4 font-mono text-xs font-bold placeholder:text-tech-muted/40 focus:border-primary focus:outline-none focus:ring-0" 
                  placeholder={t("contactPhNotes")} 
                />
              </div>
              <button 
                disabled={cartItems.length === 0} 
                type="submit" 
                className="group flex h-14 w-full items-center justify-center gap-3 bg-primary font-styrene text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-hard disabled:opacity-50 disabled:grayscale disabled:shadow-none hover:-translate-y-1 hover:shadow-hard-hover transition-all active:translate-y-0 active:shadow-hard"
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
