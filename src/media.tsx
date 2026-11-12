import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./ui";

export function LoopMedia({
  video,
  still,
  alt,
  className,
  priority = false,
  onLoop,
}: {
  video?: string;
  still: string;
  alt: string;
  className?: string;
  priority?: boolean;
  onLoop?: () => void;
}) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const loopRef = useRef(onLoop);
  const [failed, setFailed] = useState(false);
  loopRef.current = onLoop;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce || !video) return;
    el.muted = true;
    let last = 0;
    let stamp = 0;
    const mark = () => {
      const now = performance.now();
      if (now - stamp < 500) return;
      stamp = now;
      loopRef.current?.();
    };
    const onTime = () => {
      const t = el.currentTime;
      if (last > 0.8 && t + 0.35 < last) mark();
      last = t;
    };
    const onEnded = () => {
      mark();
      try {
        el.currentTime = 0;
      } catch {
        /* the poster remains if the element is gone */
      }
      void el.play().catch(() => {});
    };
    const play = () => {
      void el.play().catch(() => {});
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) play();
        else el.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("ended", onEnded);
    return () => {
      observer.disconnect();
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("ended", onEnded);
    };
  }, [reduce, video]);

  if (reduce || !video || failed) {
    return (
      <img
        src={still}
        alt={alt}
        className={className}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        loading={priority ? "eager" : "lazy"}
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
      autoPlay={priority}
      preload={priority ? "auto" : "none"}
      disablePictureInPicture
      aria-label={alt}
      onError={() => setFailed(true)}
    >
      <source src={video} type="video/mp4" onError={() => setFailed(true)} />
    </video>
  );
}

export function Still({
  jpg,
  webp,
  alt,
  className,
  width,
  height,
  hidden = false,
}: {
  jpg: string;
  webp?: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  hidden?: boolean;
}) {
  const img = (
    <img
      src={jpg}
      alt={alt}
      width={width}
      height={height}
      className={webp ? "h-full w-full object-cover object-center" : className}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );

  if (!webp) return img;

  return (
    <picture className={className} aria-hidden={hidden || undefined}>
      <source srcSet={webp} type="image/webp" />
      {img}
    </picture>
  );
}
