import { useState } from "react";
import {
  films,
  photoCategories,
  photos,
  profileHref,
  videoCategories,
  type Category,
  type Medium,
  type Photo,
} from "./content";
import { ArrowUpRight } from "lucide-react";
import { EdgeLight, FadeIn, Glare, useTilt } from "./ui";

function PhotoTile({
  photo,
  index,
  onOpen,
}: {
  photo: Photo;
  index: number;
  onOpen: (index: number) => void;
}) {
  const { ref, glareRef } = useTilt(6);
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`查看照片：${photo.alt}`}
      className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-2xl text-left [perspective:900px]"
    >
      <div
        ref={ref}
        className="relative h-full [transform-style:preserve-3d]"
        style={{ willChange: "transform" }}
      >
        <img
          src={photo.src}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <Glare glareRef={glareRef} />
        <EdgeLight />
      </div>
    </button>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-[1.5rem] border border-dashed border-[#D7E2EA]/35 px-6 py-20 text-center">
      <p className="font-display text-[clamp(1.6rem,3vw,2.2rem)]">{label}</p>
      <p className="mt-3 text-[#9AA6B0]">这一类还没有放上作品。</p>
    </div>
  );
}

function Filters({
  items,
  current,
  onChange,
}: {
  items: Category[];
  current: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="分类">
      {items.map((item) => {
        const selected = item.id === current;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(item.id)}
            className={`rounded-full border px-4 py-2 text-sm tracking-wide transition-colors ${
              selected
                ? "border-[#E7EEF2] bg-[#E7EEF2] text-[#0C0C0C]"
                : "border-white/20 text-[#C5D0D8] hover:border-white/50"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

export function Catalog({ onOpen }: { onOpen: (index: number) => void }) {
  const [medium, setMedium] = useState<Medium>("photos");
  const [photoCategory, setPhotoCategory] = useState("food");
  const [videoCategory, setVideoCategory] = useState("dining");
  const categories = medium === "photos" ? photoCategories : videoCategories;
  const current = medium === "photos" ? photoCategory : videoCategory;
  const currentLabel = categories.find((item) => item.id === current)?.label ?? "";
  const populated =
    (medium === "photos" && current === "food") ||
    (medium === "video" && current === "dining");

  const chooseMedium = (next: Medium) => {
    setMedium(next);
    if (next === "photos") setPhotoCategory("food");
    else setVideoCategory("dining");
  };

  return (
    <section id="work" className="px-[clamp(1.25rem,4vw,4.5rem)] pb-28 pt-8 md:pt-14">
      <FadeIn y={20}>
        <h2 className="hero-heading font-display text-[clamp(3.5rem,8vw,7.5rem)] font-semibold leading-[0.9]">
          作品
        </h2>
        <p className="mt-4 max-w-xl text-[#C5D0D8]">
          照片与视频分开来看。目前放上的，是实地拍摄的菜品，以及新片场上的三支影片。
        </p>
      </FadeIn>

      <div className="mt-10 flex gap-2" role="tablist" aria-label="照片或视频">
        {(
          [
            ["photos", "照片"],
            ["video", "视频"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={medium === id}
            onClick={() => chooseMedium(id)}
            className={`rounded-full px-5 py-2 font-display text-lg ${
              medium === id ? "bg-[#E7EEF2] text-[#0C0C0C]" : "text-[#9AA6B0]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-5">
        <Filters
          items={categories}
          current={current}
          onChange={medium === "photos" ? setPhotoCategory : setVideoCategory}
        />
      </div>

      <div className="mt-8" role="tabpanel">
        {medium === "photos" && current === "food" && (
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo, index) => (
              <li key={photo.src}>
                <PhotoTile photo={photo} index={index} onOpen={onOpen} />
              </li>
            ))}
          </ul>
        )}

        {medium === "video" && current === "dining" && (
          <div>
            <p className="mb-5 max-w-lg text-sm leading-relaxed text-[#9AA6B0]">
              三支影片，按原有顺序在新片场打开。
            </p>
            <ul className="grid gap-3">
              {films.map((film) => (
                <li key={film.href}>
                  <a
                    href={film.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`影像作品 ${film.index}，在新片场打开`}
                    className="flex items-center justify-between gap-4 rounded-[1.25rem] border border-[#D7E2EA]/55 px-5 py-5 transition-colors hover:bg-[#E7EEF2] hover:text-[#0C0C0C]"
                  >
                    <span className="font-latin text-2xl italic">{film.index}</span>
                    <span className="inline-flex items-center gap-2 text-sm tracking-wide">
                      打开
                      <ArrowUpRight size={16} aria-hidden />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={profileHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 border-b border-[#BBCCD7]/50 pb-1 text-sm tracking-[0.12em] text-[#C5D0D8]"
            >
              新片场主页
              <ArrowUpRight size={14} aria-hidden />
            </a>
          </div>
        )}

        {!populated && <EmptyState label={currentLabel} />}
      </div>
    </section>
  );
}
