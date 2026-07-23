---
title: vhAstro-Theme 评论功能：Waline部署与配置指南
categories: Code
tags:
  - 评论
  - Waline
id: comment-waline
cover: "/assets/images/banner/745978cb4b533956.webp"
date: 2026-07-17 14:43
---

## 标题

# Waline 评论系统部署指南

vhAstro-Theme 主题集成了 Waline 评论系统，本文介绍如何从零开始免费部署。

## 前置准备

- 一个 LeanCloud 账号（免费）
- 一个 GitHub 账号（用于 Vercel 部署）
- 大约 15 分钟时间

## Twikoo vs Waline

|                      | Twikoo                       | Waline                               |
| -------------------- | ---------------------------- | ------------------------------------ |
| 后端部署             | 腾讯云开发 / Vercel / Docker | Vercel / Cloudflare Workers / Docker |
| 免费方案             | 腾讯云开发（免费额度够用）   | Vercel + LeanCloud                   |
| vhAstro-Theme 兼容性 | 一般                         | 最佳（韩小韩同款）                   |
| 注册门槛             | 需要腾讯云账号               | 需要 LeanCloud 账号                  |

推荐使用 **Waline**，因为 vhAstro-Theme 本身就是韩小韩开发的，和 Waline 的集成最好。

---

## 第一步：注册 LeanCloud 并创建应用

1. 打开 [LeanCloud 控制台](https://www.leancloud.cn)，注册并登录
2. 点击「创建应用」，选择「开发版」（免费）
3. 进入应用 → **设置** → **应用凭证**
4. 记下以下三个信息：
   - `AppID`
   - `AppKey`
   - `REST API 服务器地址`

## 第二步：部署 Waline 后端到 Vercel

1. 打开 Waline GitHub 仓库：https://github.com/walinejs/waline
2. 点击页面上的 **"Deploy to Vercel"** 按钮
3. 跳转到 Vercel 后，填入 LeanCloud 的信息：
   - `LEAN_ID` → 填 AppID
   - `LEAN_KEY` → 填 AppKey
   - `LEAN_SERVER` → 填 REST API 服务器地址
   - `LEAN_SCHEMA` → 填 `waline`
4. 点击 Deploy，等待部署完成
5. 部署成功后，Vercel 会给你一个地址，类似：

```
https://your-waline.vercel.app
```

## 第三步：在主题配置中启用 Waline

打开博客项目的配置文件，找到 Comment 部分，修改为：

```js
Comment: {
  // Twikoo 评论（不用管）
  Twikoo: {
    enable: false,
    envId: ''
  },
  // Waline 评论
  Waline: {
    enable: true,
    serverURL: 'https://your-waline.vercel.app'  // 替换为你的实际地址
  }
}
```

把 `serverURL` 替换为你在第二步获得的 Vercel 地址。

保存后执行 `npm run dev` 本地预览，文章页面底部应该已经出现评论框了。

## 第四步：设置管理员

1. 访问 `https://your-waline.vercel.app/ui`
2. 首次访问会要求注册管理员账号
3. 注册完成后就可以在管理后台管理评论了

## 部署上线

本地确认评论功能正常后：

```bash
git add .
git commit -m "启用 Waline 评论系统"
git push
```

Cloudflare Pages 会自动构建部署，线上博客的评论功能就上线了。

## 常见问题

**Q: 评论框不显示？**

检查 `serverURL` 是否正确填写，地址末尾不要加 `/`。

**Q: 评论提交失败？**

检查 LeanCloud 应用凭证是否填对，确认 LeanCloud 应用处于「开发版」且未过期。

**Q: 想换回 Twikoo 怎么办？**

把 `Waline.enable` 设为 `false`，`Twikoo.enable` 设为 `true`，然后部署 Twikoo 后端，把腾讯云开发的 `envId` 填进去即可。
