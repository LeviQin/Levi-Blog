const TYPE_COLOR_MAP = {
  success: '#67c23a',
  warning: '#e6a23c',
  error: '#f56c6c',
  info: '#909399',
};

const DEFAULT_DURATION = 4200;
let notificationSeed = 1;
let messageSeed = 1;
let messageInstance = null;

function ensureContainer(kind) {
  const className = kind === 'message' ? 'el-message-container' : 'el-notification-container';
  let container = document.querySelector("." + className);
  if (!container) {
    container = document.createElement('div');
    container.className = className;
    document.body.appendChild(container);
  }
  return container;
}

function normalizeOptions(options = {}) {
  if (typeof options === 'string') {
    return { message: options };
  }
  return { ...options };
}

function appendNoticeContent(target, content, allowHtml = false) {
  if (content === null || content === undefined) {
    return;
  }
  if (allowHtml) {
    target.innerHTML = String(content);
    return;
  }
  target.textContent = String(content);
}

function createNotice(kind, rawOptions = {}) {
  const options = normalizeOptions(rawOptions);
  const notice = document.createElement('div');
  const type = options.type || 'info';
  const color = TYPE_COLOR_MAP[type] || TYPE_COLOR_MAP.info;
  const id = (kind === 'message' ? 'el-message-' : 'el-notification-') + (kind === 'message' ? messageSeed++ : notificationSeed++);
  notice.className = (kind === 'message' ? 'el-message' : 'el-notification') + ' is-' + type;
  notice.dataset.noticeId = id;
  notice.style.setProperty('--notice-accent', color);
  if (options.zIndex) notice.style.zIndex = String(options.zIndex);

  const icon = document.createElement('div');
  icon.className = 'el-notice__icon';
  icon.setAttribute('aria-hidden', 'true');

  const main = document.createElement('div');
  main.className = 'el-notice__main';

  if (kind === 'notification' && options.title) {
    const title = document.createElement('div');
    title.className = 'el-notification__title';
    appendNoticeContent(title, options.title, Boolean(options.dangerouslyUseHTMLString));
    main.appendChild(title);
  }

  const content = document.createElement('div');
  content.className = kind === 'message' ? 'el-message__content' : 'el-notification__content';
  appendNoticeContent(content, options.message || '', Boolean(options.dangerouslyUseHTMLString));
  main.appendChild(content);

  notice.appendChild(icon);
  notice.appendChild(main);

  if (options.showClose !== false) {
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'el-notification__closeBtn';
    closeButton.setAttribute('aria-label', 'close');
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 16 16');
    svg.setAttribute('width', '14');
    svg.setAttribute('height', '14');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    const line1 = document.createElementNS(svgNS, 'path');
    line1.setAttribute('d', 'M4 4l8 8');
    const line2 = document.createElementNS(svgNS, 'path');
    line2.setAttribute('d', 'M12 4l-8 8');
    svg.appendChild(line1);
    svg.appendChild(line2);
    closeButton.appendChild(svg);
    notice.appendChild(closeButton);
  }

  const duration = options.duration === 0 ? 0 : Number(options.duration || DEFAULT_DURATION);

  if (duration > 0) {
    const progress = document.createElement('div');
    progress.className = 'el-notice__progress';
    progress.style.animationDuration = duration + 'ms';
    notice.appendChild(progress);
  }

  let closed = false;
  let timer = null;
  let progressEl = null;
  const container = ensureContainer(kind);

  const close = () => {
    if (closed) return;
    closed = true;
    clearTimeout(timer);
    notice.classList.add('is-closing');
    window.setTimeout(() => {
      notice.remove();
      if (kind === 'message' && messageInstance && messageInstance.id === id) {
        messageInstance = null;
      }
    }, 220);
  };

  const closeButton = notice.querySelector('.el-notification__closeBtn');
  if (closeButton) closeButton.addEventListener('click', close);
  container.appendChild(notice);
  requestAnimationFrame(() => notice.classList.add('is-visible'));

  if (duration > 0) {
    progressEl = notice.querySelector('.el-notice__progress');
    timer = window.setTimeout(close, duration);
    notice.addEventListener('mouseenter', () => {
      clearTimeout(timer);
      if (progressEl) progressEl.classList.add('is-paused');
    });
    notice.addEventListener('mouseleave', () => {
      timer = window.setTimeout(close, Math.min(duration, 1600));
      if (progressEl) progressEl.classList.remove('is-paused');
    });
  }

  return { id, close };
}

export function ElNotification(options = {}) {
  return createNotice('notification', options);
}

['success', 'warning', 'info', 'error'].forEach((type) => {
  ElNotification[type] = (options = {}) => ElNotification({
    ...(typeof options === 'string' ? { message: options } : options),
    type,
  });
});

export function ElMessage(options = {}) {
  if (messageInstance) messageInstance.close();
  messageInstance = createNotice('message', options);
  return messageInstance;
}

['success', 'warning', 'info', 'error'].forEach((type) => {
  ElMessage[type] = (options = {}) => ElMessage({
    ...(typeof options === 'string' ? { message: options } : options),
    type,
  });
});
