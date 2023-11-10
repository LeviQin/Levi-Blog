<template>
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    :width="dialogWidth"
    lock-scroll
    append-to-body
  >
    <span>This is a message</span>
  </el-dialog>
</template>

<script setup>
import { ref, defineExpose } from "vue";

let dialogVisible = ref(false);
let dialogWidth = ref("500px");

onMounted(() => {
  setDialogWidth();
  window.addEventListener("resize", setDialogWidth, true);
});

onUnmounted(() => {
  window.removeEventListener("resize", setDialogWidth, true);
});

const setDialogWidth = () => {
  if (window.innerWidth <= 480) {
    dialogWidth.value = "90%";
  } else {
    dialogWidth.value = "500px";
  }
};

const show = () => {
  dialogVisible.value = true;
};

defineExpose({
  show,
});
</script>

<style lang="scss" scoped></style>
