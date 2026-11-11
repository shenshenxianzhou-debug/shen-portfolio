(function () {
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelectorAll(".nav__links a");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll(".reveal, .reveal-lines").forEach((el) => {
    const delay = el.getAttribute("data-delay");
    if (delay) el.style.setProperty("--delay", delay);
  });

  requestAnimationFrame(() => document.body.classList.add("is-ready"));

  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 16);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
    document.body.style.overflow = open ? "hidden" : "";
  };

  toggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  links.forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });

  const observeIn = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observeIn.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
  );
  document.querySelectorAll(".reveal-up").forEach((el) => observeIn.observe(el));

  const chapter = document.querySelector("#film");
  const video = document.querySelector("#onset-video");
  const replay = document.querySelector(".chapter__replay");

  if (video && chapter) {
    const playWhenReady = () => {
      const play = video.play();
      if (play && typeof play.then === "function") {
        play.then(() => chapter.classList.add("is-playing")).catch(() => {});
      } else {
        chapter.classList.add("is-playing");
      }
    };

    video.addEventListener("ended", () => {
      chapter.classList.add("is-ended");
      replay.hidden = false;
    });

    replay.addEventListener("click", () => {
      replay.hidden = true;
      chapter.classList.remove("is-ended");
      video.currentTime = 0;
      playWhenReady();
    });

    if (!reduced) {
      const watch = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (video.ended) return;
              playWhenReady();
            } else if (!video.ended && !video.paused) {
              video.pause();
            }
          });
        },
        { threshold: 0.45 }
      );
      watch.observe(chapter);
    }
  }

  const form = document.querySelector("#inquire");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = (form.elements.name.value || "").trim();
      const message = (form.elements.message.value || "").trim();
      const subject = encodeURIComponent("拍摄咨询" + (name ? " · " + name : ""));
      const body = encodeURIComponent((name ? "称呼：" + name + "\n\n" : "") + message);
      window.location.href = "mailto:185204359@qq.com?subject=" + subject + "&body=" + body;
    });
  }
})();
