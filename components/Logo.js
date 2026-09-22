import Link from "next/link";
import styles from "./Logo.module.css";

export default function Logo({ compact = false }) {
  return (
    <Link href="/" className={`${styles.logo} ${compact ? styles.compact : ""}`} aria-label="Metta Global Lifescience home">
      <span className={styles.mark} aria-hidden="true" />
      <span className={styles.wordmark}>
        <span className={styles.name}>METTA</span>
        <span className={styles.subtitle}>GLOBAL LIFESCIENCE</span>
      </span>
    </Link>
  );
}
