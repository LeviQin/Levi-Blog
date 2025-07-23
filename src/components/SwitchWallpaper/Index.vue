<template>
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    :width="modelWidth"
    :lock-scroll="false"
    :append-to-body="true"
    :z-index="10002"
  >
    <template #header>
      <span class="wallpaper-model-title">切换壁纸</span>
    </template>
    <div
      class="wallpaper-model-main"
      v-loading="loading"
      element-loading-text="Loading..."
    >
      <ul>
        <li v-for="item in images" :key="item.id" @click="setWallpaper(item.image)">
          <img v-lazy="item.image" :alt="item.name" />
        </li>
      </ul>
      <div class="reset-btn" @click="setWallpaper(gufengnvImag)">恢复默认壁纸</div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, defineExpose, onMounted, onUnmounted, computed } from "vue";
import gufengnvImag from "@/assets/images/banner/gufengnv.jpg";
import { useMainStore } from "@/stores/mainStore";

const mainStore = useMainStore();

const images = computed(() => {
  return mainStore.wallpaperMap;
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

const setWallpaper = (image) => {
  mainStore.setBackgroundImage(`url(${image})`);
};

const setModelWidth = () => {
  if (window.innerWidth <= 900) {
    modelWidth.value = "80%";
  } else {
    modelWidth.value = "780px";
  }
};

defineExpose({
  show,
});
</script>

<style lang="scss" scoped>
.wallpaper-model-title {
  color: var(--btn-tag-bg-color);
  font-size: 18px;
}

.wallpaper-model-main {
  padding-bottom: 20px;
  overflow: hidden;
}

.wallpaper-model-main ul {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-height: 600px;
  overflow: auto;
  gap: 20px;
  padding: 10px 30px;
  li {
    cursor: pointer;
    position: relative;
    &:hover::after {
      opacity: 1;
    }
    &::after {
      content: "点击切换壁纸";
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      width: 100%;
      height: 100%;
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      background: #000000af;
      transition: all 0.3s;
      border-radius: 5px;
    }
    img {
      max-height: 131px;
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
}

.reset-btn {
  background-color: var(--btn-tag-bg-color);
  color: #fff;
  width: 140px;
  padding: 10px 15px;
  cursor: pointer;
  text-align: center;
  border-radius: 5px;
  margin: 0 auto;
  margin-top: 15px;
  transition: all 0.3s;
  &:hover {
    background-color: var(--theme-btn-hover-color);
  }
}

@media (max-width: 860px) {
  .wallpaper-model-main ul {
    max-height: 400px;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    padding: 0 10px;
  }
}
</style>
