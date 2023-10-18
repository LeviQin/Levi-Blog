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
          id="copy-span-aes"
        />
        <div class="copy-btn-card">
          <el-button
            type="success"
            @click="copyResult"
            class="clipboardBtn"
            data-clipboard-target="#copy-span-aes"
            >一键复制结果</el-button
          >
        </div>
      </el-form-item>
    </el-form>
    <div>
      <div>AES介绍</div>
      <div>
        <p class="introduction-text">
          在线AES加密，AES解密，可以输入密钥后进行加密和解密，支持可逆加密解密。
        </p>
        <p class="introduction-text">
          <span class="red-text">[AES加/解密]</span>
          明文和密文都放在加/解密内容的输入框，点击加密或者解密按钮后输出结果到加/解密结果区域。加密时密钥选填，解密时必须填写和加密时一致的密钥，否则解密失败。
        </p>
        <p class="introduction-text">
          高级加密标准（英语：Advanced Encryption
          Standard，缩写：AES），在密码学中又称Rijndael加密法，是美国联邦政府采用的一种区块加密标准。这个标准用来替代原先的DES，已经被多方分析且广为全世界所使用。经过五年的甄选流程，高级加密标准由美国国家标准与技术研究院（NIST）于2001年11月26日发布于FIPS
          PUB
          197，并在2002年5月26日成为有效的标准。2006年，高级加密标准已然成为对称密钥加密中最流行的算法之一。
        </p>
        <el-form label-width="auto" label-position="left">
          <el-form-item label="AES全称">
            <span>Advanced Encryption Standard</span>
          </el-form-item>
          <el-form-item label="适用领域范围">
            <span>计算机，网络安全</span>
          </el-form-item>
          <el-form-item label="派生自">
            <span>Square</span>
          </el-form-item>
          <el-form-item label="应用学科">
            <span>密码学</span>
          </el-form-item>
          <el-form-item label="集成算法">
            <span>Anubis, Grand Cru</span>
          </el-form-item>
          <el-form-item label="提出时间">
            <span>1998年</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CryptoJS from "crypto-js";
import { ElEMessage } from "@/utils/resetMessage.js";
import Clipboard from "clipboard";

let secretKey = ref("");
let textarea = ref("");
let result = ref("");

const encrypt = () => {
  if (textarea.value === "") {
    ElEMessage({
      type: "warning",
      message: "请输入需要加/解密的内容",
    });
    return;
  }
  const bytes = CryptoJS.AES.encrypt(textarea.value, secretKey.value);
  if (bytes.ciphertext.sigBytes && bytes.ciphertext.words) {
    result.value = bytes.toString();
  } else {
    ElEMessage({
      type: "error",
      message: "加密失败，请检查你输入的内容！",
    });
  }
};
const decrypt = () => {
  try {
    if (textarea.value === "") {
      ElEMessage({
        type: "warning",
        message: "请输入需要加/解密的内容",
      });
      return;
    }
    const bytes = CryptoJS.AES.decrypt(textarea.value, secretKey.value);
    result.value = bytes.toString(CryptoJS.enc.Utf8);
    if (!result.value) {
      ElEMessage({
        type: "error",
        message: "解密失败，请检查你的密钥是否正确！",
      });
    }
  } catch (e) {
    console.log(e, "----------------------");
    ElEMessage({
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
</style>
