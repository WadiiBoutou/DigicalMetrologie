import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Alexandria, Cairo, JetBrains_Mono, Manrope } from "next/font/google";
import { DigicalRootProviders } from "@/components/digical/DigicalRootProviders";
import type { DigicalLanguage } from "@/components/digical/language";
import "./globals.css";

const alexandria = Alexandria({
  subsets: ["latin"],
  variable: "--font-alexandria",
  weight: ["400", "700", "900"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  weight: ["400", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Digical Metrologie",
  description: "Instruments de metrologie pour agriculture et industrie",
  icons: {
    icon: [{ url: "/LOGO.png", type: "image/png" }],
    apple: "/LOGO.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f0da" },
    { media: "(prefers-color-scheme: dark)", color: "#121d18" },
  ],
};

const themeInitScript = `(function(){try{var k="digical-theme";var s=localStorage.getItem(k);if(s==="dark")document.documentElement.classList.add("dark");else document.documentElement.classList.remove("dark");}catch(e){}})();`;

const languageInitScript = `(function(){try{var k="digical-language";var s=localStorage.getItem(k);if(s==="AR"||s==="FR"){document.cookie=k+"="+s+"; path=/; max-age=31536000; SameSite=Lax";}var d=document.documentElement;if(s==="AR"){d.setAttribute("dir","rtl");d.setAttribute("lang","ar");}else{d.setAttribute("dir","ltr");d.setAttribute("lang","fr");}}catch(e){}})();`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get("digical-language")?.value;
  const initialLang: DigicalLanguage = cookieLang === "AR" ? "AR" : "FR";

  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${alexandria.variable} ${manrope.variable} ${cairo.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: languageInitScript }} />
      </head>
      <body className="min-h-full bg-tech-bg font-sans text-tech-body">
        <DigicalRootProviders initialLang={initialLang}>{children}</DigicalRootProviders>
      </body>
    </html>
  );
}
