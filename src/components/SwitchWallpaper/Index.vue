<template>
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="60%"
    lock-scroll
    append-to-body
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
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, defineExpose } from "vue";
import { setStore } from "@/utils/storage.js";
import mingrenImag from "../../assets/images/banner/mingren.jpeg";
import fentoufanvImag from "../../assets/images/banner/fentoufanv.jpeg";
import gufengnvImag from "../../assets/images/banner/gufengnv.jpg";
import leidianjiangjunImag from "../../assets/images/banner/leidianjiangjun.jpg";
import dongmannv4Imag from "../../assets/images/banner/dongmannv4.png";
import nuoaierImag from "../../assets/images/banner/nuoaier.jpeg";
import qianxun2Imag from "../../assets/images/banner/qianxun2.jpg";
import qianyuqianxunImag from "../../assets/images/banner/qianyuqianxun.jpg";
import shenziImag from "../../assets/images/banner/shenzi.jpg";
import xiaomaoImag from "../../assets/images/banner/xiaomao.png";
import dipingxianImag from "../../assets/images/banner/dipingxian.jpg";
import fengjing1Imag from "../../assets/images/banner/fengjing1.jpg";
import fengjing2Imag from "../../assets/images/banner/fengjing2.jpg";
import fengjing3Imag from "../../assets/images/banner/fengjing3.jpg";
import fengjing4Imag from "../../assets/images/banner/fengjing4.jpg";
import fengjing5Imag from "../../assets/images/banner/fengjing5.webp";
import fengjing6Imag from "../../assets/images/banner/fengjing6.webp";
import fengjing7Imag from "../../assets/images/banner/fengjing7.jpg";
import fengjing8Imag from "../../assets/images/banner/fengjing8.webp";
import fengjing9Imag from "../../assets/images/banner/fengjing9.jpg";
import fengjing10Imag from "../../assets/images/banner/fengjing10.webp";

const dataMap = reactive({
  images: [
    {
      url: mingrenImag,
      name: "mingren",
      id: 1,
    },
    {
      url: fentoufanvImag,
      name: "fentoufanv",
      id: 2,
    },
    {
      url: gufengnvImag,
      name: "gufengnv",
      id: 3,
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
      url: qianxun2Imag,
      name: "qianxun2",
      id: 8,
    },
    {
      url: qianyuqianxunImag,
      name: "qianyuqianxun",
      id: 9,
    },
    {
      url: shenziImag,
      name: "shenzi",
      id: 10,
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
      url: fengjing1Imag,
      name: "fengjing1",
      id: 13,
    },
    {
      url: fengjing2Imag,
      name: "fengjing2",
      id: 14,
    },
    {
      url: fengjing3Imag,
      name: "fengjing3",
      id: 15,
    },
    {
      url: fengjing4Imag,
      name: "fengjing4",
      id: 16,
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
      url: fengjing8Imag,
      name: "fengjing8",
      id: 20,
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

let dialogVisible = ref(false);

const show = () => {
  dialogVisible.value = true;
};

const setWallpaper = (image) => {
  const bannerBar = document.querySelector(".layout .banner-bar");
  bannerBar.style.backgroundImage = `url(${image})`;
  setStore("WALLPAPER_URL", image);
};

defineExpose({
  show,
});
</script>

<style lang="scss" scoped>
.wallpaper-model-main {
  padding: 10px 20px 50px 20px;
}

.wallpaper-model-main ul {
  display: flex;
  flex-wrap: wrap;
  max-height: 600px;
  overflow: auto;

  li {
    width: 220px;
    height: 130px;
    margin: 12px;
    cursor: pointer;
    &:hover img {
      transform: scale(1.1);
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      transition: all 0.3s;
    }
  }
}
</style>
