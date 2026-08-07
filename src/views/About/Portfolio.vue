<template>
  <div class="portfolio w">
    <div class="portfolio-header">
      <span class="portfolio-kicker">~/portfolio</span>
      <h1 class="portfolio-title">作品集</h1>
      <p class="portfolio-sub">前端负责人 · 主导多项目架构与技术选型</p>
    </div>
    <div class="portfolio-grid">
      <div
        v-for="item in projects"
        :key="item.id"
        class="portfolio-card"
        :class="{ 'text-card': item.type === 'text' }"
      >
        <a
          :href="item.link || undefined"
          :target="item.link ? '_blank' : undefined"
          :rel="item.link ? 'noopener noreferrer' : undefined"
        >
          <template v-if="item.type === 'image'">
            <div class="portfolio-cover">
              <img :src="item.image" :alt="item.name" loading="lazy" />
            </div>
            <div class="portfolio-body">
              <div class="portfolio-name">{{ item.name }}</div>
              <p class="portfolio-desc">{{ item.desc }}</p>
              <div class="portfolio-tags">
                <span v-for="tag in item.tags" :key="tag" class="tag-chip">{{ tag }}</span>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="portfolio-body text">
              <div class="portfolio-name">{{ item.name }}</div>
              <p class="portfolio-desc">{{ item.desc }}</p>
              <div class="portfolio-tags">
                <span v-for="tag in item.tags" :key="tag" class="tag-chip">{{ tag }}</span>
              </div>
            </div>
          </template>
        </a>
      </div>
    </div>
    <div class="portfolio-back">
      <button class="back-btn" type="button" @click="router.push('/about')">← 返回关于我</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { projects } from "./projects";

const router = useRouter();
</script>

<style lang="scss" scoped>
.portfolio {
  max-width: 1180px;
  margin: 0 auto;
  padding: 40px 20px 60px;
  min-height: 100vh;
}

.portfolio-header {
  text-align: center;
  margin-bottom: 40px;
}

.portfolio-kicker {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 999px;
  background: rgba(34, 211, 238, 0.1);
  color: var(--theme-btn-hover-color);
  font-family: var(--mono-font-family);
  font-size: 13px;
  letter-spacing: 0.08em;
}

.portfolio-title {
  font-size: 42px;
  font-weight: 700;
  color: var(--color);
  font-family: var(--mono-font-family);
  margin: 16px 0 8px;
}

.portfolio-sub {
  color: var(--text-secondary);
  font-size: 16px;
  margin: 0;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.portfolio-card {
  border-radius: 14px;
  border: 1px solid var(--border-color);
  background: var(--theme-color);
  overflow: hidden;
  transition: all 0.3s ease;

  a {
    display: block;
    height: 100%;
    text-decoration: none;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(34, 211, 238, 0.4);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.3);
  }
}

.portfolio-cover {
  height: 180px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  .portfolio-card:hover & img {
    transform: scale(1.06);
  }
}

.portfolio-body {
  padding: 22px;

  &.text {
    min-height: 220px;
    display: flex;
    flex-direction: column;
  }
}

.portfolio-name {
  font-size: 20px;
  font-weight: 700;
  color: var(--theme-btn-hover-color);
  font-family: var(--mono-font-family);
  margin-bottom: 12px;
}

.portfolio-desc {
  font-size: 14px;
  line-height: 1.7;
  color: var(--color);
  opacity: 0.85;
  margin: 0 0 14px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.portfolio-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
}

.tag-chip {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-family: var(--mono-font-family);
  color: var(--theme-btn-hover-color);
  background: rgba(34, 211, 238, 0.1);
  border: 1px solid rgba(34, 211, 238, 0.2);
}

.portfolio-back {
  text-align: center;
  margin-top: 48px;
}

.back-btn {
  padding: 12px 32px;
  border-radius: 999px;
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--color);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.25s;

  &:hover {
    border-color: var(--theme-btn-hover-color);
    color: var(--theme-btn-hover-color);
  }
}

@media (max-width: 860px) {
  .portfolio {
    padding: 24px 16px 40px;
  }

  .portfolio-title {
    font-size: 30px;
  }

  .portfolio-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
