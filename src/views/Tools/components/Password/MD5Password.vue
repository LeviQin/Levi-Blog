<template>
  <div class="pw-card">
    <div class="pw-card-head"><div class="pw-algo-badge" style="background:linear-gradient(135deg,#e74c3c,#c0392b)">MD5</div><div><div class="pw-card-title">MD5 哈希</div><div class="pw-card-sub">Message Digest Algorithm 5 &mdash; 单向散列，不可逆</div></div></div>
    <div class="pw-toolbar"><button class="pw-btn pw-btn-encrypt" @click="encrypt"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>计算 MD5</button><span class="pw-toolbar-spacer"></span><button class="pw-btn pw-btn-clear" @click="clear"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>清除</button></div>
    <div class="pw-io-grid"><div class="pw-io-block"><label class="pw-io-label">需要计算哈希的内容</label><el-input v-model="textarea" type="textarea" :rows="8" placeholder="在此输入需要计算MD5的内容" class="pw-textarea" /><div class="pw-char-count">{{ textarea.length }} 字符</div></div><div class="pw-io-arrow"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--el-text-color-placeholder)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></div><div class="pw-io-block"><label class="pw-io-label">哈希结果</label><div class="pw-results"><div class="pw-result-row" v-for="r in results" :key="r.label"><div class="pw-result-label">{{ r.label }}</div><el-input :model-value="r.value" readonly size="default" class="pw-result-input"><template #append><button class="pw-copy-sm" @click="copyResult(r.value)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg></button></template></el-input></div></div></div></div>
    <div class="pw-info-section"><div class="pw-info-head" @click="infoOpen = !infoOpen"><svg class="icon" aria-hidden="true"><use xlink:href="#levi-guanyu-"></use></svg><span>关于 MD5</span><svg class="pw-info-arrow" :class="{ open: infoOpen }" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></div><div class="pw-info-body" v-show="infoOpen"><p><b>MD5是单向哈希算法，不支持解密。</b>数据源是无穷尽的，而MD5密文是有限的，因此必然存在碰撞。</p><p>32位MD5和16位MD5的区别是：16位MD5取32位结果的第8~24位（中间16位）。</p></div></div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import CryptoJS from "crypto-js";
const textarea = ref(""), hashed32 = ref(""), hashed32UC = ref(""), hashed16 = ref(""), hashed16UC = ref(""), infoOpen = ref(false);

const results = computed(() => [
  { label: "32位 大写", value: hashed32UC.value },
  { label: "32位 小写", value: hashed32.value },
  { label: "16位 大写", value: hashed16UC.value },
  { label: "16位 小写", value: hashed16.value },
]);

const encrypt = () => {
  if (!textarea.value) { ElNotification({ title: "提示", message: "请输入需要计算哈希的内容", type: "warning", zIndex: 99999 }); return; }
  try { hashed32.value = CryptoJS.MD5(textarea.value).toString(); hashed32UC.value = hashed32.value.toUpperCase(); hashed16.value = hashed32.value.slice(8, 24); hashed16UC.value = hashed16.value.toUpperCase(); }
  catch (e) { ElNotification({ title: "失败", message: "计算失败", type: "error", zIndex: 99999 }); }
};
const clear = () => { textarea.value = ""; hashed32.value = ""; hashed32UC.value = ""; hashed16.value = ""; hashed16UC.value = ""; };
const copyResult = (val) => {
  if (!val) { ElNotification({ title: "提示", message: "结果为空", type: "warning", zIndex: 99999 }); return; }
  navigator.clipboard.writeText(val).then(() => { ElNotification({ title: "成功", message: "已复制", type: "success", zIndex: 99999 }); }).catch(() => ElNotification({ title: "失败", message: "复制失败", type: "error", zIndex: 99999 }));
};
</script>

<style lang="scss" scoped>
.pw-card { padding: 28px; border-radius: 16px; background: var(--el-bg-color); border: 1px solid var(--el-border-color); box-shadow: 0 2px 8px rgba(0,0,0,.06); }
.pw-card-head { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid var(--el-border-color-light); }
.pw-algo-badge { display: flex; align-items: center; justify-content: center; width: 52px; height: 52px; border-radius: 14px; background: linear-gradient(135deg, var(--btn-tag-bg-color), #e67a1a); color: #fff; font-size: 14px; font-weight: 700; flex-shrink: 0; letter-spacing: .02em; }
.pw-card-title { font-size: 18px; font-weight: 700; color: var(--el-text-color-primary); }
.pw-card-sub { font-size: 13px; color: var(--el-text-color-secondary); margin-top: 4px; }
.pw-toolbar { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
.pw-toolbar-spacer { flex: 1; }
.pw-btn { display: inline-flex; align-items: center; gap: 6px; padding: 9px 20px; font-size: 13px; font-weight: 600; border: none; border-radius: 8px; cursor: pointer; transition: all .2s; outline: none; }
.pw-btn-encrypt { background: var(--btn-tag-bg-color); color: #fff; &:hover { background: #e67a1a; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(255,139,38,.3); } }
.pw-btn-clear { background: transparent; color: var(--el-text-color-secondary); border: 1.5px solid var(--el-border-color); &:hover { background: var(--el-fill-color-light); color: var(--el-text-color-primary); } }
.pw-io-grid { display: flex; align-items: flex-start; gap: 16px; }
.pw-io-block { flex: 1; min-width: 0; }
.pw-io-label { display: block; font-size: 13px; font-weight: 600; color: var(--el-text-color-regular); margin-bottom: 8px; }
.pw-io-arrow { display: flex; align-items: center; padding-top: 32px; flex-shrink: 0; }
.pw-textarea :deep(textarea) { font-family: 'SF Mono','Fira Code','Consolas',monospace; font-size: 13px; line-height: 1.7; }
.pw-char-count { margin-top: 6px; font-size: 11px; color: var(--el-text-color-placeholder); font-variant-numeric: tabular-nums; }
.pw-results { display: flex; flex-direction: column; gap: 10px; }
.pw-result-row { display: flex; align-items: center; gap: 10px; }
.pw-result-label { width: 75px; font-size: 12px; font-weight: 600; color: var(--el-text-color-secondary); flex-shrink: 0; text-align: right; }
.pw-result-input { flex: 1; :deep(input) { font-family: 'SF Mono','Fira Code','Consolas',monospace; font-size: 13px; } }
.pw-copy-sm { display: flex; align-items: center; justify-content: center; padding: 0; border: none; background: transparent; color: var(--el-text-color-secondary); cursor: pointer; width: 32px; height: 32px; transition: color .15s; &:hover { color: #67c23a; } }
.pw-info-section { margin-top: 28px; padding-top: 20px; border-top: 1px solid var(--el-border-color-light); }
.pw-info-head { display: flex; align-items: center; gap: 8px; cursor: pointer; user-select: none; font-size: 14px; font-weight: 600; color: var(--el-text-color-primary); .icon { width: 1.1em; height: 1.1em; color: var(--theme-btn-hover-color); } &:hover { color: var(--theme-btn-hover-color); } }
.pw-info-arrow { margin-left: auto; transition: transform .2s; &.open { transform: rotate(180deg); } }
.pw-info-body { margin-top: 14px; font-size: 13px; color: var(--el-text-color-secondary); line-height: 1.75; p { margin: 0 0 8px; } b { color: var(--el-text-color-primary); } }
@media (max-width: 860px) { .pw-card { padding: 20px 16px; } .pw-card-head { flex-direction: column; align-items: flex-start; gap: 12px; } .pw-io-grid { flex-direction: column; gap: 12px; } .pw-io-arrow { display: none; } .pw-toolbar { flex-wrap: wrap; } .pw-result-row { flex-direction: column; align-items: stretch; gap: 4px; } .pw-result-label { width: auto; text-align: left; } }
</style>
