import Image from "next/image";
import CtaBanner from "@/components/CtaBanner";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { PHILOSOPHY_TOPICS } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/site";
import styles from "./page.module.css";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export const metadata = pageMetadata({
  title: "About Metta Global Lifescience | Pharmaceutical Business Partner",
  description:
    "Metta Global Lifescience is a pharmaceutical business development and market-connectivity company helping manufacturers, suppliers and healthcare businesses build reliable commercial relationships.",
  path: "/about",
  keywords: [
    "pharmaceutical business partner",
    "pharmaceutical sourcing company",
    "pharmaceutical market access",
    "pharmaceutical B2B",
  ],
});

export default function AboutPage() {
  return (
    <main id="main">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        breadcrumb={crumbs}
        title="About Metta: Connecting Pharmaceutical Expertise and Markets"
        text="Metta Global Lifescience is a pharmaceutical business development and market-connectivity company focused on helping manufacturers, suppliers and healthcare businesses build reliable commercial relationships."
        image="/images/hero/about-dna-tree-nobg.png"
        imageAlt="Gold illustration of a tree formed from molecular and DNA structures"
      />

      <section className="section section-cream">
        <div className="wrap">
          <Reveal>
            <SectionHeading eyebrow="About Metta" title="Vision and mission" />
          </Reveal>
          <div className={styles.split}>
            <article className="card">
              <p className="eyebrow">Our Vision</p>
              <h2>Our vision</h2>
              <p>
                To become a trusted pharmaceutical business partner connecting quality-focused suppliers with healthcare
                markets worldwide.
              </p>
            </article>
            <article className="card">
              <p className="eyebrow">Our Mission</p>
              <h2>Our mission</h2>
              <p>
                To simplify pharmaceutical sourcing and partnership development through transparent communication,
                structured coordination and market-focused business support.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={`section section-white ${styles.philosophy}`}>
        <div className={`wrap ${styles.philosophyInner}`}>
          <Reveal>
            <SectionHeading eyebrow="How we work" title="Our Philosophy" />
          </Reveal>
          <div className={styles.editorial}>
            <h3>A considered approach to pharmaceutical relationships</h3>
            <p>
              Pharmaceutical markets are built on careful introductions, clear information and respect for each
              partner&apos;s role. Metta Global Lifescience exists to make that process more organised: understanding
              what a buyer or supplier is looking for, identifying a suitable counterpart where possible, and
              supporting the commercial conversation that follows.
            </p>
            <p>
              We do not present ourselves as a manufacturer, and we do not claim facilities, licences or certifications
              that belong to other companies. Our value sits in coordination, market-focused sourcing and long-term
              relationship development.
            </p>
          </div>
          <div className="grid-3">
            {PHILOSOPHY_TOPICS.map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>
                <article className="card card-hover">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className={`wrap ${styles.closing}`}>
          <div>
            <SectionHeading
              title="A bridge between manufacturers and markets"
              description="Whether the discussion starts with a product requirement, a market interest or a partnership enquiry, the objective remains the same: a clear, professional path toward a suitable commercial connection."
            />
          </div>
          <Image
            src="/images/hero/about-dna-tree-nobg.png"
            alt="Decorative gold DNA tree illustration"
            width={480}
            height={480}
          />
        </div>
      </section>

      <CtaBanner
        title="Start a conversation with Metta"
        text="Share a product, market or partnership requirement and we will help determine the most useful next step."
        buttonLabel="Contact Us"
      />
    </main>
  );
}
