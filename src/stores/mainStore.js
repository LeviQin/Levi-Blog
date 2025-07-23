import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
    state: () => ({
        tagMap: [],
        wallpaperMap: [],
        blogSettingMap: {},
        backgroundImage: ""
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