<template>
  <div class="container">
    <div class="info">
      <h1 class="info-title">{{ props.blogSettingMap.blog_work_title }}</h1>
      <div class="info-content">
        <div
          v-for="item in displayProjects"
          :key="item.id"
          class="info-item text-card"
        >
          <a :href="item.link || undefined" :target="item.link ? '_blank' : undefined" :rel="item.link ? 'noopener noreferrer' : undefined">
            <div class="text-card-body">
              <div class="text-card-title">{{ item.name }}</div>
              <div class="text-card-tags">
                <span v-for="tag in item.tags" :key="tag" class="tag-chip">{{ tag }}</span>
              </div>
              <div class="text-card-desc">{{ item.desc }}</div>
            </div>
          </a>
        </div>
      </div>
      <div class="button-card" v-if="showAll">
        <div class="button" @click="toPage">查看全部项目</div>
      </div>
    </div>
    <div class="button-arrow" @click="toNextPage"></div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { defineEmits, defineProps, computed, ref, onMounted, onBeforeUnmount } from "vue";
import { featuredProjects } from "./projects";

const props = defineProps({
  blogSettingMap: {
    type: Object,
    default: () => {},
  },
  showAll: {
    type: Boolean,
    default: true,
  },
});

const router = useRouter();

// 移动端(≤860px)最多显示 4 个作品
const isMobile = ref(false);

const updateViewport = () => {
  isMobile.value = window.innerWidth <= 860;
};

onMounted(() => {
  updateViewport();
  window.addEventListener("resize", updateViewport, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateViewport);
});

const displayProjects = computed(() => {
  return isMobile.value ? featuredProjects.slice(0, 3) : featuredProjects;
});

const toNextPage = () => {
  emit("toNextPage");
};

const toPage = () => {
  router.push("/portfolio");
};

const emit = defineEmits(["toNextPage"]);
</script>

<style lang="scss" scoped>
@media (any-hover: hover) {
  .info-item:hover {
    transform: translateY(-4px);
    border-color: rgba(34, 211, 238, 0.4);
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.28);
  }

  .button-arrow:hover {
    transform: scale(1);
    transition: transform 0.2s ease-in 0s;
  }

  .button-card .button:hover {
    background: rgba(0, 0, 0, 0.849);
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    transition: all 0.2s ease-in 0s;
  }
}

.container {
  height: 100%;
  background:
    radial-gradient(circle at 25% 30%, rgba(34, 211, 238, 0.06), transparent 45%),
    radial-gradient(circle at 75% 70%, rgba(34, 211, 238, 0.04), transparent 40%);
  background-size: 100% 100%;
  position: relative;
  background-repeat: no-repeat;
  background-position: center;
}

.info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 88%;
  overflow: hidden;
  box-sizing: border-box;
}

.info-title {
  color: var(--color);
  font-size: 30px;
  font-family: var(--mono-font-family);
  margin-bottom: 24px;
}

.info-content {
  width: 1200px;
  max-width: 92vw;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.info-item {
  width: 100%;
  height: 240px;
  overflow: hidden;
  position: relative;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);

  a {
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
  }
}

/* 文字卡片 */
.text-card {
  background: var(--theme-color);
}

.text-card a {
  padding: 20px;
  box-sizing: border-box;
}

.text-card-body {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.text-card-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--theme-btn-hover-color);
  font-family: var(--mono-font-family);
}

.text-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag-chip {
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-family: var(--mono-font-family);
  color: var(--theme-btn-hover-color);
  background: rgba(34, 211, 238, 0.1);
  border: 1px solid rgba(34, 211, 238, 0.2);
}

.text-card-desc {
  font-size: 13px;
  line-height: 1.65;
  color: var(--color);
  opacity: 0.85;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}

.button-arrow {
  display: block;
  width: 60px;
  height: 60px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  margin-left: -30px;
  opacity: 0.75;
  background: url(@/assets/images/arrow.png);
  transition: transform 0.2s ease-in 0s;
  z-index: 9999;
  transform: scale(0.8);
  cursor: pointer;
  filter: invert(1);
}

html[data-theme="dark"] .button-arrow {
  filter: none;
}

.button-card {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;

  .button {
    background: var(--theme-btn-hover-color);
    padding: 10px 28px;
    color: #0d1117;
    cursor: pointer;
    border-radius: 999px;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.2s ease-in 0s;
    font-family: var(--mono-font-family);
  }
}

@media (max-width: 1200px) {
  .info-content {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}

@media (max-width: 860px) {
  .info {
    width: 94%;
    top: 50%;
    max-height: 88%;
    padding: 0 8px;
    box-sizing: border-box;
  }

  .info-title {
    font-size: 1.3rem;
    margin-bottom: 14px;
    flex-shrink: 0;
  }

  .info-content {
    grid-template-columns: repeat(1, 1fr);
    width: 100% !important;
    gap: 10px;
    flex: 1;
    max-height: none;
    padding-bottom: 4px;
    -webkit-overflow-scrolling: touch;
  }

  .info-item {
    height: auto !important;
    min-height: 92px;
    width: 100% !important;
  }

  .info-item a {
    display: block !important;
    height: 100%;
  }

  .text-card a {
    padding: 14px;
  }

  .text-card-body {
    gap: 8px;
  }

  .text-card-title {
    font-size: 15px;
  }

  .text-card-tags {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
  }

  .tag-chip {
    padding: 2px 8px;
    font-size: 10px;
  }

  .text-card-desc {
    font-size: 12px;
    -webkit-line-clamp: 2;
    line-height: 1.5;
  }

  .button-card {
    margin-top: 12px;
    flex-shrink: 0;
  }
}
</style>
