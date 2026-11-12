import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { photos } from "./content";
import { EASE, EdgeLight, Glare, useLockScroll, usePrefersReducedMotion, useTilt } from "./ui";
import { motion } from "framer-motion";

function Frame({ index }: { index: number }) {
  const photo = photos[index];
  const reduce = usePrefersReducedMotion();
  const { ref, glareRef } = useTilt(4);

  return (
    <motion.figure
      key={index}
      initial={reduce ? { opacity: 1 } : { opacity: 0, rotateX: 8, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, rotateX: 0, scale: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
      style={{ transformPerspective: 1100 }}
      className="relative m-0"
    >
      <div ref={ref} className="relative [transform-style:preserve-3d]" style={{ willChange: "transform" }}>
        <img
          src={photo.src}
          alt={photo.alt}
          className="max-h-[min(78vh,820px)] max-w-[min(88vw,1100px)] rounded-2xl object-contain shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
        />
        <Glare glareRef={glareRef} />
        <EdgeLight />
      </div>
    </motion.figure>
  );
}

export function Lightbox({
  index,
  onChange,
}: {
  index: number | null;
  onChange: (index: number | null) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
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
  const pad = (value: number) => String(value).padStart(2, "0");

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
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-4">
          <Frame index={index} />
          <p className="font-latin text-sm italic tracking-[0.16em] text-[#C5D0D8]">
            {pad(index + 1)} / {pad(photos.length)}
          </p>
          <p className="sr-only" aria-live="polite">
            {pad(index + 1)}，共 {pad(photos.length)}。{photo.alt}
          </p>
          <button
            type="button"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/25"
            aria-label="关闭"
            onClick={() => onChange(null)}
          >
            <X size={18} />
          </button>
          <button
            type="button"
            className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/35 md:left-6"
            aria-label="上一张"
            onClick={() => onChange((index - 1 + photos.length) % photos.length)}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/35 md:right-6"
            aria-label="下一张"
            onClick={() => onChange((index + 1) % photos.length)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </dialog>
  );
}
