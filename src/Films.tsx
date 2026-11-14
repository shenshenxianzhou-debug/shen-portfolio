import { films, profileHref } from "./content";
import { Arrow, Kicker, Reveal } from "./ui";

export function Films() {
  return (
    <section id="films" className="chapter">
      <Reveal>
        <Kicker index="03" label="影片" />
        <h2 className="display display-md">三支片子</h2>
        <p className="lede">按原来的顺序，在新片场打开。这里不另起名字。</p>
      </Reveal>
      <div className="film-grid">
        {films.map((film, index) => (
          <Reveal key={film.href} delay={index * 80}>
            <a className="film-card" href={film.href} target="_blank" rel="noopener noreferrer">
              {/* Official frame drops in as an <img> inside this figure later. */}
              <figure className="film-poster" data-film={film.id} />
              <div className="film-copy">
                <span className="font-latin film-no">{film.index}</span>
                <h3>影片</h3>
                <span className="text-link">
                  在新片场打开 <Arrow />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <a className="text-link profile-link" href={profileHref} target="_blank" rel="noopener noreferrer">
          新片场主页 <Arrow />
        </a>
      </Reveal>
    </section>
  );
}
