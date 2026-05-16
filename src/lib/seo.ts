import type { Metadata } from "next";
import { siteConfig, siteUrl } from "@/config/site";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/formatPrice";

/**
 * Compose page metadata with consistent Open Graph + canonical defaults.
 */
export function createMetadata({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.brandName,
      locale: "ru_RU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/** LocalBusiness / Florist structured data for the whole site. */
export function getFloristJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Florist",
    "@id": `${siteUrl}/#florist`,
    name: siteConfig.brandName,
    description:
      "Цветочный склад в Костанае: большой выбор букетов, роз и композиций. " +
      "Доставка за 1,5–3 часа, заказ через WhatsApp.",
    url: siteUrl,
    telephone: siteConfig.phone,
    image: `${siteUrl}/og.jpg`,
    priceRange: "₸₸",
    currenciesAccepted: "KZT",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: siteConfig.city,
      addressCountry: "KZ",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    areaServed: { "@type": "City", name: siteConfig.city },
    sameAs: [siteConfig.instagram],
  };
}

/** Product structured data for a `/product/[slug]` page. */
export function getProductJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${siteUrl}${product.image}`,
    brand: { "@type": "Brand", name: siteConfig.brandName },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "KZT",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${siteUrl}/product/${product.slug}`,
      priceValidUntil: "2027-12-31",
    },
    ...(product.oldPrice
      ? { description: `${product.description} (было ${formatPrice(product.oldPrice)})` }
      : {}),
  };
}
