<template>
  <el-dialog
    v-model="dialogVisible"
    :width="modelWidth"
    :lock-scroll="false"
    :append-to-body="true"
    :z-index="10002"
    class="wallpaper-dialog"
  >
    <template #header>
      <div class="wallpaper-dialog-header">
        <div>
          <div class="wallpaper-model-title">切换壁纸</div>
          <p class="wallpaper-model-subtitle">挑一张更适合当前心情的背景，也可以随时恢复默认。</p>
        </div>
        <div class="wallpaper-current-tag">当前 {{ selectedWallpaperLabel }}</div>
      </div>
    </template>
    <div
      class="wallpaper-model-main"
      v-loading="loading"
      element-loading-text="Loading..."
    >
      <div class="wallpaper-hero">
        <div
          class="wallpaper-hero-preview"
          :style="heroPreviewStyle"
          :aria-label="selectedWallpaperLabel"
        >
          <div class="wallpaper-hero-overlay">
            <span class="wallpaper-hero-chip">当前使用中</span>
            <h3>{{ selectedWallpaperLabel }}</h3>
          </div>
        </div>
        <div class="wallpaper-hero-info">
          <p class="wallpaper-hero-title">精选壁纸库</p>
          <p class="wallpaper-hero-desc">
            已收录 {{ wallpaperOptions.length }} 张壁纸，点击卡片即可立即应用，当前壁纸会高亮标记。
          </p>
          <div class="wallpaper-actions">
            <button
              class="wallpaper-action-btn primary"
              type="button"
              @click="setWallpaper(gridWallpaper, defaultWallpaperLabel)"
            >
              恢复默认壁纸
            </button>
            <button
              class="wallpaper-action-btn"
              type="button"
              @click="dialogVisible = false"
            >
              稍后再说
            </button>
          </div>
        </div>
      </div>

      <ul class="wallpaper-grid">
        <li
          v-for="item in wallpaperOptions"
          :key="item.id"
          class="wallpaper-card"
          :class="{ 'is-active': isWallpaperActive(item.image) }"
          @click="setWallpaper(item.image, item.name)"
        >
          <div class="wallpaper-card-thumb">
            <img v-lazy="item.image" :alt="item.name" />
            <div class="wallpaper-card-mask">
              <span>{{ isWallpaperActive(item.image) ? "当前壁纸" : "点击切换" }}</span>
            </div>
          </div>
          <div class="wallpaper-card-info">
            <span class="wallpaper-card-name">{{ item.name }}</span>
            <span v-if="isWallpaperActive(item.image)" class="wallpaper-card-badge">已应用</span>
          </div>
        </li>
      </ul>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, defineExpose, onMounted, onUnmounted, computed } from "vue";
import gufengnvImag from "@/assets/images/banner/gufengnv.jpg";
import { useMainStore } from "@/stores/mainStore";

const mainStore = useMainStore();
const defaultWallpaperLabel = "极客网格";
const ancientWallpaperLabel = "古风";

// 暗色极客网格纹理（SVG data URI，零额外图片请求）
const gridWallpaper = "data:image/svg+xml;utf8," + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">
  <defs>
    <radialGradient id="g" cx="30%" cy="25%" r="80%">
      <stop offset="0%" stop-color="#16222e" />
      <stop offset="100%" stop-color="#0d1117" />
    </radialGradient>
  </defs>
  <rect width="80" height="80" fill="url(#g)" />
  <path d="M80 0H0V80" fill="none" stroke="#22d3ee" stroke-opacity="0.08" stroke-width="1" />
</svg>`);

const wallpaperOptions = computed(() => {
  const remoteWallpapers = (mainStore.wallpaperMap || []).map((item, index) => ({
    ...item,
    id: item.id ?? `wallpaper-${index}`,
    name: item.name || `壁纸 ${index + 1}`,
  }));

  return [
    {
      id: "default-wallpaper",
      name: defaultWallpaperLabel,
      image: gridWallpaper,
    },
    {
      id: "ancient-wallpaper",
      name: ancientWallpaperLabel,
      image: gufengnvImag,
    },
    ...remoteWallpapers,
  ];
});

const currentWallpaper = computed(() => {
  const rawValue = mainStore.backgroundImage || "";
  const matched = rawValue.match(/^url\((['"]?)(.*?)\1\)$/);
  return matched?.[2] || gridWallpaper;
});

const selectedWallpaperImage = computed(() => currentWallpaper.value);
const heroPreviewStyle = computed(() => ({
  backgroundImage: `url(${selectedWallpaperImage.value})`,
}));

const selectedWallpaperLabel = computed(() => {
  const matchedWallpaper = wallpaperOptions.value.find((item) => item.image === currentWallpaper.value);
  return matchedWallpaper?.name || defaultWallpaperLabel;
});

onMounted(() => {
  setModelWidth();
  window.addEventListener("resize", setModelWidth, true);
});

onUnmounted(() => {
  window.removeEventListener("resize", setModelWidth, true);
});

const loading = ref(false);
const dialogVisible = ref(false);
const modelWidth = ref("780px");

const show = () => {
  dialogVisible.value = true;
};

const isWallpaperActive = (image) => currentWallpaper.value === image;

const setWallpaper = (image) => {
  mainStore.setBackgroundImage(`url(${image})`);
};

const setModelWidth = () => {
  if (window.innerWidth <= 640) {
    modelWidth.value = "98%";
  } else if (window.innerWidth <= 1100) {
    modelWidth.value = "88%";
  } else {
    modelWidth.value = "1040px";
  }
};

defineExpose({
  show,
});
</script>

<style lang="scss" scoped>
.wallpaper-dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  padding-right: 24px;
}

.wallpaper-model-title {
  color: var(--btn-tag-bg-color);
  font-size: 22px;
  line-height: 1.1;
}

.wallpaper-model-subtitle {
  margin: 8px 0 0;
  color: var(--color);
  opacity: 0.72;
  font-size: 14px;
  line-height: 1.6;
}

.wallpaper-current-tag {
  flex-shrink: 0;
  border: 1px solid rgba(127, 127, 127, 0.22);
  border-radius: 999px;
  padding: 8px 14px;
  color: var(--color);
  font-size: 13px;
  background: rgba(127, 127, 127, 0.08);
}

.wallpaper-model-main {
  padding: 0 8px 20px;
  overflow: hidden;
}

.wallpaper-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(280px, 1fr);
  gap: 22px;
  margin-bottom: 24px;
}

.wallpaper-hero-preview {
  position: relative;
  min-height: 280px;
  overflow: hidden;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.04);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.18);
}

.wallpaper-hero-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 10px;
  padding: 20px;
  background: linear-gradient(180deg, rgba(5, 9, 18, 0.04), rgba(5, 9, 18, 0.75));

  h3 {
    margin: 0;
    color: #fff;
    font-size: 24px;
  }
}

.wallpaper-hero-chip {
  width: fit-content;
  border-radius: 999px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
  font-size: 12px;
  backdrop-filter: blur(12px);
}

.wallpaper-hero-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 18px 20px;
  border-radius: 24px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02)),
    rgba(15, 20, 32, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.wallpaper-hero-title {
  margin: 0 0 10px;
  color: #fff;
  font-size: 20px;
}

.wallpaper-hero-desc {
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  font-size: 14px;
}

.wallpaper-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 22px;
}

.wallpaper-action-btn {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  padding: 11px 18px;
  color: rgba(255, 255, 255, 0.82);
  background: rgba(255, 255, 255, 0.04);
  transition: transform 0.25s ease, background-color 0.25s ease, border-color 0.25s ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.14);
  }

  &.primary {
    background: linear-gradient(135deg, var(--btn-tag-bg-color), #22d3ee);
    color: #fff;
    border-color: transparent;
  }
}

.wallpaper-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  max-height: 520px;
  overflow: auto;
  gap: 18px;
  padding: 4px 8px 4px 2px;
}

.wallpaper-card {
  cursor: pointer;
  list-style: none;
  padding: 10px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transform: translateZ(0);
  will-change: transform;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease,
    background-color 0.3s ease;

  &:hover:not(.is-active) {
    transform: translateY(-4px);
    box-shadow: 0 18px 36px rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.06);
  }

  &.is-active {
    transform: translateZ(0);
    border-color: rgba(255, 170, 77, 0.65);
    background: rgba(255, 170, 77, 0.1);
    box-shadow: 0 18px 40px rgba(34, 211, 238, 0.16);
  }
}

.wallpaper-card-thumb {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  aspect-ratio: 16 / 10;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }
}

.wallpaper-card:hover:not(.is-active) .wallpaper-card-thumb img {
  transform: scale(1.05);
}

.wallpaper-card.is-active .wallpaper-card-thumb img {
  transform: scale(1);
}

.wallpaper-card-mask {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.58));
  opacity: 0;
  transition: opacity 0.3s ease;

  span {
    border-radius: 999px;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.14);
    color: #fff;
    font-size: 12px;
    backdrop-filter: blur(8px);
  }
}

.wallpaper-card:hover .wallpaper-card-mask,
.wallpaper-card.is-active .wallpaper-card-mask {
  opacity: 1;
}

.wallpaper-card-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 12px;
}

.wallpaper-card-name {
  font-size: 14px;
}

.wallpaper-card-badge {
  flex-shrink: 0;
  border-radius: 999px;
  padding: 4px 10px;
  background: rgba(255, 170, 77, 0.18);
  color: #ffd29d;
  font-size: 12px;
}

:deep(.wallpaper-dialog .el-dialog__header) {
  padding-bottom: 12px;
}

:deep(.wallpaper-dialog .el-dialog__body) {
  padding-top: 4px;
}

@media (max-width: 860px) {
  :deep(.wallpaper-dialog .el-dialog) {
    margin-top: 6vh !important;
    border-radius: 24px;
  }

  :deep(.wallpaper-dialog .el-dialog__header) {
    padding: 18px 18px 10px;
  }

  :deep(.wallpaper-dialog .el-dialog__body) {
    padding: 0 12px 14px;
  }

  :deep(.wallpaper-dialog .el-dialog__headerbtn) {
    top: 18px;
    right: 16px;
  }

  .wallpaper-dialog-header {
    flex-direction: column;
    gap: 12px;
    padding-right: 28px;
  }

  .wallpaper-hero {
    grid-template-columns: minmax(120px, 0.9fr) minmax(0, 1.1fr);
    gap: 10px;
    margin-bottom: 14px;
    align-items: stretch;
  }

  .wallpaper-hero-preview {
    min-height: 142px;
    border-radius: 20px;
  }

  .wallpaper-hero-overlay {
    padding: 14px;
    gap: 8px;
  }

  .wallpaper-hero-overlay h3 {
    font-size: 16px;
  }

  .wallpaper-hero-info {
    padding: 12px;
    border-radius: 20px;
  }

  .wallpaper-model-title {
    font-size: 20px;
  }

  .wallpaper-model-subtitle {
    font-size: 13px;
    line-height: 1.5;
  }

  .wallpaper-current-tag {
    align-self: flex-start;
    padding: 6px 12px;
  }

  .wallpaper-grid {
    max-height: 50vh;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    padding: 0 1px 2px;
  }

  .wallpaper-card {
    padding: 6px;
    border-radius: 16px;
  }

  .wallpaper-card-info {
    flex-direction: row;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
  }

  .wallpaper-card-name {
    min-width: 0;
    font-size: 12px;
    line-height: 1.35;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .wallpaper-actions {
    gap: 8px;
    margin-top: 14px;
  }

  .wallpaper-action-btn {
    flex: 1 1 calc(50% - 5px);
    min-height: 38px;
    padding: 9px 12px;
    font-size: 12px;
  }

  .wallpaper-card-badge {
    padding: 3px 8px;
    font-size: 11px;
  }
}

@media (max-width: 560px) {
  :deep(.wallpaper-dialog .el-dialog) {
    margin-top: 2vh !important;
    border-radius: 20px;
  }

  :deep(.wallpaper-dialog .el-dialog__header) {
    padding: 16px 14px 8px;
  }

  :deep(.wallpaper-dialog .el-dialog__body) {
    padding: 0 10px 12px;
  }

  .wallpaper-model-main {
    padding: 0 0 10px;
  }

  .wallpaper-dialog-header {
    gap: 8px;
    padding-right: 26px;
  }

  .wallpaper-model-title {
    font-size: 18px;
  }

  .wallpaper-model-subtitle {
    margin-top: 6px;
    font-size: 12px;
  }

  .wallpaper-current-tag {
    font-size: 12px;
    padding: 5px 10px;
  }

  .wallpaper-hero {
    grid-template-columns: 104px minmax(0, 1fr);
    gap: 8px;
    margin-bottom: 12px;
  }

  .wallpaper-hero-preview {
    min-height: 104px;
    border-radius: 16px;
  }

  .wallpaper-hero-overlay {
    gap: 6px;
    padding: 10px;
  }

  .wallpaper-hero-overlay h3 {
    font-size: 14px;
    line-height: 1.25;
  }

  .wallpaper-hero-chip {
    padding: 4px 8px;
    font-size: 10px;
  }

  .wallpaper-hero-info {
    padding: 10px;
    border-radius: 16px;
  }

  .wallpaper-hero-title {
    font-size: 15px;
    margin-bottom: 4px;
  }

  .wallpaper-hero-desc {
    font-size: 11px;
    line-height: 1.45;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .wallpaper-actions {
    flex-direction: row;
    gap: 6px;
    margin-top: 10px;
  }

  .wallpaper-action-btn {
    min-height: 34px;
    padding: 8px 10px;
    font-size: 11px;
    justify-content: center;
  }

  .wallpaper-grid {
    max-height: 54vh;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 6px;
    padding: 2px 0 0;
  }

  .wallpaper-card {
    display: block;
    padding: 6px;
    border-radius: 14px;
  }

  .wallpaper-card-thumb {
    aspect-ratio: 16 / 11;
    border-radius: 10px;
  }

  .wallpaper-card-info {
    margin-top: 6px;
    min-width: 0;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
  }

  .wallpaper-card-name {
    font-size: 11px;
    line-height: 1.3;
  }

  .wallpaper-card-badge {
    padding: 2px 6px;
    font-size: 10px;
  }

  .wallpaper-card-mask span {
    padding: 5px 8px;
    font-size: 10px;
  }
}

@media (max-width: 380px) {
  .wallpaper-hero {
    grid-template-columns: 92px minmax(0, 1fr);
  }

  .wallpaper-hero-preview {
    min-height: 92px;
  }

  .wallpaper-grid {
    max-height: 56vh;
    gap: 5px;
  }

  .wallpaper-card {
    padding: 5px;
  }

  .wallpaper-card-name {
    font-size: 10px;
  }
}
</style>
