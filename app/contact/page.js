import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { SITE, breadcrumbJsonLd, pageMetadata } from "@/lib/site";
import styles from "./page.module.css";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export const metadata = pageMetadata({
  title: "Contact Metta Global Lifescience | Business Enquiry",
  description:
    "Contact Metta Global Lifescience to discuss a product requirement, target market or pharmaceutical partnership opportunity.",
  path: "/contact",
  keywords: [
    "pharmaceutical business partner",
    "pharmaceutical sourcing company",
    "pharmaceutical B2B",
    "business enquiry",
  ],
});

export default function ContactPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Metta Global Lifescience",
    url: `${SITE.url}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: SITE.legalName,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        url: `${SITE.url}/contact`,
        availableLanguage: ["English"],
      },
    },
  };

  return (
    <main id="main">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={contactJsonLd} />
      <PageHero
        breadcrumb={crumbs}
        title="Let's Build the Right Pharmaceutical Connection"
        text="Tell us about your product requirement, target market or partnership opportunity."
        image="/images/contact/envelope-nobg.png"
        imageAlt="Gold envelope, globe and fountain pen illustration for a business enquiry"
      />

      <section className="section section-cream">
        <div className={`wrap ${styles.layout}`}>
          <div>
            <p className="eyebrow">Professional contact</p>
            <h2 className={styles.heading}>Business enquiry</h2>
            <p className="lead">
              Share as much context as you can: who you are, what you need, and which market you have in mind. The
              form is designed so the enquiry can later be sent to a secure business endpoint.
            </p>
          </div>
          <Suspense fallback={<p>Loading enquiry form…</p>}>
            <ContactForm />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
