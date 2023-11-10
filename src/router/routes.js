import Layout from "@/layout/Index.vue";

export default [{
        path: "/",
        component: Layout,
        redirect: "/home",
        children: [{
                path: "/home",
                component: () => import("@/views/Home/Index.vue"),
                name: "Home",
                meta: {
                    title: "首页",
                }
            },
            {
                path: "/cute-pet",
                component: () => import("@/views/Topic/CutePet.vue"),
                name: "Cute Pet",
                meta: {
                    title: "宠物",
                }
            },
            {
                path: "/landscape",
                component: () => import("@/views/Topic/Landscape.vue"),
                name: "Landscape",
                meta: {
                    title: "风景",
                }
            },
            {
                path: "/topic-detail/:id",
                component: () => import("@/views/Topic/TopicDetail.vue"),
                name: "Topic Detail",
                meta: {
                    title: "专题详情",
                }
            },
            {
                path: "/nav",
                component: () => import("@/views/Nav/Index.vue"),
                name: "Nav",
                meta: {
                    title: "导航",
                }
            },
            {
                path: "/material",
                component: () => import("@/views/Material/Index.vue"),
                name: "Material",
                meta: {
                    title: "文档",
                }
            },
            {
                path: "/tools",
                component: () => import("@/views/Tools/Index.vue"),
                name: "Tools",
                meta: {
                    title: "工具",
                }
            },
            {
                path: "/life",
                component: () => import("@/views/Tools/LifeTools.vue"),
                name: "Life",
                meta: {
                    title: "生活",
                }
            },
            {
                path: "/password",
                component: () => import("@/views/Tools/EncryptionAndDecryption.vue"),
                name: "Password",
                meta: {
                    title: "密码",
                }
            },
            {
                path: "/webmaster",
                component: () => import("@/views/Tools/WebmasterTools.vue"),
                name: "Webmaster",
                meta: {
                    title: "站长工具",
                }
            },
            {
                path: "/front-end",
                component: () => import("@/views/Tools/FrontEndTools.vue"),
                name: "Front End",
                meta: {
                    title: "前端",
                }
            },
        ]
    },
    {
        path: "/about",
        component: () => import("@/views/About/Index.vue"),
        name: "About",
        meta: {
            title: "关于我",
        }
    },
    {
        path: "/:catchAll(.*)",
        redirect: "/404",
        meta: {
            title: "重定向",
        },
    },
    {
        path: "/404",
        name: "Error404",
        component: () => import("@/views/ErrorPage/404.vue"),
        meta: {
            title: "页面不存在",
        },
    },
]