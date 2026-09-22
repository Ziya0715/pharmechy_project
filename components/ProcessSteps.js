import styles from "./ProcessSteps.module.css";

export default function ProcessSteps({ steps }) {
  return (
    <ol className={styles.list}>
      {steps.map((step) => (
        <li key={step.number} className={styles.item}>
          <span className={styles.number}>{step.number}</span>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
