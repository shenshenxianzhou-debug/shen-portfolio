import { useState } from "react";
import { About } from "./About";
import { Contact } from "./Contact";
import { Craft } from "./Craft";
import { Hero } from "./Hero";
import { Lightbox } from "./Lightbox";
import { Method } from "./Method";
import { Nav } from "./Nav";
import { Work } from "./Work";

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
        <Craft />
        <Work onOpen={setActive} activePhoto={active} />
        <About />
        <Method />
        <Contact />
      </main>
      <footer className="shell flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-8 text-sm tracking-[0.08em] text-[#9AA6B0]">
        <p>沈现周</p>
        <p className="font-latin">{new Date().getFullYear()}</p>
        <a href="#top" className="hover:text-[#E7EEF2]">
          回到顶部
        </a>
      </footer>
      <Lightbox index={active} onChange={setActive} />
    </div>
  );
}
