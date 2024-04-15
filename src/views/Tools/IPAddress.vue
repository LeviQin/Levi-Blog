<template>
  <div class="ip-address w">
    <div
      class="search-bar"
      :class="{ 'sidin-start': true, 'sidin-end': isSidebarVisible }"
    >
      <div class="search-bar-left">
        <div class="search-bar-item-box search-bar-left-title">
          <span>* 您的IP地址是：</span>
          <span class="user-ip" @click="searchUserIp">{{ userIp }}</span>
        </div>
        <div class="search-bar-item-box search-bar-inupt-card">
          <el-input
            @keyup.enter="searchIpAddress"
            :prefix-icon="Location"
            size="large"
            v-model="ip"
            placeholder="IP 地址"
          ></el-input>
        </div>
        <div class="search-bar-item-box search-bar-btn-card">
          <el-button size="large" type="primary" @click="searchIpAddress">查询</el-button>
          <el-button size="large" @click="clearInfo" type="info">清除</el-button>
        </div>
        <div class="search-bar-item-box">
          <span>输入IP地址</span>
        </div>
        <div class="search-bar-item-box">
          <span
            >使用 IP 地址查找来检查 IP 并显示与该一个IP 地址相关的详细信息。
            搜索地理位置、城市、省份等信息。</span
          >
        </div>
        <div class="search-bar-item-box ip-tips-card">
          <span
            >输入如下所示的 IP 地址：10.11.12.13（四个数字以句点分隔 - 每个数字应介于
            0-255 之间）。</span
          >
        </div>
      </div>
      <div class="search-bar-right">
        <div class="search-bar-item-box details-box-title">
          <span>IP地址详情</span>
        </div>
        <el-form
          label-position="right"
          label-width="auto"
          v-loading="loading"
          element-loading-background="rgba(122, 122, 122, 0)"
        >
          <el-form-item class="el-form-item-label" label="IP地址:">
            <span class="el-form-item-value">{{ dataMap.addressInfo.ip || "-" }}</span>
          </el-form-item>
          <el-form-item class="el-form-item-label" label="省份:">
            <span class="el-form-item-value">{{
              dataMap.addressInfo.province || "-"
            }}</span>
          </el-form-item>
          <el-form-item class="el-form-item-label" label="城市:">
            <span class="el-form-item-value">{{ dataMap.addressInfo.city || "-" }}</span>
          </el-form-item>
          <el-form-item class="el-form-item-label" label="经纬度:">
            <span class="el-form-item-value">{{
              dataMap.addressInfo.rectangle || "-"
            }}</span>
          </el-form-item>
          <el-form-item class="el-form-item-label" label="操作系统:">
            <span class="el-form-item-value">{{
              `${dataMap.addressInfo.os || "-"} ${dataMap.addressInfo.osVer || ""}`
            }}</span>
          </el-form-item>
          <el-form-item class="el-form-item-label" label="浏览器:">
            <span class="el-form-item-value">{{
              dataMap.addressInfo.browserName || "-"
            }}</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { identifyIpArea } from "@/api/tools";
import { ElEMessage } from "@/utils/resetMessage.js";
import Bowser from "bowser";
import { Location } from "@element-plus/icons-vue";

onMounted(() => {
  isSidebarVisible.value = true;
  getIpAddress();
});

const dataMap = reactive({
  addressInfo: {},
});

let ip = ref("");
let userIp = ref("");
let loading = ref(false);
let isSidebarVisible = ref(false);

const clearInfo = () => {
  ip.value = "";
  dataMap.addressInfo = {};
};

const searchUserIp = () => {
  ip.value = userIp.value;
  searchIpAddress();
};

const searchIpAddress = async () => {
  try {
    if (ip.value === "") {
      ElEMessage({
        type: "warning",
        message: "请输入需要查询的IP",
      });
      return;
    }
    loading.value = true;
    const res = await identifyIpArea({ ip: ip.value });
    const { code, data } = res.data;
    if (code === 200) {
      const userAgent = navigator.userAgent;
      const browserInfo = Bowser.parse(userAgent);
      dataMap.addressInfo = {
        ...data,
        os: browserInfo.os.name,
        osVer: browserInfo.os.versionName,
        browserName: browserInfo.browser.name,
      };
      for (const key in dataMap.addressInfo) {
        if (Object.hasOwnProperty.call(dataMap.addressInfo, key)) {
          if (
            Array.isArray(dataMap.addressInfo[key]) &&
            dataMap.addressInfo[key].length < 1
          )
            dataMap.addressInfo[key] = "";
        }
      }
    }
  } catch (error) {
    console.log(error, "error----------------------------");
  } finally {
    loading.value = false;
  }
};

const getIpAddress = async () => {
  try {
    const res = await identifyIpArea();
    const { code, data } = res.data;
    if (code === 200) {
      userIp.value = data.ip;
    }
  } catch (error) {
    console.log(error, "error----------------------------");
  }
};
</script>

<style lang="scss" scoped>
.ip-address {
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-bar {
  display: flex;
  width: 100%;
}

.search-bar-left,
.search-bar-right {
  background: var(--themeColor);
  border-radius: var(--themeRadius);
  padding: 40px;
}

.search-bar-left {
  flex: 1;
}

.search-bar-right {
  width: 40%;
}

.search-bar-left {
  margin-right: 10px;
}

.search-bar-right {
  margin-left: 10px;
}

.search-bar-item-box {
  margin-bottom: 15px;
}

.search-bar-item-box:last-child {
  margin-bottom: 0;
}

.search-bar-left-title {
  font-size: 18px;
}

.search-bar-inupt-card {
  padding: 10px 0;
}

.search-bar-btn-card {
  padding: 10px 0;
}

.user-ip {
  cursor: pointer;
  color: var(--linkTextColor);
}

.ip-tips-card {
  font-size: 14px;
}

.details-box {
  background: var(--themeColor);
  padding: 20px;
  border-radius: var(--themeRadius);
  margin-top: 20px;
}

.details-box-title {
  font-size: 24px;
  color: var(--balckTextColor);
}

.el-form-item-value {
  font-weight: 400;
  word-break: break-all;
}

:v-deep .el-form-item {
  margin-bottom: 10px;
  font-weight: 600;
}

@media (max-width: 860px) {
  .ip-address {
    margin: 0 20px;
  }

  .search-bar {
    display: block;
  }

  .search-bar-left,
  .search-bar-right {
    padding: 20px;
    margin: 0;
    width: auto;
  }

  .search-bar-left {
    margin-bottom: 20px;
  }

  .details-box-title {
    font-size: 22px;
  }
}
</style>
