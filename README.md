# 个人博客前端项目，使用Vue3+Vite开发, 兼容移动端（响应式）
### 具有轻量美观流畅等特点
### 代码中封装了很多组件和动画
### 目前还未完全开发完毕，正在努力迭代更新中

## 预览地址
[预览博客](https://leviqin.top)

## 预览截图
![](./preview/1700236160346.jpg)
![](./preview/1700236223056.jpg)
![](./preview/1700236277724.jpg)

## 所使用的依赖包介绍
+ 打包工具： `vite`
+ md文档解析： `@kangc/v-md-editor`
+ 代码语法高亮： `prismjs`
+ 瀑布流：`wc-waterfall`
+ css预处理: `sass`
+ 触摸手势： `hammerjs`
+ 日期：`dayjs`
+ icon: `bootstrap-icons`
+ 懒加载：`vue-lazyload`
+ 加/解密：`crypto-js`
+ 混淆：`md5`

## 封装的功能
+ 元素平滑上升： `utils/vSlidIn.js`
+ 页面滚动动画： `utils/scrollAnimation.js`
+ localStorage封装： `utils/storage.js`
+ 回到顶部组件：`components/BackToTop`
+ markdown解析组件：`components/MarkdownRenderer`
+ 雪花飘动组件：`components/MoveSpecialEffect`
+ 雪花飘动组件（canvas版）：`components/TwinklingStars`
+ 页面加载动画： `index.html`
....

### 安装依赖
```
yarn
```

### 开发运行
```
yarn run dev
```

### 打包生产
```
yarn run build
```
