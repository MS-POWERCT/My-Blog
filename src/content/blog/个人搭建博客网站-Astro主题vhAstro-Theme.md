---
title: 个人搭建博客网站-Astro主题vhAstro-Theme
categories: Code
tags:
  - 技术
id: astro-blog-vh-theme
cover: /assets/images/banner/article/astro-blog-cover-3.jpg
date: 2026-08-06 12:57
---

最近自己动手搭了一个个人博客，用的是 Astro 的 vhAstro-Theme 主题。整体体验下来还挺顺利的，已经算是流程比较简单的方案了，所以把整个过程记录下来，给同样想搭建博客的朋友做个参考。

## 搭建前的准备

先说在前面：这个博客的搭建全程是**完全免费**的，但需要具备一定的门槛，以下几样东西缺一不可：

1. **会科学上网（翻墙）**：GitHub、Cloudflare 等服务在国内访问不太稳定，需要能够顺畅访问外网。
2. **一个 GitHub 账户**：用来存放博客的代码仓库，也是后续自动部署的数据源。
3. **一个 Cloudflare 账户**：用来免费托管和部署你的博客网站。
4. **会使用 Git**：需要掌握基本的克隆（clone）、提交（commit）、推送（push）操作。如果对命令行不熟悉，强烈建议下载 [GitHub Desktop](https://desktop.github.com/) 桌面应用，用它来可视化管理代码、提交和推送，比敲命令方便很多。
5. **安装 Node.js**：用于运行项目依赖和本地预览。去 [Node.js 官网](https://nodejs.org/) 下载安装即可，安装完成后会自带 npm 包管理工具，后面所有依赖安装和命令都直接用 npm 就行。
6. **会使用 Markdown 写文章**：博客的内容全部以 Markdown 格式编写，这是最基础的要求。

另外，如果你希望网站的网址是一个个性化的域名（比如 `chenyicheng.cn` 这种），那么是需要额外花钱购买域名的。域名的价格因后缀和注册商而异，一般一年几十块不等，常见的有 8 元、20 元、50 元等不同档位。购买域名有两个途径：

- **直接在 Cloudflare 购买**：好处是买完就能用、不用再转接，缺点是支付方式比较麻烦，国内银行卡不一定能直接支付。
- **在阿里云购买**：支付方便，但买完之后需要把域名解析转到 Cloudflare，配置上稍微多几步操作。

如果只是先体验一下，完全可以用 Cloudflare 免费提供的域名，后续再考虑购买自定义域名也不迟。

## 整体流程

阅读完上面的准备工作，其实搭建的大致流程并不复杂。以下就是这个主题开发者（韩小韩）的官方文章和使用文档，我就是直接使用的这个模板：

> [Astro主题-优雅的vhAstro-Theme【使用文档】](https://www.vvhan.com/article/astro-theme-vhastro-theme)

里面有详细的安装和使用教程。我整体装下来还是比较轻松的，下面是我实际操作时的完整步骤。

## 第一步：Fork 主题仓库

首先，打开 vhAstro-Theme 的 GitHub 仓库地址：

> [https://github.com/uxiaohan/vhAstro-Theme](https://github.com/uxiaohan/vhAstro-Theme)

点击页面右上角的 **Fork** 按钮，将这个仓库复制一份到你自己的 GitHub 账户下。这样你就拥有了一个属于自己的博客代码仓库，后续所有的修改都在你自己的仓库中进行。

## 第二步：克隆到本地并配置

Fork 完成后，把你自己的仓库通过 Git 克隆到本地电脑：

```bash
git clone https://github.com/你的用户名/vhAstro-Theme.git
```

克隆下来之后，需要安装项目依赖。进入项目目录，直接用 npm 安装即可（我全程都是用 npm，没有额外下载 pnpm，一样能正常运行）：

```bash
cd vhAstro-Theme
npm install
```

依赖安装完成后，就可以开始配置了。核心的配置文件是 `src/config.ts`，里面包含了网站标题、网站地址、副标题、作者信息、头像、座右铭、导航栏、侧边栏、主题配色等几乎所有可自定义的内容。你需要把这些信息改成自己的，比如：

- `Title`：网站标题，改成你自己的博客名称
- `Site`：网站地址，填你最终部署的域名
- `Author`：作者名称
- `Avatar`：作者头像链接
- `Motto`：网站座右铭
- `Navs`：导航栏菜单项

配置修改完成后，可以在本地预览效果：

```bash
npm run dev
```

浏览器打开 `http://localhost:4321` 就能看到你的博客了，确认没问题再进行下一步。

## 第三步：提交代码到 GitHub

本地配置好之后，需要把修改提交并推送到你自己的 GitHub 仓库。可以用命令行：

```bash
git add .
git commit -m "初始化博客配置"
git push origin main
```

不过我更推荐直接用 [GitHub Desktop](https://desktop.github.com/) 来操作，界面上填一下提交说明、点一下 Push 就搞定了，不用记命令，比敲命令方便太多。后续每次写完文章推送，用 GitHub Desktop 也是一样的流程。

这样你的 GitHub 仓库里就保存了最新的博客代码，接下来就可以进行部署了。

## 第四步：在 Cloudflare 部署

打开 [Cloudflare 控制台](https://dash.cloudflare.com/)，建议直接使用 GitHub 账户登录，这样后面授权最方便。

登录后，进入 **Workers 和 Pages** 页面，点击创建应用，选择 **Pages** 标签页，然后点击 **连接到 Git**（Connect to Git），选择 **Continue with GitHub** 授权。

授权完成后，Cloudflare 会列出你 GitHub 上的所有仓库，选择你刚才 Fork 的 `vhAstro-Theme` 仓库。接下来按照流程设置：

- **构建命令**：填 `npm run build`
- **构建输出目录**：填 `dist`
- **环境变量**：可以添加 `NODE_VERSION` 为 `20` 以确保构建环境兼容

确认后点击部署，Cloudflare 会自动拉取你 GitHub 仓库的代码，进行依赖安装和打包构建。

## 第五步：获取网站地址

部署完成后，Cloudflare 会给你分配一个免费的网站地址，一般比较长，类似这样的格式：

```
myblog.m15397180963.workers.dev
```

这时候你就可以通过访问这个网址来打开你的个人博客了。如果一切正常，恭喜你，博客已经成功上线！

## 写文章与日常更新

博客搭建好之后，日常写文章非常简单。在本地项目目录下，执行以下命令即可创建一篇新文章：

```bash
npm run newpost '文章标题'
```

这会在 `src/content/blog/` 目录下生成一篇新的 Markdown 文件。文章的开头需要填写 Frontmatter 信息，格式如下：

```yaml
---
title: 文章标题
categories: 分类
tags:
  - 标签1
  - 标签2
id: 文章ID
date: 文章创建日期
updated: 文章更新日期
cover: "封面图URL（为空则使用内置随机封面）"
recommend: false # 是否推荐文章
top: false # 是否置顶文章
hide: false # 是否隐藏文章
---
```

在 Frontmatter 下方就可以用 Markdown 语法自由撰写正文了。写好之后，把修改提交推送到 GitHub（同样推荐用 GitHub Desktop 操作）：

```bash
git add .
git commit -m "新增文章：文章标题"
git push origin main
```

推送之后，剩下的工作 Cloudflare 会自动帮你完成——它会检测到仓库更新，自动重新拉取代码、构建打包、部署上线。每次大概等 2 分钟左右，公网上的博客内容就会更新。

## 一些提醒

- **全程免费**：整个搭建过程不需要花一分钱，唯一可能产生费用的就是购买一个自己喜欢的自定义域名来替换掉默认的长域名。
- **绑定自定义域名**：如果你购买了域名，可以在 Cloudflare 的 Pages 设置里添加自定义域名，按照提示添加 DNS 解析记录即可，绑定后就能通过自己的域名访问博客了。
- **部署失败排查**：如果推送后网站没有更新，大概率是你不小心改错了配置或代码导致构建部署失败。可以在 Cloudflare 的部署日志里查看具体报错信息。一般来说，不乱动核心代码、只修改配置和写文章，就不会出问题。

祝大家都能顺利搭起自己的博客，开始记录与分享。

如果需要帮助，联系我：[我的邮箱](mailto:powerct@126.com)

WX:<br/>

<img src="/assets/images/blog/IMG_0539.JPG" width="200" alt="微信" />
