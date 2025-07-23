<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { getTagList } from "@/api/articles";
import { getBlogSetting } from "@/api/blogSetting";
import { getBlogWallpaper } from "@/api/wallpaper.js";
import { useMainStore } from "@/stores/mainStore";

const mainStore = useMainStore();

onMounted(() => {
  getTags();
  getBlogSettingInfo();
  getWallpaper();
});

const updateMetaDescription = (description) => {
  let meta = document.querySelector("meta[name='description']");
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "description";
    document.head.appendChild(meta);
  }
  meta.content = description;
};

const getWallpaper = async () => {
  const res = await getBlogWallpaper("levi-blog");
  const { code, data } = res.data;
  if (code === 200) {
    mainStore.setWallpaperMap(data);
  }
};

const getTags = async () => {
  const res = await getTagList();
  const { code, data } = res.data;
  if (code == 200) {
    mainStore.setTagMap(data);
  }
};

const getBlogSettingInfo = async () => {
  const res = await getBlogSetting("levi-blog");
  const { code, data } = res.data;
  if (code == 200) {
    mainStore.setBlogSettingMap(data);
    document.title = `${data.blog_name} - ${data.blog_description}`;
    const link = document.querySelector("link[rel~='icon']");
    link.type = "image/png";
    link.href = data.blog_logo;
    updateMetaDescription(data.blog_description);
  }
};
</script>
<style lang="scss" scoped>
#app {
  position: relative;
  height: 100%;
}
</style>
