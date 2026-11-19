import { useEffect, useState } from "react";
import { Link, pathOf } from "./router";
import "./cv.css";

const links = [
  { to: "/", label: "Home | 主页" },
  { to: "/portfolio", label: "Portfolio | 作品集" },
  { to: "/about", label: "About | 关于我" },
];

export function SiteHeader({ tone = "solid" }: { tone?: "solid" | "overlay" }) {
  const [menu, setMenu] = useState(false);
  const [compact, setCompact] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const path = pathOf();

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <div className={tone === "overlay" ? "cv-bar overlay" : "cv-bar"}>
      <header className={`cv-header${compact ? " is-compact" : ""}`}>
        <Link className="cv-brand" to="/">
          灵活的左撇子
        </Link>
        <nav className="cv-nav" aria-label="主导航">
          {links.map((link) => (
            <Link key={link.to} to={link.to} aria-current={path === link.to ? "page" : undefined}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="cv-tools">
          <button
            type="button"
            className="cv-icon-btn"
            aria-label={theme === "light" ? "切换到深色" : "切换到浅色"}
            onClick={() => setTheme((value) => (value === "light" ? "dark" : "light"))}
          >
            <svg viewBox="0 0 24 24" aria-hidden>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
          <button type="button" className="cv-menu" aria-expanded={menu} onClick={() => setMenu((value) => !value)}>
            {menu ? "关闭" : "Menu"}
            <i />
          </button>
        </div>
      </header>
      {menu ? (
        <nav className="cv-sheet" aria-label="主导航">
          {links.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setMenu(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
