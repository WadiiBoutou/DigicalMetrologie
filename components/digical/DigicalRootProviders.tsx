"use client";

import type { ReactNode } from "react";
import { DigicalLanguageProvider, type DigicalLanguage } from "@/components/digical/language";
import { ThemeProvider } from "next-themes";

export function DigicalRootProviders({
  children,
  initialLang,
}: {
  children: ReactNode;
  initialLang: DigicalLanguage;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <DigicalLanguageProvider initialLang={initialLang}>
        {children}
      </DigicalLanguageProvider>
    </ThemeProvider>
  );
}
