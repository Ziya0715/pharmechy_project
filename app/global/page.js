import Image from "next/image";
import CtaBanner from "@/components/CtaBanner";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { REGIONS } from "@/lib/content";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/site";
import styles from "./page.module.css";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Global", path: "/global" },
];

export const metadata = pageMetadata({
  title: "Global Pharmaceutical Market Connectivity | Metta Global Lifescience",
  description:
    "Metta Global Lifescience connects pharmaceutical supply opportunities with healthcare markets across India and international regions through market-focused sourcing and partnership development.",
  path: "/global",
  keywords: [
    "global pharmaceutical sourcing",
    "pharmaceutical export",
    "pharmaceutical import",
    "pharmaceutical market access",
    "pharmaceutical sourcing India",
  ],
});

export default function GlobalPage() {
  return (
    <main id="main">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHero
        breadcrumb={crumbs}
        title="A Global Network Rooted in Pharmaceutical Excellence"
        text="Our business model is designed to connect pharmaceutical supply opportunities with healthcare markets across India and international regions."
      />

      <section className={styles.mapSection}>
        <div className={`wrap ${styles.mapWrap}`}>
          <Image
            src="/images/global/world-map-nobg.png"
            alt="Stylised dark green world map with gold markers indicating regions of market focus"
            width={1600}
            height={900}
            className={styles.map}
            priority
          />
        </div>
      </section>

      <section className="section section-cream">
        <div className="wrap">
          <Reveal>
            <SectionHeading
              eyebrow="Market focus"
              title="Regions of business connectivity"
              description="The regions below describe areas of market interest and potential connectivity. They are not a claim of active operations, offices or registered presence in each country."
            />
          </Reveal>
          <div className="grid-3">
            {REGIONS.map((region, index) => (
              <Reveal key={region.name} delay={index * 70}>
                <article className="card card-hover">
                  <p className="eyebrow">{region.note}</p>
                  <h3>{region.name}</h3>
                  <p>{region.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Looking toward an international market?"
        text="Share the destination region and product category so we can explore whether a suitable sourcing conversation can be coordinated."
      />
    </main>
  );
}
