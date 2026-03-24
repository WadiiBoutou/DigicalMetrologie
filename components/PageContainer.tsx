import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteNavbar } from "./SiteNavbar";

type PageContainerProps = {
  children: ReactNode;
  currentPath?: string;
};

export function PageContainer({ children, currentPath }: PageContainerProps) {
  return (
    <div className="min-h-screen">
      <SiteNavbar currentPath={currentPath} />
      <main className="mx-auto w-full max-w-6xl px-3 py-6 sm:px-4 sm:py-8 md:px-8">{children}</main>
      <SiteFooter />
    </div>
  );
}
