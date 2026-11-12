import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { EMAIL } from "./asset";
import { crafts, expressions, type ExpressionId } from "./content";
import { Still } from "./media";
import { Chapter } from "./ui";

const packageMail = `mailto:${EMAIL}?subject=${encodeURIComponent("打包咨询")}`;
const singleMail = `mailto:${EMAIL}?subject=${encodeURIComponent("单点咨询")}`;

export function Craft() {
  const [active, setActive] = useState<ExpressionId | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const keyed = useRef(false);
  const pointerKind = useRef("mouse");
  const current = active ?? "default";
  const caption = crafts.find((item) => item.id === active)?.title ?? "沈现周";

  useEffect(() => {
    const warm = window.setTimeout(() => {
      Object.values(expressions).forEach((item) => {
        const image = new Image();
        image.src = item.webp;
      });
    }, 900);
    return () => window.clearTimeout(warm);
  }, []);

  const inside = (node: EventTarget | null) =>
    node instanceof Node && !!listRef.current?.contains(node);

  const rememberPointer = (event: ReactPointerEvent<HTMLElement>) => {
    pointerKind.current = event.pointerType;
  };

  return (
    <section id="services" className="section shell border-t border-white/10">
      <div className="frame">
        <Chapter index="01" label="服务" />
        <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-[#C5D0D8]">
          导演、摄影、剪辑、调色。可以整支片子一起做，也可以只约其中一项。
        </p>
        <div className="mt-12 grid items-center gap-10 lg:mt-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <figure className="mx-auto w-[min(72vw,26rem)] lg:mx-0 lg:w-full lg:max-w-[26rem]">
            <div className="relative aspect-[3/4] bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]" data-expression={current}>
              {Object.values(expressions).map((item) => {
                const on = item.id === current;
                return (
                  <Still
                    key={item.id}
                    jpg={item.jpg}
                    webp={item.webp}
                    alt={on ? item.alt : ""}
                    hidden={!on}
                    width={864}
                    height={1152}
                    className={`absolute inset-0 h-full w-full transition-opacity duration-500 ease-out ${
                      on ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                  />
                );
              })}
            </div>
            <figcaption className="mt-4 min-h-[1.25rem] text-sm tracking-[0.22em] text-[#9AA6B0]" aria-live="polite">
              {caption}
            </figcaption>
          </figure>
          <div>
            <ul
              ref={listRef}
              className="border-b border-white/15"
              onPointerLeave={(event) => {
                if (event.pointerType !== "mouse") return;
                if (inside(event.relatedTarget)) return;
                setActive(null);
              }}
            >
              {crafts.map((craft) => {
                const on = active === craft.id;
                return (
                  <li key={craft.id} className="border-t border-white/15">
                    <button
                      type="button"
                      className={`craft-card${on ? " is-on" : ""}`}
                      aria-pressed={on}
                      onPointerEnter={(event) => {
                        rememberPointer(event);
                        if (event.pointerType === "mouse") setActive(craft.id);
                      }}
                      onPointerDown={rememberPointer}
                      onFocus={(event) => {
                        const keyedFocus = event.currentTarget.matches(":focus-visible");
                        keyed.current = keyedFocus;
                        if (keyedFocus) setActive(craft.id);
                      }}
                      onBlur={(event) => {
                        if (inside(event.relatedTarget)) return;
                        if (pointerKind.current === "mouse" || keyed.current) setActive(null);
                        keyed.current = false;
                      }}
                      onClick={(event) => {
                        if (event.detail === 0 || pointerKind.current === "mouse") return;
                        setActive((value) => (value === craft.id ? null : craft.id));
                      }}
                    >
                      <span className="font-latin text-xs tracking-[0.22em] text-[#9AA6B0]">{craft.number}</span>
                      <span className="mt-2 block font-display text-[clamp(1.85rem,2.6vw,2.6rem)] leading-none text-[#F4F7F8]">
                        {craft.title}
                      </span>
                      <span className="mt-3 block max-w-md text-sm leading-relaxed text-[#C5D0D8]">{craft.body}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-8 text-sm tracking-[0.12em] text-[#9AA6B0]">可以打包，也可以单点。</p>
            <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
              <a className="link-line" href={packageMail}>
                打包咨询
              </a>
              <a className="link-line" href={singleMail}>
                单点咨询
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
