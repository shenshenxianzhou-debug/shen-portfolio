import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { cases, character, photos, profileHref } from "./content";
import { LoopMedia } from "./media";
import { Chapter, usePrefersReducedMotion } from "./ui";

const pad = (value: number) => String(value).padStart(2, "0");

export function Work({
  onOpen,
  activePhoto,
}: {
  onOpen: (index: number) => void;
  activePhoto: number | null;
}) {
  const reduce = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLUListElement>(null);
  const pointer = useRef<{ x: number; y: number; id: number } | null>(null);
  const dragged = useRef(false);
  const count = cases.length;
  const current = cases[index];

  useEffect(() => {
    if (activePhoto === null) return;
    const next = cases.findIndex((item) => item.kind === "photo" && item.photoIndex === activePhoto);
    if (next >= 0) setIndex(next);
  }, [activePhoto]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new IntersectionObserver(
      ([entry]) => setEngaged(Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.45)),
      { threshold: [0, 0.45, 0.75] },
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      if (document.body.style.overflow === "hidden") return;
      const target = event.target;
      if (target instanceof HTMLElement) {
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) return;
      }
      const focusedHere = rootRef.current?.contains(document.activeElement) ?? false;
      if (!focusedHere && !engaged) return;
      event.preventDefault();
      setIndex((value) =>
        event.key === "ArrowRight" ? (value + 1) % count : (value - 1 + count) % count,
      );
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, engaged]);

  useEffect(() => {
    const rail = railRef.current;
    const el = rail?.querySelector<HTMLElement>("[data-current='true']");
    if (!rail || !el) return;
    const railBox = rail.getBoundingClientRect();
    const box = el.getBoundingClientRect();
    const delta = box.left - railBox.left - (rail.clientWidth - box.width) / 2;
    rail.scrollBy({ left: delta, behavior: reduce ? "auto" : "smooth" });
  }, [index, reduce]);

  const step = (direction: -1 | 1) => {
    setIndex((value) => (value + direction + count) % count);
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    pointer.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
    dragged.current = false;
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = pointer.current;
    pointer.current = null;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
    dragged.current = true;
    step(dx < 0 ? 1 : -1);
  };

  const swallowSwipe = (event: { preventDefault: () => void }) => {
    if (!dragged.current) return;
    event.preventDefault();
    dragged.current = false;
  };

  const photo = current?.kind === "photo" ? photos[current.photoIndex] : null;
  const progress = ((index + 1) / count) * 100;

  return (
    <section id="work" ref={rootRef} className="border-t border-white/10" aria-keyshortcuts="ArrowLeft ArrowRight">
      <div className="plate">
        <div className="plate-copy">
          <div>
            <Chapter index="02" label="作品" />
            <p className="mt-5 max-w-xs text-[1.02rem] leading-relaxed text-[#D5DEE4]">
              菜品照片，以及新片场上的三支影片。
            </p>
          </div>
        </div>
        <div className="plate-media">
          <LoopMedia
            video={character.food.video}
            still={character.food.still}
            alt={character.food.alt}
            className="absolute inset-0 h-full w-full object-cover object-[18%_center]"
          />
        </div>
      </div>

      <div className="section shell !pt-10 md:!pt-14">
        <div className="frame min-w-0">
          <div
            ref={stageRef}
            className="case-stage relative aspect-[4/3] max-h-[78vh] overflow-hidden bg-black md:aspect-[16/9]"
            role="region"
            aria-roledescription="carousel"
            aria-label="作品序列"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => {
              pointer.current = null;
            }}
          >
            {current?.kind === "photo" && photo ? (
              <button
                type="button"
                className="absolute inset-0 cursor-zoom-in"
                aria-label={`查看照片：${photo.alt}`}
                onClick={(event) => {
                  if (dragged.current) {
                    event.preventDefault();
                    dragged.current = false;
                    return;
                  }
                  onOpen(current.photoIndex);
                }}
              >
                <img
                  src={photo.thumb}
                  alt=""
                  width={1200}
                  height={800}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </button>
            ) : null}
            {current?.kind === "film" ? (
              <a
                href={current.href}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex flex-col justify-between p-6 no-underline md:p-12"
                onClick={swallowSwipe}
              >
                <span className="text-sm tracking-[0.22em] text-[#9AA6B0]">影片</span>
                <span className="font-latin text-[clamp(4.5rem,12vw,8.5rem)] font-light leading-none text-[#F4F7F8]">
                  {current.index}
                </span>
                <span className="link-line self-start">
                  在新片场打开 <span aria-hidden>↗</span>
                </span>
              </a>
            ) : null}
          </div>

          <div className="mt-5 flex items-center gap-4">
            <button type="button" className="nav-arrow" aria-label="上一则" onClick={() => step(-1)}>
              ←
            </button>
            <p className="font-latin min-w-[5.5rem] text-sm tracking-[0.18em] text-[#C5D0D8]" aria-live="polite">
              {pad(index + 1)} / {pad(count)}
            </p>
            <button type="button" className="nav-arrow" aria-label="下一则" onClick={() => step(1)}>
              →
            </button>
          </div>
          <div
            className="mt-4 h-0.5 w-full bg-white/15"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={count}
            aria-valuenow={index + 1}
            aria-label="作品进度"
          >
            <div className="h-full bg-[#E7EEF2]" style={{ width: `${progress}%` }} />
          </div>
          {photo ? <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#C5D0D8]">{photo.alt}</p> : null}

          <ul ref={railRef} className="rail mt-8 flex gap-2 overflow-x-auto pb-2" aria-label="作品缩略">
            {cases.map((item, itemIndex) => {
              const selected = itemIndex === index;
              if (item.kind === "photo") {
                const thumb = photos[item.photoIndex];
                return (
                  <li key={thumb.src} className="shrink-0">
                    <button
                      type="button"
                      data-current={selected ? "true" : "false"}
                      aria-current={selected ? "true" : undefined}
                      aria-label={`第 ${itemIndex + 1} 幅，${thumb.alt}`}
                      className={`block h-16 w-[5.5rem] overflow-hidden border ${
                        selected ? "border-[#E7EEF2] opacity-100" : "border-transparent opacity-50"
                      }`}
                      onClick={() => setIndex(itemIndex)}
                    >
                      <img
                        src={thumb.thumb}
                        alt=""
                        width={1200}
                        height={800}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  </li>
                );
              }
              return (
                <li key={item.href} className="shrink-0">
                  <button
                    type="button"
                    data-current={selected ? "true" : "false"}
                    aria-current={selected ? "true" : undefined}
                    aria-label={`影片 ${item.index}`}
                    className={`grid h-16 w-[5.5rem] place-items-center border font-latin text-lg ${
                      selected ? "border-[#E7EEF2] text-[#F4F7F8]" : "border-white/15 text-[#9AA6B0]"
                    }`}
                    onClick={() => setIndex(itemIndex)}
                  >
                    {item.index}
                  </button>
                </li>
              );
            })}
          </ul>

          <a className="link-line mt-8" href={profileHref} target="_blank" rel="noopener noreferrer">
            新片场主页 <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
