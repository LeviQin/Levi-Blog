<template>
  <div class="avatar-select-box" @click.stop="showAvatarList = !showAvatarList">
    <div
      class="avatar-list-box"
      :class="{ 'show-avatar-list': showAvatarList }"
      @click.stop
    >
      <div class="avatar-list-content">
        <div class="image-box" v-if="selectVal === `通用`">
          <ul>
            <li
              v-for="item in dataMap.universalList"
              :key="item.id"
              @click="selectavatar(item.image)"
            >
              <img v-lazy="item.image" alt="" />
            </li>
          </ul>
        </div>
        <div class="image-box" v-else-if="selectVal === `男头`">
          <ul>
            <li
              v-for="item in dataMap.maleList"
              :key="item.id"
              @click="selectavatar(item.image)"
            >
              <img v-lazy="item.image" alt="" />
            </li>
          </ul>
        </div>
        <div class="image-box" v-else-if="selectVal === `女头`">
          <ul>
            <li
              v-for="item in dataMap.femaleList"
              :key="item.id"
              @click="selectavatar(item.image)"
            >
              <img v-lazy="item.image" alt="" />
            </li>
          </ul>
        </div>
      </div>
      <div class="avatar-list-tools">
        <ul>
          <li class="avatar-li active-avatar-li" @click="selectLi('通用', $event)">
            通用
          </li>
          <li class="avatar-li" @click="selectLi('男头', $event)">男头</li>
          <li class="avatar-li" @click="selectLi('女头', $event)">女头</li>
        </ul>
      </div>
    </div>
    <div class="avatar-img-box">
      <img v-lazy="props.avatarImg" alt="头像" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, defineEmits, defineProps } from "vue";
import { getAvatars } from "@/api/avatar.js";

const props = defineProps({
  avatarImg: {
    type: String,
    default: "",
  },
});

const dataMap = reactive({
  universalList: [],
  maleList: [],
  femaleList: [],
});

const showAvatarList = ref(false);
const selectVal = ref("通用");

onMounted(() => {
  document.addEventListener("click", closeAvatarList);
  getAvatarList();
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeAvatarList);
});

const closeAvatarList = (e) => {
  if (!e.target.closest(".avatar-list-box")) {
    showAvatarList.value = false;
  }
};

const selectLi = (val, e) => {
  selectVal.value = val;
  const lis = document.querySelectorAll(".avatar-list-box li");
  lis.forEach((item) => {
    item.classList.remove("active-avatar-li");
  });
  e.target.classList.add("active-avatar-li");
};

const selectavatar = (url) => {
  emit("ok", url);
};

const getAvatarList = async () => {
  try {
    const res = await getAvatars();
    const { code, data } = res.data;
    if (code === 200) {
      dataMap.universalList = data.filter((item) => item.type === 1);
      dataMap.maleList = data.filter((item) => item.type === 2);
      dataMap.femaleList = data.filter((item) => item.type === 3);
    }
  } catch (error) {
    console.log(error);
  }
};

const emit = defineEmits(["ok"]);
</script>

<style lang="scss" scoped>
.avatar-img-box {
  box-shadow: 0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02);
  width: 40px;
  height: 40px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  border: 5px solid #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
  &:hover {
    transform: translateY(-2px);
  }
}

.avatar-select-box {
  position: relative;
}

.avatar-list-box {
  position: absolute;
  width: 500px;
  height: 300px;
  top: -610px;
  left: 0;
  background-color: var(--white-color);
  transform: translateY(100%) scale(0.9);
  transform-origin: top;
  transition: all 0.3s ease;
  opacity: 0;
  pointer-events: none;
  box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
  display: flex;
  flex-direction: column;
  border-radius: var(--theme-radius);
  overflow: hidden;
  .avatar-list-content {
    flex: 1;
    padding: 10px;
    overflow: auto;
  }
  .avatar-list-tools {
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
        color: var(--black-text-color);
        &:hover {
          background: #f5f5f5;
        }
      }
    }
  }
}

.image-box ul {
  display: flex;
  flex-wrap: wrap;
  li {
    font-size: 26px;
    padding: 10px;
    margin: 3px;
    cursor: pointer;
    transition: all 0.3s;
    width: 66px;
    height: 66px;
    border-radius: 10px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
    &:hover {
      background-color: #f5f5f5;
      border-radius: 5px;
    }
  }
}

.active-avatar-li {
  border-bottom: 3px solid red !important;
}

.show-avatar-list {
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
  .avatar-list-box {
    width: 300px;
    height: 300px;
    top: -610px;
    left: 0;
  }

  .avatar-box ul li {
    margin: 2px;
  }
}
</style>
