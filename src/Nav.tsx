import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks } from "./content";
import { HeroFade, useLockScroll, usePrefersReducedMotion } from "./ui";

export function Nav() {
  const reduce = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const [current, setCurrent] = useState("");
  useLockScroll(open);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const services = document.getElementById("services");
      const about = document.getElementById("about");
      if (services) {
        const rect = services.getBoundingClientRect();
        const aboutTop = about?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
        setOnLight(rect.top < 64 && rect.bottom > 64 && aboutTop > 64);
      }
      const line = window.scrollY + 140;
      let active = "";
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= line) active = link.id;
      }
      setCurrent(active);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const light = onLight && !open;
  const bar = light
    ? "bg-white text-[#0C0C0C]"
    : scrolled || open
      ? "bg-[#0C0C0C]/78 text-[#E7EEF2] backdrop-blur-md"
      : "bg-transparent text-[#E7EEF2]";

  return (
    <HeroFade delay={0.05} y={-12} className="fixed inset-x-0 top-0 z-50">
      <header className={`flex h-16 items-center justify-between px-[clamp(1.25rem,4vw,4.5rem)] transition-colors duration-300 ${bar}`}>
        <a href="#top" className="font-display text-base tracking-[0.18em]">
          沈现周
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="主导航">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              aria-current={current === link.id ? "true" : undefined}
              className={`text-sm tracking-[0.18em] transition-colors ${
                current === link.id
                  ? light
                    ? "text-black"
                    : "text-white"
                  : light
                    ? "text-black/60 hover:text-black"
                    : "text-white/60 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="relative z-[60] grid h-10 w-10 place-items-center md:hidden"
          aria-label={open ? "关闭菜单" : "打开菜单"}
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>
      {open && (
        <nav
          id="nav-links"
          aria-label="主导航"
          className="fixed inset-0 z-40 flex flex-col justify-center gap-6 bg-[#0C0C0C] px-[clamp(1.5rem,6vw,3rem)] md:hidden"
        >
          {navLinks.map((link, index) => (
            <a
              key={link.id}
              href={link.href}
              className="font-display text-[clamp(2rem,8vw,3rem)]"
              style={{ transitionDelay: reduce ? "0ms" : `${index * 40}ms` }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </HeroFade>
  );
}
