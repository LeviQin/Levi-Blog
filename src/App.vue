<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { getTagList } from "@/api/articles";
import { useMainStore } from "@/stores/mainStore";

const mainStore = useMainStore();

onMounted(() => {
  getTags();
});
const getTags = async () => {
  const res = await getTagList();
  const { code, data } = res.data;
  if (code == 200) {
    mainStore.setTagMap(data);
  }
};
</script>
<style lang="scss" scoped>
#app {
  position: relative;
  height: 100%;
}
</style>
