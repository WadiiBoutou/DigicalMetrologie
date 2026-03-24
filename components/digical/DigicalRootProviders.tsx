"use client";

import type { ReactNode } from "react";
import { DigicalLanguageProvider, type DigicalLanguage } from "@/components/digical/language";

export function DigicalRootProviders({
  children,
  initialLang,
}: {
  children: ReactNode;
  initialLang: DigicalLanguage;
}) {
  return <DigicalLanguageProvider initialLang={initialLang}>{children}</DigicalLanguageProvider>;
}
