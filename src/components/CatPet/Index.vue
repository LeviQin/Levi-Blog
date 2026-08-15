<template>
  <div>
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
        'is-hidden': isHidden || !settings.visible,
      }"
      :style="positionStyle"
      ref="catRef"
      @pointerdown.prevent="onPointerDown"
      @click.stop
      @contextmenu.prevent="onContextMenu"
    >
      <div class="cat-inner" :style="{ width: catSizePx, height: catSizePx }">
        <div ref="lottieRef" class="lottie-container"></div>

        <!-- 喂食时的食物碗 -->
        <div v-if="isEating" class="food-bowl">
          <span class="food-emoji">🍖</span>
        </div>

        <div class="cat-paw-wave" v-if="isWaving">
          <div class="wave-paw"></div>
        </div>
      </div>

      <button
        class="cat-settings-btn"
        :class="{ 'is-active': showSettings }"
        aria-label="宠物设置"
        title="宠物设置"
        @pointerdown.stop
        @click.stop="toggleSettings"
      >⚙️</button>

      <Transition name="bubble-pop">
        <div
          v-if="showBubble"
          class="speech-bubble"
          :class="[bubbleType, 'align-' + bubbleAlign, bubbleAbove ? 'below' : '']"
        >
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

    <!-- 设置面板 -->
    <Transition name="panel-pop">
      <div v-if="showSettings" class="cat-settings" @click.stop>
        <div class="settings-header">
          <span class="settings-title">🐱 宠物设置</span>
          <button class="settings-close" @click="showSettings = false" aria-label="关闭">✕</button>
        </div>
        <div class="settings-body">
          <div class="setting-row">
            <span>显示宠物</span>
            <button class="toggle" :class="{ on: settings.visible }" @click="settings.visible = !settings.visible"><span class="knob"></span></button>
          </div>
          <div class="setting-row">
            <span>随机事件</span>
            <button class="toggle" :class="{ on: settings.randomEvents }" @click="settings.randomEvents = !settings.randomEvents"><span class="knob"></span></button>
          </div>
          <div class="setting-row">
            <span>自动移动</span>
            <button class="toggle" :class="{ on: settings.autoMove }" @click="settings.autoMove = !settings.autoMove"><span class="knob"></span></button>
          </div>
          <div class="setting-row">
            <span>大小</span>
            <div class="size-group">
              <button :class="{ active: settings.size === 'small' }" @click="setSize('small')">小</button>
              <button :class="{ active: settings.size === 'medium' }" @click="setSize('medium')">中</button>
              <button :class="{ active: settings.size === 'large' }" @click="setSize('large')">大</button>
            </div>
          </div>
          <button class="reset-btn" @click="resetPosition">重置位置</button>
        </div>
      </div>
    </Transition>

    <!-- 隐藏后的恢复按钮 -->
    <Transition name="restore-pop">
      <button
        v-if="!settings.visible"
        class="cat-restore-btn"
        title="召唤猫咪"
        aria-label="召唤猫咪"
        @click="restoreCat"
      >🐱</button>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount, nextTick } from "vue";
import lottie from "lottie-web";
import catAnim from "./cat.json";

const props = defineProps({
  initialDelay: { type: Number, default: 0 },
});

const catRef = ref(null);
const lottieRef = ref(null);

let animInstance = null;

// ==================== 设置持久化 ====================
const SETTINGS_KEY = "levi-catpet-settings-v1";
const POS_KEY = "levi-catpet-pos-v1";

const defaultSettings = {
  visible: true,
  randomEvents: true,
  autoMove: true,
  size: "medium",
};

const loadSettings = () => {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) {
      const s = JSON.parse(raw);
      return { ...defaultSettings, ...s };
    }
  } catch (e) { /* ignore */ }
  return { ...defaultSettings };
};

const settings = reactive(loadSettings());

const saveSettings = () => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...settings }));
  } catch (e) { /* ignore */ }
};
watch(settings, saveSettings, { deep: true });

const loadPosition = () => {
  try {
    const raw = localStorage.getItem(POS_KEY);
    if (raw) {
      const p = JSON.parse(raw);
      if (typeof p.x === "number" && typeof p.y === "number") return p;
    }
  } catch (e) { /* ignore */ }
  return null;
};

const savePosition = () => {
  try {
    localStorage.setItem(POS_KEY, JSON.stringify({ x: position.x, y: position.y }));
  } catch (e) { /* ignore */ }
};

// ==================== 减弱动态效果 ====================
const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
const reducedMotion = ref(mqReduced.matches);

const onReducedChange = (e) => {
  reducedMotion.value = e.matches;
};

// ==================== 状态 ====================
const isDragging = ref(false);
const isSleeping = ref(false);
const isPetted = ref(false);
const isExcited = ref(false);
const isWaving = ref(false);
const isAutoRelocating = ref(false);
const isFrightened = ref(false);
const isEating = ref(false);
const isHidden = ref(props.initialDelay > 0);
const showBubble = ref(false);
const currentBubble = ref("");
const bubbleEmoji = ref("");
const bubbleType = ref("");
const floatingHearts = ref([]);
const ripples = ref([]);
let rippleIdCounter = 0;
const currentTrick = ref("");
const showSettings = ref(false);

const position = reactive({ x: 0, y: 0 });

const isMobile = /Android|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent);
const isNarrow = ref(window.innerWidth <= 768);
const viewportW = ref(window.innerWidth);
const viewportPadding = 12;
const viewportTopPadding = 50;

const basePetSize = computed(() => ((isMobile || isNarrow.value) ? 92 : 160));
const petScale = computed(() => (
  settings.size === "small" ? 0.8 : settings.size === "large" ? 1.15 : 1
));
const petSize = computed(() => Math.round(basePetSize.value * petScale.value));
const catSizePx = computed(() => `${petSize.value}px`);

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

// ==================== 位置样式（GPU transform） ====================
const positionStyle = computed(() => {
  if (isAutoRelocating.value) {
    return {
      transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      transition: "opacity 0.26s ease",
    };
  }
  return {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    transition: isDragging.value
      ? "none"
      : "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.26s ease, filter 0.25s ease",
  };
});

// ==================== Lottie ====================
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
  if (!animInstance) return;
  if (animInstance.isPaused) animInstance.play();
  animInstance.setSpeed(0.8);
};

const gotoFrameAndHold = (frame) => {
  if (animInstance) {
    // goToAndStop 不会停止播放中的 RAF 循环，必须显式 pause 才能真正冻结
    animInstance.pause();
    animInstance.goToAndStop(frame, true);
  }
};

// ==================== 视口边界 ====================
const getViewportBounds = () => {
  const maxX = Math.max(viewportPadding, window.innerWidth - petSize.value - viewportPadding);
  const maxY = Math.max(viewportPadding, window.innerHeight - petSize.value - viewportPadding);
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

// ==================== 动作互斥 ====================
const canStartAction = () => (
  !isHidden.value
  && !isDragging.value
  && !isSleeping.value
  && !isAutoRelocating.value
  && !currentTrick.value
  && !isEating.value
);

// ==================== 位移 ====================
const moveToPositionWithFade = (nextPosition, bubbleData) => {
  if (!canStartAction()) return;
  clearTimeout(relocateTimer);
  isAutoRelocating.value = true;
  const constrainedPosition = constrainPosition(nextPosition.x, nextPosition.y);

  relocateTimer = setTimeout(() => {
    position.x = constrainedPosition.x;
    position.y = constrainedPosition.y;
    savePosition();

    relocateTimer = setTimeout(() => {
      isAutoRelocating.value = false;
      if (bubbleData) {
        showMeow(bubbleData);
      }
    }, 40);
  }, 260);
};

const teleportToEdge = () => {
  if (!settings.autoMove || reducedMotion.value || !settings.visible) return;
  const pos = getRandomEdgePosition();
  moveToPositionWithFade(pos, { text: "来这边!", emoji: "🐾", type: "playful" });
};

const resetTrickState = () => {
  currentTrick.value = "";
  resumeIdle();
};

const FLASHY_TRICKS = new Set(["standing", "spinning", "hopping"]);

const performTrick = ({
  name,
  duration,
  bubble,
  speed = 1.1,
  hearts,
  freezeFrame = null,
}) => {
  if (!canStartAction() || isPetted.value || isExcited.value || isWaving.value) {
    return false;
  }

  // 减弱动态效果时，闪亮技巧降级为温和反馈（仅气泡+爱心）
  if (reducedMotion.value && FLASHY_TRICKS.has(name)) {
    if (bubble) showMeow(bubble);
    if (hearts) spawnHearts(hearts.count, hearts.emojis);
    return true;
  }

  currentTrick.value = name;
  if (freezeFrame !== null) {
    gotoFrameAndHold(freezeFrame);
  } else {
    animInstance?.setSpeed(speed);
  }

  if (bubble) showMeow(bubble);
  if (hearts) spawnHearts(hearts.count, hearts.emojis);

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
  duration: 1050,
  speed: 1.5,
  bubble: { text: "转圈圈~", emoji: "🌀", type: "excited" },
  hearts: { count: 3, emojis: ["✨", "🌀", "⭐"] },
  freezeFrame: 0,
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

// ==================== 随机事件 ====================
const triggerRandomEvent = () => {
  if (!settings.visible || !settings.randomEvents) return;
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
  if (!settings.visible || !settings.randomEvents) return;
  const delay = 15000 + Math.random() * 25000;
  randomEventTimer = setTimeout(() => {
    triggerRandomEvent();
    scheduleRandomEvent();
  }, delay);
};

// ==================== 自动位移 ====================
const startTeleport = () => {
  clearInterval(teleportTimer);
  if (!settings.visible || !settings.autoMove) return;
  teleportTimer = setInterval(teleportToEdge, 120000);
};

const stopTeleport = () => {
  clearInterval(teleportTimer);
};

// ==================== 睡眠 ====================
const goToSleep = () => {
  if (isSleeping.value || isDragging.value || currentTrick.value) return;
  isSleeping.value = true;
  gotoFrameAndHold(SLP_FRAME);
  showMeow({ text: "Zzz...", emoji: "💤", type: "sleepy" });

  clearTimeout(sleepTimer);
  sleepTimer = setTimeout(() => {
    wakeUp();
  }, 8000 + Math.random() * 10000);
};

const wakeUp = () => {
  if (!isSleeping.value) return;
  isSleeping.value = false;
  resumeIdle();
  showMeow({ text: "嗯...早上了?", emoji: "🌅", type: "sleepy" });
};

// ==================== 气泡 ====================
const showMeow = (bubbleData) => {
  if (!settings.visible) return;
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

const bubbleAlign = computed(() => {
  const cx = position.x + petSize.value / 2;
  if (cx < 90) return "left";
  if (cx > viewportW.value - 90) return "right";
  return "center";
});

const bubbleAbove = computed(() => position.y > 140);

// ==================== 爱心 / 波纹 ====================
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

// ==================== 交互 ====================
const petCat = () => {
  if (!settings.visible || isHidden.value) return;
  if (isPetted.value || isExcited.value || isSleeping.value || isAutoRelocating.value || currentTrick.value) return;
  isPetted.value = true;
  resumeIdle();

  if (animInstance) animInstance.setSpeed(1.5);

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
  if (!settings.visible || isHidden.value) return;
  if (isExcited.value || isSleeping.value || isAutoRelocating.value || currentTrick.value) return;
  isExcited.value = true;
  if (animInstance) animInstance.setSpeed(2.5);

  showMeow({ text: "好开心!!", emoji: "🎉", type: "excited" });
  spawnHearts(6, ["💖", "🌟", "✨", "💝"]);

  setTimeout(() => {
    isExcited.value = false;
    resumeIdle();
  }, 1800);
};

const wavePaw = () => {
  if (!settings.visible || isHidden.value) return;
  if (isWaving.value || isSleeping.value || isAutoRelocating.value || currentTrick.value) return;
  isWaving.value = true;
  showMeow({ text: "Hi~", emoji: "👋", type: "playful" });

  setTimeout(() => {
    isWaving.value = false;
  }, 1500);
};

const scareCat = () => {
  if (isFrightened.value || isSleeping.value || isAutoRelocating.value || isDragging.value) return;
  isFrightened.value = true;
  showMeow({ text: "呀!!", emoji: "😱", type: "excited" });
  spawnHearts(2, ["💨", "❗"]);
  clearTimeout(trickTimer);
  trickTimer = setTimeout(() => {
    isFrightened.value = false;
  }, 600);
};

const feedCat = () => {
  if (isEating.value || isSleeping.value || currentTrick.value || isDragging.value) return;
  isEating.value = true;
  showMeow({ text: "好香~", emoji: "😋", type: "happy" });
  spawnHearts(3, ["❤️", "✨", "🍖"]);
  clearTimeout(trickTimer);
  trickTimer = setTimeout(() => {
    isEating.value = false;
    showMeow({ text: "吃饱啦!", emoji: "😌", type: "happy" });
  }, 3200);
};

// ==================== 视线跟随 ====================
let lookTimer = null;
const handleMouseMove = (e) => {
  if (!catRef.value || isDragging.value || currentTrick.value || reducedMotion.value) return;
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

// ==================== 点击 ====================
let clickTimer = null;
let pressTimer = null;
let clickCount = 0;
let lastClickTime = 0;

const handleClick = (clientX, clientY) => {
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

// ==================== 拖拽 ====================
const dragOffset = reactive({ startX: 0, startY: 0, ox: 0, oy: 0 });
let hasMoved = false;
let longPressedSleep = false;

const onPointerDown = (e) => {
  if (e.button !== undefined && e.button !== 0) return;

  dragOffset.startX = e.clientX;
  dragOffset.startY = e.clientY;
  dragOffset.ox = e.clientX - position.x;
  dragOffset.oy = e.clientY - position.y;
  hasMoved = false;
  longPressedSleep = false;

  clearTimeout(pressTimer);
  pressTimer = setTimeout(() => {
    if (!hasMoved) {
      longPressedSleep = true;
      goToSleep();
    }
  }, 600);

  document.addEventListener("pointermove", onPointerMove);
  document.addEventListener("pointerup", onPointerUp);
  document.addEventListener("pointercancel", onPointerUp);
};

const onPointerMove = (e) => {
  const dx = Math.abs(e.clientX - dragOffset.startX);
  const dy = Math.abs(e.clientY - dragOffset.startY);

  if (dx > 3 || dy > 3) {
    hasMoved = true;
    clearTimeout(pressTimer);
  }

  if (hasMoved) {
    if (!isDragging.value) {
      isDragging.value = true;
      if (isSleeping.value) {
        isSleeping.value = false;
        clearTimeout(sleepTimer);
        resumeIdle();
      }
    }

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
    savePosition();
    return;
  }

  // 长按入睡后释放：保持睡眠，不当作点击唤醒
  if (longPressedSleep) {
    longPressedSleep = false;
    isDragging.value = false;
    return;
  }

  isDragging.value = false;

  if (!hasMoved) {
    handleClick(e?.clientX, e?.clientY);
  }
};

// ==================== 设置面板 ====================
const toggleSettings = () => {
  showSettings.value = !showSettings.value;
};

const onContextMenu = (e) => {
  // 触屏长按会触发 contextmenu（约500ms），但长按已被用于入睡；
  // 因此仅鼠标右键（hover:hover 设备）打开设置面板，触屏走齿轮按钮。
  if (window.matchMedia("(hover: none)").matches) return;
  showSettings.value = true;
};

const setSize = (size) => {
  settings.size = size;
  nextTick(() => {
    const c = constrainPosition(position.x, position.y);
    position.x = c.x;
    position.y = c.y;
    savePosition();
  });
};

const resetPosition = () => {
  const pos = getRandomEdgePosition();
  position.x = pos.x;
  position.y = pos.y;
  savePosition();
};

const restoreCat = () => {
  settings.visible = true;
  showSettings.value = true;
  if (!isSleeping.value && !currentTrick.value) resumeIdle();
  if (settings.randomEvents) scheduleRandomEvent();
  if (settings.autoMove) startTeleport();
};

const handleEscape = (e) => {
  if (e.key === "Escape") showSettings.value = false;
};

// ==================== 可见性 / 尺寸 ====================
const handleResize = () => {
  isNarrow.value = window.innerWidth <= 768;
  viewportW.value = window.innerWidth;
  const constrained = constrainPosition(position.x, position.y);
  position.x = constrained.x;
  position.y = constrained.y;
  savePosition();
};

const handleVisibility = () => {
  if (document.hidden) {
    animInstance?.pause();
  } else {
    if (settings.visible && !isSleeping.value && !currentTrick.value) {
      resumeIdle();
    }
  }
};

watch(() => settings.visible, (v) => {
  if (!v) {
    stopTeleport();
    clearTimeout(randomEventTimer);
    showBubble.value = false;
    animInstance?.pause();
  } else {
    if (!isSleeping.value && !currentTrick.value) resumeIdle();
    if (settings.randomEvents) scheduleRandomEvent();
    if (settings.autoMove) startTeleport();
  }
});

watch(() => settings.autoMove, (v) => {
  if (v) startTeleport();
  else stopTeleport();
});

// ==================== 定时器 ====================
let teleportTimer = null;
let randomEventTimer = null;
let autoMoveTimer = null;
let sleepTimer = null;
let relocateTimer = null;
let trickTimer = null;
let heartIdCounter = 0;

// ==================== 生命周期 ====================
onMounted(async () => {
  await nextTick();
  initLottie();

  mqReduced.addEventListener("change", onReducedChange);
  window.addEventListener("keydown", handleEscape);

  if (props.initialDelay > 0) {
    setTimeout(() => {
      isHidden.value = false;
      if (!isSleeping.value && !currentTrick.value && settings.visible) resumeIdle();
    }, props.initialDelay);
  }

  const saved = loadPosition();
  if (saved) {
    const c = constrainPosition(saved.x, saved.y);
    position.x = c.x;
    position.y = c.y;
  } else {
    const pos = getRandomEdgePosition();
    position.x = pos.x;
    position.y = pos.y;
  }
  savePosition();

  if (settings.visible && settings.autoMove) startTeleport();
  if (settings.visible && settings.randomEvents) scheduleRandomEvent();

  window.addEventListener("resize", handleResize);
  window.addEventListener("wheel", handleWheel, { passive: true });
  window.addEventListener("mousemove", handleMouseMove, { passive: true });
  document.addEventListener("visibilitychange", handleVisibility);
});

// 滚轮互动：快速滚动时惊吓
let wheelAccum = 0;
let wheelTimer = null;
const handleWheel = () => {
  if (!settings.visible) return;
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
  stopTeleport();
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
  mqReduced.removeEventListener("change", onReducedChange);
  window.removeEventListener("keydown", handleEscape);
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("wheel", handleWheel);
  window.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("visibilitychange", handleVisibility);
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
  left: 0;
  top: 0;
  z-index: 2147483646;
  cursor: grab;
  opacity: 1;
  user-select: none;
  -webkit-user-select: none;
  touch-action: none;
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.26s ease, filter 0.25s ease;
  will-change: transform;
  filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.22));

  &.is-hidden {
    opacity: 0;
    pointer-events: none;
  }

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
      animation: spin-trick 1.05s cubic-bezier(0.45, 0.05, 0.35, 1) 1;
      transform-origin: center center;
      will-change: transform;
      transition: none;
      --look-x: 0px;
      --look-y: 0px;
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
  width: var(--cat-size, $pet-size);
  height: var(--cat-size, $pet-size);
  transition: transform 0.25s ease;
  transform: translate(var(--look-x, 0px), var(--look-y, 0px));
}

.cat-pet:hover:not(.is-dragging):not(.is-sleeping):not(.is-spinning):not(.is-auto-relocating) .cat-inner {
  transform: translate(var(--look-x, 0px), var(--look-y, 0px)) scale(1.06);
}

// ==================== 设置按钮 ====================
.cat-settings-btn {
  position: absolute;
  top: -16px;
  right: -14px;
  z-index: 20;
  width: 26px;
  height: 26px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.6) rotate(-20deg);
  transition: opacity 0.2s ease, transform 0.2s ease;
  pointer-events: none;

  &.is-active {
    opacity: 1;
    transform: scale(1) rotate(0deg);
    pointer-events: auto;
  }
}

.cat-pet:hover .cat-settings-btn {
  opacity: 1;
  transform: scale(1) rotate(0deg);
  pointer-events: auto;
}

@media (hover: none) {
  .cat-settings-btn {
    opacity: 0.55;
    transform: scale(0.9) rotate(0deg);
    pointer-events: auto;
  }
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
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;

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

  &.align-left {
    left: 0;
    transform: translateX(0);
  }

  &.align-right {
    left: auto;
    right: 0;
    transform: translateX(0);
  }

  &.align-left::after {
    left: 24px;
    transform: translateX(0);
  }

  &.align-right::after {
    left: auto;
    right: 24px;
    transform: translateX(0);
  }

  &.below {
    top: calc(100% + 10px);
  }

  &.below::after {
    bottom: auto;
    top: -6px;
    transform: translateX(-50%) rotate(180deg);
  }

  &.below.align-left::after {
    transform: translateX(0) rotate(180deg);
  }

  &.below.align-right::after {
    left: auto;
    right: 24px;
    transform: translateX(0) rotate(180deg);
  }

  &.happy {
    background: rgba(255, 245, 235, 0.96);
    color: #C8704A;
  }

  &.excited {
    background: rgba(255, 240, 245, 0.96);
    color: #C8708A;
    animation: bubble-bounce 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    transform-origin: center center;
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

.bubble-pop-enter-from.align-left {
  transform: translateX(0) translateY(10px) scale(0.6);
}
.bubble-pop-leave-to.align-left {
  transform: translateX(0) translateY(-6px) scale(0.7);
}
.bubble-pop-enter-from.align-right {
  transform: translateX(0) translateY(10px) scale(0.6);
}
.bubble-pop-leave-to.align-right {
  transform: translateX(0) translateY(-6px) scale(0.7);
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

// ==================== 设置面板 ====================
.cat-settings {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 2147483648;
  width: 240px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.22);
  color: #333;
  font-size: 13px;
  overflow: hidden;

  .settings-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    background: rgba(0, 0, 0, 0.02);

    .settings-title {
      font-weight: 600;
      font-size: 13px;
    }

    .settings-close {
      border: none;
      background: none;
      cursor: pointer;
      font-size: 13px;
      color: #888;
      width: 22px;
      height: 22px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background: rgba(0, 0, 0, 0.06);
        color: #333;
      }
    }
  }

  .settings-body {
    padding: 8px 14px 12px;
  }

  .setting-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0;
  }

  .toggle {
    position: relative;
    width: 38px;
    height: 21px;
    border: none;
    border-radius: 999px;
    background: #d4d4d4;
    cursor: pointer;
    transition: background 0.2s ease;
    padding: 0;

    .knob {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 17px;
      height: 17px;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
      transition: transform 0.2s ease;
    }

    &.on {
      background: #4ade80;

      .knob {
        transform: translateX(17px);
      }
    }
  }

  .size-group {
    display: flex;
    gap: 4px;

    button {
      border: 1px solid rgba(0, 0, 0, 0.12);
      background: #fff;
      color: #555;
      border-radius: 8px;
      padding: 3px 10px;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.15s ease;

      &.active {
        background: #4ade80;
        border-color: #4ade80;
        color: #fff;
      }
    }
  }

  .reset-btn {
    width: 100%;
    margin-top: 8px;
    padding: 7px 0;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background: #fff;
    color: #666;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
      background: rgba(0, 0, 0, 0.04);
      color: #333;
    }
  }
}

.panel-pop-enter-active,
.panel-pop-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.panel-pop-enter-from,
.panel-pop-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.96);
}

// ==================== 恢复按钮 ====================
.cat-restore-btn {
  position: fixed;
  right: 20px;
  bottom: 24px;
  z-index: 2147483648;
  width: 46px;
  height: 46px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.22);
  font-size: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 26px rgba(0, 0, 0, 0.28);
  }
}

.restore-pop-enter-active,
.restore-pop-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.restore-pop-enter-from,
.restore-pop-leave-to {
  opacity: 0;
  transform: scale(0.6) translateY(10px);
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
  15% { transform: rotate(55deg) scale(1.02); }
  35% { transform: rotate(125deg) scale(1.04); }
  55% { transform: rotate(200deg) scale(1.04); }
  75% { transform: rotate(285deg) scale(1.02); }
  92% { transform: rotate(345deg) scale(1.06); }
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
  0% { scale: 0.8; }
  100% { scale: 1; }
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

// ==================== 减弱动态效果 ====================
@media (prefers-reduced-motion: reduce) {
  .cat-inner {
    transition: none;
  }

  .is-spinning .cat-inner,
  .is-hopping .cat-inner,
  .is-standing .cat-inner,
  .is-frightened .cat-inner {
    animation-duration: 0.3s !important;
    animation-iteration-count: 1 !important;
  }

  .sleep-zzz .z {
    animation: none !important;
    opacity: 0.6 !important;
  }
}

// ==================== MOBILE ====================
@media (max-width: 768px) {
  .cat-pet {
    filter: drop-shadow(0 3px 10px rgba(0, 0, 0, 0.16));
  }

  .cat-inner {
    width: var(--cat-size, $pet-size-mobile);
    height: var(--cat-size, $pet-size-mobile);
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

  .cat-settings {
    right: 12px;
    bottom: 12px;
    width: 220px;
  }
}
</style>
