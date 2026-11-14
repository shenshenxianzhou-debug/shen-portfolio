import { useState } from "react";
import { About } from "./About";
import { Contact } from "./Contact";
import { Cursor } from "./Cursor";
import { Fields } from "./Fields";
import { Films } from "./Films";
import { Gallery } from "./Gallery";
import { Hero } from "./Hero";
import { Lightbox } from "./Lightbox";
import { Nav } from "./Nav";
import { Opening } from "./Opening";

export default function App() {
  const [active, setActive] = useState<number | null>(null);

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
        <About />
        <Contact />
      </main>
      <Lightbox index={active} onChange={setActive} />
    </div>
  );
}
