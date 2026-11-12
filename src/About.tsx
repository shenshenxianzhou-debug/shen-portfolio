import { aboutParagraphs, character, tools } from "./content";
import { LoopMedia } from "./media";
import { AnimatedText, ContactButton, EdgeLight, FadeIn, Glare, useTilt } from "./ui";

function PoseSheet() {
  const { ref, glareRef, reduce } = useTilt(5);
  return (
    <figure className="mx-auto w-full max-w-[16rem]">
      <div
        ref={ref}
        className="relative overflow-hidden rounded-[1.5rem] bg-black shadow-[0_24px_60px_rgba(0,0,0,0.35)] [transform-style:preserve-3d]"
        style={reduce ? undefined : { willChange: "transform" }}
      >
        <img
          src={character.pose.still}
          alt={character.pose.alt}
          width={864}
          height={1152}
          className="aspect-[3/4] w-full object-cover"
          draggable={false}
        />
        <Glare glareRef={glareRef} />
        <EdgeLight />
      </div>
      <figcaption className="mt-3 text-center text-sm tracking-[0.08em] text-[#8E9AA3]">
        全身设定
      </figcaption>
    </figure>
  );
}

export function About() {
  return (
    <section
      id="about"
      className="relative z-20 -mt-16 rounded-t-[2rem] bg-[#0C0C0C] px-[clamp(1.25rem,4vw,4.5rem)] py-20 md:-mt-24 md:rounded-t-[3rem] md:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] lg:gap-16">
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
          <div className="flex flex-col gap-8">
            <figure>
              <div className="overflow-hidden rounded-[1.75rem] bg-black shadow-[0_28px_70px_rgba(0,0,0,0.4)]">
                <LoopMedia
                  video={character.rim.video}
                  still={character.rim.still}
                  alt={character.rim.alt}
                  className="aspect-video w-full object-cover object-[center_40%]"
                />
              </div>
              <figcaption className="mt-3 text-sm leading-relaxed text-[#8E9AA3]">
                预先渲染的形象画面，依据本人样貌。
              </figcaption>
            </figure>
            <PoseSheet />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
