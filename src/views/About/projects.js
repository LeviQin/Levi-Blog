// 作品集项目数据：与简历对齐，全部文字卡片
export const projects = [
  {
    id: 12,
    name: "归期本（SubEase）",
    link: "",
    isApp: true,
    desc: "个人独立开发的微信小程序，订阅管理与到期提醒工具。支持微信登录、订阅增删改查与筛选、订阅消息到期推送提醒、多币种汇率折算与支出分析、CSV 数据导出（带鉴权与越权防护）、反馈闭环与轻量埋点。前端 uni-app + Pinia，后端 Koa2 + MySQL + JWT + Socket.IO。",
    tags: ["uni-app", "Vue3", "Pinia", "Koa2"],
  },
  {
    id: 13,
    name: "口袋任务（pocket-task）",
    link: "",
    isApp: true,
    desc: "个人独立开发的 uni-app 多端小程序，任务管理与互动场景。基于 Vue 3 构建，内置 Pinia 状态管理、Socket.IO 实时能力，以及请求层鉴权与自动刷新 Token 逻辑，面向微信小程序等多端运行。",
    tags: ["uni-app", "Vue3", "Pinia", "Socket.IO"],
  },
  {
    id: 1,
    name: "Super Easy AI Web",
    link: "",
    desc: "Nuxt4 AI 创作平台，主导前端架构。设计动态 AI App 渲染引擎，按配置自动渲染 10+ 类型控件，新增工具页仅需配置接入；轮询重构为 WebSocket + Pinia 任务状态机，实现刷新恢复、终态锁定与任务取消；接入 Stripe 订阅、reCAPTCHA 风控、GA4 付费埋点，处理 iframe 嵌入与 SSR/SEO 兼容，补充 Vitest 测试。",
    tags: ["Nuxt4", "TypeScript", "WebSocket", "Stripe"],
  },
  {
    id: 2,
    name: "Easeware ECC 后台",
    link: "",
    desc: "内部运营后台，负责整体工程搭建与项目结构设计。搭建权限体系（动态菜单/路由守卫/按钮指令）并封装 Axios 请求层（Token 刷新、401 重试）；抽象通用 DataTable 支持万级数据本地搜索/筛选/排序/导出；开发订单详情操作台（退款/订阅/自动扣费/License），Webpack 构建体积 19MB→7MB。",
    tags: ["Vue3", "Element Plus", "Webpack", "权限体系"],
  },
  {
    id: 3,
    name: "supereasy.com 插件体系",
    link: "https://www.supereasy.com/",
    desc: "开发维护约 30 个 WordPress 插件、10+ 转化类 Gutenberg Block（基于 React/wp.element 实现编辑器组件），将内容增长需求产品化；建设 People Search 与工具页体系（Username/Email/Caller ID/VIN 等），支持校验、reCAPTCHA 与 tracking；按页面/模板/短代码条件加载脚本，优化内容页性能。",
    tags: ["WordPress", "PHP", "React", "Gutenberg"],
  },
  {
    id: 4,
    name: "Easeware Zendesk App",
    link: "",
    desc: "从 0 到 1 开发工单侧边栏应用，自动解析邮箱与 License Key，实现双维度订单聚合查询；封装订单查询/退款/退订/自动扣款接口，退款页同步 ECC 逻辑，降低误操作与二次工单风险。",
    tags: ["Zendesk SDK", "Vue3", "订单系统"],
  },
  {
    id: 5,
    name: "Driver Easy 多语种站点",
    link: "https://www.drivereasy.com/",
    desc: "维护英/德/法/意/西/日购买页与购买组件，支持 7-day free trial 与 URL 参数联动；重构 Contact Us 为模板+后台配置；开发 unsubscribe 接入 reCAPTCHA，改造异步表单。",
    tags: ["多语种", "国际化", "reCAPTCHA"],
  },
  {
    id: 6,
    name: "IM SDK",
    link: "https://open.lwim.cn/doc/",
    desc: "负责 IM SDK 技术选型与架构设计，选定 Rollup 打包；封装二进制封包/拆包、WebSocket、文件上传模块，Canvas 图片压缩；作为可访 APP 与 IM 类产品的底层通信能力。",
    tags: ["JS SDK", "WebSocket", "Rollup"],
  },
  {
    id: 7,
    name: "可访 APP Flutter 版",
    link: "https://www.kefangapp.com/#/download",
    desc: "基于 Flutter 开发的跨平台 IM 聊天软件，独立完成整体架构与多端适配，集成 IM SDK 实现即时通信、文件传输等核心功能。",
    tags: ["Flutter", "IM", "跨平台"],
  },
  {
    id: 8,
    name: "可访 Web 版",
    link: "https://web.kefangapp.com/",
    desc: "Vue 全家桶构建可访网页版，实现扫码登录、地图消息、Vant + rem 移动端适配，与 APP 端保持功能对齐。",
    tags: ["Vue", "Vant", "移动端"],
  },
  {
    id: 9,
    name: "领兀云官网",
    link: "https://www.lwim.cn/",
    desc: "云服务官网，负责全部前端开发与维护，含响应式布局与多端适配，承载产品介绍与品牌展示。",
    tags: ["官网", "响应式"],
  },
  {
    id: 10,
    name: "开发者平台",
    link: "https://open.lwim.cn/",
    desc: "开发者平台，开发权限管理、工单系统、直播管理模块，配合官网与 SDK 文档形成完整开发者生态。",
    tags: ["Vue", "后台管理"],
  },
  {
    id: 11,
    name: "爱华盈通官网",
    link: "https://www.aiwinn.com/",
    desc: "企业官网及宣传类 H5 开发与维护，与产品/UI/后端配合完成需求评审、设计还原、接口联调与性能优化。",
    tags: ["官网", "H5"],
  },
];

// 作品页精选（排除小程序项目，保留 6 个工作项目；小程序只在完整作品集页显示）
export const featuredProjects = projects.filter((p) => !p.isApp).slice(0, 6);
