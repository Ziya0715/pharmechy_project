import Link from "next/link";
import styles from "./Breadcrumb.module.css";

export default function Breadcrumb({ items }) {
  return (
    <nav className={styles.nav} aria-label="Breadcrumb">
      <ol className={styles.list}>
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.path} className={styles.item}>
              {index > 0 ? (
                <span className={styles.sep} aria-hidden="true">
                  ›
                </span>
              ) : null}
              {last ? (
                <span className={styles.current} aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path}>{item.name}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
