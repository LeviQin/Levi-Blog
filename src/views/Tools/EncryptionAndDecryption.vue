<template>
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
  <div class="encryption-decryption w tools-container">
    <div class="encryption-decryption-content">
      <div
        class="sidebar-block"
        :class="{ 'sidin-start': true, 'sidin-end': isSidebarVisible }"
      >
        <ul class="select-category-ul">
          <li
            v-for="category in categories"
            :key="category.value"
            @click="selectCategory(category)"
            :class="{ 'active-category': selectedCategory === category.value }"
          >
            {{ category.label }}
          </li>
        </ul>
      </div>
      <div
        class="tabs-block"
        :class="{ 'sidin-start': true, 'sidin-end': isSidebarVisible }"
      >
        <component :is="selectedCategoryComponent" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { Head } from "@vueuse/head";

import AESPassword from "./components/Password/AESPassword.vue";
import DESPassword from "./components/Password/DESPassword.vue";
import RC4Password from "./components/Password/RC4Password.vue";
import RabbitPassword from "./components/Password/RabbitPassword.vue";
import TripleDESPassword from "./components/Password/TripleDESPassword.vue";
import MD5Password from "./components/Password/MD5Password.vue";
import Base64Password from "./components/Password/Base64Password.vue";

const categories = [
  { value: "AESPassword", label: "AES加/解密" },
  { value: "DESPassword", label: "DES加/解密" },
  { value: "RC4Password", label: "RC4加/解密" },
  { value: "RabbitPassword", label: "Rabbit加/解密" },
  { value: "TripleDESPassword", label: "TripleDes加/解密" },
  { value: "Base64Password", label: "Base64加/解密" },
  { value: "MD5Password", label: "MD5混淆" },
];

const selectedCategory = ref("AESPassword");
const isSidebarVisible = ref(false);

const selectCategory = (category) => {
  selectedCategory.value = category.value;
};

const selectedCategoryComponent = computed(() => {
  return {
    AESPassword: AESPassword,
    DESPassword: DESPassword,
    RC4Password: RC4Password,
    RabbitPassword: RabbitPassword,
    TripleDESPassword: TripleDESPassword,
    Base64Password: Base64Password,
    MD5Password: MD5Password,
  }[selectedCategory.value];
});

onMounted(() => {
  selectedCategory.value = "AESPassword";
  isSidebarVisible.value = true;
});
</script>

<style lang="scss" scoped>
.encryption-decryption-content {
  display: flex;
  gap: 50px;
}

.sidebar-block {
  width: 130px;
}

.select-category-ul {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.select-category-ul li {
  padding: 12px 18px;
  border-radius: var(--theme-radius);
  background: #fff;
  cursor: pointer;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: var(--color);
}

.active-category {
  background: var(--btn-tag-bg-color) !important;
  color: #fff;
}

.tabs-block {
  flex: 1;
}

:deep(.tabs-item) {
  padding: 20px;
  border-radius: var(--theme-radius);
}

:deep(.input-block) {
  display: flex;
  gap: 20px;
}

:deep(.input-block .el-form-item) {
  flex: 1;
}

:deep(.copy-btn-card) {
  width: 100%;
}

@media (max-width: 860px) {
  .encryption-decryption-content {
    flex-direction: column;
    gap: 20px;
  }

  .sidebar-block {
    width: 100%;
  }

  .select-category-ul {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 15px;
  }

  .select-category-ul li {
    font-size: 12px;
  }

  :deep(.input-block) {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
