import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
    state: () => ({
        tagMap: [],
        backgroundImage: ""
    }),
    actions: {
        setTagMap(tagMap) {
            this.tagMap = tagMap;
        },
        setBackgroundImage(image) {
            this.backgroundImage = image;
        }
    },
    persist: {
        enabled: true, // 开启持久化
    }
});