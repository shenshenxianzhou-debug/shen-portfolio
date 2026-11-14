import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { photos } from "./content";
import { Arrow, Kicker, Reveal, useLockScroll, usePrefersReducedMotion } from "./ui";

const Corridor = lazy(() => import("./corridor/Corridor"));

function canRunCorridor() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (!window.matchMedia("(min-width: 960px) and (hover: hover) and (pointer: fine)").matches) return false;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (memory && memory < 4) return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function PhotoGrid({ onOpen }: { onOpen: (index: number) => void }) {
  return (
    <ul className="photo-grid">
      {photos.map((photo, index) => (
        <li key={photo.src} className={index === 0 ? "span-2" : ""}>
          <button type="button" onClick={() => onOpen(index)} aria-label={`查看照片：${photo.alt}`}>
            <img src={photo.thumb} alt="" loading="lazy" decoding="async" />
          </button>
        </li>
      ))}
    </ul>
  );
}

export function Gallery({ onOpen }: { onOpen: (index: number) => void }) {
  const reduce = usePrefersReducedMotion();
  const [allowed, setAllowed] = useState(false);
  const [armed, setArmed] = useState(false);
  const [full, setFull] = useState(false);
  const [dragging, setDragging] = useState(false);
  useLockScroll(full);

  useEffect(() => {
    setAllowed(canRunCorridor());
  }, [reduce]);

  useEffect(() => {
    if (!allowed) return;
    const node = document.getElementById("gallery");
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setArmed(true);
        observer.disconnect();
      },
      { rootMargin: "240px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [allowed]);

  useEffect(() => {
    if (!full) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFull(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [full]);

  const openFull = () => {
    if (allowed) setArmed(true);
    setFull(true);
  };

  const onDrag = useCallback((value: boolean) => setDragging(value), []);

  const stage = allowed && armed;

  return (
    <section id="gallery" className={`chapter gallery-chapter${full ? " is-full" : ""}${dragging ? " is-drag" : ""}`}>
      <div className="gallery-layout">
        <Reveal className="intro-card">
          <Kicker index="01" label="画廊" />
          <h2 className="display display-md">
            <span>把菜</span>
            <span>拍清楚</span>
          </h2>
          <p>十七张实地拍下的菜品。点开看到原图。</p>
          <button type="button" className="pill" onClick={openFull}>
            进入画廊 <Arrow />
          </button>
          <p className="fine">滚轮或拖动可在画面里前进。没有画布时，改成照片格子。</p>
        </Reveal>
        <div className="gallery-stage">
          {stage ? (
            <Suspense fallback={<PhotoGrid onOpen={onOpen} />}>
              <Corridor photos={photos} onOpen={onOpen} onDrag={onDrag} />
            </Suspense>
          ) : (
            <PhotoGrid onOpen={onOpen} />
          )}
          {full && (
            <button type="button" className="close-full" onClick={() => setFull(false)}>
              关闭
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
