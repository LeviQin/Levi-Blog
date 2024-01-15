import router from "./router/index.js";
import NProgress from "nprogress"; // 进度条
import "nprogress/nprogress.css"; // 进度栏样式
import { scrollAnimation } from "@/utils/scrollAnimation.js";

NProgress.configure({
    showSpinner: false
}); // NProgress配置

router.beforeEach(async (to, from, next) => {
    document.title = `${to.meta.title}` || "Levi的博客，记录分享前端知识，工作中遇到的问题和心得，以及日常的生活风景与萌宠";
    NProgress.start();
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    scrollAnimation(scrollTop, "top");
    next();
});

router.afterEach(() => {
    NProgress.done();
});