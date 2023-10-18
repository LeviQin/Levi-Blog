<template>
  <div class="ip-Address">test</div>
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

<style lang="scss" scoped></style>
