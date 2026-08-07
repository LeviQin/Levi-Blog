<template>
  <div class="pw-card">
    <div class="pw-card-head">
      <div class="pw-algo-badge">AES</div>
      <div>
        <div class="pw-card-title">AES 加/解密</div>
        <div class="pw-card-sub">Advanced Encryption Standard &mdash; 业界最广泛使用的对称加密标准</div>
      </div>
    </div>

    <div class="pw-toolbar">
      <button class="pw-btn pw-btn-encrypt" @click="encrypt">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
        加密
      </button>
      <button class="pw-btn pw-btn-decrypt" @click="decrypt">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/><line x1="12" y1="17" x2="12" y2="19"/></svg>
        解密
      </button>
      <span class="pw-toolbar-spacer"></span>
      <button class="pw-btn pw-btn-clear" @click="clear">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
        清除
      </button>
    </div>

    <div class="pw-key-row">
      <div class="pw-key-input-wrap">
        <el-input v-model="secretKey" placeholder="输入密钥（可选）" size="default" clearable>
          <template #prefix>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="opacity:.5"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
          </template>
        </el-input>
      </div>
      <span class="pw-key-hint">密钥为可选项，不填写则使用空密钥加密</span>
    </div>

    <div class="pw-io-grid">
      <div class="pw-io-block">
        <label class="pw-io-label">需要加/解密的内容</label>
        <el-input v-model="textarea" type="textarea" :rows="8" placeholder="在此输入需要加/解密的内容" class="pw-textarea" />
        <div class="pw-char-count">{{ textarea.length }} 字符</div>
      </div>
      <div class="pw-io-arrow">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--el-text-color-placeholder)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </div>
      <div class="pw-io-block">
        <label class="pw-io-label">结果</label>
        <el-input v-model="result" type="textarea" :rows="8" placeholder="加/解密结果将显示在此处" readonly class="pw-textarea pw-textarea-result" />
        <div class="pw-io-actions">
          <span class="pw-char-count">{{ result.length }} 字符</span>
          <button class="pw-copy-btn" :class="{ copied: copyDone }" @click="copyResult">
            <svg v-if="!copyDone" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            {{ copyDone ? '已复制' : '复制结果' }}
          </button>
        </div>
      </div>
    </div>

    <div class="pw-info-section">
      <div class="pw-info-head" @click="infoOpen = !infoOpen">
        <svg class="icon" aria-hidden="true"><use xlink:href="#levi-guanyu-"></use></svg>
        <span>关于 AES</span>
        <svg class="pw-info-arrow" :class="{ open: infoOpen }" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="pw-info-body" v-show="infoOpen">
        <p>在线AES加密，AES解密，可以输入密钥后进行加密和解密，支持可逆加密解密。</p>
        <p><b>AES加/解密：</b>明文和密文都放在加/解密内容的输入框，点击加密或者解密按钮后输出结果到结果区域。加密时密钥选填，解密时必须填写和加密时一致的密钥，否则解密失败。</p>
        <p>高级加密标准（Advanced Encryption Standard，AES），在密码学中又称Rijndael加密法，是美国联邦政府采用的一种区块加密标准。该标准用来替代原先的DES，已被多方分析且广为全世界所使用。</p>
        <dl class="pw-info-dl">
          <div><dt>AES全称</dt><dd>Advanced Encryption Standard</dd></div>
          <div><dt>适用领域</dt><dd>计算机，网络安全</dd></div>
          <div><dt>派生自</dt><dd>Square</dd></div>
          <div><dt>应用学科</dt><dd>密码学</dd></div>
          <div><dt>集成算法</dt><dd>Anubis, Grand Cru</dd></div>
          <div><dt>提出时间</dt><dd>1998年</dd></div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CryptoJS from "crypto-js";

const secretKey = ref("");
const textarea = ref("");
const result = ref("");
const copyDone = ref(false);
const infoOpen = ref(false);
let copyTimer = null;

const encrypt = () => {
  if (!textarea.value) {
    ElNotification({ title: "提示", message: "请输入需要加/解密的内容", type: "warning", zIndex: 99999 });
    return;
  }
  try {
    const bytes = CryptoJS.AES.encrypt(textarea.value, secretKey.value);
    if (bytes.ciphertext.sigBytes && bytes.ciphertext.words) {
      result.value = bytes.toString();
    } else {
      ElNotification({ title: "失败", message: "加密失败，请检查输入内容", type: "error", zIndex: 99999 });
    }
  } catch (e) {
    ElNotification({ title: "失败", message: "加密失败，请检查输入内容", type: "error", zIndex: 99999 });
  }
};

const decrypt = () => {
  if (!textarea.value) {
    ElNotification({ title: "提示", message: "请输入需要加/解密的内容", type: "warning", zIndex: 99999 });
    return;
  }
  try {
    const bytes = CryptoJS.AES.decrypt(textarea.value, secretKey.value);
    result.value = bytes.toString(CryptoJS.enc.Utf8);
    if (!result.value) {
      ElNotification({ title: "失败", message: "解密失败，请检查密钥是否正确", type: "error", zIndex: 99999 });
    }
  } catch (e) {
    ElNotification({ title: "失败", message: "解密失败，请检查输入内容", type: "error", zIndex: 99999 });
  }
};

const clear = () => {
  secretKey.value = "";
  textarea.value = "";
  result.value = "";
};

const copyResult = () => {
  if (!result.value) {
    ElNotification({ title: "提示", message: "结果为空，无法复制", type: "warning", zIndex: 99999 });
    return;
  }
  navigator.clipboard.writeText(result.value).then(() => {
    copyDone.value = true;
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => { copyDone.value = false; }, 2000);
    ElNotification({ title: "成功", message: "结果已复制到剪贴板", type: "success", zIndex: 99999 });
  }).catch(() => {
    ElNotification({ title: "失败", message: "复制失败，请重试", type: "error", zIndex: 99999 });
  });
};
</script>

<style lang="scss" scoped>
.pw-card {
  padding: 28px;
  border-radius: 16px;
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color);
  box-shadow: 0 2px 8px rgba(0,0,0,.06);
}

.pw-card-head {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--el-border-color-light);
}

.pw-algo-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--btn-tag-bg-color), #e67a1a);
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  flex-shrink: 0;
  letter-spacing: 0.02em;
}

.pw-card-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--el-text-color-primary);
}

.pw-card-sub {
  font-size: 13px;
  color: var(--el-text-color-secondary);
  margin-top: 4px;
}

.pw-toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.pw-toolbar-spacer { flex: 1; }

.pw-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 20px;
  font-size: 13px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all .2s;
  outline: none;
}

.pw-btn-encrypt {
  background: var(--btn-tag-bg-color);
  color: #fff;
  &:hover { background: #e67a1a; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(34,211,238,.3); }
}

.pw-btn-decrypt {
  background: var(--theme-btn-hover-color);
  color: #fff;
  &:hover { background: #4a7ca8; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(34,211,238,.3); }
}

.pw-btn-clear {
  background: transparent;
  color: var(--el-text-color-secondary);
  border: 1.5px solid var(--el-border-color);
  &:hover { background: var(--el-fill-color-light); color: var(--el-text-color-primary); border-color: var(--el-text-color-placeholder); }
}

.pw-key-row {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 22px;
  padding: 14px 18px;
  background: var(--el-fill-color-lighter);
  border-radius: 10px;
}

.pw-key-input-wrap {
  width: 200px;
}

.pw-key-hint {
  font-size: 12px;
  color: var(--el-text-color-placeholder);
}

.pw-io-grid {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.pw-io-block {
  flex: 1;
  min-width: 0;
}

.pw-io-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--el-text-color-regular);
  margin-bottom: 8px;
}

.pw-io-arrow {
  display: flex;
  align-items: center;
  padding-top: 32px;
  flex-shrink: 0;
}

.pw-textarea {
  :deep(textarea) {
    font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
    font-size: 13px;
    line-height: 1.7;
  }
}

.pw-textarea-result :deep(textarea) {
  background: var(--el-fill-color-lighter);
}

.pw-char-count {
  margin-top: 6px;
  font-size: 11px;
  color: var(--el-text-color-placeholder);
  font-variant-numeric: tabular-nums;
}

.pw-io-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
}

.pw-copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 14px;
  font-size: 12px;
  font-weight: 600;
  border: 1.5px solid var(--el-border-color);
  border-radius: 6px;
  background: transparent;
  color: var(--el-text-color-regular);
  cursor: pointer;
  transition: all .2s;
  outline: none;

  &:hover { border-color: #67c23a; color: #67c23a; background: rgba(103,194,58,.06); }
  &.copied { border-color: #67c23a; color: #67c23a; background: rgba(103,194,58,.08); }
}

.pw-info-section {
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid var(--el-border-color-light);
}

.pw-info-head {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
  font-weight: 600;
  color: var(--el-text-color-primary);

  .icon { width: 1.1em; height: 1.1em; color: var(--theme-btn-hover-color); }
  &:hover { color: var(--theme-btn-hover-color); }
}

.pw-info-arrow {
  margin-left: auto;
  transition: transform .2s;
  &.open { transform: rotate(180deg); }
}

.pw-info-body {
  margin-top: 14px;
  font-size: 13px;
  color: var(--el-text-color-secondary);
  line-height: 1.75;

  p { margin: 0 0 8px; }
  b { color: var(--el-text-color-primary); font-weight: 600; }
}

.pw-info-dl {
  margin: 14px 0 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px 24px;

  div {
    display: flex;
    gap: 8px;
    padding: 6px 0;
    border-bottom: 1px solid var(--el-border-color-lighter);
  }
  dt { font-weight: 600; color: var(--el-text-color-primary); white-space: nowrap; }
  dd { color: var(--el-text-color-secondary); margin: 0; }
}

@media (max-width: 860px) {
  .pw-card { padding: 20px 16px; }
  .pw-card-head { flex-direction: column; align-items: flex-start; gap: 12px; }
  .pw-io-grid { flex-direction: column; gap: 12px; }
  .pw-io-arrow { display: none; }
  .pw-key-row { flex-direction: column; align-items: stretch; gap: 8px; }
  .pw-key-input-wrap { width: 100%; }
  .pw-toolbar { flex-wrap: wrap; }
  .pw-info-dl { grid-template-columns: 1fr; }
}
</style>
