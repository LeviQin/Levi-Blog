import {
    ref,
    watchEffect
} from "vue";
import {
    getStore,
    setStore
} from "../utils/storage"

const key = "__theme__";
const autoKey = "__theme_auto__";

// 固定时间段：18:00 - 08:00 为暗色，其余为亮色
const DARK_START_HOUR = 18;
const DARK_END_HOUR = 8;

// 根据当前时间计算应使用的主题
function themeByTime() {
    const hour = new Date().getHours();
    // 18 <= hour 或 hour < 8 时为暗色
    return (hour >= DARK_START_HOUR || hour < DARK_END_HOUR) ? "dark" : "light";
}

// 读取主题，仅接受 dark/light，其他值(含残留脏数据)回退默认 dark
const stored = getStore(key);
const theme = ref(stored === "dark" || stored === "light" ? stored : "dark");

// 是否启用自动跟随时间
const autoTheme = ref(getStore(autoKey) === true || getStore(autoKey) === "true");

// 应用主题到 html
function applyTheme() {
    document.documentElement.dataset.theme = theme.value;
    setStore(key, theme.value);
}

// 自动模式下按时间更新主题
function syncWithTime() {
    if (!autoTheme.value) return;
    const next = themeByTime();
    if (theme.value !== next) {
        theme.value = next;
    }
}

// 每分钟检查一次，跨时间边界时自动切换
let timer = null;
if (typeof window !== "undefined") {
    timer = window.setInterval(syncWithTime, 60000);
    // 初始同步一次
    syncWithTime();
}

watchEffect(() => {
    applyTheme();
});

// 手动切换时退出自动模式
function toggleTheme() {
    autoTheme.value = false;
    theme.value = theme.value === "light" ? "dark" : "light";
}

// 设置自动跟随时间模式
function setAutoTheme(enabled) {
    autoTheme.value = enabled;
    if (enabled) {
        syncWithTime();
    }
}

watchEffect(() => {
    setStore(autoKey, autoTheme.value);
});

export function useTheme() {
    return {
        theme,
        autoTheme,
        toggleTheme,
        setAutoTheme,
    };
}
