<template>
  <div class="encryption-and-decryption">
    <div class="tabs-card w">
      <el-tabs tab-position="top" class="demo-tabs" type="border-card">
        <el-tab-pane label="AES加/解密">
          <AESPassword></AESPassword>
        </el-tab-pane>
        <el-tab-pane label="DES加/解密">
          <DESPassword></DESPassword>
        </el-tab-pane>
        <el-tab-pane label="RC4加/解密">
          <RC4Password></RC4Password>
        </el-tab-pane>
        <el-tab-pane label="Rabbit加/解密">
          <RabbitPassword></RabbitPassword>
        </el-tab-pane>
        <el-tab-pane label="TripleDes加/解密">
          <TripleDESPassword></TripleDESPassword>
        </el-tab-pane>
        <el-tab-pane label="Base64加/解密">
          <Base64Password></Base64Password>
        </el-tab-pane>
        <el-tab-pane label="MD5混淆">
          <MD5Password></MD5Password>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import AESPassword from "./components/Password/AESPassword.vue";
import DESPassword from "./components/Password/DESPassword.vue";
import RC4Password from "./components/Password/RC4Password.vue";
import RabbitPassword from "./components/Password/RabbitPassword.vue";
import TripleDESPassword from "./components/Password/TripleDESPassword.vue";
import MD5Password from "./components/Password/MD5Password.vue";
import Base64Password from "./components/Password/Base64Password.vue";
</script>

<style lang="scss" scoped></style>
