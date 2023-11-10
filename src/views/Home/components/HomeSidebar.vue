<template>
  <div class="sidebar-info">
    <div class="sidebar-info-avatar">
      <img
        class="avatar"
        v-lazy="'src/assets/images/levi2.jpg'"
        fit="scale-dow"
        alt="levi"
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
      <div>
        <div>
          <span>文章</span>
        </div>
        <div class="sidebar-info-data-num">
          <span>1252</span>
        </div>
      </div>
      <div>
        <div>
          <span>文章</span>
        </div>
        <div class="sidebar-info-data-num">
          <span>1252</span>
        </div>
      </div>
      <div>
        <div>
          <span>文章</span>
        </div>
        <div class="sidebar-info-data-num">
          <span>1252</span>
        </div>
      </div>
    </div>
  </div>
  <div class="sidebar-category">
    <div class="sidebar-category-title">
      <i class="bi bi-hdd-stack"></i>
      <span>分类</span>
    </div>
    <div class="sidebar-category-content">
      <ul class="sidebar-category-ul">
        <li class="sidebar-category-li">
          <span>Html</span>
          <span>516</span>
        </li>
        <li class="sidebar-category-li">
          <span>CSS</span>
          <span>945</span>
        </li>
        <li class="sidebar-category-li">
          <span>JS</span>
          <span>2164</span>
        </li>
        <li class="sidebar-category-li">
          <span>Vue</span>
          <span>616</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
</script>

<style lang="scss" scoped>
.sidebar-info,
.sidebar-category {
  background: #fff;
  border-radius: 5px;
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

.sidebar-category-title {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 0 10px;
}
.bi-hdd-stack {
  margin-right: 10px;
  font-size: 24px;
}
.sidebar-category-li {
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  font-size: 15px;
  &:hover {
    transition: all 0.3s;
    background: #e9e6e69e;
    color: var(--linkTextColor);
  }
}
</style>
