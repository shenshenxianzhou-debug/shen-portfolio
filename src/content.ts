import { asset, XINPIANCHANG } from "./asset";

export type Photo = {
  src: string;
  alt: string;
};

const file = (name: string, alt: string): Photo => ({
  src: asset(`assets/photos/${name}`),
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

export const portrait = {
  src: asset("assets/character-portrait.jpg"),
  alt: "沈现周三维形象半身肖像，黑色高领与外套，暖色轮廓光",
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
    title: "美食摄影",
    body: "为餐厅与品牌拍摄菜品主视觉。新店、季节菜品，以及端上桌的那一盘。",
  },
  {
    number: "02",
    title: "影像策划与拍摄",
    body: "策划、分镜，再到现场的一盏灯。宣传片从策划走到开拍。",
  },
  {
    number: "03",
    title: "剪辑与调色",
    body: "剪辑是节奏，调色是呼吸。在夜色里，把温度留在画面上。",
  },
  {
    number: "04",
    title: "编导与现场",
    body: "跟拍新品发布、周年庆与开业。从灯下的一盘，到屏幕上的一度。",
  },
];

export type Project = {
  id: string;
  number: string;
  category: string;
  name: string;
  note: string;
  left: number;
  right: number;
  kind: "stills" | "films";
};

export const projects: Project[] = [
  {
    id: "shoot",
    number: "01",
    category: "现场",
    name: "拍摄",
    note: "先把光找对。策划、分镜，再到现场的一盏灯。",
    left: 9,
    right: 11,
    kind: "stills",
  },
  {
    id: "film",
    number: "02",
    category: "影像",
    name: "影像作品",
    note: "剪辑是节奏，调色是呼吸。三支影片在新片场，按原有顺序打开。",
    left: 7,
    right: 12,
    kind: "films",
  },
  {
    id: "table",
    number: "03",
    category: "美食摄影",
    name: "餐桌",
    note: "食物被端上桌的那一刻。镜头的尽头，是一张桌子。",
    left: 15,
    right: 0,
    kind: "stills",
  },
  {
    id: "steam",
    number: "04",
    category: "美食摄影",
    name: "蒸笼",
    note: "竹蒸笼里的面点与热气。",
    left: 2,
    right: 3,
    kind: "stills",
  },
];

export const navLinks = [
  { href: "#about", id: "about", label: "关于" },
  { href: "#film", id: "film", label: "影像" },
  { href: "#work", id: "work", label: "作品" },
  { href: "#contact", id: "contact", label: "联系" },
];
