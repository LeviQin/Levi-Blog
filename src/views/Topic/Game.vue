<template>
  <div class="notes w">
    <top-banner :bannerConfig="bannerConfig"></top-banner>
    <div class="notes-container page-container">
      <article class="notes-main">1</article>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { getCategoryArticles } from "@/api/articles.js";
import TopBanner from "@/components/TopBanner/Index.vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";

const router = useRouter();

onMounted(() => {
  getData();
});

const dataMap = reactive({
  tableData: [],
  data: [],
  paginationDatas: {
    pageSizes: [10, 20, 40, 60, 100, 200, 500],
    small: false,
    disabled: false,
    total: 0,
    layout: "prev, pager, next",
    background: true,
  },
});

let page = ref(1);
let pageSize = ref(10);

const bannerConfig = {
  height: "30vh",
  showArrow: false,
  title: "Levi",
  text: "快乐，不是因为拥有的多，而是计较的少",
};

const toDetail = (item) => {
  router.push({
    name: "Topic Detail",
    params: {
      id: item.id,
    },
  });
};

const getTableData = () => {
  dataMap.paginationDatas.total = dataMap.tableData.length;
  let firstIndex = pageSize.value * page.value - pageSize.value; // 开始查找的数据下标
  dataMap.data = dataMap.tableData.slice(firstIndex, pageSize.value + firstIndex); // 截取分页数据
};

const handleCurrentChange = (val) => {
  page.value = val;
  getTableData();
  technologyRef.value.scrollIntoView({ behavior: "smooth" });
};

const getData = async () => {
  try {
    const res = await getCategoryArticles({ category: "4" });
    const { code, data } = res.data;
    if (code === 200) {
      dataMap.tableData = data.map((item) => {
        item.updated_at = dayjs(item.updated_at).format("YYYY-MM-DD hh:mm:ss");
        return item;
      });
      getTableData();
    }
  } catch (error) {
    console.log(error, "error---------------------");
  }
};
</script>

<style lang="scss" scoped>
.notes-main {
  flex: 1;
}
</style>
