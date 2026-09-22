import CtaBanner from "@/components/CtaBanner";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import ProductTable from "@/components/ProductTable";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { PRODUCT_CATEGORIES } from "@/lib/products";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/site";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
];

const ICONS = ["capsule", "vial", "leaf", "cross"];

export const metadata = pageMetadata({
  title: "Pharmaceutical Products & Sourcing | Metta Global Lifescience",
  description:
    "Explore pharmaceutical product categories and sourcing opportunities across formulations, injectables, nutraceuticals and healthcare products.",
  path: "/products",
  keywords: [
    "pharmaceutical products",
    "pharmaceutical sourcing",
    "pharmaceutical suppliers",
    "pharmaceutical trading",
    "pharmaceutical manufacturing partners",
  ],
});

export default function ProductsPage() {
  return (
    <main id="main">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        breadcrumb={crumbs}
        title="Our Diverse Pharmaceutical Product Portfolio"
        text="Explore product categories and pharmaceutical sourcing opportunities across formulations, injectables and nutraceuticals."
        image="/images/products/capsules-stacked-nobg.png"
        imageAlt="Stacked cream and forest-green pharmaceutical capsules"
      />

      <section className="section section-cream">
        <div className="wrap">
          <Reveal>
            <SectionHeading
              eyebrow="Our product categories"
              title="Sourcing categories"
              description="These categories describe the types of pharmaceutical and healthcare opportunities we can help coordinate. They are not a live inventory of branded products."
            />
          </Reveal>
          <div className="grid-4">
            {PRODUCT_CATEGORIES.map((item, index) => (
              <Reveal key={item.slug} delay={index * 70}>
                <ProductCard
                  title={item.title}
                  summary={item.summary}
                  href={`/products/${item.slug}`}
                  icon={ICONS[index]}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="wrap">
          <Reveal>
            <SectionHeading
              eyebrow="Featured products"
              title="Illustrative sourcing table"
              description="Use this table as a working view of how a future product database can be presented. Rows are labelled as example data only."
            />
          </Reveal>
          <ProductTable />
        </div>
      </section>

      <CtaBanner
        title="Need a specific product category?"
        text="Share the dosage form, market and commercial context. We can help identify whether a suitable sourcing conversation is possible."
        buttonLabel="Request Product Information"
        href="/contact"
      />
    </main>
  );
}
