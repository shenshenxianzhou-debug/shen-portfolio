import { useEffect, useId, useRef, useState } from "react";
import { EMAIL, MAILTO } from "./asset";
import { deskStills, skills, socials, software } from "./content";
import { SkillIcon, SoftIcon } from "./icons";
import "./cv.css";

const packageMail = `mailto:${EMAIL}?subject=${encodeURIComponent("打包咨询")}`;
const singleMail = `mailto:${EMAIL}?subject=${encodeURIComponent("单点咨询")}`;

const softIcon: Record<string, string> = {
  "DaVinci Resolve": "resolve",
  "Adobe After Effects": "ae",
  CapCut: "capcut",
  "Adobe Premiere Pro": "pr",
  "Final Cut Pro": "fcp",
  "Adobe Photoshop": "ps",
  "AI 工具": "ai",
};

const skillIcon = ["photo", "edit", "grade", "ai", "film", "direct", "event", "short"] as const;

const links = [
  { href: "#top", label: "Home | 主页" },
  { href: "#gallery", label: "Portfolio | 作品集" },
  { href: "#about", label: "About | 关于我", current: true },
];

function useCopy(value: string) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };
  return { copied, copy };
}

export function About() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menu, setMenu] = useState(false);
  const [compact, setCompact] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLDialogElement>(null);
  const searchId = useId();

  const catalog = [
    ...software.map((item) => ({ id: `soft-${item.name}`, label: `${item.zh} ${item.name}`, text: item.body })),
    ...skills.map((item) => ({ id: `skill-${item.en}`, label: `${item.zh} ${item.en}`, text: item.body })),
    ...socials.map((item) => ({ id: `social-${item.label}`, label: item.label, text: item.value })),
    { id: "contact", label: "邮箱", text: EMAIL },
  ];
  const found = query.trim()
    ? catalog.filter((item) => `${item.label} ${item.text}`.toLowerCase().includes(query.trim().toLowerCase()))
    : catalog;

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jump = (id: string) => {
    searchRef.current?.close();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="cv" data-theme={theme}>
      <header className={`cv-header${compact ? " is-compact" : ""}`}>
        <a className="cv-brand" href="#top">
          灵活的左撇子
        </a>
        <nav className="cv-nav" aria-label="主导航">
          {links.map((link) => (
            <a key={link.href} href={link.href} aria-current={link.current ? "page" : undefined}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="cv-tools">
          <button
            type="button"
            className="cv-icon-btn"
            aria-label={theme === "light" ? "切换到深色" : "切换到浅色"}
            onClick={() => setTheme((value) => (value === "light" ? "dark" : "light"))}
          >
            <SunIcon />
          </button>
          <button type="button" className="cv-icon-btn" aria-label="搜索" onClick={() => searchRef.current?.showModal()}>
            <SearchIcon />
          </button>
          <button
            type="button"
            className="cv-menu"
            aria-expanded={menu}
            aria-label={menu ? "关闭菜单" : "打开菜单"}
            onClick={() => setMenu((value) => !value)}
          >
            {menu ? "关闭" : "Menu"}
            <i />
          </button>
        </div>
      </header>
      {menu ? (
        <nav className="cv-sheet" aria-label="主导航">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenu(false)}>
              {link.label}
            </a>
          ))}
        </nav>
      ) : null}

      <main className="cv-main" id="about">
        <div className="cv-wrap">
          <div className="cv-spacer" />
          <div className="cv-card">
            <div className="cv-photos">
              {deskStills.map((still) => (
                <figure key={still.id} data-still={still.id}>
                  <picture>
                    <source srcSet={still.webp} type="image/webp" />
                    <img src={still.jpg} alt={still.alt} width={864} height={1152} />
                  </picture>
                </figure>
              ))}
            </div>
            <div className="cv-copy">
              <h1 className="cv-name">
                <span className="cv-name-zh">沈现周</span>
                <span className="cv-name-en">/shenxianzhou</span>
              </h1>
              <p className="cv-meta">33 years / Chengdu / 成都</p>
              <p className="cv-bio">
                成都美食摄影师与导演，影像工作约九年。独立完成宣传片从策划、分镜、拍摄到剪辑调色的全流程，服务餐饮品牌的菜品主视觉与动态影像。
              </p>
              <div className="cv-rule" />
              <h2 className="cv-h2">使用软件&amp;Use Soft</h2>
              <ul className="cv-grid">
                {software.map((item) => (
                  <li key={item.name} id={`soft-${item.name}`}>
                    <span className="cv-ico">
                      <SoftIcon id={softIcon[item.name] ?? "ai"} />
                    </span>
                    <h3>{item.name}</h3>
                    <p>{item.name.includes(item.zh) ? item.body : `${item.zh}。${item.body}`}</p>
                  </li>
                ))}
              </ul>
              <h2 className="cv-h2">我的技能&amp;My skills</h2>
              <ul className="cv-grid">
                {skills.map((item, index) => (
                  <li key={item.en} id={`skill-${item.en}`}>
                    <span className="cv-ico">
                      <SkillIcon id={skillIcon[index] ?? "short"} />
                    </span>
                    <h3>
                      {item.zh} | {item.en}
                    </h3>
                    <p>{item.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="cv-collab" id="contact">
          <div>
            <p className="cv-line">想要与我合作？</p>
            <p className="cv-line2">请联系我</p>
          </div>
          <a className="cv-call" href={MAILTO}>
            写信
          </a>
        </div>
        <p className="cv-modes">
          <a href={packageMail}>打包</a>
          <a href={singleMail}>单点</a>
        </p>

        <ul className="cv-socials">
          {socials.map((item) => (
            <Social key={item.label} label={item.label} value={item.value} />
          ))}
          <li id="social-邮箱">
            <h3>邮箱</h3>
            <a href={MAILTO}>{EMAIL}</a>
            <MailButton />
          </li>
        </ul>
        <p className="cv-foot">灵活的左撇子</p>
      </main>

      <button type="button" className="cv-top" aria-label="回到顶部" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        ↑
      </button>

      <dialog className="cv-search" ref={searchRef} aria-labelledby={searchId} onClose={() => setQuery("")}>
        <h2 id={searchId} className="cv-h2">
          搜索
        </h2>
        <input
          autoFocus
          value={query}
          placeholder="软件、技能或联系方式"
          onChange={(event) => setQuery(event.target.value)}
        />
        {found.length ? (
          <ul>
            {found.map((item) => (
              <li key={item.id}>
                <button type="button" onClick={() => jump(item.id)}>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="cv-empty">没有匹配</p>
        )}
        <button type="button" onClick={() => searchRef.current?.close()}>
          关闭
        </button>
      </dialog>
    </div>
  );
}

function Social({ label, value }: { label: string; value: string }) {
  const { copied, copy } = useCopy(value);
  return (
    <li id={`social-${label}`}>
      <h3>{label}</h3>
      <p>{value}</p>
      <button type="button" className="cv-round" aria-label={copied ? `${label}已复制` : `复制${label}`} onClick={() => void copy()}>
        <CopyIcon />
      </button>
    </li>
  );
}

function MailButton() {
  const { copied, copy } = useCopy(EMAIL);
  return (
    <button type="button" className="cv-round" aria-label={copied ? "邮箱已复制" : "复制邮箱"} onClick={() => void copy()}>
      <CopyIcon />
    </button>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M16.57 16.15A9 9 0 1 0 15 17.46h0l6.25 6.25 1.42-1.42Zm-3-.14a7.07 7.07 0 1 1 1.56-1.28 6.88 6.88 0 0 1-1.56 1.28Z" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
      <rect x="5" y="5" width="8" height="8" rx="1.4" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M4 11V3.5A1.5 1.5 0 0 1 5.5 2H11" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
