<template>
  <div class="test">test</div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { articleDetail } from "@/api/article.js";

onMounted(() => {
  getData();
});

const dataMap = reactive({
  cutePetList: [],
});

let loading = ref(false);

const getData = async () => {
  try {
    loading.value = true;
    const res = await articleDetail({ category: "2" });
    const { code, data } = res.data;
    if (code === 200) {
      dataMap.cutePetList = data.map((item) => {
        item.updated_at = dayjs(item.updated_at).format("YYYY-MM-DD");
        return item;
      });
    }
  } catch (error) {
    console.log(error, "error---------------------");
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
