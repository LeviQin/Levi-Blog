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
  <div class="password w theme-bg-color tools-container">
    <div class="content">
      <div class="tool-title">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#levi-mima1"></use>
        </svg>
        <h1>密码生成器</h1>
      </div>
      <div class="tool-main">
        <el-input class="password-input" size="large" v-model="passwordVal" @click.stop>
          <template #suffix>
            <div class="input-icon-box">
              <svg
                class="icon refresh-icon"
                aria-hidden="true"
                @click="handleRefreshClick"
              >
                <use xlink:href="#levi-shuaxin"></use>
              </svg>
            </div>
            <div class="input-icon-box copy-icon-box" @click="copyText(passwordVal)">
              复制
            </div>
          </template>
        </el-input>
        <div class="input-icon-box m-copy-icon-box" @click="copyText(passwordVal)">
          复制
        </div>
        <div class="config-item-box">
          <span
            ><svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-peizhi"></use></svg
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
              <use xlink:href="#levi-changdu"></use></svg
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
        <div class="history-box">
          <div class="record-box">
            <el-checkbox label="记录历史密码" v-model="isHistory" />
            <span
              >---该功能将记录您最近生成的100个密码。并且历史记录不是存储在我们云端服务器上，而是存储在您的浏览器本地存储中。</span
            >
          </div>
          <div class="look-history-box">
            <span @click="historyPassword"
              >{{ isMore ? "隐藏历史记录" : "查看历史记录" }}
              <i class="bi bi-chevron-down"></i
            ></span>
          </div>
          <div class="remove-btn" v-if="isMore" @click="removeHistory">清除历史记录</div>
          <div class="history-content" v-if="isMore">
            <div
              class="history-pw-item"
              v-for="(item, idx) in dataMap.passList"
              :key="idx"
            >
              <span @click="copyText(item)">{{ item }}</span>
            </div>
          </div>
        </div>
        <div class="about-password-box">
          <span
            ><svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-guanyu-"></use></svg
            ><span>关于密码生成器</span></span
          >
          <p>
            密码是一种用来混淆的技术，它希望将正常的（可识别的）信息转变为无法识别的信息。当然，对一小部分人来说，这种无法识别的信息是可以再加工并恢复的。密码在中文里是“口令”（password）的通称。登录网站、电子邮箱和银行取款时输入的“密码”其实严格来讲应该仅被称作“口令”，因为它不是本来意义上的“加密代码”，但是也可以称为秘密的号码。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { Head } from "@vueuse/head";
import { getStore, setStore, clearStore } from "@/utils/storage.js";

onMounted(() => {
  updatePassword();
});

const dataMap = reactive({
  passList: [],
});

if (getStore("PASS_WORD_LIST")?.length) {
  dataMap.passList = getStore("PASS_WORD_LIST");
}

let passwordVal = ref("");
let passLength = ref(12);
let numbers = ref(true);
let lowercase = ref(true);
let uppercase = ref(true);
let symbols = ref(true);
let exclude = ref(true);
let isHistory = ref(true);
let isMore = ref(false);
let maxPw = ref(100);

const removeHistory = () => {
  clearStore("PASS_WORD_LIST");
  dataMap.passList = getStore("PASS_WORD_LIST");
  isMore.value = false;
};

const historyPassword = () => {
  isMore.value = !isMore.value;
  const moreIcon = document.querySelector(".bi-chevron-down");
  moreIcon.classList.toggle("open-more");
};

const handleRefreshClick = () => {
  const iconBox = document.querySelector(".refresh-icon");
  iconBox.classList.add("rotate-animation");

  setTimeout(() => {
    iconBox.classList.remove("rotate-animation");
  }, 500);

  updatePassword();
};

const updatePassword = () => {
  const charSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
  };

  let allChars = "";

  for (const [key, value] of Object.entries(charSets)) {
    if (key === "exclude" && exclude.value) {
      allChars = allChars.replace(/[1lI0oO]/g, "");
    } else if (key === "symbols" && symbols.value) {
      allChars += value;
    } else if (key !== "exclude" && key !== "symbols" && eval(`${key}.value`)) {
      allChars += value;
    } else {
      allChars = allChars.replace(new RegExp("[" + value + "]", "g"), "");
    }
  }

  passwordVal.value = "";

  for (let i = 0; i < passLength.value; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    passwordVal.value += allChars[randomIndex];
  }

  if (isHistory.value) {
    dataMap.passList = getStore("PASS_WORD_LIST")?.length
      ? getStore("PASS_WORD_LIST")
      : [];
    if (dataMap.passList.length < maxPw.value) {
      dataMap.passList.push(passwordVal.value);
      setStore("PASS_WORD_LIST", dataMap.passList);
    }
  }
};

const copyText = (val) => {
  navigator.clipboard
    .writeText(val)
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
.tools-container {
  max-width: 670px;
  border-radius: var(--themeRadius);
}

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
  background-color: var(--themeBtnHoverColor);
  margin: 5px 0;
  padding: 5px 25px;
  border-radius: 2px;
  color: #fff;
  line-height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  user-select: none;

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

.config-item-box,
.password-length-box,
.about-password-box {
  margin: 20px 0;

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

.history-box p {
  font-size: 14px;
}

.record-box {
  font-size: 12px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  span {
    margin-left: 20px;
  }
}

.look-history-box {
  display: flex;
  align-items: center;

  span {
    font-size: 14px;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;

    .bi {
      margin-left: 3px;
    }
  }
}

.bi-chevron-down::before {
  transform: rotate(0deg);
  transition: all 0.3s;
  vertical-align: middle;
}

.bi-chevron-down.open-more::before {
  transform: rotate(180deg);
  transition: all 0.3s;
}

.remove-btn {
  margin-top: 10px;
  background-color: red;
  width: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 8px 0;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: rgb(229, 41, 41);
    transition: all 0.2s;
  }
}

.history-content {
  padding: 10px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  background-color: #fff;
  border-radius: 5px;
  margin-top: 10px;

  .history-pw-item {
    padding: 8px 0;
    width: 50%;
    overflow-wrap: break-word;

    span {
      color: rgb(12, 6, 1);
      font-weight: 500;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        color: var(--linkTextColor);
        transition: all 0.2s;
      }
    }
  }

  p {
    font-size: 14px;
  }
}

.about-password-box {
  margin-top: 30px;

  p {
    font-size: 14px;
    margin: 10px 0;
  }
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: none;
}

:deep(.el-slider__runway) {
  background-color: #666;
}

:deep(.el-slider__bar) {
  background-color: var(--themeBtnHoverColor);
}

:deep(.el-slider__button) {
  border-color: var(--themeBtnHoverColor);
}

:deep(.el-checkbox__label) {
  color: var(--balckTextColor) !important;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: var(--themeBtnHoverColor);
  border-color: var(--themeBtnHoverColor);
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
  .password .content {
    padding: 10px;
  }

  .tool-main {
    padding: 0;
  }

  .password-input .icon {
    margin-right: 0;
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

  .look-history-box {
    margin-top: 10px;
  }

  .history-pw-item {
    width: 100% !important;
  }
}
</style>
