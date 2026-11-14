import { fields } from "./content";
import { Arrow, Kicker, Reveal } from "./ui";

export function Fields() {
  return (
    <section id="fields" className="chapter">
      <Reveal>
        <Kicker index="02" label="领域" />
        <h2 className="display display-md">四件事</h2>
      </Reveal>
      <div className="field-grid">
        {fields.map((field, index) => (
          <Reveal key={field.number} delay={index * 70} className="field-wrap">
            <a className={`field-card${index === 0 ? " is-accent" : ""}`} href={field.href}>
              <span className="font-latin field-no">{field.number}</span>
              <h3>{field.title}</h3>
              <p>{field.body}</p>
              <span className="text-link">
                {field.label} <Arrow />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
