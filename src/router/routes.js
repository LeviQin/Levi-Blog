import Layout from "@/layout/Index.vue";

export default [
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/Index.vue'),
                name: 'dashboard',
                meta: {
                    title: 'dashboard',
                }
            },
            {
                path: 'article',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/article/Index.vue'),
                name: 'article',
                meta: {
                    title: 'article',
                }
            }
        ]
    },
    {
        path: '/:catchAll(.*)',
        redirect: "/404",
        meta: {
          title: '重定向',
        },
      },
    {
        path: '/404',
        name: "error404",
        component: () => import('@/views/errorPage/404.vue'),
        meta: {
            title: '页面不存在',
        },
    },
]