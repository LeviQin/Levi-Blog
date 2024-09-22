<template>
  <MdPreview
    :modelValue="props.markdownText"
    @onGetCatalog="onGetCatalog"
    :codeFoldable="true"
    :autoFoldThreshold="30"
    noImgZoomIn
  />
  <image-preview ref="imagePreviewRef"></image-preview>
</template>

<script setup>
import { ref, defineProps, defineExpose, defineEmits, nextTick } from "vue";
import ImagePreview from "../ImagePreview/Index.vue";
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";

const props = defineProps({
  markdownText: {
    type: String,
    default: "",
  },
});

const dataMap = reactive({
  images: [],
});

const imagePreviewRef = ref(null);

const onHtmlChanged = () => {
  const imageDoms = document.querySelectorAll(".md-editor img");
  dataMap.images = Array.from(imageDoms).map((img) => img.src);
  imageDoms.forEach((img) => {
    img.removeEventListener("click", img.clickHandler);
    img.clickHandler = () => {
      const currentIndex = Array.from(imageDoms).indexOf(img);
      imagePreviewRef.value.show(dataMap.images, currentIndex);
    };
    img.addEventListener("click", img.clickHandler);
  });
};

const onGetCatalog = (tites) => {
  onHtmlChanged();
  emit("sendMdTitle", tites);
};

const handleAnchorClick = (id) => {
  if (id) {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      window.scrollBy(0, -60);
    }
  }
};

const emit = defineEmits(["sendMdTitle"]);

defineExpose({
  handleAnchorClick,
});
</script>

<style lang="scss" scoped></style>
