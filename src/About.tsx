import { likeness, methodSteps } from "./content";
import { Kicker, Reveal } from "./ui";

export function About() {
  return (
    <section id="about" className="chapter about-chapter">
      <Reveal>
        <Kicker index="04" label="关于" />
        <h2 className="display display-md">我是沈现周。</h2>
      </Reveal>
      <div className="about-grid">
        <Reveal>
          <div className="about-copy">
            <p>成都。影像工作约九年。美食摄影师，编导、导演、摄影师、剪辑与调色。</p>
            <p>
              2021 年至今在四川荟东方餐饮集团任摄影摄像师，服务南堂馆等品牌。宣传片从策划、分镜、拍摄到剪辑、调色，自己做完。菜品主视觉，以及二十四节气内容。
            </p>
            <p>此前做过酒店企划，也做过 VR 全景。</p>
            <p className="tools">Sony A7M4 · DaVinci Resolve · Premiere · After Effects · 4K HDR</p>
          </div>
        </Reveal>
        <Reveal className="about-figure" delay={80}>
          <figure>
            <picture>
              <source srcSet={likeness.webp} type="image/webp" />
              <img className="about-still" src={likeness.jpg} alt={likeness.alt} width={864} height={1152} loading="lazy" decoding="async" />
            </picture>
            <figcaption>预先渲染的形象，依据本人样貌。不是实时画面。</figcaption>
          </figure>
        </Reveal>
      </div>
      <div className="method-row">
        {methodSteps.map((step, index) => (
          <Reveal key={step.number} delay={index * 60}>
            <article>
              <span className="font-latin">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
