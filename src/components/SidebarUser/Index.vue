<template>
  <div class="sidebar-info">
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
        <span>浮世景色百千年依旧，人之在世却如白露与泡影</span>
      </div>
    </div>
    <div class="sidebar-info-data">
      <div class="sidebar-info-data-item">
        <div>
          <span>文章</span>
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
          <span>8</span>
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
      <a href="https://github.com/LeviQin">
        <div class="contact-item" title="GitHub">
          <i class="bi bi-github"></i>
        </div>
      </a>
      <a href="mailto:levi.qin@easeware.net">
        <div class="contact-item envelope-box" title="邮箱">
          <i class="bi bi-envelope-at"></i>
        </div>
      </a>
      <div class="contact-item wecht-box" title="微信">
        <i class="bi bi-wechat"></i>
      </div>
      <div class="contact-item" title="QQ">
        <i class="bi bi-tencent-qq"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { tagMap } from "@/utils/tagMap.js";
import { getStatistics } from "@/api/articles.js";

const router = useRouter();

onMounted(() => {
  getData();
});

let totalArticles = ref(0);

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
    font-size: 14px;
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
