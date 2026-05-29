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
    }"
    :style="positionStyle"
    ref="catRef"
    @pointerdown.prevent="onPointerDown"
    @click.stop
  >
    <div class="cat-inner">
      <div ref="lottieRef" class="lottie-container"></div>

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
const showBubble = ref(false);
const currentBubble = ref("");
const bubbleEmoji = ref("");
const bubbleType = ref("");
const floatingHearts = ref([]);
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
  if (!canStartAction() || showBubble.value || isPetted.value || isExcited.value || isWaving.value) return;

  const r = Math.random();
  if (r < 0.22) {
    showMeow();
    return;
  }
  if (r < 0.4) {
    showMeow({ text: "摸摸我嘛~", emoji: "🥺", type: "playful" });
    return;
  }
  if (r < 0.56) {
    wavePaw();
    return;
  }
  if (r < 0.72) {
    standUp();
    return;
  }
  if (r < 0.86) {
    spinAround();
    return;
  }

  if (r < 0.95) {
    happyHop();
    return;
  }

  sparkleMoment();
};

const scheduleRandomEvent = () => {
  clearTimeout(randomEventTimer);
  const delay = 20000 + Math.random() * 40000;
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

let clickTimer = null;
let pressTimer = null;
let clickCount = 0;
let lastClickTime = 0;

const handleClick = () => {
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
    const actions = [petCat, petCat, petCat, wavePaw, wavePaw];
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

const onPointerUp = () => {
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
    handleClick();
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
});

onBeforeUnmount(() => {
  clearInterval(teleportTimer);
  clearTimeout(randomEventTimer);
  clearTimeout(autoMoveTimer);
  clearTimeout(sleepTimer);
  clearTimeout(relocateTimer);
  clearTimeout(trickTimer);
  clearTimeout(clickTimer);
  clearTimeout(pressTimer);
  if (animInstance) animInstance.destroy();
  window.removeEventListener("resize", handleResize);
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
      animation: sleep-breathe 2.5s ease-in-out infinite;
    }
  }

  &.is-petted {
    .cat-inner {
      animation: pet-sway 0.5s ease-in-out infinite alternate;
    }
  }

  &.is-excited {
    .cat-inner {
      animation: excited-bounce 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) 2;
    }
  }

  &.is-auto-relocating {
    opacity: 0;
    pointer-events: none;
  }

  &.is-standing {
    .cat-inner {
      animation: stand-tall 1.5s ease-in-out;
      transform-origin: center bottom;
    }
  }

  &.is-spinning {
    .cat-inner {
      animation: spin-trick 1.1s cubic-bezier(0.55, 0.05, 0.35, 1) 1;
      transform-origin: center center;
    }
  }

  &.is-hopping {
    .cat-inner {
      animation: happy-hop 0.5s ease-in-out 2;
      transform-origin: center bottom;
    }
  }
}

.cat-inner {
  position: relative;
  width: $pet-size;
  height: $pet-size;
  transition: transform 0.25s ease;
}

.cat-pet:hover:not(.is-dragging):not(.is-sleeping) .cat-inner {
  transform: scale(1.06);
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
  50% { transform: scale(1.03); }
}

@keyframes pet-sway {
  0% { transform: rotate(-4deg) scale(1.05); }
  100% { transform: rotate(4deg) scale(1.05); }
}

@keyframes excited-bounce {
  0% { transform: translateY(0) scale(1); }
  40% { transform: translateY(-18px) scale(1.12); }
  70% { transform: translateY(-8px) scale(1.04); }
  100% { transform: translateY(0) scale(1); }
}

@keyframes paw-wave {
  0% { transform: rotate(-30deg); }
  100% { transform: rotate(30deg); }
}

@keyframes stand-tall {
  0% { transform: scale(1) translateY(0); }
  25% { transform: scale(0.96, 1.08) translateY(-10px); }
  55% { transform: scale(1.02, 1.16) translateY(-18px); }
  100% { transform: scale(1) translateY(0); }
}

@keyframes spin-trick {
  0% { transform: rotate(0deg) scale(1); }
  40% { transform: rotate(160deg) scale(1.08); }
  75% { transform: rotate(310deg) scale(0.96); }
  100% { transform: rotate(360deg) scale(1); }
}

@keyframes happy-hop {
  0% { transform: translateY(0) scale(1); }
  30% { transform: translateY(-22px) scale(1.04); }
  55% { transform: translateY(0) scale(0.98, 1.02); }
  100% { transform: translateY(0) scale(1); }
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
