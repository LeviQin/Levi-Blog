<template>
  <div>
    <Head>
      <meta
        name="keywords"
        content="加密,解密,对称加密,非对称加密,非对称在线加密解密，AES、DES、MD5、RC4、Rabbit、TripleDes在线加密解密，并且支持密钥方式。"
      />
      <meta
        name="description"
        content="支持多种对称&amp;非对称在线加密解密，AES、DES、MD5、RC4、Rabbit、TripleDes在线加密解密，并且支持密钥方式。"
      />
    </Head>
    <div class="ed-root w theme-bg-color all-tool-container">
      <div class="ed-body">
        <header class="ed-header">
          <div class="ed-header-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--btn-tag-bg-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
          </div>
          <div class="ed-header-text">
            <h1>在线加解密工具</h1>
            <p>支持多种对称加密算法 &mdash; 所有计算在浏览器本地完成，数据不上传</p>
          </div>
        </header>

        <div class="ed-layout">
          <nav class="ed-sidebar">
            <button
              v-for="cat in categories"
              :key="cat.value"
              class="ed-nav-item"
              :class="{ active: selectedCategory === cat.value }"
              @click="selectCategory(cat)"
            >
              <span class="ed-nav-icon" v-html="cat.icon"></span>
              <span class="ed-nav-label">{{ cat.label }}</span>
              <span class="ed-nav-badge" v-if="cat.badge">{{ cat.badge }}</span>
            </button>
          </nav>

          <main class="ed-content">
            <transition name="ed-fade" mode="out-in">
              <component :is="selectedCategoryComponent" :key="selectedCategory" />
            </transition>
          </main>
        </div>

        <footer class="ed-footer">
          <div class="ed-footer-head">
            <svg class="icon" aria-hidden="true"><use xlink:href="#levi-guanyu-"></use></svg>
            <span>安全说明</span>
          </div>
          <div class="ed-footer-grid">
            <div class="ed-footer-card">
              <div class="ed-footer-card-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#67c23a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              </div>
              <strong>本地计算</strong>
              <p>所有加解密运算均在您的浏览器中完成，明文和密钥不会发送到服务器。</p>
            </div>
            <div class="ed-footer-card">
              <div class="ed-footer-card-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--theme-btn-hover-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <strong>CryptoJS 驱动</strong>
              <p>基于广泛使用的 CryptoJS 加密库，确保算法实现的准确性和可靠性。</p>
            </div>
            <div class="ed-footer-card">
              <div class="ed-footer-card-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--btn-tag-bg-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <strong>使用须知</strong>
              <p>请妥善保管您的密钥。对于关键数据，建议结合多种加密方式使用。</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { Head } from "@vueuse/head";

import AESPassword from "./components/Password/AESPassword.vue";
import DESPassword from "./components/Password/DESPassword.vue";
import RC4Password from "./components/Password/RC4Password.vue";
import RabbitPassword from "./components/Password/RabbitPassword.vue";
import TripleDESPassword from "./components/Password/TripleDESPassword.vue";
import MD5Password from "./components/Password/MD5Password.vue";
import Base64Password from "./components/Password/Base64Password.vue";

const categories = [
  { value: "AESPassword", label: "AES", badge: "推荐", icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>' },
  { value: "DESPassword", label: "DES", badge: "", icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/></svg>' },
  { value: "RC4Password", label: "RC4", badge: "", icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>' },
  { value: "RabbitPassword", label: "Rabbit", badge: "", icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 116.71-9h1.79a4.5 4.5 0 110 9z"/></svg>' },
  { value: "TripleDESPassword", label: "3DES", badge: "", icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' },
  { value: "Base64Password", label: "Base64", badge: "", icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>' },
  { value: "MD5Password", label: "MD5", badge: "哈希", icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>' },
];

const selectedCategory = ref("AESPassword");

const selectCategory = (category) => {
  selectedCategory.value = category.value;
};

const selectedCategoryComponent = computed(() => {
  const map = {
    AESPassword, DESPassword, RC4Password, RabbitPassword,
    TripleDESPassword, Base64Password, MD5Password,
  };
  return map[selectedCategory.value];
});

onMounted(() => {
  selectedCategory.value = "AESPassword";
});
</script>

<style lang="scss" scoped>
.ed-root {
  border-radius: var(--theme-radius);
  padding: 32px 36px;
}

.ed-header {
  text-align: center;
  margin-bottom: 36px;
}

.ed-header-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 20px;
  background: var(--theme-color);
  border: 1px solid var(--border-color);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
}

.ed-header-text {
  h1 { font-size: 26px; font-weight: 700; margin: 0 0 8px; color: var(--color); letter-spacing: -0.02em; }
  p  { font-size: 14px; color: var(--text-secondary); margin: 0; }
}

.ed-layout {
  display: flex;
  gap: 28px;
  align-items: flex-start;
}

.ed-sidebar {
  width: 184px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  position: sticky;
  top: 100px;
}

.ed-nav-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  background: transparent;
  cursor: pointer;
  transition: background .2s, color .2s;
  text-align: left;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
  outline: none;

  &:hover {
    background: rgba(127, 127, 127, 0.08);
    color: var(--color);
  }

  &.active {
    background: rgba(34, 211, 238, 0.1);
    color: var(--theme-btn-hover-color);
    font-weight: 600;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 18px;
      border-radius: 2px;
      background: var(--theme-btn-hover-color);
    }

    .ed-nav-icon { color: var(--theme-btn-hover-color); }
    .ed-nav-badge { background: rgba(34,211,238,.16); color: var(--theme-btn-hover-color); }
  }
}

.ed-nav-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: color .2s;
}

.ed-nav-label { flex: 1; white-space: nowrap; }

.ed-nav-badge {
  font-size: 10px;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 999px;
  color: var(--theme-btn-hover-color);
  background: rgba(34,211,238,.12);
  transition: background .2s, color .2s;
  white-space: nowrap;
}

.ed-content {
  flex: 1;
  min-width: 0;
}

.ed-fade-enter-active,
.ed-fade-leave-active { transition: opacity .2s ease; }
.ed-fade-enter-from,
.ed-fade-leave-to { opacity: 0; }

.ed-footer {
  margin-top: 48px;
  padding-top: 28px;
  border-top: 1px solid var(--border-color);
}

.ed-footer-head {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: var(--color);
  margin-bottom: 20px;
  .icon { width: 1.2em; height: 1.2em; color: var(--theme-btn-hover-color); }
}

.ed-footer-grid {
  display: flex;
  gap: 16px;
}

.ed-footer-card {
  flex: 1;
  padding: 22px;
  border-radius: 14px;
  background: var(--theme-color);
  border: 1px solid var(--border-color);
  transition: border-color .25s, transform .2s;
  &:hover {
    border-color: rgba(34, 211, 238, 0.35);
    transform: translateY(-2px);
  }
  .ed-footer-card-icon { margin-bottom: 12px; }
  strong { display: block; font-size: 14px; font-weight: 600; color: var(--color); margin-bottom: 6px; }
  p { font-size: 13px; color: var(--text-secondary); margin: 0; line-height: 1.65; }
}

@media (max-width: 860px) {
  .ed-root { padding: 20px 16px; }
  .ed-header { margin-bottom: 24px; }
  .ed-header-text h1 { font-size: 22px; }
  .ed-header-icon { width: 52px; height: 52px; }
  .ed-layout { flex-direction: column; gap: 20px; }
  .ed-sidebar {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 6px;
    position: static;
  }
  .ed-nav-item { font-size: 12px; padding: 8px 14px; border-radius: 8px; }
  .ed-nav-item.active::before { display: none; }
  .ed-nav-badge { display: none; }
  .ed-footer-grid { flex-direction: column; }
}
</style>
