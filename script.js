(function () {
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelectorAll(".nav__links a");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduced) document.documentElement.classList.add("has-motion");

  document.querySelectorAll(".reveal, .reveal-lines").forEach((el) => {
    const delay = el.getAttribute("data-delay");
    if (delay) el.style.setProperty("--delay", delay);
  });

  requestAnimationFrame(() => document.body.classList.add("is-ready"));

  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
    document.body.style.overflow = open ? "hidden" : "";
  };

  toggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  links.forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) setMenu(false);
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
    { threshold: 0.16, rootMargin: "0px 0px -6% 0px" }
  );
  document.querySelectorAll(".reveal-up").forEach((el) => observeIn.observe(el));

  if (!reduced) {
    const frames = document.querySelectorAll(".work__item");
    const revealFrame = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            revealFrame.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -4% 0px" }
    );
    frames.forEach((frame) => revealFrame.observe(frame));
  }

  const stops = [
    ["#film", ".nav__links a[href='#film']"],
    ["#work", ".nav__links a[href='#work']"],
    ["#about", ".nav__links a[href='#about']"],
    ["#contact", ".nav__links a[href='#contact']"],
  ]
    .map(([section, link]) => ({
      el: document.querySelector(section),
      link: document.querySelector(link),
    }))
    .filter((stop) => stop.el && stop.link);

  const parallaxNodes = reduced ? [] : document.querySelectorAll("[data-parallax]");
  let ticking = false;

  const update = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 8);

    const line = window.scrollY + window.innerHeight * 0.38;
    let active = null;
    stops.forEach((stop) => {
      const top = stop.el.getBoundingClientRect().top + window.scrollY;
      if (top <= line) active = stop.link;
    });
    links.forEach((link) => {
      if (link === active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });

    if (!reduced) {
      const vh = window.innerHeight || 1;
      parallaxNodes.forEach((el) => {
        const range = Number(el.getAttribute("data-parallax")) || 18;
        const rect = el.getBoundingClientRect();
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        const y = Math.max(-1, Math.min(1, progress)) * -range;
        el.style.transform = "translate3d(0," + y.toFixed(2) + "px,0)";
      });
    }

    ticking = false;
  };

  const requestUpdate = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  update();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });

  const chapter = document.querySelector("#film");
  const video = document.querySelector("#onset-video");
  const replay = document.querySelector(".chapter__replay");

  if (video && chapter && replay) {
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

  const dialog = document.querySelector("#lightbox");
  const openings = document.querySelectorAll(".work__open");
  if (dialog && openings.length) {
    const lightImg = dialog.querySelector(".lightbox__frame img");
    const lightFrame = dialog.querySelector(".lightbox__frame");
    const live = dialog.querySelector(".lightbox__live");
    const nowEl = dialog.querySelector("[data-lightbox-now]");
    const totalEl = dialog.querySelector("[data-lightbox-total]");
    const sources = [...openings].map((link) => link.querySelector("img"));
    let index = 0;

    const pad = (value) => String(value).padStart(2, "0");
    totalEl.textContent = pad(sources.length);

    const show = (next) => {
      index = (next + sources.length) % sources.length;
      const source = sources[index];
      lightImg.src = source.currentSrc || source.src;
      lightImg.alt = source.alt || "";
      nowEl.textContent = pad(index + 1);
      live.textContent = pad(index + 1) + "，共 " + pad(sources.length) + "。" + (source.alt || "");
      lightFrame.classList.remove("is-shown");
      void lightFrame.offsetWidth;
      lightFrame.classList.add("is-shown");
    };

    openings.forEach((link, i) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        show(i);
        dialog.showModal();
      });
    });

    dialog.querySelector("[data-lightbox-close]").addEventListener("click", () => dialog.close());
    dialog.querySelector("[data-lightbox-prev]").addEventListener("click", () => show(index - 1));
    dialog.querySelector("[data-lightbox-next]").addEventListener("click", () => show(index + 1));

    dialog.addEventListener("click", (event) => {
      if (event.target === dialog || event.target === lightFrame) dialog.close();
    });

    dialog.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        show(index + 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        show(index - 1);
      }
    });
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
