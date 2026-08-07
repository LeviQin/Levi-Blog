import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
    state: () => ({
        tagMap: [],
        wallpaperMap: [],
        blogSettingMap: {},
        backgroundImage: "radial-gradient(circle at 22% 30%, rgba(34,211,238,0.10), transparent 46%), radial-gradient(circle at 78% 65%, rgba(34,211,238,0.06), transparent 42%), #0d1117"
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
    },
    persist: {
        enabled: true, // 开启持久化
    }
});