import { useEffect, useState } from "react";
import { navLinks } from "./content";
import { Arrow, useLockScroll } from "./ui";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("");
  useLockScroll(open);

  useEffect(() => {
    const onScroll = () => {
      const line = window.scrollY + 120;
      let active = "";
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (!el) continue;
        if (el.offsetTop <= line) active = link.id;
      }
      setCurrent(active);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="nav-wrap">
      <header className="nav shell">
        <a href="#top" className="wordmark font-display">
          沈现周
        </a>
        <nav className="nav-links" aria-label="主导航">
          {navLinks.map((link) => (
            <a key={link.id} href={link.href} aria-current={current === link.id ? "true" : undefined}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="pill" href="#gallery">
          看作品 <Arrow />
        </a>
        <button
          type="button"
          className="menu-btn"
          aria-label={open ? "关闭菜单" : "打开菜单"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "关闭" : "菜单"}
        </button>
      </header>
      {open && (
        <nav className="nav-sheet" aria-label="主导航">
          {navLinks.map((link) => (
            <a key={link.id} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
