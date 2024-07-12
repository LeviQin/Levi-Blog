<template>
  <Head>
    <meta
      name="keywords"
      content="图片格式转换器在线,JPG格式转换,JPG格式图片,GIF转JPG,怎么修改图片格式。"
    />
    <meta
      name="description"
      content="免费的在线图片格式转换器，可以把你的图片文件类型(后缀)更改为.jpg(.jpeg) .gif .png .webp .heic .bmp等；你只需上传要转换的图片原图，再下载需要的图片格式即可。"
    />
    <meta
      property="og:description"
      content="免费的在线图片格式转换器，可以把你的图片文件类型(后缀)更改为.jpg(.jpeg) .gif .png .webp .heic .bmp等；你只需上传要转换的图片原图，再下载需要的图片格式即可。"
    />
    <meta
      name="twitter:description"
      content="免费的在线图片格式转换器，可以把你的图片文件类型(后缀)更改为.jpg(.jpeg) .gif .png .webp .heic .bmp等；你只需上传要转换的图片原图，再下载需要的图片格式即可。"
    />
  </Head>
  <div class="ImageProcessing w theme-bg-color tools-container">
    <div class="ImageProcessing-container" ref="unitConversionContainerRef">
      <div class="ImageProcessing-title">
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
.ImageProcessing {
  padding: 20px;
}

.ImageProcessing-title {
  display: flex;
  align-items: center;
}

.ImageProcessing-title .icon {
  width: 1.8em;
  height: 1.8em;
  margin-right: 10px;
}

.ImageProcessing-title h1 {
  font-size: 24px;
}
</style>
