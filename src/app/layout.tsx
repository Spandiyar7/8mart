import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { siteConfig, siteUrl } from "@/config/site";
import { getFloristJsonLd } from "@/lib/seo";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "8MART — доставка цветов в Костанае | Букеты 24/7",
    template: "%s — 8MART",
  },
  description:
    "Свежие цветы и букеты в Костанае. 8MART — большой выбор цветов, " +
    "доставка 1,5–3 часа, заказ через WhatsApp.",
  keywords: [
    "цветы Костанай",
    "доставка цветов Костанай",
    "букеты Костанай",
    "розы Костанай",
    "8MART",
    "заказать цветы",
  ],
  applicationName: siteConfig.brandName,
  authors: [{ name: siteConfig.brandName }],
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: siteConfig.brandName,
    title: "8MART — доставка цветов в Костанае",
    description:
      "Большой выбор свежих цветов и букетов. Доставка по Костанаю за 1,5–3 часа, 24/7.",
    url: siteUrl,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FFF8F4",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ru"
      className={`${manrope.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-warm-milk text-graphite">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getFloristJsonLd()),
          }}
        />
        <SmoothScroll>
          <Header />
          {children}
          <Footer />
          <CartDrawer />
        </SmoothScroll>
      </body>
    </html>
  );
}
