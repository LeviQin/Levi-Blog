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
                    title: "Levi 博客分享 - 开源博客、多端适应、全栈开发。可作为模版改造使用。",
                }
            },
            {
                path: "/category/daily",
                component: () => import("@/views/Topic/Daily.vue"),
                name: "Daily",
                meta: {
                    title: "文章分类 - 日常",
                }
            },
            {
                path: "/category/technology",
                component: () => import("@/views/Topic/Technology.vue"),
                name: "Technology",
                meta: {
                    title: "文章分类 - 开发",
                }
            },
            {
                path: "/category/cute-pet",
                component: () => import("@/views/Topic/CutePet.vue"),
                name: "Cute Pet",
                meta: {
                    title: "文章分类 - 萌宠",
                }
            },
            {
                path: "/category/landscape",
                component: () => import("@/views/Topic/Landscape.vue"),
                name: "Landscape",
                meta: {
                    title: "文章分类 - 风景",
                }
            },
            {
                path: "/category/notes",
                component: () => import("@/views/Topic/notes.vue"),
                name: "Notes",
                meta: {
                    title: "文章分类 - 笔记",
                }
            },
            {
                path: "/category/figure",
                component: () => import("@/views/Topic/Figure.vue"),
                name: "Figure",
                meta: {
                    title: "文章分类 - 人物",
                }
            },
            {
                path: "/category/games",
                component: () => import("@/views/Topic/Games.vue"),
                name: "Games",
                meta: {
                    title: "文章分类 - 游戏",
                }
            },
            {
                path: "/category/embarrassing",
                component: () => import("@/views/Topic/Embarrassing.vue"),
                name: "Embarrassing",
                meta: {
                    title: "文章分类 - 囧事",
                }
            },
            {
                path: "/topic-detail/:id",
                component: () => import("@/views/Topic/TopicDetail.vue"),
                name: "Topic Detail",
                meta: {
                    title: "文章详情 - Levi",
                }
            },
            {
                path: "/nav",
                component: () => import("@/views/Nav/Index.vue"),
                name: "Nav",
                meta: {
                    title: "常用网站 - 网站导航，AI，开发，设计，博客，论坛，工具服务，社交媒体，新闻资讯 - Levi",
                }
            },
            {
                path: "/comments",
                component: () => import("@/views/MessageBoard/Index.vue"),
                name: "Message Board",
                meta: {
                    title: "留言板 - Levi",
                }
            },
            {
                path: "/material",
                component: () => import("@/views/Material/Index.vue"),
                name: "Material",
                meta: {
                    title: "前端资料 - Levi",
                }
            },
            {
                path: "/ip",
                component: () => import("@/views/Tools/IPAddress.vue"),
                name: "IP",
                meta: {
                    title: "IP地址查询 - 一款免费的 IP 地址查询工具，可查找您的 IP 地址及其地理位置。验证 IP 地址、主机名和互联网服务提供商（ISP），帮助检测恶意活动。 - Levi",
                }
            },
            {
                path: "/unit",
                component: () => import("@/views/Tools/UnitConversion.vue"),
                name: "Unit",
                meta: {
                    title: "单位换算 - 长度得换算，重量单位换算，单位换算工具，压力功率换算，面积体积单位换算，温度单位换算，时间单位换算 - Levi",
                }
            },
            {
                path: "/encryption",
                component: () => import("@/views/Tools/EncryptionAndDecryption.vue"),
                name: "Encryption",
                meta: {
                    title: "加密/解密 - 加密,解密,对称加密,非对称加密 - Levi",
                }
            },
            {
                path: "/weather",
                component: () => import("@/views/Tools/Weather.vue"),
                name: "Weather",
                meta: {
                    title: "天气查询 - Levi",
                }
            },
            {
                path: "/qr",
                component: () => import("@/views/Tools/QRCode.vue"),
                name: "QR Code",
                meta: {
                    title: "二维码生成 -在线免费的二维码生成器 - Levi",
                }
            },
            {
                path: "/password",
                component: () => import("@/views/Tools/PasswordGenerator.vue"),
                name: "Password",
                meta: {
                    title: "密码生成器 - ✓安全 ✓随机 ✓强大 —— 使用我们的随机密码生成器生成强密码 - Levi",
                }
            },
            {
                path: "/image-processing",
                component: () => import("@/views/Tools/ImageProcessing.vue"),
                name: "Image Processing",
                meta: {
                    title: "图片处理 - 在线图片格式转换， 智能压缩， 图片加水印， 旋转图片， 图片转文字 - Levi",
                }
            },
            {
                path: "/image-compression",
                component: () => import("@/views/Tools/components/ImagePage/ImageCompression.vue"),
                name: "Image Compression",
                meta: {
                    title: "图片压缩 - 智能压缩 WebP、PNG 和 JPEG 图像 - Levi",
                }
            },
            {
                path: "/image-format-conversion",
                component: () => import("@/views/Tools/components/ImagePage/ImageFormatConversion.vue"),
                name: "Image Format Conversion",
                meta: {
                    title: "图片格式转换 - 在线图片格式转换器、JPG/GIF/PNG/WEBP/HEIC图片文件类型在线修改 - Levi",
                }
            },
            {
                path: "/front-end",
                component: () => import("@/views/Tools/FrontEndTools.vue"),
                name: "Front End",
                meta: {
                    title: "前端 - Levi",
                }
            },
            {
                path: "/links",
                component: () => import("@/views/Links/Index.vue"),
                name: "Links",
                meta: {
                    title: "友情链接 - Levi",
                }
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
    },
    {
        path: "/about",
        component: () => import("@/views/About/Index.vue"),
        name: "About",
        meta: {
            title: "关于我 - Levi",
        }
    },
    {
        path: "/:catchAll(.*)",
        redirect: "/404",
        meta: {
            title: "重定向",
        },
    },
]