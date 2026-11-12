import { services } from "./content";
import { FadeIn } from "./ui";

export function Services() {
  return (
    <section
      id="services"
      className="relative z-10 -mt-8 rounded-t-[2rem] bg-white px-[clamp(1.25rem,5vw,5rem)] pb-32 pt-16 text-[#0C0C0C] md:-mt-12 md:rounded-t-[3rem] md:pb-40 md:pt-24"
    >
      <FadeIn y={24}>
        <p lang="en" className="font-latin text-sm font-light italic tracking-[0.18em] text-black/45">
          Practice
        </p>
        <h2 className="font-display mt-3 text-[clamp(3.5rem,9vw,7.5rem)] font-semibold leading-[0.9]">
          工作
        </h2>
      </FadeIn>
      <ul className="mt-12 border-b border-black/15 md:mt-16">
        {services.map((service, index) => (
          <li key={service.number} className="border-t border-black/15">
            <FadeIn delay={index * 0.08} y={28}>
              <div className="grid gap-3 py-7 md:grid-cols-[5.5rem_minmax(0,0.9fr)_minmax(0,1.2fr)] md:items-baseline md:gap-8 md:py-10">
                <span className="font-latin text-sm tracking-[0.2em] text-black/45">{service.number}</span>
                <h3 className="font-display text-[clamp(1.7rem,3vw,2.75rem)] leading-tight">{service.title}</h3>
                <p className="max-w-xl text-[clamp(0.98rem,1.15vw,1.08rem)] leading-relaxed text-black/70">
                  {service.body}
                </p>
              </div>
            </FadeIn>
          </li>
        ))}
      </ul>
    </section>
  );
}
