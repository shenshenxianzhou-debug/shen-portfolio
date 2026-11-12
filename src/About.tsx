import { about, character } from "./content";
import { LoopMedia } from "./media";
import { Chapter, FadeIn } from "./ui";

export function About() {
  return (
    <section id="about" className="section shell border-t border-white/10">
      <div className="frame grid items-start gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(18rem,0.88fr)] lg:gap-20">
        <div>
          <Chapter index="03" label="关于" title={about.opening} />
          <FadeIn y={16}>
            <div className="mt-8 max-w-2xl space-y-6 text-pretty text-[clamp(1.02rem,1.35vw,1.16rem)] leading-[1.9] text-[#D5DEE4]">
              <p>{about.place}</p>
              <p>{about.role}</p>
              <p>{about.practice}</p>
            </div>
            <p className="mt-8 text-sm leading-relaxed tracking-[0.03em] text-[#9AA6B0]">{about.tools}</p>
            <p className="mt-2 text-sm tracking-[0.08em] text-[#9AA6B0]">{about.output}</p>
            <div className="mt-10">
              <a className="link-line" href="#contact">
                联系 <span aria-hidden>→</span>
              </a>
            </div>
          </FadeIn>
        </div>
        <div className="flex flex-col gap-8 lg:pt-2">
          <figure>
            <LoopMedia
              video={character.rim.video}
              still={character.rim.still}
              alt={character.rim.alt}
              className="aspect-video w-full object-cover object-center"
            />
            <figcaption className="mt-3 text-sm leading-relaxed text-[#8E9AA3]">
              预先渲染的形象画面，依据本人样貌。
            </figcaption>
          </figure>
          <figure className="mx-auto w-full max-w-[16rem] lg:mx-0">
            <img
              src={character.pose.still}
              alt={character.pose.alt}
              width={864}
              height={1152}
              loading="lazy"
              decoding="async"
              className="w-full"
              draggable={false}
            />
            <figcaption className="mt-3 text-sm tracking-[0.12em] text-[#8E9AA3]">全身设定</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
