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
        'is-walking': currentTrick === 'walking',
        'is-running': currentTrick === 'running',
        'is-stretching': currentTrick === 'stretching',
        'is-playing': currentTrick === 'playing',
        'is-waving': isWaving,
        'is-frightened': isFrightened,
        'is-eating': isEating,
        'is-attentive': isMouseNear,
        'is-feedback-active': showBubble || isPetted || isExcited || isWaving || isEating || isSleeping || currentTrick,
        'is-hidden': isHidden || !settings.visible,
      }"
      :style="positionStyle"
      ref="catRef"
      role="group"
      :aria-label="`宠物28，当前${moodLabel}`"
      @pointerdown.prevent="onPointerDown"
      @click.stop
      @contextmenu.prevent="onContextMenu"
    >
      <div class="pet-aura" aria-hidden="true"><span></span><i></i></div>
      <div class="cat-inner" :style="{ width: catSizePx, height: catSizePx }">
        <Transition name="pose-crossfade">
          <img
            :key="currentPetImage"
            class="pet-art"
            :src="currentPetImage"
            alt="灰色英短猫咪28"
            draggable="false"
          />
        </Transition>

        <!-- 喂食时的食物碗 -->
        <div v-if="isEating" class="food-bowl" aria-hidden="true">
          <i class="food-steam steam-one"></i>
          <i class="food-steam steam-two"></i>
          <span class="food-dish"><i></i></span>
        </div>

        <div class="cat-paw-wave" v-if="isWaving">
          <div class="wave-paw"></div>
        </div>

        <div v-if="currentTrick === 'playing'" class="play-ball" aria-hidden="true">🧶</div>

        <Transition name="pet-shine">
          <div v-if="isPetted" class="pet-shine" :style="petShineStyle"></div>
        </Transition>
      </div>

      <div class="pet-status-pill" aria-live="polite">
        <span class="status-pulse" aria-hidden="true"></span>
        <span>{{ activityLabel }}</span>
      </div>

      <div class="quick-actions" aria-label="28互动">
        <button type="button" title="抚摸28" aria-label="抚摸28" @pointerdown.stop @click.stop="petCat"><span>🤍</span><small>摸摸</small></button>
        <button type="button" title="给28喂食" aria-label="给28喂食" @pointerdown.stop @click.stop="feedCat"><span>🍖</span><small>喂食</small></button>
        <button type="button" title="陪28玩" aria-label="陪28玩" @pointerdown.stop @click.stop="playWithCat"><span>🧶</span><small>玩耍</small></button>
        <button type="button" title="让28睡觉" aria-label="让28睡觉" @pointerdown.stop @click.stop="goToSleep"><span>🌙</span><small>休息</small></button>
      </div>

      <button
        class="cat-settings-btn"
        :class="{ 'is-active': showSettings }"
        aria-label="宠物设置"
        title="宠物设置"
        @pointerdown.stop
        @click.stop="toggleSettings"
      ><span aria-hidden="true">⚙</span></button>

      <Transition name="bubble-pop">
        <div
          v-if="showBubble"
          class="speech-bubble"
          :class="[bubbleType, 'align-' + bubbleAlign, bubbleBelow ? 'below' : '']"
          :style="bubbleStyle"
        >
          <svg class="bubble-cloud-art" viewBox="0 0 220 108" aria-hidden="true">
            <path d="M19 65C10 49 20 33 41 29C47 12 71 8 89 19C103 2 129 3 143 18C160 6 187 10 192 31C214 31 222 49 211 65C220 81 204 95 184 91C168 103 143 99 128 91C111 103 83 100 74 91C49 98 25 89 30 75C17 74 11 68 19 65Z" />
          </svg>
          <span class="bubble-doodles" aria-hidden="true">
            <i class="doodle doodle-yellow doodle-one"></i>
            <i class="doodle doodle-cyan doodle-two"></i>
            <i class="doodle doodle-pink doodle-three"></i>
            <i class="doodle doodle-yellow doodle-four"></i>
            <i class="doodle doodle-cyan doodle-five"></i>
            <i class="doodle doodle-pink doodle-six"></i>
          </span>
          <span class="bubble-emoji" v-if="bubbleEmoji" aria-hidden="true">{{ bubbleEmoji }}</span>
          <span class="bubble-copy">{{ currentBubble }}</span>
        </div>
      </Transition>

      <TransitionGroup name="float-heart" tag="div" class="hearts-container">
        <span
          v-for="heart in floatingHearts"
          :key="heart.id"
          class="float-heart"
          :style="heart.style"
          aria-hidden="true"
        ></span>
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

    </div>

    <!-- 设置面板 -->
    <Transition name="panel-pop">
      <div v-if="showSettings" class="cat-settings" @click.stop>
        <div class="settings-header">
          <div class="settings-heading">
            <small>LEVI / DESKTOP PET</small>
            <span class="settings-title">28的小窝</span>
          </div>
          <button class="settings-close" @click="showSettings = false" aria-label="关闭">✕</button>
        </div>
        <div class="settings-body">
          <div class="pet-summary">
            <img :src="currentPetImage" alt="" />
            <div>
              <strong>28</strong>
              <span>{{ moodEmoji }} {{ moodLabel }}</span>
            </div>
          </div>
          <div class="care-meters" aria-label="28状态">
            <div v-for="meter in careMeters" :key="meter.key" class="care-meter">
              <span>{{ meter.icon }} {{ meter.label }}</span>
              <div class="meter-track" role="progressbar" :aria-label="meter.label" aria-valuemin="0" aria-valuemax="100" :aria-valuenow="meter.value">
                <i :style="{ width: `${meter.value}%`, background: meter.color }"></i>
              </div>
              <b>{{ meter.value }}</b>
            </div>
          </div>
          <div class="panel-actions">
            <button type="button" @click="petCat">🤍 抚摸</button>
            <button type="button" @click="feedCat">🍖 喂食</button>
            <button type="button" @click="playWithCat">🧶 玩耍</button>
            <button type="button" @click="goToSleep">🌙 睡觉</button>
          </div>
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

  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount, nextTick } from "vue";
import petImage from "./huihui-pet.png";
import waveImage from "./huihui-wave.png";
import playImage from "./huihui-play.png";
import sleepImage from "./huihui-sleep.png";
import walkImage from "./huihui-walk.png";
import stretchImage from "./huihui-stretch.png";

const petShineStyle = { "--pet-mask": `url(${petImage})` };

const props = defineProps({
  initialDelay: { type: Number, default: 0 },
});

const catRef = ref(null);

// ==================== 设置持久化 ====================
const SETTINGS_KEY = "levi-catpet-settings-v1";
const POS_KEY = "levi-catpet-pos-v1";
const CARE_KEY = "levi-catpet-care-v1";

const defaultSettings = {
  visible: true,
  randomEvents: true,
  autoMove: true,
  size: "small",
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

// ==================== 照料状态持久化 ====================
const clampCare = (value) => Math.max(0, Math.min(100, Math.round(value)));

const loadCare = () => {
  const defaults = { happiness: 82, satiety: 74, energy: 78, updatedAt: Date.now() };
  try {
    const raw = localStorage.getItem(CARE_KEY);
    if (!raw) return defaults;
    const saved = { ...defaults, ...JSON.parse(raw) };
    const elapsedHours = Math.min(48, Math.max(0, (Date.now() - saved.updatedAt) / 3600000));
    return {
      happiness: clampCare(saved.happiness - elapsedHours * 0.8),
      satiety: clampCare(saved.satiety - elapsedHours * 2.4),
      energy: clampCare(saved.energy - elapsedHours * 1.2),
      updatedAt: Date.now(),
    };
  } catch (e) { /* ignore */ }
  return defaults;
};

const care = reactive(loadCare());

const saveCare = () => {
  try {
    localStorage.setItem(CARE_KEY, JSON.stringify({ ...care, updatedAt: Date.now() }));
  } catch (e) { /* ignore */ }
};

const updateCare = ({ happiness = 0, satiety = 0, energy = 0 }) => {
  care.happiness = clampCare(care.happiness + happiness);
  care.satiety = clampCare(care.satiety + satiety);
  care.energy = clampCare(care.energy + energy);
  care.updatedAt = Date.now();
};

watch(care, saveCare, { deep: true });

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
const isMouseNear = ref(false);
const showBubble = ref(false);
const currentBubble = ref("");
const bubbleEmoji = ref("");
const bubbleType = ref("");
const floatingHearts = ref([]);
const ripples = ref([]);
let rippleIdCounter = 0;
const currentTrick = ref("");
const walkDuration = ref(2400);
const walkDirection = ref(1);
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

const mood = computed(() => {
  const average = (care.happiness + care.satiety + care.energy) / 3;
  if (isSleeping.value) return { label: "正在打盹", emoji: "💤" };
  if (care.satiety < 25) return { label: "有点饿了", emoji: "🍽️" };
  if (care.energy < 25) return { label: "想休息", emoji: "🥱" };
  if (care.happiness < 35) return { label: "想要陪伴", emoji: "🥺" };
  if (average >= 85) return { label: "超级满足", emoji: "😻" };
  if (average >= 65) return { label: "心情不错", emoji: "😊" };
  return { label: "安静观察中", emoji: "🐾" };
});

const moodLabel = computed(() => mood.value.label);
const moodEmoji = computed(() => mood.value.emoji);
const currentPetImage = computed(() => {
  if (isSleeping.value) return sleepImage;
  if (currentTrick.value === "walking" || currentTrick.value === "running") return walkImage;
  if (currentTrick.value === "stretching") return stretchImage;
  if (currentTrick.value === "playing") return playImage;
  if (isWaving.value) return waveImage;
  return petImage;
});
const activityLabel = computed(() => {
  if (isSleeping.value) return "正在打盹";
  if (isEating.value) return "认真干饭";
  if (currentTrick.value === "running") return "正在小跑";
  if (currentTrick.value === "walking") return "正在散步";
  if (currentTrick.value === "stretching") return "伸个懒腰";
  if (currentTrick.value === "playing") return "准备扑球";
  if (isWaving.value) return "向你挥爪";
  if (isDragging.value) return "跟着你走";
  return "正在观察你";
});
const careMeters = computed(() => [
  { key: "happiness", label: "心情", icon: "💗", value: care.happiness, color: "#f472b6" },
  { key: "satiety", label: "饱腹", icon: "🍖", value: care.satiety, color: "#f59e0b" },
  { key: "energy", label: "精力", icon: "⚡", value: care.energy, color: "#38bdf8" },
]);
const bubbleStyle = computed(() => {
  const mobile = isMobile || isNarrow.value;
  const scale = petSize.value / basePetSize.value;
  const baseHeight = mobile ? 94 : 108;
  const baseFontSize = mobile ? 11 : 13;
  const baseTop = mobile ? 56 : 66;
  const fontSize = Math.max(10, Math.round(baseFontSize * scale * 10) / 10);
  const paddingX = Math.round((mobile ? 26 : 30) * scale);
  const emojiSize = Math.max(13, Math.round((mobile ? 14 : 16) * scale));
  const textWidth = Array.from(currentBubble.value || "").reduce((width, char) => {
    const codePoint = char.codePointAt(0) || 0;
    if (char === " ") return width + fontSize * 0.4;
    return width + fontSize * (codePoint > 255 ? 0.95 : 0.65);
  }, 0);
  const emojiWidth = bubbleEmoji.value ? emojiSize + 8 : 0;
  const contentWidth = textWidth + emojiWidth + paddingX * 2 + 12;
  const minWidth = Math.round((mobile ? 154 : 160) * scale);
  const maxWidth = Math.round((mobile ? 220 : 270) * scale);
  const bubbleWidth = Math.max(minWidth, Math.min(maxWidth, Math.ceil(contentWidth)));
  const copyWidth = Math.max(82, bubbleWidth - paddingX * 2 - emojiWidth - 12);
  const lineCount = Math.max(1, Math.ceil((textWidth + emojiWidth) / copyWidth));

  return {
    "--bubble-width": `${bubbleWidth}px`,
    "--bubble-height": `${Math.round((baseHeight + Math.max(0, lineCount - 1) * 14) * scale)}px`,
    "--bubble-font-size": `${fontSize}px`,
    "--bubble-padding-x": `${paddingX}px`,
    "--bubble-copy-width": `${Math.round(copyWidth)}px`,
    "--bubble-emoji-size": `${emojiSize}px`,
    "--bubble-top": `-${Math.round(baseTop * scale)}px`,
    "--bubble-doodle-scale": Math.max(0.82, Math.min(1, scale)),
  };
});

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
  const movementTransition = currentTrick.value === "walking" || currentTrick.value === "running"
    ? `transform ${walkDuration.value}ms linear, opacity 0.26s ease, filter 0.25s ease`
    : "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.26s ease, filter 0.25s ease";
  return {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    "--walk-scale-x": walkDirection.value < 0 ? "-1" : "1",
    transition: isDragging.value ? "none" : movementTransition,
  };
});

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
  && !isPetted.value
  && !isExcited.value
  && !isWaving.value
);

// ==================== 位移 ====================
const getRandomWalkPosition = () => {
  const bounds = getViewportBounds();
  return constrainPosition(
    bounds.minX + Math.random() * Math.max(0, bounds.maxX - bounds.minX),
    bounds.minY + Math.random() * Math.max(0, bounds.maxY - bounds.minY),
  );
};

const walkToPosition = (nextPosition, bubbleData) => {
  if (!canStartAction() || reducedMotion.value) return false;
  clearTimeout(relocateTimer);
  const constrainedPosition = constrainPosition(nextPosition.x, nextPosition.y);
  const distance = Math.hypot(
    constrainedPosition.x - position.x,
    constrainedPosition.y - position.y,
  );

  if (distance < 36) return false;

  walkDirection.value = constrainedPosition.x >= position.x ? 1 : -1;
  walkDuration.value = Math.max(1800, Math.min(5600, Math.round(1200 + distance * 3.2)));
  currentTrick.value = distance > Math.max(280, petSize.value * 1.8) ? "running" : "walking";
  position.x = constrainedPosition.x;
  position.y = constrainedPosition.y;
  savePosition();

  if (bubbleData) showMeow(bubbleData);

  relocateTimer = setTimeout(() => {
    if (currentTrick.value === "walking" || currentTrick.value === "running") currentTrick.value = "";
  }, walkDuration.value + 80);

  return true;
};

const teleportToEdge = () => {
  if (!settings.autoMove || !settings.visible) return;
  walkToPosition(getRandomWalkPosition(), { text: "去看看~", emoji: "🐾", type: "curious" });
};

const resetTrickState = () => {
  currentTrick.value = "";
};

const FLASHY_TRICKS = new Set(["standing", "spinning", "hopping", "playing", "walking", "stretching"]);

const performTrick = ({
  name,
  duration,
  bubble,
  hearts,
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
  bubble: { text: "看我站起来!", emoji: "🐱", type: "playful" },
});

const spinAround = () => performTrick({
  name: "spinning",
  duration: 1050,
  bubble: { text: "转圈圈~", emoji: "🌀", type: "excited" },
  hearts: { count: 3, emojis: ["✨", "🌀", "⭐"] },
});

const happyHop = () => performTrick({
  name: "hopping",
  duration: 1000,
  bubble: { text: "蹦蹦喵!", emoji: "🐾", type: "happy" },
  hearts: { count: 3, emojis: ["💫", "✨", "💕"] },
});

const stretchCat = () => {
  const started = performTrick({
    name: "stretching",
    duration: 2600,
    bubble: { text: "伸个懒腰~", emoji: "🌤️", type: "sleepy" },
    hearts: { count: 2, emojis: ["✨", "🐾"] },
  });
  if (started) updateCare({ happiness: 3, energy: -1 });
};

const playWithCat = () => {
  if (care.energy < 10) {
    showMeow({ text: "先让我歇一会儿~", emoji: "🥱", type: "sleepy" });
    return;
  }

  const started = performTrick({
    name: "playing",
    duration: 1800,
    bubble: { text: "抓住毛线球!", emoji: "🧶", type: "playful" },
    hearts: { count: 4, emojis: ["🧶", "✨", "💗"] },
  });
  if (started) updateCare({ happiness: 16, satiety: -4, energy: -9 });
};

const sparkleMoment = () => {
  if (!canStartAction() || isPetted.value || isExcited.value || isWaving.value) return;
  showMeow({ text: "嘿嘿~", emoji: "✨", type: "excited" });
  spawnHearts(3, ["✨", "💖", "🌟"]);
};

// ==================== 随机事件 ====================
const triggerRandomEvent = () => {
  if (!settings.visible || !settings.randomEvents) return;
  if (!canStartAction() || showBubble.value || isPetted.value || isExcited.value || isWaving.value || isEating.value) return;

  if (care.satiety < 25) {
    showMeow({ text: "肚子咕咕叫了...", emoji: "🍖", type: "playful" });
    return;
  }
  if (care.energy < 22) {
    goToSleep();
    return;
  }

  const r = Math.random();
  if (r < 0.18) {
    showMeow();
    return;
  }
  if (r < 0.3) {
    walkToPosition(getRandomWalkPosition(), { text: "去看看~", emoji: "🐾", type: "curious" });
    return;
  }
  if (r < 0.4) {
    stretchCat();
    return;
  }
  if (r < 0.49) {
    showMeow({ text: "摸摸我嘛~", emoji: "🥺", type: "playful" });
    return;
  }
  if (r < 0.59) {
    wavePaw();
    return;
  }
  if (r < 0.69) {
    standUp();
    return;
  }
  if (r < 0.77) {
    spinAround();
    return;
  }
  if (r < 0.85) {
    happyHop();
    return;
  }
  if (r < 0.91) {
    playWithCat();
    return;
  }
  if (r < 0.96) {
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
  clearTimeout(teleportTimer);
  if (!settings.visible || !settings.autoMove) return;
  teleportTimer = setTimeout(() => {
    teleportToEdge();
    startTeleport();
  }, 55000 + Math.random() * 45000);
};

const stopTeleport = () => {
  clearTimeout(teleportTimer);
};

// ==================== 睡眠 ====================
const goToSleep = () => {
  if (isSleeping.value || isDragging.value || currentTrick.value) return;
  isSleeping.value = true;
  showMeow({ text: "Zzz...", emoji: "💤", type: "sleepy" });

  clearTimeout(sleepTimer);
  sleepTimer = setTimeout(() => {
    wakeUp();
  }, 8000 + Math.random() * 10000);
};

const wakeUp = () => {
  if (!isSleeping.value) return;
  isSleeping.value = false;
  updateCare({ energy: 18, happiness: 2 });
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

// 默认贴在猫咪头部右上方，只有猫咪非常靠近顶部时才翻到下方，避免气泡被窗口裁掉。
const bubbleBelow = computed(() => position.y < 74);

// ==================== 爱心 / 波纹 ====================
const spawnHearts = (count, emojis) => {
  for (let i = 0; i < count; i++) {
    const id = ++heartIdCounter;
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];

    floatingHearts.value.push({
      id,
      emoji,
      style: {
        animationDelay: `${i * 0.08}s`,
        "--heart-color": i % 3 === 0 ? "#fbbf24" : i % 3 === 1 ? "#f472b6" : "#67e8f9",
      },
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
  updateCare({ happiness: 8 });

  const reactions = [
    { text: "呼噜噜~", emoji: "😻", type: "happy" },
    { text: "再摸摸!", emoji: "🥰", type: "happy" },
    { text: "好舒服喵~", emoji: "💕", type: "happy" },
  ];
  showMeow(reactions[Math.floor(Math.random() * reactions.length)]);
  spawnHearts(4, ["💕", "❤️", "✨"]);

  setTimeout(() => {
    isPetted.value = false;
  }, 2000);
};

const exciteCat = () => {
  if (!settings.visible || isHidden.value) return;
  if (isExcited.value || isSleeping.value || isAutoRelocating.value || currentTrick.value) return;
  isExcited.value = true;
  updateCare({ happiness: 12, energy: -3 });

  showMeow({ text: "好开心!!", emoji: "🎉", type: "excited" });
  spawnHearts(6, ["💖", "🌟", "✨", "💝"]);

  setTimeout(() => {
    isExcited.value = false;
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
  updateCare({ satiety: 24, happiness: 5, energy: 2 });
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
  const distance = Math.hypot(dx, dy);
  const maxTilt = 9;
  const tiltX = Math.max(-maxTilt, Math.min(maxTilt, dx * 0.035));
  const tiltY = Math.max(-7, Math.min(7, dy * 0.028));
  const tiltRotate = Math.max(-3.5, Math.min(3.5, dx * 0.012));
  isMouseNear.value = distance < 420;
  if (lookTimer) return;
  lookTimer = requestAnimationFrame(() => {
    catRef.value?.style.setProperty("--look-x", `${tiltX}px`);
    catRef.value?.style.setProperty("--look-y", `${tiltY}px`);
    catRef.value?.style.setProperty("--look-rotate", `${tiltRotate}deg`);
    catRef.value?.style.setProperty("--look-scale", distance < 220 ? "1.025" : "1");
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
    const actions = [petCat, petCat, petCat, wavePaw, playWithCat, feedCat];
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
      if (currentTrick.value === "walking" || currentTrick.value === "running") {
        clearTimeout(relocateTimer);
        currentTrick.value = "";
      }
      if (isSleeping.value) {
        isSleeping.value = false;
        clearTimeout(sleepTimer);
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
  if (settings.randomEvents) scheduleRandomEvent();
  if (settings.autoMove) startTeleport();
};

const notifyPetVisibility = (visible) => {
  window.dispatchEvent(
    new CustomEvent("levi-cat-pet-visibility", { detail: { visible } }),
  );
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

watch(() => settings.visible, (v) => {
  notifyPetVisibility(v);
  if (!v) {
    stopTeleport();
    clearTimeout(randomEventTimer);
    showBubble.value = false;
  } else {
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
let careTickTimer = null;
let heartIdCounter = 0;

// ==================== 生命周期 ====================
onMounted(async () => {
  await nextTick();

  mqReduced.addEventListener("change", onReducedChange);
  window.addEventListener("keydown", handleEscape);
  window.addEventListener("levi-cat-pet-restore", restoreCat);
  notifyPetVisibility(settings.visible);

  if (props.initialDelay > 0) {
    setTimeout(() => {
      isHidden.value = false;
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
  careTickTimer = setInterval(() => {
    updateCare({ happiness: -1, satiety: -2, energy: -1 });
  }, 5 * 60 * 1000);

  window.addEventListener("resize", handleResize);
  window.addEventListener("wheel", handleWheel, { passive: true });
  window.addEventListener("mousemove", handleMouseMove, { passive: true });
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
  clearInterval(careTickTimer);
  if (lookTimer) cancelAnimationFrame(lookTimer);
  saveCare();
  mqReduced.removeEventListener("change", onReducedChange);
  window.removeEventListener("keydown", handleEscape);
  window.removeEventListener("levi-cat-pet-restore", restoreCat);
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

  &.is-attentive {
    filter: drop-shadow(0 7px 22px rgba(20, 184, 166, 0.24));

    .pet-aura {
      opacity: 1;
      transform: scale(1.02);
    }
  }

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
    .pet-art {
      animation: none;
      transform: none;
      filter: saturate(0.86) brightness(0.92);
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

  &.is-walking {
    .cat-inner {
      animation: cat-walk-bob 0.52s ease-in-out infinite;
      transform-origin: center bottom;
    }
    .pet-art {
      animation: none;
      transform: none;
    }
  }

  &.is-running {
    .cat-inner {
      animation: cat-walk-bob 0.38s ease-in-out infinite;
      transform-origin: center bottom;
    }
    .pet-art {
      animation: none;
      transform: translateY(1px) scale(1.015, 0.985);
    }
  }

  &.is-stretching {
    .cat-inner {
      animation: stretch-breathe 1.3s ease-in-out 2;
      transform-origin: center bottom;
    }
    .pet-art {
      animation: none;
      transform: none;
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
    .pet-art {
      animation: none;
      transform: translateY(5%) rotate(2deg) scaleY(0.97);
    }
  }

  &.is-playing {
    .cat-inner {
      animation: play-pounce 0.6s cubic-bezier(0.22, 1, 0.36, 1) 3;
      transform-origin: center bottom;
    }
    .pet-art {
      animation: none;
      transform: none;
    }
  }

  &.is-waving {
    .cat-paw-wave {
      display: none;
    }
  }
}

.cat-inner {
  position: relative;
  width: var(--cat-size, $pet-size);
  height: var(--cat-size, $pet-size);
  transition: transform 0.25s ease;
  transform: translate(var(--look-x, 0px), var(--look-y, 0px)) rotate(var(--look-rotate, 0deg)) scale(var(--look-scale, 1));
}

.pet-aura {
  position: absolute;
  inset: 9%;
  border-radius: 42% 58% 52% 48%;
  background: radial-gradient(circle, rgba(6, 182, 212, 0.2), rgba(6, 182, 212, 0.08) 48%, transparent 72%);
  opacity: 0.46;
  transform: scale(0.94);
  filter: blur(7px);
  transition: opacity 0.35s ease, transform 0.35s ease;
  pointer-events: none;

  span,
  i {
    position: absolute;
    display: block;
    border: 1px solid rgba(6, 182, 212, 0.3);
    border-radius: 50%;
    inset: 8%;
    animation: aura-orbit 4.5s linear infinite;
  }

  i {
    inset: 18%;
    border-color: rgba(6, 182, 212, 0.18);
    animation-duration: 6s;
    animation-direction: reverse;
  }
}

.pet-art {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center bottom;
  pointer-events: none;
  transform-origin: center bottom;
  animation: cat-idle-breathe 3.2s ease-in-out infinite;
  transition: filter 0.25s ease, transform 0.25s ease;
}

@keyframes cat-idle-breathe {
  0%, 100% { transform: translateY(0) scale(1); }
  45% { transform: translateY(-2px) scale(1.012, 1.02); }
  55% { transform: translateY(-2px) scale(1.012, 1.02); }
}

.pose-crossfade-enter-active,
.pose-crossfade-leave-active {
  transition:
    opacity 0.26s var(--ease-standard),
    transform 0.34s var(--ease-out-expo),
    filter 0.26s var(--ease-standard);
}

.pose-crossfade-enter-from {
  opacity: 0;
  transform: translateY(8px) scale(0.96);
  filter: blur(2px) saturate(0.82);
}

.pose-crossfade-leave-active {
  position: absolute;
  inset: 0;
}

.pose-crossfade-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(1.02);
  filter: blur(2px) saturate(0.88);
}

.cat-pet:hover:not(.is-dragging):not(.is-sleeping):not(.is-spinning):not(.is-walking):not(.is-stretching):not(.is-auto-relocating) .cat-inner {
  transform: translate(var(--look-x, 0px), var(--look-y, 0px)) rotate(var(--look-rotate, 0deg)) scale(1.06);
}

// ==================== STATUS ====================
.pet-status-pill {
  position: absolute;
  top: -30px;
  left: 50%;
  z-index: 18;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: 150px;
  padding: 5px 9px;
  border: 1px solid var(--border-color);
  border-radius: 999px;
  background: var(--theme-color);
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.18);
  backdrop-filter: blur(10px);
  color: var(--color);
  font-size: 10px;
  letter-spacing: 0.02em;
  white-space: nowrap;
  pointer-events: none;
  transform: translateX(-50%) translateY(3px);
  opacity: 0.72;
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.cat-pet:hover .pet-status-pill,
.cat-pet.is-attentive .pet-status-pill,
.cat-pet:focus-within .pet-status-pill {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.status-pulse {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #5eead4;
  box-shadow: 0 0 0 3px rgba(94, 234, 212, 0.14);
  animation: status-pulse 1.8s ease-out infinite;
}

// ==================== 设置按钮 ====================
.cat-settings-btn {
  position: absolute;
  top: -18px;
  right: -12px;
  z-index: 20;
  width: 30px;
  height: 30px;
  padding: 0;
  border: 1px solid var(--border-color);
  border-radius: 50%;
  background: var(--theme-color);
  box-shadow: var(--shadow-raise), 0 0 0 4px var(--accent-soft-bg);
  color: var(--text-secondary);
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.6) rotate(-20deg);
  transition: opacity 0.2s var(--ease-standard), transform 0.2s var(--ease-out-expo), color 0.2s ease, background 0.2s ease;
  pointer-events: none;

  span {
    display: block;
    transition: transform 0.35s var(--ease-out-expo);
  }

  &.is-active {
    opacity: 1;
    transform: scale(1) rotate(0deg);
    pointer-events: auto;
    color: var(--theme-btn-hover-color);

    span {
      transform: rotate(90deg);
    }
  }
}

.cat-pet:hover .cat-settings-btn {
  opacity: 1;
  transform: scale(1) rotate(0deg);
  pointer-events: auto;
}

.cat-settings-btn:hover,
.cat-settings-btn:focus-visible {
  background: var(--accent-soft-bg-strong);
  color: var(--theme-btn-hover-color);
  outline: none;
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
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 42px;
  height: 34px;
  z-index: 4;
  pointer-events: none;

  .food-steam {
    position: absolute;
    bottom: 19px;
    width: 5px;
    height: 10px;
    border-left: 1.5px solid rgba(255, 255, 255, 0.82);
    border-radius: 50%;
    opacity: 0;
    animation: food-steam-rise 1.6s ease-out infinite;
  }

  .steam-one {
    left: 15px;
  }

  .steam-two {
    left: 24px;
    animation-delay: 0.55s;
  }

  .food-dish {
    position: absolute;
    left: 3px;
    bottom: 0;
    width: 36px;
    height: 18px;
    border: 1px solid rgba(255, 255, 255, 0.46);
    border-radius: 5px 5px 15px 15px;
    background: linear-gradient(180deg, #f7b267 0%, #e9895b 46%, #b85f52 100%);
    box-shadow: 0 5px 10px rgba(91, 53, 58, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.42);
    transform-origin: center top;
    animation: food-dish-bob 0.72s ease-in-out infinite alternate;

    &::before {
      content: "";
      position: absolute;
      top: -4px;
      left: 2px;
      width: 30px;
      height: 8px;
      border: 1px solid rgba(255, 255, 255, 0.58);
      border-radius: 50%;
      background: radial-gradient(ellipse at 45% 42%, #6f4744 0 20%, #8f5349 23% 48%, #663f40 53% 100%);
      box-shadow: 0 2px 4px rgba(91, 53, 58, 0.2);
    }

    i {
      position: absolute;
      top: 0;
      left: 9px;
      width: 5px;
      height: 3px;
      border-radius: 50%;
      background: #f7b267;
      box-shadow: 9px 1px 0 #e8a15f, 14px -1px 0 #f6c270;
      z-index: 1;
    }
  }
}

@keyframes food-dish-bob {
  0% { transform: rotate(-2deg) translateY(1px); }
  100% { transform: rotate(2deg) translateY(-1px); }
}

@keyframes food-steam-rise {
  0% { opacity: 0; transform: translateY(4px) scale(0.8); }
  30% { opacity: 0.7; }
  100% { opacity: 0; transform: translate(3px, -12px) scale(1.15); }
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

.play-ball {
  position: absolute;
  right: -4%;
  bottom: 2%;
  z-index: 6;
  font-size: clamp(18px, 22%, 34px);
  pointer-events: none;
  animation: yarn-roll 0.6s ease-in-out infinite alternate;
}

// ==================== QUICK ACTIONS ====================
.quick-actions {
  position: absolute;
  left: 50%;
  bottom: -48px;
  z-index: 22;
  display: flex;
  gap: 3px;
  padding: 5px;
  border: 1px solid var(--border-color);
  border-radius: calc(var(--theme-radius) + 4px);
  background: var(--theme-color);
  box-shadow: var(--shadow-raise), 0 0 0 4px var(--accent-soft-bg);
  backdrop-filter: blur(10px);
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, -4px) scale(0.88);
  transition: opacity 0.2s ease, transform 0.2s ease;

  button {
    display: grid;
    width: 46px;
    height: 37px;
    padding: 3px 5px;
    border: 0;
    border-radius: var(--theme-min-radius);
    background: transparent;
    cursor: pointer;
    color: var(--text-secondary);
    line-height: 1;
    transition: background 0.15s ease, transform 0.15s ease;

    span {
      font-size: 15px;
    }

    small {
      font-size: 9px;
      line-height: 1;
    }

    &:hover,
    &:focus-visible {
      background: var(--accent-soft-bg);
      color: var(--theme-btn-hover-color);
      transform: translateY(-2px);
      outline: none;
    }
  }
}

.cat-pet:hover .quick-actions,
.cat-pet:focus-within .quick-actions {
  opacity: 1;
  pointer-events: auto;
  transform: translate(-50%, 0) scale(1);
}

// 交互反馈优先展示，避免工具栏遮住气泡、食物碗和动作特效。
.cat-pet.is-feedback-active .quick-actions {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translate(-50%, -4px) scale(0.88);
}

// ==================== SPEECH BUBBLE ====================
.speech-bubble {
  position: absolute;
  top: var(--bubble-top, -66px);
  left: 62%;
  z-index: 40;
  width: var(--bubble-width, 220px);
  height: var(--bubble-height, 108px);
  transform: translateX(-4%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 0 var(--bubble-padding-x, 30px);
  color: #20252b;
  font-size: var(--bubble-font-size, 13px);
  font-weight: 600;
  letter-spacing: 0.015em;
  white-space: normal;
  pointer-events: none;

  .bubble-cloud-art {
    position: absolute;
    inset: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
    filter: drop-shadow(0 3px 0 rgba(15, 23, 42, 0.12));

    path {
      fill: #fffefa;
      stroke: #1d2228;
      stroke-width: 3.2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  }

  .bubble-doodles {
    position: absolute;
    inset: -12px -16px;
    z-index: 1;
    pointer-events: none;
    transform: scale(var(--bubble-doodle-scale, 1));

    .doodle {
      position: absolute;
      display: block;
      width: 4px;
      height: 13px;
      border-radius: 999px;
      transform-origin: center;
      box-shadow: 0 1px 0 rgba(15, 23, 42, 0.12);
    }

    .doodle-yellow { background: #f5d51f; }
    .doodle-cyan { background: #27b7e8; }
    .doodle-pink { background: #e94792; }

    .doodle-one { left: 26px; top: 14px; transform: rotate(58deg); }
    .doodle-two { left: 126px; top: 0; transform: rotate(-38deg); }
    .doodle-three { right: 23px; top: 12px; transform: rotate(-42deg); }
    .doodle-four { right: 8px; top: 48px; height: 9px; transform: rotate(48deg); }
    .doodle-five { left: 5px; top: 57px; height: 16px; transform: rotate(48deg); }
    .doodle-six { right: 35px; bottom: 5px; transform: rotate(32deg); }
  }

  .bubble-emoji {
    display: grid;
    position: relative;
    z-index: 2;
    flex: 0 0 auto;
    place-items: center;
    font-size: var(--bubble-emoji-size, 16px);
    line-height: 1;
  }

  .bubble-copy {
    position: relative;
    z-index: 2;
    max-width: var(--bubble-copy-width, 150px);
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }

  &::after {
    content: "";
    position: absolute;
    top: calc(100% - 7px);
    left: 12px;
    width: 18px;
    height: 18px;
    border-left: 1.5px solid rgba(29, 34, 40, 0.72);
    border-bottom: 1.5px solid rgba(29, 34, 40, 0.72);
    border-bottom-left-radius: 14px;
    transform: rotate(-18deg);
    transform-origin: top left;
    filter: drop-shadow(0 1px 1px rgba(15, 23, 42, 0.12));
    opacity: 0.88;
  }

  &.align-left {
    left: 8px;
    transform: translateX(0);
  }

  &.align-right {
    left: auto;
    right: 0;
    transform: translateX(0);
  }

  &.align-left::after {
    left: 88px;
    transform: rotate(-18deg);
  }

  &.align-right::after {
    left: auto;
    right: 12px;
    transform: scaleX(-1) rotate(-18deg);
  }

  &.below {
    top: calc(100% + 10px);
  }

  &.below::after {
    top: -11px;
    transform: rotate(162deg);
  }

  &.below.align-left::after {
    transform: rotate(162deg);
  }

  &.below.align-right::after {
    left: auto;
    right: 12px;
    transform: scaleX(-1) rotate(162deg);
  }

  &.happy {
    color: #a65f3f;
  }

  &.excited {
    color: #b34f78;
    animation: bubble-bounce 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    transform-origin: center center;
  }

  &.sleepy {
    color: #64748b;
  }

  &.playful {
    color: #4f7a66;
  }

  &.curious {
    color: #596b9e;
  }

  &.tsundere {
    color: #a45f70;
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
  transform: translateX(-4%) translateY(10px) scale(0.6);
}
.bubble-pop-leave-to {
  opacity: 0;
  transform: translateX(-4%) translateY(-6px) scale(0.7);
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
  width: 15px;
  height: 15px;
  animation: heart-float 1.2s ease-out forwards;
  opacity: 0;

  &::before,
  &::after {
    content: "";
    position: absolute;
    background: var(--heart-color, #f472b6);
  }

  &::before {
    top: 3px;
    left: 3px;
    width: 9px;
    height: 9px;
    border-radius: 3px;
    transform: rotate(45deg);
    box-shadow: 0 2px 6px rgba(15, 23, 42, 0.14);
  }

  &::after {
    top: 1px;
    left: 1px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    box-shadow: 7px 0 0 var(--heart-color, #f472b6);
  }
}

@keyframes heart-float {
  0% {
    opacity: 1;
    transform: translate(0, 0) scale(0.5) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: translate(-20px, -45px) scale(1.08) rotate(20deg);
  }
  100% {
    opacity: 0;
    transform: translate(-30px, -80px) scale(0.65) rotate(-20deg);
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
  pointer-events: none;
  z-index: 8;
  overflow: hidden;
  background:
    linear-gradient(
      112deg,
      transparent 30%,
      rgba(255, 255, 255, 0.08) 40%,
      rgba(255, 255, 255, 0.46) 48%,
      rgba(103, 232, 249, 0.2) 53%,
      transparent 66%
    );
  background-size: 230% 100%;
  background-position: 135% 0;
  -webkit-mask: var(--pet-mask) center / contain no-repeat;
  mask: var(--pet-mask) center / contain no-repeat;
  mix-blend-mode: screen;
  opacity: 0;
  filter: blur(1.2px);
  animation: pet-shine-sweep 1.15s var(--ease-out-expo) forwards;
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
    opacity: 0;
    background-position: 135% 0;
  }
  16% {
    opacity: 0.9;
  }
  72% {
    opacity: 0.62;
  }
  100% {
    opacity: 0;
    background-position: -35% 0;
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
  right: 20px;
  bottom: 20px;
  z-index: 2147483648;
  width: 292px;
  background: var(--theme-color);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-color);
  border-radius: calc(var(--theme-radius) + 6px);
  box-shadow: var(--shadow-raise), 0 0 0 4px var(--accent-soft-bg);
  color: var(--color);
  font-size: 13px;
  overflow: hidden;

  .settings-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 14px;
    border-bottom: 1px solid var(--border-color);
    background: linear-gradient(135deg, var(--accent-soft-bg-strong), transparent 70%);

    .settings-heading {
      display: grid;
      gap: 2px;
    }

    .settings-heading small {
      color: var(--theme-btn-hover-color);
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.12em;
    }

    .settings-title {
      font-weight: 600;
      color: var(--color);
      font-size: 14px;
    }

    .settings-close {
      border: none;
      background: none;
      cursor: pointer;
      font-size: 13px;
      color: var(--text-secondary);
      width: 22px;
      height: 22px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover,
      &:focus-visible {
        background: var(--accent-soft-bg);
        color: var(--theme-btn-hover-color);
        outline: none;
      }
    }
  }

  .settings-body {
    padding: 8px 14px 12px;
  }

  .pet-summary {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 2px 0 10px;
    padding: 8px 10px;
    border-radius: 12px;
    background: linear-gradient(135deg, var(--accent-soft-bg-strong), transparent 82%);
    border: 1px solid var(--border-color);

    img {
      width: 42px;
      height: 42px;
      object-fit: contain;
      object-position: center bottom;
      filter: drop-shadow(0 2px 5px rgba(15, 23, 42, 0.16));
    }

    div {
      display: grid;
      gap: 2px;
    }

    strong {
      color: var(--color);
      font-size: 14px;
    }

    span {
      color: var(--text-secondary);
      font-size: 11px;
    }
  }

  .care-meters {
    display: grid;
    gap: 7px;
    margin-bottom: 10px;
  }

  .care-meter {
    display: grid;
    grid-template-columns: 53px 1fr 24px;
    align-items: center;
    gap: 6px;
    color: var(--text-secondary);
    font-size: 11px;

    b {
      color: var(--color);
      font-size: 10px;
      font-variant-numeric: tabular-nums;
      text-align: right;
    }
  }

  .meter-track {
    height: 6px;
    overflow: hidden;
    border-radius: 999px;
    background: var(--grey-color);

    i {
      display: block;
      height: 100%;
      border-radius: inherit;
      transition: width 0.35s ease;
    }
  }

  .panel-actions {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border-color);

    button {
      display: grid;
      gap: 2px;
      justify-items: center;
      padding: 6px 2px;
      border: 1px solid var(--border-color);
      border-radius: 9px;
      background: var(--theme-color);
      color: var(--text-secondary);
      font-size: 10px;
      cursor: pointer;
      transition: transform 0.15s ease, background 0.15s ease;

      &:hover,
      &:focus-visible {
        background: var(--accent-soft-bg);
        color: var(--theme-btn-hover-color);
        transform: translateY(-1px);
        outline: none;
      }
    }
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
    background: var(--grey-color);
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
      background: var(--theme-color);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
      transition: transform 0.2s ease;
    }

    &.on {
      background: var(--theme-btn-hover-color);

      .knob {
        transform: translateX(17px);
      }
    }
  }

  .size-group {
    display: flex;
    gap: 4px;

    button {
      border: 1px solid var(--border-color);
      background: var(--theme-color);
      color: var(--text-secondary);
      border-radius: 8px;
      padding: 3px 10px;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.15s ease;

      &.active {
        background: var(--theme-btn-hover-color);
        border-color: var(--theme-btn-hover-color);
        color: var(--accent-contrast);
      }
    }
  }

  .reset-btn {
    width: 100%;
    margin-top: 8px;
    padding: 7px 0;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: transparent;
    color: var(--text-secondary);
    font-size: 12px;
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
      background: var(--accent-soft-bg);
      color: var(--theme-btn-hover-color);
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

@keyframes cat-walk-bob {
  0%, 100% {
    transform: translate(var(--look-x, 0px), var(--look-y, 0px)) rotate(var(--look-rotate, 0deg)) scaleX(var(--walk-scale-x, 1)) translateY(0) scaleY(1);
  }
  50% {
    transform: translate(var(--look-x, 0px), var(--look-y, 0px)) rotate(var(--look-rotate, 0deg)) scaleX(var(--walk-scale-x, 1)) translateY(-3px) scaleY(0.985);
  }
}

@keyframes stretch-breathe {
  0%, 100% {
    transform: translate(var(--look-x, 0px), var(--look-y, 0px)) rotate(var(--look-rotate, 0deg)) scale(1);
  }
  50% {
    transform: translate(var(--look-x, 0px), var(--look-y, 0px)) rotate(var(--look-rotate, 0deg)) scale(1.015, 0.985);
  }
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

@keyframes play-pounce {
  0% { transform: translate(var(--look-x, 0), var(--look-y, 0)) rotate(0) scale(1); }
  35% { transform: translate(calc(var(--look-x, 0px) + 10px), calc(var(--look-y, 0px) - 16px)) rotate(5deg) scale(1.04, 0.97); }
  70% { transform: translate(calc(var(--look-x, 0px) - 4px), calc(var(--look-y, 0px) - 5px)) rotate(-3deg) scale(0.98, 1.04); }
  100% { transform: translate(var(--look-x, 0), var(--look-y, 0)) rotate(0) scale(1); }
}

@keyframes yarn-roll {
  0% { transform: translateX(-4px) rotate(-18deg) scale(0.92); }
  100% { transform: translateX(8px) rotate(22deg) scale(1.08); }
}

@keyframes bubble-bounce {
  0% { scale: 0.8; }
  100% { scale: 1; }
}

@keyframes status-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.72); }
}

@keyframes aura-orbit {
  from { transform: rotate(0deg) scaleX(1); }
  50% { transform: rotate(180deg) scaleX(0.88); }
  to { transform: rotate(360deg) scaleX(1); }
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

  .pet-aura,
  .pet-aura span,
  .pet-aura i,
  .status-pulse {
    animation: none !important;
  }

  .pet-aura {
    opacity: 0.32;
  }

  .is-spinning .cat-inner,
  .is-hopping .cat-inner,
  .is-standing .cat-inner,
  .is-frightened .cat-inner,
  .is-walking .cat-inner,
  .is-running .cat-inner,
  .is-stretching .cat-inner {
    animation-duration: 0.3s !important;
    animation-iteration-count: 1 !important;
  }

  .pet-art,
  .play-ball,
  .food-dish,
  .food-steam {
    animation: none !important;
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
    top: var(--bubble-top, -56px);
    width: var(--bubble-width, 190px);
    height: var(--bubble-height, 94px);
    padding: 0 var(--bubble-padding-x, 26px);
    font-size: var(--bubble-font-size, 11px);

    .bubble-copy {
      max-width: var(--bubble-copy-width, 126px);
    }

    .bubble-doodles {
      inset: -9px -12px;
      transform: scale(var(--bubble-doodle-scale, 0.88));
    }
  }

  .sleep-zzz .z {
    &.z1 { font-size: 8px; }
    &.z2 { font-size: 11px; }
    &.z3 { font-size: 13px; }
  }

  .float-heart {
    width: 12px;
    height: 12px;
  }

  .cat-settings {
    right: 12px;
    bottom: 12px;
    width: min(292px, calc(100vw - 24px));
  }

  .quick-actions {
    display: none;
  }

  .pet-status-pill {
    top: -24px;
    font-size: 9px;
    padding: 4px 7px;
  }
}
</style>
