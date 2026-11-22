import { useEffect, useState } from "react";
import { homeSlides, type WorkCategory } from "./content";
import { usePrefersReducedMotion } from "./ui";
import { Link } from "./router";
import { SiteHeader } from "./SiteHeader";
import "./pages.css";

const kicker: Record<WorkCategory, string> = {
  菜品: "Dish | 菜品",
  场景: "Scene | 场景",
  饮品: "Drink | 饮品",
};

const slides = homeSlides.map((slide) => ({
  id: slide.slug,
  kicker: kicker[slide.category],
  title: slide.title,
  alt: slide.alt,
  full: slide.full,
  to: `/work/photo/${slide.workId}`,
}));

export function HomePage() {
  const reduce = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const count = slides.length;

  const move = (dir: number) => setIndex((value) => (value + dir + count) % count);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count]);

  useEffect(() => {
    if (reduce) return;
    let locked = false;
    const onWheel = (event: WheelEvent) => {
      if (locked || Math.abs(event.deltaY) < 24) return;
      event.preventDefault();
      locked = true;
      move(event.deltaY > 0 ? 1 : -1);
      window.setTimeout(() => {
        locked = false;
      }, 700);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [count, reduce]);

  useEffect(() => {
    const upcoming = slides[(index + 1) % count];
    const preload = new Image();
    preload.src = upcoming.full;
  }, [index, count]);

  const current = slides[index];

  return (
    <div className="home-page">
      <SiteHeader tone="overlay" />
      <section className="home-slider" aria-roledescription="carousel" aria-label="作品">
        <div className="home-track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {slides.map((slide, slideIndex) => (
            <article className="home-slide" key={slide.id} aria-hidden={slide.id !== current.id}>
              <img
                src={slide.full}
                alt={slide.alt}
                fetchPriority={slideIndex === 0 ? "high" : "auto"}
                loading={slideIndex === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </article>
          ))}
        </div>
        <div className="home-copy">
          <p className="home-kicker">{current.kicker}</p>
          <h1 className="home-title">{current.title}</h1>
          <Link className="home-go" to={current.to}>
            查看
          </Link>
        </div>
        <button type="button" className="home-arrow prev" aria-label="上一张" onClick={() => move(-1)}>
          ←
        </button>
        <button type="button" className="home-arrow next" aria-label="下一张" onClick={() => move(1)}>
          →
        </button>
        <div className="home-progress" aria-hidden>
          {String(index + 1).padStart(2, "0")}
          <span>
            <i style={{ width: `${((index + 1) / count) * 100}%` }} />
          </span>
          {String(count).padStart(2, "0")}
        </div>
      </section>
    </div>
  );
}
