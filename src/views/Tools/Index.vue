<template>
  <div class="tools-card">
    <div class="tools-item-container w">
      <div class="tools-item lv-card" @click="toIp">1</div>
      <div class="tools-item lv-card" @click="toEncryptionDecryption">2</div>
      <div class="tools-item lv-card">3</div>
      <div class="tools-item lv-card">4</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const toIp = () => {
  router.push("/ip");
};
const toEncryptionDecryption = () => {
  router.push("/password");
};
</script>

<style lang="scss" scoped>
.tools-card {
  display: flex;
  justify-content: center;
  align-items: center;
}

.tools-item-container {
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
}

.tools-item {
  width: 180px;
  height: 180px;
  margin: 0 10px 20px 10px;
}
</style>
