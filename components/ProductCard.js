import Link from "next/link";
import Icon from "./Icons";
import styles from "./ProductCard.module.css";

export default function ProductCard({ title, summary, href, icon = "capsule" }) {
  return (
    <article className={`card card-hover ${styles.card}`}>
      <div className="icon-box">
        <Icon name={icon} />
      </div>
      <h3>{title}</h3>
      <p>{summary}</p>
      <Link href={href} className={styles.link}>
        View category
      </Link>
    </article>
  );
}
