import {
    createApp
} from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import VueLazyload from "vue-lazyload";

import "./permission";

// 预览组件以及样式
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
// VuePress主题以及样式（这里也可以选择github主题）
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

// Prism
import Prism from 'prismjs';
// 代码高亮
import 'prismjs/components/prism-json';
// 选择使用主题
VMdPreview.use(vuepressTheme, {
    Prism,
});

import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/cdn';
VMdPreview.use(createKatexPlugin());

import createMermaidPlugin from '@kangc/v-md-editor/lib/plugins/mermaid/cdn';
import '@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css';
VMdPreview.use(createMermaidPlugin());

import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css';
VMdPreview.use(createTodoListPlugin());

import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
VMdPreview.use(createCopyCodePlugin());

import createAlignPlugin from '@kangc/v-md-editor/lib/plugins/align';
VMdPreview.use(createAlignPlugin());

const loadimage = "/src/assets/images/defualt-image.svg";
const errorimage = "/src/assets/images/defualt-image.svg";

createApp(App).use(VMdPreview).use(VueLazyload, {
    preLoad: 1.3, // 预加载的高度比例
    loading: loadimage,
    error: errorimage,
    attempt: 1, // 尝试加载的次数
}).use(router).use(ElementPlus).mount("#app");