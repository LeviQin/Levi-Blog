<template>
  <transition :name="props.transitionName">
    <div
      v-show="visible"
      :style="props.customStyle"
      class="back-to-ceiling"
      @click="backToTop"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 17 17"
        xmlns="http://www.w3.org/2000/svg"
        class="Icon Icon--backToTopArrow"
        aria-hidden="true"
        style="height: 16px; width: 16px"
      >
        <path
          d="M12.036 15.59a1 1 0 0 1-.997.995H5.032a.996.996 0 0 1-.997-.996V8.584H1.03c-1.1 0-1.36-.633-.578-1.416L7.33.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.004z"
        />
      </svg>
    </div>
  </transition>
</template>

<script setup>
import { defineProps, ref, onMounted, onBeforeUnmount } from "vue";

onMounted(() => {
  mainDom = document.querySelector(".main");
  mainDom.addEventListener("scroll", handleScroll, true);
  console.log(mainDom, "11111111111111s");
});
onBeforeUnmount(() => {
  mainDom.removeEventListener("scroll", handleScroll, true);
  if (interval.value) {
    clearInterval(interval.value);
  }
});

const props = defineProps({
  visibilityHeight: {
    type: Number,
    default: 300,
  },
  backPosition: {
    type: Number,
    default: 0,
  },
  customStyle: {
    type: Object,
    default: function () {
      return {
        right: "30px",
        bottom: "100px",
        width: "40px",
        height: "40px",
        "border-radius": "20px",
        background: "#171a29",
        "z-index": 99999,
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
      };
    },
  },
  transitionName: {
    type: String,
    default: "fade",
  },
});

let mainDom = ref(null);
let visible = ref(false);
let interval = ref(null);
let isMoving = ref(false);

const handleScroll = () => {
  console.log(1111111111);
  visible.value = mainDom.scrollTop > props.visibilityHeight;
  console.log(mainDom.scrollTop, "mainDom.value.scrollTop");
};
const backToTop = () => {
  if (isMoving.value) return;
  const start = mainDom.scrollTop;
  let i = 0;
  isMoving.value = true;
  interval.value = setInterval(() => {
    const next = Math.floor(easeInOutQuad(10 * i, start, -start, 500));
    if (next <= props.backPosition) {
      mainDom.scrollTo(0, props.backPosition);
      clearInterval(interval.value);
      isMoving.value = false;
    } else {
      mainDom.scrollTo(0, next);
    }
    i++;
  }, 16.7);
};
const easeInOutQuad = (t, b, c, d) => {
  if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
  return (-c / 2) * (--t * (t - 2) - 1) + b;
};
</script>

<style lang="scss" scoped>
.back-to-ceiling {
  position: fixed;
  display: inline-block;
  text-align: center;
  cursor: pointer;
}

.back-to-ceiling:hover {
  background: #1d202fc4 !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.back-to-ceiling .Icon {
  fill: #fff;
  background: none;
}
</style>
