import { FOOTER_COLUMNS, SITE } from "@/lib/site";
import Logo from "./Logo";
import styles from "./Footer.module.css";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.top}`}>
        <div className={styles.brand}>
          <Logo />
          <p>{SITE.tagline}</p>
        </div>
        <div className={styles.columns}>
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <p className={styles.heading}>{column.title}</p>
              <ul>
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={`wrap ${styles.bottomInner}`}>
          <p>© {year} {SITE.legalName}. All rights reserved.</p>
          <p>Connecting pharmaceutical expertise with healthcare markets.</p>
        </div>
      </div>
    </footer>
  );
}
