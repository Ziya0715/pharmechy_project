import Image from "next/image";
import Button from "@/components/Button";
import CtaBanner from "@/components/CtaBanner";
import FeatureCard from "@/components/FeatureCard";
import JsonLd from "@/components/JsonLd";
import ProcessSteps from "@/components/ProcessSteps";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { CONNECTING_FEATURES, FOCUS_AREAS, PROCESS_STEPS, WHY_PARTNER } from "@/lib/content";
import { organizationJsonLd, pageMetadata, websiteJsonLd } from "@/lib/site";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Metta Global Lifescience | Pharmaceutical Sourcing & Global Partnerships",
  description:
    "Metta Global Lifescience connects pharmaceutical manufacturers, suppliers and healthcare businesses through pharmaceutical sourcing, product coordination and global B2B partnerships.",
  path: "/",
  keywords: [
    "pharmaceutical sourcing company",
    "pharmaceutical suppliers",
    "pharmaceutical products",
    "pharmaceutical trading",
    "pharmaceutical business partner",
    "pharmaceutical distributors",
    "pharmaceutical export",
    "pharmaceutical import",
    "pharmaceutical B2B",
    "global pharmaceutical sourcing",
  ],
});

export default function HomePage() {
  return (
    <main id="main">
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      <section className={styles.hero}>
        <div className={`wrap ${styles.heroInner}`}>
          <div>
            <h1>
              Advancing Healthcare.
              <br />
              Connecting Markets.
            </h1>
            <p>
              Metta Global Lifescience connects pharmaceutical manufacturers, suppliers and healthcare markets through
              reliable sourcing, product coordination and international business partnerships.
            </p>
            <div className={styles.actions}>
              <Button href="/products">Explore Our Products</Button>
              <Button href="/partnership" variant="outline">
                Partner With Us
              </Button>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <Image
              src="/images/hero/hero-molecular-nobg.png"
              alt="Gold pharmaceutical molecular illustration on a dark green background"
              width={900}
              height={506}
              priority
            />
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="wrap">
          <Reveal>
            <SectionHeading
              eyebrow="What we do"
              title="Connecting Pharmaceutical Expertise With Global Demand"
              description="Metta Global Lifescience works as a bridge between pharmaceutical manufacturers, suppliers and business partners across healthcare markets. We help identify suitable product opportunities, coordinate sourcing requirements and support long-term commercial relationships."
            />
          </Reveal>
          <div className={`grid-4 ${styles.cardGrid}`}>
            {CONNECTING_FEATURES.map((item, index) => (
              <Reveal key={item.title} delay={index * 80}>
                <FeatureCard {...item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`section section-white ${styles.focus}`}>
        <div className="wrap">
          <Reveal>
            <SectionHeading
              eyebrow="Focus areas"
              title="Our Focus Areas"
              description="A structured view of the pharmaceutical and healthcare categories we support through sourcing and partnership conversations."
            />
          </Reveal>
          <div className={styles.focusRow}>
            <div className={styles.focusGrid}>
              {FOCUS_AREAS.map((item, index) => (
                <Reveal key={item.title} delay={index * 70}>
                  <FeatureCard {...item} />
                </Reveal>
              ))}
            </div>
            <div className={styles.focusArt}>
              <Image
                src="/images/hero/focus-molecular-nobg.png"
                alt="Gold molecular line illustration on a cream background"
                width={480}
                height={480}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="wrap">
          <Reveal>
            <SectionHeading
              eyebrow="Our process"
              title="How We Connect Markets"
              description="A clear sequence for moving from requirement to a constructive commercial conversation."
            />
          </Reveal>
          <ProcessSteps steps={PROCESS_STEPS} />
        </div>
      </section>

      <section className="section section-white">
        <div className="wrap">
          <Reveal>
            <SectionHeading
              eyebrow="Partnership"
              title="Why Partner With Metta?"
              description="A practical, relationship-led approach to pharmaceutical sourcing and market connectivity."
            />
          </Reveal>
          <div className="grid-3">
            {WHY_PARTNER.map((item, index) => (
              <Reveal key={item.title} delay={index * 60}>
                <FeatureCard {...item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </main>
  );
}
