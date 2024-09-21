import {
    createApp
} from "vue";
import "./style.scss";
import "./styles/element.scss";
import "./styles/md.scss";
import App from "./App.vue";
import router from "./router/index";
import "bootstrap-icons/font/bootstrap-icons.css";
import VueLazyload from "vue-lazyload";
import "element-plus/dist/index.css";

import "./permission";

import "./assets/fonts/iconfont";

import {
    createHead
} from "@vueuse/head";
const head = createHead();

import loadimage from "@/assets/images/defualt-image.svg";
import errorimage from "@/assets/images/defualt-image.svg";

createApp(App).use(VueLazyload, {
    preLoad: 1.3, // 预加载的高度比例
    loading: loadimage,
    error: errorimage,
    attempt: 2, // 尝试加载的次数
}).use(router).use(head).mount("#app");