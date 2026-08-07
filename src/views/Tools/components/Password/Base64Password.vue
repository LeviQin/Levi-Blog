<template>
  <div class="pw-card">
    <div class="pw-card-head"><div class="pw-algo-badge" style="background:linear-gradient(135deg,#9b59b6,#8e44ad)">B64</div><div><div class="pw-card-title">Base64 编/解码</div><div class="pw-card-sub">最常用的二进制到文本编码方案 &mdash; 无需密钥</div></div></div>
    <div class="pw-toolbar"><button class="pw-btn pw-btn-encrypt" @click="encrypt"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>编码</button><button class="pw-btn pw-btn-decrypt" @click="decrypt"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 18 2 12 8 6"/><polyline points="16 6 22 12 16 18"/></svg>解码</button><span class="pw-toolbar-spacer"></span><button class="pw-btn pw-btn-clear" @click="clear"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>清除</button></div>
    <div class="pw-io-grid"><div class="pw-io-block"><label class="pw-io-label">需要编/解码的内容</label><el-input v-model="textarea" type="textarea" :rows="8" placeholder="在此输入需要编/解码的内容" class="pw-textarea" /><div class="pw-char-count">{{ textarea.length }} 字符</div></div><div class="pw-io-arrow"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></div><div class="pw-io-block"><label class="pw-io-label">结果</label><el-input v-model="result" type="textarea" :rows="8" placeholder="编/解码结果将显示在此处" readonly class="pw-textarea pw-textarea-result" /><div class="pw-io-actions"><span class="pw-char-count">{{ result.length }} 字符</span><button class="pw-copy-btn" :class="{ copied: copyDone }" @click="copyResult"><svg v-if="!copyDone" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg><svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>{{ copyDone ? '已复制' : '复制结果' }}</button></div></div></div>
    <div class="pw-info-section"><div class="pw-info-head" @click="infoOpen = !infoOpen"><svg class="icon" aria-hidden="true"><use xlink:href="#levi-guanyu-"></use></svg><span>关于 Base64</span><svg class="pw-info-arrow" :class="{ open: infoOpen }" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></div><div class="pw-info-body" v-show="infoOpen"><p>Base64是网络上最常见的用于传输8Bit字节代码的编码方式之一。Base64编码可用于在HTTP环境下传递较长的标识信息。</p><p><b>注意事项：</b>Base64不适合直接放在URL里传输，因为URL编码器会把 "+" 和 "/" 转为 "%XX" 形式。可采用URL安全的Base64变种。</p><p><b>转换规则：</b>Base64把每3个8位字节转换为4个6位字节（3×8=4×6=24），转换后文本理论上比原来长约1/3。</p></div></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const textarea = ref(""), result = ref(""), copyDone = ref(false), infoOpen = ref(false); let copyTimer = null;

const encrypt = () => {
  if (!textarea.value) { ElNotification({ title: "提示", message: "请输入需要编/解码的内容", type: "warning", zIndex: 99999 }); return; }
  try { const data = new TextEncoder().encode(textarea.value); result.value = arrayBufferToBase64(data); }
  catch (e) { ElNotification({ title: "失败", message: "编码失败", type: "error", zIndex: 99999 }); }
};
const decrypt = () => {
  if (!textarea.value) { ElNotification({ title: "提示", message: "请输入需要编/解码的内容", type: "warning", zIndex: 99999 }); return; }
  try { const decoded = base64ToArrayBuffer(textarea.value); result.value = new TextDecoder().decode(decoded); }
  catch (e) { ElNotification({ title: "失败", message: "解码失败，请检查输入是否为有效的Base64", type: "error", zIndex: 99999 }); }
};
const arrayBufferToBase64 = (buffer) => { const b = [].map.call(new Uint8Array(buffer), (v) => String.fromCharCode(v)); return btoa(b.join("")); };
const base64ToArrayBuffer = (base64) => { const s = atob(base64); const bytes = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) bytes[i] = s.charCodeAt(i); return bytes.buffer; };
const clear = () => { textarea.value = ""; result.value = ""; };
const copyResult = () => { if (!result.value) { ElNotification({ title: "提示", message: "结果为空", type: "warning", zIndex: 99999 }); return; } navigator.clipboard.writeText(result.value).then(() => { copyDone.value = true; clearTimeout(copyTimer); copyTimer = setTimeout(() => copyDone.value = false, 2000); ElNotification({ title: "成功", message: "已复制", type: "success", zIndex: 99999 }); }).catch(() => ElNotification({ title: "失败", message: "复制失败", type: "error", zIndex: 99999 })); };
</script>

<style lang="scss" scoped>
.pw-card { padding: 28px; border-radius: 16px; background: var(--theme-color); border: 1px solid var(--border-color); box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06); }
.pw-card-head { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid var(--border-color); }
.pw-algo-badge { display: flex; align-items: center; justify-content: center; width: 52px; height: 52px; border-radius: 14px; background: rgba(34, 211, 238, 0.12); color: var(--theme-btn-hover-color); font-size: 14px; font-weight: 700; font-family: var(--mono-font-family); flex-shrink: 0; letter-spacing: .02em; }
.pw-card-title { font-size: 18px; font-weight: 700; color: var(--color); }
.pw-card-sub { font-size: 13px; color: var(--text-secondary); margin-top: 4px; }
.pw-toolbar { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
.pw-toolbar-spacer { flex: 1; }
.pw-btn { display: inline-flex; align-items: center; gap: 6px; padding: 9px 20px; font-size: 13px; font-weight: 600; border: none; border-radius: 12px; cursor: pointer; transition: all .2s; outline: none; }
.pw-btn-encrypt { background: var(--theme-btn-hover-color); color: #0d1117; &:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(34,211,238,.3); } }
.pw-btn-decrypt { background: rgba(34, 211, 238, 0.1); color: var(--theme-btn-hover-color); border: 1px solid rgba(34, 211, 238, 0.3); &:hover { background: rgba(34, 211, 238, 0.16); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(34,211,238,.3); } }
.pw-btn-clear { background: transparent; color: var(--text-secondary); border: 1.5px solid var(--border-color); &:hover { background: rgba(127, 127, 127, 0.08); color: var(--color); } }
.pw-io-grid { display: flex; align-items: flex-start; gap: 16px; }
.pw-io-block { flex: 1; min-width: 0; }
.pw-io-label { display: block; font-size: 13px; font-weight: 600; color: var(--color); margin-bottom: 8px; }
.pw-io-arrow { display: flex; align-items: center; padding-top: 32px; flex-shrink: 0; }
.pw-textarea :deep(textarea) { font-family: var(--mono-font-family); font-size: 13px; line-height: 1.7; }
.pw-textarea-result :deep(textarea) { background: rgba(230, 237, 243, 0.03); }
.pw-char-count { margin-top: 6px; font-size: 11px; color: var(--text-secondary); font-variant-numeric: tabular-nums; }
.pw-io-actions { display: flex; align-items: center; justify-content: space-between; margin-top: 8px; }
.pw-copy-btn { display: inline-flex; align-items: center; gap: 4px; padding: 5px 14px; font-size: 12px; font-weight: 600; border: 1.5px solid var(--border-color); border-radius: 8px; background: transparent; color: var(--color); cursor: pointer; transition: all .2s; outline: none; &:hover { border-color: var(--theme-btn-hover-color); color: var(--theme-btn-hover-color); background: rgba(34, 211, 238, 0.06); } &.copied { border-color: var(--theme-btn-hover-color); color: var(--theme-btn-hover-color); background: rgba(34, 211, 238, 0.08); } }
.pw-info-section { margin-top: 28px; padding-top: 20px; border-top: 1px solid var(--border-color); }
.pw-info-head { display: flex; align-items: center; gap: 8px; cursor: pointer; user-select: none; font-size: 14px; font-weight: 600; color: var(--color); .icon { width: 1.1em; height: 1.1em; color: var(--theme-btn-hover-color); } &:hover { color: var(--theme-btn-hover-color); } }
.pw-info-arrow { margin-left: auto; transition: transform .2s; &.open { transform: rotate(180deg); } }
.pw-info-body { margin-top: 14px; font-size: 13px; color: var(--text-secondary); line-height: 1.75; p { margin: 0 0 8px; } b { color: var(--color); } }
@media (max-width: 860px) { .pw-card { padding: 20px 16px; } .pw-card-head { flex-direction: column; align-items: flex-start; gap: 12px; } .pw-io-grid { flex-direction: column; gap: 12px; } .pw-io-arrow { display: none; } .pw-toolbar { flex-wrap: wrap; } }
</style>
