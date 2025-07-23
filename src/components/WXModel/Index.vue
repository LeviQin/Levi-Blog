<template>
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    :width="dialogWidth"
    :lock-scroll="false"
    :append-to-body="true"
    :z-index="10002"
  >
    <template #header>
      <span class="wx-model-title">我的微信</span>
    </template>
    <div class="wx-model-main">
      <div class="wx-box">
        <img :src="wxImage" alt="Levi的微信" />
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, defineExpose } from "vue";

onMounted(() => {
  setDialogWidth();
  window.addEventListener("resize", setDialogWidth, true);
});

onUnmounted(() => {
  window.removeEventListener("resize", setDialogWidth, true);
});

const dialogVisible = ref(false);
const dialogWidth = ref("500px");
const wxImage = ref("");

const setDialogWidth = () => {
  if (window.innerWidth <= 480) {
    dialogWidth.value = "90%";
  } else {
    dialogWidth.value = "500px";
  }
};

const show = (image) => {
  dialogVisible.value = true;
  wxImage.value = image;
};

defineExpose({
  show,
});
</script>

<style lang="scss" scoped>
.wx-model-title {
  color: var(--btn-tag-bg-color);
  font-size: 18px;
}

.wx-model-main {
  padding: 0 20px;
}

.wx-box img {
  width: 100%;
  height: 100%;
}
</style>
