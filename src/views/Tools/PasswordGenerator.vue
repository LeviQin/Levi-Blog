<template>
  <Head>
    <meta name="keywords" content="安全, 随机, 强大, 随机密码, 生成强密码, 密码生成器" />
    <meta
      name="description"
      content="✓安全 ✓随机 ✓强大 —— 使用我们的随机密码生成器生成强密码。"
    />
    <meta
      property="og:description"
      content="✓安全 ✓随机 ✓强大 —— 使用我们的随机密码生成器生成强密码。"
    />
    <meta
      name="twitter:description"
      content="✓安全 ✓随机 ✓强大 —— 使用我们的随机密码生成器生成强密码。"
    />
  </Head>
  <div class="password w theme-bg-color">
    <div class="content">
      <div class="tool-title">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-mima"></use>
        </svg>
        <h1>随机密码生成器</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { identifyIpArea, cityCode, weatherInfo } from "@/api/tools";
import { Head } from "@vueuse/head";

onMounted(() => {
  getIpAddress();
});

const dataMap = reactive({
  weatherInfo: null,
});

const getIpAddress = async () => {
  const res = await identifyIpArea();
  const { code, data } = res.data;
  if (code === 200) {
    getCityCode(data.city);
  }
};

const getCityCode = async (cityName) => {
  const res = await cityCode({ cityName });
  const { code, data } = res.data;
  if (code === 200) {
    const cityCode = data.geocodes[0]?.adcode;
    getWeatherInfo(cityCode);
  }
};

const getWeatherInfo = async (cityCode) => {
  const res = await weatherInfo({ cityCode });
  const { code, data } = res.data;
  if (code === 200) {
    console.log(data, "data=========");
    dataMap.weatherInfo = data;
  }
};
</script>

<style lang="scss" scoped>
.password .content {
  padding: 20px;
}

.tool-title {
  display: flex;
  align-items: center;
}

.tool-title h1 {
  font-size: 24px;
}

.tool-title .icon {
  width: 1.8em;
  height: 1.8em;
  margin-right: 10px;
}
</style>
