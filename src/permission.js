import router from "./router/index.js";
import NProgress from "nprogress"; // 进度条
import "nprogress/nprogress.css"; // 进度栏样式

NProgress.configure({
    showSpinner: false
}); // NProgress配置

router.beforeEach(async (to, from, next) => {
    document.title = `${to.meta.title} - ${document.title}` || "Levi 分享一切之地";
    NProgress.start();
    next();
});

router.afterEach(() => {
    NProgress.done();
});