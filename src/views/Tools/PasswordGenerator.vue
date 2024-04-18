<template>
  <Head>
    <meta name="keywords" content="安全, 随机, 强大, 随机密码, 生成强密码, 密码生成器" />
    <meta
      name="description"
      content="✓安全 ✓随机 ✓强大 —— 使用我们的随机密码生成器生成强密码。"
    />
    <meta
      property="og:description"
      content="✓安全 ✓随机 ✓强大 —— 使用我们的随机密码生成器生成强密码。"
    />
    <meta
      name="twitter:description"
      content="✓安全 ✓随机 ✓强大 —— 使用我们的随机密码生成器生成强密码。"
    />
  </Head>
  <div class="password w theme-bg-color">
    <div class="content">
      <div class="tool-title">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-mima1"></use>
        </svg>
        <h1>密码生成器</h1>
      </div>
      <div class="tool-main">
        <el-input class="password-input" size="large" v-model="passwordVal">
          <template #suffix>
            <div class="input-icon-box">
              <svg
                class="icon refresh-icon"
                aria-hidden="true"
                @click="handleRefreshClick"
              >
                <use xlink:href="#icon-shuaxin"></use>
              </svg>
            </div>
            <div class="input-icon-box copy-icon-box" @click="copyText">复制</div>
          </template>
        </el-input>
        <div class="input-icon-box m-copy-icon-box" @click="copyText">复制</div>
        <div class="config-item-box">
          <span
            ><svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-peizhi"></use></svg
            ><span>配置项</span></span
          >
          <div>
            <el-checkbox
              @change="updatePassword"
              size="large"
              label="数字（0-9）"
              v-model="numbers"
            />
            <el-checkbox
              @change="updatePassword"
              size="large"
              label="小写字母（a-z）"
              v-model="lowercase"
            />
            <el-checkbox
              @change="updatePassword"
              size="large"
              label="大写字母（A-Z）"
              v-model="uppercase"
            />
            <el-checkbox
              @change="updatePassword"
              size="large"
              label="特殊字符（!@#$%^&*）"
              v-model="symbols"
            />
          </div>
          <div>
            <el-checkbox
              @change="updatePassword"
              label="排除混淆字符（1lI、0oO）"
              v-model="exclude"
            />
          </div>
        </div>
        <div class="password-length-box">
          <span
            ><svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-changdu"></use></svg
            ><span>密码长度</span></span
          >
          <el-slider
            @change="updatePassword"
            v-model="passLength"
            show-input
            class="slider"
            :min="1"
            :max="50"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { Head } from "@vueuse/head";

onMounted(() => {
  updatePassword();
});

let passwordVal = ref("");
let passLength = ref(12);
let numbers = ref(true);
let lowercase = ref(true);
let uppercase = ref(true);
let symbols = ref(true);
let exclude = ref(true);

const handleRefreshClick = () => {
  const iconBox = document.querySelector(".refresh-icon");
  iconBox.classList.add("rotate-animation");

  setTimeout(() => {
    iconBox.classList.remove("rotate-animation");
  }, 500);

  updatePassword();
};

const updatePassword = () => {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let allChars = "";
  passwordVal.value = "";

  // 大写字母
  if (uppercase.value) {
    allChars += uppercaseChars;
  } else {
    allChars = allChars.replace(new RegExp("[" + uppercaseChars + "]", "g"), "");
  }
  // 小写字母
  if (lowercase.value) {
    allChars += lowercaseChars;
  } else {
    allChars = allChars.replace(new RegExp("[" + lowercaseChars + "]", "g"), "");
  }
  // 数字
  if (numbers.value) {
    allChars += numberChars;
  } else {
    allChars = allChars.replace(new RegExp("[" + numberChars + "]", "g"), "");
  }
  // 特殊字符
  if (symbols.value) {
    allChars += specialChars;
  } else {
    allChars = allChars.replace(new RegExp("[" + specialChars + "]", "g"), "");
  }
  // 排除相似字符 oO0l1
  if (exclude.value) {
    allChars = allChars.replace(/[1lI0oO]/g, "");
  }

  for (let i = 0; i < passLength.value; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    passwordVal.value += allChars[randomIndex];
  }
};

const copyText = () => {
  navigator.clipboard
    .writeText(passwordVal.value)
    .then(() => {
      ElNotification({
        title: "成功",
        message: "您生成的密码已经复制成功！",
        type: "success",
        zIndex: 99999,
      });
    })
    .catch(() => {
      ElNotification({
        title: "失败",
        message: "复制密码时出错，请重试",
        type: "warning",
        zIndex: 99999,
      });
    });
};
</script>

<style lang="scss" scoped>
.password .content {
  padding: 20px;
}

.tool-main {
  padding-top: 20px;
}

.tool-title {
  display: flex;
  align-items: center;
}

.tool-title h1 {
  font-size: 24px;
}

.tool-title .icon {
  width: 2.2em;
  height: 2.2em;
  margin-right: 5px;
}

.input-icon-box {
  display: flex;
  align-items: center;
  padding: 10px 5px;
}

.copy-icon-box,
.m-copy-icon-box {
  cursor: pointer;
  background-color: var(--themeTextColor);
  margin: 5px 0;
  padding: 5px 25px;
  border-radius: 2px;
  color: #fff;
  line-height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  &:hover {
    opacity: 0.8;
  }
}

.m-copy-icon-box {
  margin-top: 10px;
  display: none;
}

.icon {
  width: 2em;
  height: 2em;
  cursor: pointer;
  margin-right: 10px;
}

.password-input {
  width: 60%;
}

.config-item-box,
.password-length-box {
  margin: 20px 0;
  padding: 0 5px;

  span {
    font-weight: 500;
    display: flex;
    align-items: center;

    .icon {
      width: 1.2em;
      height: 1.2em;
    }
  }
}

.config-item-box {
  margin-top: 20px;
}

.password-length-box span {
  margin-right: 20px;
}

.password-length-box .slider {
  width: 400px;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: none;
}

:deep(.el-slider__runway) {
  background-color: #666;
}

:deep(.el-slider__bar) {
  background-color: var(--themeTextColor);
}

:deep(.el-slider__button) {
  border-color: var(--themeTextColor);
}

:deep(.el-checkbox__label) {
  color: var(--balckTextColor) !important;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: var(--themeTextColor);
  border-color: var(--themeTextColor);
}

:deep(.password-input .el-input__inner) {
  font-size: 20px;
  font-weight: 600;
  color: var(--balckTextColor);
}

.rotate-animation {
  animation: rotate 0.3s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 860px) {
  .tool-main {
    padding: 0;
  }

  .password-input {
    width: 100%;

    .icon {
      margin-right: 0;
    }
  }

  .copy-icon-box {
    display: none;
  }

  .m-copy-icon-box {
    display: block;
  }

  .password-length-box .slider {
    width: 100%;
  }
}
</style>
