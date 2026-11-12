import { portrait } from "./content";
import {
  ContactButton,
  EdgeLight,
  Glare,
  HeroFade,
  Magnet,
  usePrefersReducedMotion,
  useTilt,
} from "./ui";

function HeroPortrait() {
  const reduce = usePrefersReducedMotion();
  const { ref, glareRef } = useTilt(9);

  if (reduce) {
    return (
      <img
        src={portrait.src}
        alt={portrait.alt}
        width={864}
        height={1152}
        fetchPriority="high"
        className="h-[clamp(16rem,42vh,32rem)] w-[clamp(12.5rem,30vh,24rem)] rounded-[1.75rem] object-cover object-[center_18%] shadow-[0_28px_70px_rgba(0,0,0,0.42)]"
      />
    );
  }

  return (
    <div className="relative [perspective:1100px]">
      <div
        ref={ref}
        className="relative h-[clamp(16rem,42vh,32rem)] w-[clamp(12.5rem,30vh,24rem)] [transform-style:preserve-3d]"
        style={{ willChange: "transform" }}
      >
        <img
          src={portrait.src}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-[7%] rounded-[1.5rem] object-cover opacity-45 blur-md"
          style={{ transform: "translateZ(-46px) scale(1.04)" }}
        />
        <img
          src={portrait.src}
          alt={portrait.alt}
          width={864}
          height={1152}
          fetchPriority="high"
          className="relative h-full w-full rounded-[1.75rem] object-cover object-[center_18%] shadow-[0_28px_70px_rgba(0,0,0,0.42)]"
          style={{ transform: "translateZ(28px)" }}
        />
        <span className="pointer-events-none absolute inset-0" style={{ transform: "translateZ(40px)" }}>
          <Glare glareRef={glareRef} />
          <EdgeLight />
        </span>
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-5 left-1/2 h-8 w-[70%] -translate-x-1/2 rounded-full bg-black/55 blur-2xl"
      />
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100dvh] flex-col pt-16">
      <HeroFade
        delay={0.38}
        y={18}
        className="relative z-20 px-[clamp(1.25rem,4vw,4.5rem)] pt-6 md:absolute md:left-[clamp(1.25rem,4vw,4.5rem)] md:top-[18%] md:max-w-[16rem] md:px-0 md:pt-0"
      >
        <p className="font-display text-[clamp(1.35rem,2vw,1.85rem)] leading-snug">
          用镜头讲述
          <br />
          食物的故事
        </p>
        <p
          lang="en"
          className="font-latin mt-4 text-[clamp(1.05rem,1.5vw,1.4rem)] font-light italic leading-snug text-[#C5D0D8]"
        >
          Light held at the
          <br />
          edge of a plate.
        </p>
        <p className="mt-5 text-[0.95rem] tracking-[0.14em] text-[#B7C3CC]">我是沈现周。</p>
      </HeroFade>

      <HeroFade
        delay={0.22}
        className="relative z-10 flex flex-1 items-center justify-center py-6 md:absolute md:inset-x-0 md:top-16 md:bottom-auto md:py-0"
      >
        <Magnet padding={150} strength={3} className="relative inline-flex">
          <HeroPortrait />
        </Magnet>
      </HeroFade>

      <HeroFade
        delay={0.12}
        y={28}
        className="pointer-events-none relative z-20 md:absolute md:inset-x-0 md:bottom-[5.5rem]"
      >
        <h1
          aria-label="沈现周"
          className="font-display flex w-full justify-between px-[clamp(0.85rem,3vw,3rem)] font-semibold leading-[0.9]"
          style={{ fontSize: "clamp(3.4rem, min(20vw, 24vh), 16rem)" }}
        >
          <span className="hero-heading" aria-hidden>
            沈
          </span>
          <span className="hero-heading" aria-hidden>
            现
          </span>
          <span className="hero-heading" aria-hidden>
            周
          </span>
        </h1>
      </HeroFade>

      <HeroFade
        delay={0.52}
        className="relative z-30 mt-auto flex items-center justify-between gap-4 border-t border-white/10 bg-[#0C0C0C] px-[clamp(1.25rem,4vw,4.5rem)] py-4 md:absolute md:inset-x-0 md:bottom-0"
      >
        <p className="text-sm tracking-[0.08em] text-[#9AA6B0]">成都 · 美食摄影与影像</p>
        <ContactButton>联系</ContactButton>
      </HeroFade>
    </section>
  );
}
