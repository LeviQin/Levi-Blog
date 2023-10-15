import Layout from "@/layout/Index.vue";

export default [{
        path: "/",
        component: Layout,
        redirect: "/dashboard",
        children: [{
                path: "/dashboard",
                component: () => import("@/views/Dashboard/Index.vue"),
                name: "Dashboard",
                meta: {
                    title: "dashboard",
                }
            },
            {
                path: "/nav",
                component: () => import("@/views/Nav/Index.vue"),
                name: "Nav",
                meta: {
                    title: "Nav",
                }
            },
            {
                path: "/material",
                component: () => import("@/views/Material/Index.vue"),
                name: "Material",
                meta: {
                    title: "Material",
                }
            },
            {
                path: "/tools",
                component: () => import("@/views/Tools/Index.vue"),
                name: "Tools",
                meta: {
                    title: "Tools",
                }
            },
            {
                path: "/ip",
                component: () => import("@/views/Tools/IpIdentification.vue"),
                name: "IP",
                meta: {
                    title: "IP",
                }
            },
            {
                path: "/password",
                component: () => import("@/views/Tools/EncryptionAndDecryption.vue"),
                name: "Password",
                meta: {
                    title: "Password",
                }
            },
        ]
    },
    {
        path: "/about",
        component: () => import("@/views/About/Index.vue"),
        name: "About",
        meta: {
            title: "About",
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