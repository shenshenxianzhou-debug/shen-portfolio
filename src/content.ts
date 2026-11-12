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

export const character = {
  hero: {
    still: asset("assets/character/hero-camera.jpg"),
    video: asset("assets/character/hero-camera.mp4"),
    alt: "沈现周的预先渲染形象立在画面右侧，手持相机对着镜头，左侧是深色空白",
  },
  food: {
    still: asset("assets/character/food-set.jpg"),
    video: asset("assets/character/food-set.mp4"),
    alt: "沈现周的预先渲染形象立在画面左侧，身旁是中式菜品与蒸汽，右侧是深色空白",
  },
  grading: {
    still: asset("assets/character/grading.jpg"),
    alt: "沈现周的预先渲染形象坐在调色台前，画面左侧是深色空白",
  },
  rim: {
    still: asset("assets/character/rimlight.jpg"),
    video: asset("assets/character/rimlight.mp4"),
    alt: "沈现周的预先渲染形象，暖色轮廓光下的半身，黑色高领与外套，银色开口吊坠",
  },
  pose: {
    still: asset("assets/character/apose.jpg"),
    alt: "沈现周的预先渲染全身形象，黑色高领、炭灰外套、相机斜挎，黑鞋带有红色鞋底",
  },
};

export const films = [
  { index: "01", href: "https://www.xinpianchang.com/a13871490" },
  { index: "02", href: "https://www.xinpianchang.com/a13871473" },
  { index: "03", href: "https://www.xinpianchang.com/a13871467" },
] as const;

export const profileHref = XINPIANCHANG;

export const aboutParagraphs = [
  "美食摄影师，编导 / 导演 / 摄影师 / 剪辑师 / 调色师。影像工作约九年。",
  "2021 年 7 月起任职四川荟东方餐饮集团，服务南堂馆等品牌。独立完成宣传片从策划、分镜、拍摄到剪辑调色的全流程；主导拍摄超 200 道菜品主视觉与动态视频；负责抖音、视频号与二十四节气内容，并跟拍新品发布、周年庆与开业现场。",
  "亦承担品牌菜品照片（新店与季节菜品），以及抖音来客套餐、大众点评套餐与门店平板点餐等内容运营。工作中会使用 AI 辅助写脚本、替换菜品照片背景、生成短片。",
];

export const tools = "Sony A7M4 · DaVinci Resolve · Premiere · After Effects · 4K HDR";

export const services = [
  {
    number: "01",
    title: "导演",
    body: "策划、分镜，再到现场的一盏灯。宣传片从策划走到开拍。",
  },
  {
    number: "02",
    title: "摄影",
    body: "菜品与现场的拍摄。新店、季节菜品，以及端上桌的那一盘。",
  },
  {
    number: "03",
    title: "剪辑",
    body: "剪辑是节奏。",
  },
  {
    number: "04",
    title: "调色",
    body: "调色是呼吸。在夜色里，把温度留在画面上。",
  },
];

export type Medium = "photos" | "video";

export type Category = {
  id: string;
  label: string;
  populated: boolean;
};

export const photoCategories: Category[] = [
  { id: "portrait", label: "人像", populated: false },
  { id: "city", label: "风光 · 城市", populated: false },
  { id: "food", label: "美食", populated: true },
  { id: "product", label: "商业 · 产品", populated: false },
  { id: "street", label: "纪实 · 街拍", populated: false },
];

export const videoCategories: Category[] = [
  { id: "ads", label: "广告 · 宣传片", populated: false },
  { id: "docs", label: "纪录片 · 微电影", populated: false },
  { id: "shorts", label: "短视频", populated: false },
  { id: "dining", label: "美食 · 餐饮", populated: true },
];

export const navLinks = [
  { href: "#work", id: "work", label: "作品" },
  { href: "#services", id: "services", label: "服务" },
  { href: "#about", id: "about", label: "关于我" },
  { href: "#contact", id: "contact", label: "联系" },
];
