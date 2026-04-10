"use client";

import type { ReactNode } from "react";
import { Footer, Navbar, WhatsAppFloatButton, type DigicalRoute } from "@/components/digical/shared";
import { useDigicalI18n } from "@/components/digical/language";

export function AppShell({
  route,
  cartCount,
  children,
}: {
  route: DigicalRoute;
  cartCount: number;
  children: ReactNode;
}) {
  return (
    <AppShellBody route={route} cartCount={cartCount}>
      {children}
    </AppShellBody>
  );
}

function AppShellBody({
  route,
  cartCount,
  children,
}: {
  route: DigicalRoute;
  cartCount: number;
  children: ReactNode;
}) {
  const { lang } = useDigicalI18n();
  const skipLabel = lang === "AR" ? "???????? ??? ???????" : "Passer au contenu";

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main-content" className="skip-link">
        {skipLabel}
      </a>
      <Navbar cartCount={cartCount} route={route} />
      <main id="main-content" className="flex flex-1 flex-col">
        {children}
      </main>
      <Footer />
      <WhatsAppFloatButton />
    </div>
  );
}

