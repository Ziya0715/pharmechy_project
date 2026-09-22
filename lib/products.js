export const PRODUCT_CATEGORIES = [
  {
    slug: "pharmaceutical-formulations",
    title: "Pharmaceutical Formulations",
    shortTitle: "Formulations",
    eyebrow: "Product category",
    dosageForm: "Tablets, capsules, syrups and related oral dosage forms",
    packaging: "Blister, bottle, strip or as specified by the sourcing brief",
    summary:
      "Source and connect with suitable pharmaceutical formulation partners for tablets, capsules, syrups and other dosage forms.",
    overview:
      "This category covers oral and related pharmaceutical formulation opportunities that buyers, distributors and procurement teams commonly request. Metta Global Lifescience helps identify suitable manufacturing and supply partners based on the product profile, packaging expectation and market documentation needed for a commercial discussion.",
    sourcing:
      "Share the required dosage form, target market and any available specification notes. We coordinate introductions and information exchange between relevant parties. Product availability, documentation and commercial terms depend on the manufacturing or supply partner.",
    marketNotes:
      "Market and regulatory information is coordinated from documentation provided by the relevant partner. Metta Global Lifescience does not present this category as a registered product listing.",
    image: "/images/products/capsules-stacked-nobg.png",
  },
  {
    slug: "injectables-solutions",
    title: "Injectables & Solutions",
    shortTitle: "Injectables",
    eyebrow: "Product category",
    dosageForm: "Sterile injectables and related solution presentations",
    packaging: "Vial, ampoule or as specified by the sourcing brief",
    summary:
      "Connect with manufacturing and supply partners for sterile injectable and solution opportunities aligned to defined market requirements.",
    overview:
      "Injectable and solution sourcing typically requires careful alignment on presentation, packaging and documentation. Metta Global Lifescience supports B2B discussions by helping businesses articulate requirements and identify partners who can respond with relevant product and technical information.",
    sourcing:
      "Provide the intended presentation, volume expectation and destination market where known. We help route the enquiry to suitable supply or manufacturing counterparts for further commercial coordination.",
    marketNotes:
      "Any market-specific documentation is shared only as provided by the relevant partner. No regulatory status is implied by a listing on this website.",
    image: "/images/products/capsules-stacked-nobg.png",
  },
  {
    slug: "nutraceuticals",
    title: "Nutraceuticals",
    shortTitle: "Nutraceuticals",
    eyebrow: "Product category",
    dosageForm: "Capsules, tablets, powders and related nutraceutical formats",
    packaging: "Bottle, blister, sachet or as specified by the sourcing brief",
    summary:
      "Explore nutraceutical sourcing opportunities and connect with partners offering complementary healthcare product ranges.",
    overview:
      "Nutraceutical enquiries often sit alongside pharmaceutical portfolios for distributors and healthcare businesses. Metta Global Lifescience helps map requirement to potential supply partners and keeps the discussion commercial, documented and market-focused.",
    sourcing:
      "Describe the format, positioning and destination market. We coordinate partner identification and the exchange of available product information.",
    marketNotes:
      "Nutraceutical classification and labelling requirements vary by market. Information is coordinated from partner-supplied materials only.",
    image: "/images/products/capsules-stacked-nobg.png",
  },
  {
    slug: "healthcare-products",
    title: "Healthcare Products",
    shortTitle: "Healthcare",
    eyebrow: "Product category",
    dosageForm: "As defined by the product brief",
    packaging: "As specified by the sourcing requirement",
    summary:
      "Support sourcing discussions for adjacent healthcare products that complement pharmaceutical and nutraceutical portfolios.",
    overview:
      "Some partners require a broader healthcare assortment in addition to core pharmaceutical categories. This page outlines how Metta Global Lifescience can help identify relevant supply counterparts and keep procurement conversations structured.",
    sourcing:
      "Share the product type, intended use category and target market. We assess whether a suitable manufacturing or supply introduction can be coordinated.",
    marketNotes:
      "Listings on this page describe sourcing categories, not approved healthcare claims or registered inventories.",
    image: "/images/products/capsules-stacked-nobg.png",
  },
];

export const EXAMPLE_PRODUCT_ROWS = [
  {
    category: "Pharmaceutical Formulations",
    slug: "pharmaceutical-formulations",
    type: "Oral solid dosage (example)",
    dosageForm: "Tablets / capsules",
    strength: "As specified in the sourcing brief",
    packaging: "Blister, bottle or as required",
    market: "Documentation coordinated as provided by partners",
  },
  {
    category: "Pharmaceutical Formulations",
    slug: "pharmaceutical-formulations",
    type: "Oral liquid (example)",
    dosageForm: "Syrup / suspension",
    strength: "As specified in the sourcing brief",
    packaging: "Bottle or as required",
    market: "Market information shared by the relevant partner",
  },
  {
    category: "Injectables & Solutions",
    slug: "injectables-solutions",
    type: "Sterile injectable (example)",
    dosageForm: "Vial / ampoule",
    strength: "As specified in the sourcing brief",
    packaging: "Vial, ampoule or as required",
    market: "Documentation coordinated as provided by partners",
  },
  {
    category: "Injectables & Solutions",
    slug: "injectables-solutions",
    type: "Solution presentation (example)",
    dosageForm: "Solution",
    strength: "As specified in the sourcing brief",
    packaging: "As required",
    market: "Market information shared by the relevant partner",
  },
  {
    category: "Nutraceuticals",
    slug: "nutraceuticals",
    type: "Nutraceutical range (example)",
    dosageForm: "Capsule / tablet / powder",
    strength: "As specified in the sourcing brief",
    packaging: "Bottle, blister or sachet",
    market: "Classification depends on destination market",
  },
  {
    category: "Healthcare Products",
    slug: "healthcare-products",
    type: "Adjacent healthcare (example)",
    dosageForm: "As defined by enquiry",
    strength: "As specified in the sourcing brief",
    packaging: "As required",
    market: "Documentation coordinated as provided by partners",
  },
];

export function getProductBySlug(slug) {
  return PRODUCT_CATEGORIES.find((item) => item.slug === slug) || null;
}

export function getAllProductSlugs() {
  return PRODUCT_CATEGORIES.map((item) => item.slug);
}
