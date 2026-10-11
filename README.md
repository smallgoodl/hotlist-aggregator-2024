# 热榜聚合 / Hotlist Aggregator (Zhihu · Xiaohongshu · Weibo)

[中文](#中文) | [English](#english)

---

## 中文

### 简介
一个把**知乎、小红书、微博**三个平台“热榜”放在同一页面展示的静态网页。页面会尝试从第三方热榜 API 获取数据；**获取失败时会自动改用代码内置的模拟（静态示例）数据**。

### 数据来源说明（请务必注意）
- 代码里请求的是第三方接口 `https://v1.alapi.cn/api/tophub/get?type=<平台>`，超时 5 秒，仅当返回 `code === 200` 且带有 `data` 时才使用真实数据，最多取前 10 条。
- 接口不可用、超时、跨域被拦截或返回异常时，会显示 `script.js` 中 `fallbackData` 里写死的**模拟数据**（每个平台 10 条，标题、热度均为示例，并非真实热榜）。
- 备用接口 `API_CONFIG.backup`（知乎、微博官方地址）在代码中只是配置，**并未被实际调用**。
- 页脚文字写着“数据来源于各平台公开API”，实际是否为真实数据取决于上述第三方接口当时能否正常返回；在没有可用接口的情况下，页面展示的是示例数据。

### 功能
- 三列卡片分别展示知乎热榜、小红书热榜、微博热榜，每个榜单最多 10 条，带排名、标题、热度。
- 点击某一条会在新标签页打开对应链接（接口返回的链接，或平台默认热榜首页）。
- 页面加载时自动加载全部榜单；之后每 10 分钟自动刷新一次；页脚显示“最后更新”时间。
- 加载中显示加载动画，无数据或失败时显示提示。

### 使用方法
打开页面即可查看三个榜单，点击条目跳转。

### 本地运行
用浏览器直接打开 `index.html`。页面通过 CDN 加载 Font Awesome 图标（`cdnjs.cloudflare.com`），需要联网才能显示图标。若浏览器因 `file://` 跨域限制拦截接口请求，会自动显示示例数据；也可用任意静态服务器启动，例如：
```
python3 -m http.server 8000
```
然后访问 http://localhost:8000 。

### 文件结构
```
index.html   页面结构
style.css    样式（含窄屏响应式）
script.js    数据获取、模拟数据、渲染与自动刷新
```

### 技术栈
纯 HTML + CSS + 原生 JavaScript（fetch），Font Awesome 6 图标（CDN），无框架、无后端。

---

## English

### Introduction
A static web page that shows the hot lists of **Zhihu, Xiaohongshu and Weibo** side by side. It tries to fetch data from a third-party hotlist API; **if that fails, it automatically falls back to mock (static sample) data hard-coded in the script**.

### About the data (please read)
- The code requests the third-party endpoint `https://v1.alapi.cn/api/tophub/get?type=<platform>` with a 5-second timeout. Real data is used only if the response has `code === 200` and a `data` field, and at most the first 10 items are kept.
- If the API is unavailable, times out, is blocked by CORS or returns something unexpected, the page shows the **mock data** hard-coded in `fallbackData` in `script.js` (10 items per platform; titles and heat values are samples, not real hot lists).
- The `API_CONFIG.backup` entries (official Zhihu / Weibo URLs) exist only as configuration and are **never actually called**.
- The footer says "data comes from public platform APIs", but whether the data is real depends on the third-party API responding at that moment; without a working API the page shows sample data.

### Features
- Three cards for Zhihu, Xiaohongshu and Weibo, each listing up to 10 entries with rank, title and heat.
- Clicking an entry opens a link in a new tab (the link from the API, or the platform's default hot-list page).
- All lists load on page load and auto-refresh every 10 minutes; the footer shows a "last updated" time.
- A loading animation is shown while loading, and a message is shown on empty data / failure.

### Usage
Open the page to view the three lists and click an item to jump to it.

### Run locally
Open `index.html` in a browser. Font Awesome icons are loaded from a CDN (`cdnjs.cloudflare.com`), so an internet connection is needed for icons. If the browser blocks the API request when opened via `file://`, the sample data is shown. You can also serve it with any static server, e.g.:
```
python3 -m http.server 8000
```
then visit http://localhost:8000 .

### File structure
```
index.html   Page markup
style.css    Styles (responsive for narrow screens)
script.js    Data fetching, mock data, rendering, auto-refresh
```

### Tech stack
Plain HTML + CSS + vanilla JavaScript (fetch), Font Awesome 6 icons via CDN. No frameworks or backend.
