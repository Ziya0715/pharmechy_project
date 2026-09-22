export const SITE = {
  name: "METTA GLOBAL LIFESCIENCE",
  shortName: "METTA",
  subtitle: "GLOBAL LIFESCIENCE",
  legalName: "Metta Global Lifescience Private Limited",
  tagline: "Connecting pharmaceutical manufacturers with global healthcare markets.",
  description:
    "Metta Global Lifescience connects pharmaceutical manufacturers, suppliers and healthcare businesses through pharmaceutical sourcing, product coordination and global B2B partnerships.",
  get url() {
    return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  },
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/quality", label: "Quality" },
  { href: "/global", label: "Global" },
  { href: "/partnership", label: "Partnership" },
  { href: "/contact", label: "Contact" },
];

export const FOOTER_COLUMNS = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/quality", label: "Quality" },
      { href: "/global", label: "Global" },
    ],
  },
  {
    title: "Products",
    links: [
      { href: "/products/pharmaceutical-formulations", label: "Pharmaceutical Formulations" },
      { href: "/products/injectables-solutions", label: "Injectables" },
      { href: "/products/nutraceuticals", label: "Nutraceuticals" },
    ],
  },
  {
    title: "Partnership",
    links: [
      { href: "/partnership", label: "Manufacturers" },
      { href: "/partnership", label: "Distributors" },
      { href: "/partnership", label: "Importers" },
      { href: "/partnership", label: "Exporters" },
    ],
  },
  {
    title: "Contact",
    links: [
      { href: "/contact", label: "Contact Us" },
      { href: "/contact", label: "Business Enquiry" },
    ],
  },
];

export const BUSINESS_TYPES = [
  "Manufacturer",
  "Distributor",
  "Importer",
  "Exporter",
  "Pharmaceutical Company",
  "Healthcare Company",
  "Procurement Company",
  "Other",
];

export function pageMetadata({ title, description, path, keywords = [] }) {
  const url = `${SITE.url}${path}`;
  const image = `${SITE.url}/images/og-cover.jpg`;

  return {
    title,
    description,
    keywords: keywords.join(", "),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Metta Global Lifescience",
      type: "website",
      locale: "en_US",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.legalName,
    alternateName: SITE.shortName,
    url: SITE.url,
    description: SITE.description,
    slogan: SITE.tagline,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      url: `${SITE.url}/contact`,
      availableLanguage: ["English"],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Metta Global Lifescience",
    url: SITE.url,
    description: SITE.description,
    publisher: {
      "@type": "Organization",
      name: SITE.legalName,
    },
  };
}

export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}
