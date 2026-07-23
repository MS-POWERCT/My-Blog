---
title: vhAstro-Theme 圈子功能：FreshRSS 部署与配置指南
categories: Code
tags:
  - FreshRSS
id: fresh-rss
cover: "/assets/images/banner/16062e6599b2ea8b.webp"
date: 2026-07-17 14:53
---

# 重要提现，该内容是通过ai编写的本人并没有实际跑过，目前要完成这个功能是需要一定的技术的他是通过php跑在服务器上的，所以会产生费用，如果你只是想体验一下圈子功能可以使用本地data模式，会轻松很多

vhAstro-Theme 的"圈子"功能可以自动聚合友链博客的最新文章，展示在一个类似朋友圈的动态流页面。本文介绍如何从零部署 FreshRSS 并接入主题。

## 整体架构

```
友链博客的 RSS → FreshRSS（聚合抓取）→ API 接口 → vhAstro-Theme 圈子页面
```

- **FreshRSS**：负责订阅和抓取所有友链博客的 RSS 更新
- **自定义 API**：从 FreshRSS 读取数据，转换为主题需要的格式
- **vhAstro-Theme**：调用 API 展示动态

---

## 第一步：部署 FreshRSS

### 方式一：Docker 部署（推荐）

需要一台服务器（或本地 Docker 环境）。

1. 创建 `docker-compose.yml`：

```yaml
services:
  freshrss:
    image: freshrss/freshrss:latest
    container_name: freshrss
    hostname: freshrss
    restart: unless-stopped
    ports:
      - "8080:80"
    volumes:
      - freshrss_data:/var/www/FreshRSS/data
      - freshrss_extensions:/var/www/FreshRSS/extensions
    environment:
      TZ: Asia/Shanghai
      CRON_MIN: "*/20" # 每 20 分钟更新一次订阅

volumes:
  freshrss_data:
  freshrss_extensions:
```

2. 启动：

```bash
docker compose up -d
```

3. 浏览器打开 `http://你的服务器IP:8080`，按向导完成初始化（选择语言、设置数据库为 SQLite、创建管理员账号）。

### 方式二：虚拟主机部署

如果你的虚拟主机支持 PHP（大部分都支持），可以直接手动安装：

1. 从 [FreshRSS GitHub](https://github.com/FreshRSS/FreshRSS) 下载最新版
2. 解压上传到网站根目录
3. 访问域名，按向导完成安装

---

## 第二步：添加友链博客的 RSS 订阅

1. 登录 FreshRSS 后台
2. 点击右上角 **设置（齿轮图标）** → **认证**
3. 勾选 **"允许 API 访问"**，保存
4. 回到首页，点击 **订阅管理** → **添加订阅**
5. 输入友链博客的 RSS 地址，例如：
   - `https://www.vvhan.com/rss.xml`
   - `https://blog.xiaow.qzz.io/rss.xml`
6. 把所有友链博客的 RSS 都添加进来
7. 建议创建一个分类叫 `Friends`，把所有友链订阅都归到这个分类下

> 💡 如何找到一个博客的 RSS 地址？通常在网站底部或导航栏找 RSS 图标，或者直接尝试访问 `域名/rss.xml`、`域名/feed`、`域名/atom.xml`。

---

## 第三步：创建自定义 API

FreshRSS 原生的 Google Reader API 不太适合圈子功能的需求，需要创建一个自定义 API 文件。

### 3.1 创建 API 文件

在 FreshRSS 的 API 目录下创建 `friends.php`：

路径：`/var/www/FreshRSS/p/api/friends.php`

```php
<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");  // 建议改成你博客的域名

// 指定 FreshRSS 用户和分类
$user = '';          // 填你的 FreshRSS 用户名
$category = 'Friends';  // 填你在 FreshRSS 中创建的分类名

// 获取请求参数
$items = isset($_GET['items']) ? intval($_GET['items']) : 20;
$offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;

// FreshRSS 基础路径
$freshrssPath = dirname(dirname(__DIR__));

// 加载 FreshRSS
require_once $freshrssPath . '/app/constants.php';
require_once $freshrssPath . '/lib/Minz_Request.php';

Minz_Request::init();

// 获取该分类下的所有 Feed
$feedDao = FreshRSS_Factory::createFeedDao();
$categoryDao = FreshRSS_Factory::createCategoryDao();
$cat = $categoryDao->searchByName($category);
$feeds = $feedDao->listFeeds($cat->id());

// 获取文章
$entryDao = FreshRSS_Factory::createEntryDao();
$list = [];

foreach ($feeds as $feed) {
    $entries = $entryDao->listByFeed($feed->id(), $items, $offset);
    foreach ($entries as $entry) {
        $list[] = [
            'url'      => $entry->link(),
            'date'     => $entry->date(true),
            'title'    => $entry->title(),
            'siteName' => $feed->name(),
        ];
    }
}

// 按时间倒序排列
usort($list, function ($a, $b) {
    return strtotime($b['date']) - strtotime($a['date']);
});

// 截取指定数量
$list = array_slice($list, $offset, $items);

echo json_encode([
    'list'   => $list,
    'items'  => count($list),
    'offset' => $offset,
], JSON_UNESCAPED_UNICODE);
```

### 3.2 配置信息说明

| 配置项                        | 说明                                          |
| ----------------------------- | --------------------------------------------- |
| `Access-Control-Allow-Origin` | 改成你的博客域名，如 `https://chenyicheng.cn` |
| `$user`                       | 你的 FreshRSS 管理员用户名                    |
| `$category`                   | 你在 FreshRSS 中给友链创建的分类名            |

### 3.3 Docker 部署时挂载 API 文件

如果用 Docker 部署，需要把 `friends.php` 挂载进容器：

```yaml
services:
  freshrss:
    image: freshrss/freshrss:latest
    # ... 其他配置不变
    volumes:
      - freshrss_data:/var/www/FreshRSS/data
      - freshrss_extensions:/var/www/FreshRSS/extensions
      - ./friends.php:/var/www/FreshRSS/p/api/friends.php:ro
```

然后重启容器：

```bash
docker compose down && docker compose up -d
```

---

## 第四步：验证 API

访问以下地址测试 API 是否正常：

```
http://你的服务器IP:8080/api/friends.php?items=5&offset=0
```

应该返回类似这样的 JSON：

```json
{
  "list": [
    {
      "url": "https://www.vvhan.com/article/xxx.html",
      "date": "2026-07-17T10:30:00+08:00",
      "title": "某篇文章标题",
      "siteName": "韩小韩博客"
    },
    {
      "url": "https://blog.xiaow.qzz.io/archives/xxx",
      "date": "2026-07-16T15:20:00+08:00",
      "title": "另一篇文章标题",
      "siteName": "笑的博客"
    }
  ],
  "items": 2,
  "offset": 0
}
```

---

## 第五步：配置 vhAstro-Theme

### 5.1 修改 Friends.ts

打开博客项目中的 `src/page_data/Friends.ts`，修改配置：

```ts
export default {
  // 填入你的 FreshRSS API 地址
  api: "http://你的服务器IP:8080/api/friends.php",

  // api 为空时使用静态数据，填了 api 后静态数据不会生效
  data: [
    // 可以留空，也可以保留作为 API 不可用时的兜底数据
  ],
};
```

### 5.2 数据格式映射

主题期望的数据格式和 API 返回格式需要对应。如果 API 返回的格式和静态数据不一致，可能需要在主题的圈子组件中做数据转换，或者修改 API 的输出格式。

主题静态数据的字段：

| 字段      | 类型   | 说明                                |
| --------- | ------ | ----------------------------------- |
| `title`   | string | 文章标题                            |
| `auther`  | string | 作者/博客名（注意：主题里拼写如此） |
| `date`    | string | 发布日期                            |
| `link`    | string | 文章链接                            |
| `content` | string | 文章摘要（可选）                    |

如果需要让 API 输出匹配这个格式，修改 `friends.php` 的输出部分，把字段名对应调整即可。

---

## 第六步：部署上线

```bash
git add .
git commit -m "启用圈子功能，配置 FreshRSS API"
git push
```

Cloudflare Pages 自动构建部署后，圈子页面就会从 FreshRSS 动态拉取友链博客的最新文章了。

## 注意事项

1. **更新频率**：Docker 默认配置每 20 分钟更新一次 RSS，可以在 `docker-compose.yml` 中修改 `CRON_MIN` 的值
2. **API 安全**：生产环境建议把 `Access-Control-Allow-Origin` 从 `*` 改成你具体的博客域名
3. **FreshRSS 的 `description` 字段**：FreshRSS 不会存储 RSS 条目的 `description`（文章摘要），所以圈子页面可能没有文章摘要，只有标题
4. **服务器选择**：FreshRSS 需要 7x24 运行，建议用一台轻量云服务器（1H1G 就够），或者用 Docker 跑在本地电脑上（但电脑关了就更新不了）
5. **友链博客必须有 RSS**：不是所有博客都提供 RSS，添加前先确认对方网站有 RSS 源
