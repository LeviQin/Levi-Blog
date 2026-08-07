<template>
  <div
    class="container"
  >
    <div class="info card">
      <div class="connect-header">
        <span class="connect-dots">
          <span class="dot dot-red"></span>
          <span class="dot dot-yellow"></span>
          <span class="dot dot-green"></span>
        </span>
        <span class="connect-path">~/contact</span>
      </div>
      <div class="connect-body">
        <h1 class="info-title">{{ props.blogSettingMap.blog_connect_title }}</h1>
        <div class="info-content">
          <div class="info-content-item">
            <span class="item-label">邮箱</span>
            <a
              class="item-text"
              :href="`mailto: ${props.blogSettingMap.blog_connect_email}`"
              >{{ props.blogSettingMap.blog_connect_email }}</a
            >
          </div>
          <div class="info-content-item">
            <span class="item-label">微信</span>
            <span class="item-text">{{ props.blogSettingMap.blog_connect_wx }}</span>
          </div>
          <div class="info-content-item">
            <span class="item-label">QQ</span>
            <span class="item-text">{{ props.blogSettingMap.blog_connect_qq }}</span>
          </div>
          <div class="info-content-item">
            <span class="item-label">GitHub</span>
            <a
              :href="props.blogSettingMap.blog_connect_github"
              target="_blank"
              class="item-text"
              >慕钦</a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="button-arrow" @click="toOnePage"></div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  blogSettingMap: {
    type: Object,
    default: () => {},
  },
});

const toOnePage = () => {
  emit("toOnePage");
};

const emit = defineEmits(["toOnePage"]);
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  background:
    radial-gradient(circle at 22% 28%, rgba(34, 211, 238, 0.08), transparent 45%),
    radial-gradient(circle at 78% 70%, rgba(34, 211, 238, 0.05), transparent 42%),
    var(--background);
  background-size: 100% 100%;
  position: relative;
  background-repeat: no-repeat;
  background-position: center;
}

.info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  font-size: 20px;
  border-radius: 14px;
  line-height: 1.2rem;
  width: max-content;
  min-width: 320px;
  max-width: 90vw;
}

.card {
  position: relative;
  background: var(--theme-color);
  border: 1px solid var(--border-color);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4);
  overflow: hidden;
}

/* 终端风格头部 */
.connect-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  background: rgba(230, 237, 243, 0.04);
  border-bottom: 1px solid var(--border-color);
}

.connect-dots {
  display: flex;
  gap: 7px;
}

.dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}

.dot-red {
  background: #ff605c;
}

.dot-yellow {
  background: #ffbd44;
}

.dot-green {
  background: #00ca4e;
}

.connect-path {
  margin-left: 6px;
  font-family: var(--mono-font-family);
  font-size: 13px;
  color: var(--text-secondary);
}

.connect-body {
  padding: 28px 32px;
}

.info-title {
  font-size: 26px;
  font-weight: 700;
  color: var(--theme-btn-hover-color);
  font-family: var(--mono-font-family);
  margin: 0 0 24px 0;
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.info-content-item {
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(230, 237, 243, 0.03);
  border: 1px solid var(--border-color);
}

.item-label {
  color: var(--text-secondary);
  font-family: var(--mono-font-family);
  font-size: 13px;
  flex-shrink: 0;
  width: 44px;
}

.item-text {
  color: var(--color);
  font-size: 15px;
  word-break: break-all;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: var(--theme-btn-hover-color);
  }
}

.button-arrow {
  display: block;
  width: 80px;
  height: 80px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  margin-left: -30px;
  opacity: 0.75;
  background: url(@/assets/images/arrow.png);
  transition: all 0.2s ease-in 0s;
  z-index: 1;
  transform: scale(0.8);
  cursor: pointer;
  background-position: -60px 0px;
  &:hover {
    transform: scale(1);
    transition: all 0.2s ease-in 0s;
  }
}

@media (max-width: 860px) {
  .info {
    width: 88%;
  }

  .connect-body {
    padding: 20px;
  }

  .info-title {
    font-size: 20px;
    margin-bottom: 16px;
  }

  .info-content {
    gap: 10px;
  }

  .info-content-item {
    flex-direction: column;
    gap: 4px;
    padding: 10px 12px;
  }

  .item-label {
    width: auto;
    font-size: 12px;
  }

  .item-text {
    font-size: 14px;
  }
}
</style>
