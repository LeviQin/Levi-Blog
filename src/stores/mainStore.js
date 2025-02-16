import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
    state: () => ({
        shouldBlur: false,
        tagMap: [],
        backgroundImage: ""
    }),
    actions: {
        setBlur(status) {
            this.shouldBlur = status;
        },
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