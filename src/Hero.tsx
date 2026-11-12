import { useEffect, useRef, useState, type ReactNode } from "react";
import { character } from "./content";
import { LoopMedia } from "./media";
import { usePrefersReducedMotion } from "./ui";

const INFO_AT = 2200;
const STAGGER = 420;

function Reveal({
  shown,
  className,
  children,
}: {
  shown: boolean;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shown) return;
    const node = ref.current;
    if (node?.contains(document.activeElement)) {
      (document.activeElement as HTMLElement | null)?.blur();
    }
  }, [shown]);

  return (
    <div
      ref={ref}
      className={className}
      aria-hidden={shown ? undefined : true}
      style={{
        opacity: shown ? 1 : 0,
        transition: shown ? "opacity 700ms ease" : "none",
      }}
    >
      {children}
    </div>
  );
}

export function Hero() {
  const { hero } = character;
  const reduce = usePrefersReducedMotion();
  const [cycle, setCycle] = useState(0);
  const [info, setInfo] = useState(reduce);
  const [work, setWork] = useState(reduce);
  const [about, setAbout] = useState(reduce);

  useEffect(() => {
    if (reduce) {
      setInfo(true);
      setWork(true);
      setAbout(true);
      return;
    }
    setInfo(false);
    setWork(false);
    setAbout(false);
    const infoTimer = window.setTimeout(() => setInfo(true), INFO_AT);
    const workTimer = window.setTimeout(() => setWork(true), INFO_AT + STAGGER);
    const aboutTimer = window.setTimeout(() => setAbout(true), INFO_AT + STAGGER * 2);
    return () => {
      window.clearTimeout(infoTimer);
      window.clearTimeout(workTimer);
      window.clearTimeout(aboutTimer);
    };
  }, [cycle, reduce]);

  return (
    <section id="top" aria-label="首页" className="hero">
      <div className="hero-copy">
        <div className="w-full">
          <h1 className="font-display whitespace-nowrap text-[clamp(3.5rem,7.2vw,7.4rem)] font-semibold leading-[0.96] text-[#F4F7F8]">
            沈现周
          </h1>
          <p className="mt-4 whitespace-nowrap text-[clamp(0.95rem,1.5vw,1.25rem)] tracking-[0.16em] text-[#E7EEF2]">
            美食摄影 / 影像
          </p>
          <Reveal shown={info} className="mt-6 min-h-[1.4em]">
            <p className="text-sm tracking-[0.12em] text-[#C5D0D8]">成都 · 影像工作约九年</p>
          </Reveal>
          <div className="mt-8 flex flex-col items-start gap-4">
            <Reveal shown={work}>
              <a href="#work" className="link-line" tabIndex={work ? 0 : -1}>
                看作品 <span aria-hidden>→</span>
              </a>
            </Reveal>
            <Reveal shown={about}>
              <a href="#about" className="link-line" tabIndex={about ? 0 : -1}>
                认识我 <span aria-hidden>→</span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
      <div className="hero-media">
        <LoopMedia
          video={hero.video}
          still={hero.still}
          alt={hero.alt}
          priority
          className="hero-frame"
          onLoop={() => {
            setInfo(false);
            setWork(false);
            setAbout(false);
            setCycle((value) => value + 1);
          }}
        />
      </div>
    </section>
  );
}
