import {
    ref,
    watchEffect
} from "vue";
import {
    getStore,
    setStore
} from "../utils/storage"

const key = "__theme__";

const theme = ref(getStore(key) || "light");

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