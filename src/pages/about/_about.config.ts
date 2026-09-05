/**
 * 关于我 页面配置 (/about)
 * ----------------------------------------------------------------
 * 这个文件只服务于「关于」页面，所有内容修改都在这里。
 * 改完后保存，astro dev 会自动热更新；线上重新 build 即可。
 */

export interface AboutConfig {
  /** Banner 标题 */
  BannerTitle: string;
  /** Banner 副标题 */
  BannerSubtitle: string;
  /** 头像路径（关于页已不再展示，保留字段无效果） */
  Avatar: string;
  /** 昵称 */
  Nickname: string;
  /** 职业 / 一句话身份 */
  JobTitle: string;
  /** 一句话欢迎语 */
  Hello: string;
  /** 个人标签胶囊 */
  Tags: string[];
  /** 出生日期 (用于自动计算年龄 / 已度过天数) */
  BirthDay: string;
  /** 自我介绍段落 (每一项都是一段, 支持 HTML) */
  Intro: string[];
  /** 技术理念卡片 */
  Beliefs: { icon: string; title: string; text: string }[];
  /** 未来方向 列表 */
  Future: string[];
  /** 技能树 (名字 + 熟练度 0-100, 自动画进度条) */
  Skills: { name: string; value: number }[];
  /** 个人小站点 */
  Sites: { name: string; link: string; highlight?: boolean }[];
  /** 联系渠道 */
  Contacts: { label: string; value: string; link: string }[];
  /** 成长时间线 */
  Timeline: { date: string; title: string; desc: string }[];
}

const about: AboutConfig = {
  // ===== Banner =====
  BannerTitle: '.Cheng',
  BannerSubtitle: '不曾与你分享的时间, 我在认真生活.',
  Avatar: '',

  // ===== 基本信息 =====
  Nickname: '.Cheng',
  JobTitle: '一个热爱生活、音乐与旅行的全栈开发者',
  Hello: 'Hi there, I’m Cheng 👋',
  Tags: [
    '🌱 全栈开发',
    '📚 终身学习',
    '✈️ 旅行收集',
    '🎮 偶尔的游戏党',
  ],
  // 用于自动计算年龄 / 已度过天数
  BirthDay: '1998-05-19',

  // ===== 自我介绍 =====
  Intro: [
    '我是 陈义程，一位对技术充满一些热情、涉猎广泛的探索者，同时也是一名热衷于把生活细节记录下来的普通人。',
    '并将我的知识与经验分享在我的博客中。前端工程、后端开发、AI 应用、自动化脚本、个人服务器、凡是能把「想象」变成「现实」的东西我都喜欢。',
    '我相信优秀的技术人不仅要有深度，更要有广度，因此我不断学习，并将其转化为实际的作品和解决方案。在这里我会分享我的见解、日常和学习中的整理总结。',
    '<strong>在 Web 开发方面</strong>，我熟悉 Vue  生态圈，关注现代 CSS、Astro 等构建工具，以及前端性能优化、代码质量与工程化。',
    '<strong>在后端与云计算领域</strong>，我使用 PHP 开发服务端，也长期接触Nginx、Linux 运维、Cloudflare / 阿里云 等边缘计算与 CDN 方案。',
    '<strong>在 AI 与自动化上</strong>，我尝试把 LLM 嵌入到工作流，辅助文档、代码优化和内容生成，并把自律打卡、QQ 农场等想法做成了真正能用的小产品。',
  ],

  // ===== 技术理念 =====
  Beliefs: [
    { icon: '🚀', title: '持续学习', text: '技术日新月异，保持开放心态，学习新工具，并评估其落地价值。' },
    { icon: '🛠️', title: '实践驱动', text: '无论是个人项目还是开源贡献，都倾向于动手实践，不停留在纸面。' },
    { icon: '⚡', title: '效率优先', text: '注重自动化与工具链，减少重复劳动，把精力留给有趣的事情。' },
  ],

  // ===== 未来方向 =====
  Future: [
    'AI 增强开发 — 探索 LLM 在代码生成、调试和日常中的落地',
    'Homelab 完善 — 搭建更完善的家庭服务与自动化',
    '内容创作 — 持续写作，记录生活，沉淀经验',
  ],

  // ===== 技能树 =====
  Skills: [
    // { name: 'JavaScript / TypeScript', value: 85 },
    { name: 'Vue.js',                 value: 61 },
    { name: 'PHP / Laravel',          value: 78 },
    { name: 'Node.js',                value: 75 },
    { name: 'Astro / 静态站点',        value: 80 },
    { name: 'MySQL / Redis',          value: 72 },
    { name: 'Docker / Linux 运维',     value: 68 },
    { name: 'AI Prompt & 工作流应用',  value: 74 },
  ],

  // ===== 个人小站点 =====
  Sites: [
    { name: '主页',    link: 'https://point.chenyicheng.cn',  highlight: true },
    { name: '博客',    link: 'https://www.chenyicheng.cn',  highlight: true },
    { name: '自律青年', link: 'https://m.powerct.cn/', highlight: true},
    { name: '文字农场', link: 'https://farm.powerct.cn/', highlight: true},
    { name: '红飞阁木业', link: 'https://hfg.powerct.cn/', highlight: true },
  ],

  // ===== 联系渠道 =====
  Contacts: [
    { label: '微信',     value: 'Valar_Morghulis426', link: '' },
    { label: 'QQ',       value: '2446762079',          link: 'https://wpa.qq.com/msgrd?v=3&uin=2446762079&site=qq&menu=yes' },
    { label: 'Email',    value: 'powerct@126.com',   link: 'mailto:powerct@126.com' },
    // { label: 'GitHub',   value: 'MS-POWERCT',          link: 'https://github.com/MS-POWERCT' },
    { label: '所在地',   value: '江西 · 上饶',          link: '' },
  ],

  // ===== 成长时间线 =====
  Timeline: [
    { date: '2026-07', title: '新博客启程',         desc: '基于 Astro + vhAstro-Theme 主题，重新搭建个人博客，开启写作之旅。' },
    { date: '2026-06', title: '文字农场上线',       desc: '结合 AI 能力，一款复古文字风的 QQ 农场小游戏，1.0 版本发布。' },
    { date: '2026-06', title: '自律打卡 App',       desc: '结合 AI 能力，完成全栈个人自律打卡应用的 1.0 发布。' },
    { date: '2024-01', title: '无比寻常的工作',         desc: '工作总是无聊的，但是我必须工作。成年人大部分时间在工作和工作的路上。' },
    // { date: '2024-00', title: '个人 Homelab 搭建',  desc: '基于 Docker / Linux 维护个人服务器、图床、反向代理等基础设施。' },
    { date: '2023-03', title: '旅业拾遗 · 小公司的六个月', desc: '短暂加入一家小型旅行社，虽然公司只存续了半年就停摆了，却是我离「旅行」这个词最近的一段时光。期间了解了跟团游、自由行、半自由行的门道，也把国内外大大小小的景点、线路、签证套路记了一本子。原来诗和远方的背后，全是落地、签单、排期的人间烟火。' },
    { date: '2021-03', title: '准备启程 · 拥抱加密浪潮', desc: '那时候链上火得发烫，身边几个朋友都在扎进 Web3 的世界。坐而论道不如起而行之，我决定也躬身入局，和他们一起研究区块链技术。这段经历让我第一次真切理解到「去中心化」这四个字的重量。' },
    { date: '2018-12', title: '步入社会 · 蛰伏期', desc: '毕业后的第一站，是一家做工业机器自动化的公司。一待就是两年，那段日子里我学会了如何在快节奏的生产线上沉下心、扎下根——不急躁，不喧哗，像一颗种子在暗处默默积攒破土的力气。' },
    { date: '2017-08', title: '踏上编程之路',       desc: '正式开始接触软件开发，从 Java 到现代全栈一路跌跌撞撞。' },
  ],
};

export default about;
