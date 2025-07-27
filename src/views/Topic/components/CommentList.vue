<template>
  <div class="comment-list theme-bg-color">
    <div class="box-title">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#levi-liuyanban"></use>
      </svg>
      <h2>评论区</h2>
    </div>
    <template v-if="dataMap.msgList.length">
      <!-- 渲染树形结构的评论 -->
      <template v-for="msg in dataMap.msgList" :key="msg.id">
        <MessageItem :message="msg" :level="0" @replyMessage="replyMessage" />
      </template>
    </template>
    <template v-else>
      <p>评论区暂时还没有评论呢~</p>
    </template>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, onMounted, defineEmits } from "vue";
import { getComments } from "@/api/comments.js";
import MessageItem from "@/components/MessageItem/MessageItem.vue";
import dayjs from "dayjs";
import { dateToString } from "@/utils/utils.js";

const props = defineProps({
  postId: {
    type: [String, Number],
    default: "",
  },
});

onMounted(() => {
  getCommentList();
});

const dataMap = reactive({
  msgList: [],
});

const replyMessage = (message) => {
  emit("replyMessage", message);
};

const formatMsg = (msgList) => {
  const formatItem = (item) => {
    item.msgTime = dayjs(item.created_at).format("YYYY-MM-DD HH:mm:ss");
    item.textDate = dateToString(item.created_at);
    if (item.children) {
      item.children = item.children.map(formatItem);
    }
    return item;
  };

  return msgList.map(formatItem);
};

const getCommentList = async () => {
  try {
    const res = await getComments(props.postId);
    const { code, data } = res.data;
    if (code === 200) {
      dataMap.msgList = formatMsg(data);
    }
  } catch (error) {
    console.log(error);
  }
};

const emit = defineEmits(["replyMessage"]);
</script>

<style lang="scss" scoped>
.comment-list {
  padding: 20px;
  border-radius: var(--theme-radius);
  margin: 20px 0;
}

.box-title {
  display: flex;
  align-items: center;

  h2 {
    margin: 0;
  }

  .icon {
    width: 2em;
    height: 2em;
    margin-right: 10px;
  }
}
</style>
