import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { aboutParagraphs, photos, tools } from "./content";
import {
  AnimatedText,
  ContactButton,
  EdgeLight,
  FadeIn,
  Glare,
  usePrefersReducedMotion,
  useTilt,
} from "./ui";

const corners = [
  { index: 6, className: "left-[-1.5rem] top-[14%] w-[9.5rem] -rotate-6", from: 36, to: -28 },
  { index: 14, className: "right-[-1rem] top-[18%] w-[12rem] rotate-[5deg]", from: 18, to: -42 },
  { index: 10, className: "bottom-[12%] left-[6%] w-[11rem] rotate-[4deg]", from: 28, to: -16 },
  { index: 16, className: "bottom-[8%] right-[-1.5rem] w-[13rem] -rotate-[4deg]", from: 10, to: -32 },
];

function Corner({
  index,
  className,
  from,
  to,
}: {
  index: number;
  className: string;
  from: number;
  to: number;
}) {
  const photo = photos[index];
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [from, to]);
  const { ref: tiltRef, glareRef } = useTilt(7);

  return (
    <div ref={ref} className={`pointer-events-auto absolute hidden xl:block ${className}`}>
      <motion.div style={{ y: reduce ? 0 : y }} className="[perspective:900px]">
        <div
          ref={tiltRef}
          className="relative overflow-hidden rounded-2xl shadow-[0_18px_40px_rgba(0,0,0,0.35)] [transform-style:preserve-3d]"
          style={{ willChange: "transform" }}
        >
          <img src={photo.src} alt={photo.alt} className="aspect-[4/5] w-full object-cover" loading="lazy" />
          <Glare glareRef={glareRef} />
          <EdgeLight />
        </div>
      </motion.div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative min-h-[100dvh] overflow-hidden py-24 md:py-28">
      {corners.map((corner) => (
        <Corner key={corner.index} {...corner} />
      ))}
      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-8rem)] max-w-3xl flex-col justify-center px-[clamp(1.25rem,4vw,2rem)]">
        <FadeIn y={20}>
          <p lang="en" className="font-latin text-sm font-light italic tracking-[0.18em] text-[#9AA6B0]">
            About
          </p>
          <h2 className="hero-heading font-display mt-4 text-[clamp(3.2rem,8vw,7rem)] font-semibold leading-[0.95]">
            我是沈现周。
          </h2>
          <p className="mt-5 tracking-[0.12em] text-[#B7C3CC]">成都 · 美食摄影与影像</p>
        </FadeIn>
        <div className="mt-10 space-y-6">
          {aboutParagraphs.map((paragraph) => (
            <AnimatedText
              key={paragraph.slice(0, 12)}
              text={paragraph}
              className="text-[clamp(1.05rem,1.7vw,1.35rem)] leading-relaxed text-[#D5DEE4]"
            />
          ))}
        </div>
        <p className="mt-8 text-sm tracking-[0.04em] text-[#8E9AA3]">{tools}</p>
        <div className="mt-10">
          <ContactButton>联系</ContactButton>
        </div>
      </div>
    </section>
  );
}
