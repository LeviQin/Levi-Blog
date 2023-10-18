<template>
  <div class="tools-card">
    <div class="tools-item-container w">
      <div class="tools-item" @click="toIp">生活工具</div>
      <div class="tools-item" @click="toEncryptionDecryption">加密/解密</div>
      <div class="tools-item">JSON工具</div>
      <div class="tools-item">压缩/格式化</div>
      <div class="tools-item">文档</div>
      <div class="tools-item" @click="toFront">前端工具</div>
      <div class="tools-item">转换</div>
      <div class="tools-item">单位换算</div>
      <div class="tools-item">二维码工具</div>
      <div class="tools-item">正则表达式</div>
      <div class="tools-item" @click="toWeb">站长工具</div>
      <div class="tools-item">HTTP相关</div>
      <div class="tools-item">房贷工具</div>
      <div class="tools-item">其他</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const toIp = () => {
  router.push("/life");
};
const toEncryptionDecryption = () => {
  router.push("/password");
};
const toWeb = () => {
  router.push("/webmaster");
};
const toFront = () => {
  router.push("/front-end");
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
  padding: 5px;
}

.tools-item {
  cursor: pointer;
  width: 175px;
  height: 175px;
  margin: 0 10px 20px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
  top: 0;
  transition: all 0.4s;
  border: 2px solid #fff;
  box-shadow: 8px 8px 20px 0 rgb(55 99 170 / 10%);
  background-image: linear-gradient(0deg, #fff, #eceff3);
  border-radius: 20px;
  &:hover {
    transform: translateY(-10px);
    transition: all 0.4s;
  }
}

@media (max-width: 800px) {
  .tools-item {
    width: 80px;
    height: 80px;
    margin: 0 5px 10px 5px;
    font-size: 14px;
  }
}
</style>
