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
  <div class="image-compression w theme-bg-color tools-container">
    <div class="image-compression-container" ref="unitConversionContainerRef">
      <div class="image-compression-title">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#levi-tupianyasuo"></use>
        </svg>
        <h1>图片压缩</h1>
      </div>
      <div class="image-compression-content">
        <div class="image-compression-preview" v-if="originalImage">
          <div class="title">原始图像</div>
          <div class="image-compression-preview-container">
            <div class="preview-image-block">
              <img class="preview-image" :src="originalImage" alt="" />
            </div>
            <div class="preview-image-info-block">
              <p>
                图片格式:<span>{{ originalFormat }}</span
                >， 图片大小:<span>{{ originalSize }}</span>
              </p>
              <template v-if="!isCompressor">
                <div class="level-btn-block">
                  <span>压缩级别:</span>
                  <el-slider :min="1" :max="99" v-model="levelVal" />
                </div>
                <div class="compression-btn-block">
                  <div class="compression-btn" @click="compressorImage">开始压缩</div>
                  <div class="cancel-btn">
                    <span @click="cancelCompression">取消压缩</span>
                  </div>
                </div>
              </template>
              <template v-else>
                <el-progress
                  v-if="!compressedImage"
                  :percentage="compressionProgress"
                  :stroke-width="15"
                  status="success"
                  striped
                  striped-flow
                  :duration="15"
                  indeterminate
                />
              </template>
            </div>
          </div>
        </div>
        <el-upload
          v-else
          class="upload-demo"
          drag
          action=""
          :before-upload="handleBeforeUpload"
          :show-file-list="false"
          accept="image/jpeg,image/png,image/webp"
        >
          <svg class="upload-icon" aria-hidden="true">
            <use xlink:href="#levi-shangchuan-2"></use>
          </svg>
          <div class="el-upload__text">将文件拖放到此处或 <em>点击上传</em></div>
        </el-upload>
      </div>
      <div
        class="image-compression-success"
        v-if="compressedImage && compressionProgress === 100"
      >
        <div class="title">压缩图像</div>
        <div class="image-compression-success-container">
          <div class="compression-image-block">
            <img class="compression-image" :src="compressedImage" alt="" />
          </div>
          <div class="compression-image-info-block">
            <p>
              图片格式:<span>{{ compressedFormat }}</span
              >， 图片大小:<span>{{ compressedSize }}</span>
            </p>
            <div class="compression-btn-block">
              <div class="compression-btn" @click="downloadCompressorImage">
                下载压缩后的图片
              </div>
              <div class="cancel-btn">
                <span @click="cancelCompression">重新选择图片</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="image-compression-desc">
        <span class="title"
          ><svg class="icon" aria-hidden="true">
            <use xlink:href="#levi-guanyu-"></use></svg
          ><span>关于图片格式转换</span></span
        >
        <span class="desc-text"> 支持jpg,jpeg,png,webp等图片格式之间互相转换。</span>
        <span class="desc-text">最大支持上传20MB的图片文件。</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Compressor from "compressorjs";
import { Head } from "@vueuse/head";
import { sizeChangeUnit } from "@/utils/utils";

const originalImage = ref("");
const compressedImage = ref("");
const savefile = ref(null);
const originalFormat = ref("未知格式");
const originalSize = ref("未知大小");
const compressedFormat = ref("未知格式");
const compressedSize = ref("未知大小");
const imageName = ref("compressed-image");
const levelVal = ref(70);
const compressionProgress = ref(0);
const isCompressor = ref(false);

const handleBeforeUpload = (file) => {
  if (file.size > 1024 * 1024 * 30) {
    ElNotification({
      title: "上传失败",
      message: "图片大小不能超过30M",
      type: "warning",
      zIndex: 99999,
    });
    return false;
  }

  savefile.value = file;
  originalFormat.value = file.type.split("/")[1];
  originalSize.value = sizeChangeUnit(file.size);
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    originalImage.value = reader.result;
  };
};

const compressorImage = () => {
  isCompressor.value = true;
  new Compressor(savefile.value, {
    quality: levelVal.value / 100,
    convertSize: 10000000,
    success: (compressedFile) => {
      console.log(compressedFile, 1);
      compressedFormat.value = compressedFile.type.split("/")[1];
      compressedSize.value = sizeChangeUnit(compressedFile.size);
      imageName.value = compressedFile.name;
      const compressedReader = new FileReader();
      compressedReader.readAsDataURL(compressedFile);
      compressedReader.onload = () => {
        compressionProgress.value = 100;
        setTimeout(() => {
          compressedImage.value = compressedReader.result;
        }, 500);
      };
    },
    error(err) {
      console.error(err.message);
    },
  });
};

const cancelCompression = () => {
  originalImage.value = "";
  compressionProgress.value = 0;
  isCompressor.value = false;
};

const downloadCompressorImage = () => {
  ElNotification({
    title: "下载中",
    message: "已开始下载压缩图片，请注意浏览器下载提示",
    type: "success",
    zIndex: 99999,
  });
  const downloadLink = document.createElement("a");
  downloadLink.href = compressedImage.value;
  downloadLink.download = `${imageName.value}`;
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};
</script>

<style lang="scss" scoped>
.image-compression {
  padding: 20px;
  border-radius: var(--theme-radius);
  max-width: 800px;
}

.image-compression-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
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

.upload-icon {
  width: 5em;
  height: 5em;
}

.image-compression-preview .title {
  margin-bottom: 10px;
}

.image-compression-preview-container,
.image-compression-success-container {
  display: flex;
  align-items: center;
  gap: 60px;
}

.preview-image,
.compression-image {
  max-height: 200px;
  max-width: 400px;
  border-radius: var(--theme-radius);
}

.preview-image-info-block p span,
.compression-image-info-block p span {
  margin-left: 10px;
}

.level-btn-block {
  display: flex;
  align-items: center;
}

.level-btn-block span {
  width: 110px;
}

.compression-btn-block {
  margin-top: 15px;
}

.compression-btn {
  background-color: var(--btn-tag-bg-color);
  cursor: pointer;
  transition: all 0.3s;
  padding: 10px 20px;
  text-align: center;
  color: var(--white-color);
  border-radius: var(--theme-min-radius);
  &:hover {
    background-color: var(--theme-btn-hover-color);
  }
}

.cancel-btn {
  text-align: center;
  padding: 10px;
  span {
    color: var(--red-color);
    font-size: 14px;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
}

.image-compression-desc .title {
  font-weight: 500;
  display: flex;
  align-items: center;
}

.image-compression-desc .title .icon {
  width: 1.2em;
  height: 1.2em;
  margin-right: 10px;
}

.image-compression-desc .desc-text {
  margin: 10px 0;
  display: flex;
}

.image-compression-success .title {
  margin-bottom: 10px;
}

:deep(.el-progress__text) {
  display: none;
}

@media (max-width: 860px) {
  .image-compression-preview {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .image-compression-container {
    gap: 10px;
  }

  .image-compression-preview-container,
  .image-compression-success-container {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }

  .preview-image-info-block {
    width: 100%;
  }

  .preview-image,
  .compression-image {
    max-width: 100%;
  }
}
</style>
