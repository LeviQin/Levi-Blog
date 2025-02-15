// src/stores/mainStore.js
import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
    state: () => ({
        shouldBlur: false,
    }),
    actions: {
        setBlur(status) {
            this.shouldBlur = status;
        },
    },
});
