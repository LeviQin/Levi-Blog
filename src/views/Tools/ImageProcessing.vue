<template>
  <Head>
    <meta
      name="keywords"
      content="在线图片格式转换， 智能压缩， 图片加水印， 图片裁切， 图片转文字。"
    />
    <meta
      name="description"
      content="在线图片格式转换， 智能压缩， 图片加水印， 图片裁切， 图片转文字。"
    />
    <meta
      property="og:description"
      content="在线图片格式转换， 智能压缩， 图片加水印， 图片裁切， 图片转文字。"
    />
    <meta
      name="twitter:description"
      content="在线图片格式转换， 智能压缩， 图片加水印， 图片裁切， 图片转文字。"
    />
  </Head>
  <div class="image-processing w">
    <div></div>
    <div class="image-tool-list" @click="toPage">
      <div class="image-tool-item theme-bg-color" data-router="image-compression">
        图片压缩
      </div>
      <div class="image-tool-item theme-bg-color" data-router="image-exif-view">
        图片EXIF查看
      </div>
      <!-- <div class="image-tool-item theme-bg-color" data-router="image-format-conversion">
        图片格式转换
      </div> -->
      <!-- <div class="image-tool-item theme-bg-color" data-router="image-shuiyin">
        图片加水印
      </div>
      <div class="image-tool-item theme-bg-color" data-router="image-crop">图片裁切</div>
      <div class="image-tool-item theme-bg-color" data-router="image-text">
        图片转文字
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Head } from "@vueuse/head";
import { useRouter } from "vue-router";

const router = useRouter();

const toPage = (e) => {
  const path = e.target.getAttribute("data-router");
  router.push(path);
  // if (path && path === `image-compression`) {
  //   router.push(path);
  // } else {
  //   ElNotification({
  //     title: "提醒",
  //     message: "该功能暂未上线哦~",
  //     type: "warning",
  //     zIndex: 99999,
  //   });
  // }
};
</script>

<style lang="scss" scoped>
.image-processing {
  padding: 20px;
}

.image-tool-list {
  display: flex;
  gap: 20px;
}

.image-tool-item {
  flex: 1;
  border-radius: var(--theme-radius);
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.05);
  }
}

@media (max-width: 860px) {
  .image-tool-list {
    flex-direction: column;
  }
}
</style>
