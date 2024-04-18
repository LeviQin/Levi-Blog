<template>
  <div class="tabs-item">
    <el-form label-position="top">
      <el-form-item>
        <el-button type="primary" @click="encrypt">加密</el-button>
        <el-button type="primary" @click="decrypt">解密</el-button>
        <el-button type="primary" @click="clear">清除</el-button>
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
      <div>Base64 编码介绍</div>
      <div>
        <p class="introduction-text">
          Base64是网络上最常见的用于传输8Bit字节代码的编码方式之一，大家可以查看RFC2045～RFC2049，上面有MIME的详细规范。Base64编码可用于在HTTP环境下传递较长的标识信息。
        </p>
        <p class="introduction-text">
          例如，在Java
          Persistence系统Hibernate中，就采用了Base64来将一个较长的唯一标识符（一般为128-bit的UUID）编码为一个字符串，用作HTTP表单和HTTP
          GET
          URL中的参数。在其他应用程序中，也常常需要把二进制数据编码为适合放在URL（包括隐藏表单域）中的形式。此时，采用Base64编码具有不可读性，即所编码的数据不会被人用肉眼所直接看到。
        </p>
        <p class="introduction-text">
          Base64是网络上最常见的用于传输8Bit字节代码的编码方式之一，大家可以查看RFC2045～RFC2049，上面有MIME的详细规范。Base64编码可用于在HTTP环境下传递较长的标识信息。例如，在Java
        </p>
        <p class="introduction-text">
          Persistence系统Hibernate中，就采用了Base64来将一个较长的唯一标识符（一般为128-bit的UUID）编码为一个字符串，用作HTTP表单和HTTP
          GET
          URL中的参数。在其他应用程序中，也常常需要把二进制数据编码为适合放在URL（包括隐藏表单域）中的形式。此时，采用Base64编码具有不可读性，即所编码的数据不会被人用肉眼所直接看到。
        </p>
        <p class="introduction-text">
          Base64编码要求把3个8位字节（3*8=24）转化为4个6位的字节（4*6=24），之后在6位的前面补两个0，形成8位一个字节的形式。
          如果剩下的字符不足3个字节，则用0填充，输出字符使用'='，因此编码后输出的文本末尾可能会出现1或2个'='。
        </p>
        <el-form label-width="auto" label-position="left">
          <el-form-item label="外文名">
            <span>base64</span>
          </el-form-item>
          <el-form-item label="属性">
            <span>编码方式</span>
          </el-form-item>
          <el-form-item label="应用">
            <span>用于传输8Bit字节代码</span>
          </el-form-item>
          <el-form-item label="定义">
            <span>8Bit字节代码的编码方式之一</span>
          </el-form-item>
          <el-form-item label="可用于">
            <span>在HTTP环境下传递较长的标识信息</span>
          </el-form-item>
          <el-form-item label="特性">
            <span>Base64编码具有不可读性</span>
          </el-form-item>
        </el-form>
      </div>
      <div>Base64使用注意事项</div>
      <div>
        <p>一、Base64和URL传参问题</p>
        <p class="introduction-text">
          标准的Base64并不适合直接放在URL里传输，因为URL编码器会把标准Base64中的“/”和“+”字符变为形如“%XX”的形式，而这些“%”号在存入数据库时还需要再进行转换，因为ANSI
          SQL中已将“%”号用作通配符。
        </p>
        <p class="introduction-text">
          为解决此问题，可采用一种用于URL的改进Base64编码，它在末尾填充'='号，并将标准Base64中的“+”和“/”分别改成了“-”和“_”，这样就免去了在URL编解码和数据库存储时所要作的转换，避免了编码信息长度在此过程中的增加，并统一了数据库、表单等处对象标识符的格式。
        </p>
        <p>二、Base64和URL传参问题改善</p>
        <p class="introduction-text">
          另有一种用于正则表达式的改进Base64变种，它将“+”和“/”改成了“!”和“-”，因为“+”,“*”以及前面在IRCu中用到的“[”和“]”在正则表达式中都可能具有特殊含义。
        </p>
        <p class="introduction-text">
          此外还有一些变种，它们将“+/”改为“_-”或“._”（用作编程语言中的标识符名称）或“.-”（用于XML中的Nmtoken）甚至“_:”（用于XML中的Name）。
        </p>
        <p>三、Base64转换后比原有的字符串长1/3</p>
        <p class="introduction-text">
          Base64要求把每三个8Bit的字节转换为四个6Bit的字节（3*8 = 4*6 =
          24），然后把6Bit再添两位高位0，组成四个8Bit的字节，也就是说，转换后的字符串理论上将要比原来的长1/3。
        </p>
        <p>Base64转换总结</p>
        <p class="introduction-text">
          Base64转换，最好是不要用在加密上，尤其是参数加密，很容易出问题。
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

let textarea = ref("");
let result = ref("");

const encrypt = () => {
  if (textarea.value === "") {
    ElNotification({
      title: "警告",
      message: "请输入需要加/解密的内容",
      type: "warning",
      zIndex: 99999,
    });
    return;
  }
  try {
    const textEncoder = new TextEncoder();
    const data = textEncoder.encode(textarea.value);
    result.value = arrayBufferToBase64(data);
  } catch (e) {
    console.log(e, "----------------------");
    ElNotification({
      title: "失败",
      message: "加密失败，请检查你输入的内容！",
      type: "error",
      zIndex: 99999,
    });
  }
};
const decrypt = () => {
  try {
    if (textarea.value === "") {
      ElNotification({
        title: "警告",
        message: "请输入需要加/解密的内容",
        type: "warning",
        zIndex: 99999,
      });
      return;
    }
    const decodedData = base64ToArrayBuffer(textarea.value);
    const textDecoder = new TextDecoder();
    result.value = textDecoder.decode(decodedData);
  } catch (e) {
    console.log(e, "----------------------");
    ElNotification({
      title: "失败",
      message: "解密失败，请检查你输入的内容！",
      type: "error",
      zIndex: 99999,
    });
  }
};
const arrayBufferToBase64 = (buffer) => {
  const binary = [].map.call(new Uint8Array(buffer), (byte) => {
    return String.fromCharCode(byte);
  });
  return btoa(binary.join(""));
};
const base64ToArrayBuffer = (base64) => {
  const binaryString = window.atob(base64);
  const length = binaryString.length;
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};
const clear = () => {
  textarea.value = "";
  result.value = "";
};
const copyResult = () => {
  if (result.value === "") {
    ElNotification({
      title: "警告",
      message: "复制失败！结果为空",
      type: "warning",
      zIndex: 99999,
    });
    return;
  }
  navigator.clipboard
    .writeText(result.value)
    .then(() => {
      ElNotification({
        title: "成功",
        message: "结果已复制到剪切板",
        type: "success",
        zIndex: 99999,
      });
      close();
    })
    .catch(() => {
      ElNotification({
        title: "失败",
        message: "复制出错，请重试",
        type: "error",
        zIndex: 99999,
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
