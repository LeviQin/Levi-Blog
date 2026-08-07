<template>
  <div class="top-banner" :style="bannerStyle">
    <div class="banner-grid-bg"></div>

    <!-- 分屏 Hero 模式（首页：传入 terminalLines） -->
    <div v-if="isSplit" class="banner-split">
      <div class="banner-left">
        <h2 class="banner-title">{{ props.bannerConfig.title }}</h2>
        <p class="banner-sub">
          <span>{{ typedText }}</span>
          <span class="typing-caret"></span>
        </p>
        <div class="banner-actions">
          <button class="banner-btn primary" type="button" @click="router.push('/category/technology')">
            查看文章
          </button>
          <button class="banner-btn ghost" type="button" @click="router.push('/about')">
            关于我
          </button>
        </div>
      </div>
      <div class="banner-right">
        <div class="terminal-window">
          <div class="terminal-bar">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
            <span class="terminal-title">levi:~</span>
          </div>
          <div class="terminal-body">
            <div v-for="(line, i) in props.bannerConfig.terminalLines" :key="i" class="terminal-line">
              <span class="prompt">➜</span>
              <span class="cmd">{{ line.cmd }}</span>
            </div>
            <div class="terminal-line">
              <span class="prompt">➜</span>
              <span class="output">{{ terminalOutput }}</span>
              <span class="terminal-cursor"></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 常规文案模式（其余页面） -->
    <div v-else class="banner-text-box">
      <h2 v-if="props.bannerConfig.title">
        {{ props.bannerConfig.title }}
      </h2>
      <p class="typing-text">
        <span>{{ typedText }}</span>
        <span class="typing-caret"></span>
      </p>
    </div>

    <i
      class="bi bi-chevron-double-down button-arrow"
      @click="toNextPage"
      v-if="props.bannerConfig.showArrow"
    ></i>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, onBeforeUnmount, onMounted, ref, watch, computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  bannerConfig: {
    type: Object,
    default: function () {
      return {
        height: "100vh",
        showArrow: false,
        title: "Levi",
        text: "莫道桑榆晚，为霞尚满天",
      };
    },
  },
});

const router = useRouter();

const isSplit = computed(() => Array.isArray(props.bannerConfig.terminalLines));

const bannerStyle = computed(() => {
  if (isSplit.value) {
    return "min-height: 62vh";
  }
  return `height: ${props.bannerConfig.height}`;
});

const terminalOutput = ref("");

const toNextPage = () => {
  emit("nextPosition");
};

const emit = defineEmits(["nextPosition"]);

const typedText = ref("");
let typingTimer = null;
let restartTimer = null;

const clearTypingTimers = () => {
  clearTimeout(typingTimer);
  clearTimeout(restartTimer);
};

const startTyping = (text = "") => {
  clearTypingTimers();
  typedText.value = "";

  if (!text) return;

  const chars = Array.from(text);
  let index = 0;

  const typeNext = () => {
    if (index < chars.length) {
      typedText.value += chars[index];
      index += 1;
      typingTimer = setTimeout(typeNext, 140);
      return;
    }

    restartTimer = setTimeout(() => {
      startTyping(text);
    }, 3200);
  };

  typingTimer = setTimeout(typeNext, 240);
};

const startTerminalTyping = () => {
  const lines = props.bannerConfig.terminalLines || [];
  if (!lines.length) return;
  const last = lines[lines.length - 1];
  const output = last.output || "";
  terminalOutput.value = "";
  const chars = Array.from(output);
  let index = 0;
  const typeNext = () => {
    if (index < chars.length) {
      terminalOutput.value += chars[index];
      index += 1;
      typingTimer = setTimeout(typeNext, 60);
    }
  };
  typingTimer = setTimeout(typeNext, 600);
};

onMounted(() => {
  startTyping(props.bannerConfig.text);
  if (isSplit.value) {
    startTerminalTyping();
  }
});

watch(
  () => props.bannerConfig.text,
  (value) => {
    startTyping(value);
  }
);

watch(
  () => props.bannerConfig.terminalLines,
  () => {
    if (isSplit.value) {
      startTerminalTyping();
    }
  }
);

onBeforeUnmount(() => {
  clearTypingTimers();
});
</script>

<style lang="scss" scoped>
.top-banner {
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.banner-grid-bg {
  position: absolute;
  inset: 0;
  background-color: transparent;
}

/* ===== 分屏 Hero 模式 ===== */
.banner-split {
  position: relative;
  z-index: 1;
  width: min(1180px, 92vw);
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  align-items: center;
  gap: 40px;
  padding: 40px 0;
}

.banner-left {
  text-align: left;
}

.banner-title {
  font-family: var(--mono-font-family);
  font-size: 48px;
  font-weight: 700;
  margin: 0 0 14px 0;
  color: #ffffff;
  letter-spacing: -1px;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.35);
}

.banner-sub {
  font-size: 17px;
  color: rgba(255, 255, 255, 0.85);
  margin: 0 0 26px 0;
  line-height: 1.6;
  min-height: 32px;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
}

.typing-caret {
  display: inline-block;
  width: 2px;
  height: 19px;
  margin-left: 4px;
  background: var(--theme-btn-hover-color);
  animation: caretBlink 0.9s steps(1) infinite;
  vertical-align: -4px;
}

.banner-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.banner-btn {
  padding: 10px 22px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  font-family: var(--mono-font-family);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);

  &.primary {
    background: var(--theme-btn-hover-color);
    color: #0d1117;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(34, 211, 238, 0.35);
    }
  }

  &.ghost {
    background: #ffffff;
    border-color: #ffffff;
    color: #0d1117;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);
    }
  }

  &:active {
    transform: scale(0.97);
  }
}

/* 终端窗口 */
.banner-right {
  display: flex;
  justify-content: center;
}

.terminal-window {
  width: 100%;
  max-width: 460px;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(13, 17, 23, 0.92);
  border: 1px solid rgba(34, 211, 238, 0.18);
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.terminal-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: #161b22;
  border-bottom: 1px solid #21262d;
}

.dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  flex-shrink: 0;
}

.dot-red {
  background: #f85149;
}

.dot-yellow {
  background: #d29922;
}

.dot-green {
  background: #3fb950;
}

.terminal-title {
  margin-left: 8px;
  font-family: var(--mono-font-family);
  font-size: 13px;
  color: #8b949e;
}

.terminal-body {
  padding: 16px 18px;
  font-family: var(--mono-font-family);
  font-size: 13px;
  line-height: 1.85;
}

.terminal-line {
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}

.prompt {
  color: #3fb950;
  flex-shrink: 0;
}

.cmd {
  color: #e6edf3;
}

.output {
  color: #8b949e;
}

.terminal-cursor {
  display: inline-block;
  width: 8px;
  height: 16px;
  background: var(--theme-btn-hover-color);
  vertical-align: -3px;
  animation: caretBlink 1s steps(1) infinite;
}

/* ===== 常规文案模式 ===== */
.banner-text-box {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, 0);
  width: min(80vw, 720px);
  text-align: center;
  z-index: 1;
  /* 半透明深色遮罩兜底，保证文字任何背景下都清晰 */
  padding: 20px 32px;
  border-radius: 16px;
  background: rgba(13, 17, 23, 0.45);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.banner-text-box h2 {
  font-family: var(--mono-font-family);
  color: #ffffff;
  text-align: center;
  font-size: 35px;
  margin: 0;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
}

.banner-text-box p {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.82);
  margin: 12px auto 0;
  min-height: 32px;
  line-height: 32px;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.35);
}

.button-arrow {
  display: block;
  position: absolute;
  bottom: 60px;
  left: 50%;
  margin-left: -20px;
  opacity: 0.75;
  z-index: 1;
  cursor: pointer;
  color: var(--color);
  animation: arrowMove 1s linear infinite;
  font-size: 24px;
}

@media (max-width: 860px) {
  .banner-split {
    grid-template-columns: 1fr;
    gap: 28px;
    padding: 72px 0 48px;
    text-align: center;
  }

  .banner-left {
    text-align: center;
  }

  .banner-title {
    font-size: 36px;
  }

  .banner-sub {
    font-size: 16px;
  }

  .banner-actions {
    justify-content: center;
  }

  .terminal-window {
    max-width: 100%;
  }

  .banner-text-box {
    top: 25%;
    width: min(86vw, 520px);
  }

  .banner-text-box h2 {
    font-size: 30px;
  }

  .banner-text-box p {
    font-size: 16px;
    line-height: 30px;
    min-height: 30px;
  }
}

@keyframes arrowMove {
  0% {
    transform: translateY(-10px);
  }

  50% {
    transform: translateY(-20px);
  }

  100% {
    transform: translateY(-10px);
  }
}

@keyframes caretBlink {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}
</style>
