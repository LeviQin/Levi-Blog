<template>
  <div>
    <Head>
      <meta name="keywords" content="留言板，交流，留言，问答，意见，建议，反馈" />
      <meta
        name="description"
        content="欢迎来到留言板！在这里，您可以畅所欲言，分享您的想法、感受和建议。无论是对我们网站的赞美，还是对改进的建议，我们都非常乐意听取并与您交流。请尊重他人，文明用语，让我们共同营造一个友爱、和谐的留言环境。"
      />
      <meta
        property="og:description"
        content="欢迎来到留言板！在这里，您可以畅所欲言，分享您的想法、感受和建议。无论是对我们网站的赞美，还是对改进的建议，我们都非常乐意听取并与您交流。请尊重他人，文明用语，让我们共同营造一个友爱、和谐的留言环境。"
      />
    </Head>
    <div class="comments">
      <top-banner :bannerConfig="bannerConfig"></top-banner>
      <div
        class="comments-container"
        :class="{ 'sidin-start': true, 'sidin-end': isSidebarVisible }"
      >
        <div class="comments-main w">
          <div class="comments-box">
            <div class="message-box theme-bg-color">
              <div class="box-title">
                <span class="title-icon" aria-hidden="true">
                  <i class="bi bi-chat-left-text"></i>
                </span>
                <div class="title-copy">
                  <h2>留下足迹</h2>
                  <p>写下你想说的话，让这里多一段有趣的回声</p>
                </div>
              </div>
              <div class="box-content">
                <div class="textarea-bpx">
                  <el-input
                    id="msg-content"
                    v-model="messageText"
                    placeholder="写下你想说的话，支持换行和表情～"
                    :autosize="{ minRows: 3, maxRows: 45 }"
                    type="textarea"
                    :disabled="loading"
                  ></el-input>
                </div>
                <div class="input-box">
                  <el-input
                    v-model="userNickname"
                    placeholder="你的昵称"
                    class="input-item"
                    size="large"
                    :disabled="loading"
                  >
                    <template #prefix>
                      <i class="bi bi-person" aria-hidden="true"></i>
                    </template>
                  </el-input>
                  <el-input
                    v-model="email"
                    placeholder="邮箱"
                    class="input-item"
                    size="large"
                    :disabled="loading"
                  >
                    <template #prefix>
                      <i class="bi bi-envelope" aria-hidden="true"></i>
                    </template>
                  </el-input>
                  <el-input
                    v-model="verCode"
                    placeholder="输入验证码"
                    class="input-item code-input"
                    size="large"
                    :disabled="loading"
                  >
                    <template #prefix>
                      <i class="bi bi-shield-check" aria-hidden="true"></i>
                    </template>
                  ></el-input>
                </div>
                <div class="btn-box">
                  <div class="avatar-box">
                    <AvatarSelect :avatarImg="userAvatarUrl" @ok="selectAvatar" />
                  </div>
                  <div class="emoji-send-box">
                    <EmojiIconBox @ok="receiveMessage" />
                    <button
                      class="send-btn"
                      type="button"
                      :disabled="loading"
                      @click="sendMessage"
                    >
                      <span>{{ loading ? "发送中" : "发送" }}</span>
                      <i class="bi bi-arrow-up-right" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="board-box theme-bg-color">
              <div class="box-title">
                <span class="title-icon" aria-hidden="true">
                  <i class="bi bi-chat-square-heart"></i>
                </span>
                <div class="title-copy">
                  <h2>留言板</h2>
                  <p>所有真诚的留言，都会被好好收下</p>
                </div>
                <span class="message-count">{{ dataMap.msgList.length }} 条留言</span>
              </div>
              <div class="board-content">
                <template v-if="dataMap.msgList.length">
                  <MessageItem
                    v-for="msg in dataMap.msgList"
                    :key="msg.id"
                    :message="msg"
                    :level="0"
                  />
                </template>

                <template v-else>
                  <div class="empty-message">
                    <i class="bi bi-chat-square-dots" aria-hidden="true"></i>
                    <p>这里还没有留言，来留下第一句话吧～</p>
                  </div>
                </template>
              </div>
            </div>
          </div>
          <div class="topic-sidebar">
            <div class="announcement-block">
              <div class="announcement-title">
                <span class="announcement-icon" aria-hidden="true">
                  <i class="bi bi-stars"></i>
                </span>
                <span>系统提示</span>
              </div>
              <el-divider />
              <div class="announcement-content">
                <p>你已进入 Levi 的异次元空间</p>
                <p>在这里你可以：</p>
                <ul>
                  <li><i class="bi bi-send" aria-hidden="true"></i>发送来自未来的建议</li>
                  <li><i class="bi bi-bug" aria-hidden="true"></i>报告时空裂缝中的 bug</li>
                  <li><i class="bi bi-signpost-2" aria-hidden="true"></i>留下你的足迹与回声</li>
                </ul>
                <p class="announcement-warning">
                  <i class="bi bi-slash-circle" aria-hidden="true"></i>
                  请勿使用黑魔法发布广告
                </p>
                <p class="announcement-welcome">
                  <i class="bi bi-stars" aria-hidden="true"></i>
                  欢迎异世界旅人留下只言片语！
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import TopBanner from "@/components/TopBanner/Index.vue";
import { Head } from "@vueuse/head";
import SidebarUser from "@/components/SidebarUser/Index.vue";
import { sendBoardMsg, getMessageList } from "@/api/messages.js";
import EmojiIconBox from "@/components/EmojiIconBox/EmojiIconBox.vue";
import AvatarSelect from "@/components/AvatarSelect/AvatarSelect.vue";
import MessageItem from "@/components/MessageItem/MessageItem.vue";
import dayjs from "dayjs";
import { dateToString } from "@/utils/utils.js";
import { setStore, getStore } from "@/utils/storage.js";
import { useMainStore } from "@/stores/mainStore";

const mainStore = useMainStore();

const blogSettingMap = computed(() => {
  return mainStore.blogSettingMap;
});

onMounted(() => {
  const commentsInfo = getStore("COMMENTS_INPUT");
  if (commentsInfo) {
    userNickname.value = commentsInfo.userNickname;
    email.value = commentsInfo.email;
    userAvatarUrl.value = commentsInfo.userAvatarUrl;
  }
  isSidebarVisible.value = true;
  updateContent();
  getMessage();
});

const dataMap = reactive({
  msgList: [],
});

const isSidebarVisible = ref(false);
const messageText = ref("");
const userNickname = ref("");
const email = ref("");
const userAvatarUrl = ref(blogSettingMap.value.blog_message_avatar);
const parentId = ref("");
const verCode = ref("");
const loading = ref(false);
const codeNum = ref(0);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const bannerConfig = {
  height: "30vh",
  showArrow: false,
  title: "留言板",
  text: "欢迎来到我们的留言板！期待您的留言和反馈！",
};

const selectAvatar = (avatar) => {
  userAvatarUrl.value = avatar;
};

const receiveMessage = (emoji) => {
  insertAtCursor(emoji.value);
};

const insertAtCursor = (text) => {
  const textarea = document.getElementById("msg-content");
  const startPos = textarea.selectionStart;
  const endPos = textarea.selectionEnd;
  const beforeText = messageText.value.substring(0, startPos);
  const afterText = messageText.value.substring(endPos, messageText.value.length);
  messageText.value = beforeText + text + afterText;
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

const getMessage = async () => {
  try {
    const res = await getMessageList();
    const { code, data, message } = res.data;
    if (code === 200) {
      dataMap.msgList = formatMsg(data);
    } else {
      ElNotification({
        title: "留言板加载失败",
        message: message,
        type: "error",
        zIndex: 99999,
      });
    }
  } catch (error) {
    console.log(error, "----------------------");
    ElNotification({
      title: "留言板加载失败",
      message: String(error),
      type: "error",
      zIndex: 99999,
    });
  }
};

const sendMessage = async () => {
  try {
    if (!messageText.value) {
      ElNotification({
        title: "留言失败",
        message: "留言内容未填写",
        type: "error",
        zIndex: 99999,
      });
      return;
    }
    if (!userNickname.value) {
      ElNotification({
        title: "留言失败",
        message: "昵称未填写",
        type: "error",
        zIndex: 99999,
      });
      return;
    }
    if (!email.value) {
      ElNotification({
        title: "留言失败",
        message: "邮箱未填写",
        type: "error",
        zIndex: 99999,
      });
      return;
    }
    if (!emailRegex.test(email.value)) {
      ElNotification({
        title: "留言失败",
        message: "邮箱验证失败，请重试",
        type: "error",
        zIndex: 99999,
      });
      return;
    }
    if (verCode.value != codeNum.value) {
      ElNotification({
        title: "留言失败",
        message: "验证码错误",
        type: "error",
        zIndex: 99999,
      });
      return;
    }
    loading.value = true;
    const { operatingSystem, browser } = getSystemInfo();
    const res = await sendBoardMsg({
      content: messageText.value,
      user_nickname: userNickname.value,
      email: email.value,
      user_avatar_url: userAvatarUrl.value,
      parent_id: parentId.value,
      operating_system: operatingSystem,
      browser,
    });
    const { code, message } = res.data;
    if (code === 200) {
      setStore("COMMENTS_INPUT", {
        userAvatarUrl: userAvatarUrl.value,
        userNickname: userNickname.value,
        email: email.value,
      });
      messageText.value = "";
      verCode.value = "";
      getMessage();
      updateContent();
      ElNotification({
        title: "成功，等待审核中~",
        message: `${message}, 审核通过后将显示在留言板中~`,
        type: "success",
        zIndex: 99999,
        duration: 4500,
      });
    } else {
      ElNotification({
        title: "失败",
        message,
        type: "error",
        zIndex: 99999,
      });
    }
  } catch (e) {
    console.log(e, "----------------------");
    ElNotification({
      title: "失败",
      message: "留言失败，请重试",
      type: "error",
      zIndex: 99999,
    });
  } finally {
    loading.value = false;
  }
};

const updateContent = () => {
  const min = 1;
  const max = 20;
  const random1 = Math.floor(Math.random() * (max - min + 1)) + min;
  const random2 = Math.floor(Math.random() * (max - min + 1)) + min;
  const newValue = `${random1} - ${random2} = `;
  codeNum.value = random1 - random2;
  document.documentElement.style.setProperty("--content-value", `"${newValue}"`);
};

const getSystemInfo = () => {
  const userAgent = navigator.userAgent;

  // 获取操作系统信息
  let operatingSystem = "Unknown";
  if (userAgent.match(/Windows/)) {
    operatingSystem = "Windows";
  } else if (userAgent.match(/Macintosh|Mac OS/)) {
    operatingSystem = "Mac OS";
  } else if (userAgent.match(/Android/)) {
    operatingSystem = "Android";
  } else if (userAgent.match(/iOS/)) {
    operatingSystem = "iOS";
  } else if (userAgent.match(/Linux/)) {
    operatingSystem = "Linux";
  }

  // 获取浏览器信息
  let browser = "Unknown";
  if (userAgent.match(/Chrome/)) {
    browser = "Chrome";
  } else if (userAgent.match(/Safari/)) {
    browser = "Safari";
  } else if (userAgent.match(/Firefox/)) {
    browser = "Firefox";
  } else if (userAgent.match(/Edge/)) {
    browser = "Edge";
  } else if (userAgent.match(/Opera/)) {
    browser = "Opera";
  } else if (userAgent.match(/MSIE/)) {
    browser = "Internet Explorer";
  }

  return {
    operatingSystem,
    browser,
  };
};
</script>

<style lang="scss" scoped>
.comments-main {
  display: flex;
  align-items: flex-start;
  gap: 24px;
}

.comments-box {
  flex: 1;
  min-width: 0;
  margin: 0 0 100px 0;
}

.board-box,
.message-box {
  border-radius: var(--theme-radius);
  padding: 20px;
  border: 1px solid var(--border-color);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.05);
}

.message-box {
  margin-bottom: 24px;
}

.board-box .box-title {
  margin-bottom: 16px;
}

.box-title {
  display: flex;
  align-items: center;
  gap: 12px;

  h2 {
    margin: 0;
    font-size: 20px;
    line-height: 1.3;
  }

  .title-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    color: var(--theme-btn-hover-color);
    background: var(--accent-soft-bg-strong);
    font-size: 20px;
  }

  .title-copy {
    min-width: 0;

    p {
      margin: 4px 0 0;
      color: var(--text-secondary);
      font-size: 12px;
      line-height: 1.5;
    }
  }

  .message-count {
    margin-left: auto;
    padding: 5px 10px;
    border: 1px solid var(--border-color);
    border-radius: 999px;
    color: var(--text-secondary);
    font-size: 12px;
    white-space: nowrap;
  }
}

.box-content {
  margin: 24px 0 0;
}

.input-box {
  display: flex;
  gap: 16px;
  margin: 16px 0 20px;

  .input-item {
    flex: 1;
    min-width: 0;
    box-shadow: 0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02);
  }
}

.code-input {
  position: relative;

  &::after {
    content: var(--content-value);
    position: absolute;
    left: 0;
    bottom: 30px;
    pointer-events: none;
    background-color: var(--filing-color);
    color: var(--white-color);
    width: auto;
    padding: 0 15px;
    border-radius: 5px;
    opacity: 0;
    line-height: 30px;
    transition: bottom 0.5s, opacity 0.5s;
  }

  &:hover::after {
    bottom: 45px;
    opacity: 0.8;
  }
}

.btn-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  .emoji-send-box {
    display: flex;
    align-items: center;
    gap: 12px;

    .emoji-icon-box {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .send-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      background-color: var(--theme-btn-hover-color);
      min-width: 88px;
      padding: 9px 16px;
      border: 0;
      border-radius: 8px;
      cursor: pointer;
      color: var(--accent-contrast);
      font-size: 12px;
      transition: all 0.3s;

      &:hover {
        transform: translateY(-2px);
        filter: brightness(1.08);
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.65;
        transform: none;
      }
    }
  }
}

.board-content {
  min-height: 100px;
  padding: 4px 0 30px;

  > p {
    margin: 0;
    padding: 36px 20px;
    border: 1px dashed var(--border-color);
    border-radius: 10px;
    color: var(--text-secondary);
    text-align: center;
  }
}

.announcement-block {
  background: var(--theme-color);
  border-radius: var(--theme-radius);
  position: sticky;
  left: 0;
  top: 80px;
  padding: 22px 20px;
  border: 1px solid var(--border-color);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.05);

  .announcement-title {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 16px;
    font-weight: 600;

    .announcement-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 11px;
      background: var(--accent-soft-bg-strong);
      color: var(--theme-btn-hover-color);
      font-size: 18px;
    }
  }

  .announcement-content {
    font-size: 15px;

    p {
      margin: 8px 0;
      line-height: 1.7;
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin: 15px 0;
      padding: 0;

      li {
        list-style: disc;
        margin-left: 30px;
        padding-left: 2px;
        line-height: 1.6;
      }
    }
  }
}

@media (max-width: 860px) {
  .comments,
  .comments-container {
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
  }

  .comments-main {
    display: block;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .comments-box {
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  .message-box,
  .board-box {
    width: 100%;
    box-sizing: border-box;
  }

  .box-title {
    min-width: 0;

    .title-copy {
      min-width: 0;
    }

    .message-count {
      flex-shrink: 0;
    }
  }

  .topic-sidebar {
    width: 100%;
    margin-top: 24px;
  }

  .announcement-block {
    position: static;
  }

  .input-box {
    display: block;

    .input-item {
      width: 100%;
      margin-bottom: 20px;
      box-sizing: border-box;
    }

    .input-item:last-child {
      margin-bottom: 0;
    }
  }
}

:deep(.el-textarea__inner:focus),
:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}

:deep(.el-textarea__inner:hover) {
  box-shadow: none;
}
</style>
