import catalog from "./data/works.json";
import { asset, XINPIANCHANG } from "./asset";

export type Photo = {
  src: string;
  thumb: string;
  alt: string;
};

export type WorkCategory = "菜品" | "场景" | "饮品";

export type WorkImage = {
  slug: string;
  title: string;
  full: string;
  thumb: string;
  thumbWebp: string;
  width: number;
  height: number;
};

export type Work = {
  id: string;
  title: string;
  allTitles: string[];
  category: WorkCategory;
  images: WorkImage[];
};

type Catalog = {
  home_slider: string[];
  works: {
    id: string;
    title: string;
    all_titles: string[];
    category: WorkCategory;
    images: {
      slug: string;
      title: string;
      full_w: number;
      full_h: number;
    }[];
  }[];
};

const data = catalog as Catalog;

const fullUrl = (slug: string) => asset(`assets/photos/${slug}.jpg`);
const thumbUrl = (slug: string) => asset(`assets/photos/thumbs/${slug}.jpg`);
const thumbWebpUrl = (slug: string) => asset(`assets/photos/thumbs/${slug}.webp`);

export const works: Work[] = data.works.map((work) => ({
  id: work.id,
  title: work.title,
  allTitles: work.all_titles,
  category: work.category,
  images: work.images.map((image) => ({
    slug: image.slug,
    title: image.title,
    full: fullUrl(image.slug),
    thumb: thumbUrl(image.slug),
    thumbWebp: thumbWebpUrl(image.slug),
    width: image.full_w,
    height: image.full_h,
  })),
}));

const imageIndex = new Map<string, { work: Work; image: WorkImage }>();
for (const work of works) {
  for (const image of work.images) imageIndex.set(image.slug, { work, image });
}

export const collectionSections: { id: string; category: WorkCategory; heading: string }[] = [
  { id: "dishes", category: "菜品", heading: "Dish Collection | 菜品" },
  { id: "scenes", category: "场景", heading: "Scene Collection | 场景" },
  { id: "drinks", category: "饮品", heading: "Drink Collection | 饮品" },
];

export type HomeSlide = {
  slug: string;
  title: string;
  alt: string;
  category: WorkCategory;
  full: string;
  workId: string;
};

export const homeSlides: HomeSlide[] = data.home_slider.map((slug) => {
  const hit = imageIndex.get(slug);
  if (!hit) throw new Error(`home_slider slug missing from works: ${slug}`);
  return {
    slug,
    title: hit.work.title,
    alt: hit.image.title,
    category: hit.work.category,
    full: hit.image.full,
    workId: hit.work.id,
  };
});

export function workById(id: string) {
  return works.find((work) => work.id === id);
}

export const photos: Photo[] = works.flatMap((work) =>
  work.images.map((image) => ({
    src: image.full,
    thumb: image.thumbWebp,
    alt: image.title,
  })),
);

export const deskStills = [
  {
    id: "front",
    jpg: asset("assets/character/davinci/01-front.jpg"),
    webp: asset("assets/character/davinci/01-front.webp"),
    alt: "灵活的左撇子的预先渲染形象坐在调色台前，面向镜头。不是实时画面。",
  },
  {
    id: "side",
    jpg: asset("assets/character/davinci/02-side.jpg"),
    webp: asset("assets/character/davinci/02-side.webp"),
    alt: "灵活的左撇子的预先渲染形象侧坐在桌前，双手放在鼠标和键盘上。不是实时画面。",
  },
  {
    id: "lean",
    jpg: asset("assets/character/davinci/03-lean.jpg"),
    webp: asset("assets/character/davinci/03-lean.webp"),
    alt: "灵活的左撇子的预先渲染形象俯身靠近调色台。不是实时画面。",
  },
  {
    id: "scopes",
    jpg: asset("assets/character/davinci/04-scopes.jpg"),
    webp: asset("assets/character/davinci/04-scopes.webp"),
    alt: "灵活的左撇子的预先渲染形象坐在椅中，目光转向镜头。不是实时画面。",
  },
] as const;

export const software = [
  { mark: "DR", name: "DaVinci Resolve", zh: "达芬奇", body: "剪辑与调色，可输出 4K HDR。" },
  { mark: "Ae", name: "Adobe After Effects", zh: "AE", body: "基础特效与包装。" },
  { mark: "剪", name: "CapCut", zh: "剪映", body: "短视频剪辑与平台发布。" },
  { mark: "Pr", name: "Adobe Premiere Pro", zh: "PR", body: "成片剪辑与结构。" },
  { mark: "FC", name: "Final Cut Pro", zh: "Final Cut", body: "剪辑与成片。" },
  { mark: "Ps", name: "Adobe Photoshop", zh: "PS", body: "菜品修图与背景处理。" },
  { mark: "AI", name: "AI 工具", zh: "AI", body: "写脚本、替换菜品背景、生成 AI 短片。" },
] as const;

export const skills = [
  { zh: "美食拍摄", en: "Food photography", body: "用光影突出菜品质感，平衡中式美学与现代感。" },
  { zh: "视频剪辑", en: "Video editing", body: "宣传片、短视频与成片结构。" },
  { zh: "视频调色", en: "Colour grading", body: "在达芬奇里完成色彩与质感。" },
  { zh: "AI 动画特效", en: "AI animation", body: "用 AI 辅助脚本、换背景与短片生成，再和 After Effects 做基础包装。" },
  { zh: "影视合作", en: "Film collaboration", body: "可按项目打包，也可单点导演、摄影、剪辑或调色，不公示价格。" },
  { zh: "编导策划", en: "Directing", body: "从策划、分镜到拍摄的全流程导演工作。" },
  { zh: "活动跟拍", en: "Event coverage", body: "新品发布、周年庆、开业等现场跟拍。" },
  { zh: "短视频策划", en: "Short-form", body: "抖音、视频号等内容策划，含节气与套餐向内容。" },
] as const;

export const socials = [
  { label: "抖音", value: "sxz18280476826" },
  { label: "微信", value: "sxzjiayou" },
  { label: "QQ", value: "185204359" },
] as const;

export const films = [
  { index: "01", id: "a13871490", href: "https://www.xinpianchang.com/a13871490" },
  { index: "02", id: "a13871473", href: "https://www.xinpianchang.com/a13871473" },
  { index: "03", id: "a13871467", href: "https://www.xinpianchang.com/a13871467" },
] as const;

export const profileHref = XINPIANCHANG;

export const fields = [
  {
    number: "01",
    title: "美食摄影",
    body: "菜品与现场。新店、季节菜，以及端上桌的那一盘。",
    href: "#gallery",
    label: "进入画廊",
  },
  {
    number: "02",
    title: "影像作品",
    body: "新片场上的三支影片，按原来的顺序打开。",
    href: "#films",
    label: "看影片",
  },
  {
    number: "03",
    title: "导演与剪辑",
    body: "从策划、分镜、拍摄到剪辑。可以整包，也可以单点。",
    href: "#contact",
    label: "约这一项",
  },
  {
    number: "04",
    title: "调色",
    body: "收拾颜色和质感，成片可以输出 4K HDR。",
    href: "#contact",
    label: "约这一项",
  },
] as const;

export const methodSteps = [
  { number: "01", title: "策划分镜", body: "先把要拍的定下来。" },
  { number: "02", title: "拍摄用光", body: "把光用在食物上。" },
  { number: "03", title: "剪辑结构", body: "按成片的结构来剪。" },
  { number: "04", title: "调色质感", body: "最后收拾颜色。" },
] as const;

export const navLinks = [
  { href: "#top", id: "top", en: "Home", zh: "主页" },
  { href: "#gallery", id: "gallery", en: "Portfolio", zh: "作品集" },
  { href: "#about", id: "about", en: "About", zh: "关于我" },
] as const;

export const marquee = ["烟火有光", "FOOD", "FILM", "COLOUR", "一口热气，也值得被看见"] as const;
