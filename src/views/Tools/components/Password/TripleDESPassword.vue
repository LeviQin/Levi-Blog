<template>
  <div class="tabs-item theme-bg-color">
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
      <div class="input-block">
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
            <el-button
              style="width: 100%"
              type="success"
              @click="copyResult"
              class="clipboardBtn"
              >一键复制结果</el-button
            >
          </div>
        </el-form-item>
      </div>
    </el-form>
    <div>
      <div>3DES（Triple DES） 介绍</div>
      <div>
        <p class="introduction-text">
          在线Triple DES加密，Triple
          DES解密，可以输入密钥后进行加密和解密，支持可逆加密解密。
        </p>
        <p class="introduction-text">
          <span class="red-text">[Triple DES加/解密]</span>
          明文和密文都放在加/解密内容的输入框，点击加密或者解密按钮后输出结果到加/解密结果区域。加密时密钥选填，解密时必须填写和加密时一致的密钥，否则解密失败。
        </p>
        <p class="introduction-text">
          3DES（或称为Triple DES）是三重数据加密算法（TDEA，Triple Data Encryption
          Algorithm）块密码的通称。它相当于是对每个数据块应用三次DES加密算法。由于计算机运算能力的增强，原版DES密码的密钥长度变得容易被暴力破解；3DES即是设计用来提供一种相对简单的方法，即通过增加DES的密钥长度来避免类似的攻击，而不是设计一种全新的块密码算法。
        </p>
        <el-form label-width="auto" label-position="left">
          <el-form-item label="名称">
            <span>3DES</span>
          </el-form-item>
          <el-form-item label="原理">
            <span>3条56位的密钥对数据进行三次加密</span>
          </el-form-item>
          <el-form-item label="全称">
            <span>Triple DES</span>
          </el-form-item>
          <el-form-item label="关系">
            <span>DES向AES过渡的加密算法</span>
          </el-form-item>
        </el-form>
      </div>
      <div>3DES（Triple DES）算法介绍</div>
      <div>
        <p class="introduction-text">
          3DES又称Triple
          DES，是DES加密算法的一种模式，它使用3条56位的密钥对数据进行三次加密。数据加密标准（DES）是美国的一种由来已久的加密标准，它使用对称密钥加密法，并于1981年被ANSI组织规范为ANSI
          X.3.92。DES使用56位密钥和密码块的方法，而在密码块的方法中，文本被分成64位大小的文本块然后再进行加密。比起最初的DES，3DES更为安全。
        </p>
        <p class="introduction-text">
          3DES（即Triple
          DES）是DES向AES过渡的加密算法（1999年，NIST将3-DES指定为过渡的加密标准），加密算法，其具体实现如下：设Ek()和Dk()代表DES算法的加密和解密过程，K代表DES算法使用的密钥，M代表明文，C代表密文，这样：
        </p>
        <p class="introduction-text">* 3DES加密过程为：C=Ek3(Dk2(Ek1(M)))</p>
        <p class="introduction-text">* 3DES解密过程为：M=Dk1(EK2(Dk3(C)))</p>
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
  const bytes = CryptoJS.TripleDES.encrypt(textarea.value, secretKey.value);
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
    const bytes = CryptoJS.TripleDES.decrypt(textarea.value, secretKey.value);
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
