<template>
  <div class="comments theme-bg-color">
    <div class="box-title">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#levi-faxiaoxi"></use>
      </svg>
      <h2>发送评论</h2>
    </div>
    <div class="box-content">
      <div class="textarea-bpx">
        <el-input
          id="msg-content"
          v-model="messageText"
          placeholder="留下你的一笔吧~"
          :autosize="{ minRows: 3, maxRows: 45 }"
          type="textarea"
          :disabled="loading"
        ></el-input>
      </div>
      <div class="input-box">
        <el-input
          v-model="user_nickname"
          placeholder="昵称"
          class="input-item"
          size="large"
          :disabled="loading"
        >
          <template #prefix>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-nicheng"></use>
            </svg>
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
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-MAILBOX"></use>
            </svg>
          </template>
        </el-input>
        <el-input
          v-model="verCode"
          placeholder="验证码"
          class="input-item code-input"
          size="large"
          :disabled="loading"
        >
          <template #prefix>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-yanzhengma"></use>
            </svg> </template
        ></el-input>
      </div>
      <div class="btn-box">
        <div class="avatar-box">
          <AvatarSelect :avatarImg="user_avatar_url" @ok="selectAvatar" />
        </div>
        <div class="emoji-send-box">
          <EmojiIconBox @ok="receiveMessage" />
          <div class="send-btn" @click="sendMessage">
            <span>{{ loading ? "发送中" : "发送" }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import EmojiIconBox from "../../MessageBoard/components/EmojiIconBox.vue";
import AvatarSelect from "../../MessageBoard/components/AvatarSelect.vue";

onMounted(() => {
  updateContent();
});

const messageText = ref("");
const user_nickname = ref("");
const email = ref("");
const user_avatar_url = ref(
  "https://levi-oss-1301066479.cos.ap-guangzhou.myqcloud.com/avatarImages/Snipaste_2024-04-24_16-53-27.png"
);
const verCode = ref("");
const loading = ref(false);
const codeNum = ref(0);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const selectAvatar = (avatar) => {
  user_avatar_url.value = avatar;
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
    if (!user_nickname.value) {
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
      user_nickname: user_nickname.value,
      email: email.value,
      user_avatar_url: user_avatar_url.value,
      parent_id: parent_id.value,
      operating_system: operatingSystem,
      browser,
    });
    const { code, message } = res.data;
    if (code === 200) {
      messageText.value = "";
      user_nickname.value = "";
      email.value = "";
      verCode.value = "";
      getMessage();
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
.comments {
  padding: 20px;
  border-radius: var(--theme-radius);
  margin: 20px 0;
}

.board-box,
.message-box {
  border-radius: var(--theme-radius);
  padding: 20px;
}

.message-box {
  margin-top: 20px;
}

.board-box .box-title {
  margin-bottom: 30px;
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

.box-content {
  margin: 20px 0;
}

.input-box {
  display: flex;
  margin: 20px 0;

  .input-item {
    margin-right: 20px;
    box-shadow: 0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02);

    .icon {
      width: 1.2em;
      height: 1.2em;
    }
  }

  .input-item:last-child {
    margin-right: 0;
  }
}

.code-input {
  position: relative;

  &::after {
    content: var(--content-value);
    position: absolute;
    left: 0;
    bottom: 30px;
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

  .emoji-send-box {
    display: flex;
    align-items: center;

    .emoji-icon-box {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .send-btn {
      background-color: var(--theme-btn-hover-color);
      padding: 8px 20px;
      border-radius: 5px;
      cursor: pointer;
      color: var(--white-color);
      font-size: 12px;
      transition: all 0.3s;

      &:hover {
        opacity: 0.9;
        transform: translateY(-2px);
      }
    }
  }
}

.board-content {
  padding-bottom: 50px;
}

.sidebar-info {
  position: sticky;
  top: 80px;
}

@media (max-width: 860px) {
  .input-box {
    display: block;

    .input-item {
      margin-bottom: 20px;
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
