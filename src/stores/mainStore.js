import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
    state: () => ({
        tagMap: [],
        wallpaperMap: [],
        blogSettingMap: {},
        backgroundImage: "radial-gradient(circle at 22% 30%, rgba(34,211,238,0.10), transparent 46%), radial-gradient(circle at 78% 65%, rgba(34,211,238,0.06), transparent 42%), var(--background)",
        // 背景特效配置：type 特效类型，density/speed/opacity 0-100，color 十六进制
        fxConfig: {
            type: "none",
            density: 50,
            speed: 50,
            opacity: 40,
            color: "#22d3ee",
        },
    }),
    actions: {
        setTagMap(tagMap) {
            this.tagMap = tagMap;
        },
        setBackgroundImage(image) {
            this.backgroundImage = image;
        },
        setBlogSettingMap(blogSettingMap) {
            this.blogSettingMap = blogSettingMap;
        },
        setWallpaperMap(wallpaperMap) {
            this.wallpaperMap = wallpaperMap;
        },
        setFxConfig(config) {
            this.fxConfig = { ...this.fxConfig, ...config };
        },
    },
    persist: {
        enabled: true, // 开启持久化
    }
});
