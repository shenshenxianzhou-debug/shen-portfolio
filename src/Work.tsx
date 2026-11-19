import { XINPIANCHANG } from "./asset";
import { films, photos } from "./content";
import { Link } from "./router";
import { SiteHeader } from "./SiteHeader";
import "./pages.css";

export function WorkPage({ kind, id }: { kind: "photo" | "film"; id: string }) {
  if (kind === "photo") {
    const index = Number(id) - 1;
    const photo = photos[index];
    if (!photo) return <Missing />;
    return (
      <div className="work-page">
        <SiteHeader />
        <article className="frame">
          <Link className="back" to="/portfolio">
            返回作品集
          </Link>
          <img src={photo.src} alt={photo.alt} />
          <h1>{photo.alt.split("，")[0]}</h1>
          <p>{photo.alt}</p>
        </article>
      </div>
    );
  }

  const film = films.find((item) => item.index === id);
  if (!film) return <Missing />;
  return (
    <div className="work-page">
      <SiteHeader />
      <article className="frame">
        <Link className="back" to="/portfolio">
          返回作品集
        </Link>
        <h1>影片 {film.index}</h1>
        <p>成片发布在新片场，编号 {film.id}。</p>
        <p>
          <a href={film.href}>在新片场打开</a>
        </p>
        <p>
          <a href={XINPIANCHANG}>作者主页</a>
        </p>
      </article>
    </div>
  );
}

function Missing() {
  return (
    <div className="work-page">
      <SiteHeader />
      <article className="frame">
        <h1>没有这件作品</h1>
        <Link to="/portfolio">返回作品集</Link>
      </article>
    </div>
  );
}
