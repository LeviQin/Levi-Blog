<template>
  <Head>
    <meta
      name="keywords"
      content="在线图片格式转换， 智能压缩， 图片加水印， 旋转图片， 图片转文字。"
    />
    <meta
      name="description"
      content="在线图片格式转换， 智能压缩， 图片加水印， 旋转图片， 图片转文字。"
    />
    <meta
      property="og:description"
      content="在线图片格式转换， 智能压缩， 图片加水印， 旋转图片， 图片转文字。"
    />
    <meta
      name="twitter:description"
      content="在线图片格式转换， 智能压缩， 图片加水印， 旋转图片， 图片转文字。"
    />
  </Head>
  <div class="image-processing w tools-container">
    <div class="image-tool-block">
      <div class="image-tool-item theme-bg-color">1</div>
      <div class="image-tool-item theme-bg-color">1</div>
      <div class="image-tool-item theme-bg-color">1</div>
      <div class="image-tool-item theme-bg-color">1</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Head } from "@vueuse/head";
</script>

<style scoped>
.image-processing {
  padding: 20px;
}

.image-tool-block {
  display: flex;
  gap: 20px;
}

.image-tool-item {
  flex: 1;
  border-radius: var(--themeRadius);
}
</style>
