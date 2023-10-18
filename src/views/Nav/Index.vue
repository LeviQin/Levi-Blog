<template>
  <div class="container">
    <div class="website-card w">
      <el-tabs tab-position="left" class="tabs-card" type="border-card">
        <el-tab-pane label="文档">
          <div class="tab-item">
            <div class="website-item-card" v-for="item in documentMap" :key="item.id">
              <div class="website-item" @click="toSitePage(item.url)">
                <div class="website-img">
                  <img :src="item.image" :alt="item.title" />
                </div>
                <div class="website-title">
                  <span>{{ item.title }}</span>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="社区">
          <div class="tab-item">
            <div class="website-item-card" v-for="item in communityMap" :key="item.id">
              <div class="website-item" @click="toSitePage(item.url)">
                <div class="website-img">
                  <img :src="item.image" :alt="item.title" />
                </div>
                <div class="website-title">
                  <span>{{ item.title }}</span>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="工具">
          <div class="tab-item">
            <div class="website-item-card" v-for="item in toolMap" :key="item.id">
              <div class="website-item" @click="toSitePage(item.url)">
                <div class="website-img">
                  <img :src="item.image" :alt="item.title" />
                </div>
                <div class="website-title">
                  <span>{{ item.title }}</span>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getSiteList } from "@/api/webdev";

onMounted(() => {
  getSiteNavList();
});

let documentMap = ref([]);
let communityMap = ref([]);
let toolMap = ref([]);

const getSiteNavList = async () => {
  const res = await getSiteList();
  const { code, data } = res.data;
  if (code === 200) {
    documentMap.value = data.filter((item) => item.type === 1);
    communityMap.value = data.filter((item) => item.type === 2);
    toolMap.value = data.filter((item) => item.type === 3);
  }
};

const toSitePage = (url) => {
  window.open(url);
};
</script>

<style lang="scss" scoped>
.tab-item {
  display: flex;
  flex-wrap: wrap;
}

.website-item-card {
  position: relative;
  width: 270px;
  height: 150px;
  margin: 10px;

  .website-item {
    width: 100%;
    height: 100%;
    cursor: pointer;
    border-radius: 15px;
    top: 0;
    position: absolute;
    transition: all 0.4s;
    background: linear-gradient(to bottom, #ffffff, #ecf0f9);
    border: 2px solid #fff;
    box-shadow: 8px 8px 20px 0 rgb(55 99 170 / 10%);
    background-image: linear-gradient(0deg, #fff, #f3f5f8);

    &:hover {
      position: absolute;
      top: -8px;
      transition: all 0.4s;
    }

    .website-img {
      margin-top: 20px;
      width: 100%;
      height: 70px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 80%;
        height: 80%;
        object-fit: contain;
      }
    }

    .website-title {
      text-align: center;
      line-height: 50px;
      color: #383e4a;
      font-size: 22px;
    }
  }
}

.tabs-card {
  width: 100%;
}
</style>
