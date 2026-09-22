import Link from "next/link";
import styles from "./Button.module.css";

export default function Button({
  href,
  children,
  variant = "gold",
  type = "button",
  disabled = false,
  className = "",
  ...props
}) {
  const cls = `${styles.btn} ${styles[variant] || styles.gold} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={cls} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
