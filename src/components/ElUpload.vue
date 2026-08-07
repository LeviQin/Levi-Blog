<template>
  <div class="el-upload" :class="[drag ? 'is-drag' : '', isDragover ? 'is-dragover' : '', attrs.class]" :style="attrs.style" @click="openFileDialog" @dragover.prevent="onDragover" @dragleave.prevent="onDragleave" @drop.prevent="onDrop"><div v-if="drag" class="el-upload-dragger"><slot /></div><slot v-else /><input ref="inputRef" class="el-upload__input" type="file" :accept="accept" hidden @change="onFileChange" /></div>
</template>

<script setup>
import { ref, useAttrs } from 'vue';
const props = defineProps({ drag: { type: Boolean, default: false }, action: { type: String, default: '' }, beforeUpload: { type: Function, default: null }, showFileList: { type: Boolean, default: true }, accept: { type: String, default: '' } });
const emit = defineEmits(['change']);
const attrs = useAttrs();
const inputRef = ref(null); const isDragover = ref(false);
const processFile = async (file) => { if (!file) return; const allowed = props.beforeUpload ? await props.beforeUpload(file) : true; if (allowed === false) return; emit('change', file); };
const openFileDialog = () => inputRef.value?.click();
const onFileChange = async (event) => { const file = event.target.files?.[0]; await processFile(file); event.target.value = ''; };
const onDragover = () => { if (props.drag) isDragover.value = true; };
const onDragleave = () => { isDragover.value = false; };
const onDrop = async (event) => { isDragover.value = false; if (!props.drag) return; const file = event.dataTransfer?.files?.[0]; await processFile(file); };
</script>

<style scoped>
.el-upload { display: block; width: 100%; }
.el-upload.is-drag { cursor: pointer; }
.el-upload-dragger { border: 2px dashed rgba(34,211,238,.28); border-radius: 18px; background: rgba(255,255,255,.4); padding: 26px 18px; text-align: center; transition: all .2s ease; }
.el-upload.is-dragover .el-upload-dragger { border-color: var(--theme-btn-hover-color,#22d3ee); background: rgba(34,211,238,.08); }
</style>
