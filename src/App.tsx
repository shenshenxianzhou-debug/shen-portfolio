import { useEffect } from "react";
import { About } from "./About";
import { HomePage } from "./Home";
import { PortfolioPage } from "./Portfolio";
import { usePath } from "./router";
import { WorkPage } from "./Work";

export default function App() {
  const path = usePath();

  useEffect(() => {
    if (path === "/about" && window.location.hash === "#contact") {
      document.getElementById("contact")?.scrollIntoView();
    }
  }, [path]);

  const work = path.match(/^\/work\/(photo|film)\/([^/]+)$/);
  if (work) {
    return <WorkPage kind={work[1] as "photo" | "film"} id={decodeURIComponent(work[2])} />;
  }
  if (path === "/about") return <About />;
  if (path === "/portfolio") return <PortfolioPage />;
  return <HomePage />;
}
