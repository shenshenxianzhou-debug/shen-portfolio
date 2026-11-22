import { EMAIL, MAILTO, XINPIANCHANG } from "./asset";
import { collectionSections, films, homeSlides, socials, works } from "./content";
import { Link } from "./router";
import { SiteHeader } from "./SiteHeader";
import "./pages.css";
import "./cv.css";

export function PortfolioPage() {
  return (
    <div className="portfolio">
      <SiteHeader />
      <main>
        <div className="portfolio-wrap">
          <section className="portfolio-hero">
            <img src={homeSlides[0].full} alt="" />
            <div>
              <h1>PORTFOLIO | 作品集</h1>
              <p>用镜头讲述食物的故事</p>
            </div>
          </section>

          <section className="collection" id="films">
            <h2>Dynamic Collection | 动态集</h2>
            <p className="collection-note">三支已发布的影片，打开新片场原页。</p>
            <ul className="work-grid">
              {films.map((film) => (
                <li key={film.id}>
                  <Link className="work-card film-card" to={`/work/film/${film.index}`}>
                    <figure>
                      <div className="film-face">{film.index}</div>
                    </figure>
                    <h3>影片 {film.index}</h3>
                    <p>{film.id}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {collectionSections.map((section) => {
            const items = works.filter((work) => work.category === section.category);
            return (
              <section className="collection" id={section.id} key={section.id}>
                <h2>{section.heading}</h2>
                <p className="collection-note">共 {items.length} 组。</p>
                <ul className="work-grid">
                  {items.map((work) => {
                    const cover = work.images[0];
                    return (
                      <li key={work.id}>
                        <Link className="work-card" to={`/work/photo/${work.id}`}>
                          <figure>
                            <picture>
                              <source srcSet={cover.thumbWebp} type="image/webp" />
                              <img src={cover.thumb} alt={work.title} loading="lazy" decoding="async" />
                            </picture>
                          </figure>
                          <h3>{work.title}</h3>
                          <p>{work.category}</p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>

        <div className="cv" id="contact">
          <div className="cv-collab">
            <div>
              <p className="cv-line">想要与我合作？</p>
              <p className="cv-line2">请联系我</p>
            </div>
            <a className="cv-call" href={MAILTO}>
              写信
            </a>
          </div>
          <ul className="cv-socials">
            {socials.map((item) => (
              <li key={item.label}>
                <h3>{item.label}</h3>
                <p>{item.value}</p>
              </li>
            ))}
            <li>
              <h3>邮箱</h3>
              <a href={MAILTO}>{EMAIL}</a>
            </li>
          </ul>
          <p className="cv-foot">
            灵活的左撇子 · <a href={XINPIANCHANG}>新片场</a>
          </p>
        </div>
      </main>
    </div>
  );
}
