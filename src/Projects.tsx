import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { films, photos, profileHref, projects, type Photo } from "./content";
import {
  EdgeLight,
  FadeIn,
  GhostButton,
  Glare,
  useMedia,
  usePrefersReducedMotion,
  useTilt,
} from "./ui";

function Still({
  photo,
  index,
  onOpen,
  from,
  to,
}: {
  photo: Photo;
  index: number;
  onOpen: (index: number) => void;
  from: number;
  to: number;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [from, to]);
  const { ref: tiltRef, glareRef } = useTilt(6);

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`查看照片：${photo.alt}`}
      className="relative h-full min-h-0 w-full cursor-zoom-in overflow-hidden rounded-[1.35rem] text-left"
    >
      <motion.div style={{ y: reduce ? 0 : y }} className="h-[120%] w-full -mt-[10%] [perspective:900px]">
        <div
          ref={tiltRef}
          className="relative h-full [transform-style:preserve-3d]"
          style={{ willChange: "transform" }}
        >
          <img src={photo.src} alt="" className="h-full w-full object-cover" loading="lazy" />
          <Glare glareRef={glareRef} />
          <EdgeLight />
        </div>
      </motion.div>
    </button>
  );
}

function StackCard({
  index,
  total,
  children,
}: {
  index: number;
  total: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const md = useMedia("(min-width: 768px)");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.3"],
  });
  const target = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, target]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [7, 0]);
  const top = (md ? 128 : 96) + index * 28;

  if (reduce) {
    return <article className="relative mb-6">{children}</article>;
  }

  return (
    <article ref={ref} className="sticky h-[85vh] [perspective:1400px]" style={{ top }}>
      <motion.div
        style={{ scale, rotateX, willChange: "transform" }}
        className="h-full origin-top"
      >
        {children}
      </motion.div>
    </article>
  );
}

export function Projects({ onOpen }: { onOpen: (index: number) => void }) {
  return (
    <section
      id="work"
      className="relative z-20 -mt-14 rounded-t-[2rem] bg-[#0C0C0C] md:-mt-24 md:rounded-t-[3rem]"
    >
      <div className="px-[clamp(1.25rem,4vw,4.5rem)] pb-8 pt-16 md:pt-24">
        <FadeIn y={20}>
          <p lang="en" className="font-latin text-sm font-light italic tracking-[0.18em] text-[#9AA6B0]">
            Work
          </p>
          <h2 className="hero-heading font-display mt-3 text-[clamp(3.5rem,8vw,7.5rem)] font-semibold leading-[0.9]">
            作品
          </h2>
          <p className="mt-4 max-w-md text-[#B7C3CC]">实地拍摄的菜品与过程。</p>
        </FadeIn>
      </div>
      <div className="px-[clamp(0.75rem,2.5vw,2.5rem)] pb-28">
        {projects.map((project, index) => {
          const left = photos[project.left];
          const right = photos[project.right];
          return (
            <StackCard key={project.id} index={index} total={projects.length}>
              <div
                id={project.kind === "films" ? "film" : undefined}
                className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[#D7E2EA] bg-[#141618] p-[clamp(1rem,2vw,1.75rem)] shadow-[0_-20px_50px_rgba(0,0,0,0.32)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-latin text-sm italic text-[#BBCCD7]">{project.number}</p>
                    <p className="mt-2 text-xs tracking-[0.22em] text-[#9AA6B0]">{project.category}</p>
                    <h3 className="font-display mt-1 text-[clamp(2rem,4vw,3.4rem)] leading-none">
                      {project.name}
                    </h3>
                  </div>
                  {project.kind === "films" ? (
                    <GhostButton href={profileHref} label="新片场主页，在新标签页打开">
                      新片场主页
                    </GhostButton>
                  ) : (
                    <GhostButton
                      label={`查看${project.name}`}
                      onClick={() => onOpen(project.left)}
                    >
                      查看
                    </GhostButton>
                  )}
                </div>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#C5D0D8]">{project.note}</p>
                {project.kind === "films" && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {films.map((film) => (
                      <li key={film.href}>
                        <a
                          href={film.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`影像作品 ${film.index}，在新片场打开`}
                          className="inline-flex items-center gap-3 rounded-full border border-[#D7E2EA]/55 px-4 py-1.5 text-sm text-[#E7EEF2] transition-colors duration-300 hover:bg-[#E7EEF2] hover:text-[#0C0C0C]"
                        >
                          <span className="font-latin italic">{film.index}</span>
                          <span>打开</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-4 grid min-h-0 flex-1 grid-rows-2 gap-3 md:grid-cols-5 md:grid-rows-1">
                  <div className="min-h-0 md:col-span-2">
                    <Still photo={left} index={project.left} onOpen={onOpen} from={26} to={-30} />
                  </div>
                  <div className="min-h-0 md:col-span-3">
                    <Still photo={right} index={project.right} onOpen={onOpen} from={12} to={-18} />
                  </div>
                </div>
              </div>
            </StackCard>
          );
        })}
      </div>
    </section>
  );
}
