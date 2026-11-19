import { useEffect, useState, type AnchorHTMLAttributes, type MouseEvent } from "react";

export const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export function pathOf(pathname = window.location.pathname) {
  let path = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
  if (!path.startsWith("/")) path = `/${path}`;
  path = path.replace(/\/$/, "");
  return path || "/";
}

export function href(path: string) {
  return `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

export function go(path: string) {
  const next = href(path);
  if (`${window.location.pathname}${window.location.search}` !== next) {
    history.pushState({}, "", next);
  }
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo(0, 0);
}

export function migrateLegacyHash() {
  const hash = window.location.hash;
  if (hash === "#about" || hash === "#contact") {
    history.replaceState(null, "", `${href("/about")}${hash === "#contact" ? "#contact" : ""}`);
    return;
  }
  if (hash === "#gallery" || hash === "#films") {
    history.replaceState(null, "", `${href("/portfolio")}${hash === "#films" ? "#films" : ""}`);
    return;
  }
  if (hash === "#top" || hash === "#fields") {
    history.replaceState(null, "", href("/"));
  }
}

export function usePath() {
  const [path, setPath] = useState(() => pathOf());
  useEffect(() => {
    const sync = () => setPath(pathOf());
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  return path;
}

export function Link({
  to,
  onClick,
  ...props
}: { to: string } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const click = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    go(to);
  };
  return <a href={href(to)} onClick={click} {...props} />;
}
