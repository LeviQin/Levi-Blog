<template>
  <div
    class="sidebar-info"
    :class="{ 'sidin-start': true, 'sidin-end': isSidebarVisible }"
  >
    <div class="sidebar-info-avatar">
      <img
        class="avatar"
        src="../../assets/images/levi2.jpg"
        fit="scale-dow"
        alt="levi"
        @click="router.push(`/about`)"
      />
    </div>
    <div class="sidebar-info-introduce">
      <div class="sidebar-info-introduce-item sidebar-info-introduce-name">
        <p><i class="bi bi-stars"></i>Levi</p>
      </div>
      <div class="sidebar-info-introduce-item sidebar-info-introduce-sign">
        <span>莫道桑榆晚，为霞尚满天</span>
      </div>
    </div>
    <div class="sidebar-info-data">
      <div class="sidebar-info-data-item">
        <div>
          <span>笔迹</span>
        </div>
        <div class="sidebar-info-data-num">
          <span>{{ totalArticles }}</span>
        </div>
      </div>
      <div class="sidebar-info-data-item">
        <div>
          <span>分类</span>
        </div>
        <div class="sidebar-info-data-num">
          <span>6</span>
        </div>
      </div>
      <div class="sidebar-info-data-item">
        <div>
          <span>标签</span>
        </div>
        <div class="sidebar-info-data-num">
          <span>{{ tagMap.length }}</span>
        </div>
      </div>
    </div>
    <div class="sidebar-info-contact">
      <a href="https://github.com/LeviQin" target="_blank">
        <div class="contact-item" title="GitHub">
          <i class="bi bi-github"></i>
        </div>
      </a>
      <a href="mailto:qinbiao_web@163.com">
        <div class="contact-item envelope-box" title="邮箱">
          <i class="bi bi-envelope-at"></i>
        </div>
      </a>
      <div class="contact-item wecht-box" title="微信" @click="showWXModel">
        <i class="bi bi-wechat"></i>
      </div>
      <div class="contact-item" title="QQ" @click="showQQmodel">
        <i class="bi bi-tencent-qq"></i>
      </div>
    </div>

    <!-- 微信弹窗 -->
    <WXModel ref="wxModelRef" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { tagMap } from "@/utils/tagMap.js";
import { getStatistics } from "@/api/articles.js";
import WXModel from "../WXModel/Index.vue";
import { ElNotification } from "element-plus";

const router = useRouter();

onMounted(() => {
  getData();
  isSidebarVisible.value = true;
});

let totalArticles = ref(0);
let wxModelRef = ref(null);
let isSidebarVisible = ref(false);

const showWXModel = () => {
  wxModelRef.value.show();
};

const showQQmodel = () => {
  ElNotification({
    title: "提醒",
    message: "该功能暂未上线哦~",
    type: "warning",
    zIndex: 99999,
  });
};

const getData = async () => {
  try {
    const res = await getStatistics();
    const { code, data } = res.data;
    if (code === 200) {
      totalArticles.value = data.total_articles;
    }
  } catch (error) {
    console.log(error, "error------------------------------");
  }
};
</script>

<style lang="scss" scoped>
.sidebar-info {
  background: var(--themeColor);
  border-radius: var(--themeRadius);
  margin-bottom: 20px;
  padding: 20px;
}

.sidebar-info-avatar {
  display: flex;
  justify-content: center;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    animation: accelerate 0.6s infinite linear;
  }
}

.sidebar-info-introduce-item {
  text-align: center;
}

.sidebar-info-introduce-name {
  font-size: 18px;
  font-weight: 600;
  margin-left: -15px;
}

.sidebar-info-data {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}

.sidebar-info-data-num {
  padding: 10px 0;
  display: flex;
  justify-content: center;
}

.sidebar-info-contact {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
}

.contact-item {
  padding: 2px;
  cursor: pointer;

  .bi {
    font-size: 26px;
    color: var(--balckTextColor);
  }

  &:hover {
    animation: eleJitter 2s linear infinite;
  }
}

.wecht-box {
  background: #28c445;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;

  .bi {
    font-size: 16px;
    color: #fff;
  }
}

.envelope-box .bi {
  color: #437dff;
}

@media (max-width: 860px) {
  .avatar {
    width: 90px;
    height: 90px;
  }

  .sidebar-info-introduce {
    display: none;
  }

  .sidebar-info-data-item {
    font-size: 17px;
  }

  .sidebar-info {
    padding: 20px 0 0 0;
    margin: 10px;
  }

  .sidebar-info-contact {
    display: none;
  }
}
</style>
