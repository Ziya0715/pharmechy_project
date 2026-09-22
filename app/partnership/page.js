import Image from "next/image";
import CtaBanner from "@/components/CtaBanner";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import PartnershipCard from "@/components/PartnershipCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { PARTNER_TYPES } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/site";
import styles from "./page.module.css";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Partnership", path: "/partnership" },
];

const HIGHLIGHTS = [
  { title: "Collaboration", text: "Introductions shaped around a defined commercial need." },
  { title: "Coordination", text: "A clear path for product, market and documentation discussions." },
  { title: "Continuity", text: "Relationships intended to last beyond a single enquiry." },
];

export const metadata = pageMetadata({
  title: "Pharmaceutical Partnerships | Metta Global Lifescience",
  description:
    "Metta Global Lifescience works with manufacturers, distributors, importers, exporters and healthcare businesses to explore mutually relevant pharmaceutical opportunities.",
  path: "/partnership",
  keywords: [
    "pharmaceutical partnership",
    "pharmaceutical distributors",
    "pharmaceutical manufacturing partners",
    "pharmaceutical export",
    "pharmaceutical import",
    "pharmaceutical B2B",
  ],
});

export default function PartnershipPage() {
  return (
    <main id="main">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        breadcrumb={crumbs}
        title="Strategic Partnerships for Shared Growth"
        text="Strong pharmaceutical markets are built through reliable relationships. Metta Global Lifescience works with manufacturers, distributors, importers, exporters and healthcare businesses to explore mutually relevant opportunities."
        image="/images/partnership/handshake-nobg.png"
        imageAlt="Gold line illustration of a handshake representing pharmaceutical partnership"
      />

      <section className="section section-cream">
        <div className="wrap">
          <Reveal>
            <SectionHeading
              eyebrow="We work with"
              title="Business partners across the pharmaceutical value chain"
              description="Each partnership conversation begins with a practical question: who needs to be connected, and what information is required to make that connection useful."
            />
          </Reveal>
          <div className="grid-2">
            {PARTNER_TYPES.map((item, index) => (
              <Reveal key={item.title} delay={index * 60}>
                <PartnershipCard {...item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`section section-white ${styles.highlights}`}>
        <div className={`wrap ${styles.highlightInner}`}>
          <div className={styles.badgeRow}>
            {HIGHLIGHTS.map((item) => (
              <article key={item.title} className={styles.badge}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <Image
            src="/images/partnership/dna-helix-nobg.png"
            alt="Gold DNA helix illustration"
            width={420}
            height={420}
          />
        </div>
      </section>

      <CtaBanner
        title="Become a Partner"
        text="Tell us whether you manufacture, distribute, import, export or procure. We will help determine whether a conversation is relevant."
        buttonLabel="Become a Partner"
        href="/contact?interest=partnership"
      />
    </main>
  );
}
