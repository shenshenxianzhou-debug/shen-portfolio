import { useEffect, useRef, useState } from "react";
import { EMAIL, MAILTO } from "./asset";
import { deskStills, skills, socials, software } from "./content";
import { SkillIcon, SoftIcon } from "./icons";

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

function useCopy(value: string) {
  const [copied, setCopied] = useState(false);
  const [hint, setHint] = useState("");
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("unavailable");
      await navigator.clipboard.writeText(value);
      setHint("");
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setHint("可以选择复制");
    }
  };

  return { copied, hint, copy };
}

export function About() {
  const emailCopy = useCopy(EMAIL);

  return (
    <section id="about" className="chapter about-chapter">
      <div className="about-frame">
        <div className="about-layout">
          <div className="desk-strip">
            {deskStills.map((still) => (
              <figure key={still.id} data-still={still.id}>
                <picture>
                  <source srcSet={still.webp} type="image/webp" />
                  <img src={still.jpg} alt={still.alt} width={864} height={1152} decoding="async" />
                </picture>
              </figure>
            ))}
          </div>

          <div className="identity-card">
            <h2 className="identity-title">
              沈现周<span className="identity-en">/shenxianzhou</span>
            </h2>
            <p className="identity-meta">33 years / Chengdu / 成都</p>
            <p className="identity-bio">
              成都美食摄影师与导演，影像工作约九年。独立完成宣传片从策划、分镜、拍摄到剪辑调色的全流程，服务餐饮品牌的菜品主视觉与动态影像。
            </p>

            <h3 className="block-title">使用软件&amp;Use Soft</h3>
            <ul className="soft-grid">
              {software.map((item) => (
                <li key={item.name}>
                  <SoftIcon id={softIcon[item.name] ?? "ai"} />
                  <p className="item-label">{item.name}</p>
                  <p className="item-body">
                    {item.name.includes(item.zh) ? item.body : `${item.zh}，${item.body}`}
                  </p>
                </li>
              ))}
            </ul>

            <h3 className="block-title">我的技能&amp;My skills</h3>
            <ul className="skill-grid">
              {skills.map((item, index) => (
                <li key={item.en}>
                  <SkillIcon id={skillIcon[index] ?? "short"} />
                  <p className="item-label">
                    {item.zh}
                    <span> | {item.en}</span>
                  </p>
                  <p className="item-body">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="strip-note">预先渲染的形象，坐在调色台前。不是实时画面。</p>
      </div>

      <div id="contact" className="collab">
        <div className="about-frame">
          <h2 className="collab-title">
            <span>想要与我合作？</span>
            <span>请联系我</span>
          </h2>
          <p className="collab-note">可以整包，也可以单点导演、摄影、剪辑或调色。不公示价格。</p>
          <a className="outline-pill" href={MAILTO}>
            写信
          </a>
          <p className="collab-modes">
            <a href={packageMail}>打包</a>
            <a href={singleMail}>单点</a>
          </p>
          <p className="sr-only" aria-live="polite">
            {emailCopy.copied ? "邮箱地址已复制" : emailCopy.hint}
          </p>
          {emailCopy.hint ? <p className="hint">{emailCopy.hint}</p> : null}

          <ul className="social-row">
            {socials.map((item) => (
              <SocialItem key={item.label} label={item.label} value={item.value} />
            ))}
            <li>
              <p>邮箱</p>
              <a href={MAILTO}>{EMAIL}</a>
              <button type="button" aria-label="复制邮箱" onClick={() => void emailCopy.copy()}>
                <MailGlyph />
              </button>
            </li>
          </ul>
          <p className="colophon">灵活的左撇子</p>
        </div>
      </div>
    </section>
  );
}

function SocialItem({ label, value }: { label: string; value: string }) {
  const { copied, copy } = useCopy(value);
  return (
    <li>
      <p>{label}</p>
      <span>{value}</span>
      <button type="button" aria-label={copied ? `${label}已复制` : `复制${label}`} onClick={() => void copy()}>
        <CopyGlyph />
      </button>
    </li>
  );
}

function CopyGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden>
      <rect x="5" y="5" width="8" height="8" rx="1.4" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M4 11V3.5A1.5 1.5 0 0 1 5.5 2H11" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function MailGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden>
      <rect x="1.5" y="3.2" width="13" height="9.6" rx="1.4" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2 4.2 8 9l6-4.8" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
