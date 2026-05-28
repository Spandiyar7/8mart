import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { siteConfig } from "@/config/site";
import { buildLocalBusinessJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "FLORÉ — доставка цветов в Алматы | Свежие букеты 24/7",
    template: "%s | FLORÉ"
  },
  description:
    "Закажите свежие цветы и букеты в FLORÉ. Большой цветочный склад в Алматы, доставка 1,5–3 часа, заказ через WhatsApp.",
  keywords: [
    "доставка цветов Алматы",
    "букеты Алматы",
    "FLORÉ",
    "цветочный склад",
    "купить розы Алматы"
  ],
  openGraph: {
    title: "FLORÉ — доставка цветов в Алматы",
    description:
      "Большой цветочный склад в Алматы, свежие букеты 24/7, доставка 1,5–3 часа.",
    url: siteConfig.siteUrl,
    siteName: "FLORÉ",
    locale: "ru_KZ",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=85",
        width: 1200,
        height: 630,
        alt: "FLORÉ доставка цветов в Алматы"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "FLORÉ — доставка цветов в Алматы",
    description:
      "Свежие букеты, розы и композиции с доставкой по Алматы за 1,5–3 часа."
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#D91572"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = buildLocalBusinessJsonLd();

  return (
    <html lang="ru">
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
