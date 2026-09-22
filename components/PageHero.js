import Image from "next/image";
import Button from "./Button";
import Breadcrumb from "./Breadcrumb";
import styles from "./PageHero.module.css";

export default function PageHero({
  eyebrow,
  title,
  text,
  image,
  imageAlt = "",
  actions = [],
  breadcrumb,
  children,
  className = "",
}) {
  return (
    <section className={`${styles.hero} ${className}`.trim()}>
      <div className={`wrap ${styles.inner} ${image ? styles.withImage : ""}`}>
        <div className={styles.copy}>
          {breadcrumb ? <Breadcrumb items={breadcrumb} /> : null}
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1>{title}</h1>
          {text ? <p className={styles.text}>{text}</p> : null}
          {actions.length > 0 ? (
            <div className={styles.actions}>
              {actions.map((action) => (
                <Button key={action.href} href={action.href} variant={action.variant || "gold"}>
                  {action.label}
                </Button>
              ))}
            </div>
          ) : null}
          {children}
        </div>
        {image ? (
          <div className={styles.visual}>
            <Image src={image} alt={imageAlt} width={720} height={720} priority className={styles.image} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
