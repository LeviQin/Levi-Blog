import Layout from "@/layout/Index.vue";
import Home from "@/views/Home/Index.vue";

export default [{
        path: "/",
        component: Layout,
        redirect: "/",
        children: [{
                path: "/",
                component: Home,
                name: "Home",
                meta: {
                    title: "Levi 笔迹分享",
                }
            },
            {
                path: "/daily",
                component: () => import("@/views/Topic/Daily.vue"),
                name: "Daily",
                meta: {
                    title: "笔迹分类（日常）",
                }
            },
            {
                path: "/technology",
                component: () => import("@/views/Topic/Technology.vue"),
                name: "Technology",
                meta: {
                    title: "笔迹分类（技术）",
                }
            },
            {
                path: "/cute-pet",
                component: () => import("@/views/Topic/CutePet.vue"),
                name: "Cute Pet",
                meta: {
                    title: "笔迹分类（萌宠）",
                }
            },
            {
                path: "/landscape",
                component: () => import("@/views/Topic/Landscape.vue"),
                name: "Landscape",
                meta: {
                    title: "笔迹分类（风景）",
                }
            },
            {
                path: "/notes",
                component: () => import("@/views/Topic/notes.vue"),
                name: "Notes",
                meta: {
                    title: "笔迹分类（笔记）",
                }
            },
            {
                path: "/figure",
                component: () => import("@/views/Topic/Figure.vue"),
                name: "Figure",
                meta: {
                    title: "笔迹分类（人物）",
                }
            },
            {
                path: "/game",
                component: () => import("@/views/Topic/Game.vue"),
                name: "Game",
                meta: {
                    title: "笔迹分类（游戏）",
                }
            },
            {
                path: "/embarrassing",
                component: () => import("@/views/Topic/Embarrassing.vue"),
                name: "Embarrassing",
                meta: {
                    title: "笔迹分类（囧事）",
                }
            },
            {
                path: "/topic-detail/:id",
                component: () => import("@/views/Topic/TopicDetail.vue"),
                name: "Topic Detail",
                meta: {
                    title: "笔迹详情",
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
                path: "/ip",
                component: () => import("@/views/Tools/IPAddress.vue"),
                name: "IP",
                meta: {
                    title: "IP地址查询",
                }
            },
            {
                path: "/unit",
                component: () => import("@/views/Tools/UnitConversion.vue"),
                name: "Unit",
                meta: {
                    title: "单位换算",
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
                path: "/weather",
                component: () => import("@/views/Tools/Weather.vue"),
                name: "Weather",
                meta: {
                    title: "天气查询",
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