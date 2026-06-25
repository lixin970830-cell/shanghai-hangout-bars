# Shanghai Hangout Bars 交接说明

## 项目定位

Shanghai Hangout Bars 是一个上海酒吧 hangout 推荐 MVP，目标是做成：

> 适合聊天、约会、续摊和下班小喝的上海酒吧地图。

第一版不追求“全上海最全”，而是做一个能快速决策的精选清单。

## 当前状态

当前可运行版本是静态 HTML：

- `static.html`：已由 Vite 构建产物内联生成，可直接打开或通过本地服务访问
- `src/main.jsx`：React/Vite 源码
- `src/styles.css`：React/Vite 样式
- `index.html`、`package.json`：Vite 项目骨架
- `package-lock.json`：已生成依赖锁定文件
- `docs/index.html`：GitHub Pages 公开网站入口
- `docs/404.html`：GitHub Pages fallback 页面
- `README.md`：GitHub 仓库说明

本地预览地址：

```txt
http://127.0.0.1:5175/static.html
```

GitHub Pages 发布方式：

```txt
Settings -> Pages -> Deploy from a branch -> main / docs
```

GitHub 仓库：

```txt
https://github.com/lixin970830-cell/shanghai-hangout-bars
```

公开网站：

```txt
https://lixin970830-cell.github.io/shanghai-hangout-bars/
```

如果新开对话后本地服务没了，可以在项目目录运行：

```bash
python3 -m http.server 5175
```

然后打开：

```txt
http://127.0.0.1:5175/static.html
```

## 已实现功能

- 16 家上海酒吧种子清单
- 场景筛选：
  - 好聊天
  - 适合约会
  - Speakeasy
  - 景观 rooftop
  - 新店热门
  - 下班小喝
  - 经典名店
- 区域筛选
- 搜索
- 综合推荐 / 更好聊天 / 新鲜感 / 预算友好排序
- 全部 / 已收藏 / 未去过视图
- 重置筛选
- 无结果空状态
- 收藏，本地 localStorage 保存
- 去过标记，本地 localStorage 保存
- 一键 Google Maps 导航
- 明暗主题切换
- 响应式布局，支持桌面和移动端
- 每家卡片已补充适合谁、推荐时段、推荐度、安静度

## 当前种子酒吧

- The Union Trading Company
- Sober Company
- Speak Low
- Pony Up
- Barules
- EPIC
- Senator Saloon
- COA Shanghai
- Penicillin Shanghai
- Bar Leone Shanghai
- Flair Rooftop
- ROOF
- 和平饭店爵士酒吧
- Bar No. 3
- Root Down
- The Cannery

## 下一步建议

优先做内容质量，而不是堆功能：

1. 把 16 家换成用户认可的真实清单
2. 每家补：
   - 一句话判断
   - 适合场景
   - 避雷点
   - 人均
   - 具体区域
   - 大众点评/小红书/Google Maps 链接
3. 扩到 30 家后再考虑接真实地图
4. 如果要长期维护，把数据从 HTML 里抽成 JSON 或 Supabase

## 最近优化记录

2026-06-25：

- 将静态页同步为 React/Vite 构建后的单文件版本
- 补充每家酒吧的 `bestFor`、`when`、`quiet`、`freshness`、`score`、`priceValue` 字段
- 新增排序、收藏视图、未去过视图、重置筛选、空状态
- 修复移动端标题和副标题在窄屏下横向溢出的问题
- 已验证：
  - `npm run build` 通过
  - `http://127.0.0.1:5175/static.html` 返回 200
  - 390px 移动宽度无页面横向溢出
  - 搜索、预算排序、收藏、暗色主题本地保存可用

2026-06-25 GitHub 发布准备：

- 新增 `.gitignore`
- 新增 `README.md`
- 新增 `docs/index.html` 和 `docs/404.html`，用于 GitHub Pages
- 已登录 GitHub 账号 `lixin970830-cell`
- 已创建公开仓库 `lixin970830-cell/shanghai-hangout-bars`
- 已开启 GitHub Pages，发布源为 `main /docs`
- 已验证公开网站返回 200，移动端渲染正常

## 新对话可直接使用的提示词

```txt
我们继续做 Shanghai Hangout Bars 项目。

项目目录是：
/Users/xinli/Documents/金融/shanghai-hangout-bars

当前可运行文件是：
/Users/xinli/Documents/金融/shanghai-hangout-bars/static.html

项目定位：
适合聊天、约会、续摊和下班小喝的上海酒吧地图。

当前功能：
酒吧列表、场景筛选、区域筛选、搜索、排序、收藏视图、未去过视图、收藏、去过、本地保存、一键导航、明暗主题。

请先读取 HANDOFF.md 和 static.html，然后继续帮我优化这个项目。
```
