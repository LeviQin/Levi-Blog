<template>
  <div class="tabs-item">
    <el-form label-position="top">
      <el-form-item>
        <el-button type="primary" @click="encrypt">混淆</el-button>
        <el-button type="primary" @click="clear">清除</el-button>
      </el-form-item>
      <el-form-item label="需要混淆的内容:">
        <el-input
          v-model="textarea"
          :rows="8"
          type="textarea"
          placeholder="在此输入需要混淆的内容"
        />
      </el-form-item>
      <el-form-item label="结果:">
        <div class="result-card">
          <div class="result-item">
            <div class="item-label">
              <span>32位大写</span>
            </div>
            <el-input
              v-model="hashedText32UC"
              id="copy-span-32UC"
              placeholder="32位大写"
            ></el-input>
            <el-button
              type="success"
              @click="copyResult(hashedText32UC)"
              class="clipboardBtn"
              data-clipboard-target="#copy-span-32UC"
              >复制</el-button
            >
          </div>
          <div class="result-item">
            <div class="item-label">
              <span>32位小写</span>
            </div>
            <el-input
              v-model="hashedText32"
              id="copy-span-32"
              placeholder="32位小写"
            ></el-input>
            <el-button
              type="success"
              @click="copyResult(hashedText32)"
              class="clipboardBtn"
              data-clipboard-target="#copy-span-32"
              >复制</el-button
            >
          </div>
          <div class="result-item">
            <div class="item-label">
              <span>16位大写</span>
            </div>
            <el-input
              v-model="hashedText16UC"
              id="copy-span-16UC"
              placeholder="16位大写"
            ></el-input>
            <el-button
              type="success"
              @click="copyResult(hashedText16UC)"
              class="clipboardBtn"
              data-clipboard-target="#copy-span-16UC"
              >复制</el-button
            >
          </div>
          <div class="result-item">
            <div class="item-label">
              <span>16位小写</span>
            </div>
            <el-input
              v-model="hashedText16"
              id="copy-span-16"
              placeholder="16位小写"
            ></el-input>
            <el-button
              type="success"
              @click="copyResult(hashedText16)"
              class="clipboardBtn"
              data-clipboard-target="#copy-span-16"
              >复制</el-button
            >
          </div>
        </div>
      </el-form-item>
    </el-form>
    <div>
      <div>MD5解密说明</div>
      <div>
        <p class="introduction-text">
          MD5再次申明没有解密的方法，最好的反驳就是：数据源是无穷尽的，而
          MD5密文是有限的。
        </p>
        <p class="introduction-text">16位 MD5和32位 MD5区别是取的是8~24位。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CryptoJS from "crypto-js";
import { ElEMessage } from "@/utils/resetMessage.js";
import Clipboard from "clipboard";

let textarea = ref("");
let hashedText16 = ref("");
let hashedText16UC = ref("");
let hashedText32 = ref("");
let hashedText32UC = ref("");

const encrypt = () => {
  if (textarea.value === "") {
    ElEMessage({
      type: "warning",
      message: "请输入需要混淆的内容",
    });
    return;
  }
  try {
    hashedText32.value = CryptoJS.MD5(textarea.value).toString(); // 32-bit lowercase
    hashedText32UC.value = hashedText32.value.toUpperCase(); // 32-bit upperCase
    hashedText16.value = hashedText32.value.slice(8, 24); // 16-bit lowercase
    hashedText16UC.value = hashedText16.value.toUpperCase(); // 16-bit upperCase
  } catch (e) {
    console.log(e, "----------------------");
    ElEMessage({
      type: "error",
      message: "混淆失败，请检查你输入的内容！",
    });
  }
};
const clear = () => {
  textarea.value = "";
  hashedText16.value = "";
  hashedText16UC.value = "";
  hashedText32.value = "";
  hashedText32UC.value = "";
};
const copyResult = (val) => {
  if (val === "") {
    ElEMessage({
      type: "warning",
      message: "复制失败！结果为空",
    });
    return;
  }
  const clipboard = new Clipboard(`.clipboardBtn`);
  clipboard.on("success", () => {
    ElEMessage({
      type: "success",
      message: "一键复制成功",
    });
    clipboard.destroy();
  });
  clipboard.on("error", () => {
    ElEMessage({
      type: "warning",
      message: "浏览器不支持自动复制！",
    });
    clipboard.destroy();
  });
};
</script>

<style lang="scss" scoped>
.key-tips {
  font-size: 12px;
  color: #7171718a;
}

.copy-btn-card {
  margin-top: 10px;
}

.introduction-text {
  font-size: 14px;
}

:deep(.el-form-item__content) {
  display: block;
}

.result-item {
  display: flex;
  align-items: center;
  margin: 10px 0;

  .item-label {
    width: 80px;
  }

  .clipboardBtn {
    margin-left: 10px;
  }
}

@media (max-width: 800px) {
  .result-item .item-label {
    width: 7rem;
  }
}
</style>
