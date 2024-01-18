<template>
  <div class="weather w"></div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { identifyIpArea, cityCode, weatherInfo } from "@/api/tools";

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
.weather {
  background: var(--themeColor);
  border-radius: var(--themeRadius);
}
</style>
