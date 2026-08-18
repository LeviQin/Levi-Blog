<template>
  <div>
    <div class="app-shell">
      <router-view />
      <cat-pet :initial-delay="showEntranceDoor ? 1820 : 0" />
    </div>

    <Teleport to="body">
      <Transition name="door-reveal">
        <div
          v-if="showEntranceDoor"
          class="door-reveal"
          :class="{ 'is-opening': isDoorOpening }"
        >
          <div class="door-panel door-panel-left">
            <div class="door-panel-inner">
              <div class="door-glow"></div>
            </div>
          </div>
          <div class="door-center-badge">
            <span class="door-badge-line"></span>
            <span class="door-badge-text">Levi Blog</span>
            <span class="door-badge-line"></span>
          </div>
          <button class="door-skip" type="button" @click="skipEntrance">
            跳过动画
          </button>
          <div class="door-panel door-panel-right">
            <div class="door-panel-inner">
              <div class="door-glow"></div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { getTagList } from "@/api/articles";
import { getBlogSetting } from "@/api/blogSetting";
import { useMainStore } from "@/stores/mainStore";
import { useTheme } from "@/hooks/useTheme";
import CatPet from "@/components/CatPet/Index.vue";
import { ElNotification } from "@/utils/element.js";
import { getStore, setStore } from "@/utils/storage.js";

// 初始化主题(默认暗色)，确保 html[data-theme] 生效
useTheme();

const mainStore = useMainStore();
const showEntranceDoor = ref(getStore("LEVI_ENTRANCE_SEEN") !== true);
const isDoorOpening = ref(false);
let openTimer = null;
let finishTimer = null;

onMounted(() => {
  getTags();
  getBlogSettingInfo();
  if (showEntranceDoor.value) {
    playEntranceDoor();
  }
});

onBeforeUnmount(() => {
  window.clearTimeout(openTimer);
  window.clearTimeout(finishTimer);
});

const updateMetaDescription = (description) => {
  let meta = document.querySelector("meta[name='description']");
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "description";
    document.head.appendChild(meta);
  }
  meta.content = description;
};

const getTags = async () => {
  try {
    const res = await getTagList();
    const { code, data, message } = res.data;
    if (code == 200) {
      mainStore.setTagMap(data);
    } else {
      throw new Error(message || "标签加载失败");
    }
  } catch (error) {
    ElNotification({
      title: "标签加载失败",
      message: "文章仍可浏览，但标签信息暂时不可用。",
      type: "warning",
      zIndex: 99999,
    });
  }
};

const getBlogSettingInfo = async () => {
  try {
    const res = await getBlogSetting("levi-blog");
    const { code, data, message } = res.data;
    if (code == 200) {
      mainStore.setBlogSettingMap(data);
      document.title = `${data.blog_name} - ${data.blog_description}`;
      const link = document.querySelector("link[rel~='icon']");
      if (link && data.blog_logo) {
        link.type = "image/png";
        link.href = data.blog_logo;
      }
      updateMetaDescription(data.blog_description);
    } else {
      throw new Error(message || "站点配置加载失败");
    }
  } catch (error) {
    ElNotification({
      title: "站点配置加载失败",
      message: "已使用默认页面配置。",
      type: "warning",
      zIndex: 99999,
    });
  }
};

const playEntranceDoor = () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    .matches;
  const openDelay = prefersReducedMotion ? 120 : 520;
  const finishDelay = prefersReducedMotion ? 320 : 1820;

  openTimer = window.setTimeout(() => {
    isDoorOpening.value = true;
  }, openDelay);

  finishTimer = window.setTimeout(() => {
    showEntranceDoor.value = false;
    setStore("LEVI_ENTRANCE_SEEN", true);
  }, finishDelay);
};

const skipEntrance = () => {
  window.clearTimeout(openTimer);
  window.clearTimeout(finishTimer);
  isDoorOpening.value = true;
  showEntranceDoor.value = false;
  setStore("LEVI_ENTRANCE_SEEN", true);
};
</script>
<style lang="scss" scoped>
#app {
  position: relative;
  height: 100%;
}

.app-shell {
  min-height: 100%;
}

.door-reveal {
  position: fixed;
  inset: 0;
  z-index: 2147483645;
  pointer-events: none;
  overflow: hidden;
}

.door-panel {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50.2vw;
  overflow: hidden;
  transition: transform 1.15s var(--ease-out-expo), opacity 0.42s ease;
  background: var(--theme-color);
}

.door-panel-inner {
  position: absolute;
  inset: 0;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    background: rgba(127, 127, 127, 0.22);
  }

  &::before {
    left: 9%;
  }

  &::after {
    right: 9%;
  }
}

.door-panel-left {
  left: 0;
  box-shadow: inset -1px 0 0 rgba(127, 127, 127, 0.2);

  .door-panel-inner::after {
    right: 0;
    width: 2px;
    background: rgba(127, 127, 127, 0.32);
  }
}

.door-panel-right {
  right: 0;
  box-shadow: inset 1px 0 0 rgba(127, 127, 127, 0.2);

  .door-panel-inner::before {
    left: 0;
    width: 2px;
    background: rgba(127, 127, 127, 0.32);
  }
}

.door-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(34, 211, 238, 0.06), rgba(34, 211, 238, 0.02));
  opacity: 1;
}

.door-center-badge {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 18px;
  border: 1px solid var(--border-color);
  border-radius: 999px;
  color: var(--color);
  font-size: 14px;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  background: var(--theme-color);
  backdrop-filter: blur(10px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.22);
  transform: translate(-50%, -50%);
  transition: opacity 0.55s ease, transform 0.9s ease;
  z-index: 2;
}

.door-skip {
  position: absolute;
  right: 24px;
  bottom: 24px;
  z-index: 3;
  pointer-events: auto;
  padding: 7px 12px;
  border: 1px solid var(--border-color);
  border-radius: 999px;
  background: rgba(13, 17, 23, 0.48);
  color: var(--text-secondary);
  font-size: 12px;
  cursor: pointer;
}

.door-skip:hover,
.door-skip:focus-visible {
  color: var(--color);
  border-color: var(--theme-btn-hover-color);
}

.door-badge-line {
  width: 26px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--text-secondary), transparent);
}

.door-reveal.is-opening {
  .door-panel-left {
    transform: translateX(calc(-100% - 24px));
  }

  .door-panel-right {
    transform: translateX(calc(100% + 24px));
  }

  .door-center-badge {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.94);
  }
}

.door-reveal-enter-active,
.door-reveal-leave-active {
  transition: opacity 0.42s ease;
}

.door-reveal-enter-from,
.door-reveal-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .door-panel-inner {
    &::before,
    &::after {
      opacity: 0.8;
    }
  }

  .door-center-badge {
    gap: 8px;
    padding: 9px 14px;
    font-size: 11px;
    letter-spacing: 0.18em;
  }

  .door-badge-line {
    width: 18px;
  }
}
</style>
