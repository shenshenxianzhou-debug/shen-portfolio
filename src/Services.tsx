import { EMAIL } from "./asset";
import { character, services } from "./content";
import { FadeIn } from "./ui";

const packageMail = `mailto:${EMAIL}?subject=${encodeURIComponent("打包咨询")}`;
const singleMail = `mailto:${EMAIL}?subject=${encodeURIComponent("单点咨询")}`;

export function Services() {
  return (
    <section
      id="services"
      className="relative z-10 -mt-10 overflow-hidden rounded-t-[2rem] bg-white text-[#0C0C0C] md:-mt-16 md:rounded-t-[3rem]"
    >
      <div className="relative aspect-video bg-black">
        <img
          src={character.grading.still}
          alt={character.grading.alt}
          width={1280}
          height={720}
          className="absolute inset-0 h-full w-full object-cover object-center"
          decoding="async"
        />
        <div className="absolute inset-y-0 left-0 flex w-[34%] items-center pl-[clamp(1.25rem,5vw,5rem)]">
          <FadeIn y={16}>
            <h2 className="hero-heading font-display whitespace-nowrap text-[clamp(2.4rem,6.2vw,6.4rem)] font-semibold leading-none">
              服务
            </h2>
          </FadeIn>
        </div>
      </div>
      <div id="services-sheet" className="px-[clamp(1.25rem,5vw,5rem)] pb-36 pt-12 md:pb-44 md:pt-16">
        <FadeIn y={16}>
          <p className="max-w-2xl text-[clamp(1rem,1.4vw,1.15rem)] leading-relaxed text-black/70">
            导演、摄影、剪辑、调色，可以整支片子一起做，也可以只约其中一项。
          </p>
        </FadeIn>
        <ul className="mt-12 border-b border-black/15 md:mt-16">
          {services.map((service, index) => (
            <li key={service.number} className="border-t border-black/15">
              <FadeIn delay={index * 0.08} y={28}>
                <div className="grid gap-3 py-7 md:grid-cols-[5.5rem_minmax(0,0.7fr)_minmax(0,1.3fr)] md:items-baseline md:gap-8 md:py-10">
                  <span className="font-latin text-sm tracking-[0.2em] text-black/45">{service.number}</span>
                  <h3 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] font-semibold leading-tight">
                    {service.title}
                  </h3>
                  <p className="max-w-xl text-[clamp(0.98rem,1.15vw,1.08rem)] leading-relaxed text-black/70">
                    {service.body}
                  </p>
                </div>
              </FadeIn>
            </li>
          ))}
        </ul>
        <FadeIn y={16} className="mt-10">
          <p className="text-sm tracking-[0.08em] text-black/55">可打包，可单点</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={packageMail}
              className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium text-[#0C0C0C]"
              style={{
                backgroundImage: "linear-gradient(180deg, #F7FAFB 0%, #BBCCD7 48%, #8D9CAA 100%)",
              }}
            >
              打包咨询
            </a>
            <a
              href={singleMail}
              className="inline-flex items-center justify-center rounded-full border border-black/25 px-7 py-3 text-sm"
            >
              单点咨询
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
