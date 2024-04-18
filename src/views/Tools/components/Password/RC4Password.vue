<template>
  <div class="tabs-item">
    <el-form label-position="top">
      <el-form-item>
        <el-button type="primary" @click="encrypt">加密</el-button>
        <el-button type="primary" @click="decrypt">解密</el-button>
        <el-button type="primary" @click="clear">清除</el-button>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="secretKey"
          placeholder="在此输入密钥"
          style="width: 150px; margin-right: 10px"
        ></el-input>
        <span class="key-tips">密钥为可选项，可以不输入</span>
      </el-form-item>
      <el-form-item label="需要加/解密的内容:">
        <el-input
          v-model="textarea"
          :rows="8"
          type="textarea"
          placeholder="在此输入需要加/解密的内容"
        />
      </el-form-item>
      <el-form-item label="结果:">
        <el-input
          readonly
          v-model="result"
          :rows="8"
          type="textarea"
          placeholder="加/解密的结果"
        />
        <div class="copy-btn-card">
          <el-button type="success" @click="copyResult" class="clipboardBtn"
            >一键复制结果</el-button
          >
        </div>
      </el-form-item>
    </el-form>
    <div>
      <div>RC4 介绍</div>
      <div>
        <p class="introduction-text">
          在线RC4加密，RC4解密，可以输入密钥后进行加密和解密，支持可逆加密解密。
        </p>
        <p class="introduction-text">
          <span class="red-text">[RC4加/解密]</span>
          明文和密文都放在加/解密内容的输入框，点击加密或者解密按钮后输出结果到加/解密结果区域。加密时密钥选填，解密时必须填写和加密时一致的密钥，否则解密失败。
        </p>
        <p class="introduction-text">
          RC4加密算法是大名鼎鼎的RSA三人组中的头号人物Ronald
          Rivest在1987年设计的密钥长度可变的流加密算法簇。之所以称其为簇，是由于其核心部分的S-box长度可为任意，但一般为256字节。该算法的速度可以达到DES加密的10倍左右，且具有很高级别的非线性。RC4起初是用于保护商业机密的。但是在1994年9月，它的算法被发布在互联网上，也就不再有什么商业机密了。RC4也被叫做ARC4（Alleged
          RC4——所谓的RC4），因为RSA从来就没有正式发布过这个算法。
        </p>
        <el-form label-width="auto" label-position="left">
          <el-form-item label="名称">
            <span>RC4d</span>
          </el-form-item>
          <el-form-item label="原理">
            <span>初始化和伪随机子密码生成算法</span>
          </el-form-item>
          <el-form-item label="设计者">
            <span>Ronald Rivest</span>
          </el-form-item>
          <el-form-item label="漏洞">
            <span>密钥序列出现重复密文可能被破解</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CryptoJS from "crypto-js";

let secretKey = ref("");
let textarea = ref("");
let result = ref("");

const encrypt = () => {
  if (textarea.value === "") {
    ElNotification({
      title: "警告",
      zIndex: 99999,
      type: "warning",
      message: "请输入需要加/解密的内容",
    });
    return;
  }
  const bytes = CryptoJS.RC4.encrypt(textarea.value, secretKey.value);
  if (bytes.ciphertext.sigBytes && bytes.ciphertext.words) {
    result.value = bytes.toString();
  } else {
    ElNotification({
      title: "失败",
      zIndex: 99999,
      type: "error",
      message: "加密失败，请检查你输入的内容！",
    });
  }
};
const decrypt = () => {
  try {
    if (textarea.value === "") {
      ElNotification({
        title: "警告",
        zIndex: 99999,
        type: "warning",
        message: "请输入需要加/解密的内容",
      });
      return;
    }
    const bytes = CryptoJS.RC4.decrypt(textarea.value, secretKey.value);
    result.value = bytes.toString(CryptoJS.enc.Utf8);
    if (!result.value) {
      ElNotification({
        title: "失败",
        zIndex: 99999,
        type: "error",
        message: "解密失败，请检查你的密钥是否正确！",
      });
    }
  } catch (e) {
    console.log(e, "----------------------");
    ElNotification({
      title: "失败",
      zIndex: 99999,
      type: "error",
      message: "解密失败，请检查你输入的内容！",
    });
  }
};
const clear = () => {
  secretKey.value = "";
  textarea.value = "";
  result.value = "";
};
const copyResult = () => {
  if (result.value === "") {
    ElNotification({
      title: "警告",
      zIndex: 99999,
      type: "warning",
      message: "复制失败！结果为空",
    });
    return;
  }
  navigator.clipboard
    .writeText(result.value)
    .then(() => {
      ElNotification({
        title: "成功",
        zIndex: 99999,
        type: "success",
        message: "已复制到剪切板",
      });
      close();
    })
    .catch(() => {
      ElNotification({
        title: "失败",
        zIndex: 99999,
        type: "error",
        message: "复制出错，请重试",
      });
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
</style>
