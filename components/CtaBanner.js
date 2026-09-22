import Button from "./Button";
import styles from "./CtaBanner.module.css";

export default function CtaBanner({
  title = "Looking for a Pharmaceutical Supply Partner?",
  text = "Tell us what products or markets you are looking for. Our team can help connect your requirements with suitable pharmaceutical sourcing opportunities.",
  buttonLabel = "Start a Conversation",
  href = "/contact",
}) {
  return (
    <section className={styles.cta}>
      <div className={`wrap ${styles.inner}`}>
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <Button href={href} variant="gold">
          {buttonLabel}
        </Button>
      </div>
    </section>
  );
}
