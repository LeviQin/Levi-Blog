<template>
  <div>
    <Head>
      <meta name="keywords" content="免费在线图像压缩器！使用智能有损压缩引擎减小 WEBP、JPG 和 PNG 图像的文件大小。" />
      <meta name="description" content="免费在线图像压缩器！使用智能有损压缩引擎减小 WEBP、JPG 和 PNG 图像的文件大小。" />
      <meta property="og:description" content="免费在线图像压缩器！使用智能有损压缩引擎减小 WEBP、JPG 和 PNG 图像的文件大小。" />
      <meta name="twitter:description" content="免费在线图像压缩器！使用智能有损压缩引擎减小 WEBP、JPG 和 PNG 图像的文件大小。" />
    </Head>

    <div
      class="ic-root w theme-bg-color image-tool-container all-tool-container"
      @paste="handlePaste"
      tabindex="0"
      ref="containerRef"
    >
      <div class="ic-body">
        <header class="ic-header">
          <div class="ic-header-icon">
            <svg class="icon" aria-hidden="true"><use xlink:href="#levi-tupianyasuo"></use></svg>
          </div>
          <div class="ic-header-text">
            <h1>图片压缩</h1>
            <p>智能有损压缩 &mdash; 大幅减小文件体积，保持出色画质</p>
          </div>
        </header>

        <div v-if="!originalImage" class="ic-upload-stage">
          <div class="ic-upload-card">
            <div
              class="ic-dropzone"
              :class="{ 'is-active': isDragOver }"
              @dragover.prevent="onDragOver"
              @dragleave="onDragLeave"
              @drop.prevent="onDrop"
            >
              <div class="ic-dropzone-icon-wrap">
                <svg class="icon" aria-hidden="true"><use xlink:href="#levi-shangchuan-2"></use></svg>
              </div>
              <div class="ic-dropzone-title">拖放图片到这里</div>
              <div class="ic-dropzone-divider"><span></span><em>或</em><span></span></div>
              <el-upload
                class="ic-upload-trigger"
                action=""
                :before-upload="handleBeforeUpload"
                :show-file-list="false"
                accept="image/jpeg,image/png,image/webp,image/svg+xml,image/gif,image/bmp"
              >
                <button class="ic-btn-browse" type="button">选择文件</button>
              </el-upload>
              <div class="ic-dropzone-formats">
                <span>JPG</span><span>PNG</span><span>WebP</span><span>SVG</span><span>GIF</span><span>BMP</span>
              </div>
              <div class="ic-dropzone-limit">单文件最大 30MB</div>
            </div>
          </div>
          <p class="ic-paste-hint">也可以使用 <kbd>Ctrl + V</kbd> 粘贴剪贴板图片</p>
        </div>

        <template v-else>
          <section class="ic-compare-section" v-if="compressedImage && compressionProgress === 100">
            <div class="ic-compare-label-bar">
              <div class="ic-compare-tag ic-tag-left">
                <span>原始</span><em>{{ originalSize }}</em>
              </div>
              <div class="ic-compare-tag ic-tag-right">
                <span>压缩后</span><em>{{ compressedSize }}</em>
              </div>
            </div>
            <div
              class="ic-compare-viewer"
              ref="compareViewerRef"
              @mousemove="onSliderDrag" @mouseup="onSliderEnd" @mouseleave="onSliderEnd"
              @touchmove="onSliderDrag" @touchend="onSliderEnd"
            >
              <div class="ic-compare-original">
                <img :src="originalImage" alt="原始图像" />
              </div>
              <div class="ic-compare-result" :style="{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }">
                <img :src="compressedImage" alt="压缩结果" />
              </div>
              <div
                class="ic-compare-handle"
                :class="{ 'is-dragging': isSliding }"
                :style="{ left: sliderPos + '%' }"
                @mousedown.prevent="onSliderStart"
                @touchstart.prevent="onSliderStart"
              >
                <div class="ic-compare-grip">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M8 5L3 12L8 19" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16 5L21 12L16 19" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="ic-compare-line"></div>
              </div>
            </div>
          </section>

          <section class="ic-cards-row">
            <div class="ic-card">
              <div class="ic-card-head">
                <span class="ic-card-indicator ic-ind-blue"></span>
                <span class="ic-card-title">原始图像</span>
              </div>
              <div class="ic-card-preview" v-if="!(compressedImage && compressionProgress === 100)">
                <img :src="originalImage" alt="原始图像" />
              </div>
              <dl class="ic-meta-list">
                <div class="ic-meta-row"><dt>格式</dt><dd><span class="ic-tag">{{ originalFormat.toUpperCase() }}</span></dd></div>
                <div class="ic-meta-row"><dt>大小</dt><dd class="ic-mono">{{ originalSize }}</dd></div>
                <div class="ic-meta-row" v-if="originalDimensions"><dt>尺寸</dt><dd class="ic-mono">{{ originalDimensions }}</dd></div>
              </dl>
            </div>

            <div class="ic-card ic-card-result" v-if="compressedImage && compressionProgress === 100">
              <div class="ic-card-head">
                <span class="ic-card-indicator ic-ind-green"></span>
                <span class="ic-card-title">压缩结果</span>
              </div>
              <dl class="ic-meta-list">
                <div class="ic-meta-row"><dt>格式</dt><dd><span class="ic-tag ic-tag-green">{{ compressedFormat.toUpperCase() }}</span></dd></div>
                <div class="ic-meta-row"><dt>大小</dt><dd class="ic-mono">{{ compressedSize }}</dd></div>
                <div class="ic-meta-row" v-if="compressedDimensions"><dt>尺寸</dt><dd class="ic-mono">{{ compressedDimensions }}</dd></div>
              </dl>
              <div class="ic-savings-box">
                <div class="ic-savings-ring">
                  <svg viewBox="0 0 100 100">
                    <circle class="ic-savings-bg" cx="50" cy="50" r="42" />
                    <circle class="ic-savings-fill" cx="50" cy="50" r="42"
                      :style="{
                        strokeDasharray: 2 * Math.PI * 42,
                        strokeDashoffset: 2 * Math.PI * 42 * (1 - animatedSavingsPercent / 100),
                      }"
                    />
                  </svg>
                  <div class="ic-savings-inner">
                    <span class="ic-savings-num">-{{ animatedSavingsPercent }}%</span>
                  </div>
                </div>
                <div class="ic-savings-detail">
                  <div class="ic-savings-row">
                    <span>节省空间</span>
                    <strong>{{ savingsSize }}</strong>
                  </div>
                  <div class="ic-savings-track">
                    <div class="ic-savings-track-fill" :style="{ width: animatedSavingsPercent + '%' }"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="ic-card" v-else-if="isCompressor">
              <div class="ic-card-head">
                <span class="ic-card-indicator ic-ind-orange"></span>
                <span class="ic-card-title">正在压缩</span>
              </div>
              <div class="ic-progress-area">
                <div class="ic-progress-ring">
                  <svg viewBox="0 0 100 100">
                    <circle class="ic-progress-bg" cx="50" cy="50" r="42" />
                    <circle class="ic-progress-fill" cx="50" cy="50" r="42"
                      :style="{
                        strokeDasharray: 2 * Math.PI * 42,
                        strokeDashoffset: 2 * Math.PI * 42 * (1 - compressionProgress / 100),
                      }"
                    />
                  </svg>
                  <div class="ic-progress-inner">
                    <span class="ic-progress-num">{{ compressionProgress }}%</span>
                  </div>
                </div>
                <p class="ic-progress-desc">智能分析处理中...</p>
              </div>
            </div>
          </section>

          <section class="ic-settings">
            <div class="ic-settings-grid">
              <div class="ic-setting-block">
                <label class="ic-setting-label">压缩模式</label>
                <div class="ic-preset-group">
                  <button
                    v-for="preset in qualityPresets"
                    :key="preset.key"
                    class="ic-preset-btn"
                    :class="{ active: currentPreset === preset.key }"
                    @click="selectPreset(preset.key)"
                  >
                    <span class="ic-preset-name">{{ preset.label }}</span>
                    <span class="ic-preset-meta" v-if="preset.quality">Q{{ preset.quality }}</span>
                  </button>
                </div>
                <div class="ic-custom-slider" v-if="currentPreset === 'custom'">
                  <div class="ic-slider-header">
                    <span>质量</span>
                    <span class="ic-slider-val">{{ levelVal }}</span>
                  </div>
                  <el-slider :min="1" :max="99" v-model="levelVal" :show-tooltip="false" />
                </div>
              </div>

              <div class="ic-setting-block">
                <label class="ic-setting-label">输出选项</label>
                <div class="ic-options-row">
                  <label class="ic-opt">
                    <span class="ic-opt-key">格式</span>
                    <el-select v-model="outputFormat" size="default" class="ic-select">
                      <el-option label="保持原格式" value="auto" />
                      <el-option label="JPEG" value="image/jpeg" />
                      <el-option label="PNG" value="image/png" />
                      <el-option label="WebP" value="image/webp" />
                    </el-select>
                  </label>
                  <label class="ic-opt">
                    <span class="ic-opt-key">最大宽度 (px)</span>
                    <el-input-number v-model="maxWidth" :min="0" :max="10000" :step="200" size="default" class="ic-input-num" />
                  </label>
                </div>
              </div>
            </div>

            <div class="ic-actions">
              <button class="ic-btn ic-btn-primary" @click="compressorImage" :disabled="isCompressor">
                <svg v-if="!isCompressor" class="icon" aria-hidden="true"><use xlink:href="#levi-tupianyasuo"></use></svg>
                <span class="ic-btn-spinner" v-if="isCompressor"></span>
                {{ isCompressor ? '压缩中...' : '开始压缩' }}
              </button>
              <button class="ic-btn ic-btn-outline" @click="cancelCompression">
                <svg class="icon" aria-hidden="true"><use xlink:href="#levi-shangchuan-2"></use></svg>
                重新选择
              </button>
              <button v-if="compressedImage && compressionProgress === 100" class="ic-btn ic-btn-success" @click="downloadCompressorImage">
                <svg class="icon" aria-hidden="true"><use xlink:href="#levi-shangchuan-2"></use></svg>
                下载图片
              </button>
              <button v-if="compressedImage && compressionProgress === 100" class="ic-btn ic-btn-ghost" @click="returnlCompression">
                重新压缩
              </button>
            </div>
          </section>
        </template>

        <footer class="ic-footer">
          <div class="ic-footer-head">
            <svg class="icon" aria-hidden="true"><use xlink:href="#levi-guanyu-"></use></svg>
            <span>关于图片压缩</span>
          </div>
          <div class="ic-footer-grid">
            <div class="ic-footer-card">
              <div class="ic-footer-card-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--btn-tag-bg-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              </div>
              <strong>智能压缩</strong>
              <p>在文件大小与画质之间取得最佳平衡，推荐模式适合大多数场景。</p>
            </div>
            <div class="ic-footer-card">
              <div class="ic-footer-card-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--theme-btn-hover-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4" ry="10"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
              </div>
              <strong>WebP 推荐</strong>
              <p>WebP 在相同质量下体积更小，是网页图片的最佳格式选择。</p>
            </div>
            <div class="ic-footer-card">
              <div class="ic-footer-card-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#67c23a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              </div>
              <strong>本地处理</strong>
              <p>所有压缩在浏览器中完成，图片不会上传到任何服务器。</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import Compressor from "compressorjs";
import { Head } from "@vueuse/head";
import { sizeChangeUnit } from "@/utils/utils";

const originalImage = ref("");
const compressedImage = ref("");
const savefile = ref(null);
const originalFormat = ref("");
const originalSize = ref("");
const compressedFormat = ref("");
const compressedSize = ref("");
const imageName = ref("compressed-image");
const levelVal = ref(60);
const compressionProgress = ref(0);
const isCompressor = ref(false);
const outputFormat = ref("auto");
const maxWidth = ref(0);
const containerRef = ref(null);
const compareViewerRef = ref(null);
const originalDimensions = ref("");
const compressedDimensions = ref("");
const isDragOver = ref(false);

const qualityPresets = [
  { key: "low", label: "极致体积", quality: 20 },
  { key: "medium", label: "推荐均衡", quality: 60 },
  { key: "high", label: "高清画质", quality: 85 },
  { key: "custom", label: "自定义", quality: null },
];

const currentPreset = ref("medium");

const selectPreset = (key) => {
  currentPreset.value = key;
  const preset = qualityPresets.find((p) => p.key === key);
  if (preset && preset.quality !== null) levelVal.value = preset.quality;
};

const getEffectiveQuality = () => {
  const preset = qualityPresets.find((p) => p.key === currentPreset.value);
  if (preset && preset.quality !== null) return preset.quality / 100;
  return levelVal.value / 100;
};

const getCompressedBytes = () => {
  const sizeStr = compressedSize.value;
  if (!sizeStr) return 0;
  const num = parseFloat(sizeStr);
  if (sizeStr.includes("MB")) return num * 1024 * 1024;
  if (sizeStr.includes("KB")) return num * 1024;
  if (sizeStr.includes("GB")) return num * 1024 * 1024 * 1024;
  return num;
};

const savingsPercent = computed(() => {
  if (!savefile.value || !compressedImage.value) return 0;
  const ob = savefile.value.size;
  const cb = getCompressedBytes();
  if (ob === 0) return 0;
  return Math.round(((ob - cb) / ob) * 100);
});

const savingsSize = computed(() => {
  if (!savefile.value || !compressedImage.value) return "0 B";
  const diff = savefile.value.size - getCompressedBytes();
  return sizeChangeUnit(Math.max(0, diff));
});

const animatedSavingsPercent = ref(0);
let savingsAnimFrame = null;

const animateSavings = (target) => {
  if (savingsAnimFrame) cancelAnimationFrame(savingsAnimFrame);
  const start = animatedSavingsPercent.value;
  const duration = 900;
  const startTime = performance.now();
  const step = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    animatedSavingsPercent.value = Math.round(start + (target - start) * eased);
    if (progress < 1) savingsAnimFrame = requestAnimationFrame(step);
  };
  savingsAnimFrame = requestAnimationFrame(step);
};

const sliderPos = ref(50);
const isSliding = ref(false);

const onSliderStart = () => { isSliding.value = true; };
const onSliderEnd = () => { isSliding.value = false; };
const onSliderDrag = (e) => {
  if (!isSliding.value || !compareViewerRef.value) return;
  const rect = compareViewerRef.value.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  let pos = ((clientX - rect.left) / rect.width) * 100;
  pos = Math.max(3, Math.min(97, pos));
  sliderPos.value = Math.round(pos * 10) / 10;
};

const onDragOver = () => { isDragOver.value = true; };
const onDragLeave = () => { isDragOver.value = false; };
const onDrop = (e) => {
  isDragOver.value = false;
  const files = e.dataTransfer.files;
  if (files.length > 0) processFile(files[0]);
};

const processFile = (file) => {
  if (file.size > 1024 * 1024 * 30) {
    ElNotification({ title: "上传失败", message: "图片大小不能超过 30MB", type: "warning", zIndex: 99999 });
    return;
  }
  savefile.value = file;
  originalFormat.value = file.type ? file.type.split("/")[1] : "未知";
  originalSize.value = sizeChangeUnit(file.size);
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    originalImage.value = reader.result;
    nextTick(() => getImageDimensions(reader.result, "original"));
  };
};

const handleBeforeUpload = (file) => { processFile(file); return false; };

const handlePaste = (e) => {
  if (originalImage.value) return;
  const items = e.clipboardData?.items;
  if (!items) return;
  for (const item of items) {
    if (item.type.startsWith("image/")) {
      e.preventDefault();
      const file = item.getAsFile();
      if (file) processFile(file);
      break;
    }
  }
};

const getImageDimensions = (src, type) => {
  const img = new Image();
  img.onload = () => {
    const dims = `${img.naturalWidth} × ${img.naturalHeight}`;
    if (type === "original") originalDimensions.value = dims;
    else compressedDimensions.value = dims;
  };
  img.src = src;
};

const compressorImage = () => {
  if (!savefile.value) return;
  isCompressor.value = true;
  compressedImage.value = "";
  compressionProgress.value = 0;
  animatedSavingsPercent.value = 0;
  sliderPos.value = 50;

  const progressInterval = setInterval(() => {
    if (compressionProgress.value < 90) {
      compressionProgress.value += Math.floor(Math.random() * 8) + 2;
      if (compressionProgress.value > 90) compressionProgress.value = 90;
    }
  }, 200);

  const options = {
    quality: getEffectiveQuality(),
    convertSize: Infinity,
    maxWidth: maxWidth.value > 0 ? maxWidth.value : Infinity,
  };
  if (outputFormat.value !== "auto") options.mimeType = outputFormat.value;

  new Compressor(savefile.value, {
    ...options,
    success: (compressedFile) => {
      clearInterval(progressInterval);
      compressionProgress.value = 100;
      compressedFormat.value = compressedFile.type ? compressedFile.type.split("/")[1] : originalFormat.value;
      compressedSize.value = sizeChangeUnit(compressedFile.size);
      imageName.value = compressedFile.name || `compressed.${compressedFormat.value}`;
      const compressedReader = new FileReader();
      compressedReader.readAsDataURL(compressedFile);
      compressedReader.onload = () => {
        compressedImage.value = compressedReader.result;
        nextTick(() => {
          getImageDimensions(compressedReader.result, "result");
          animateSavings(savingsPercent.value);
        });
      };
    },
    error(err) {
      clearInterval(progressInterval);
      isCompressor.value = false;
      compressionProgress.value = 0;
      ElNotification({ title: "压缩失败", message: err.message || "压缩出错", type: "error", zIndex: 99999 });
      console.error("压缩错误:", err.message);
    },
  });
};

const cancelCompression = () => {
  originalImage.value = "";
  compressedImage.value = "";
  compressionProgress.value = 0;
  isCompressor.value = false;
  savefile.value = null;
  originalDimensions.value = "";
  compressedDimensions.value = "";
  animatedSavingsPercent.value = 0;
  sliderPos.value = 50;
};

const returnlCompression = () => {
  compressionProgress.value = 0;
  isCompressor.value = false;
  compressedImage.value = "";
  compressedDimensions.value = "";
  animatedSavingsPercent.value = 0;
  sliderPos.value = 50;
};

const downloadCompressorImage = () => {
  ElNotification({ title: "下载中", message: "已开始下载压缩图片", type: "success", zIndex: 99999 });
  fetch(compressedImage.value)
    .then((res) => res.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = imageName.value;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    })
    .catch((err) => console.error("下载失败", err));
};

onMounted(() => {
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "v") return;
  });
});

onUnmounted(() => {
  if (savingsAnimFrame) cancelAnimationFrame(savingsAnimFrame);
});
</script>

<style lang="scss" scoped>
.ic-root {
  &.theme-bg-color {
    border-radius: var(--theme-radius);
    padding: 28px 32px;
  }
}

.ic-header {
  text-align: center;
  margin-bottom: 40px;
}

.ic-header-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 68px;
  height: 68px;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(34,211,238,0.15) 0%, rgba(34,211,238,0.04) 100%);
  margin-bottom: 18px;
  .icon { width: 34px; height: 34px; color: var(--btn-tag-bg-color); }
}

.ic-header-text {
  h1 { font-size: 28px; font-weight: 700; margin: 0 0 8px; color: var(--el-text-color-primary); letter-spacing: -0.02em; }
  p  { font-size: 15px; color: var(--el-text-color-secondary); margin: 0; }
}

.ic-upload-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ic-upload-card {
  width: 100%;
}

.ic-dropzone {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 32px;
  border: 2px dashed var(--el-border-color);
  border-radius: 20px;
  background: var(--el-bg-color);
  cursor: default;
  transition: border-color .25s, background .25s, box-shadow .25s;

  &.is-active {
    border-color: var(--btn-tag-bg-color);
    background: rgba(34,211,238,0.06);
    box-shadow: 0 0 0 6px rgba(34,211,238,0.08);
  }
}

.ic-dropzone-icon-wrap {
  margin-bottom: 14px;
  .icon { width: 52px; height: 52px; color: var(--theme-btn-hover-color); opacity: .65; }
}

.ic-dropzone-title {
  font-size: 19px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  margin-bottom: 22px;
}

.ic-dropzone-divider {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 260px;
  margin-bottom: 22px;
  span {
    flex: 1; height: 1px; background: var(--el-border-color);
  }
  em {
    font-style: normal; font-size: 13px; color: var(--el-text-color-secondary);
  }
}

.ic-btn-browse {
  padding: 11px 36px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background: var(--btn-tag-bg-color);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background .2s, transform .15s, box-shadow .15s;
  outline: none;
  &:hover { background: #e67a1a; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(34,211,238,0.3); }
  &:active { transform: translateY(0); }
}

.ic-upload-trigger { margin-bottom: 24px; }

.ic-dropzone-formats {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 12px;
  span {
    display: inline-block;
    padding: 3px 10px;
    font-size: 11px;
    font-weight: 600;
    color: var(--el-text-color-secondary);
    background: var(--el-fill-color);
    border-radius: 6px;
    letter-spacing: .03em;
  }
}

.ic-dropzone-limit { font-size: 12px; color: var(--el-text-color-placeholder); }

.ic-paste-hint {
  margin-top: 22px;
  font-size: 13px;
  color: var(--el-text-color-secondary);
  kbd {
    display: inline-block;
    padding: 2px 8px;
    font-size: 12px;
    font-family: inherit;
    background: var(--el-fill-color-light);
    border: 1px solid var(--el-border-color);
    border-radius: 4px;
  }
}

.ic-compare-section { margin-bottom: 28px; }

.ic-compare-label-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.ic-compare-tag {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  span { color: #fff; }
  em { font-style: normal; font-weight: 400; font-size: 12px; opacity: .85; }
}
.ic-tag-left  { background: var(--theme-btn-hover-color); color: #fff; }
.ic-tag-right { background: #529b2e; color: #fff; }

.ic-compare-viewer {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  max-height: 480px;
  border-radius: 16px;
  overflow: hidden;
  cursor: col-resize;
  user-select: none;
  background-image:
    linear-gradient(45deg, var(--el-fill-color) 25%, transparent 25%),
    linear-gradient(-45deg, var(--el-fill-color) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, var(--el-fill-color) 75%),
    linear-gradient(-45deg, transparent 75%, var(--el-fill-color) 75%);
  background-size: 16px 16px;
  background-position: 0 0, 0 8px, 8px -8px, -8px 0;
  border: 1px solid var(--el-border-color-light);
}

.ic-compare-original,
.ic-compare-result {
  position: absolute;
  inset: 0;
  img { width: 100%; height: 100%; object-fit: contain; }
}
.ic-compare-result { z-index: 1; }

.ic-compare-handle {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 44px;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &.is-dragging .ic-compare-grip {
    box-shadow: 0 4px 24px rgba(0,0,0,.3);
    transform: scale(1.1);
  }
}

.ic-compare-grip {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 14px rgba(0,0,0,.18);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #444;
  transition: box-shadow .2s, transform .15s;
  &:hover { box-shadow: 0 4px 22px rgba(0,0,0,.25); }
}

.ic-compare-line {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 3px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,.12);
}

.ic-cards-row {
  display: flex;
  gap: 20px;
  margin-bottom: 28px;
}

.ic-card {
  flex: 1;
  min-width: 0;
  padding: 24px;
  border-radius: 16px;
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color);
  box-shadow: 0 2px 8px rgba(0,0,0,.06);
  transition: box-shadow .25s, border-color .25s;

  &:hover { box-shadow: 0 4px 16px rgba(0,0,0,.1); }
}

.ic-card-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--el-border-color-light);
}

.ic-card-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.ic-ind-blue   { background: var(--theme-btn-hover-color); box-shadow: 0 0 0 5px rgba(34,211,238,.14); }
.ic-ind-green  { background: #67c23a; box-shadow: 0 0 0 5px rgba(103,194,58,.14); }
.ic-ind-orange {
  background: var(--btn-tag-bg-color);
  box-shadow: 0 0 0 5px rgba(34,211,238,.14);
  animation: ic-pulse 1.2s ease-in-out infinite;
}
@keyframes ic-pulse {
  0%,100% { box-shadow: 0 0 0 5px rgba(34,211,238,.14); }
  50%     { box-shadow: 0 0 0 12px rgba(34,211,238,.04); }
}

.ic-card-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.ic-card-preview {
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: 10px;
  overflow: hidden;
  background-image:
    linear-gradient(45deg, var(--el-fill-color) 25%, transparent 25%),
    linear-gradient(-45deg, var(--el-fill-color) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, var(--el-fill-color) 75%),
    linear-gradient(-45deg, transparent 75%, var(--el-fill-color) 75%);
  background-size: 14px 14px;
  background-position: 0 0, 0 7px, 7px -7px, -7px 0;
  margin-bottom: 16px;
  img { width: 100%; height: 100%; object-fit: contain; }
}

.ic-meta-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin: 0;
}

.ic-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  border-radius: 8px;
  transition: background .15s;
  &:hover { background: var(--el-fill-color-lighter); }
  dt {
    font-size: 13px;
    font-weight: 500;
    color: var(--el-text-color-secondary);
    margin: 0;
  }
  dd {
    font-size: 14px;
    font-weight: 500;
    color: var(--el-text-color-primary);
    margin: 0;
  }
}

.ic-mono { font-variant-numeric: tabular-nums; }

.ic-tag {
  display: inline-block;
  padding: 2px 10px;
  font-size: 12px;
  font-weight: 600;
  color: var(--theme-btn-hover-color);
  background: rgba(34,211,238,.12);
  border-radius: 999px;
}
.ic-tag-green { color: #529b2e; background: rgba(103,194,58,.12); }

.ic-savings-box {
  margin-top: 20px;
  padding-top: 18px;
  border-top: 1px solid var(--el-border-color-light);
  display: flex;
  gap: 20px;
  align-items: center;
}

.ic-savings-ring {
  position: relative;
  width: 84px;
  height: 84px;
  flex-shrink: 0;
  svg { transform: rotate(-90deg); }
}
.ic-savings-bg  { fill: none; stroke: var(--el-fill-color-light); stroke-width: 6; }
.ic-savings-fill {
  fill: none;
  stroke: #67c23a;
  stroke-width: 6;
  stroke-linecap: round;
  transition: stroke-dashoffset .7s cubic-bezier(.22,.61,.36,1);
}
.ic-savings-inner {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ic-savings-num {
  font-size: 20px;
  font-weight: 700;
  color: #529b2e;
}

.ic-savings-detail { flex: 1; min-width: 0; }
.ic-savings-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  span { font-size: 13px; color: var(--el-text-color-secondary); }
  strong { font-size: 16px; font-weight: 700; color: #529b2e; font-variant-numeric: tabular-nums; }
}
.ic-savings-track {
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: var(--el-fill-color-light);
  overflow: hidden;
}
.ic-savings-track-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #67c23a, #85d84a);
  transition: width .7s cubic-bezier(.22,.61,.36,1);
}

.ic-progress-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  gap: 16px;
}
.ic-progress-ring {
  position: relative;
  width: 108px;
  height: 108px;
  svg { transform: rotate(-90deg); }
}
.ic-progress-bg  { fill: none; stroke: var(--el-fill-color-light); stroke-width: 6; }
.ic-progress-fill {
  fill: none;
  stroke: var(--btn-tag-bg-color);
  stroke-width: 6;
  stroke-linecap: round;
  transition: stroke-dashoffset .3s;
}
.ic-progress-inner {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ic-progress-num {
  font-size: 22px;
  font-weight: 700;
  color: var(--btn-tag-bg-color);
  font-variant-numeric: tabular-nums;
}
.ic-progress-desc {
  font-size: 13px;
  color: var(--el-text-color-secondary);
  margin: 0;
}

.ic-settings {
  padding: 24px;
  border-radius: 16px;
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color);
  box-shadow: 0 2px 8px rgba(0,0,0,.06);
  margin-bottom: 40px;
  transition: box-shadow .25s;
  &:hover { box-shadow: 0 4px 16px rgba(0,0,0,.1); }
}

.ic-settings-grid {
  display: flex;
  gap: 36px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.ic-setting-block {
  flex: 1;
  min-width: 260px;
}

.ic-setting-label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: var(--el-text-color-secondary);
  text-transform: uppercase;
  letter-spacing: .06em;
  margin-bottom: 14px;
}

.ic-preset-group {
  display: flex;
  gap: 0;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--el-border-color);
}

.ic-preset-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 11px 8px;
  border: none;
  border-radius: 0;
  background: var(--el-bg-color);
  cursor: pointer;
  transition: background .2s, color .2s;
  outline: none;
  &:not(:last-child) { border-right: 1px solid var(--el-border-color); }
  &:hover { background: var(--el-fill-color-light); }
  &.active {
    background: var(--btn-tag-bg-color);
    .ic-preset-name { color: #fff; }
    .ic-preset-meta { color: rgba(255,255,255,.72); }
  }
}

.ic-preset-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.ic-preset-meta {
  font-size: 10px;
  color: var(--el-text-color-secondary);
  font-weight: 500;
}

.ic-custom-slider { margin-top: 16px; }

.ic-slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 500;
  color: var(--el-text-color-regular);
}

.ic-slider-val {
  display: inline-block;
  padding: 2px 10px;
  font-weight: 700;
  color: var(--btn-tag-bg-color);
  background: rgba(34,211,238,.12);
  border-radius: 6px;
  font-size: 13px;
}

.ic-options-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.ic-opt {
  display: flex;
  flex-direction: column;
  gap: 6px;
  cursor: default;
}

.ic-opt-key {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  font-weight: 600;
}

.ic-select { width: 160px; }
.ic-input-num { width: 150px; }

.ic-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 20px;
  border-top: 1px solid var(--el-border-color-light);
}

.ic-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 26px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all .2s;
  outline: none;
  white-space: nowrap;
  .icon { width: 1.15em; height: 1.15em; }
  &:disabled { opacity: .5; cursor: not-allowed; }
}

.ic-btn-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ic-spin .7s linear infinite;
}
@keyframes ic-spin { to { transform: rotate(360deg); } }

.ic-btn-primary {
  background: var(--btn-tag-bg-color);
  color: #fff;
  &:hover:not(:disabled) { background: #e67a1a; transform: translateY(-1px); box-shadow: 0 6px 18px rgba(34,211,238,.35); }
  &:active:not(:disabled) { transform: translateY(0); }
}

.ic-btn-outline {
  background: transparent;
  color: var(--el-text-color-primary);
  border: 1.5px solid var(--el-border-color);
  &:hover { background: var(--el-fill-color-light); border-color: var(--el-text-color-placeholder); }
}

.ic-btn-success {
  background: #67c23a;
  color: #fff;
  &:hover { background: #5daf34; transform: translateY(-1px); box-shadow: 0 6px 18px rgba(103,194,58,.35); }
  &:active { transform: translateY(0); }
}

.ic-btn-ghost {
  background: transparent;
  color: var(--el-text-color-regular);
  border: 1.5px solid var(--el-border-color);
  &:hover { background: var(--el-fill-color-light); border-color: var(--theme-btn-hover-color); color: var(--theme-btn-hover-color); }
}

.ic-footer {
  margin-top: 40px;
  padding-top: 28px;
  border-top: 1px solid var(--el-border-color-light);
}

.ic-footer-head {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  margin-bottom: 20px;
  .icon { width: 1.2em; height: 1.2em; color: var(--theme-btn-hover-color); }
}

.ic-footer-grid {
  display: flex;
  gap: 16px;
}

.ic-footer-card {
  flex: 1;
  padding: 22px;
  border-radius: 14px;
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color-light);
  transition: border-color .25s, box-shadow .25s, transform .2s;
  &:hover {
    border-color: var(--el-border-color);
    box-shadow: 0 4px 16px rgba(0,0,0,.08);
    transform: translateY(-2px);
  }
  .ic-footer-card-icon { margin-bottom: 12px; }
  strong { display: block; font-size: 14px; font-weight: 600; color: var(--el-text-color-primary); margin-bottom: 6px; }
  p { font-size: 13px; color: var(--el-text-color-secondary); margin: 0; line-height: 1.65; }
}

@media (max-width: 860px) {
  .ic-root.theme-bg-color { padding: 20px 16px; }
  .ic-header { margin-bottom: 28px; }
  .ic-header-text h1 { font-size: 22px; }
  .ic-header-icon { width: 56px; height: 56px; .icon { width: 28px; height: 28px; } }
  .ic-dropzone { padding: 36px 20px; }
  .ic-dropzone-title { font-size: 16px; }
  .ic-cards-row { flex-direction: column; }
  .ic-compare-viewer { aspect-ratio: 4/3; max-height: 320px; }
  .ic-compare-grip { width: 36px; height: 36px; }
  .ic-settings-grid { flex-direction: column; gap: 22px; }
  .ic-setting-block { min-width: 0; }
  .ic-preset-btn { padding: 9px 6px; }
  .ic-preset-name { font-size: 12px; }
  .ic-options-row { flex-direction: column; }
  .ic-select, .ic-input-num { width: 100%; }
  .ic-actions { flex-direction: column; }
  .ic-btn { justify-content: center; width: 100%; }
  .ic-footer-grid { flex-direction: column; }
}
</style>
