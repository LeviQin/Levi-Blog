<template>
  <Head>
    <meta
      name="keywords"
      content="图像，图片处理，调整尺寸，裁剪，旋转，jpeg,png,gif,tiff,raw"
    />
    <meta
      name="description"
      content="按照你的需求裁剪JPG、PNG或GIF文件。在线裁剪图像文件，轻松便捷，完全免费"
    />
    <meta
      property="og:description"
      content="按照你的需求裁剪JPG、PNG或GIF文件。在线裁剪图像文件，轻松便捷，完全免费"
    />
    <meta
      name="twitter:description"
      content="按照你的需求裁剪JPG、PNG或GIF文件。在线裁剪图像文件，轻松便捷，完全免费"
    />
  </Head>
  <div class="image-crop w theme-bg-color tools-container">
    <div class="image-crop-container" ref="unitConversionContainerRef">
      <div class="image-crop-title">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#levi-tupianxuxianbiankuang"></use>
        </svg>
        <h1>图片裁切</h1>
      </div>
      <div class="image-crop-content">
        <div class="image-crop-preview" v-if="originalImage">
          <div class="title">原始图像</div>
          <div class="image-crop-preview-container">
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
                <div class="crop-btn-block">
                  <div class="crop-btn" @click="compressorImage">开始压缩</div>
                  <div class="cancel-btn">
                    <span @click="cancelCompression">取消压缩</span>
                  </div>
                </div>
              </template>
              <template v-else>
                <el-progress
                  v-if="!compressedImage"
                  :percentage="cropProgress"
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
      <div class="image-crop-success" v-if="compressedImage && cropProgress === 100">
        <div class="title">压缩图像</div>
        <div class="image-crop-success-container">
          <div class="crop-image-block">
            <img class="crop-image" :src="compressedImage" alt="" />
          </div>
          <div class="crop-image-info-block">
            <p>
              图片格式:<span>{{ compressedFormat }}</span
              >， 图片大小:<span>{{ compressedSize }}</span>
            </p>
            <div class="crop-btn-block">
              <div class="crop-btn" @click="downloadCompressorImage">
                下载压缩后的图片
              </div>
              <div class="cancel-btn">
                <span @click="returnlCompression" style="margin-right: 15px"
                  >返回重新压缩</span
                ><span @click="cancelCompression">重新选择图片</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="image-crop-desc">
        <span class="title"
          ><svg class="icon" aria-hidden="true">
            <use xlink:href="#levi-guanyu-"></use></svg
          ><span>关于图片裁切</span></span
        >
        <span class="desc-text">
          图片裁剪工具，提供在线图片大小裁剪，头像制作功能，旋转图片，图片尺寸调整。裁剪支持矩形裁剪和圆形裁剪，支持自定义选取区域大小。
          裁剪后的图片可以免费下载到本地保存。
        </span>
        <span class="desc-text"
          >待裁剪的图片，支持 jpg,jpeg,png,gif,webp 等图片格式。最大支持30MB。</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Head } from "@vueuse/head";
import Cropper from "cropperjs";
import { sizeChangeUnit } from "@/utils/utils";
import Compressor from "compressorjs";

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

const returnlCompression = () => {
  compressionProgress.value = 0;
  isCompressor.value = false;
  compressedImage.value = "";
};

const downloadCompressorImage = () => {
  ElNotification({
    title: "下载中",
    message: "已开始下载压缩图片，请注意浏览器下载提示",
    type: "success",
    zIndex: 99999,
  });

  fetch(compressedImage.value)
    .then((res) => res.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = `${imageName.value}`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      window.URL.revokeObjectURL(url);
    })
    .catch((err) => console.error("下载失败", err));
};
</script>

<style lang="scss" scoped>
.image-crop {
  padding: 20px;
  border-radius: var(--theme-radius);
  max-width: 800px;
}

.image-crop-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.image-crop-title {
  display: flex;
  align-items: center;
}

.image-crop-title .icon {
  width: 1.8em;
  height: 1.8em;
  margin-right: 10px;
}

.image-crop-title h1 {
  font-size: 24px;
}

.upload-icon {
  width: 5em;
  height: 5em;
}

.image-crop-preview .title {
  margin-bottom: 10px;
}

.image-crop-preview-container,
.image-crop-success-container {
  display: flex;
  align-items: center;
  gap: 60px;
}

.preview-image,
.crop-image {
  max-height: 200px;
  max-width: 400px;
  border-radius: var(--theme-radius);
}

.preview-image-info-block p span,
.crop-image-info-block p span {
  margin-left: 10px;
}

.level-btn-block {
  display: flex;
  align-items: center;
}

.level-btn-block span {
  width: 110px;
}

.crop-btn-block {
  margin-top: 15px;
}

.crop-btn {
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

.image-crop-desc .title {
  font-weight: 500;
  display: flex;
  align-items: center;
}

.image-crop-desc .title .icon {
  width: 1.2em;
  height: 1.2em;
  margin-right: 10px;
}

.image-crop-desc .desc-text {
  margin: 10px 0;
  display: flex;
}

.image-crop-success .title {
  margin-bottom: 10px;
}

:deep(.el-progress__text) {
  display: none;
}

@media (max-width: 860px) {
  .image-crop-preview {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .image-crop-container {
    gap: 10px;
  }

  .image-crop-preview-container,
  .image-crop-success-container {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }

  .preview-image-info-block {
    width: 100%;
  }

  .preview-image,
  .crop-image {
    max-width: 100%;
  }
}
</style>
