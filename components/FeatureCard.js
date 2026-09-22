import Link from "next/link";
import Icon from "./Icons";
import styles from "./FeatureCard.module.css";

export default function FeatureCard({ title, text, icon, href }) {
  const className = `card card-hover ${styles.card}`;
  const content = (
    <>
      {icon ? (
        <div className={`icon-box ${styles.icon}`}>
          <Icon name={icon} />
        </div>
      ) : null}
      <h3>{title}</h3>
      <p>{text}</p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return <article className={className}>{content}</article>;
}
