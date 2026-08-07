<template>
  <div
    class="cat-pet"
    :class="{
      'is-dragging': isDragging,
      'is-sleeping': isSleeping,
      'is-petted': isPetted,
      'is-excited': isExcited,
      'is-auto-relocating': isAutoRelocating,
      'is-standing': currentTrick === 'standing',
      'is-spinning': currentTrick === 'spinning',
      'is-hopping': currentTrick === 'hopping',
      'is-frightened': isFrightened,
      'is-eating': isEating,
    }"
    :style="positionStyle"
    ref="catRef"
    @pointerdown.prevent="onPointerDown"
    @click.stop
  >
    <div class="cat-inner">
      <div ref="lottieRef" class="lottie-container"></div>

      <!-- 喂食时的食物碗 -->
      <div v-if="isEating" class="food-bowl">
        <span class="food-emoji">🍖</span>
      </div>

      <div class="cat-paw-wave" v-if="isWaving">
        <div class="wave-paw"></div>
      </div>
    </div>

    <Transition name="bubble-pop">
      <div v-if="showBubble" class="speech-bubble" :class="bubbleType">
        <span class="bubble-emoji" v-if="bubbleEmoji">{{ bubbleEmoji }}</span>
        {{ currentBubble }}
      </div>
    </Transition>

    <TransitionGroup name="float-heart" tag="div" class="hearts-container">
      <span
        v-for="heart in floatingHearts"
        :key="heart.id"
        class="float-heart"
        :style="heart.style"
      >{{ heart.emoji }}</span>
    </TransitionGroup>

    <div v-if="isSleeping" class="sleep-zzz">
      <span class="z z1">z</span>
      <span class="z z2">Z</span>
      <span class="z z3">Z</span>
    </div>

    <!-- 点击波纹特效 -->
    <TransitionGroup name="ripple-pop" tag="div" class="ripples-container">
      <span
        v-for="ripple in ripples"
        :key="ripple.id"
        class="click-ripple"
        :style="ripple.style"
      ></span>
    </TransitionGroup>

    <!-- 抚摸流光 -->
    <Transition name="pet-shine">
      <div v-if="isPetted" class="pet-shine"></div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import lottie from "lottie-web";
import catAnim from "./cat.json";

const catRef = ref(null);
const lottieRef = ref(null);

let animInstance = null;

const isDragging = ref(false);
const isSleeping = ref(false);
const isPetted = ref(false);
const isExcited = ref(false);
const isWaving = ref(false);
const isAutoRelocating = ref(false);
const isFrightened = ref(false);
const isEating = ref(false);
const showBubble = ref(false);
const currentBubble = ref("");
const bubbleEmoji = ref("");
const bubbleType = ref("");
const floatingHearts = ref([]);
const ripples = ref([]);
let rippleIdCounter = 0;
const currentTrick = ref("");

const position = reactive({ x: 0, y: 0 });

const isMobile = /Android|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent);
const petSize = isMobile ? 92 : 120;
const viewportPadding = 12;
const viewportTopPadding = 50;

const SLP_FRAME = 56;

const bubbleTexts = [
  { text: "喵~", emoji: "", type: "" },
  { text: "喵呜~", emoji: "", type: "" },
  { text: "呼噜噜~", emoji: "😊", type: "happy" },
  { text: "好舒服~", emoji: "🥰", type: "happy" },
  { text: "摸我!", emoji: "🐾", type: "playful" },
  { text: "=^_^=", emoji: "", type: "" },
  { text: "哼~", emoji: "😼", type: "tsundere" },
  { text: "???", emoji: "🤔", type: "curious" },
  { text: "!!!", emoji: "✨", type: "excited" },
  { text: "陪我玩", emoji: "🎾", type: "playful" },
  { text: "午安~", emoji: "☀️", type: "sleepy" },
  { text: "好困...", emoji: "🥱", type: "sleepy" },
  { text: "饿了", emoji: "🍖", type: "playful" },
  { text: "盯——", emoji: "👀", type: "curious" },
];

const positionStyle = computed(() => ({
  left: `${position.x}px`,
  top: `${position.y}px`,
  transition: isDragging.value || isAutoRelocating.value
    ? "none"
    : "left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
}));

let teleportTimer = null;
let randomEventTimer = null;
let autoMoveTimer = null;
let sleepTimer = null;
let relocateTimer = null;
let trickTimer = null;
let heartIdCounter = 0;

const initLottie = () => {
  if (!lottieRef.value) return;

  animInstance = lottie.loadAnimation({
    container: lottieRef.value,
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData: catAnim,
  });

  animInstance.setSpeed(0.8);
};

const resumeIdle = () => {
  if (!animInstance || animInstance.isPaused) {
    animInstance?.play();
  }
  animInstance?.setSpeed(0.8);
};

const gotoFrameAndHold = (frame) => {
  if (animInstance) {
    animInstance.goToAndStop(frame, true);
  }
};

const getViewportBounds = () => {
  const maxX = Math.max(viewportPadding, window.innerWidth - petSize - viewportPadding);
  const maxY = Math.max(viewportPadding, window.innerHeight - petSize - viewportPadding);

  return {
    minX: viewportPadding,
    minY: viewportTopPadding,
    maxX,
    maxY: Math.max(viewportTopPadding, maxY),
  };
};

const constrainPosition = (x, y) => {
  const bounds = getViewportBounds();
  return {
    x: Math.max(bounds.minX, Math.min(x, bounds.maxX)),
    y: Math.max(bounds.minY, Math.min(y, bounds.maxY)),
  };
};

const getRandomEdgePosition = () => {
  const bounds = getViewportBounds();
  const w = window.innerWidth;
  const h = window.innerHeight;

  const edge = Math.floor(Math.random() * 8);
  let x, y;

  switch (edge) {
    case 0: x = bounds.minX + Math.random() * Math.max(0, bounds.maxX - bounds.minX); y = bounds.minY; break;
    case 1: x = bounds.minX + Math.random() * Math.max(0, bounds.maxX - bounds.minX); y = bounds.maxY; break;
    case 2: x = bounds.minX; y = bounds.minY + Math.random() * Math.max(0, bounds.maxY - bounds.minY); break;
    case 3: x = bounds.maxX; y = bounds.minY + Math.random() * Math.max(0, bounds.maxY - bounds.minY); break;
    case 4: x = bounds.minX; y = bounds.minY; break;
    case 5: x = bounds.maxX; y = bounds.minY; break;
    case 6: x = bounds.minX; y = bounds.maxY; break;
    case 7: x = bounds.maxX; y = bounds.maxY; break;
  }

  return constrainPosition(x, y);
};

const canStartAction = () => (
  !isDragging.value
  && !isSleeping.value
  && !isAutoRelocating.value
  && !currentTrick.value
);

const moveToPositionWithFade = (nextPosition, bubbleData) => {
  if (!canStartAction()) return;

  clearTimeout(relocateTimer);
  isAutoRelocating.value = true;
  const constrainedPosition = constrainPosition(nextPosition.x, nextPosition.y);

  relocateTimer = setTimeout(() => {
    position.x = constrainedPosition.x;
    position.y = constrainedPosition.y;

    relocateTimer = setTimeout(() => {
      isAutoRelocating.value = false;

      if (bubbleData) {
        showMeow(bubbleData);
      }
    }, 40);
  }, 260);
};

const teleportToEdge = () => {
  const pos = getRandomEdgePosition();
  moveToPositionWithFade(pos, { text: "来这边!", emoji: "🐾", type: "playful" });
};

const resetTrickState = () => {
  currentTrick.value = "";
  resumeIdle();
};

const performTrick = ({
  name,
  duration,
  bubble,
  speed = 1.1,
  hearts,
}) => {
  if (!canStartAction() || isPetted.value || isExcited.value || isWaving.value) {
    return false;
  }

  currentTrick.value = name;
  animInstance?.setSpeed(speed);

  if (bubble) {
    showMeow(bubble);
  }

  if (hearts) {
    spawnHearts(hearts.count, hearts.emojis);
  }

  clearTimeout(trickTimer);
  trickTimer = setTimeout(() => {
    resetTrickState();
  }, duration);

  return true;
};

const standUp = () => performTrick({
  name: "standing",
  duration: 1500,
  speed: 1,
  bubble: { text: "看我站起来!", emoji: "🐱", type: "playful" },
});

const spinAround = () => performTrick({
  name: "spinning",
  duration: 1100,
  speed: 1.5,
  bubble: { text: "转圈圈~", emoji: "🌀", type: "excited" },
  hearts: { count: 3, emojis: ["✨", "🌀", "⭐"] },
});

const happyHop = () => performTrick({
  name: "hopping",
  duration: 1000,
  speed: 1.35,
  bubble: { text: "蹦蹦喵!", emoji: "🐾", type: "happy" },
  hearts: { count: 3, emojis: ["💫", "✨", "💕"] },
});

const sparkleMoment = () => {
  if (!canStartAction() || isPetted.value || isExcited.value || isWaving.value) return;

  showMeow({ text: "嘿嘿~", emoji: "✨", type: "excited" });
  spawnHearts(3, ["✨", "💖", "🌟"]);
  if (animInstance) {
    animInstance.setSpeed(1.6);
    clearTimeout(trickTimer);
    trickTimer = setTimeout(() => {
      resumeIdle();
    }, 900);
  }
};

const triggerRandomEvent = () => {
  if (!canStartAction() || showBubble.value || isPetted.value || isExcited.value || isWaving.value || isEating.value) return;

  const r = Math.random();
  if (r < 0.18) {
    showMeow();
    return;
  }
  if (r < 0.34) {
    showMeow({ text: "摸摸我嘛~", emoji: "🥺", type: "playful" });
    return;
  }
  if (r < 0.5) {
    wavePaw();
    return;
  }
  if (r < 0.63) {
    standUp();
    return;
  }
  if (r < 0.74) {
    spinAround();
    return;
  }
  if (r < 0.85) {
    happyHop();
    return;
  }
  if (r < 0.93) {
    feedCat();
    return;
  }
  sparkleMoment();
};

const scheduleRandomEvent = () => {
  clearTimeout(randomEventTimer);
  const delay = 15000 + Math.random() * 25000;
  randomEventTimer = setTimeout(() => {
    triggerRandomEvent();
    scheduleRandomEvent();
  }, delay);
};

const goToSleep = () => {
  isSleeping.value = true;
  gotoFrameAndHold(SLP_FRAME);
  showMeow({ text: "Zzz...", emoji: "💤", type: "sleepy" });

  clearTimeout(sleepTimer);
  sleepTimer = setTimeout(() => {
    wakeUp();
  }, 8000 + Math.random() * 10000);
};

const wakeUp = () => {
  isSleeping.value = false;
  resumeIdle();
  showMeow({ text: "嗯...早上了?", emoji: "🌅", type: "sleepy" });
};

const showMeow = (bubbleData) => {
  if (!bubbleData) {
    const randomBubble = bubbleTexts[Math.floor(Math.random() * bubbleTexts.length)];
    bubbleData = randomBubble;
  }
  currentBubble.value = bubbleData.text;
  bubbleEmoji.value = bubbleData.emoji || "";
  bubbleType.value = bubbleData.type || "";
  showBubble.value = true;

  clearTimeout(autoMoveTimer);
  autoMoveTimer = setTimeout(() => {
    showBubble.value = false;
  }, 2200);
};

const spawnHearts = (count, emojis) => {
  for (let i = 0; i < count; i++) {
    const id = ++heartIdCounter;
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];

    floatingHearts.value.push({
      id,
      emoji,
      style: { animationDelay: `${i * 0.08}s` },
    });

    setTimeout(() => {
      floatingHearts.value = floatingHearts.value.filter((h) => h.id !== id);
    }, 1200 + i * 80);
  }
};

// 点击位置波纹特效
const spawnRipple = (x, y) => {
  const id = ++rippleIdCounter;
  const size = 34;
  ripples.value.push({
    id,
    style: {
      left: `${x - size / 2}px`,
      top: `${y - size / 2}px`,
      width: `${size}px`,
      height: `${size}px`,
    },
  });
  setTimeout(() => {
    ripples.value = ripples.value.filter((r) => r.id !== id);
  }, 600);
};

const petCat = () => {
  if (isPetted.value || isExcited.value || isSleeping.value || isAutoRelocating.value || currentTrick.value) return;
  isPetted.value = true;
  resumeIdle();

  if (animInstance) {
    animInstance.setSpeed(1.5);
  }

  const reactions = [
    { text: "呼噜噜~", emoji: "😻", type: "happy" },
    { text: "再摸摸!", emoji: "🥰", type: "happy" },
    { text: "好舒服喵~", emoji: "💕", type: "happy" },
  ];
  showMeow(reactions[Math.floor(Math.random() * reactions.length)]);
  spawnHearts(4, ["💕", "❤️", "✨"]);

  setTimeout(() => {
    isPetted.value = false;
    resumeIdle();
  }, 2000);
};

const exciteCat = () => {
  if (isExcited.value || isSleeping.value || isAutoRelocating.value || currentTrick.value) return;
  isExcited.value = true;

  if (animInstance) {
    animInstance.setSpeed(2.5);
  }

  showMeow({ text: "好开心!!", emoji: "🎉", type: "excited" });
  spawnHearts(6, ["💖", "🌟", "✨", "💝"]);

  setTimeout(() => {
    isExcited.value = false;
    resumeIdle();
  }, 1800);
};

const wavePaw = () => {
  if (isWaving.value || isSleeping.value || isAutoRelocating.value || currentTrick.value) return;
  isWaving.value = true;
  showMeow({ text: "Hi~", emoji: "👋", type: "playful" });

  setTimeout(() => {
    isWaving.value = false;
  }, 1500);
};

// 滚轮惊吓（鼠标滚轮快速滚动时）
const scareCat = () => {
  if (isFrightened.value || isSleeping.value || isAutoRelocating.value) return;
  isFrightened.value = true;
  showMeow({ text: "呀!!", emoji: "😱", type: "excited" });
  spawnHearts(2, ["💨", "❗"]);
  clearTimeout(trickTimer);
  trickTimer = setTimeout(() => {
    isFrightened.value = false;
  }, 600);
};

// 喂食
const feedCat = () => {
  if (isEating.value || isSleeping.value) return;
  isEating.value = true;
  showMeow({ text: "好香~", emoji: "😋", type: "happy" });
  spawnHearts(3, ["❤️", "✨", "🍖"]);
  clearTimeout(trickTimer);
  trickTimer = setTimeout(() => {
    isEating.value = false;
    showMeow({ text: "吃饱啦!", emoji: "😌", type: "happy" });
  }, 3200);
};

// 视线跟随鼠标（轻微朝向）
let lookTimer = null;
const handleMouseMove = (e) => {
  if (!catRef.value || isDragging.value) return;
  const rect = catRef.value.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dx = e.clientX - cx;
  const dy = e.clientY - cy;
  const maxTilt = 10;
  const tiltX = Math.max(-maxTilt, Math.min(maxTilt, dx * 0.04));
  const tiltY = Math.max(-maxTilt, Math.min(maxTilt, dy * 0.04));
  if (lookTimer) return;
  lookTimer = requestAnimationFrame(() => {
    catRef.value?.style.setProperty("--look-x", `${tiltX}px`);
    catRef.value?.style.setProperty("--look-y", `${tiltY}px`);
    lookTimer = null;
  });
};

let clickTimer = null;
let pressTimer = null;
let clickCount = 0;
let lastClickTime = 0;

const handleClick = (clientX, clientY) => {
  // 点击位置波纹反馈
  if (clientX !== undefined && clientY !== undefined && catRef.value) {
    const rect = catRef.value.getBoundingClientRect();
    spawnRipple(clientX - rect.left, clientY - rect.top);
  }

  if (isSleeping.value) {
    wakeUp();
    return;
  }

  const now = Date.now();

  if (now - lastClickTime < 350) {
    clickCount++;
    if (clickCount >= 2) {
      clearTimeout(clickTimer);
      clearTimeout(pressTimer);
      clickTimer = null;
      clickCount = 0;
      exciteCat();
      lastClickTime = 0;
      return;
    }
  } else {
    clickCount = 1;
  }

  lastClickTime = now;

  clearTimeout(clickTimer);
  clickTimer = setTimeout(() => {
    const actions = [petCat, petCat, petCat, wavePaw, wavePaw, feedCat];
    const action = actions[Math.floor(Math.random() * actions.length)];
    action();
    clickCount = 0;
    clickTimer = null;
  }, 350);
};

const onPointerDown = (e) => {
  if (e.button !== undefined && e.button !== 0) return;

  dragOffset.startX = e.clientX;
  dragOffset.startY = e.clientY;
  dragOffset.ox = e.clientX - position.x;
  dragOffset.oy = e.clientY - position.y;
  hasMoved = false;

  pressTimer = setTimeout(() => {
    if (!hasMoved) {
      goToSleep();
      isDragging.value = true;
    }
  }, 600);

  document.addEventListener("pointermove", onPointerMove);
  document.addEventListener("pointerup", onPointerUp);
  document.addEventListener("pointercancel", onPointerUp);
};

const dragOffset = reactive({ startX: 0, startY: 0, ox: 0, oy: 0 });
let hasMoved = false;

const onPointerMove = (e) => {
  const dx = Math.abs(e.clientX - dragOffset.startX);
  const dy = Math.abs(e.clientY - dragOffset.startY);

  if (dx > 3 || dy > 3) {
    hasMoved = true;
    clearTimeout(pressTimer);
  }

  if (hasMoved) {
    isDragging.value = true;
    isSleeping.value = false;
    clearTimeout(sleepTimer);
    resumeIdle();

    const constrained = constrainPosition(
      e.clientX - dragOffset.ox,
      e.clientY - dragOffset.oy
    );
    position.x = constrained.x;
    position.y = constrained.y;
  }
};

const onPointerUp = (e) => {
  clearTimeout(pressTimer);

  document.removeEventListener("pointermove", onPointerMove);
  document.removeEventListener("pointerup", onPointerUp);
  document.removeEventListener("pointercancel", onPointerUp);

  if (isDragging.value && hasMoved) {
    isDragging.value = false;
    resumeIdle();

    if (isSleeping.value) {
      wakeUp();
    }
    return;
  }

  isDragging.value = false;

  if (!hasMoved) {
    handleClick(e?.clientX, e?.clientY);
  }
};

const handleResize = () => {
  const constrained = constrainPosition(position.x, position.y);
  position.x = constrained.x;
  position.y = constrained.y;
};

onMounted(async () => {
  await nextTick();
  initLottie();

  const pos = getRandomEdgePosition();
  position.x = pos.x;
  position.y = pos.y;

  teleportTimer = setInterval(teleportToEdge, 120000);
  scheduleRandomEvent();

  window.addEventListener("resize", handleResize);
  window.addEventListener("wheel", handleWheel, { passive: true });
  window.addEventListener("mousemove", handleMouseMove, { passive: true });
});

// 滚轮互动：快速滚动时惊吓
let wheelAccum = 0;
let wheelTimer = null;
const handleWheel = () => {
  wheelAccum += 1;
  if (wheelAccum >= 4) {
    scareCat();
    wheelAccum = 0;
    clearTimeout(wheelTimer);
    return;
  }
  clearTimeout(wheelTimer);
  wheelTimer = setTimeout(() => {
    wheelAccum = 0;
  }, 800);
};

onBeforeUnmount(() => {
  clearInterval(teleportTimer);
  clearTimeout(randomEventTimer);
  clearTimeout(autoMoveTimer);
  clearTimeout(sleepTimer);
  clearTimeout(relocateTimer);
  clearTimeout(trickTimer);
  clearTimeout(clickTimer);
  clearTimeout(pressTimer);
  clearTimeout(wheelTimer);
  if (lookTimer) cancelAnimationFrame(lookTimer);
  if (animInstance) animInstance.destroy();
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("wheel", handleWheel);
  window.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("pointermove", onPointerMove);
  document.removeEventListener("pointerup", onPointerUp);
  document.removeEventListener("pointercancel", onPointerUp);
});
</script>

<style lang="scss" scoped>
$pet-size: 160px;
$pet-size-mobile: 92px;

.cat-pet {
  position: fixed;
  z-index: 2147483646;
  cursor: grab;
  opacity: 1;
  user-select: none;
  -webkit-user-select: none;
  touch-action: none;
  transition: opacity 0.26s ease, filter 0.25s ease;
  will-change: left, top, opacity;
  filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.22));

  &.is-dragging {
    cursor: grabbing;
    z-index: 2147483647;
    filter: drop-shadow(0 8px 26px rgba(0, 0, 0, 0.36));
  }

  &.is-sleeping {
    filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.12));
    .cat-inner {
      animation: sleep-breathe 2.8s ease-in-out infinite;
    }
  }

  &.is-petted {
    .cat-inner {
      animation: pet-sway 0.7s ease-in-out infinite alternate;
    }
  }

  &.is-excited {
    .cat-inner {
      animation: excited-bounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 2;
    }
  }

  &.is-auto-relocating {
    opacity: 0;
    pointer-events: none;
  }

  &.is-standing {
    .cat-inner {
      animation: stand-tall 1.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      transform-origin: center bottom;
    }
  }

  &.is-spinning {
    .cat-inner {
      animation: spin-trick 1.2s cubic-bezier(0.45, 0.05, 0.35, 1) 1;
      transform-origin: center center;
    }
  }

  &.is-hopping {
    .cat-inner {
      animation: happy-hop 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) 2;
      transform-origin: center bottom;
    }
  }

  &.is-frightened {
    .cat-inner {
      animation: fright-jump 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      transform-origin: center bottom;
    }
  }

  &.is-eating {
    .cat-inner {
      animation: eat-bob 0.5s ease-in-out infinite alternate;
      transform-origin: center bottom;
    }
  }
}

.cat-inner {
  position: relative;
  width: $pet-size;
  height: $pet-size;
  transition: transform 0.25s ease;
  transform: translate(var(--look-x, 0px), var(--look-y, 0px));
}

.cat-pet:hover:not(.is-dragging):not(.is-sleeping) .cat-inner {
  transform: translate(var(--look-x, 0px), var(--look-y, 0px)) scale(1.06);
}

// ==================== FOOD BOWL ====================
.food-bowl {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 34px;
  height: 26px;
  background: linear-gradient(180deg, #e8e2d0, #c9c1ab);
  border-radius: 4px 4px 12px 12px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4;

  .food-emoji {
    font-size: 14px;
    animation: food-wiggle 0.6s ease-in-out infinite alternate;
  }
}

@keyframes food-wiggle {
  0% { transform: rotate(-6deg) scale(1); }
  100% { transform: rotate(6deg) scale(1.08); }
}

.lottie-container {
  width: 100%;
  height: 100%;

  :deep(svg) {
    width: 100%;
    height: 100%;
  }
}

// ==================== PAW WAVE ====================
.cat-paw-wave {
  position: absolute;
  top: 22%;
  left: -12%;
  z-index: 5;

  .wave-paw {
    width: 18px;
    height: 14px;
    background: #DEE2E8;
    border-radius: 45% 45% 55% 55%;
    animation: paw-wave 0.4s ease-in-out infinite alternate;
    transform-origin: bottom center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  }
}

// ==================== SPEECH BUBBLE ====================
.speech-bubble {
  position: absolute;
  top: -44px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.96);
  color: #444;
  padding: 6px 14px;
  border-radius: 18px;
  font-size: 13px;
  white-space: nowrap;
  box-shadow: 0 3px 16px rgba(0, 0, 0, 0.12);
  pointer-events: none;
  display: flex;
  align-items: center;
  gap: 4px;

  .bubble-emoji {
    font-size: 15px;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 7px solid rgba(255, 255, 255, 0.96);
  }

  &.happy {
    background: rgba(255, 245, 235, 0.96);
    color: #C8704A;
  }

  &.excited {
    background: rgba(255, 240, 245, 0.96);
    color: #C8708A;
    animation: bubble-bounce 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  &.sleepy {
    background: rgba(240, 242, 248, 0.96);
    color: #7A8FA0;
  }

  &.playful {
    background: rgba(250, 252, 248, 0.96);
    color: #6A8A5A;
  }

  &.curious {
    background: rgba(248, 248, 255, 0.96);
    color: #6A7AB0;
  }

  &.tsundere {
    background: rgba(255, 242, 245, 0.96);
    color: #B07080;
  }
}

.bubble-pop-enter-active {
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.bubble-pop-leave-active {
  transition: all 0.2s ease-in;
}
.bubble-pop-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(10px) scale(0.6);
}
.bubble-pop-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-6px) scale(0.7);
}

// ==================== FLOATING HEARTS ====================
.hearts-container {
  position: absolute;
  top: 10px;
  left: 50%;
  pointer-events: none;
  z-index: 10;
}

.float-heart {
  position: absolute;
  font-size: 16px;
  animation: heart-float 1.2s ease-out forwards;
  opacity: 0;
}

@keyframes heart-float {
  0% {
    opacity: 1;
    transform: translate(0, 0) scale(0.5) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: translate(-20px, -45px) scale(1.3) rotate(20deg);
  }
  100% {
    opacity: 0;
    transform: translate(-30px, -80px) scale(0.6) rotate(-20deg);
  }
}

// ==================== CLICK RIPPLES ====================
.ripples-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 15;
  overflow: hidden;
}

.click-ripple {
  position: absolute;
  border-radius: 50%;
  border: 2px solid rgba(34, 211, 238, 0.55);
  animation: ripple-expand 0.6s ease-out forwards;
  pointer-events: none;
}

.ripple-pop-enter-active {
  transition: none;
}
.ripple-pop-leave-active {
  transition: none;
}

@keyframes ripple-expand {
  0% {
    opacity: 0.8;
    transform: scale(0.3);
  }
  100% {
    opacity: 0;
    transform: scale(2.2);
  }
}

// ==================== PET SHINE ====================
.pet-shine {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  pointer-events: none;
  z-index: 8;
  background: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0) 20%,
    rgba(255, 215, 180, 0.28) 45%,
    rgba(255, 255, 255, 0) 70%
  );
  animation: pet-shine-sweep 0.9s ease-out;
}

.pet-shine-enter-active {
  transition: opacity 0.2s ease;
}
.pet-shine-leave-active {
  transition: opacity 0.4s ease;
}
.pet-shine-enter-from,
.pet-shine-leave-to {
  opacity: 0;
}

@keyframes pet-shine-sweep {
  0% {
    transform: translateX(-60%);
  }
  100% {
    transform: translateX(60%);
  }
}

// ==================== SLEEP ZZZ ====================
.sleep-zzz {
  position: absolute;
  top: -8px;
  right: -10px;
  pointer-events: none;
  z-index: 5;

  .z {
    position: absolute;
    color: #7A8FA0;
    font-size: 14px;
    font-weight: bold;
    opacity: 0;
    font-family: "Comic Sans MS", cursive, sans-serif;

    &.z1 {
      top: 0;
      right: 12px;
      font-size: 10px;
      animation: zzz-float 1.8s ease-out infinite;
      animation-delay: 0s;
    }
    &.z2 {
      top: -8px;
      right: 20px;
      font-size: 13px;
      animation: zzz-float 1.8s ease-out infinite;
      animation-delay: 0.6s;
      opacity: 0;
    }
    &.z3 {
      top: -18px;
      right: 30px;
      font-size: 16px;
      animation: zzz-float 1.8s ease-out infinite;
      animation-delay: 1.2s;
      opacity: 0;
    }
  }
}

// ==================== ANIMATIONS ====================
@keyframes sleep-breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.04); }
}

@keyframes pet-sway {
  0% { transform: rotate(-3deg) scale(1.03); }
  100% { transform: rotate(3deg) scale(1.03); }
}

@keyframes excited-bounce {
  0% { transform: translateY(0) scale(1); }
  30% { transform: translateY(-20px) scale(1.12); }
  50% { transform: translateY(-12px) scale(0.96, 1.05); }
  70% { transform: translateY(-16px) scale(1.06); }
  100% { transform: translateY(0) scale(1); }
}

@keyframes paw-wave {
  0% { transform: rotate(-28deg); }
  100% { transform: rotate(28deg); }
}

@keyframes stand-tall {
  0% { transform: scale(1) translateY(0); }
  20% { transform: scale(0.94, 1.1) translateY(-8px); }
  45% { transform: scale(1.03, 1.18) translateY(-20px); }
  65% { transform: scale(0.98, 1.1) translateY(-14px); }
  85% { transform: scale(1.02, 1.14) translateY(-18px); }
  100% { transform: scale(1) translateY(0); }
}

@keyframes spin-trick {
  0% { transform: rotate(0deg) scale(1); }
  20% { transform: rotate(60deg) scale(1.1); }
  45% { transform: rotate(170deg) scale(1.06); }
  60% { transform: rotate(230deg) scale(0.98, 1.06); }
  80% { transform: rotate(320deg) scale(1.04); }
  100% { transform: rotate(360deg) scale(1); }
}

@keyframes happy-hop {
  0% { transform: translateY(0) scale(1); }
  25% { transform: translateY(-24px) scale(1.05); }
  45% { transform: translateY(0) scale(0.96, 1.04); }
  65% { transform: translateY(-16px) scale(1.03); }
  85% { transform: translateY(0) scale(0.98, 1.02); }
  100% { transform: translateY(0) scale(1); }
}

@keyframes fright-jump {
  0% { transform: translateY(0) scale(1); }
  30% { transform: translateY(-26px) scale(1.14) rotate(-6deg); }
  60% { transform: translateY(-10px) scale(0.95, 1.1) rotate(4deg); }
  100% { transform: translateY(0) scale(1); }
}

@keyframes eat-bob {
  0% { transform: translateY(0) rotate(0deg); }
  100% { transform: translateY(4px) rotate(2deg); }
}

@keyframes bubble-bounce {
  0% { transform: translateX(-50%) scale(0.8); }
  100% { transform: translateX(-50%) scale(1); }
}

@keyframes zzz-float {
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0.6);
  }
  20% {
    opacity: 0.8;
  }
  80% {
    opacity: 0.3;
  }
  100% {
    opacity: 0;
    transform: translate(18px, -30px) scale(1.2);
  }
}

// ==================== MOBILE ====================
@media (max-width: 768px) {
  .cat-pet {
    filter: drop-shadow(0 3px 10px rgba(0, 0, 0, 0.16));
  }

  .cat-inner {
    width: $pet-size-mobile;
    height: $pet-size-mobile;
  }

  .cat-paw-wave {
    top: 20%;
    left: -10%;

    .wave-paw {
      width: 14px;
      height: 11px;
    }
  }

  .speech-bubble {
    top: -36px;
    padding: 4px 10px;
    font-size: 11px;
  }

  .sleep-zzz .z {
    &.z1 { font-size: 8px; }
    &.z2 { font-size: 11px; }
    &.z3 { font-size: 13px; }
  }

  .float-heart {
    font-size: 13px;
  }
}
</style>
