<template>
  <Head>
    <meta
      name="keywords"
      content="免费在线图像压缩器！使用智能有损压缩引擎减小 WEBP、JPEG 和 PNG 图像的文件大小。"
    />
    <meta
      name="description"
      content="免费在线图像压缩器！使用智能有损压缩引擎减小 WEBP、JPEG 和 PNG 图像的文件大小。"
    />
    <meta
      property="og:description"
      content="免费在线图像压缩器！使用智能有损压缩引擎减小 WEBP、JPEG 和 PNG 图像的文件大小。"
    />
    <meta
      name="twitter:description"
      content="免费在线图像压缩器！使用智能有损压缩引擎减小 WEBP、JPEG 和 PNG 图像的文件大小。"
    />
  </Head>
  <div class="image-compression w theme-bg-color tools-container">
    <div class="image-compression-container" ref="unitConversionContainerRef">
      <div class="image-compression-title">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#levi-tupianyasuo"></use>
        </svg>
        <h1>图片压缩</h1>
      </div>
    </div>
    <el-upload
      :on-change="handleFileChange"
      class="upload-demo"
      drag
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      multiple
    >
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#levi-shangchuan-2"></use>
      </svg>
      <div class="el-upload__text">将文件拖放到此处或 <em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip">支持jpg, png, webp格式</div>
      </template>
    </el-upload>
    <div v-if="originalImage || compressedImage" class="images-container">
      <div class="image-wrapper" v-if="originalImage">
        <h3>Original Image</h3>
        <img :src="originalImage" alt="Original Image" />
      </div>
      <div class="image-wrapper" v-if="compressedImage">
        <h3>Compressed Image</h3>
        <img :src="compressedImage" alt="Compressed Image" />
        <a :href="compressedImage" download="compressed-image.jpg"
          >Download Compressed Image</a
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Compressor from "compressorjs";
import { Head } from "@vueuse/head";

const originalImage = ref(null);
const compressedImage = ref(null);

const handleFileChange = (file) => {
  // 读取原图
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    originalImage.value = reader.result;

    // 压缩图片
    new Compressor(file, {
      quality: 0.6, // 压缩质量，范围为0到1
      success: (compressedFile) => {
        const compressedReader = new FileReader();
        compressedReader.readAsDataURL(compressedFile);
        compressedReader.onload = () => {
          compressedImage.value = compressedReader.result;
        };
      },
      error(err) {
        console.error(err.message);
      },
    });
  };
};
</script>

<style scoped>
.image-compression {
  padding: 20px;
}

.image-compression-title {
  display: flex;
  align-items: center;
}

.image-compression-title .icon {
  width: 1.8em;
  height: 1.8em;
  margin-right: 10px;
}

.image-compression-title h1 {
  font-size: 24px;
}
</style>
