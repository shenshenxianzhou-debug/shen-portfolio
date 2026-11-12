import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { MAILTO } from "./asset";

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
  x = 0,
  y = 0,
  duration = 0.8,
  className,
}: {
  children: ReactNode;
  delay?: number;
  x?: number;
  y?: number;
  duration?: number;
  className?: string;
}) {
  const reduce = usePrefersReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay, duration, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function HeroFade({
  children,
  delay = 0,
  y = 16,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = usePrefersReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.9, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Magnet({
  children,
  padding = 150,
  strength = 3,
  className,
}: {
  children: ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
}) {
  const reduce = usePrefersReducedMotion();
  const fine = useMedia("(pointer: fine)");
  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
  const active = !reduce && fine;

  const onMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!active) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    x.set(dx / strength);
    y.set(dy / strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={className}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{
        x: active ? x : 0,
        y: active ? y : 0,
        padding: active ? padding : 0,
        margin: active ? -padding : 0,
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  );
}

export function useTilt(max = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLSpanElement>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce || !window.matchMedia("(pointer: fine)").matches) return;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let gx = 50;
    let gy = 50;
    let cgx = 50;
    let cgy = 50;
    let raf = 0;
    let live = true;

    const frame = () => {
      cx += (tx - cx) * 0.16;
      cy += (ty - cy) * 0.16;
      cgx += (gx - cgx) * 0.18;
      cgy += (gy - cgy) * 0.18;
      el.style.transform = `rotateX(${cy.toFixed(2)}deg) rotateY(${cx.toFixed(2)}deg)`;
      const glare = glareRef.current;
      if (glare) {
        glare.style.opacity = Math.abs(tx) + Math.abs(ty) > 0.35 ? "1" : "0";
        glare.style.background = `radial-gradient(circle at ${cgx.toFixed(1)}% ${cgy.toFixed(1)}%, rgba(255,255,255,0.28), transparent 46%)`;
      }
      const settled =
        Math.abs(tx - cx) < 0.04 &&
        Math.abs(ty - cy) < 0.04 &&
        Math.abs(gx - cgx) < 0.2 &&
        Math.abs(gy - cgy) < 0.2;
      if (live && !settled) raf = requestAnimationFrame(frame);
      else raf = 0;
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      ty = (0.5 - py) * max * 2;
      tx = (px - 0.5) * max * 2;
      gx = px * 100;
      gy = py * 100;
      start();
    };

    const reset = () => {
      tx = 0;
      ty = 0;
      start();
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", reset);
    return () => {
      live = false;
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", reset);
    };
  }, [max, reduce]);

  return { ref, glareRef, reduce };
}

function Char({
  char,
  progress,
  range,
  reduce,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
  reduce: boolean;
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  if (reduce) return <span>{char}</span>;
  return <motion.span style={{ opacity }}>{char}</motion.span>;
}

export function AnimatedText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });
  const chars = Array.from(text);

  return (
    <p ref={ref} className={className}>
      {chars.map((char, index) => {
        const start = index / chars.length;
        const end = (index + 1) / chars.length;
        return (
          <Char
            key={`${index}-${char}`}
            char={char}
            progress={scrollYProgress}
            range={[start, Math.max(end, start + 0.001)]}
            reduce={reduce}
          />
        );
      })}
    </p>
  );
}

export function ContactButton({
  children = "联系",
  compact = false,
}: {
  children?: ReactNode;
  compact?: boolean;
}) {
  return (
    <Magnet
      padding={compact ? 36 : 72}
      strength={3}
      className="inline-flex"
    >
      <a
        href={MAILTO}
        className="inline-flex items-center justify-center rounded-full px-7 py-3 font-latin text-sm font-medium tracking-wide text-[#0C0C0C] shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_12px_30px_rgba(0,0,0,0.18)]"
        style={{
          backgroundImage:
            "linear-gradient(180deg, #F7FAFB 0%, #BBCCD7 48%, #8D9CAA 100%)",
        }}
      >
        {children}
      </a>
    </Magnet>
  );
}

export function GhostButton({
  children,
  href,
  onClick,
  label,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  label: string;
}) {
  const className =
    "inline-flex shrink-0 items-center gap-2 rounded-full border border-[#D7E2EA]/80 px-4 py-2 font-latin text-sm font-light tracking-wide text-[#E7EEF2] transition-colors duration-300 hover:bg-[#E7EEF2] hover:text-[#0C0C0C]";
  const icon = <ArrowUpRight size={16} aria-hidden />;
  if (href) {
    return (
      <a
        className={className}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
      >
        {children}
        {icon}
      </a>
    );
  }
  return (
    <button type="button" className={className} onClick={onClick} aria-label={label}>
      {children}
      {icon}
    </button>
  );
}

export function Glare({ glareRef }: { glareRef: RefObject<HTMLSpanElement | null> }) {
  return (
    <span
      ref={glareRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0"
      style={{ mixBlendMode: "soft-light" }}
    />
  );
}

export function EdgeLight() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_0_rgba(255,255,255,0.38),inset_0_0_0_1px_rgba(215,226,234,0.22)]"
    />
  );
}
