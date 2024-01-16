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
                    title: "Levi的博客，记录分享前端知识，工作中遇到的问题和心得，以及日常的生活风景与萌宠",
                }
            },
            {
                path: "/daily",
                component: () => import("@/views/Topic/Daily.vue"),
                name: "Daily",
                meta: {
                    title: "文章分类（日常）",
                }
            },
            {
                path: "/technology",
                component: () => import("@/views/Topic/Technology.vue"),
                name: "Technology",
                meta: {
                    title: "文章分类（技术）",
                }
            },
            {
                path: "/cute-pet",
                component: () => import("@/views/Topic/CutePet.vue"),
                name: "Cute Pet",
                meta: {
                    title: "文章分类（萌宠）",
                }
            },
            {
                path: "/landscape",
                component: () => import("@/views/Topic/Landscape.vue"),
                name: "Landscape",
                meta: {
                    title: "文章分类（风景）",
                }
            },
            {
                path: "/notes",
                component: () => import("@/views/Topic/notes.vue"),
                name: "Notes",
                meta: {
                    title: "文章分类（笔记）",
                }
            },
            {
                path: "/figure",
                component: () => import("@/views/Topic/Figure.vue"),
                name: "Figure",
                meta: {
                    title: "文章分类（人物）",
                }
            },
            {
                path: "/game",
                component: () => import("@/views/Topic/Game.vue"),
                name: "Game",
                meta: {
                    title: "文章分类（游戏）",
                }
            },
            {
                path: "/embarrassing",
                component: () => import("@/views/Topic/Embarrassing.vue"),
                name: "Embarrassing",
                meta: {
                    title: "文章分类（囧事）",
                }
            },
            {
                path: "/topic-detail/:id",
                component: () => import("@/views/Topic/TopicDetail.vue"),
                name: "Topic Detail",
                meta: {
                    title: "文章分类详情",
                }
            },
            {
                path: "/nav",
                component: () => import("@/views/Nav/Index.vue"),
                name: "Nav",
                meta: {
                    title: "常用网站",
                }
            },
            {
                path: "/material",
                component: () => import("@/views/Material/Index.vue"),
                name: "Material",
                meta: {
                    title: "前端资料",
                }
            },
            {
                path: "/tools",
                component: () => import("@/views/Tools/Index.vue"),
                name: "Tools",
                meta: {
                    title: "小工具",
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
            {
                path: "/links",
                component: () => import("@/views/Links/Index.vue"),
                name: "Links",
                meta: {
                    title: "友情链接",
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