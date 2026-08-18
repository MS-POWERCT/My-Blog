---
title: vhAstro-Theme评论系统：兜兜转转最后选了Twikoo+Netlify.md
categories: Code
tags:
  - 评论
  - Twikoo
  - Netlify
id: comment-twikoo-netlify
cover: "/assets/images/banner/745978cb4b533956.webp"
date: 2026-08-17 21:17
---

这篇不是教程，部署流程直接去看 **[Twikoo 官方文档 - Netlify 部署](https://twikoo.js.org/backend.html#netlify)**，写得比我清楚。我主要记录一下自己在几个方案之间**来回折腾的过程**，以及最后真正部署时**踩到的 2 个坑**，给后面打算走同一条路的人提个醒。

## 几个方案怎么选的，为什么最后是 Netlify

评论系统选的时候我把常见的几个都过了一遍，有的只瞟了一眼，有的真走了几步卡住了。

### Waline + Cloudflare D1 ❌（卡在某一步没过去）

最开始是想跟主题作者一样用 Waline，毕竟官方推荐。跟着文档走：建 D1 数据库 → 初始化三张 SQL 表 → 一键部署 Workers → 配环境变量 → 绑 D1 绑定…步骤特别多，而且文档里写的变量名和按钮名字，跟 Cloudflare 控制台实际显示的对不上（比如 `D1_ID` 到底填数据库名还是数据库 ID？绑定时变量名到底叫 `D1_DATABASE` 还是别的？）。折腾了两次评论区都是空白，Console 有报错但又查不到具体原因。太耗时间，放弃。

### Vercel 版 Twikoo ❌（第一次就没过）

一键部署按钮点进去第一次 fork 失败，重建之后 MongoDB Atlas 连接一直不通。可能是 Vercel 免费节点到 MongoDB 的网络不稳。另外 `*.vercel.app` 这个域名在国内也偶尔打不开，就算部署成功了用户体验也有风险，就没再继续试。

### 腾讯云开发 TCB（TCB云开发） ⚠️（没敢用）

2025 年之后 TCB 的免费额度基本没了，新用户只有很短的免费期，之后是按量计费。个人博客评论量其实不大，但一想到"万一哪天被爬虫刷了几千次 Function 调用，收到几毛钱甚至几块钱的账单"就头大。不想被账单追着跑，作罢。

### 最后选了 Netlify 版 Twikoo ✅

选它三个原因：

- **完全免费**，Netlify Functions 每月 10 万次调用额度，个人博客怎么用都够
- 一键部署模板 + MongoDB Atlas M0 免费集群，配置项最少（只要一个 `MONGODB_URI` 环境变量）
- `*.netlify.app` 国内虽然慢一点，但可以绑自己的子域名解决，出问题的概率比 Vercel 低

---

## 我踩过的 2 个坑（这两条就是这篇文章存在的意义）

官方文档写得很顺，但没把一些"看起来理所当然"的事情重点标出来。**我部署了两次才成功，全都栽在下面这两条。**

### 坑 1：在 Atlas 创建数据库时请求会失败，多点几次就过了

在 MongoDB Atlas 那边建集群、建数据库用户的时候，网页经常弹"请求失败"或者按钮一直转圈不动。第一次遇到的时候我以为是自己的网络或者操作错了，回头又把流程检查了一遍。

后来发现就是 Atlas 那边的接口偶发抽风，**多试几次就行**：点几下"Retry"，或者干脆把弹窗关掉重新点一遍"Create"。我大概折腾了四五次之后突然就成功了，中间没有任何其他操作。

如果一直失败，可以换个时间段再试，或者开个代理换个节点，基本都能过。

### 坑 2：MongoDB 连接字符串里的 `<password>` 不是摆样子

拿到 Atlas 的连接字符串长这样：

```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**必须手动替换：**

- `<username>` → 换成你创建集群时新建的**数据库用户名**（不是你登录 Atlas 的邮箱）
- `<password>` → 换成数据库用户的**密码**（不是 Atlas 登录密码），并且**把尖括号 `<` `>` 也删掉**

第一次我替换错了（把密码写成了 Atlas 登录密码，不是数据库用户的），Functions 日志里全是 `Authentication failed`，评论区加载不出来，删了 Netlify 站点重建一次才发现是这里。

---

## 最后博客怎么填

部署成功、访问 `https://你的netlify站点名.netlify.app/.netlify/functions/twikoo` 看到「Twikoo 云函数运行正常」之后，在主题配置里填：

```ts
Comment: {
  Twikoo: {
    enable: true,
    // 要写完整的 Functions 路径，不要省 /.netlify/functions/twikoo
    envId: 'https://你的netlify站点名.netlify.app/.netlify/functions/twikoo'
  },
  Waline: {
    enable: false,
    serverURL: ''
  }
}
```

再去 `https://你的netlify站点名.netlify.app/` 注册第一个管理员账号就完了。

反垃圾建议开「评论频率限制」+「首次发言审核」，足够挡住小广告；觉得 `netlify.app` 国内访问慢可以绑自己的子域名，官方文档有写。

---

## 一条最短 Checklist（照着勾）

- [ ] MongoDB Atlas 建 M0 Free + 建数据库用户（**请求失败就多点几次**）
- [ ] 连接字符串 `<username>` / `<password>` **真的替换了，没有尖括号**
- [ ] Netlify 一键部署后，加 **`MONGODB_URI`** 环境变量
- [ ] 访问 Functions 路径能看到「运行正常」
- [ ] 博客配置填好 envId，发一条测试评论

这个顺序来，基本一次就能过，不用像我删了重建两次 🙃
