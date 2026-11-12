import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { photos } from "./content";
import { usePrefersReducedMotion } from "./ui";

const INTERVAL = 5000;

export function Hero() {
  const reduce = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [paused, setPaused] = useState(false);
  const count = photos.length;
  const photo = photos[index];
  const playing = !reduce && !paused && !hovered;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, INTERVAL);
    return () => window.clearInterval(timer);
  }, [playing, count]);

  const go = (next: number) => {
    setIndex((next + count) % count);
  };

  return (
    <section
      id="top"
      aria-roledescription="carousel"
      aria-label="精选代表作"
      className="grid min-h-[100dvh] grid-rows-[minmax(22rem,52vh)_auto] overflow-hidden pt-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:grid-rows-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative min-h-[22rem] lg:col-start-2 lg:row-start-1 lg:min-h-full">
        {photos.map((item, itemIndex) => (
          <img
            key={item.src}
            src={item.src}
            alt={itemIndex === index ? item.alt : ""}
            width={2000}
            height={1333}
            fetchPriority={itemIndex === 0 ? "high" : "low"}
            loading={itemIndex === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              itemIndex === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            style={reduce ? { transition: "none" } : undefined}
          />
        ))}
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(215,226,234,0.18)]" />
      </div>

      <div className="relative z-10 flex flex-col justify-end px-[clamp(1.25rem,4vw,4.5rem)] py-10 lg:col-start-1 lg:row-start-1 lg:py-16">
        <p className="text-sm tracking-[0.22em] text-[#C5D0D8]">精选</p>
        <h1 className="hero-heading font-display mt-3 text-[clamp(3.4rem,8vw,7.2rem)] font-semibold leading-[0.92]">
          沈现周
        </h1>
        <p className="mt-4 max-w-md font-display text-[clamp(1.25rem,2vw,1.7rem)] leading-snug">
          用镜头讲述食物的故事
        </p>
        <p lang="en" className="font-latin mt-3 max-w-xs text-lg font-light italic leading-snug text-[#C5D0D8]">
          Light held at the edge of a plate.
        </p>
        <p className="mt-4 tracking-[0.14em] text-[#E7EEF2]">我是沈现周。</p>
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-[#D5DEE4]">{photo.alt}</p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-black/30"
            aria-label="上一幅"
            onClick={() => go(index - 1)}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-black/30"
            aria-label="下一幅"
            onClick={() => go(index + 1)}
          >
            <ChevronRight size={18} />
          </button>
          {!reduce && (
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-black/30"
              aria-label={paused ? "继续轮播" : "暂停轮播"}
              aria-pressed={paused}
              onClick={() => setPaused((value) => !value)}
            >
              {paused ? <Play size={16} /> : <Pause size={16} />}
            </button>
          )}
          <p className="font-latin ml-1 text-sm italic tracking-[0.16em] text-[#C5D0D8]">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </p>
          <p className="text-xs tracking-[0.18em] text-[#9AA6B0]">美食</p>
        </div>
        {!reduce && (
          <div className="mt-5 h-px w-full max-w-xs overflow-hidden bg-white/20">
            <div
              key={`${index}-${playing ? "play" : "stop"}`}
              className="h-full origin-left bg-[#BBCCD7]"
              style={
                playing
                  ? { animation: `carousel-progress ${INTERVAL}ms linear` }
                  : { transform: "scaleX(0)" }
              }
            />
          </div>
        )}
      </div>
    </section>
  );
}
