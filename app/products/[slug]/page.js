import { notFound } from "next/navigation";
import Button from "@/components/Button";
import CtaBanner from "@/components/CtaBanner";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { getAllProductSlugs, getProductBySlug } from "@/lib/products";
import { SITE, breadcrumbJsonLd, pageMetadata } from "@/lib/site";
import styles from "./page.module.css";

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return { title: "Product category not found" };
  }

  return pageMetadata({
    title: `${product.title} | Metta Global Lifescience`,
    description: product.summary,
    path: `/products/${product.slug}`,
    keywords: ["pharmaceutical products", "pharmaceutical sourcing", product.title.toLowerCase()],
  });
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: product.title, path: `/products/${product.slug}` },
  ];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.summary,
    category: product.title,
    brand: {
      "@type": "Organization",
      name: SITE.legalName,
    },
    url: `${SITE.url}/products/${product.slug}`,
  };

  return (
    <main id="main">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={productJsonLd} />
      <PageHero
        breadcrumb={crumbs}
        eyebrow={product.eyebrow}
        title={product.title}
        text={product.summary}
        image={product.image}
        imageAlt={`${product.title} sourcing category visual`}
      />

      <section className="section section-cream">
        <div className={`wrap ${styles.layout}`}>
          <article className={styles.article}>
            <h2>Product overview</h2>
            <p>{product.overview}</p>
            <h2>Sourcing information</h2>
            <p>{product.sourcing}</p>
            <h2>Market requirements</h2>
            <p>{product.marketNotes}</p>
          </article>
          <aside className={styles.aside}>
            <div className="card">
              <p className="eyebrow">Category details</p>
              <h2>{product.title}</h2>
              <dl className={styles.meta}>
                <div>
                  <dt>Category</dt>
                  <dd>{product.title}</dd>
                </div>
                <div>
                  <dt>Dosage form</dt>
                  <dd>{product.dosageForm}</dd>
                </div>
                <div>
                  <dt>Available packaging</dt>
                  <dd>{product.packaging}</dd>
                </div>
              </dl>
              <div className={styles.actions}>
                <Button href={`/contact?product=${encodeURIComponent(product.title)}`}>Request Product Information</Button>
                <Button href={`/contact?interest=${encodeURIComponent(product.slug)}`} variant="outlineDark">
                  Discuss This Product
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <CtaBanner
        title="Discuss this sourcing category"
        text="Tell us the market, presentation and commercial context so we can coordinate the right conversation."
        buttonLabel="Send an Enquiry"
        href={`/contact?product=${encodeURIComponent(product.title)}`}
      />
    </main>
  );
}
