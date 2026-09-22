import Icon from "./Icons";
import styles from "./PartnershipCard.module.css";

export default function PartnershipCard({ title, text, icon }) {
  return (
    <article className={`card card-hover ${styles.card}`}>
      <div className={styles.row}>
        <div className="icon-box">
          <Icon name={icon} />
        </div>
        <div>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      </div>
    </article>
  );
}
