"use client";

import type { ReactNode } from "react";
import { Footer, Navbar, WhatsAppFloatButton, type DigicalRoute } from "@/components/digical/shared";

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
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar cartCount={cartCount} route={route} />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
      <WhatsAppFloatButton />
    </div>
  );
}
