import { character } from "./content";
import { LoopMedia } from "./media";

export function Hero() {
  const { hero } = character;

  return (
    <section id="top" aria-label="首页" className="relative min-h-[100dvh] overflow-hidden bg-[#0C0C0C]">
      <LoopMedia
        video={hero.video}
        still={hero.still}
        alt={hero.alt}
        priority
        className="hero-frame absolute inset-0 h-full w-full"
      />
      <div className="relative z-10 flex min-h-[100dvh] items-center pt-16">
        <div className="w-[min(40vw,22rem)] pl-[clamp(1rem,3.2vw,4.5rem)] pr-1">
          <h1 className="hero-heading font-display whitespace-nowrap text-[clamp(1.5rem,4vw,5.75rem)] font-semibold leading-[0.95]">
            沈现周
          </h1>
          <p className="mt-3 whitespace-nowrap text-[clamp(0.68rem,1.15vw,1.2rem)] leading-none tracking-[0.08em] text-[#E7EEF2]">
            美食摄影 / 影像
          </p>
        </div>
      </div>
    </section>
  );
}
