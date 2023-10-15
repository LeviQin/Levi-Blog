<template>
  <div class="encryption-and-decryption">
    <div class="tabs-card w">
      <el-tabs
        tab-position="top"
        style="height: 200px"
        class="demo-tabs"
        type="border-card"
      >
        <el-tab-pane label="AES加/解密"> </el-tab-pane>
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
import { ref } from "vue";
</script>

<style lang="scss" scoped></style>
