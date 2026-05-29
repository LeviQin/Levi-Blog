<h1 align="center">Levi Blog</h1>

<p align="center">
  <strong>一个有意思的博客 — 工作记录 · 日常分享 · 实用工具箱</strong>
</p>

<p align="center">
  <a href="https://leviqin.top"><img src="https://img.shields.io/badge/Live-Demo-4FC08D?style=for-the-badge&logo=vercel" alt="Live Demo" /></a>
  <a href="https://github.com/LeviQin/Levi-Blog"><img src="https://img.shields.io/badge/GitHub-Repo-181717?style=for-the-badge&logo=github" alt="GitHub Repo" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.3-4FC08D?logo=vuedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-3.0-646CFF?logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Pinia-3.0-FFD700?logo=pinia" />
  <img src="https://img.shields.io/badge/Router-4.1-4FC08D?logo=vuedotjs" />
  <img src="https://img.shields.io/badge/Sass-CSS-CC6699?logo=sass&logoColor=white" />
  <img src="https://img.shields.io/badge/Axios-HTTP-5A29E4?logo=axios" />
</p>

---

## 📖 项目简介

Levi Blog 是一个基于 **Vue 3 + Vite** 构建的现代化个人博客系统，集成了 **文章发布、分类浏览、在线工具箱、留言互动** 等功能模块。项目采用响应式设计，完美适配桌面端与移动端。

<table>
  <tr>
    <td><strong>⭐ 组件总数</strong></td>
    <td><code>97</code> 个 Vue 单文件组件</td>
  </tr>
  <tr>
    <td><strong>📄 页面路由</strong></td>
    <td><code>28</code> 条，含文章分类 / 工具箱 / 独立页面</td>
  </tr>
  <tr>
    <td><strong>🧰 工具模块</strong></td>
    <td><code>12</code> 个 utils + <code>10</code> 个 api 模块</td>
  </tr>
  <tr>
    <td><strong>🔍 SEO</strong></td>
    <td>Google · Baidu · Bing · 360 · 搜狗 五站验证</td>
  </tr>
  <tr>
    <td><strong>📦 包管理</strong></td>
    <td>Yarn · 30 个依赖 · 零冗余</td>
  </tr>
</table>

---

## ✨ 特性亮点

<table>
  <tr>
    <td width="50%">
      <h4>🚀 极致性能</h4>
      <ul>
        <li>Vite 构建，esbuild 压缩，秒级 HMR</li>
        <li>路由懒加载 + 组件级代码分割</li>
        <li>CSS 合并为单一文件，减少请求</li>
        <li>图片 WebP 自动转换（质量 60%）</li>
        <li>图片懒加载，降低首屏压力</li>
      </ul>
    </td>
    <td width="50%">
      <h4>🎨 交互体验</h4>
      <ul>
        <li>Markdown 文章渲染 + 代码高亮</li>
        <li>图片预览 / 裁剪 / EXIF 查看</li>
        <li>Canvas 雪花飘动特效</li>
        <li>Lottie 猫咪互动动画</li>
        <li>壁纸切换 + 主题自定义</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>
      <h4>📱 完美响应式</h4>
      <ul>
        <li>桌面 / 平板 / 手机 三端适配</li>
        <li>抽屉式导航 + 悬浮工具栏</li>
        <li>自适应文章骨架屏加载</li>
        <li>移动端手势支持（hammer.js）</li>
      </ul>
    </td>
    <td>
      <h4>🔧 内置工具箱</h4>
      <ul>
        <li>加密解密（AES / DES / MD5 / RC4 等）</li>
        <li>图片处理（压缩 / 裁剪 / 格式转换 / EXIF）</li>
        <li>密码生成器 / 单位换算 / 二维码生成</li>
        <li>IP 查询 / 天气查询 / 前端开发工具</li>
      </ul>
    </td>
  </tr>
</table>

---

## 🛠 技术栈

| 类别 | 技术选型 | 说明 |
|------|----------|------|
| **框架** | Vue 3.3 + Composition API | 渐进式前端框架 |
| **构建** | Vite 3.0 | 下一代前端构建工具 |
| **路由** | Vue Router 4 | SPA 路由管理 |
| **状态** | Pinia 3 + 持久化插件 | 轻量级状态管理 |
| **HTTP** | Axios | Promise 风格 HTTP 客户端 |
| **样式** | Sass + Bootstrap Icons | CSS 预处理 + 图标库 |
| **Markdown** | md-editor-v3 + Prism.js | 富文本渲染与语法高亮 |
| **图片** | Compressor.js + Cropper.js + ExifReader | 压缩 / 裁剪 / 元数据 |
| **加密** | Crypto-JS + MD5 | 浏览器端加解密 |
| **动画** | Lottie Web + Hammer.js | 矢量动画 + 手势交互 |
| **自动导入** | unplugin 系列 | API / 组件 / 图标按需加载 |

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
│   │   ├── wallpaper.js     #   壁纸接口
│   │   └── ...
│   ├── assets/              # 🎨 静态资源（字体 / 图标 / 图片）
│   ├── components/          # 🧩 通用组件库（50 个组件）
│   │   ├── MarkdownRenderer #   Markdown 渲染器
│   │   ├── ImagePreview     #   图片预览
│   │   ├── BackToTop        #   回到顶部
│   │   ├── SwitchWallpaper  #   壁纸切换
│   │   ├── Countdown        #   倒计时
│   │   ├── CatPet           #   撸猫互动
│   │   ├── EmojiIconBox     #   表情选择器
│   │   ├── ArticleSkeleton  #   骨架屏
│   │   ├── FloatToolBar     #   悬浮工具栏
│   │   └── ...
│   ├── directives/          # 📌 自定义指令
│   ├── hooks/               # 🪝 组合式函数（useTheme / useGetData）
│   ├── layout/              # 🏗 布局组件（Header / Footer / 导航抽屉）
│   ├── router/              # 🧭 路由配置（28 条路由）
│   ├── stores/              # 📦 Pinia 状态仓库
│   ├── styles/              # 🎭 全局样式（base / element / md）
│   ├── utils/               # 🔧 工具函数（12 个模块）
│   │   ├── request.js       #   Axios 封装
│   │   ├── storage.js       #   localStorage 封装
│   │   ├── scrollAnimation  #   滚动动画
│   │   ├── vSlidIn.js       #   元素滑入指令
│   │   └── ...
│   ├── views/               # 📄 页面视图（40 个页面组件）
│   │   ├── Home/            #   首页
│   │   ├── Topic/           #   文章分类（日记 / 技术 / 萌宠 / 光影 / 笔记）
│   │   ├── Tools/           #   工具箱（12 个子工具）
│   │   ├── About/           #   关于我 / 作品集
│   │   ├── MessageBoard/    #   留言板
│   │   ├── Links/           #   友情链接
│   │   ├── Nav/             #   常用网站导航
│   │   └── Material/        #   前端资料
│   ├── App.vue              # 根组件
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

### 📌 其他
| 页面 | 地址 |
|------|------|
| 🔗 常用网站 | [/nav](https://leviqin.top/nav) |
| 💬 留言板 | [/comments](https://leviqin.top/comments) |
| 🤝 友情链接 | [/friendlinks](https://leviqin.top/friendlinks) |
| 👤 关于我 | [/about](https://leviqin.top/about) |

---

## ⚡ 构建优化

Vite 生产构建采用以下策略确保最佳性能：

| 优化项 | 策略 |
|--------|------|
| **代码压缩** | esbuild minify，速度远快于 terser |
| **CSS 处理** | 所有 CSS 合并为单一文件 |
| **图片优化** | vite-plugin-imagemin 自动转 WebP，质量 60% |
| **Chunk 分割** | 组件级代码分割，按需加载 |
| **Source Map** | 生产环境关闭，减小体积 |
| **静态资源** | 带 hash 的文件名，长效缓存 |
| **构建清单** | 生成 manifest.json，便于服务端集成 |

---

## 🤝 参与贡献

欢迎任何形式的贡献！如果你有好的想法或发现了 Bug：

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
