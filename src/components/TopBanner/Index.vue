<template>
  <div class="top-banner" :style="`height: ${props.bannerConfig.height}`">
    <div class="banner-text-box">
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
import { defineEmits, defineProps, onBeforeUnmount, onMounted, ref, watch } from "vue";

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
    }, 1800);
  };

  typingTimer = setTimeout(typeNext, 240);
};

onMounted(() => {
  startTyping(props.bannerConfig.text);
});

watch(
  () => props.bannerConfig.text,
  (value) => {
    startTyping(value);
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
}

.banner-text-box {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, 0);
  width: min(80vw, 720px);
  text-align: center;
}

.top-banner h2,
.top-banner i {
  text-shadow: 0 5px 15px rgba(0, 0, 0, 1) !important;
  color: #fff;
  text-align: center;
  font-size: 35px;
  margin-left: -18px;
}

.top-banner p {
  width: 100%;
  min-height: 40px;
  line-height: 40px;
  overflow: visible;
  white-space: normal;
  word-break: break-all;
  text-shadow: 0 5px 15px rgba(0, 0, 0, 1) !important;
  color: #fff;
  font-size: 24px;
  margin: 0 auto;
}

.typing-text {
  display: inline;
}

.typing-caret {
  display: inline-block;
  width: 2px;
  height: 28px;
  margin-left: 4px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.35);
  animation: caretBlink 0.9s steps(1) infinite;
  vertical-align: -4px;
}

.button-arrow {
  display: block;
  position: absolute;
  bottom: 100px;
  left: 50%;
  margin-left: -20px;
  opacity: 0.75;
  z-index: 1;
  cursor: pointer;
  animation: arrowMove 1s linear infinite;
}

@media (max-width: 860px) {
  .banner-text-box {
    top: 25%;
    width: min(86vw, 520px);
  }

  .top-banner h2,
  .top-banner i {
    font-size: 30px;
  }

  .top-banner p {
    font-size: 16px;
    line-height: 30px;
    min-height: 30px;
  }

  .typing-caret {
    height: 20px;
  }

  .button-arrow {
    bottom: 120px;
  }
}

@keyframes arrowMove {
  0% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(-10px);
  }

  50% {
    transform: translateY(-20px);
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
