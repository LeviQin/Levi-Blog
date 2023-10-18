<template>
  <div class="life-tools">
    <div class="tabs-card w">
      <el-tabs tab-position="top" class="demo-tabs" type="border-card">
        <el-tab-pane label="AES加/解密"> 1 </el-tab-pane>
        <el-tab-pane label="DES加/解密">Config</el-tab-pane>
        <el-tab-pane label="RC4加/解密">Role</el-tab-pane>
        <el-tab-pane label="Rabbit加/解密">Task</el-tab-pane>
        <el-tab-pane label="TripleDes加/解密">Task</el-tab-pane>
        <el-tab-pane label="MD5加/解密">Task</el-tab-pane>
        <el-tab-pane label="Base64加/解密">Task</el-tab-pane>
        <el-tab-pane label="Hash加/解密">Task</el-tab-pane>
      </el-tabs>
    </div>
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

<style lang="scss" scoped></style>
