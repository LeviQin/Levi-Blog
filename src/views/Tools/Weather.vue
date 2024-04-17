<template>
  <div class="weather w theme-bg-color">
    <div class="content">
      <div class="tool-title">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-tianqi"></use>
        </svg>
        <h1>天气查询</h1>
      </div>
    </div>
  </div>
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
.weather .content {
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
