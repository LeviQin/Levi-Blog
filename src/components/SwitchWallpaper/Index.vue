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
    <div class="wallpaper-model-main">
      <ul>
        <li v-for="item in dataMap.images" :key="item.id" @click="setWallpaper(item.url)">
          <img v-lazy="item.url" :alt="item.name" />
        </li>
      </ul>
      <div class="reset-btn" @click="setWallpaper(gufengnvImag)">恢复默认壁纸</div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, defineExpose, onMounted, onUnmounted } from "vue";
import mingrenImag from "../../assets/images/banner/mingren.jpeg";
import fentoufanvImag from "../../assets/images/banner/fentoufanv.jpeg";
import gufengnvImag from "../../assets/images/banner/gufengnv.jpg";
import leidianjiangjunImag from "../../assets/images/banner/leidianjiangjun.jpg";
import dongmannv4Imag from "../../assets/images/banner/dongmannv4.png";
import nuoaierImag from "../../assets/images/banner/nuoaier.jpeg";
import xiaomaoImag from "../../assets/images/banner/xiaomao.png";
import dipingxianImag from "../../assets/images/banner/dipingxian.jpg";
import fengjing2Imag from "../../assets/images/banner/fengjing2.jpg";
import fengjing5Imag from "../../assets/images/banner/fengjing5.webp";
import fengjing6Imag from "../../assets/images/banner/fengjing6.webp";
import fengjing7Imag from "../../assets/images/banner/fengjing7.jpg";
import fengjing9Imag from "../../assets/images/banner/fengjing9.jpg";
import fengjing10Imag from "../../assets/images/banner/fengjing10.webp";
import dongmannvImag from "../../assets/images/banner/dongmannv.webp";
import dongmannv02Imag from "../../assets/images/banner/dongmannv02.webp";
import dongmannv03Imag from "../../assets/images/banner/dongmannv03.webp";
import dongmannv04Imag from "../../assets/images/banner/dongmannv04.jpg";
import huanqiuImag from "../../assets/images/banner/huanqiu.webp";
import jinglingzhuiya1Imag from "../../assets/images/banner/jinglingzhuiya1.webp";
import jinglingzhuiya2Imag from "../../assets/images/banner/jinglingzhuiya2.webp";
import jinglingzhuiya3Imag from "../../assets/images/banner/jinglingzhuiya3.webp";
import tiankongImag from "../../assets/images/banner/tiankong.webp";
import { useMainStore } from "@/stores/mainStore";

const mainStore = useMainStore();

onMounted(() => {
  setModelWidth();
  window.addEventListener("resize", setModelWidth, true);
});

onUnmounted(() => {
  window.removeEventListener("resize", setModelWidth, true);
});

const dataMap = reactive({
  images: [
    {
      url: gufengnvImag,
      name: "gufengnv",
      id: 3,
    },
    {
      url: dongmannv04Imag,
      name: "dongmannv04",
      id: 33,
    },
    {
      url: huanqiuImag,
      name: "huanqiu",
      id: 111,
    },
    {
      url: jinglingzhuiya1Imag,
      name: "jinglingzhuiya1",
      id: 112,
    },
    {
      url: jinglingzhuiya2Imag,
      name: "jinglingzhuiya2",
      id: 113,
    },
    {
      url: jinglingzhuiya3Imag,
      name: "jinglingzhuiya3",
      id: 114,
    },
    {
      url: tiankongImag,
      name: "tiankong",
      id: 115,
    },
    {
      url: fentoufanvImag,
      name: "fentoufanv",
      id: 2,
    },
    {
      url: dongmannvImag,
      name: "dongmannv",
      id: 30,
    },
    {
      url: dongmannv02Imag,
      name: "dongmannv02",
      id: 31,
    },
    {
      url: dongmannv03Imag,
      name: "dongmannv03",
      id: 32,
    },
    {
      url: leidianjiangjunImag,
      name: "leidianjiangjun",
      id: 4,
    },
    {
      url: dongmannv4Imag,
      name: "dongmannv4",
      id: 6,
    },
    {
      url: nuoaierImag,
      name: "nuoaier",
      id: 7,
    },
    {
      url: mingrenImag,
      name: "mingren",
      id: 1,
    },
    {
      url: xiaomaoImag,
      name: "xiaomao",
      id: 11,
    },
    {
      url: dipingxianImag,
      name: "dipingxian",
      id: 12,
    },
    {
      url: fengjing2Imag,
      name: "fengjing2",
      id: 14,
    },
    {
      url: fengjing5Imag,
      name: "fengjing5",
      id: 17,
    },
    {
      url: fengjing6Imag,
      name: "fengjing6",
      id: 18,
    },
    {
      url: fengjing7Imag,
      name: "fengjing7",
      id: 19,
    },
    {
      url: fengjing9Imag,
      name: "fengjing9",
      id: 21,
    },
    {
      url: fengjing10Imag,
      name: "fengjing6",
      id: 22,
    },
  ],
});

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
