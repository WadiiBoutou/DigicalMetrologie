import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Alexandria, Cairo, JetBrains_Mono, Manrope } from "next/font/google";
import { DigicalRootProviders } from "@/components/digical/DigicalRootProviders";
import type { DigicalLanguage } from "@/components/digical/language";
import Script from "next/script";
import "./globals.css";

const alexandria = Alexandria({
  subsets: ["latin"],
  variable: "--font-alexandria",
  weight: ["300", "400", "500", "700", "800"],
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

const SITE_URL = "https://digicalmetrologie.com";

const APP_NAME = "Digical Metrologie";
const APP_DESCRIPTION =
  "Expert en solutions de métrologie de précision pour l'agriculture et l'industrie. Vente, maintenance et calibration d'instruments de mesure.";

const APP_KEYWORDS = [
  "métrologie",
  "étalonnage",
  "calibration",
  "instruments de mesure",
  "agriculture",
  "industrie",
  "qualité",
  "COFRAC",
  "Maroc",
  "Digical",
] as const;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: APP_NAME,
  title: {
    default: `${APP_NAME} | Expert en Métrologie de Précision`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: [...APP_KEYWORDS],
  alternates: {
    canonical: SITE_URL,
  },
  authors: [{ name: "Digical Metrologie" }],
  creator: "Digical Metrologie",
  publisher: "Digical Metrologie",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [{ url: "/LOGO.webp", type: "image/png" }],
    apple: "/LOGO.webp",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["ar_MA"],
    url: SITE_URL,
    siteName: APP_NAME,
    title: `${APP_NAME} | Expert en Métrologie de Précision`,
    description: APP_DESCRIPTION,
    images: [
      {
        url: "/LOGO.webp",
        width: 800,
        height: 400,
        alt: APP_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} | Expert en Métrologie de Précision`,
    description: APP_DESCRIPTION,
    images: ["/LOGO.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/** Matches `:root --app-bg` in `app/globals.css` (Tailwind `bg-app-bg`). */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#09111b",
};

const languageInitScript = `(function(){try{var k="digical-language";var s=localStorage.getItem(k);if(s==="AR"||s==="FR"){document.cookie=k+"="+s+"; path=/; max-age=31536000; SameSite=Lax";}var d=document.documentElement;if(s==="AR"){d.setAttribute("dir","rtl");d.setAttribute("lang","ar");}else{d.setAttribute("dir","ltr");d.setAttribute("lang","fr");}}catch(e){}})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: APP_NAME,
  description: APP_DESCRIPTION,
  url: SITE_URL,
  telephone: "+212661406490",
  logo: `${SITE_URL}/LOGO.webp`,
  image: `${SITE_URL}/LOGO.webp`,
  address: {
    "@type": "PostalAddress",
    addressCountry: "MA",
  },
};

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
      lang={initialLang === "AR" ? "ar" : "fr"}
      dir={initialLang === "AR" ? "rtl" : "ltr"}
      suppressHydrationWarning
      className={`${alexandria.variable} ${manrope.variable} ${cairo.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <Script
          id="language-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: languageInitScript }}
        />
        <Script
          id="json-ld-digical"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-app-bg font-sans text-app-body">
        <DigicalRootProviders initialLang={initialLang}>
          {children}
        </DigicalRootProviders>
      </body>
    </html>
  );
}
