<template>
  <div class="avatar-select-box" @click.stop="showAvatarList = !showAvatarList">
    <Teleport to="body" :disabled="!isMobile">
      <div
        class="avatar-list-box"
        :class="{
          'show-avatar-list': showAvatarList,
          'mobile-panel-above': isMobile && panelPlacement === 'above',
          'mobile-panel-below': isMobile && panelPlacement === 'below',
        }"
        :style="panelStyle"
        @click.stop
      >
      <div class="avatar-list-header">
        <div>
          <strong>选择头像</strong>
          <span>挑选一个喜欢的头像作为留言头像</span>
        </div>
        <button
          class="avatar-close"
          type="button"
          aria-label="关闭头像面板"
          @click.stop="showAvatarList = false"
        >
          <i class="bi bi-x-lg" aria-hidden="true"></i>
        </button>
      </div>
      <div class="avatar-list-content">
        <div class="image-box" v-if="selectVal === `通用`">
          <ul>
            <li
              v-for="item in dataMap.universalList"
              :key="item.id"
              @click="selectavatar(item.image)"
            >
              <img v-lazy="item.image" alt="" />
            </li>
          </ul>
        </div>
        <div class="image-box" v-else-if="selectVal === `男头`">
          <ul>
            <li
              v-for="item in dataMap.maleList"
              :key="item.id"
              @click="selectavatar(item.image)"
            >
              <img v-lazy="item.image" alt="" />
            </li>
          </ul>
        </div>
        <div class="image-box" v-else-if="selectVal === `女头`">
          <ul>
            <li
              v-for="item in dataMap.femaleList"
              :key="item.id"
              @click="selectavatar(item.image)"
            >
              <img v-lazy="item.image" alt="" />
            </li>
          </ul>
        </div>
      </div>
      <div class="avatar-list-tools">
        <button
          class="avatar-tab"
          :class="{ 'active-avatar-li': selectVal === '通用' }"
          type="button"
          @click="selectLi('通用')"
        >
          <i class="bi bi-grid-3x3-gap" aria-hidden="true"></i>
          通用
        </button>
        <button
          class="avatar-tab"
          :class="{ 'active-avatar-li': selectVal === '男头' }"
          type="button"
          @click="selectLi('男头')"
        >
          <i class="bi bi-person" aria-hidden="true"></i>
          男头
        </button>
        <button
          class="avatar-tab"
          :class="{ 'active-avatar-li': selectVal === '女头' }"
          type="button"
          @click="selectLi('女头')"
        >
          <i class="bi bi-person-heart" aria-hidden="true"></i>
          女头
        </button>
      </div>
      </div>
    </Teleport>
    <div class="avatar-img-box">
      <button
        ref="triggerRef"
        class="avatar-trigger"
        type="button"
        aria-label="打开头像面板"
        :aria-expanded="showAvatarList"
        @click.stop="toggleAvatarList"
      >
        <img v-lazy="props.avatarImg" alt="头像" />
      </button>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  nextTick,
  onMounted,
  onBeforeUnmount,
  defineEmits,
  defineProps,
} from "vue";
import { getAvatars } from "@/api/avatar.js";

const props = defineProps({
  avatarImg: {
    type: String,
    default: "",
  },
});

const dataMap = reactive({
  universalList: [],
  maleList: [],
  femaleList: [],
});

const showAvatarList = ref(false);
const selectVal = ref("通用");
const isMobile = ref(false);
const triggerRef = ref(null);
const panelStyle = ref({});
const panelPlacement = ref("above");
let mediaQuery;

const updateMobile = (event) => {
  isMobile.value = event.matches;
  if (!isMobile.value) {
    panelStyle.value = {};
  } else if (showAvatarList.value) {
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

const toggleAvatarList = () => {
  showAvatarList.value = !showAvatarList.value;
  if (showAvatarList.value && isMobile.value) {
    nextTick(updatePanelPosition);
  }
};

onMounted(() => {
  mediaQuery = window.matchMedia("(max-width: 860px)");
  isMobile.value = mediaQuery.matches;
  mediaQuery.addEventListener?.("change", updateMobile);
  window.addEventListener("resize", updatePanelPosition);
  document.addEventListener("click", closeAvatarList);
  getAvatarList();
});

onBeforeUnmount(() => {
  mediaQuery?.removeEventListener?.("change", updateMobile);
  window.removeEventListener("resize", updatePanelPosition);
  document.removeEventListener("click", closeAvatarList);
});

const closeAvatarList = (e) => {
  if (!e.target.closest(".avatar-list-box")) {
    showAvatarList.value = false;
  }
};

const selectLi = (val) => {
  selectVal.value = val;
};

const selectavatar = (url) => {
  showAvatarList.value = false;
  emit("ok", url);
};

const getAvatarList = async () => {
  try {
    const res = await getAvatars();
    const { code, data } = res.data;
    if (code === 200) {
      dataMap.universalList = data.filter((item) => item.type === 1);
      dataMap.maleList = data.filter((item) => item.type === 2);
      dataMap.femaleList = data.filter((item) => item.type === 3);
    }
  } catch (error) {
    console.log(error);
  }
};

const emit = defineEmits(["ok"]);
</script>

<style lang="scss" scoped>
.avatar-img-box {
  box-shadow: 0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02);
  width: 40px;
  height: 40px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  border: 4px solid var(--theme-color);
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
  &:hover {
    transform: translateY(-2px);
  }
}

.avatar-trigger {
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  border-radius: 10px;
  background: transparent;
  cursor: pointer;
}

.avatar-select-box {
  position: relative;
}

.avatar-list-box {
  position: absolute;
  z-index: 20;
  bottom: calc(100% + 12px);
  left: 0;
  width: min(410px, calc(100vw - 32px));
  height: 330px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--theme-color);
  box-shadow: var(--shadow-raise);
  transform: translateY(8px) scale(0.96);
  transform-origin: bottom left;
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  display: flex;
  flex-direction: column;

  .avatar-list-header {
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

  .avatar-close {
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

  .avatar-list-content {
    flex: 1;
    padding: 10px 12px;
    overflow: auto;
    scrollbar-width: thin;
  }

  .avatar-list-tools {
    display: flex;
    min-height: 50px;
    padding: 0 8px;
    border-top: 1px solid var(--border-color);
    background: var(--accent-soft-bg);
  }

  .avatar-tab {
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
    transition: color 0.2s ease, background 0.2s ease;

    &:hover {
      background: var(--accent-soft-bg-strong);
      color: var(--color);
    }
  }
}

.image-box ul {
  display: flex;
  flex-wrap: wrap;
  li {
    font-size: 26px;
    padding: 10px;
    margin: 3px;
    cursor: pointer;
    transition: all 0.3s;
    width: 66px;
    height: 66px;
    border-radius: 10px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
    &:hover {
      background-color: var(--accent-soft-bg-strong);
    }
  }
}

.active-avatar-li {
  border-bottom-color: transparent !important;
  color: var(--theme-btn-hover-color) !important;
}

.show-avatar-list {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}

.icon {
  width: 1.5em;
  height: 1.5em;
  margin-right: 15px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    transform: translateY(-2px);
  }
}

@media (max-width: 860px) {
  .avatar-list-box {
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

  .show-avatar-list.mobile-panel-above {
    transform: translateY(-100%) scale(1);
  }

  .show-avatar-list.mobile-panel-below {
    transform: translateY(0) scale(1);
  }

  .avatar-box ul li {
    margin: 2px;
  }
}
</style>
