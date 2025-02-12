import router from "./router/index.js";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import {
    scrollAnimation
} from "@/utils/scrollAnimation.js";
import {
    setStore,
    getStore
} from "@/utils/storage.js";

NProgress.configure({
    showSpinner: false
});

router.beforeEach(async (to, from, next) => {
    setStore("LEVI_PREVIONS_ROUTE_NAME", from.name);
    document.title = `${to.meta.title}` || "免费开源博客，各种文章，组件，简历，小工具应有尽有。";
    NProgress.start();
    next();
});

router.afterEach(() => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const previousRouteName = getStore("LEVI_PREVIONS_ROUTE_NAME");
    const pageStatus = getStore("LEVI_PAGE_STATUS");
    if (previousRouteName === `Topic Detail`) {
        scrollAnimation(pageStatus.scrollHeight, "bottom", 0);
    } else {
        scrollAnimation(scrollTop, "top", 0);
    }
    NProgress.done();
});