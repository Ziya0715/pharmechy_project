import CtaBanner from "@/components/CtaBanner";
import FeatureCard from "@/components/FeatureCard";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { QUALITY_CARDS } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/site";
import styles from "./page.module.css";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Quality", path: "/quality" },
];

export const metadata = pageMetadata({
  title: "Quality & Compliance | Metta Global Lifescience",
  description:
    "Metta Global Lifescience focuses on quality-oriented pharmaceutical sourcing, documentation coordination and transparent commercial communication between partners.",
  path: "/quality",
  keywords: [
    "pharmaceutical sourcing",
    "pharmaceutical business partner",
    "quality-focused pharmaceutical sourcing",
  ],
});

export default function QualityPage() {
  return (
    <main id="main">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        breadcrumb={crumbs}
        title="Commitment to Quality and Compliance"
        text="Metta Global Lifescience focuses on connecting business partners with quality-oriented pharmaceutical sourcing opportunities and supporting transparent documentation and commercial coordination."
        image="/images/quality/shield-nobg.png"
        imageAlt="Gold ornamental shield emblem representing quality-focused coordination"
      />

      <section className="section section-cream">
        <div className="wrap">
          <Reveal>
            <SectionHeading
              eyebrow="Our committed quality approach"
              title="Quality as a sourcing principle"
              description="Quality, in this context, means careful partner selection, clear information exchange and respect for the documentation each market discussion requires. Certifications and licences remain those of the relevant manufacturing or supply partner."
            />
          </Reveal>
          <div className={`grid-2 ${styles.cards}`}>
            {QUALITY_CARDS.map((item, index) => (
              <Reveal key={item.title} delay={index * 80}>
                <FeatureCard {...item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="wrap">
          <Reveal>
            <SectionHeading
              title="What we coordinate, and what we do not claim"
              description="Metta Global Lifescience can help request, organise and share available product and business documentation supplied by partners. We do not present partner certifications as our own, and this website does not list WHO-GMP, ISO, FDA or EU GMP credentials unless independently provided by the company for publication."
            />
          </Reveal>
        </div>
      </section>

      <CtaBanner
        title="Share a quality-focused sourcing brief"
        text="Tell us the product category, destination market and the documentation you expect to review with a potential partner."
      />
    </main>
  );
}
