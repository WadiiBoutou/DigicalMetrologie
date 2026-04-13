"use client";

import Link from "next/link";
import { useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle2, Minus, Send, ShoppingCart, Trash2, ShieldCheck, Box, Layers, Zap } from "lucide-react";
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
  const [formData, setFormData] = useState({ contact: "", email: "", notes: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cartList = cartItems
      .map((item) => `- ${item.product.name} (${t("contactCartLineRef")}: ${item.product.ref}) × ${item.quantity}`)
      .join("\n");

    const message = `*${t("contactMsgHeading")}*\n\n` +
      `*${t("contactMsgClient")}*\n` +
      `• ${t("contactMsgContact")} : ${formData.contact}\n` +
      `• ${t("contactMsgEmail")} : ${formData.email}\n` +
      `• ${t("contactMsgNotes")} : ${formData.notes || t("contactNa")}\n\n` +
      `*${t("contactMsgItems")}*\n${cartList}\n\n` +
      t("contactMsgClosing");

    window.open(`https://wa.me/212661406490?text=${encodeURIComponent(message)}`, "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-1 items-center justify-center p-6 min-h-[90vh] bg-app-bg">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-3xl overflow-hidden rounded-[3rem] border border-app-border-strong bg-app-surface p-12 md:p-24 text-center shadow-2xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--primary)_0%,_transparent_70%)] opacity-[0.03]" />
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative z-10"
          >
            <div className="mb-12 inline-flex h-28 w-28 items-center justify-center rounded-full bg-primary text-white shadow-[0_20px_50px_rgba(var(--primary),0.3)]">
              <CheckCircle2 className="h-14 w-14" />
            </div>
            <h2 className="font-display mb-8 text-5xl md:text-7xl font-light uppercase tracking-tighter text-app-text leading-none">
              {t("contactSuccessTitle")}
            </h2>
            <p className="text-app-text/40 font-light text-xl leading-relaxed max-w-lg mx-auto mb-16">
              {t("contactSuccessBody")}
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="group relative h-16 px-16 rounded-full bg-app-text text-app-bg text-[10px] font-bold uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95"
            >
              {t("contactBackForm")}
            </button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1600px] px-6 py-12 lg:px-20 lg:py-24 bg-app-bg text-app-text min-h-screen">
      <div className="grid grid-cols-1 gap-20 lg:grid-cols-12 lg:items-start">

        {/* Left: Branding & Form (8 Columns) */}
        <div className="lg:col-span-7 space-y-24">
          <header className="space-y-8">
            <div className="flex items-center gap-4">
              <span className="h-[1px] w-12 bg-primary" />
              <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-primary font-bold">Inquiry System v3.0</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-light uppercase tracking-tighter leading-[0.8] text-app-text">
              {t("contactCollaborate")}
            </h1>
            <p className="text-2xl font-light leading-relaxed text-app-text/30 max-w-xl transition-colors">
              {t("contactPageLead")}
            </p>
          </header>

          <form id="contact-form" className="space-y-16" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {[
                { label: t("contactLabelPerson"), name: "contact", type: "text", ph: t("contactPhPerson") },
                { label: t("contactLabelEmail"), name: "email", type: "email", ph: t("contactPhEmail") }
              ].map((field) => (
                <div key={field.name} className="group relative">
                  <label className="absolute -top-8 left-0 font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-app-text/20 group-focus-within:text-primary transition-colors italic">
                    {field.label}
                  </label>
                  <input
                    required name={field.name} type={field.type} value={(formData as any)[field.name]} onChange={handleChange} placeholder={field.ph}
                    className="h-16 w-full bg-transparent border-b-2 border-app-border-strong font-display text-2xl text-app-text placeholder:text-app-text/10 focus:border-primary focus:outline-none transition-all duration-500"
                  />
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-700 group-focus-within:w-full" />
                </div>
              ))}
            </div>

            <div className="group relative">
              <label className="absolute -top-8 left-0 font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-app-text/20 group-focus-within:text-primary transition-colors italic">
                {t("contactLabelNotes")}
              </label>
              <textarea
                name="notes" rows={4} value={formData.notes} onChange={handleChange} placeholder={t("contactPhNotes")}
                className="w-full resize-none border-b-2 border-app-border-strong bg-transparent py-6 font-display text-2xl text-app-text placeholder:text-app-text/10 focus:border-primary focus:outline-none transition-all duration-500"
              />
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-700 group-focus-within:w-full" />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8 pt-8">
              <button
                disabled={cartItems.length === 0} type="submit"
                className="group relative h-20 px-12 w-full sm:w-auto overflow-hidden bg-primary text-white transition-all duration-500 hover:scale-[1.05] disabled:bg-app-surface disabled:text-app-text/20 disabled:hover:scale-100 rounded-full"
              >
                <span className="relative z-10 flex items-center justify-center gap-4 font-display text-xs font-bold uppercase tracking-[0.4em]">
                  {t("contactSubmit")}
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" />
                </span>
              </button>
              <div className="flex items-center gap-4 font-mono text-[9px] uppercase tracking-widest text-app-text/20">
                <Zap className="w-3 h-3 text-primary animate-pulse" /> Direct Connection to WhatsApp
              </div>
            </div>
          </form>
        </div>

        {/* Right: Architectural Cart Summary (4 Columns) */}
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-app-border-strong bg-app-surface p-8 md:p-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] transition-all">
            <div className="absolute top-12 right-12 opacity-[0.03]">
              <ShoppingCart className="w-32 h-32" />
            </div>

            <div className="relative z-10 space-y-12">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="font-display text-3xl font-light uppercase tracking-tighter text-app-text">{t("contactCartTitle")}</h2>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-app-text/30">Order Manifest Ref. #{(new Date().getTime().toString().slice(-6))}</p>
                </div>
                <button onClick={onClearCart} disabled={cartItems.length === 0} className="h-10 w-10 flex items-center justify-center rounded-full border border-app-border text-app-text/20 hover:border-red-500 hover:text-red-500 transition-all disabled:opacity-0">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-6 max-h-[450px] overflow-y-auto pr-4 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                  {cartItems.length === 0 ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center space-y-6">
                      <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-app-bg border border-app-border-strong text-app-text/10">
                        <Layers className="w-6 h-6" />
                      </div>
                      <p className="font-display text-sm uppercase tracking-widest text-app-text/20">{t("contactCartEmpty")}</p>
                      <Link href="/catalogue" className="btn-machined !h-12 px-8 text-[9px]">
                        {t("contactExploreCat")}
                      </Link>
                    </motion.div>
                  ) : (
                    cartItems.map((item) => (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="group flex items-center gap-6 p-2 rounded-2xl transition-all hover:bg-app-bg"
                      >
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-white p-2 rounded-xl border border-app-border group-hover:border-primary/20 transition-colors shadow-sm">
                          <Image src={item.product.image} alt={item.product.name} fill sizes="80px" className="object-contain" onError={onCatalogueImageError} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="truncate text-sm font-bold uppercase tracking-tight text-app-text">{item.product.name}</h4>
                          <span className="font-mono text-[10px] uppercase text-app-text/30 tracking-widest block mt-1">
                            {item.product.ref} // QTY: {item.quantity}
                          </span>
                        </div>
                        <button onClick={() => onAddToCart(item.product)} className="h-8 w-8 flex items-center justify-center rounded-lg border border-app-border text-app-text/20 hover:border-primary hover:text-primary transition-all">
                          <Minus className="h-4 w-4" />
                        </button>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              <div className="pt-10 border-t border-app-border-strong">
                <div className="flex items-center justify-between mb-8">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-app-text/20 italic">// Total Items</span>
                    <p className="font-display text-5xl text-app-text font-light tracking-tighter">
                      {cartItems.reduce((n, i) => n + i.quantity, 0).toString().padStart(2, '0')}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="mb-2 inline-block rounded-full bg-primary/10 px-4 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-primary shadow-sm border border-primary/20">
                      System Ready
                    </div>
                    <p className="font-mono text-[8px] text-app-text/20 uppercase tracking-widest">Awaiting Confirmation</p>
                  </div>
                </div>
              </div>
            </div>
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