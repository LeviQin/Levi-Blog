<template>
  <div class="life-tools">
    <div class="tabs-card w">
      <el-tabs tab-position="top" class="demo-tabs" type="border-card">
        <el-tab-pane label="在线调色板"> 1 </el-tab-pane>
        <el-tab-pane label="网页常用色彩">Config</el-tab-pane>
        <el-tab-pane label="中日传统色彩">Role</el-tab-pane>
        <el-tab-pane label="传图识色">Task</el-tab-pane>
        <el-tab-pane label="WEB安全色">Task</el-tab-pane>
        <el-tab-pane label="网页颜色选择器">Task</el-tab-pane>
        <el-tab-pane label="RGB颜色值查询">Task</el-tab-pane>
        <el-tab-pane label="图片大小修改">Task</el-tab-pane>
        <el-tab-pane label="图片压缩">Task</el-tab-pane>
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
