import { siteConfig } from "@/config/site";
import type { Product } from "@/types/product";

export function buildLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Florist",
    name: `${siteConfig.brandName} - доставка цветов в ${siteConfig.city}`,
    image: `${siteConfig.siteUrl}/og-image.jpg`,
    url: siteConfig.siteUrl,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: siteConfig.city,
      addressCountry: "KZ"
    },
    openingHours: "Mo-Su 00:00-23:59",
    priceRange: "₸₸",
    areaServed: siteConfig.city,
    sameAs: [siteConfig.instagram],
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Доставка цветов и букетов"
      }
    }
  };
}

export function buildProductJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: siteConfig.brandName
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "KZT",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${siteConfig.siteUrl}/product/${product.slug}`
    }
  };
}
