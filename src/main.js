import {
    createApp
} from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./permission";

createApp(App).use(router).use(ElementPlus).mount("#app");