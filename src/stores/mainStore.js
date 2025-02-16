// src/stores/mainStore.js
import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
    state: () => ({
        shouldBlur: false,
        tagMap: []
    }),
    actions: {
        setBlur(status) {
            this.shouldBlur = status;
        },
        setTagMap(tagMap) {
            this.tagMap = tagMap;
        },
    },
});
