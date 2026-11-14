import { useEffect, useRef, useState } from "react";
import { EMAIL, MAILTO } from "./asset";
import { Arrow, Kicker, Reveal } from "./ui";

const packageMail = `mailto:${EMAIL}?subject=${encodeURIComponent("打包咨询")}`;
const singleMail = `mailto:${EMAIL}?subject=${encodeURIComponent("单点咨询")}`;

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [hint, setHint] = useState("");
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("unavailable");
      await navigator.clipboard.writeText(EMAIL);
      setHint("");
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setHint("邮箱地址可以选择复制");
    }
  };

  return (
    <section id="contact" className="chapter contact-chapter">
      <Reveal>
        <Kicker index="05" label="联系" />
        <h2 className="display display-contact">
          <span>一起拍点</span>
          <span>好吃的。</span>
        </h2>
        <p className="lede">拍摄与影像，欢迎来信。可以打包，也可以单点。</p>
      </Reveal>
      <Reveal delay={80}>
        <a className="email-link font-latin" href={MAILTO}>
          {EMAIL}
        </a>
      </Reveal>
      <div className="ember-bar">
        <p>一个想法，写一封信。</p>
        <a href={MAILTO}>
          写信 <Arrow />
        </a>
        <button type="button" className={copied ? "is-copied" : ""} onClick={() => void copy()}>
          {copied ? "已复制" : "复制"} <Arrow />
        </button>
        <a href={packageMail}>
          打包 <Arrow />
        </a>
        <a href={singleMail}>
          单点 <Arrow />
        </a>
      </div>
      <p className="sr-only" aria-live="polite">
        {copied ? "邮箱地址已复制" : hint}
      </p>
      {hint ? <p className="hint">{hint}</p> : null}
      <footer className="colophon">
        <p>沈现周</p>
        <p className="font-latin">{new Date().getFullYear()}</p>
        <a href="#top">回到顶部</a>
      </footer>
    </section>
  );
}
