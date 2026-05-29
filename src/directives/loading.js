function ensureMask(el) {
  if (el._loadingMask) return el._loadingMask;
  const computedStyle = window.getComputedStyle(el);
  if (computedStyle.position === 'static') {
    el.dataset.loadingOriginalPosition = 'static';
    el.style.position = 'relative';
  }
  const mask = document.createElement('div');
  mask.className = 'el-loading-mask';
  mask.innerHTML = '<div class="el-loading-spinner"><svg viewBox="0 0 50 50" class="circular" aria-hidden="true"><circle cx="25" cy="25" r="20" fill="none"></circle></svg><p class="el-loading-text"></p></div>';
  el._loadingMask = mask;
  return mask;
}

function updateMask(el) {
  const mask = ensureMask(el);
  mask.querySelector('.el-loading-text').textContent = el.getAttribute('element-loading-text') || 'Loading...';
  mask.style.background = el.getAttribute('element-loading-background') || 'rgba(255, 255, 255, 0.7)';
}

function toggleLoading(el, value) {
  updateMask(el);
  const mask = el._loadingMask;
  if (!mask) return;
  if (value) {
    if (!mask.parentNode) {
      el.appendChild(mask);
      requestAnimationFrame(() => mask.classList.add('is-visible'));
    }
  } else if (mask.parentNode) {
    mask.classList.remove('is-visible');
    window.setTimeout(() => mask.parentNode && mask.parentNode.removeChild(mask), 150);
  }
}

export const vLoading = {
  mounted(el, binding) {
    toggleLoading(el, binding.value);
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) toggleLoading(el, binding.value);
    else if (binding.value) updateMask(el);
  },
  unmounted(el) {
    el._loadingMask && el._loadingMask.remove();
    delete el._loadingMask;
    if (el.dataset.loadingOriginalPosition === 'static') {
      el.style.position = '';
      delete el.dataset.loadingOriginalPosition;
    }
  },
};
