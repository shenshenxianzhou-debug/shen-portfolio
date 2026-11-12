import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { photos } from "./content";
import { useLockScroll } from "./ui";

const pad = (value: number) => String(value).padStart(2, "0");

export function Lightbox({
  index,
  onChange,
}: {
  index: number | null;
  onChange: (index: number | null) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const swipe = useRef<{ x: number; y: number; id: number } | null>(null);
  useLockScroll(index !== null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (index !== null) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onChange((index + 1) % photos.length);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        onChange((index - 1 + photos.length) % photos.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onChange]);

  const photo = index === null ? null : photos[index];
  const step = (direction: -1 | 1) => {
    if (index === null) return;
    onChange((index + direction + photos.length) % photos.length);
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    if ((event.target as HTMLElement).closest("button")) return;
    swipe.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.15) return;
    step(dx < 0 ? 1 : -1);
  };

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label="作品大图"
      onClose={() => onChange(null)}
      onClick={(event) => {
        if (event.target === event.currentTarget) onChange(null);
      }}
    >
      {photo && index !== null && (
        <div
          className="flex h-full w-full touch-pan-y flex-col items-center justify-center gap-4 px-4"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            swipe.current = null;
          }}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            draggable={false}
            className="max-h-[min(74vh,820px)] max-w-[min(90vw,1100px)] object-contain"
          />
          <p className="max-w-xl text-center text-sm leading-relaxed text-[#C5D0D8]" aria-live="polite">
            {pad(index + 1)} / {pad(photos.length)} · {photo.alt}
          </p>
          <button
            type="button"
            className="nav-arrow absolute right-4 top-4"
            aria-label="关闭"
            onClick={() => onChange(null)}
          >
            <X size={18} />
          </button>
          <button
            type="button"
            className="nav-arrow absolute left-3 top-1/2 -translate-y-1/2 md:left-6"
            aria-label="上一张"
            onClick={() => step(-1)}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="nav-arrow absolute right-3 top-1/2 -translate-y-1/2 md:right-6"
            aria-label="下一张"
            onClick={() => step(1)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </dialog>
  );
}
