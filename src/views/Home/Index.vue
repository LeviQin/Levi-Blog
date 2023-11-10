<template>
  <div class="home w">
    <div class="home-banner">
      <div class="banner-text-box">
        <h2><i class="bi bi-stars"></i>Levi</h2>
        <p>莫道桑榆晚，为霞尚满天</p>
      </div>
      <i class="bi bi-chevron-double-down button-arrow" @click="toNextPage"></i>
    </div>
    <div class="home-container" ref="homeContainerRef">
      <div class="sidebar">
        <home-sidebar></home-sidebar>
      </div>
      <div class="content">
        <div class="article-item">
          <div class="article-item-title">
            <h2>第一篇博客文章标题</h2>
          </div>
          <div class="article-item-description">
            <p>
              第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇
            </p>
          </div>
          <div class="article-item-footer">
            <div class="footer-left">
              <div class="footer-date">
                <span>2023-09-12</span>
              </div>
              <div class="footer-tags">
                <span>前端</span>
                <span>Vue3</span>
                <span>日常</span>
              </div>
            </div>
            <div class="footer-right">
              <i class="bi bi-eye"><span class="num-text">13500</span></i>
              <i class="bi bi-hand-thumbs-up"><span class="num-text">652</span></i>
            </div>
          </div>
        </div>
        <div class="article-item">
          <div class="article-item-title">
            <h2>第一篇博客文章标题</h2>
          </div>
          <div class="article-item-description">
            <p>
              第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇
            </p>
          </div>
          <div class="article-item-footer">
            <div class="footer-left">
              <div class="footer-date">
                <span>2023-09-12</span>
              </div>
              <div class="footer-tags">
                <span>前端</span>
                <span>Vue3</span>
                <span>日常</span>
              </div>
            </div>
            <div class="footer-right">
              <i class="bi bi-eye"><span class="num-text">13500</span></i>
              <i class="bi bi-hand-thumbs-up"><span class="num-text">652</span></i>
            </div>
          </div>
        </div>
        <div class="article-item">
          <div class="article-item-title">
            <h2>第一篇博客文章标题</h2>
          </div>
          <div class="article-item-description">
            <p>
              第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇
            </p>
          </div>
          <div class="article-item-footer">
            <div class="footer-left">
              <div class="footer-date">
                <span>2023-09-12</span>
              </div>
              <div class="footer-tags">
                <span>前端</span>
                <span>Vue3</span>
                <span>日常</span>
              </div>
            </div>
            <div class="footer-right">
              <i class="bi bi-eye"><span class="num-text">13500</span></i>
              <i class="bi bi-hand-thumbs-up"><span class="num-text">652</span></i>
            </div>
          </div>
        </div>
        <div class="article-item">
          <div class="article-item-title">
            <h2>第一篇博客文章标题</h2>
          </div>
          <div class="article-item-description">
            <p>
              第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇
            </p>
          </div>
          <div class="article-item-footer">
            <div class="footer-left">
              <div class="footer-date">
                <span>2023-09-12</span>
              </div>
              <div class="footer-tags">
                <span>前端</span>
                <span>Vue3</span>
                <span>日常</span>
              </div>
            </div>
            <div class="footer-right">
              <i class="bi bi-eye"><span class="num-text">13500</span></i>
              <i class="bi bi-hand-thumbs-up"><span class="num-text">652</span></i>
            </div>
          </div>
        </div>
        <div class="article-item">
          <div class="article-item-title">
            <h2>第一篇博客文章标题</h2>
          </div>
          <div class="article-item-description">
            <p>
              第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇
            </p>
          </div>
          <div class="article-item-footer">
            <div class="footer-left">
              <div class="footer-date">
                <span>2023-09-12</span>
              </div>
              <div class="footer-tags">
                <span>前端</span>
                <span>Vue3</span>
                <span>日常</span>
              </div>
            </div>
            <div class="footer-right">
              <i class="bi bi-eye"><span class="num-text">13500</span></i>
              <i class="bi bi-hand-thumbs-up"><span class="num-text">652</span></i>
            </div>
          </div>
        </div>
        <div class="article-item">
          <div class="article-item-title">
            <h2>第一篇博客文章标题</h2>
          </div>
          <div class="article-item-description">
            <p>
              第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇
            </p>
          </div>
          <div class="article-item-footer">
            <div class="footer-left">
              <div class="footer-date">
                <span>2023-09-12</span>
              </div>
              <div class="footer-tags">
                <span>前端</span>
                <span>Vue3</span>
                <span>日常</span>
              </div>
            </div>
            <div class="footer-right">
              <i class="bi bi-eye"><span class="num-text">13500</span></i>
              <i class="bi bi-hand-thumbs-up"><span class="num-text">652</span></i>
            </div>
          </div>
        </div>
        <div class="article-item">
          <div class="article-item-title">
            <h2>第一篇博客文章标题</h2>
          </div>
          <div class="article-item-description">
            <p>
              第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇
            </p>
          </div>
          <div class="article-item-footer">
            <div class="footer-left">
              <div class="footer-date">
                <span>2023-09-12</span>
              </div>
              <div class="footer-tags">
                <span>前端</span>
                <span>Vue3</span>
                <span>日常</span>
              </div>
            </div>
            <div class="footer-right">
              <i class="bi bi-eye"><span class="num-text">13500</span></i>
              <i class="bi bi-hand-thumbs-up"><span class="num-text">652</span></i>
            </div>
          </div>
        </div>
        <div class="article-item">
          <div class="article-item-title">
            <h2>第一篇博客文章标题</h2>
          </div>
          <div class="article-item-description">
            <p>
              第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇
            </p>
          </div>
          <div class="article-item-footer">
            <div class="footer-left">
              <div class="footer-date">
                <span>2023-09-12</span>
              </div>
              <div class="footer-tags">
                <span>前端</span>
                <span>Vue3</span>
                <span>日常</span>
              </div>
            </div>
            <div class="footer-right">
              <i class="bi bi-eye"><span class="num-text">13500</span></i>
              <i class="bi bi-hand-thumbs-up"><span class="num-text">652</span></i>
            </div>
          </div>
        </div>
        <div class="article-item">
          <div class="article-item-title">
            <h2>第一篇博客文章标题</h2>
          </div>
          <div class="article-item-description">
            <p>
              第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇
            </p>
          </div>
          <div class="article-item-footer">
            <div class="footer-left">
              <div class="footer-date">
                <span>2023-09-12</span>
              </div>
              <div class="footer-tags">
                <span>前端</span>
                <span>Vue3</span>
                <span>日常</span>
              </div>
            </div>
            <div class="footer-right">
              <i class="bi bi-eye"><span class="num-text">13500</span></i>
              <i class="bi bi-hand-thumbs-up"><span class="num-text">652</span></i>
            </div>
          </div>
        </div>
        <div class="article-item">
          <div class="article-item-title">
            <h2>第一篇博客文章标题</h2>
          </div>
          <div class="article-item-description">
            <p>
              第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇博客文章内容第一篇
            </p>
          </div>
          <div class="article-item-footer">
            <div class="footer-left">
              <div class="footer-date">
                <span>2023-09-12</span>
              </div>
              <div class="footer-tags">
                <span>前端</span>
                <span>Vue3</span>
                <span>日常</span>
              </div>
            </div>
            <div class="footer-right">
              <i class="bi bi-eye"><span class="num-text">13500</span></i>
              <i class="bi bi-hand-thumbs-up"><span class="num-text">652</span></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import HomeSidebar from "./components/HomeSidebar.vue";

let homeContainerRef = ref(null);

const toNextPage = () => {
  homeContainerRef.value.scrollIntoView({ behavior: "smooth" });
};
</script>

<style lang="scss" scoped>
.home-banner {
  height: 100vh;
  display: flex;
  justify-content: center;
  position: relative;
}
.banner-text-box {
  transform: translateY(30%);
}

.home-banner h2,
.home-banner i {
  text-shadow: 0 5px 15px rgba(0, 0, 0, 1) !important;
  color: #fff;
  text-align: center;
  font-size: 35px;
  margin-left: -18px;
}
.home-banner p {
  width: 265px;
  line-height: 40px;
  /*帧动画 */
  animation: widthChange steps(16) 3s, blinkCursor steps(1) 1s infinite;
  overflow: hidden;
  /* 文本不换行： */
  white-space: nowrap;
  border-right: 0.1em solid rgba(0, 0, 0, 0);
  text-shadow: 0 5px 15px rgba(0, 0, 0, 1) !important;
  color: #fff;
  font-size: 24px;
}

.home-container {
  display: flex;
  padding-top: 80px;
}

.sidebar {
  width: 25%;
  margin-right: 20px;
}
.content {
  flex: 1;
}

.article-item {
  background: #fff;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  margin-bottom: 20px;
}

.article-item-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.bi {
  margin-right: 10px;
  font-style: normal;
  font-size: 15px;
}

.num-text {
  margin: 5px;
  font-size: 14px;
}

.footer-left {
  display: flex;
  align-items: center;
}

.footer-date {
  margin-right: 15px;
  font-size: 14px;
}

.footer-tags span {
  margin: 0 5px;
  padding: 4px;
  background: #d5d5d5a8;
  border-radius: 2px;
  font-size: 12px;
}

.button-arrow {
  display: block;
  position: absolute;
  bottom: 80px;
  left: 50%;
  margin-left: -20px;
  opacity: 0.75;
  z-index: 9999;
  cursor: pointer;
  animation: arrowMove 2s linear infinite;
}

@media (max-width: 860px) {
  .home-container {
    display: block;
  }

  .sidebar {
    display: none;
  }
}

@keyframes widthChange {
  0% {
    width: 0;
  }
}

@keyframes blinkCursor {
  50% {
    /* 颜色透明 */
    border-color: transparent;
  }
}

@keyframes arrowMove {
  0% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(-10px);
  }
  50% {
    transform: translateY(-15px);
  }
}
</style>
