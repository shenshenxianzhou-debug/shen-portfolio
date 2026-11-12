import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navLinks } from "./content";
import { useLockScroll } from "./ui";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState("");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  useLockScroll(open);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const line = window.scrollY + 96;
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
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const bar = scrolled || open ? "bg-[#0C0C0C]/84 backdrop-blur-md" : "bg-transparent";

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <header className={`shell relative z-50 flex h-16 items-center justify-between text-[#E7EEF2] transition-colors duration-300 ${bar}`}>
        <a href="#top" className="font-display text-base tracking-[0.18em]">
          沈现周
        </a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="主导航">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              aria-current={current === link.id ? "true" : undefined}
              className={`text-sm tracking-[0.16em] ${
                current === link.id ? "text-white" : "text-white/55 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button
          ref={toggleRef}
          type="button"
          className="grid h-11 w-11 place-items-center md:hidden"
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
          className="fixed inset-0 z-40 flex flex-col justify-center gap-6 bg-[#0C0C0C] px-[var(--shell)] pt-20 md:hidden"
        >
          {navLinks.map((link, index) => (
            <a
              key={link.id}
              ref={index === 0 ? firstLinkRef : undefined}
              href={link.href}
              className="font-display text-[clamp(2rem,8vw,3rem)]"
              onClick={() => setOpen(false)}
            >
              <span className="font-latin mr-4 align-middle text-sm tracking-[0.18em] text-[#9AA6B0]">
                {String(index + 1).padStart(2, "0")}
              </span>
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
