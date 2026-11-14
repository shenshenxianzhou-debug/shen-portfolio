import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./ui";

const KEY = "shen-opening-seen";

export function Opening() {
  const reduce = usePrefersReducedMotion();
  const [live, setLive] = useState(() => {
    if (reduce) return false;
    try {
      return sessionStorage.getItem(KEY) !== "1";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!live) return;
    const finish = () => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* private mode still ends the sequence */
      }
      setLive(false);
    };
    const timer = window.setTimeout(finish, 2300);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [live]);

  if (!live) return null;

  const finishNow = () => {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    setLive(false);
  };

  return (
    <div className="opening" onClick={finishNow}>
      <span className="wisp wisp-a" />
      <span className="wisp wisp-b" />
      <span className="wisp wisp-c" />
      <div className="opening-mark">
        <p className="font-display">沈现周</p>
        <p className="font-latin">SHEN XIANZHOU</p>
      </div>
      <button
        type="button"
        className="skip"
        onClick={(event) => {
          event.stopPropagation();
          finishNow();
        }}
      >
        跳过
      </button>
    </div>
  );
}
