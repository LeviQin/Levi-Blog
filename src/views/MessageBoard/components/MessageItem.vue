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
            <div class="item-useragent">
              <svg class="icon" aria-hidden="true">
                <use
                  :xlink:href="`#levi-${browserMap[message.browser] || `liulanqi`}`"
                ></use>
              </svg>
              <span>{{ message.browser }}</span>
            </div>
            <div class="item-useragent">
              <svg class="icon" aria-hidden="true">
                <use
                  :xlink:href="`#levi-${
                    systemMap[message.operating_system] || `caozuoxitong`
                  }`"
                ></use>
              </svg>
              <span>{{ message.operating_system }}</span>
            </div>
          </div>
          <div class="item-time">
            <span class="item-time-detail">{{ message.msgTime }}</span>
            <span>{{ message.textDate }}</span>
          </div>
        </div>
        <div class="message-item-main-content">
          <span v-html="messageContent"></span>
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
import { defineProps, computed } from "vue";

const messageContent = computed(() => {
  return props.message.content ? props.message.content.replace(/\n/g, "<br/>") : "";
});

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

const browserMap = {
  Chrome: "gugeliulanqi",
  Safari: "icons8-pingguoliulanqi",
  Firefox: "huohuliulanqi",
  Edge: "edgeliulanqi",
  Opera: "opera",
  "Internet Explorer": "IEliulanqi",
};

const systemMap = {
  Windows: "beifenx",
  "Mac OS": "mac-os",
  Android: "anzhuo",
  iOS: "ios",
  Linux: "linux",
};
</script>

<style lang="scss" scoped>
.message-item-content {
  display: flex;
  padding: 12px 0;
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
    flex-wrap: wrap;
    gap: 10px;
    .item-author {
      font-size: 16px;
      font-weight: 600;
      color: var(--message-author-color);
    }
    .item-useragent {
      display: flex;
      align-items: center;
      font-size: 14px;
      .icon {
        width: 1em;
        height: 1em;
        margin-right: 5px;
      }
    }
    .admin-name {
      background-color: var(--btn-tag-bg-color);
      opacity: 0.8;
      color: var(--white-color);
      font-size: 12px;
      padding: 3px 5px;
      border-radius: 4px;
    }
  }

  .item-time {
    width: 105px;
    font-size: 14px;
    color: #4e4c4c;
    position: relative;
    text-align: right;
    .item-time-detail {
      position: absolute;
      top: -10px;
      right: 0;
      background-color: var(--black-text-color);
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

@media (max-width: 860px) {
  .message-item-avatar {
    transform: scale(0.8);
  }
  .message-item-main-bar .item-name {
    font-size: 12px;
    gap: 5px;
  }

  .message-item-main-bar .item-time {
    font-size: 12px;
  }

  .message-item-content {
    padding: 10px 0 20px 0;
  }
}
</style>
