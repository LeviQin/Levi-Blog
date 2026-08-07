# 暗色极客风主题改造 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 Levi-Blog 改造为暗色极客风个人技术博客：GitHub Dark 基底 + 青色强调 + 等宽字体点缀 + 首页分屏 Hero，默认暗色可切亮色。

**Architecture:** 本改造集中在 CSS 主题变量（`src/styles/base.scss`、`src/styles/element.scss`）+ 若干组件样式。核心策略是"改全局变量 + 改组件局部样式"，不碰路由/接口/数据。还原点 tag 为 `before-dark-theme`。

**Tech Stack:** Vue 3 + Vite + SCSS（现有项目，不新增依赖）

## Global Constraints

- 不引入任何新 npm 依赖（等宽字体用系统栈 `ui-monospace, Menlo, Consolas, monospace`）
- 不修改路由、数据接口、文章内容、页面结构
- 强调色固定青色：暗色 `#22d3ee`，亮色 `#06b6d4`
- 暗色基底固定：背景 `#0d1117`、表面 `#161b22`、边框 `#21262d`、主文字 `#e6edf3`、次要 `#8b949e`
- 亮色基底固定：背景 `#f6f8fa`、表面 `#ffffff`、边框 `#d0d7de`、主文字 `#1f2328`、次要 `#57606a`
- 默认主题暗色：`useTheme.js` 初始值从 `light` 改为 `dark`
- 还原点：`git tag before-dark-theme`（已建立，基线含标签修复）

---

### Task 1: 重写全局主题变量（base.scss）

**Files:**
- Modify: `src/styles/base.scss`

**Interfaces:**
- Produces: 新的 CSS 变量集（`--background`、`--theme-color`、`--theme-btn-hover-color`、`--btn-tag-bg-color`、`--color` 等），供后续所有组件引用。

- [ ] **Step 1: 读取当前 base.scss**

确认当前变量定义（已在设计阶段读过，`--theme-color: #dbe6eef1`、`--theme-btn-hover-color: #5a8cbd`、`--btn-tag-bg-color: #ff8b26`、字体 `CustomFont` 等）。

- [ ] **Step 2: 重写 `:root` 亮色变量块（第 28-63 行）**

```scss
:root {
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC',
    'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  --mono-font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono',
    monospace;
  --font-size: 16px;

  --color: #1f2328;
  --background: #f6f8fa;

  --theme-color: #ffffff;
  --header-bar-bg-color: 255, 255, 255;
  --header-bar-color-opacity: 0;
  --white-color: #ffffff;
  --grey-color: #ececec;
  --red-color: #f85149;
  --nav-bar-text-color: #1f2328;
  --theme-btn-hover-color: #06b6d4;
  --nav-text-color: #1f2328;
  --filing-color: #1f2328;
  --black-text-color: #1f2328;
  --link-text-color: #06b6d4;
  --btn-tag-bg-color: #06b6d4;
  --border-color: #d0d7de;
  --text-secondary: #57606a;
  --min-width: 200px;
  --heart-width: 1360px;
  --header-bar-height: 80px;
  --header-mobile-bar-height: 50px;
  --theme-radius: 10px;
  --theme-min-radius: 5px;

  --about-color: #57606a;
  --work-color: #06b6d4;
  --ability-color: #792a31;
  --connect-color: #06b6d4;
  overflow-x: hidden;

  --message-author-color: #323438;
}
```

- [ ] **Step 3: 重写 `html[data-theme='dark']` 变量块（第 6-26 行）**

```scss
html[data-theme='dark'] {
  --color: #e6edf3;
  --background: #0d1117;

  --theme-color: #161b22;
  --header-bar-bg-color: 13, 17, 23;
  --grey-color: #30363d;
  --red-color: #f85149;
  --nav-bar-text-color: #e6edf3;
  --theme-btn-hover-color: #22d3ee;
  --nav-text-color: #e6edf3;
  --filing-color: #0d1117;
  --link-text-color: #22d3ee;
  --btn-tag-bg-color: #22d3ee;
  --border-color: #21262d;
  --text-secondary: #8b949e;
  --black-text-color: #e6edf3;

  --about-color: #8b949e;
  --work-color: #22d3ee;
  --ability-color: #792a31;

  --message-author-color: #e6edf3;
}
```

- [ ] **Step 4: 更新 `html`/`body` 字体引用**

第 86-107 行 `html` 的 `font-family` 改为 `var(--font-family)`；`body` 保留。确认不再引用 `CustomFont` 作为默认（`--font-family` 已不含它）。

- [ ] **Step 5: 提交**

```bash
git add src/styles/base.scss
git commit -m "feat(theme): 重写全局主题变量为暗色极客配色(青强调)"
```

**验证**：`grep -n "5a8cbd\|ff8b26\|dbe6eef1" src/styles/base.scss` 应无残留旧色（`5a8cbd`、`ff8b26` 应为 0 匹配）。

---

### Task 2: 更新 Element 组件变量（element.scss）

**Files:**
- Modify: `src/styles/element.scss`

**Interfaces:**
- Consumes: Task 1 的 `--theme-btn-hover-color`、`--border-color`、`--text-secondary`、`--btn-tag-bg-color`
- Produces: Element Plus 组件在新色板下的适配。

- [ ] **Step 1: 更新 `:root` 的 Element 变量（第 3-14 行）**

```scss
:root {
  --el-color-primary: var(--theme-btn-hover-color);
  --el-text-color-primary: var(--black-text-color);
  --el-text-color-regular: #57606a;
  --el-text-color-secondary: #8b949e;
  --el-border-color: var(--border-color);
  --el-border-color-light: rgba(13, 17, 23, 0.1);
  --el-bg-color: var(--theme-color);
  --el-fill-color-light: rgba(13, 17, 23, 0.04);
  --el-fill-color-lighter: rgba(13, 17, 23, 0.03);
  --el-input-border-color: var(--border-color);
}
```

- [ ] **Step 2: 更新 `html[data-theme="dark"]` 的 Element 变量（第 16-26 行）**

```scss
html[data-theme="dark"] {
  --el-text-color-primary: var(--color);
  --el-text-color-regular: rgba(230, 237, 243, 0.86);
  --el-text-color-secondary: rgba(230, 237, 243, 0.62);
  --el-border-color: rgba(34, 211, 238, 0.22);
  --el-border-color-light: rgba(34, 211, 238, 0.14);
  --el-bg-color: #161b22;
  --el-fill-color-light: rgba(230, 237, 243, 0.04);
  --el-fill-color-lighter: rgba(230, 237, 243, 0.06);
  --el-input-border-color: rgba(34, 211, 238, 0.22);
}
```

- [ ] **Step 3: 更新消息/通知边框色（第 62 行）**

`border: 1px solid rgba(90, 140, 189, 0.16)` → `border: 1px solid var(--border-color)`；背景 `rgba(255,255,255,0.95)` 改为 `var(--theme-color)`（亮/暗自动适配）。

- [ ] **Step 4: 提交**

```bash
git add src/styles/element.scss
git commit -m "feat(theme): Element 组件变量适配暗色极客配色"
```

**验证**：`grep -n "90, 140, 189\|5a8cbd" src/styles/element.scss` 应无残留。

---

### Task 3: 默认主题改为暗色（useTheme.js）

**Files:**
- Modify: `src/hooks/useTheme.js`

- [ ] **Step 1: 修改初始值**

第 12 行 `const theme = ref(getStore(key) || "light")` → `"dark"`。

- [ ] **Step 2: 提交**

```bash
git add src/hooks/useTheme.js
git commit -m "feat(theme): 默认主题改为暗色"
```

**验证**：`grep -n '"light"' src/hooks/useTheme.js` 无匹配（除 toggle 里的 `===` 判断外，需确认 `|| "light"` 已替换为 `|| "dark"`）。

---

### Task 4: 重构首页第一屏 Hero（Home/Index.vue + TopBanner）

**Files:**
- Modify: `src/views/Home/Index.vue`
- Modify: `src/components/TopBanner/Index.vue`

**Interfaces:**
- Consumes: `bannerConfig` props（title/text），Task 1 的 CSS 变量
- Produces: 分屏 Hero（左文案 + 右终端窗口），终端窗口为 TopBanner 内部实现。

- [ ] **Step 1: 修改 Home/Index.vue 的 bannerConfig**

第 157-162 行改为：

```js
const bannerConfig = {
  height: "min-height: 88vh",
  showArrow: false,
  title: "Levi",
  text: "全栈开发者 · 热爱 Vue 与前端工程化",
  terminalLines: [
    { cmd: "npm create blog@latest", output: "√ 欢迎使用 Levi-Blog" },
    { cmd: "git commit -m \"feat: 暗色极客风\"", output: "[main 3087c9e1] 改造完成" },
    { cmd: "npm run dev", output: "VITE ready in 320ms" },
  ],
};
```

- [ ] **Step 2: 重构 TopBanner/Index.vue 模板**

将当前居中文案改为分屏布局：

```html
<template>
  <div class="top-banner" :style="bannerStyle">
    <div class="banner-grid-bg"></div>
    <div class="banner-split">
      <div class="banner-left">
        <h2 class="banner-title">{{ props.bannerConfig.title }}</h2>
        <p class="banner-sub">
          <span>{{ typedText }}</span>
          <span class="typing-caret"></span>
        </p>
        <div class="banner-actions">
          <button class="banner-btn primary" type="button" @click="$router.push('/category/technology')">查看文章</button>
          <button class="banner-btn" type="button" @click="$router.push('/about')">关于我</button>
        </div>
      </div>
      <div class="banner-right">
        <div class="terminal-window">
          <div class="terminal-bar">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
            <span class="terminal-title">leviqin:~</span>
          </div>
          <div class="terminal-body">
            <div v-for="(line, i) in props.bannerConfig.terminalLines" :key="i" class="terminal-line">
              <span class="prompt">➜</span>
              <span class="cmd">{{ line.cmd }}</span>
              <span class="output">{{ line.output }}</span>
            </div>
            <span class="terminal-cursor"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
```

- [ ] **Step 3: 更新 TopBanner script**

- `props` 增加 `terminalLines` 默认值
- `height` 改为透传 style；`bannerStyle` computed 处理 `min-height: 88vh`
- 保留打字机逻辑

- [ ] **Step 4: 重写 TopBanner 样式**

- `.top-banner` 相对定位、`display: flex`、`align-items: center`
- `.banner-grid-bg`：`background-image: linear-gradient(...) 网格线 + 深色底`
- `.banner-split`：`display: grid; grid-template-columns: 1fr 1fr;` 移动端单列
- `.terminal-window`：深色 `#0d1117` + 边框 `#21262d` + 圆角，`terminal-bar` 三圆点，`terminal-body` 等宽字体、青色 prompt
- 按钮样式：主按钮青底白字，次按钮描边

- [ ] **Step 5: 提交**

```bash
git add src/views/Home/Index.vue src/components/TopBanner/Index.vue
git commit -m "feat(home): 首页第一屏重构为分屏 Hero + 终端窗口"
```

**验证**：`npm run dev` 后首页首屏显示左文案右终端，背景为深色网格，无古风图。

---

### Task 5: 全局布局背景去古风化（layout/Index.vue）

**Files:**
- Modify: `src/layout/Index.vue`

- [ ] **Step 1: 修改 `.banner-bar` 默认背景**

第 107-108 行：

```scss
.banner-bar {
  background-color: var(--background);
  background-image: radial-gradient(circle at 25% 20%, rgba(34, 211, 238, 0.08), transparent 45%),
    radial-gradient(circle at 75% 70%, rgba(34, 211, 238, 0.06), transparent 45%);
}
```

去掉 `url(@/assets/images/banner/gufengnv.jpg)`。

- [ ] **Step 2: 提交**

```bash
git add src/layout/Index.vue
git commit -m "feat(theme): 全局布局背景去古风化，改暗色网格渐变"
```

**验证**：全局页面背景为深色（暗色）/浅灰（亮色），无古风图。

---

### Task 6: 壁纸默认图替换（SwitchWallpaper）

**Files:**
- Modify: `src/components/SwitchWallpaper/Index.vue`

- [ ] **Step 1: 替换默认壁纸源**

- 第 85 行 `import gufengnvImag` 删除
- 默认壁纸改为纯色 CSS 背景（不依赖图片）：`image` 用一个暗色占位 URL 或本地极客纹理，或在 `wallpaperOptions` 默认项中放一个 CSS 渐变字符串

采用方案：默认壁纸项 `image` 改为空字符串 + 展示层对空 URL 用 CSS 渐变兜底；第 108-112 行 `currentWallpaper` 兜底 `gufengnvImag` 改为空字符串。

- [ ] **Step 2: 更新样式兜底**

`.wallpaper-hero-preview` 无背景图时显示 `linear-gradient(135deg, #0d1117, #161b22)` + 青色网格。

- [ ] **Step 3: 提交**

```bash
git add src/components/SwitchWallpaper/Index.vue
git commit -m "feat(theme): 壁纸默认项改暗色极客底，去古风图"
```

**验证**：打开壁纸面板，默认壁纸显示深色渐变而非古风女子图。

---

### Task 7: 顶栏暗色化（Hedader）

**Files:**
- Modify: `src/layout/Hedader/Index.vue`

- [ ] **Step 1: logo 改等宽终端风格**

`log-text` 内 `<h1>` 内容由 `blogSettingMap.blog_name` 改为 `Levi:~$`（或保留名字但套等宽字体 + 青色闪烁光标块）；`logo-dot` 橙色改青色。

```scss
.logo-dot {
  background: var(--theme-btn-hover-color);
  box-shadow: 0 0 8px rgba(34, 211, 238, 0.6);
}
.log-text h1 {
  font-family: var(--mono-font-family);
  font-size: 20px;
  color: var(--nav-bar-text-color);
  background: none;
  -webkit-text-fill-color: var(--nav-bar-text-color);
}
```

- [ ] **Step 2: 滚动态毛玻璃**

`.header.is-scrolled` 阴影改 `0 1px 12px rgba(0,0,0,0.4)`，背景用 `rgba(var(--header-bar-bg-color), 0.85)` + `backdrop-filter: blur(12px)`。

- [ ] **Step 3: 提交**

```bash
git add src/layout/Hedader/Index.vue
git commit -m "feat(theme): 顶栏暗色化，logo 改终端风格"
```

**验证**：顶栏滚动后为深色毛玻璃，logo 为等宽青色风格。

---

### Task 8: 文章卡片暗色化（Home/Index.vue 样式）

**Files:**
- Modify: `src/views/Home/Index.vue`（style 块）

- [ ] **Step 1: 卡片样式**

`.article-card` 背景用 `var(--theme-color)`、`border: 1px solid var(--border-color)`；hover `border-color: var(--theme-btn-hover-color)`、阴影改深色 `0 8px 30px rgba(0,0,0,0.3)`。

- [ ] **Step 2: 分类徽章/标签等宽化**

`.category-badge`、`.tag-pill` 加 `font-family: var(--mono-font-family)`；标签背景 `rgba(34, 211, 238, 0.1)`、hover `0.2`。

- [ ] **Step 3: 元信息次要文字**

`.card-desc` 颜色 `#666` → `var(--text-secondary)`；`.meta-item` 颜色 `#888` → `var(--text-secondary)`，数字等宽。

- [ ] **Step 4: 提交**

```bash
git add src/views/Home/Index.vue
git commit -m "feat(theme): 文章卡片暗色化与等宽点缀"
```

**验证**：首页卡片深色细边框，hover 青色边框，标签/数字等宽。

---

### Task 9: 侧边栏暗色化（SidebarUser + TopicSidebar）

**Files:**
- Modify: `src/components/SidebarUser/Index.vue`
- Modify: `src/components/TopicSidebar/Index.vue`

- [ ] **Step 1: SidebarUser 联系图标统一青色**

`.github-box`、`.wechat-box`、`.envelope-box`、`.rss-box` 的彩色 icon 底统一为 `rgba(34, 211, 238, 0.12)`、icon 色 `var(--theme-btn-hover-color)`；统计数字加等宽字体。

- [ ] **Step 2: SidebarUser 暗色卡片**

`.sidebar-info` 背景改 `var(--theme-color)` + 边框 `var(--border-color)`，hero 渐变 overlay 用暗色。

- [ ] **Step 3: TopicSidebar 标签等宽青色**

`.tags-item` 加 `font-family: var(--mono-font-family)`，颜色用青色系。

- [ ] **Step 4: 提交**

```bash
git add src/components/SidebarUser/Index.vue src/components/TopicSidebar/Index.vue
git commit -m "feat(theme): 侧边栏暗色化，联系图标统一青色"
```

**验证**：侧边栏深色玻璃卡片，联系图标全青，标签等宽。

---

### Task 10: 浮动工具栏改青色（FloatToolBar）

**Files:**
- Modify: `src/components/FloatToolBar/Index.vue`

- [ ] **Step 1: 按钮配色**

`.tool-btn` 背景 `var(--btn-tag-bg-color)` 已自动跟随青色；hover 背景 `var(--theme-btn-hover-color)`；阴影改 `rgba(34, 211, 238, 0.25)`。

- [ ] **Step 2: 提交**

```bash
git add src/components/FloatToolBar/Index.vue
git commit -m "feat(theme): 浮动工具栏改青色强调"
```

**验证**：浮动工具栏按钮为青色。

---

### Task 11: 其他暗色残留清理（grep 全局）

**Files:**
- Modify: 视 grep 结果而定

- [ ] **Step 1: 全局搜索残留旧色**

```bash
grep -rn "5a8cbd\|ff8b26\|ff9a43\|dbe6eef\|ffa84d\|90, 140, 189\|255, 139, 38" src/ --include="*.vue" --include="*.scss" --include="*.js"
```

- [ ] **Step 2: 逐一替换为对应新色/变量**

- `#5a8cbd` / `rgba(90, 140, 189, ...)` → `var(--theme-btn-hover-color)` 或 `rgba(34, 211, 238, ...)`
- `#ff8b26` / `#ff9a43` / `rgba(255, 139, 38, ...)` → 青色系
- `#ffa84d` / `rgba(255, 170, 77, ...)` → 青色系

- [ ] **Step 3: 提交**

```bash
git add -A
git commit -m "feat(theme): 清理残留旧配色，统一青色强调"
```

**验证**：`grep -rn "5a8cbd\|ff8b26" src/` 无匹配。

---

### Task 12: 构建验证与回归

**Files:**
- 无（验证任务）

- [ ] **Step 1: 构建验证**

```bash
npm run build
```

预期成功。若 esbuild 平台二进制缺失（Linux 环境），改用 `node -e "解析 SFC script"` 或提示在用户环境构建。

- [ ] **Step 2: 语法校验全部改动 SFC**

用 `@vue/compiler-sfc` 解析所有改动的 `.vue` 文件，确认无语法错误。

- [ ] **Step 3: 明暗切换回归**

确认 `useTheme` 默认 dark，toggle 到 light 后所有组件变量跟随。

- [ ] **Step 4: 更新设计/计划文档状态**

在 docs 中标记实施完成。

**验证**：构建无错，改动文件 SFC 语法全通过。
