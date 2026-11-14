import { useEffect, useState, type ReactNode } from "react";

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

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = usePrefersReducedMotion();
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(reduce);

  useEffect(() => {
    if (reduce || !node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { threshold: 0.18 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node, reduce]);

  return (
    <div
      ref={setNode}
      className={`reveal${shown ? " is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function Kicker({ index, label }: { index: string; label: string }) {
  return (
    <p className="kicker">
      <span>{index}</span>
      <span aria-hidden>/</span>
      <span>{label}</span>
    </p>
  );
}

export function Arrow() {
  return (
    <span className="nudge" aria-hidden>
      →
    </span>
  );
}
