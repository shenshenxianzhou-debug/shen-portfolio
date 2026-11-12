import { EMAIL } from "./asset";
import { services } from "./content";
import { FadeIn } from "./ui";

const packageMail = `mailto:${EMAIL}?subject=${encodeURIComponent("打包咨询")}`;
const singleMail = `mailto:${EMAIL}?subject=${encodeURIComponent("单点咨询")}`;

export function Services() {
  return (
    <section
      id="services"
      className="relative z-10 -mt-10 rounded-t-[2rem] bg-white px-[clamp(1.25rem,5vw,5rem)] pb-36 pt-16 text-[#0C0C0C] md:-mt-16 md:rounded-t-[3rem] md:pb-44 md:pt-24"
    >
      <FadeIn y={24}>
        <h2 className="font-display text-[clamp(3.5rem,9vw,7.5rem)] font-semibold leading-[0.9]">
          服务
        </h2>
        <p className="mt-5 max-w-2xl text-[clamp(1rem,1.4vw,1.15rem)] leading-relaxed text-black/70">
          导演、摄影、剪辑、调色，可以整支片子一起做，也可以只约其中一项。
        </p>
      </FadeIn>
      <ul className="mt-12 border-b border-black/15 md:mt-16">
        {services.map((service, index) => (
          <li key={service.number} className="border-t border-black/15">
            <FadeIn delay={index * 0.08} y={28}>
              <div className="grid gap-3 py-7 md:grid-cols-[5.5rem_minmax(0,0.7fr)_minmax(0,1.3fr)] md:items-baseline md:gap-8 md:py-10">
                <span className="font-latin text-sm tracking-[0.2em] text-black/45">{service.number}</span>
                <h3 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] leading-tight">{service.title}</h3>
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
    </section>
  );
}
