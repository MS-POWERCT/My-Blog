---
title: Mac 批量压缩图片工具推荐：几款真正免费的「赛博菩萨」
categories: Code
tags:
  - Mac
  - 图片压缩
  - 工具推荐
  - 开源
id: mac-batch-image-compress-tools
cover: "/assets/images/banner/745978cb4b533956.webp"
date: 2026-08-26 22:45
---

最近在整理博客配图，一批 JPG 原图体积偏大。App Store 里试了几个「图片压缩大师」，基本都是用几次就要订阅；网页工具要么不能批量，要么要上传、速度慢。

整理了一下目前在 Mac 上**真正免费、可批量**的方案，分享给同样被收费套路折磨过的朋友。

## 先说结论：怎么选

| 需求                         | 推荐                                                                                                     |
| ---------------------------- | -------------------------------------------------------------------------------------------------------- |
| 省心、永久免费、拖文件夹就行 | [ImageOptim](https://imageoptim.com/mac)                                                                 |
| 要调质量、看压缩前后对比     | [Caesium](https://github.com/Lymphatus/caesium-v3)                                                       |
| 每天几十张、要 GUI 预览      | [Optimage](https://optimage.app/)（免费版约 24 张/天）                                                   |
| 量大、要自动化、最快         | [caesiumclt](https://github.com/Lymphatus/caesium-clt) 或 [jpegoptim](https://github.com/tjko/jpegoptim) |
| 转 WebP 给博客用             | [ffmpeg](https://ffmpeg.org/) 或 Caesium                                                                 |
| 零安装                       | macOS 自动操作 / 快速操作                                                                                |

---

## 一、GUI 应用（赛博菩萨级）

### 1. [ImageOptim](https://imageoptim.com/mac) — 老牌、完全免费

- **下载**：[官网](https://imageoptim.com/mac) · [GitHub](https://github.com/ImageOptim/ImageOptim) · [命令行文档](https://imageoptim.com/command-line.html) · [ImageOptim-CLI](https://www.npmjs.com/package/imageoptim-cli)
- **协议**：GPL 开源，无次数限制、无订阅
- **特点**：拖文件夹进去即可批量处理；默认偏**无损**（去 EXIF、重编码），画质基本不变
- **格式**：JPEG / PNG / GIF / SVG
- **想要更小**：偏好设置里打开 **Lossy minification**（有损模式）

**适合**：博客配图、网站静态资源，压完直接替换原文件。

**命令行批量**（处理整个目录）：

```bash
# 异步打开 GUI 处理
open -a ImageOptim /path/to/your/images

# 脚本里同步等待完成
/Applications/ImageOptim.app/Contents/MacOS/ImageOptim /path/to/folder/*.jpg
```

> ⚠️ 默认会**覆盖原文件**，重要图片请先备份。

---

### 2. [Caesium Image Compressor](https://github.com/Lymphatus/caesium-v3) — 现代界面、可调质量

- **下载**：[GitHub Releases](https://github.com/Lymphatus/caesium-v3/releases) · [网页版](https://caesium.app/)
- **协议**：开源
- **平台**：macOS / Windows / Linux
- **特点**：批量拖入、压缩前后对比、可调质量、可改尺寸
- **格式**：JPG / PNG / WebP / TIFF

**适合**：手机拍的大 JPG，想压狠一点又先看效果再导出。

---

### 3. [Optimage](https://optimage.app/) — 免费版够用

- **下载**：[官网](https://optimage.app/)
- **免费额度**：约 24 张/天
- **格式**：JPEG / PNG / WebP / HEIC / GIF / TIFF / SVG 等
- **特点**：界面友好，批量方便

**适合**：量不大、想要 GUI 预览；每天几十张以内。

---

## 二、命令行工具（量大、最快）

### 4. [caesiumclt](https://github.com/Lymphatus/caesium-clt)（Caesium 命令行版）

- **下载**：[GitHub Releases](https://github.com/Lymphatus/caesium-clt/releases)

开源 Rust 工具，批量速度快，可指定质量、保留原文件。

```bash
# 安装：Homebrew 或 GitHub Release
# brew install caesiumclt

# 质量 80，输出到 compressed 目录
caesiumclt -q 80 -o ./compressed --suffix _opt *.jpg
```

---

### 5. [oxipng](https://github.com/shssoichiro/oxipng) + [jpegoptim](https://github.com/tjko/jpegoptim)（极客向）

- **下载**：[oxipng](https://github.com/shssoichiro/oxipng) · [jpegoptim](https://github.com/tjko/jpegoptim) · 也可 `brew install oxipng jpegoptim`

全是开源工具，适合写脚本反复跑。

```bash
brew install oxipng jpegoptim

# PNG 无损
oxipng -o 4 --strip all *.png

# JPEG（质量 82 左右，博客够用）
jpegoptim --strip-all --max=82 *.jpg
```

---

### 6. [ffmpeg](https://ffmpeg.org/) — 批量转 WebP

- **下载**：[官网](https://ffmpeg.org/download.html) · 也可 `brew install ffmpeg`

博客进一步减小体积，WebP 很常用。

```bash
for f in *.jpg; do
  ffmpeg -i "$f" -quality 80 "${f%.jpg}.webp"
done
```

---

## 三、系统自带（零安装）

### 7. macOS「自动操作 / 快速操作」

在「自动操作」里创建一个 **批量更改图像类型 / 大小** 的工作流，在 Finder 里右键文件夹即可批量处理。

**缺点**：压缩率一般，不如 ImageOptim / Caesium 专业。

---

## 四、不太建议当主力

| 工具                              | 原因                              |
| --------------------------------- | --------------------------------- |
| [Squoosh](https://squoosh.app/)   | 单张调参很好，**不支持真正批量**  |
| [TinyPNG](https://tinypng.com/)   | 要上传，慢，有 session 限制       |
| [JPEGmini](https://jpegmini.com/) | 免费版约 50 张/天，长期用仍有限制 |
| App Store 各类「压缩大师」        | 常见套路：试用几次 → 订阅         |

---

## 五、博客配图实战流程

以博客 `public/assets/images/` 下的 JPG 为例，可以这样操作：

1. **第一轮**：ImageOptim 整文件夹拖进去，无损压一轮，安全、免费
2. **还太大**：Caesium 质量设 **75–85**，看预览再批量导出
3. **长期维护**：装 `jpegoptim` 或 `caesiumclt`，新图一条命令处理

**质量参考**：

- **82–85**：博客正文配图，肉眼几乎无差别
- **75–80**：列表缩略图、对体积更敏感时
- **90+**：需要保留细节的大图

---

_最后更新：2026-08-26_
