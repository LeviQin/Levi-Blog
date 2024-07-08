import router from "./router/index.js";
import NProgress from "nprogress"; // 进度条
import "nprogress/nprogress.css"; // 进度栏样式
import { scrollAnimation } from "@/utils/scrollAnimation.js";

NProgress.configure({
    showSpinner: false
}); // NProgress配置

router.beforeEach(async (to, from, next) => {
    document.title = `${to.meta.title}` || "Levi的博客是我的前端开发之旅的见证，这里不仅仅是一个开发分享的平台，更是我记录前端知识、工作中遇到的问题与解决方案，以及心得体会的地方。除此之外，我还分享着日常生活中的美好风景和那些让人心生温暖的萌宠瞬间。欢迎你一同探索这个关于技术、经验、生活点滴的小天地。在这里，我希望能够激发灵感、解决疑难，共同成长，共享美好。";
    NProgress.start();
    next();
});

router.afterEach(() => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    scrollAnimation(scrollTop, "top", 0);
    NProgress.done();
});