import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import { photos } from "./content";
import { usePrefersReducedMotion } from "./ui";

function setWidth(row: HTMLDivElement | null) {
  if (!row) return 0;
  const count = row.children.length / 3;
  const start = row.children[0] as HTMLElement | undefined;
  const next = row.children[count] as HTMLElement | undefined;
  if (!start || !next) return 0;
  return next.offsetLeft - start.offsetLeft;
}

/** Scroll the row left, looping inside the repeated copies. */
function wrapLeft(distance: number, width: number) {
  if (!width) return 0;
  const traveled = ((distance % width) + width) % width;
  return -width - traveled;
}

/** Scroll the row right, looping inside the repeated copies. */
function wrapRight(distance: number, width: number) {
  if (!width) return 0;
  const traveled = ((distance % width) + width) % width;
  return -2 * width + traveled;
}

export function Marquee({ onOpen }: { onOpen: (index: number) => void }) {
  const reduce = usePrefersReducedMotion();
  const rowA = useRef<HTMLDivElement>(null);
  const rowB = useRef<HTMLDivElement>(null);
  const widthA = useRef(0);
  const widthB = useRef(0);
  const top = photos.slice(0, 9);
  const bottom = photos.slice(9);

  useEffect(() => {
    if (reduce) return;
    const rows = [rowA.current, rowB.current];
    let last: HTMLElement | null = null;

    const resetTile = (tile: HTMLElement) => {
      const z = tile.dataset.z ?? "0";
      tile.style.transform = `translateZ(${z}px)`;
      const glare = tile.querySelector<HTMLElement>("[data-glare]");
      if (glare) glare.style.opacity = "0";
    };

    const onMove = (event: MouseEvent) => {
      if (!window.matchMedia("(pointer: fine)").matches) return;
      const tile = (event.target as HTMLElement).closest<HTMLElement>("[data-tilt]");
      if (last && last !== tile) resetTile(last);
      last = tile;
      if (!tile) return;
      const rect = tile.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      const z = tile.dataset.z ?? "0";
      tile.style.transform = `translateZ(${z}px) rotateX(${(-py * 4).toFixed(2)}deg) rotateY(${(px * 5).toFixed(2)}deg)`;
      const glare = tile.querySelector<HTMLElement>("[data-glare]");
      if (glare) {
        glare.style.opacity = "1";
        glare.style.background = `radial-gradient(circle at ${(px + 0.5) * 100}% ${(py + 0.5) * 100}%, rgba(255,255,255,0.26), transparent 46%)`;
      }
    };

    const onLeave = () => {
      if (last) resetTile(last);
      last = null;
    };

    rows.forEach((row) => {
      row?.addEventListener("mousemove", onMove);
      row?.addEventListener("mouseleave", onLeave);
    });
    return () => {
      rows.forEach((row) => {
        row?.removeEventListener("mousemove", onMove);
        row?.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [reduce]);

  useLayoutEffect(() => {
    if (reduce) return;
    let frame = 0;

    const measure = () => {
      widthA.current = setWidth(rowA.current);
      widthB.current = setWidth(rowB.current);
    };

    const apply = () => {
      const y = window.scrollY;
      if (rowA.current) {
        rowA.current.style.transform = `translate3d(${wrapLeft(y * 0.42, widthA.current)}px,0,0)`;
      }
      if (rowB.current) {
        rowB.current.style.transform = `translate3d(${wrapRight(y * 0.34, widthB.current)}px,0,0)`;
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        apply();
        frame = 0;
      });
    };

    const onResize = () => {
      measure();
      apply();
    };

    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [reduce]);

  if (reduce) {
    return (
      <section aria-label="摄影" className="px-[clamp(1rem,3vw,2rem)] py-10">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {photos.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              className="overflow-hidden rounded-2xl"
              onClick={() => onOpen(index)}
              aria-label={`查看照片：${photo.alt}`}
            >
              <img
                src={photo.thumb}
                alt=""
                className="aspect-[420/270] w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section aria-label="摄影" className="relative py-6 md:py-10">
      <Shelf
        rowRef={rowA}
        items={top}
        depth={0}
        onOpen={onOpen}
      />
      <Shelf
        rowRef={rowB}
        items={bottom}
        depth={-36}
        onOpen={onOpen}
        offset={9}
      />
    </section>
  );
}

function Shelf({
  rowRef,
  items,
  depth,
  onOpen,
  offset = 0,
}: {
  rowRef: RefObject<HTMLDivElement | null>;
  items: typeof photos;
  depth: number;
  onOpen: (index: number) => void;
  offset?: number;
}) {
  const loop = [0, 1, 2];
  return (
    <div className="overflow-hidden py-1.5 [perspective:1400px]">
      <div
        className="[transform-style:preserve-3d]"
        style={{ transform: `rotateX(6deg) translateZ(${depth}px)` }}
      >
        <div
          ref={rowRef}
          className="flex w-max gap-3 [transform-style:preserve-3d]"
          style={{ willChange: "transform" }}
        >
          {loop.map((copy) =>
            items.map((photo, index) => {
              const photoIndex = offset + index;
              const z = (index + copy) % 2 === 0 ? 0 : 22;
              return (
                <button
                  key={`${copy}-${photo.src}`}
                  type="button"
                  data-tilt
                  data-z={z}
                  tabIndex={-1}
                  aria-hidden={copy === 0 ? undefined : true}
                  aria-label={`查看照片：${photo.alt}`}
                  onClick={() => onOpen(photoIndex)}
                  className="relative h-[clamp(180px,46vw,270px)] w-[clamp(280px,72vw,420px)] shrink-0 cursor-zoom-in overflow-hidden rounded-2xl shadow-[0_18px_40px_rgba(0,0,0,0.35)] [transform-style:preserve-3d]"
                  style={{ transform: `translateZ(${z}px)`, willChange: "transform" }}
                >
                  <img
                    src={photo.thumb}
                    alt=""
                    width={420}
                    height={270}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="h-full w-full object-cover"
                  />
                  <span
                    data-glare
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0"
                    style={{ mixBlendMode: "soft-light" }}
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]"
                  />
                </button>
              );
            }),
          )}
        </div>
      </div>
    </div>
  );
}
