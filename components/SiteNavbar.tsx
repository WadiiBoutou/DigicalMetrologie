"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/produit?id=1", label: "Produit" },
  { href: "/contact", label: "Contact" },
];

export function SiteNavbar({ currentPath = "" }: { currentPath?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--color-ink)]/20 bg-[var(--color-bg)]/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-3 py-3 sm:px-4 md:px-8">
        <Link
          href="/"
          className="min-w-0 truncate text-base font-extrabold uppercase tracking-wide sm:text-lg"
          onClick={() => setOpen(false)}
        >
          Digical Metrologie
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-bold uppercase tracking-wide transition hover:text-[var(--color-primary)]",
                currentPath && link.href.startsWith(currentPath)
                  ? "text-[var(--color-primary)]"
                  : "",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/contact"
            className="btn-primary px-3 py-2 text-[11px] font-bold uppercase tracking-wide sm:text-xs md:px-4 md:text-sm"
            onClick={() => setOpen(false)}
          >
            <span className="md:hidden">Devis</span>
            <span className="hidden md:inline">Demander un devis</span>
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded border border-[var(--color-ink)]/25 md:hidden"
            aria-expanded={open}
            aria-controls="site-legacy-mobile-nav"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" strokeWidth={2.25} /> : <Menu className="h-5 w-5" strokeWidth={2.25} />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="site-legacy-mobile-nav"
          className="border-t border-[var(--color-ink)]/15 bg-[var(--color-bg)] px-4 py-3 md:hidden"
        >
          <nav className="flex flex-col" aria-label="Navigation mobile">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "border-b border-[var(--color-ink)]/10 py-3 text-sm font-bold uppercase tracking-wide last:border-b-0",
                  currentPath && link.href.startsWith(currentPath)
                    ? "text-[var(--color-primary)]"
                    : "",
                )}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
