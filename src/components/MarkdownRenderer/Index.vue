<template>
  <v-md-preview
    :text="props.markdownText"
    left-toolbar="undo redo | tip"
    @copy-code-success="handleCopyCodeSuccess"
    ref="preview"
    default-show-toc
    @image-click="initImageViewer"
  />

  <image-preview ref="imagePreviewRef"></image-preview>
</template>

<script setup>
import { ref, defineProps, defineExpose, nextTick, defineEmits, watch } from "vue";
import { ElNotification } from "element-plus";
import imagePreview from "../ImagePreview/Index.vue";

const props = defineProps({
  markdownText: {
    type: String,
    default: "",
  },
});

watch(
  () => props.markdownText,
  () => {
    buildDirectory();
  }
);

const preview = ref(null);
const imagePreviewRef = ref(null);
const titles = ref([]);

const initImageViewer = (images, currentIndex) => {
  imagePreviewRef.value.show(images, currentIndex);
};

const handleCopyCodeSuccess = () => {
  ElNotification({
    title: "成功",
    message: "已复制代码",
    type: "success",
    zIndex: 99999,
  });
};

const buildDirectory = () => {
  nextTick(() => {
    const anchors = preview.value.$el.querySelectorAll("h1,h2,h3,h4,h5,h6");
    titles.value = Array.from(anchors).filter((title) => !!title.innerText.trim());
    const hTags = Array.from(new Set(titles.value.map((title) => title.tagName))).sort();

    titles.value = titles.value.map((el) => ({
      title: el.innerText,
      lineIndex: el.getAttribute("data-v-md-line"),
      indent: hTags.indexOf(el.tagName),
    }));
    emit("sendMdTitle", titles.value);
  });
};

const handleAnchorClick = (anchor) => {
  const { lineIndex } = anchor;

  const heading = preview.value.$el.querySelector(`[data-v-md-line="${lineIndex}"]`);

  if (heading) {
    // Note: If you are using the preview mode of the editing component, the method name here is changed to previewScrollToTarget
    preview.value.scrollToTarget({
      target: heading,
      scrollContainer: window,
      top: 60,
    });
  }
};

const emit = defineEmits(["sendMdTitle"]);

defineExpose({
  handleAnchorClick,
});
</script>

<style lang="scss" scoped></style>
