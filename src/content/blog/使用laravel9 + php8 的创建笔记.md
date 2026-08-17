---
title: 使用laravel9 + php8 的创建笔记
categories: Code
tags:
  - laravel
  - php
  - 开发环境
id: laravel9-php8-notes
cover: /assets/images/banner/article/laravel9-php8-banner.jpg
date: 2026-07-24 11:20
---

# Laravel 9 + PHP 8 项目搭建笔记

准备使用 **PHP 8 + Laravel 9 + MySQL 8.0 + Laraman** 进行开发，对之前多个插件做版本升级记录。

---

## Composer 镜像源

```shell
# 阿里云
composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/

# 腾讯云
composer config -g repo.packagist composer https://mirrors.cloud.tencent.com/composer/

# 国外默认
composer config -g repo.packagist composer https://packagist.org

# 日本
composer config -g repo.packagist composer https://packagist.jp
```

> [!tip] 清除缓存
>
> ```shell
> php artisan cache:clear
> php artisan config:clear
> php artisan clear-compile
> composer clear-cache
> ```

---

## 环境准备

### 安装 GMP 扩展-如果需要的话

在宝塔上直接安装会出错，需要先运行：

```shell
apt install -y libgmp-dev
```

---

## 1. 创建项目

```shell
# Laravel 9（PHP 8.0+）
composer create-project --prefer-dist laravel/laravel server "9.*"
```

---

## 2. 安装 Laraman

```shell
composer require itinysun/laraman
php artisan vendor:publish --tag=laraman.install
```

启动：

```shell
php laraman start
```

> [!warning] 删除禁用的函数
> 确保 `php.ini` 中 `disable_functions` 没有阻止 Laraman 所需的函数。

> [!warning] 启动报错处理
> **端口占用**
>
> ```shell
> lsof -i :端口号
> kill -9 进程ID
> ```
>
> **config 异常**
> 可能是 Composer 中有插件被意外删除，但配置文件中仍保留指引，导致 Laraman 启动时加载异常。
>
> - 处理 1：根据报错提示的缺失包，到 `composer.json` 中删除对应指引
> - 处理 2：找到该包，再次执行 `composer remove xxx` 彻底删除

---

## 3. 安装 Dcat Admin

```shell
composer require dcat/laravel-admin:"2.*" -vvv
```

> [!warning] 安装报错
> 如果安装失败，将 `composer.json` 中 `minimum-stability` 的值改为 `dev`

```shell
php artisan admin:publish
php artisan admin:install
```

### 登录验证码

```shell
composer require lake/login-captcha
```

支持两种验证方式：图片验证码、数学计算。

### Google 2FA 两步验证

```shell
# 前置依赖
composer require bacon/bacon-qr-code

# 2FA 插件
composer require asundust/dcat-auth-google-2fa
```

> [!warning] 安装后需修改以下文件
> 具体修改参照 `digitark-server` 项目。
>
> **修改 1** — `BindRowAction` 命名空间
>
> ```
> namespace Asundust\DcatAuthGoogle2Fa\Http\Controllers\Actions;
> ```
>
> **修改 2** — `DcatAuthGoogle2FaUserController` 命名空间
>
> ```
> namespace Asundust\DcatAuthGoogle2Fa\Http\Controllers;
> ```
>
> **修改 3** — 打乱 Base32 字符集顺序
>
> ```
> namespace PragmaRX\Google2FA\Support;
> const VALID_FOR_B32_SCRAMBLED = '2QWERGHZXCVBN34TYUIOPASDF567JKLM';
> ```

### Excel 导出

```shell
composer require dcat/easy-excel
```

---

## 4. 安装 Passport

```shell
composer require laravel/passport:11.8 --ignore-platform-reqs
php artisan migrate
php artisan passport:install
php artisan vendor:publish --tag=passport-config
```

> [!warning] `DateTimeZone` 报错
> 找到 `Lcobucci\Clock\SystemClock` 文件，将构造函数中的 `readonly` 关键字删除。
> `readonly` 是 PHP 8.1 引入的特性，PHP 8.0 或之前版本会报错：
>
> ```
> local.ERROR: syntax error, unexpected identifier "DateTimeZone", expecting variable
> ```

### 配置 API Guard

```php
'guards' => [
    'web' => [
        'driver' => 'session',
        'provider' => 'users',
    ],
    'api' => [
        'driver' => 'passport',
        'provider' => 'users',
        'hash' => false,
    ],
],
```

### AuthServiceProvider

在 `AuthServiceProvider` 中增加：

```php
use Laravel\Passport\Passport;

$this->registerPolicies();
Passport::ignoreRoutes();
Passport::tokensExpireIn(now()->addDay(7));
```

---

## 5. Web3 登录

```shell
composer require m1guelpf/laravel-web3-login --ignore-platform-reqs
php artisan vendor:publish --provider="M1guelpf\Web3Login\Web3LoginServiceProvider" --tag="config"
```

> [!tip] 可以直接用这个插件，也可以把核心逻辑提取出来自己写。

---

## 6. 活动日志

```shell
composer require spatie/laravel-activitylog:^4.6 --ignore-platform-reqs
php artisan vendor:publish --provider="Spatie\Activitylog\ActivitylogServiceProvider" --tag="activitylog-migrations"
php artisan migrate
php artisan vendor:publish --provider="Spatie\Activitylog\ActivitylogServiceProvider" --tag="activitylog-config"
```

> [!note] PHP 8.0 安装 4.6 版本
> 使用文档：[spatie/laravel-activitylog v4](https://spatie.be/docs/laravel-activitylog/v4/advanced-usage/logging-model-events)

---

## 按需安装

以下插件根据实际需求选择安装。

### 7. OSS 文件存储

```shell
composer require iidestiny/laravel-filesystem-oss
```

> 根据 Laravel 版本选择对应版本，目前使用 3.4。

> [!warning] 线上报错
> 可能是线上未注册，重新注册即可：
>
> ```shell
> composer dump-autoload
> php artisan package:discover
> ```

### 8. 图片处理

```shell
composer require intervention/image
```

> 版本 2.7

### 9. 信任代理

```shell
composer require fideloper/proxy --ignore-platform-reqs
```

> 版本 4.4，为 Laravel 设置受信任的代理。

### 10. 跨域

```shell
composer require fruitcake/laravel-cors --ignore-platform-reqs
```

> 版本 3.0

### 11. Web3 相关

```shell
# web3 插件（考虑替换）
composer require sc0vu/web3.php --ignore-platform-reqs -W

# 加密
composer require simplito/elliptic-php --ignore-platform-reqs -W

# Base58
composer require stephenhill/base58 --ignore-platform-reqs
```

> 版本均为 1.0

### 12. 腾讯云 SDK

```shell
composer require tencentcloud/tencentcloud-sdk-php --ignore-platform-reqs
```

> 版本 3.0

### 13. 阿里云 SDK

```shell
composer require alibabacloud/client --ignore-platform-reqs
composer require alibabacloud/sdk --ignore-platform-reqs
```

### 14. 其他工具

```shell
# UTF-8 处理
composer require voku/portable-utf8 --ignore-platform-reqs

# HTML DOM 解析
composer require voku/simple_html_dom --ignore-platform-reqs
```

---

## 常见报错汇总

| 报错                                   | 原因                                   | 解决方案                                                                   |
| -------------------------------------- | -------------------------------------- | -------------------------------------------------------------------------- |
| `unexpected identifier "DateTimeZone"` | `readonly` 是 PHP 8.1 特性，8.0 不支持 | 删除 `SystemClock` 构造函数中的 `readonly`                                 |
| Laraman 端口占用                       | 进程未正常关闭                         | `lsof -i:端口号` → `kill -9 进程ID`                                        |
| Laraman config 异常                    | Composer 配置残留                      | 根据报错删除 `composer.json` 中对应指引，或 `composer remove xxx` 重新删除 |
| Dcat Admin 安装失败                    | `minimum-stability` 限制               | 将 `composer.json` 中该值改为 `dev`                                        |
| OSS 线上报错                           | 未注册                                 | `composer dump-autoload && php artisan package:discover`                   |
