<template>
  <div class="portfolio w">
    <section class="term-hero" aria-label="作品集统计">
      <div class="term-bar">
        <span class="term-dot red"></span>
        <span class="term-dot yellow"></span>
        <span class="term-dot green"></span>
        <span class="term-title">levi:~/portfolio</span>
      </div>
      <div class="term-body">
        <div class="term-line">
          <span class="term-prompt">➜</span>
          <span class="term-cmd">~ $ ls ./projects</span>
        </div>
        <div class="term-line">
          <span class="term-prompt">➜</span>
          <span class="term-out">total {{ projects.length }} · {{ categoryCount }} categories</span>
          <span class="term-cursor"></span>
        </div>
      </div>
    </section>

    <div class="portfolio-head">
      <h1 class="portfolio-title">作品集</h1>
      <p class="portfolio-sub">前端负责人 · 主导多项目架构与技术选型</p>
    </div>

    <div class="filter-tabs" role="tablist" aria-label="项目类型筛选">
      <button
        v-for="f in filters"
        :key="f.key"
        class="filter-tab"
        :class="{ active: filter === f.key }"
        type="button"
        role="tab"
        :aria-selected="filter === f.key"
        @click="filter = f.key"
      >
        {{ f.label }}<span class="filter-count">{{ f.count }}</span>
      </button>
    </div>

    <div class="portfolio-grid">
      <div
        v-for="(item, index) in filtered"
        :key="item.id"
        class="portfolio-card"
        v-slid-in
      >
        <div class="card-inner" @mousemove="handleTilt" @mouseleave="resetTilt">
          <div class="code-head">
            <span class="term-dot red"></span>
            <span class="term-dot yellow"></span>
            <span class="term-dot green"></span>
            <span class="code-file">{{ item.name }}.vue</span>
            <span class="code-index">P-{{ pad(index + 1) }}</span>
            <span
              class="cat-badge"
              :style="catBadgeStyle(item.category)"
            >{{ item.category }}</span>
          </div>
          <a
            class="card-link-area"
            :href="item.link || undefined"
            :target="item.link ? '_blank' : undefined"
            :rel="item.link ? 'noopener noreferrer' : undefined"
          >
            <div class="code-body">
              <div class="code-name-row" :title="item.name">
                <span class="code-keyword">const</span>
                <span class="code-name">{{ item.name }}</span>
                <span class="code-arrow">= () =&gt; {</span>
              </div>
              <p class="code-desc">
                <span class="code-comment">//</span>{{ item.desc }}
              </p>
              <div class="code-footer">
                <div class="code-tags">
                  <span v-for="tag in item.tags" :key="tag" class="tag-chip">{{ tag }}</span>
                </div>
                <span v-if="item.link" class="code-link" aria-label="访问项目">
                  <i class="bi bi-box-arrow-up-right"></i>
                </span>
                <span v-else class="code-local">本地</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>

    <div class="portfolio-back">
      <button class="back-btn" type="button" @click="router.push('/about')">← 返回关于我</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { vSlidIn } from "@/utils/vSlidIn.js";
import { projects } from "./projects";

const router = useRouter();

const filter = ref("all");

// 技术分类色板（深色代码面板上用亮色）
const categoryColors = {
  JS: "#facc15",
  Vue: "#4ade80",
  "Node.js": "#a3e635",
  "uni-app": "#67e8f9",
  WordPress: "#a78bfa",
  Flutter: "#60a5fa",
};

const catColor = (c) => categoryColors[c] || "#67e8f9";

const categoryCount = computed(() => new Set(projects.map((p) => p.category)).size);

const catBadgeStyle = (c) => {
  const color = catColor(c);
  return {
    color,
    borderColor: `${color}59`,
    background: `${color}1a`,
  };
};

const filters = computed(() => {
  const counts = {};
  projects.forEach((p) => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });
  return [
    { key: "all", label: "全部", count: projects.length },
    ...Object.keys(counts).map((c) => ({ key: c, label: c, count: counts[c] })),
  ];
});

const filtered = computed(() => {
  if (filter.value === "all") return projects;
  return projects.filter((p) => p.category === filter.value);
});

const pad = (n) => String(n).padStart(2, "0");

const prefersReduced = () =>
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// 3D tilt：跟随鼠标微倾角
const handleTilt = (e) => {
  if (prefersReduced()) return;
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  el.style.transform = `perspective(1000px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 4).toFixed(2)}deg)`;
};

const resetTilt = (e) => {
  e.currentTarget.style.transform = "";
};
</script>

<style lang="scss" scoped>
.portfolio {
  max-width: 1366px;
  margin: 0 auto;
  padding: 40px 20px 60px;
  min-height: 100vh;
}

/* ===== 终端 Hero ===== */
.term-hero {
  max-width: 720px;
  margin: 0 auto 44px;
  border-radius: 16px;
  overflow: hidden;
  background: #0d1117;
  border: 1px solid rgba(34, 211, 238, 0.18);
  box-shadow: var(--shadow-raise);
  font-family: var(--mono-font-family);
}

.term-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: #161b22;
  border-bottom: 1px solid #21262d;
}

.term-dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  flex-shrink: 0;

  &.red { background: #f85149; }
  &.yellow { background: #d29922; }
  &.green { background: #3fb950; }
}

.term-title {
  margin-left: 8px;
  font-size: 13px;
  color: #8b949e;
}

.term-body {
  padding: 18px 20px;
  font-size: 13px;
  line-height: 1.9;
}

.term-line {
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
}

.term-prompt {
  color: #3fb950;
  flex-shrink: 0;
}

.term-cmd {
  color: #e6edf3;
}

.term-out {
  color: #8b949e;
}

.term-cursor {
  display: inline-block;
  width: 8px;
  height: 15px;
  background: #22d3ee;
  vertical-align: -2px;
  animation: caretBlink 1s steps(1) infinite;
}

@keyframes caretBlink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

/* ===== 头部 ===== */
.portfolio-head {
  text-align: center;
  margin-bottom: 28px;
}

.portfolio-title {
  font-size: 38px;
  font-weight: 700;
  color: var(--color);
  font-family: var(--mono-font-family);
  margin: 0 0 8px;
  letter-spacing: 0.02em;
}

.portfolio-sub {
  color: var(--text-secondary);
  font-size: 15px;
  margin: 0;
}

/* ===== 筛选 Tab ===== */
.filter-tabs {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.filter-tab {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: var(--theme-color);
  color: var(--text-secondary);
  font-size: 14px;
  font-family: var(--mono-font-family);
  cursor: pointer;
  transition: all var(--dur-fast) var(--ease-standard);

  .filter-count {
    font-size: 12px;
    opacity: 0.7;
  }

  &:hover {
    border-color: var(--theme-btn-hover-color);
    color: var(--theme-btn-hover-color);
  }

  &.active {
    background: var(--theme-btn-hover-color);
    border-color: var(--theme-btn-hover-color);
    color: #0d1117;
    box-shadow: 0 4px 14px rgba(6, 182, 212, 0.25);
  }

  &:focus-visible {
    outline: 2px solid var(--theme-btn-hover-color);
    outline-offset: 2px;
  }
}

/* ===== 卡片：深色代码面板 ===== */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 18px;
}

.portfolio-card {
  border-radius: 12px;
  background: #0d1117;
  border: 1px solid #30363d;
  overflow: hidden;
  transition: box-shadow var(--dur-normal) var(--ease-standard),
    border-color var(--dur-normal) var(--ease-standard);

  &:hover {
    border-color: rgba(34, 211, 238, 0.55);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(34, 211, 238, 0.08);

    .code-name {
      color: #67e8f9;
    }

    .code-link {
      color: #67e8f9;
      border-color: rgba(34, 211, 238, 0.5);
    }
  }
}

.card-inner {
  height: 100%;
  display: flex;
  flex-direction: column;
  will-change: transform;
}

.code-head {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 12px;
  background: #161b22;
  border-bottom: 1px solid #21262d;
  font-family: var(--mono-font-family);
}

.code-file {
  flex: 1;
  min-width: 0;
  font-size: 11px;
  color: #8b949e;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.code-index {
  flex-shrink: 0;
  font-size: 10px;
  color: #484f58;
  letter-spacing: 0.1em;
}

.cat-badge {
  flex-shrink: 0;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  border: 1px solid;
}

.card-link-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  min-height: 0;
}

.code-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 14px 16px 13px;
  min-height: 168px;
}

.code-name-row {
  display: flex;
  align-items: baseline;
  gap: 7px;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
}

.code-keyword {
  font-size: 12px;
  font-family: var(--mono-font-family);
  color: #67e8f9;
  flex-shrink: 0;
}

.code-name {
  font-size: 15px;
  font-weight: 700;
  font-family: var(--mono-font-family);
  color: #e6edf3;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.25s ease;
}

.code-arrow {
  font-size: 11px;
  font-family: var(--mono-font-family);
  color: #8b949e;
  flex-shrink: 0;
}

.code-desc {
  font-size: 12px;
  line-height: 1.7;
  color: #8b949e;
  font-family: var(--mono-font-family);
  margin: 0;
  word-break: break-word;
}

.code-comment {
  color: #7ee787;
  margin-right: 5px;
}

.code-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding-top: 10px;
  margin-top: auto;
  padding-bottom: 0;
  border-top: 1px solid #21262d;
}

.code-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  min-width: 0;
}

.tag-chip {
  padding: 2px 8px;
  border-radius: 5px;
  font-size: 10px;
  font-family: var(--mono-font-family);
  color: #67e8f9;
  background: rgba(34, 211, 238, 0.1);
  border: 1px solid rgba(34, 211, 238, 0.22);
  white-space: nowrap;
}

.code-link {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #8b949e;
  background: transparent;
  border: 1px solid #30363d;
  transition: color var(--dur-fast) var(--ease-standard),
    border-color var(--dur-fast) var(--ease-standard);

  .bi {
    font-size: 12px;
  }
}

.code-local {
  flex-shrink: 0;
  font-size: 10px;
  font-family: var(--mono-font-family);
  color: #6e7681;
  padding: 3px 8px;
  border-radius: 5px;
  border: 1px dashed #30363d;
}

/* ===== 底部返回 ===== */
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
  transition: all var(--dur-fast) var(--ease-standard);

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
    font-size: 28px;
  }

  .portfolio-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .term-hero {
    margin-bottom: 32px;
  }

  .term-body {
    font-size: 12px;
  }

  .code-body {
    min-height: 150px;
  }
}
</style>
