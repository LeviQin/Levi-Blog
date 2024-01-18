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
      <div>DES 介绍</div>
      <div>
        <p class="introduction-text">
          在线DES加密，DES解密，可以输入密钥后进行加密和解密，支持可逆加密解密。
        </p>
        <p class="introduction-text">
          <span class="red-text">[DES加/解密]</span>
          明文和密文都放在加/解密内容的输入框，点击加密或者解密按钮后输出结果到加/解密结果区域。加密时密钥选填，解密时必须填写和加密时一致的密钥，否则解密失败。
        </p>
        <p class="introduction-text">
          DES全称为Data Encryption
          Standard，即数据加密标准，是一种使用密钥加密的块算法，1977年被美国联邦政府的国家标准局确定为联邦资料处理标准（FIPS），并授权在非密级政府通信中使用，随后该算法在国际上广泛流传开来。需要注意的是，在某些文献中，作为算法的DES称为数据加密算法（Data
          Encryption Algorithm,DEA），已与作为标准的DES区分开来。
        </p>
        <el-form label-width="auto" label-position="left">
          <el-form-item label="DES全称">
            <span>Data Encryption Standard</span>
          </el-form-item>
          <el-form-item label="体系">
            <span>对称加密算法</span>
          </el-form-item>
          <el-form-item label="中文名">
            <span>数据加密标准</span>
          </el-form-item>
          <el-form-item label="规则">
            <span>混淆（confusion）和扩散(diffusion)</span>
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
  const bytes = CryptoJS.DES.encrypt(textarea.value, secretKey.value);
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
    const bytes = CryptoJS.DES.decrypt(textarea.value, secretKey.value);
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
  navigator.clipboard
    .writeText(result.value)
    .then(() => {
      ElEMessage({
        type: "success",
        message: "已复制到剪切板",
      });
      close();
    })
    .catch(() => {
      ElEMessage({
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
