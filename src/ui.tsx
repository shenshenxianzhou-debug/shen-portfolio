import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

export const EASE = [0.25, 0.1, 0.25, 1] as const;

export function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduce;
}

export function useMedia(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

export function useLockScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}

export function FadeIn({
  children,
  delay = 0,
  y = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = usePrefersReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay, duration: 0.7, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Chapter({
  index,
  label,
  title,
}: {
  index: string;
  label: string;
  title?: string;
}) {
  return (
    <header>
      <p className="chapter-kicker">
        <span className="font-latin">{index}</span>
        {title ? (
          <>
            <span aria-hidden className="text-white/30">
              /
            </span>
            <span>{label}</span>
          </>
        ) : null}
      </p>
      <h2 className="display-title font-display mt-3 text-[clamp(2.9rem,6.6vw,5.6rem)]">
        {title ?? label}
      </h2>
    </header>
  );
}
