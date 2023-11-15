import router from "./router/index.js";
import NProgress from "nprogress"; // 进度条
import "nprogress/nprogress.css"; // 进度栏样式
import { scrollAnimation } from "@/utils/scrollAnimation.js";

NProgress.configure({
    showSpinner: false
}); // NProgress配置

router.beforeEach(async (to, from, next) => {
    document.title = `${to.meta.title} - Levi 笔迹` || "Levi 笔迹";
    NProgress.start();
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    scrollAnimation(scrollTop, "top");
    next();
});

router.afterEach(() => {
    NProgress.done();
});