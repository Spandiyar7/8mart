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
    default: "8MART — доставка цветов в Костанае | Свежие букеты 24/7",
    template: "%s | 8MART"
  },
  description:
    "Закажите свежие цветы и букеты в 8MART. Большой цветочный склад в Костанае, доставка 1,5–3 часа, заказ через WhatsApp.",
  keywords: [
    "доставка цветов Костанай",
    "букеты Костанай",
    "8MART",
    "цветочный склад",
    "купить розы Костанай"
  ],
  openGraph: {
    title: "8MART — доставка цветов в Костанае",
    description:
      "Большой цветочный склад в Костанае, свежие букеты 24/7, доставка 1,5–3 часа.",
    url: siteConfig.siteUrl,
    siteName: "8MART",
    locale: "ru_KZ",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=85",
        width: 1200,
        height: 630,
        alt: "8MART доставка цветов в Костанае"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "8MART — доставка цветов в Костанае",
    description:
      "Свежие букеты, розы и композиции с доставкой по Костанаю за 1,5–3 часа."
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
