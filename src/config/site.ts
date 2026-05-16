/**
 * 8MART — single source of truth for brand + contact data.
 *
 * Every phone number, address and link on the website is read from here.
 * Never hardcode contact details inside components.
 */
export const siteConfig = {
  brandName: "8MART",
  city: "Костанай",
  address: "ул. Тәуелсіздік, 37",
  phone: "+7 777 478 48 22",
  phoneHref: "tel:+77774784822",
  whatsapp: "77774784822",
  instagram: "https://www.instagram.com/8mart_kostanay",
  workingHours: "24/7",
  deliveryTime: "1,5–3 часа",
  deliveryPriceFrom: "от 3000 ₸",
} as const;

export type SiteConfig = typeof siteConfig;

/** Public origin — used for canonical URLs, Open Graph and JSON-LD. */
export const siteUrl = "https://8mart.kz";

/**
 * Brand palette — single source shared between the CSS theme tokens and the
 * WebGL scene (Three.js needs raw hex values, not CSS custom properties).
 */
export const brandColors = {
  primary: "#D91572",
  primaryHover: "#B80F5E",
  lightPink: "#FFE4EF",
  deepRose: "#8A123F",
  graphite: "#25262B",
  softGraphite: "#3A3B40",
  warmMilk: "#FFF8F4",
  white: "#FFFFFF",
  leafGreen: "#3F6F3A",
  goldBeige: "#D6B98C",
} as const;

/** Primary navigation — used by the header and the mobile menu. */
export const navLinks = [
  { label: "Каталог", href: "/catalog" },
  { label: "Доставка", href: "/delivery" },
  { label: "О нас", href: "/about" },
  { label: "Контакты", href: "/contacts" },
] as const;
