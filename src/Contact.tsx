import { useEffect, useRef, useState } from "react";
import { EMAIL, MAILTO } from "./asset";
import { Chapter } from "./ui";

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
    <section id="contact" className="section shell border-t border-white/10">
      <div className="frame max-w-4xl">
        <Chapter index="05" label="联系" />
        <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-[#C5D0D8]">
          拍摄、短片与品牌影像，欢迎来信。
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a href={MAILTO} className="email-link font-latin">
            {EMAIL}
          </a>
          <button type="button" className={`copy-btn${copied ? " is-copied" : ""}`} onClick={() => void copy()}>
            {copied ? "已复制" : "复制"}
          </button>
        </div>
        <p className="sr-only" aria-live="polite">
          {copied ? "邮箱地址已复制" : hint}
        </p>
        {hint ? <p className="mt-4 text-sm text-[#9AA6B0]">{hint}</p> : null}
        <p className="mt-12 text-sm tracking-[0.22em] text-[#9AA6B0]">成都</p>
      </div>
    </section>
  );
}
