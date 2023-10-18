<template>
  <div class="life-tools">
    <div class="tabs-card w">
      <el-tabs tab-position="top" class="demo-tabs" type="border-card">
        <el-tab-pane label="备案查询"> 1 </el-tab-pane>
        <el-tab-pane label="公网备案查询">Config</el-tab-pane>
        <el-tab-pane label="IP地址查询">Role</el-tab-pane>
        <el-tab-pane label="WHOIS查询">Task</el-tab-pane>
        <el-tab-pane label="SEO查询">Task</el-tab-pane>
        <el-tab-pane label="端口扫描工具">Task</el-tab-pane>
        <el-tab-pane label="robots文件生成">Task</el-tab-pane>
        <el-tab-pane label="nslookup查询">Task</el-tab-pane>
        <el-tab-pane label="短网址生成 & 解析">Task</el-tab-pane>
        <el-tab-pane label="域名全面检测">Task</el-tab-pane>
        <el-tab-pane label="PR查询">Task</el-tab-pane>
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
