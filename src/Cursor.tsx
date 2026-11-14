import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "./ui";

export function Cursor() {
  const reduce = usePrefersReducedMotion();
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    const node = dot.current;
    if (!node) return;
    document.documentElement.classList.add("has-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let frame = 0;
    let visible = false;

    const paint = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      node.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      frame = requestAnimationFrame(paint);
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!visible) {
        visible = true;
        node.classList.add("is-on");
      }
      const target = event.target instanceof Element ? event.target : null;
      node.classList.toggle("is-link", Boolean(target?.closest("a, button")));
      node.classList.toggle("is-drag", Boolean(target?.closest("[data-cursor='drag']")));
    };

    frame = requestAnimationFrame(paint);
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [reduce]);

  if (reduce) return null;

  return <div ref={dot} className="cursor-dot" aria-hidden />;
}
