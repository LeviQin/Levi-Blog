<template>
  <v-md-preview
    :text="props.markdownText"
    left-toolbar="undo redo | tip"
    @copy-code-success="handleCopyCodeSuccess"
    ref="preview"
    default-show-toc
  />
</template>

<script setup>
import { ref, defineProps, defineExpose, nextTick, defineEmits, watch } from "vue";
import { ElEMessage } from "@/utils/resetMessage";

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
const titles = ref([]);

const handleCopyCodeSuccess = () => {
  ElEMessage({
    type: "success",
    message: "已复制代码",
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

<style lang="scss" scoped>
:deep(.vuepress-markdown-body) {
  background: transparent !important;
}
:deep(.vuepress-markdown-body h2) {
  border-bottom: none;
}
:deep(.vuepress-markdown-body:not(.custom)) {
  padding: 0;
}
</style>
