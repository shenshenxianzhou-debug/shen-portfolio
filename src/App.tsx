import { useState } from "react";
import { EMAIL, MAILTO } from "./asset";
import { About } from "./About";
import { Carousel } from "./Carousel";
import { Catalog } from "./Catalog";
import { Hero } from "./Hero";
import { Lightbox } from "./Lightbox";
import { Marquee } from "./Marquee";
import { Nav } from "./Nav";
import { Services } from "./Services";
import { ContactButton, FadeIn } from "./ui";

export default function App() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="overflow-x-clip bg-[#0C0C0C] text-[#E7EEF2]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        跳到主要内容
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Carousel />
        <Marquee onOpen={setActive} />
        <Catalog onOpen={setActive} />
        <Services />
        <About />
        <section
          id="contact"
          className="px-[clamp(1.25rem,4vw,4.5rem)] pb-24 pt-8 md:pb-32"
        >
          <FadeIn y={20}>
            <h2 className="hero-heading font-display text-[clamp(3rem,7vw,6rem)] font-semibold leading-[0.95]">
              联系
            </h2>
            <p className="mt-5 max-w-md text-[#C5D0D8]">拍摄、短片与品牌影像，欢迎来信。</p>
            <a
              href={MAILTO}
              className="font-latin mt-8 inline-block text-[clamp(1.25rem,2vw,1.8rem)] font-light tracking-wide text-[#E7EEF2]"
            >
              {EMAIL}
            </a>
            <p className="mt-3 text-sm tracking-[0.14em] text-[#9AA6B0]">成都</p>
            <div className="mt-8">
              <ContactButton>写信</ContactButton>
            </div>
          </FadeIn>
        </section>
      </main>
      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-[clamp(1.25rem,4vw,4.5rem)] py-6 text-sm tracking-[0.06em] text-[#9AA6B0]">
        <p>© 2026 沈现周</p>
        <a href={MAILTO}>{EMAIL}</a>
        <a href="https://www.xinpianchang.com/u10948584" target="_blank" rel="noopener noreferrer">
          新片场主页
        </a>
        <a href="#top">回到顶部</a>
      </footer>
      <Lightbox index={active} onChange={setActive} />
    </div>
  );
}
