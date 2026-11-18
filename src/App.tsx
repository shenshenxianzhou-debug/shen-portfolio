import { useEffect, useState } from "react";
import { About } from "./About";
import { Cursor } from "./Cursor";
import { Fields } from "./Fields";
import { Films } from "./Films";
import { Gallery } from "./Gallery";
import { Hero } from "./Hero";
import { Lightbox } from "./Lightbox";
import { Nav } from "./Nav";
import { Opening } from "./Opening";

function useHash() {
  const read = () => window.location.hash || "#top";
  const [hash, setHash] = useState(read);
  useEffect(() => {
    const onChange = () => setHash(read());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return hash;
}

export default function App() {
  const [active, setActive] = useState<number | null>(null);
  const hash = useHash();
  const aboutView = hash === "#about" || hash === "#contact";

  useEffect(() => {
    if (aboutView) {
      const node = hash === "#contact" ? document.getElementById("contact") : null;
      if (node) node.scrollIntoView();
      else window.scrollTo(0, 0);
      return;
    }
    const id = hash.replace("#", "") || "top";
    if (id === "top") {
      window.scrollTo(0, 0);
      return;
    }
    document.getElementById(id)?.scrollIntoView();
  }, [aboutView, hash]);

  if (aboutView) {
    return (
      <div className="site site-cv">
        <a className="skip-main" href="#about">
          跳到主要内容
        </a>
        <About />
      </div>
    );
  }

  return (
    <div className="site">
      <a className="skip-main" href="#main">
        跳到主要内容
      </a>
      <div className="grid-lines" aria-hidden />
      <div className="grain" aria-hidden />
      <Cursor />
      <Opening />
      <Nav />
      <main id="main">
        <Hero />
        <Gallery onOpen={setActive} />
        <Fields />
        <Films />
      </main>
      <Lightbox index={active} onChange={setActive} />
    </div>
  );
}
