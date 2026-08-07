import {
    ref,
    watchEffect
} from "vue";
import {
    getStore,
    setStore
} from "../utils/storage"

const key = "__theme__";

// 读取主题，仅接受 dark/light，其他值(含残留脏数据)回退默认 dark
const stored = getStore(key);
const theme = ref(stored === "dark" || stored === "light" ? stored : "dark");

watchEffect(() => {
    document.documentElement.dataset.theme = theme.value;
    setStore(key, theme.value)
});

export function useTheme() {
    return {
        theme,
        toggleTheme() {
            theme.value = theme.value === "light" ? "dark" : "light";
        }
    };
}