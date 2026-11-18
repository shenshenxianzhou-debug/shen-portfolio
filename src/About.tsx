import { useEffect, useRef, useState } from "react";
import { EMAIL, MAILTO } from "./asset";
import { deskStills, skills, socials, software } from "./content";
import { Arrow, Kicker, Reveal } from "./ui";

const packageMail = `mailto:${EMAIL}?subject=${encodeURIComponent("打包咨询")}`;
const singleMail = `mailto:${EMAIL}?subject=${encodeURIComponent("单点咨询")}`;

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
      <div className="about-layout">
        <div className="desk-strip">
          {deskStills.map((still) => (
            <figure key={still.id}>
              <picture>
                <source srcSet={still.webp} type="image/webp" />
                <img src={still.jpg} alt={still.alt} width={1200} height={1500} loading="lazy" decoding="async" />
              </picture>
            </figure>
          ))}
          <p className="strip-note">预先渲染的形象，坐在调色台前。不是实时画面。</p>
        </div>

        <div className="identity-card">
          <Reveal>
            <Kicker index="04" label="关于" />
            <h2 className="display display-md identity-title">
              <span>沈现周</span>
              <span className="identity-en">shenxianzhou</span>
            </h2>
            <p className="identity-meta">
              <span className="font-latin">33 years</span>
              <span aria-hidden>/</span>
              <span>Chengdu · 成都</span>
            </p>
            <p className="lede">
              成都美食摄影师与导演，影像工作约九年。独立完成宣传片从策划、分镜、拍摄到剪辑调色的全流程，服务餐饮品牌的菜品主视觉与动态影像。
            </p>
          </Reveal>

          <Reveal delay={40}>
            <h3 className="block-title">
              使用软件 <span>& Use Soft</span>
            </h3>
            <ul className="soft-grid">
              {software.map((item) => (
                <li key={item.mark + item.name}>
                  <span className="soft-mark" aria-hidden>
                    {item.mark}
                  </span>
                  <div>
                    <p className="soft-name">
                      {item.zh}
                      <span>{item.name}</span>
                    </p>
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={80}>
            <h3 className="block-title">
              我的技能 <span>& My skills</span>
            </h3>
            <ul className="skill-grid">
              {skills.map((item) => (
                <li key={item.en}>
                  <p className="skill-name">
                    {item.zh}
                    <span>{item.en}</span>
                  </p>
                  <p>{item.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <div id="contact" className="collab">
        <Reveal>
          <h2 className="display display-contact">
            <span>想要与我合作？</span>
            <span>请联系我</span>
          </h2>
          <p className="lede">可以整包，也可以单点导演、摄影、剪辑或调色。不公示价格。</p>
        </Reveal>
        <div className="collab-mail">
          <a className="email-link font-latin" href={MAILTO}>
            {EMAIL}
          </a>
          <button type="button" className={`pill${emailCopy.copied ? " is-on" : ""}`} onClick={() => void emailCopy.copy()}>
            {emailCopy.copied ? "已复制" : "复制邮箱"} <Arrow />
          </button>
          <a className="text-link" href={MAILTO}>
            写信 <Arrow />
          </a>
          <a className="text-link" href={packageMail}>
            打包 <Arrow />
          </a>
          <a className="text-link" href={singleMail}>
            单点 <Arrow />
          </a>
        </div>
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
          </li>
        </ul>
        <footer className="colophon">
          <p>灵活的左撇子</p>
          <p className="font-latin">{new Date().getFullYear()}</p>
          <a href="#top">回到顶部</a>
        </footer>
      </div>
    </section>
  );
}

function SocialItem({ label, value }: { label: string; value: string }) {
  const { copied, copy } = useCopy(value);
  return (
    <li>
      <p>{label}</p>
      <div>
        <span>{value}</span>
        <button type="button" onClick={() => void copy()}>
          {copied ? "已复制" : "复制"}
        </button>
      </div>
    </li>
  );
}
