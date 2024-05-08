<template>
  <div class="message-item" :style="{ marginLeft: level < 2 ? level * 20 + 'px' : 0 }">
    <!-- 渲染当前留言内容 -->
    <div class="message-item-content">
      <div class="message-item-avatar">
        <img v-lazy="message.user_avatar_url" :alt="message.user_nickname" />
      </div>
      <div class="message-item-main">
        <div class="message-item-main-bar">
          <div class="item-name">
            <div
              class="item-author"
              :style="{ color: message.is_admin ? '#5a8cbd' : '' }"
            >
              {{ message.user_nickname }}
            </div>
            <span class="admin-name" v-if="message.is_admin">博主</span>
            <div calss="item-useragent"></div>
          </div>
          <div class="item-time">
            <span class="item-time-detail">{{ message.msgTime }}</span>
            <span>{{ message.textDate }}</span>
          </div>
        </div>
        <div class="message-item-main-content">
          <span>{{ message.content }}</span>
        </div>
      </div>
    </div>
    <!-- 递归渲染子级留言 -->
    <template v-if="message.children && message.children.length > 0">
      <div class="child-messages">
        <MessageItem
          v-for="childMsg in message.children"
          :message="childMsg"
          :level="level + 1"
          :key="childMsg.id"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from "vue";

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
  level: {
    type: Number,
    default: 0,
  },
});
</script>

<style lang="scss" scoped>
.message-item-content {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--whiteColor);
  padding: 15px 0 30px 0;
  .message-item-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .message-item-main {
    flex: 1;
  }
}

.message-item-main-bar {
  display: flex;
  .item-name {
    flex: 1;
    display: flex;
    align-items: center;
    .item-author {
      font-size: 16px;
      font-weight: 600;
      color: #323438;
    }
    .admin-name {
      background-color: var(--btnTagBgColor);
      opacity: 0.8;
      color: var(--whiteColor);
      font-size: 12px;
      padding: 3px 5px;
      border-radius: 4px;
      margin-left: 10px;
    }
  }

  .item-time {
    width: 80px;
    font-size: 14px;
    color: #4e4c4c;
    position: relative;
    .item-time-detail {
      position: absolute;
      top: -10px;
      left: -94px;
      background-color: var(--balckTextColor);
      padding: 5px 0;
      opacity: 0;
      border-radius: 5px;
      width: 150px;
      text-align: center;
      color: #fff;
      font-size: 12px;
      transition: all 0.3s;
      pointer-events: none;
    }
    &:hover .item-time-detail {
      opacity: 0.8;
      top: -30px;
    }
  }
}

.message-item-main-content {
  padding-top: 10px;
}
</style>
