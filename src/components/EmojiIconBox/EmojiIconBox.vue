<template>
  <div class="emoji-icon-box" @click="closeEmojiList">
    <Teleport to="body" :disabled="!isMobile">
      <div
        class="emoji-list-box"
        :class="{
          'show-emoji-list': showEmojiList,
          'mobile-panel-above': isMobile && panelPlacement === 'above',
          'mobile-panel-below': isMobile && panelPlacement === 'below',
        }"
        :style="panelStyle"
        role="dialog"
        aria-label="选择表情"
        @click.stop
      >
      <div class="emoji-list-header">
        <div>
          <strong>选择表情</strong>
          <span>点击表情即可插入留言</span>
        </div>
        <button
          class="emoji-close"
          type="button"
          aria-label="关闭表情面板"
          @click.stop="showEmojiList = false"
        >
          <i class="bi bi-x-lg" aria-hidden="true"></i>
        </button>
      </div>
      <div class="emoji-list-content">
        <div class="emoji-box" v-if="selectVal === `emoji`">
          <ul>
            <li v-for="item in emojiList" :key="item.id">
              <button
                class="emoji-item"
                type="button"
                :title="item.cn"
                @click="selectEmoji(item)"
              >
                {{ item.value }}
              </button>
            </li>
          </ul>
        </div>
        <div class="kaomoji-box" v-else>
          <ul>
            <li v-for="item in kaomojiList" :key="item.id">
              <button
                class="emoji-item"
                type="button"
                :title="item.value"
                @click="selectEmoji(item)"
              >
                {{ item.value }}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="emoji-list-tools">
        <button
          class="emoji-tab"
          :class="{ 'active-emoji-li': selectVal === 'emoji' }"
          type="button"
          @click="selectLi('emoji')"
        >
          <i class="bi bi-emoji-smile" aria-hidden="true"></i>
          Emoji
        </button>
        <button
          class="emoji-tab"
          :class="{ 'active-emoji-li': selectVal === '颜文字' }"
          type="button"
          @click="selectLi('颜文字')"
        >
          <i class="bi bi-chat-heart" aria-hidden="true"></i>
          颜文字
        </button>
      </div>
      </div>
    </Teleport>
    <button
      ref="triggerRef"
      class="emoji-trigger"
      type="button"
      aria-label="打开表情面板"
      :aria-expanded="showEmojiList"
      title="插入表情"
      @click.stop="toggleEmojiList"
    >
      <i class="bi bi-emoji-smile" aria-hidden="true"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount, defineEmits } from "vue";
import { emojiList } from "@/utils/emojis.js";
import { kaomojiList } from "@/utils/kaomojis.js";

const showEmojiList = ref(false);
const selectVal = ref("emoji");
const isMobile = ref(false);
const triggerRef = ref(null);
const panelStyle = ref({});
const panelPlacement = ref("above");
const emit = defineEmits(["ok"]);
let mediaQuery;

const updateMobile = (event) => {
  isMobile.value = event.matches;
  if (!isMobile.value) {
    panelStyle.value = {};
  } else if (showEmojiList.value) {
    nextTick(updatePanelPosition);
  }
};

const updatePanelPosition = () => {
  if (!isMobile.value || !triggerRef.value) return;

  const triggerRect = triggerRef.value.getBoundingClientRect();
  const panelWidth = Math.min(360, window.innerWidth - 24);
  const panelHeight = Math.min(330, window.innerHeight - 32);
  const left = Math.min(
    Math.max(triggerRect.left + triggerRect.width / 2 - panelWidth / 2, 12),
    window.innerWidth - panelWidth - 12,
  );
  const hasSpaceAbove = triggerRect.top >= panelHeight + 24;

  panelPlacement.value = hasSpaceAbove ? "above" : "below";
  panelStyle.value = {
    left: `${left}px`,
    top: hasSpaceAbove ? `${triggerRect.top - 12}px` : `${triggerRect.bottom + 12}px`,
  };
};

const toggleEmojiList = () => {
  showEmojiList.value = !showEmojiList.value;
  if (showEmojiList.value && isMobile.value) {
    nextTick(updatePanelPosition);
  }
};

const closeEmojiList = (e) => {
  if (!e.target.closest(".emoji-list-box")) {
    showEmojiList.value = false;
  }
};

const selectLi = (val) => {
  selectVal.value = val;
};

const selectEmoji = (item) => {
  showEmojiList.value = false;
  emit("ok", item);
};

onMounted(() => {
  mediaQuery = window.matchMedia("(max-width: 860px)");
  isMobile.value = mediaQuery.matches;
  mediaQuery.addEventListener?.("change", updateMobile);
  window.addEventListener("resize", updatePanelPosition);
  document.addEventListener("click", closeEmojiList);
});

onBeforeUnmount(() => {
  mediaQuery?.removeEventListener?.("change", updateMobile);
  window.removeEventListener("resize", updatePanelPosition);
  document.removeEventListener("click", closeEmojiList);
});
</script>

<style lang="scss" scoped>
.emoji-icon-box {
  position: relative;
  display: flex;
  align-items: center;
}

.emoji-list-box {
  position: absolute;
  z-index: 20;
  bottom: calc(100% + 12px);
  left: 50%;
  display: flex;
  flex-direction: column;
  width: min(390px, calc(100vw - 32px));
  height: 330px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--theme-color);
  box-shadow: var(--shadow-raise);
  transform: translate(-50%, 8px) scale(0.96);
  transform-origin: bottom center;
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;

  .emoji-list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px 14px 11px;
    border-bottom: 1px solid var(--border-color);

    strong,
    span {
      display: block;
    }

    strong {
      color: var(--color);
      font-size: 14px;
      line-height: 1.4;
    }

    span {
      margin-top: 2px;
      color: var(--text-secondary);
      font-size: 11px;
    }
  }

  .emoji-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease;

    &:hover {
      background: var(--accent-soft-bg);
      color: var(--theme-btn-hover-color);
    }
  }

  .emoji-list-content {
    flex: 1;
    padding: 10px 12px;
    overflow: auto;
    scrollbar-width: thin;

    ul {
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      gap: 4px;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    li {
      list-style: none;
    }
  }

  .emoji-list-tools {
    display: flex;
    min-height: 50px;
    padding: 0 8px;
    border-top: 1px solid var(--border-color);
    background: var(--accent-soft-bg);
  }

  .emoji-tab {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    min-width: 92px;
    padding: 0 13px;
    border: 0;
    border-bottom: 2px solid transparent;
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
    font-size: 13px;
    transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease;

    &:hover {
      background: var(--accent-soft-bg-strong);
      color: var(--color);
    }
  }
}

.emoji-item {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  min-height: 36px;
  padding: 4px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--color);
  cursor: pointer;
  line-height: 1.2;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover,
  &:focus-visible {
    outline: none;
    background: var(--accent-soft-bg-strong);
    transform: translateY(-1px);
  }
}

.emoji-box .emoji-item {
  font-size: 26px;
}

.kaomoji-box .emoji-item {
  min-width: auto;
  min-height: 40px;
  padding: 8px 10px;
  font-size: 18px;
}

.active-emoji-li {
  border-bottom-color: transparent !important;
  color: var(--theme-btn-hover-color) !important;
}

.show-emoji-list {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, 0) scale(1);
  pointer-events: auto;
}

.emoji-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--accent-soft-bg);
  color: var(--theme-btn-hover-color);
  cursor: pointer;
  font-size: 17px;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: var(--theme-btn-hover-color);
    background: var(--accent-soft-bg-strong);
    transform: translateY(-2px);
  }
}

@media (max-width: 860px) {
  .emoji-list-box {
    position: fixed;
    right: auto;
    bottom: auto;
    width: min(360px, calc(100vw - 24px));
    height: min(330px, calc(100vh - 32px));
  }

  .mobile-panel-above {
    transform-origin: bottom center;
    transform: translateY(-100%) scale(0.96);
  }

  .mobile-panel-below {
    transform-origin: top center;
    transform: translateY(8px) scale(0.96);
  }

  .show-emoji-list.mobile-panel-above {
    transform: translateY(-100%) scale(1);
  }

  .show-emoji-list.mobile-panel-below {
    transform: translateY(0) scale(1);
  }
}
</style>
