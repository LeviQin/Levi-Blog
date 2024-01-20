<template>
  <div class="preview-modal" v-if="showPreview">
    <div class="close-button">
      <i class="bi bi-x-circle" @click="closePreview" title="关闭"></i>
    </div>
    <div class="preview-img" @wheel="handleWheel">
      <img
        :src="dataMap.images[dataMap.currentIndex]"
        alt="Preview"
        :style="{ transform: `scale(${scale}) rotate(${rotation}deg)` }"
      />
    </div>
    <div class="preview-btn">
      <i class="bi bi-zoom-in" title="放大" @click="scaleImage(`in`)"></i>
      <i class="bi bi-zoom-out" title="缩小" @click="scaleImage(`out`)"></i>
      <i class="bi bi-arrow-clockwise" title="旋转" @click="rotateImage"></i>
      <i class="bi bi-box-arrow-down" title="下载" @click="downloadImage"></i>
    </div>
    <div
      class="prev-btn"
      @click="prevImage"
      v-show="dataMap.currentIndex > 0"
      title="上一张"
    >
      <i class="bi bi-chevron-left"></i>
    </div>
    <div
      class="next-btn"
      @click="nextImage"
      v-show="dataMap.currentIndex < dataMap.images.length - 1"
      title="下一张"
    >
      <i class="bi bi-chevron-right"></i>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineExpose } from "vue";

const dataMap = reactive({
  images: [],
  currentIndex: 0,
});

const showPreview = ref(false);
const scale = ref(1);
const rotation = ref(0);

const handleWheel = (event) => {
  // 阻止滚动事件的默认行为，防止整个页面滚动
  event.preventDefault();

  // 计算缩放比例的增量
  const delta = event.deltaY > 0 ? -0.1 : 0.1;

  // 更新缩放比例
  scale.value = Math.max(0.2, Math.min(2, scale.value + delta));
};

const scaleImage = (type) => {
  if (type === `out`) {
    scale.value -= 0.1;
  } else {
    scale.value += 0.1;
  }
};

const rotateImage = () => {
  rotation.value = (rotation.value + 90) % 360;
};

const downloadImage = async () => {
  try {
    const response = await fetch(dataMap.images[dataMap.currentIndex]);
    const blob = await response.blob();

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    const imgName = dataMap.images[dataMap.currentIndex].split("/").at(-1);
    link.download = imgName;
    link.click();

    window.URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("Error downloading image:", error);
  }
};

const show = (images, currentIndex) => {
  dataMap.images = images;
  dataMap.currentIndex = currentIndex;
  showPreview.value = true;
  document.body.style.overflow = "hidden"; // 禁止body滚动
};

const closePreview = () => {
  showPreview.value = false;
  document.body.style.overflow = "auto"; // 恢复body滚动
};

const nextImage = () => {
  dataMap.currentIndex = (dataMap.currentIndex + 1) % dataMap.images.length;
  scale.value = 1;
};

const prevImage = () => {
  dataMap.currentIndex =
    (dataMap.currentIndex - 1 + dataMap.images.length) % dataMap.images.length;
  scale.value = 1;
};

defineExpose({
  show,
});
</script>

<style lang="scss" scoped>
.preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  z-index: 9999999;
}

.preview-img {
  max-width: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease; /* 添加过渡效果 */
  img {
    width: 100%;
    height: 100%;
  }
}

.close-button {
  position: absolute;
  top: 20px;
  right: 30px;
  cursor: pointer;

  .bi {
    font-size: 30px;
  }
}

.prev-btn,
.next-btn {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff96;
  cursor: pointer;
  border-radius: 50%;
  padding: 10px;
  transition: all 0.3s;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);

  &:hover {
    background-color: #ffffff53;
  }

  .bi {
    font-size: 20px;
  }
}

.prev-btn {
  left: 20px;
}

.next-btn {
  right: 20px;
}

.preview-btn {
  position: fixed;
  bottom: 50px;

  .bi {
    font-size: 30px;
    margin: 0 10px;
    cursor: pointer;
  }
}

@media (max-width: 860px) {
  .close-button {
    top: 15px;
    right: 15px;

    .bi {
      font-size: 30px;
    }
  }
}
</style>
