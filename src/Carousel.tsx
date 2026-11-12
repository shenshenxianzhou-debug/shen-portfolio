import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { photos } from "./content";
import { usePrefersReducedMotion } from "./ui";

const INTERVAL = 5000;

export function Carousel() {
  const reduce = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [paused, setPaused] = useState(false);
  const count = photos.length;
  const photo = photos[index];
  const playing = !reduce && !paused && !hovered;

  useEffect(() => {
    if (reduce) setIndex(0);
  }, [reduce]);

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
      aria-roledescription="carousel"
      aria-label="精选菜品"
      className="grid min-h-[100dvh] grid-rows-[minmax(22rem,52vh)_auto] overflow-hidden lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:grid-rows-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative min-h-[22rem] lg:col-start-2 lg:row-start-1 lg:min-h-full">
        {photos.map((item, itemIndex) => (
          <img
            key={item.src}
            src={item.thumb}
            alt={itemIndex === index ? item.alt : ""}
            width={1200}
            height={800}
            fetchPriority="low"
            loading={itemIndex === 0 ? "eager" : "lazy"}
            decoding="async"
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
        <h2 className="hero-heading font-display mt-3 text-[clamp(1.85rem,3.6vw,3.2rem)] font-semibold leading-[1.08]">
          用镜头讲述
          <br />
          食物的故事
        </h2>
        <p lang="en" className="font-latin mt-3 max-w-xs text-lg font-light italic leading-snug text-[#C5D0D8]">
          Light held at the edge of a plate.
        </p>
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
