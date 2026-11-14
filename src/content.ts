import { asset, XINPIANCHANG } from "./asset";

export type Photo = {
  src: string;
  thumb: string;
  alt: string;
};

const file = (name: string, alt: string): Photo => ({
  src: asset(`assets/photos/${name}`),
  thumb: asset(`assets/photos/thumbs/${name.replace(/\.jpg$/, ".webp")}`),
  alt,
});

export const photos: Photo[] = [
  file("01-claypot-stew.jpg", "砂锅中的炖肉与萝卜，热气升腾，顶上铺着香菜"),
  file("02-chili-fish-buns.jpg", "白瓷盘中一份红油浇汁的菜肴正在冒热气，旁有竹笼馒头"),
  file("03-steamed-dumplings.jpg", "竹蒸笼里两只黄皮烧麦，背景是南堂馆的蒸笼"),
  file("04-four-steamers.jpg", "四只南堂馆竹蒸笼，分别盛着糯米、烧卖、豆豉排骨和粉蒸肉"),
  file("05-chef-mixing-hotpot.jpg", "厨师戴黑手套，在炉上用夹子翻拌一锅配菜与肉"),
  file("06-sliced-meats-broth.jpg", "厨师将切好的肉片盛入正在加热的汤锅，旁有一列小料碟"),
  file("07-pickle-jar-garlic.jpg", "厨师从陶坛中舀出泡蒜，前景是红辣椒和泡菜碟"),
  file("08-chef-pickle-jars.jpg", "厨师在酒柜前，把一条鱼放入装满辣椒的玻璃泡菜坛"),
  file("09-wooden-steamer.jpg", "工作人员揭开木质大蒸桶，蒸汽中可见正在蒸的菜肴"),
  file("10-chef-opening-jar.jpg", "戴厨师帽的厨师正在开启一只大型陶坛"),
  file("11-peppercorn-mill.jpg", "石磨研磨青花椒，一碗花椒油接在磨口下"),
  file("12-chef-tossing-wok.jpg", "厨师将热气腾腾的菜肴舀入大碗"),
  file("13-chili-dish-carving.jpg", "一双手正在切开铺满干辣椒的菜肴，白瓷盘下有暖光"),
  file("14-fish-soup-greens.jpg", "红墙前砂锅汤在炉上翻滚，旁有一盘绿叶菜与鱼片"),
  file("15-steamed-buns-steam.jpg", "木质大蒸笼揭开，雪白的馒头热气升腾"),
  file("16-hanging-roast-duck.jpg", "钩子吊起一只刚出炉的烤鸭，四周是蒸汽"),
  file("17-steamed-date-cake.jpg", "竹蒸笼里切块的红枣发糕，背景还有一笼同样的点心"),
];

export const likeness = {
  webp: asset("assets/character/shen-expr-default.webp"),
  jpg: asset("assets/character/shen-expr-default.jpg"),
  alt: "沈现周的预先渲染半身形象，黑色高领与外套，手按在衣襟，银色开口吊坠",
};

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
  { href: "#gallery", id: "gallery", label: "作品" },
  { href: "#fields", id: "fields", label: "领域" },
  { href: "#films", id: "films", label: "影片" },
  { href: "#about", id: "about", label: "关于" },
  { href: "#contact", id: "contact", label: "联系" },
] as const;

export const marquee = ["烟火有光", "FOOD", "FILM", "COLOUR", "一口热气，也值得被看见"] as const;
