<template>
  <Head>
    <meta name="keywords" content="加密,解密,对称加密,非对称加密" />
    <meta
      name="description"
      content="支持多种对称&amp;非对称在线加密解密，AES、DES、MD5、RC4、Rabbit、TripleDes在线加密解密，并且支持密钥方式。"
    />
  </Head>
  <div class="encryption-and-decryption w">
    <div class="tabs-card">
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
import { Head } from "@vueuse/head";
</script>

<style lang="scss" scoped></style>
