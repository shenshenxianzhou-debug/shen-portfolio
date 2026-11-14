import { useEffect, useState } from "react";
import { marquee, photos } from "./content";
import { Arrow, usePrefersReducedMotion } from "./ui";

export function Hero() {
  const reduce = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (reduce) return;
    const next = photos[(index + 1) % photos.length];
    const preload = new Image();
    preload.src = next.thumb;
  }, [index, reduce]);

  useEffect(() => {
    if (reduce) return;
    const node = document.querySelector(".ember-band");
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPlaying(Boolean(entry?.isIntersecting)),
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % photos.length);
    }, 4600);
    return () => window.clearInterval(timer);
  }, [reduce]);

  const band = [...marquee, ...marquee, ...marquee];

  return (
    <section id="top" className="chapter hero-chapter">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="kicker">
            <span className="font-latin">FOOD PHOTOGRAPHY & FILM</span>
          </p>
          <h1 className="display">
            <span>人间有味</span>
            <span>是清欢</span>
          </h1>
          <p className="attrib">苏轼《浣溪沙》</p>
          <p className="lede">
            成都美食摄影师与导演，影像工作约九年。导演、摄影、剪辑、调色。
          </p>
          <div className="cta-row">
            <a className="pill" href="#gallery">
              看作品 <Arrow />
            </a>
            <a className="text-link" href="#contact">
              联系我 <Arrow />
            </a>
          </div>
        </div>
        <div className="hero-media">
          {[(index + photos.length - 1) % photos.length, index, (index + 1) % photos.length].map((photoIndex) => {
            const photo = photos[photoIndex];
            const on = photoIndex === index;
            return (
              <img
                key={photo.src}
                src={photo.thumb}
                alt={on ? photo.alt : ""}
                className={on ? "is-on" : ""}
                fetchPriority={photoIndex === 0 ? "high" : "auto"}
                loading={photoIndex === 0 ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
              />
            );
          })}
        </div>
      </div>
      <div className={`ember-band${playing && !reduce ? "" : " is-paused"}`} aria-hidden>
        <div className="ember-track">
          {band.map((item, itemIndex) => (
            <span key={`${item}-${itemIndex}`}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
