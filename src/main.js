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

const loadimage = "/src/assets/images/defualt-image.svg";
const errorimage = "/src/assets/images/defualt-image.svg";

createApp(App).use(VueLazyload, {
    preLoad: 1.3, // 预加载的高度比例
    loading: loadimage,
    error: errorimage,
    attempt: 1, // 尝试加载的次数
}).use(router).use(ElementPlus).mount("#app");