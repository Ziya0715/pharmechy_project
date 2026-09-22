export default function SectionHeading({ eyebrow, title, description, light = false, center = false, as = "h2" }) {
  const Heading = as;

  return (
    <div className={`section-heading ${center ? "center" : ""}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <Heading style={light ? { color: "#fff" } : undefined}>{title}</Heading>
      {description ? <p className="lead">{description}</p> : null}
    </div>
  );
}
