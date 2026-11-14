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
    } else if (dialog.open) dialog.close();
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
          className="lightbox-body"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            swipe.current = null;
          }}
        >
          <img src={photo.src} alt={photo.alt} draggable={false} />
          <p aria-live="polite">
            {pad(index + 1)} / {pad(photos.length)} · {photo.alt}
          </p>
          <button type="button" className="lb" aria-label="关闭" onClick={() => onChange(null)}>
            ×
          </button>
          <button type="button" className="lb prev" aria-label="上一张" onClick={() => step(-1)}>
            ←
          </button>
          <button type="button" className="lb next" aria-label="下一张" onClick={() => step(1)}>
            →
          </button>
        </div>
      )}
    </dialog>
  );
}
