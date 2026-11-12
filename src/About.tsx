import { aboutParagraphs, portrait, tools } from "./content";
import { AnimatedText, ContactButton, EdgeLight, FadeIn, Glare, useTilt } from "./ui";

function Portrait() {
  const { ref, glareRef } = useTilt(8);
  return (
    <div className="mx-auto w-full max-w-sm [perspective:1100px] lg:max-w-none">
      <div
        ref={ref}
        className="relative overflow-hidden rounded-[1.75rem] shadow-[0_28px_70px_rgba(0,0,0,0.4)] [transform-style:preserve-3d]"
        style={{ willChange: "transform" }}
      >
        <img
          src={portrait.src}
          alt={portrait.alt}
          width={864}
          height={1152}
          className="aspect-[3/4] w-full object-cover object-[center_18%]"
        />
        <Glare glareRef={glareRef} />
        <EdgeLight />
      </div>
    </div>
  );
}

export function About() {
  return (
    <section
      id="about"
      className="relative z-20 -mt-16 rounded-t-[2rem] bg-[#0C0C0C] px-[clamp(1.25rem,4vw,4.5rem)] py-20 md:-mt-24 md:rounded-t-[3rem] md:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.7fr)] lg:gap-16">
        <div>
          <FadeIn y={20}>
            <h2 className="hero-heading font-display text-[clamp(3.2rem,8vw,6.5rem)] font-semibold leading-[0.95]">
              我是沈现周。
            </h2>
            <p className="mt-5 tracking-[0.12em] text-[#B7C3CC]">成都 · 美食摄影与影像</p>
          </FadeIn>
          <div className="mt-10 space-y-6">
            {aboutParagraphs.map((paragraph) => (
              <AnimatedText
                key={paragraph.slice(0, 12)}
                text={paragraph}
                className="text-[clamp(1.02rem,1.5vw,1.25rem)] leading-relaxed text-[#D5DEE4]"
              />
            ))}
          </div>
          <p className="mt-8 text-sm tracking-[0.04em] text-[#8E9AA3]">{tools}</p>
          <div className="mt-10">
            <ContactButton>联系</ContactButton>
          </div>
        </div>
        <FadeIn y={24}>
          <Portrait />
        </FadeIn>
      </div>
    </section>
  );
}
