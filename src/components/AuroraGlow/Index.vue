<template>
  <div class="aurora-glow" :style="style" aria-hidden="true">
    <span class="aurora aurora-one"></span>
    <span v-if="auroraLayerCount >= 2" class="aurora aurora-two"></span>
    <span v-if="auroraLayerCount >= 3" class="aurora aurora-three"></span>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useMainStore } from "@/stores/mainStore";
import { useTheme } from "@/hooks/useTheme";
import { getEffectColor } from "@/utils/effectColor";

const mainStore = useMainStore();
const { theme } = useTheme();

const auroraLayerCount = computed(() => Math.max(1, Math.round(mainStore.fxConfig.density / 35)));

const style = computed(() => ({
  "--fx-color": getEffectColor(mainStore.fxConfig.color, theme.value),
  "--fx-opacity": Math.min(0.92, Math.max(0.08, (mainStore.fxConfig.opacity / 100) * (theme.value === "light" ? 1.45 : 1))),
  "--fx-density": mainStore.fxConfig.density / 100,
  "--fx-speed": `${Math.max(8, 28 - mainStore.fxConfig.speed * 0.18)}s`,
  "--fx-blend": theme.value === "light" ? "multiply" : "screen",
}));
</script>

<style scoped>
.aurora-glow {
  position: fixed;
  inset: -18vh -12vw;
  pointer-events: none;
  overflow: hidden;
  z-index: -1;
  opacity: var(--fx-opacity);
  filter: blur(18px) saturate(1.3);
  transform: translateZ(0);
}

.aurora {
  position: absolute;
  width: 112vw;
  height: 48vh;
  border-radius: 48% 52% 42% 58%;
  background: linear-gradient(112deg, transparent 18%, rgba(var(--fx-color), 0.12) 30%, rgba(var(--fx-color), 0.78) 43%, rgba(var(--fx-color), 0.22) 56%, transparent 74%);
  box-shadow: 0 0 70px rgba(var(--fx-color), 0.35);
  mix-blend-mode: var(--fx-blend);
  animation: aurora-drift var(--fx-speed) ease-in-out infinite alternate;
  opacity: calc(0.55 + var(--fx-density) * 0.45);
}

.aurora-one {
  top: 2%;
  left: -8%;
  transform: rotate(-16deg) skewX(-8deg);
}

.aurora-two {
  top: 18%;
  right: -12%;
  opacity: 0.72;
  transform: rotate(18deg) scale(0.84, 0.72);
  animation-delay: -6s;
}

.aurora-three {
  bottom: -4%;
  left: 12%;
  opacity: 0.5;
  transform: rotate(-8deg) scale(0.72, 0.58);
  animation-delay: -12s;
}

@keyframes aurora-drift {
  from { translate: -4% -2%; scale: 0.96 0.9; }
  to { translate: 8% 8%; scale: 1.08 1.06; }
}

@media (prefers-reduced-motion: reduce) {
  .aurora { animation-play-state: paused; }
}
</style>
