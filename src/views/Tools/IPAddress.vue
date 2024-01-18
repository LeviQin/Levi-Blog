<template>
  <div class="ip-address w">
    <!-- <div class="search-bar">
      <div class="search-bar-left">1</div>
      <div class="search-bar-right"></div>
    </div>
    <div class="details-box"></div> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { identifyIpArea } from "@/api/tools";

onMounted(() => {
  getIpAddress();
});

const getIpAddress = async () => {
  const res = await identifyIpArea();
  const { code, data } = res.data;
  if (code === 200) {
    console.log(data, "data=========");
  }
};
</script>

<style lang="scss" scoped>
.search-bar {
  display: flex;
  background: var(--themeColor);
  padding: 20px;
  border-radius: 20px;
}

.search-bar-left,
.search-bar-right {
  flex: 1;
  background-color: #fff;
  margin: 0 10px;
}
</style>
