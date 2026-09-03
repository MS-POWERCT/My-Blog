# 陈义程博客

个人站点源码仓库，记录生活、音乐、旅行与折腾过的技术。

- 线上地址：[https://www.chenyicheng.cn](https://www.chenyicheng.cn)
- 作者：`.Cheng` · [GitHub](https://github.com/MS-POWERCT)

---

## 关于这个站点

博客创建于 2026 年 7 月，主要分享：

- **生活与回忆** — 如「塔沟那些年」系列、影单、游戏清单等
- **涨知识** — 「五谷 / 五谷之外」等长文，从食物讲历史与地理
- **技术与实践** — Laravel、AI 辅助开发、运维笔记、工具推荐等
- **动态** — 短途旅行、日常片段、项目进展（广深、景德镇等）
- **音乐** — 自托管歌单，支持歌词滚动与全屏歌词（适合车载场景）

关联项目：

| 名称     | 链接                                        |
| -------- | ------------------------------------------- |
| 自律青年 | [m.powerct.cn](https://m.powerct.cn/)       |
| 文字农场 | [farm.powerct.cn](https://farm.powerct.cn/) |

---

## 主要功能

| 模块        | 路径       | 说明                                    |
| ----------- | ---------- | --------------------------------------- |
| 首页 / 文章 | `/`        | Markdown 文章、分类、标签、归档         |
| 动态        | `/talking` | 说说式短内容，支持多图                  |
| 音乐        | `/music`   | 本地 MP3 + LRC 歌词，歌手筛选，全屏歌词 |
| 朋友        | `/links`   | 友情链接                                |
| 留言        | `/message` | Twikoo 评论                             |
| 关于        | `/about`   | 个人介绍与时间线                        |
| 搜索        | 全站       | 本地 JSON 索引                          |

音乐页特性：

- 唱片封面 + 歌词同步滚动
- 自定义播放列表（封面、进度、歌手筛选）
- **全屏歌词模式**：大字号、适合后排观看；支持双击歌词或点击按钮进入

---

## 技术栈

- [Astro](https://astro.build/) 5 · 静态站点生成
- TypeScript · Less
- [Swup](https://swup.js.org/) 页面过渡
- [APlayer](https://aplayer.js.org/) 音频引擎
- [Twikoo](https://twikoo.js.org/) 评论（Netlify Functions）
- Markdown / MDX，支持数学公式（KaTeX）、自定义 directive
- 图片懒加载、Brotli 压缩、Sitemap、RSS

---

## 本地开发

环境要求：**Node.js 18+**（推荐 20+），包管理器 `npm` / `pnpm` / `yarn` 均可。

```bash
# 安装依赖
npm install

# 启动开发服务（默认 http://localhost:4321）
npm run dev

# 生产构建
npm run build

# 预览构建结果
npm run preview
```

新建文章：

```bash
npm run newpost
```

---

## 目录结构

```
├── public/                 # 静态资源（图片、音乐、SVG 等）
│   └── assets/music/       # 音乐文件，按歌手分目录
├── src/
│   ├── config.ts           # 站点全局配置（标题、导航、评论等）
│   ├── content/blog/       # 博客文章（Markdown）
│   ├── page_data/          # 动态、歌单、友链等数据
│   ├── pages/              # 路由页面
│   ├── components/         # 组件
│   ├── layouts/            # 布局
│   └── scripts/            # 客户端脚本（音乐页、搜索等）
├── astro.config.mjs
└── package.json
```

---

## 常用配置

| 文件                               | 用途                                       |
| ---------------------------------- | ------------------------------------------ |
| `src/config.ts`                    | 站点名、域名、导航、主题色、评论、侧边栏等 |
| `src/pages/about/_about.config.ts` | 「关于我」页面内容                         |
| `src/page_data/Talking.ts`         | 动态说说                                   |
| `src/page_data/MusicList.ts`       | 音乐页歌单                                 |
| `src/page_data/Link.ts`            | 友情链接                                   |

### 添加一首歌

1. 将音频与歌词放入 `public/assets/music/{歌手}/`
   - 例如：`周杰伦/稻香.mp3`、`周杰伦/稻香.lrc`（同名即可自动匹配歌词）
2. 在 `src/page_data/MusicList.ts` 增加一条记录：

```ts
{ name: '稻香', artist: '周杰伦', url: '/assets/music/周杰伦/稻香.mp3', cover: '/assets/music/周杰伦/avatar.jpg' }
```

3. 可选：在对应歌手目录下放置 `covers/歌名.jpg` 作为单曲封面。

### 发布动态

编辑 `src/page_data/Talking.ts`，在 `data` 数组顶部追加条目即可。

### 发布文章

在 `src/content/blog/` 新建 `.md` 文件，或使用 `npm run newpost`。文章索引可在 `src/content/blog/_目录.md` 维护。

---

## 部署说明

构建产物输出到 `dist/`，可部署到任意静态托管（Nginx、Cloudflare Pages、Netlify 等）。

- 站点域名在 `src/config.ts` 的 `Site` 字段配置
- Twikoo 评论环境 ID 在同文件 `Comment.Twikoo.envId`
- 构建前请确认 `public/assets/music/` 中音频文件已就位（大体积音频可按 `.gitignore` 规则自行管理）

---

## 联系

- GitHub：[MS-POWERCT](https://github.com/MS-POWERCT)
- 知乎：[陈义程](https://www.zhihu.com/people/chen-yi-cheng-73-60)

欢迎通过博客 [留言板](https://www.chenyicheng.cn/message) 交流。

---

> 青青子衿，悠悠我心。
