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
        <span>随便说几句随便说几句</span>
      </div>
    </div>
    <div class="sidebar-info-data">
      <div class="sidebar-info-data-item">
        <div>
          <span>文章</span>
        </div>
        <div class="sidebar-info-data-num">
          <span>1252</span>
        </div>
      </div>
      <div class="sidebar-info-data-item">
        <div>
          <span>文章</span>
        </div>
        <div class="sidebar-info-data-num">
          <span>1252</span>
        </div>
      </div>
      <div class="sidebar-info-data-item">
        <div>
          <span>文章</span>
        </div>
        <div class="sidebar-info-data-num">
          <span>1252</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
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
}

@media (max-width: 860px) {
  .avatar {
    width: 100px;
    height: 100px;
  }

  .sidebar-info-introduce {
    display: none;
  }

  .sidebar-info-data-item {
    font-size: 14px;
  }

  .sidebar-info {
    padding: 20px 0 0 0;
  }
}
</style>
