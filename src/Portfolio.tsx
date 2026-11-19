import { EMAIL, MAILTO, XINPIANCHANG } from "./asset";
import { films, photos, socials } from "./content";
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
            <img src={photos[0].thumb} alt="" />
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

          <section className="collection" id="projects">
            <h2>Project Collection | 项目集</h2>
            <p className="collection-note">已完成的美食摄影，共 {photos.length} 张。</p>
            <ul className="work-grid">
              {photos.map((photo, index) => {
                const id = String(index + 1).padStart(2, "0");
                return (
                  <li key={photo.src}>
                    <Link className="work-card" to={`/work/photo/${id}`}>
                      <figure>
                        <img src={photo.thumb} alt={photo.alt} />
                      </figure>
                      <h3>{photo.alt.split("，")[0]}</h3>
                      <p>美食摄影</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="collection" id="fragments">
            <h2>Fragment Collection | 碎片集</h2>
            <p className="collection-note">这一组还没有作品，之后上传。</p>
          </section>
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
