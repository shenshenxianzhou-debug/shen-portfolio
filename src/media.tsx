import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "./ui";

export function LoopMedia({
  video,
  still,
  alt,
  className,
  priority = false,
}: {
  video?: string;
  still: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    el.muted = true;
    const play = () => {
      el.play().catch(() => {});
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
        else el.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduce, video]);

  if (reduce || !video) {
    return (
      <img
        src={still}
        alt={alt}
        className={className}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        draggable={false}
      />
    );
  }

  return (
    <video
      ref={ref}
      className={className}
      poster={still}
      muted
      loop
      playsInline
      autoPlay
      preload={priority ? "auto" : "metadata"}
      disablePictureInPicture
      aria-label={alt}
    >
      <source src={video} type="video/mp4" />
    </video>
  );
}
