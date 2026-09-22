import Button from "@/components/Button";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main id="main" className={styles.page}>
      <div className="wrap">
        <p className="eyebrow">404</p>
        <h1>This page is not available</h1>
        <p>The page you were looking for does not exist or is no longer in use.</p>
        <div className={styles.actions}>
          <Button href="/">Return Home</Button>
          <Button href="/contact" variant="outline">
            Contact Us
          </Button>
        </div>
      </div>
    </main>
  );
}
