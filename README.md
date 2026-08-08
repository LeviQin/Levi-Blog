<h1 align="center">Levi Blog</h1>

<p align="center">
  <strong>个人博客前端 · 随记 / 技术笔记 / 一些顺手的小工具</strong>
</p>

<p align="center">
  <a href="https://leviqin.top"><img src="https://img.shields.io/badge/Live-Demo-22d3ee?style=for-the-badge&logo=vercel" alt="Live Demo" /></a>
  <a href="https://github.com/LeviQin/Levi-Blog"><img src="https://img.shields.io/badge/GitHub-Repo-181717?style=for-the-badge&logo=github" alt="GitHub Repo" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.3-4FC08D?logo=vuedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-3.0-646CFF?logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Pinia-3.0-FFD700?logo=pinia" />
  <img src="https://img.shields.io/badge/Router-4.1-4FC08D?logo=vuedotjs" />
  <img src="https://img.shields.io/badge/Sass-CSS-CC6699?logo=sass&logoColor=white" />
  <img src="https://img.shields.io/badge/Lottie-动画-00DC82?logo=lottiefiles" />
  <img src="https://img.shields.io/badge/CryptoJS-加密-5A29E4?logo=crypto" />
</p>

---

## 📖 项目简介

Levi Blog 是我个人独立开发并长期自用的一套博客前端（Vue 3 + Vite）。主要用来写文章、整理笔记、放一些自己经常用的小工具。UI 走深色系 + 青色点缀的路线，支持明暗主题切换，也做了按时间自动切换的开关。布局偏响应式，桌面和手机都能用，但仍以我自己日常使用场景为主。

<table>
  <tr>
    <td><strong>⭐ 组件总数</strong></td>
    <td>约 <code>101</code> 个 Vue 单文件组件（会随迭代变化）</td>
  </tr>
  <tr>
    <td><strong>📄 页面路由</strong></td>
    <td>约 <code>28</code> 条（文章分类 / 工具箱 / 独立页面）</td>
  </tr>
  <tr>
    <td><strong>🧰 工具模块</strong></td>
    <td><code>12</code> 个 utils + <code>10</code> 个 api 模块</td>
  </tr>
  <tr>
    <td><strong>🎨 主题系统</strong></td>
    <td>明暗切换 + 可选按时自动切换</td>
  </tr>
  <tr>
    <td><strong>📦 包管理</strong></td>
    <td>Yarn · 依赖数量保持可控</td>
  </tr>
</table>

---

## ✨ 特性亮点

<table>
  <tr>
    <td width="50%">
      <h4>🌙 暗色极客主题</h4>
      <ul>
        <li>深色底 + 青色强调，整体尽量克制</li>
        <li>明暗主题切换，偏好会被记住</li>
        <li>可选按时间自动切换（默认 18:00-08:00 暗色）</li>
        <li>常用组件样式随主题联动</li>
        <li>部分页面有入场动画，避免过度花哨</li>
      </ul>
    </td>
    <td width="50%">
      <h4>✨ 动态背景特效</h4>
      <ul>
        <li>Canvas 实时渲染：代码雨 / 粒子连线 / 星空 / 浮尘</li>
        <li>提供简单面板调参：密度 / 速度 / 强度 / 颜色（实时预览）</li>
        <li>底色与特效可叠加，按喜好组合</li>
        <li>特效可全局使用，也可随时关闭</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>
      <h4>🐱 互动宠物</h4>
      <ul>
        <li>一只 Lottie 猫咪：可拖动、可点击互动</li>
        <li>长按会“睡觉”，偶尔有随机动作</li>
        <li>视线跟随鼠标、点击有反馈</li>
        <li>更多是氛围功能，不想要也能关</li>
      </ul>
    </td>
    <td>
      <h4>🔧 内置工具箱</h4>
      <ul>
        <li>加密解密（AES / DES / MD5 / RC4 / Rabbit / 3DES / Base64）</li>
        <li>图片处理（压缩 / 裁剪 / 格式转换 / EXIF）</li>
        <li>密码生成器 / 单位换算 / 二维码生成</li>
        <li>样式尽量统一，交互不追求“炫”，主要图好用</li>
      </ul>
    </td>
  </tr>
</table>

---

## 🛠 技术栈

| 类别 | 技术选型 | 说明 |
|------|----------|------|
| **框架** | Vue 3.3 + Composition API | 主要开发方式 |
| **构建** | Vite 3.0 | 本地开发 / 打包 |
| **路由** | Vue Router 4 | 页面路由 |
| **状态** | Pinia 3 + 持久化插件 | 全局状态 + 本地持久化 |
| **HTTP** | Axios | 请求层基础 |
| **样式** | Sass + Bootstrap Icons | 样式与图标 |
| **Markdown** | md-editor-v3 + Prism.js | Markdown 编辑 / 高亮 |
| **图片** | Compressor.js + Cropper.js + ExifReader | 压缩 / 裁剪 / 元数据 |
| **加密** | Crypto-JS | 浏览器端加解密 |
| **动画** | Lottie Web + Hammer.js | 动画与拖拽等交互 |
| **特效** | Canvas + requestAnimationFrame | 背景特效 |
| **自动导入** | unplugin 系列 | 组件 / API / 图标自动导入 |

---

## 📁 项目结构

```
Levi-Blog/
├── public/                  # 静态资源（不经过构建处理）
├── src/
│   ├── api/                 # 🔌 API 接口层（10 个模块）
│   │   ├── articles.js      #   文章接口
│   │   ├── comments.js      #   评论接口
│   │   ├── messages.js      #   留言接口
│   │   ├── links.js         #   友链接口
│   │   └── ...
│   ├── assets/              # 🎨 静态资源（字体 / 图标 / 图片）
│   ├── components/          # 🧩 通用组件库
│   │   ├── MarkdownRenderer #   Markdown 渲染器
│   │   ├── ImagePreview     #   图片预览
│   │   ├── SwitchWallpaper  #   背景特效/主题设置面板
│   │   ├── MatrixRain       #   Canvas 代码雨特效
│   │   ├── ParticleNetwork  #   Canvas 粒子连线特效
│   │   ├── StarField        #   Canvas 星空特效
│   │   ├── DustParticles    #   Canvas 浮尘特效
│   │   ├── CatPet           #   互动猫咪
│   │   ├── ArticleSkeleton  #   骨架屏
│   │   ├── FloatToolBar     #   悬浮工具栏（主题/特效切换）
│   │   └── ...
│   ├── directives/          # 📌 自定义指令（vSlidIn 等）
│   ├── hooks/               # 🪝 组合式函数（useTheme / useGetData）
│   ├── layout/              # 🏗 布局组件（Header / Footer / 导航抽屉）
│   ├── router/              # 🧭 路由配置（28 条路由）
│   ├── stores/              # 📦 Pinia 状态仓库（含特效配置）
│   ├── styles/              # 🎭 全局样式（base / element / md）
│   ├── utils/               # 🔧 工具函数（12 个模块）
│   │   ├── request.js       #   Axios 封装
│   │   ├── storage.js       #   localStorage 封装
│   │   ├── vSlidIn.js       #   元素滑入指令
│   │   └── ...
│   ├── views/               # 📄 页面视图
│   │   ├── Home/            #   首页（分屏 Hero + 终端窗口）
│   │   ├── Topic/           #   文章分类（日记 / 技术 / 萌宠 / 光影 / 笔记）
│   │   ├── Tools/           #   工具箱（加解密 / 换算 / 图片等）
│   │   ├── About/           #   关于我 / 作品集 / 联系
│   │   ├── MessageBoard/    #   留言板
│   │   ├── Links/           #   友情链接
│   │   ├── Nav/             #   常用网站导航
│   │   └── Material/        #   前端资料
│   ├── App.vue              # 根组件（开门动画 / 主题初始化）
│   └── main.js              # 入口文件
├── vite.config.js           # Vite 构建配置
├── package.json             # 项目依赖
└── LICENSE                  # MIT 开源协议
```

---

## 🚀 快速开始

### 环境要求

- **Node.js** >= 16
- **Yarn** >= 1.22

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/LeviQin/Levi-Blog.git
cd Levi-Blog

# 安装依赖
yarn install

# 启动开发服务器（localhost:9527）
yarn dev

# 构建生产版本
yarn build

# 预览构建结果
yarn preview
```

---

## 🎨 主题与特效

### 主题系统

| 功能 | 说明 |
|------|------|
| **明暗切换** | 悬浮工具栏月亮/太阳按钮，偏好持久化 |
| **按时自动切换** | 18:00-08:00 自动暗色，其余亮色（可关闭） |
| **首页 Hero** | 分屏布局：终端风格标题 + 代码窗口 |

### 背景特效

点击右下角悬浮工具栏的星星图标，可打开特效设置面板：

- **4 种 Canvas 特效**：代码雨 / 粒子连线 / 星空 / 浮尘
- **可调参数**：密度、速度、强度、颜色（5 档预设）
- **实时预览**：面板内直接看到当前特效效果
- **底色搭配**：多套配色光晕 + 特效叠加

---

## 📄 页面一览

### 📝 文章分类
| 页面 | 地址 |
|------|------|
| 🏠 首页 | [leviqin.top](https://leviqin.top) |
| 📔 日常随记 | [/category/daily](https://leviqin.top/category/daily) |
| 💻 开发心得 | [/category/technology](https://leviqin.top/category/technology) |
| 🐱 萌宠日记 | [/category/cute-pet](https://leviqin.top/category/cute-pet) |
| 📒 学习笔记 | [/category/notes](https://leviqin.top/category/notes) |
| 🌄 光影故事 | [/category/landscape](https://leviqin.top/category/landscape) |

### 🔧 工具箱
| 工具 | 地址 |
|------|------|
| 🔐 加解密 | [/encryption](https://leviqin.top/encryption) |
| 📏 单位换算 | [/unit](https://leviqin.top/unit) |
| 🔑 密码生成器 | [/password](https://leviqin.top/password) |
| 🖼 图片处理 | [/image-processing](https://leviqin.top/image-processing) |
| 🗜 图片压缩 | [/image-compression](https://leviqin.top/image-compression) |
| 📋 图片 EXIF | [/image-exif-view](https://leviqin.top/image-exif-view) |

### 👤 关于我
| 页面 | 地址 |
|------|------|
| 🧑 关于我 | [/about](https://leviqin.top/about) |
| 💼 作品集 | [/portfolio](https://leviqin.top/portfolio) |

### 📌 其他
| 页面 | 地址 |
|------|------|
| 🔗 常用网站 | [/nav](https://leviqin.top/nav) |
| 💬 留言板 | [/comments](https://leviqin.top/comments) |
| 🤝 友情链接 | [/friendlinks](https://leviqin.top/friendlinks) |

---

## ⚡ 构建优化

生产构建里做了一些偏“实用主义”的处理，主要目标是减少体积、让首屏更轻一点：

| 优化项 | 策略 |
|--------|------|
| **代码压缩** | esbuild minify，速度远快于 terser |
| **CSS 处理** | 所有 CSS 合并为单一文件 |
| **图片优化** | vite-plugin-imagemin 自动转 WebP，质量 60% |
| **Chunk 分割** | 组件级代码分割，按需加载 |
| **Source Map** | 生产环境关闭，减小体积 |
| **静态资源** | 带 hash 的文件名，长效缓存 |
| **构建清单** | 生成 manifest.json，便于服务端集成 |
| **特效性能** | Canvas 限制 DPR ≤ 2，页面隐藏自动暂停动画 |

---

## 🤝 参与贡献

如果你在使用中发现问题，或者有更顺手的实现方式，欢迎提 Issue / PR：

1. **Fork** 本仓库
2. 创建你的特性分支：`git checkout -b feature/amazing-feature`
3. 提交你的更改：`git commit -m 'feat: add amazing feature'`
4. 推送到分支：`git push origin feature/amazing-feature`
5. 发起 **Pull Request**

---

## 📄 开源协议

本项目基于 [MIT License](LICENSE) 开源，你可以自由地使用、修改和分发。

---

<p align="center">
  <sub>如果这个项目对你有帮助，请给一个 ⭐️ 吧！</sub>
</p>
