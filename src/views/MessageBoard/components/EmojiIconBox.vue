<template>
  <div class="emoji-icon-box" @click="closeEmojiList">
    <div class="emoji-list-box" :class="{ 'show-emoji-list': showEmojiList }" @click.stop>
      <div class="emoji-list-content">
        <div class="emoji-box" v-if="selectVal === `emoji`">
          <ul>
            <li v-for="item in emojiList" :key="item.id" @click="selectEmoji(item)">{{ item.value }}</li>
          </ul>
        </div>
        <div class="kaomoji-box" v-else>
          <ul>
            <li v-for="item in kaomojiList" :key="item.id" @click="selectEmoji(item)">{{ item.value }}</li>
          </ul>
        </div>
      </div>
      <div class="emoji-list-tools">
        <ul>
          <li class="emoji-li active-emoji-li" @click="selectLi('emoji', $event)">
            Emoji
          </li>
          <li class="emoji-li" @click="selectLi('颜文字', $event)">颜文字</li>
        </ul>
      </div>
    </div>
    <svg class="icon" aria-hidden="true" @click.stop="showEmojiList = !showEmojiList">
      <use xlink:href="#icon-a-gaoxinghaoxinqingbiaoqingxihuanbiaoqingxiaolian"></use>
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineEmits } from "vue";
import { emojiList } from "@/utils/emojis.js";
import { kaomojiList } from "@/utils/kaomojis.js";

onMounted(() => {
  document.addEventListener("click", closeEmojiList);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeEmojiList);
});

let showEmojiList = ref(false);
let selectVal = ref("emoji");

const closeEmojiList = (e) => {
  if (!e.target.closest(".emoji-list-box")) {
    showEmojiList.value = false;
  }
};

const selectLi = (val, e) => {
  selectVal.value = val;
  const lis = document.querySelectorAll(".emoji-list-box li");
  lis.forEach((item) => {
    item.classList.remove("active-emoji-li");
  });
  e.target.classList.add("active-emoji-li");
};

const selectEmoji = (item) => {
    emit("ok", item);
}

const emit = defineEmits(["ok"]);
</script>

<style lang="scss" scoped>
.emoji-list-box {
  position: absolute;
  width: 500px;
  height: 300px;
  top: -610px;
  left: -397px;
  background-color: var(--whiteColor);
  transform: translateY(100%) scale(0.9);
  transform-origin: top;
  transition: all 0.3s ease;
  opacity: 0;
  pointer-events: none;
  box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
  display: flex;
  flex-direction: column;
  border-radius: var(--themeRadius);
  overflow: hidden;
  .emoji-list-content {
    flex: 1;
    padding: 10px;
    overflow: auto;
  }
  .emoji-list-tools {
    height: 50px;
    box-shadow: 0 -0.125rem 0.25rem rgba(0, 0, 0, 0.06);
    ul {
      height: 100%;
      display: flex;
      align-items: center;
      li {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 20px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.3s;
        border-bottom: 3px solid #fff;
        &:hover {
          background: #f5f5f5;
        }
      }
    }
  }
}

.emoji-box ul {
  display: flex;
  flex-wrap: wrap;
  li {
    font-size: 26px;
    padding: 2px;
    margin: 3px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background-color: #f5f5f5;
      border-radius: 5px;
    }
  }
}

.kaomoji-box ul {
  display: flex;
  flex-wrap: wrap;
  li {
    font-size: 20px;
    padding: 15px;
    margin: 5px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background-color: #f5f5f5;
      border-radius: 5px;
    }
  }
}

.active-emoji-li {
  border-bottom: 3px solid red !important;
}

.show-emoji-list {
  opacity: 1 !important;
  transform: translateY(100%) !important;
  pointer-events: all !important;
}

.icon {
  width: 1.5em;
  height: 1.5em;
  margin-right: 15px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    transform: translateY(-2px);
  }
}

@media (max-width: 860px) {
  .emoji-list-box {
    width: 300px;
    height: 300px;
    top: -610px;
    left: -190px;
  }

  .emoji-box ul li {
    margin: 2px;
  }

  .kaomoji-box ul li {
    font-size: 16px;
    padding: 10px;
  }
}
</style>
