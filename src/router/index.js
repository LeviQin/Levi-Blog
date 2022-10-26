import { createRouter, createWebHistory } from "vue-router";
import constantRoutes from "./routes";

const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes,
    scrollBehavior(to, form, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
});

// 重置路由器解决控制台大量警告的问题
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher;
};

export default router;