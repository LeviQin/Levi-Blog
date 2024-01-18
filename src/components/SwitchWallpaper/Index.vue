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

const dataMap = reactive({
  images: [
    {
      url: "/src/assets/images/banner/mingren.jpeg",
      name: "mingren",
      id: 1,
    },
    {
      url: "/src/assets/images/banner/fentoufanv.jpeg",
      name: "fentoufanv",
      id: 2,
    },
    {
      url: "/src/assets/images/banner/gufengnv.jpg",
      name: "gufengnv",
      id: 3,
    },
    {
      url: "/src/assets/images/banner/leidianjiangjun.jpg",
      name: "leidianjiangjun",
      id: 4,
    },
    {
      url: "/src/assets/images/banner/mingren.jpeg",
      name: "mingren",
      id: 5,
    },
    {
      url: "/src/assets/images/banner/dongmannv4.png",
      name: "dongmannv4",
      id: 6,
    },
    {
      url: "/src/assets/images/banner/nuoaier.jpeg",
      name: "nuoaier",
      id: 7,
    },
    {
      url: "/src/assets/images/banner/qianxun2.jpg",
      name: "qianxun2",
      id: 8,
    },
    {
      url: "/src/assets/images/banner/qianyuqianxun.jpg",
      name: "qianyuqianxun",
      id: 9,
    },
    {
      url: "/src/assets/images/banner/shenzi.jpg",
      name: "shenzi",
      id: 10,
    },
    {
      url: "/src/assets/images/banner/xiaomao.png",
      name: "xiaomao",
      id: 11,
    },
    {
      url: "/src/assets/images/banner/dipingxian.jpg",
      name: "dipingxian",
      id: 12,
    },
    {
      url: "/src/assets/images/banner/fengjing1.jpg",
      name: "fengjing1",
      id: 13,
    },
    {
      url: "/src/assets/images/banner/fengjing2.jpg",
      name: "fengjing2",
      id: 14,
    },
    {
      url: "/src/assets/images/banner/fengjing3.jpg",
      name: "fengjing3",
      id: 15,
    },
    {
      url: "/src/assets/images/banner/fengjing4.jpg",
      name: "fengjing3",
      id: 16,
    },
    {
      url: "/src/assets/images/banner/fengjing5.webp",
      name: "fengjing5",
      id: 17,
    },
    {
      url: "/src/assets/images/banner/fengjing6.webp",
      name: "fengjing6",
      id: 18,
    },
    {
      url: "/src/assets/images/banner/fengjing7.jpg",
      name: "fengjing6",
      id: 19,
    },
    {
      url: "/src/assets/images/banner/fengjing8.webp",
      name: "fengjing6",
      id: 20,
    },
    {
      url: "/src/assets/images/banner/fengjing9.jpg",
      name: "fengjing6",
      id: 21,
    },
    {
      url: "/src/assets/images/banner/fengjing10.webp",
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

  li {
    width: 200px;
    height: 120px;
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
