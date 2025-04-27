<template>
  <Head>
    <meta
      name="keywords"
      content="查看图像EXIF信息， 提取照片元数据，图片元数据分析工具，在线查看图像EXIF数据。"
    />
    <meta
      name="description"
      content="查看图像EXIF信息， 提取照片元数据，图片元数据分析工具，在线查看图像EXIF数据。"
    />
    <meta
      property="og:description"
      content="查看图像EXIF信息， 提取照片元数据，图片元数据分析工具，在线查看图像EXIF数据。"
    />
    <meta
      name="twitter:description"
      content="查看图像EXIF信息， 提取照片元数据，图片元数据分析工具，在线查看图像EXIF数据。"
    />
  </Head>
  <div class="image-exif-view w theme-bg-color image-tool-container all-tool-container">
    <div class="image-exif-view-container image-tool-block">
      <div class="image-exif-view-title image-tool-title">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#levi-tupianyasuo"></use>
        </svg>
        <h1>图片EXIF查看器</h1>
      </div>
      <div class="exif-ads">
        ✅已成功解析<span class="exif-total-text">{{ exifTotal }}</span
        >张照片了
      </div>
      <div class="image-exif-view-content image-tool-content">
        <div class="image-exif-view-block">
          <div class="image-exif-view-upload">
            <el-upload
              class="upload-demo"
              drag
              action=""
              :before-upload="handleBeforeUpload"
              :show-file-list="false"
            >
              <svg class="upload-icon" aria-hidden="true">
                <use xlink:href="#levi-shangchuan-2"></use>
              </svg>
              <div class="el-upload__text">将文件拖放到此处或 <em>点击上传</em></div>
            </el-upload>
            <div class="progress-block">
              <el-progress
                v-if="uploadPercentage > 0"
                :text-inside="true"
                :stroke-width="24"
                :percentage="uploadPercentage"
                status="success"
              />
            </div>
          </div>
          <div class="preview-block" v-if="exifImg">
            <img :src="exifImg" alt="" />
          </div>
        </div>
        <div class="image-exif-view-result" v-if="dataMap.result">
          <h3>🔍查询结果</h3>
          <div class="image-exif-view-result-list">
            <div
              class="image-exif-view-result-item"
              v-if="dataMap.result.summaryInformation.length"
            >
              <h4 class="result-item-title">摘要信息</h4>
              <table class="exif-table">
                <tbody>
                  <tr
                    v-for="(item, index) in dataMap.result.summaryInformation"
                    :key="index"
                  >
                    <td class="result-item-label">{{ item.label }}</td>
                    <td class="result-item-value">{{ item.value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              class="image-exif-view-result-item"
              v-if="dataMap.result.basicInformation.length"
            >
              <h4 class="result-item-title">图片信息</h4>
              <table class="exif-table">
                <tbody>
                  <tr
                    v-for="(item, index) in dataMap.result.basicInformation"
                    :key="index"
                  >
                    <td class="result-item-label">{{ item.label }}</td>
                    <td class="result-item-value">{{ item.value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              class="image-exif-view-result-item"
              v-if="dataMap.result.shootingParameters.length"
            >
              <h4 class="result-item-title">拍摄信息</h4>
              <table class="exif-table">
                <tbody>
                  <tr
                    v-for="(item, index) in dataMap.result.shootingParameters"
                    :key="index"
                  >
                    <td class="result-item-label">{{ item.label }}</td>
                    <td class="result-item-value">{{ item.value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              class="image-exif-view-result-item"
              v-if="dataMap.result.cameraInformation.length"
            >
              <h4 class="result-item-title">相机信息</h4>
              <table class="exif-table">
                <tbody>
                  <tr
                    v-for="(item, index) in dataMap.result.cameraInformation"
                    :key="index"
                  >
                    <td class="result-item-label">{{ item.label }}</td>
                    <td class="result-item-value">{{ item.value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              class="image-exif-view-result-item"
              v-if="dataMap.result.shootingTime.length"
            >
              <h4 class="result-item-title">拍摄时间</h4>
              <table class="exif-table">
                <tbody>
                  <tr v-for="(item, index) in dataMap.result.shootingTime" :key="index">
                    <td class="result-item-label">{{ item.label }}</td>
                    <td class="result-item-value">{{ item.value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              class="image-exif-view-result-item"
              v-if="dataMap.result.GPSInformation.length"
            >
              <h4 class="result-item-title">GPS 信息</h4>
              <table class="exif-table">
                <tbody>
                  <tr v-for="(item, index) in dataMap.result.GPSInformation" :key="index">
                    <td class="result-item-label">{{ item.label }}</td>
                    <td class="result-item-value">{{ item.value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              class="image-exif-view-result-item"
              v-if="dataMap.result.imageProcessingParameters.length"
            >
              <h4 class="result-item-title">图像处理参数</h4>
              <table class="exif-table">
                <tbody>
                  <tr
                    v-for="(item, index) in dataMap.result.imageProcessingParameters"
                    :key="index"
                  >
                    <td class="result-item-label">{{ item.label }}</td>
                    <td class="result-item-value">{{ item.value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              class="image-exif-view-result-item"
              v-if="dataMap.result.imageFormatParameters.length"
            >
              <h4 class="result-item-title">图像格式参数</h4>
              <table class="exif-table">
                <tbody>
                  <tr
                    v-for="(item, index) in dataMap.result.imageFormatParameters"
                    :key="index"
                  >
                    <td class="result-item-label">{{ item.label }}</td>
                    <td class="result-item-value">{{ item.value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              class="image-exif-view-result-item"
              v-if="dataMap.result.additionalInformation.length"
            >
              <h4 class="result-item-title">其他信息</h4>
              <table class="exif-table">
                <tbody>
                  <tr
                    v-for="(item, index) in dataMap.result.additionalInformation"
                    :key="index"
                  >
                    <td class="result-item-label">{{ item.label }}</td>
                    <td class="result-item-value">{{ item.value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="image-compression-desc image-tool-desc">
        <span class="title"
          ><svg class="icon" aria-hidden="true">
            <use xlink:href="#levi-guanyu-"></use></svg
          ><span>关于图片EXIF查看器</span></span
        >
        <span class="desc-text">📸极速在线查看图片EXIF信息。</span>
        <span class="desc-text">✅无需下载安装，一键上传立即解析。</span>
        <span class="desc-text"
          >📸支持20+相机品牌原厂注释（Canon/Nikon/SONY/Pentax等）。</span
        >
        <span class="desc-text"
          >📊专业数据展示：镜头参数/景深计算/曝光补偿/快门次数。</span
        >
        <span class="desc-text"
          >🖼️主流格式全兼容(JPEG/JPG, TIFF, WEBP, PNG, AVIF, HEIC/HEIF), 专业相机RAW格式,
          元数据文件(XMP（Adobe标准）, DNG（Adobe数字负片）),
          注意：实际支持度取决于文件是否嵌入EXIF数据, 部分手机/截图PNG可能无EXIF。</span
        >
      </div>
      <div class="image-compression-desc image-tool-desc">
        <span class="title"
          ><svg class="icon" aria-hidden="true">
            <use xlink:href="#levi-guanyu-"></use></svg
          ><span>什么是EXIF？</span></span
        >
        <span class="desc-text"
          >EXIF（Exchangeable Image File
          Format，可交换图像文件格式）是专为数码照片设计的元数据标准，用于记录丰富的拍摄信息。</span
        >
        <span class="desc-text"
          >EXIF是一种可以嵌入在JPEG、TIFF、RAW等图像文件中的元数据格式，用于记录拍摄参数和相机信息。</span
        >
      </div>
      <div class="image-compression-desc image-tool-desc">
        <span class="title"
          ><svg class="icon" aria-hidden="true">
            <use xlink:href="#levi-guanyu-"></use></svg
          ><span><strong>注意：</strong>请上传原图</span></span
        >
        <span class="desc-text"
          >如想准确查看镜头信息、快门次数，请不要上传Photoshop处理过的图片。</span
        >
        <span class="desc-text"
          >经过Photoshop处理过的图片，会丢失厂商注释信息，从而导致镜头信息丢失。</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { Head } from "@vueuse/head";
import ExifReader from "exifreader";
import { getExifTotal, addExifTotal } from "@/api/image-tool";
import { categorizeExifData } from "@/utils/exifMap";

onMounted(() => {
  getTotalData();
});

const dataMap = reactive({
  result: null,
});

const exifTotal = ref(0);
const uploadPercentage = ref(0);
const exifImg = ref("");

const handleBeforeUpload = (file) => {
  const fileSize = file.size;
  const chunkSize = 1024 * 100;
  let loaded = 0;
  resetData();

  const reader = new FileReader();
  reader.onload = async function (e) {
    const simulateProgress = () => {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          if (uploadPercentage.value < 99) {
            loaded += chunkSize;
            const percent = Math.min(Math.floor((loaded / fileSize) * 99), 99);
            uploadPercentage.value = percent;
          } else {
            clearInterval(interval);
            resolve();
          }
        }, 20);
      });
    };

    await simulateProgress();
    try {
      const tags = ExifReader.load(e.target.result);
      dataMap.result = categorizeExifData(tags);
      await addExifTotal();
      getTotalData();
      uploadPercentage.value = 100;
      exifImg.value = URL.createObjectURL(file);
    } catch (error) {
      console.error("解析 EXIF 失败：", error);
      ElNotification({
        title: "解析 EXIF 失败, 请重试",
        message: error,
        type: "error",
        zIndex: 99999,
      });
      resetData();
    }
  };
  reader.readAsArrayBuffer(file);
};

const resetData = () => {
  uploadPercentage.value = 0;
  dataMap.result = null;
  exifImg.value = "";
};

const getTotalData = async () => {
  try {
    const res = await getExifTotal();
    const { code, data } = res.data;
    if (code == 200) {
      exifTotal.value = data;
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped>
h4 {
  margin: 0;
}

.exif-ads {
  position: absolute;
  top: 30px;
  right: 20px;
}

.exif-total-text {
  font-size: 20px;
  font-weight: 600;
  margin: 0 5px;
}

.progress-block {
  margin-top: 10px;
}

.image-exif-view-block {
  display: flex;
  gap: 20px;
}

.image-exif-view-upload {
  flex: 1;
}

.preview-block {
  width: 25%;
  height: 188px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--theme-min-radius);
  }
}

.image-exif-view-result {
  margin-bottom: 20px;
}

.image-exif-view-result-list {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
}

.image-exif-view-result-item {
  background-color: #fff;
  border-radius: var(--theme-min-radius);
  padding: 20px;
}

.exif-table {
  table-layout: fixed;
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.exif-table td {
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
}

.result-item-label {
  background-color: #f5f5f5;
  font-weight: bold;
  color: #333;
  font-size: 13px;
  width: 30%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.result-item-value {
  font-size: 13px;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
}

.result-item-value {
  background-color: #fff;
  color: #555;
}

@media (max-width: 860px) {
  .image-exif-view-block {
    flex-direction: column;
  }

  .preview-block {
    width: 100%;
  }

  .exif-ads {
    margin-top: -20px;
    position: relative;
    top: unset;
    right: unset;
  }
}
</style>
