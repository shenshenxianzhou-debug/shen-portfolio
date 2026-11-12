import { character, methodSteps } from "./content";
import { Chapter, FadeIn } from "./ui";

export function Method() {
  return (
    <section id="method" className="section shell border-t border-white/10">
      <div className="frame grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.82fr)] lg:items-stretch lg:gap-16">
        <Chapter index="04" label="工作方法" />
        <figure className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <img
            src={character.grading.still}
            alt={character.grading.alt}
            width={1280}
            height={720}
            loading="lazy"
            decoding="async"
            className="aspect-video w-full object-cover object-[78%_center] lg:aspect-auto lg:h-full lg:min-h-[34rem]"
          />
        </figure>
        <ol className="border-b border-white/10">
          {methodSteps.map((step, index) => (
            <li key={step.number} className="border-t border-white/10">
              <FadeIn delay={index * 0.05} y={14}>
                <div className="grid grid-cols-[3.25rem_minmax(0,1fr)] gap-3 py-8 md:gap-6 md:py-11">
                  <span className="font-latin pt-2 text-sm tracking-[0.18em] text-[#9AA6B0]">{step.number}</span>
                  <div>
                    <h3 className="font-display text-[clamp(1.7rem,3vw,2.55rem)] leading-tight text-[#F4F7F8]">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-md text-[1.02rem] leading-relaxed text-[#C5D0D8]">{step.body}</p>
                  </div>
                </div>
              </FadeIn>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
