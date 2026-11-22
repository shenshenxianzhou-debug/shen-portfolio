import { XINPIANCHANG } from "./asset";
import { films, workById } from "./content";
import { Link } from "./router";
import { SiteHeader } from "./SiteHeader";
import "./pages.css";

export function WorkPage({ kind, id }: { kind: "photo" | "film"; id: string }) {
  if (kind === "photo") {
    const work = workById(id);
    if (!work) return <Missing />;
    return (
      <div className="work-page">
        <SiteHeader />
        <article className="frame">
          <Link className="back" to="/portfolio">
            返回作品集
          </Link>
          <h1>{work.title}</h1>
          <p>{work.category}</p>
          <div className="shots">
            {work.images.map((image) => (
              <figure key={image.slug}>
                <img src={image.full} alt={image.title} width={image.width} height={image.height} />
                {image.title !== work.title ? <figcaption>{image.title}</figcaption> : null}
              </figure>
            ))}
          </div>
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
