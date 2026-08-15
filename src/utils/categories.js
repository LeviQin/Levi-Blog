export const categoryList = ["日常随记", "开发心得", "萌宠日记", "学习笔记", "光影故事"];

// 浅色主题：围绕主题色 cyan 的色相偏移低饱和色板，浅底深字
export const categoryColorMap = {
  1: { bg: "rgba(14,116,144,0.12)", color: "#0e7490", icon: "bi bi-journal-text" },
  2: { bg: "rgba(29,78,216,0.10)", color: "#1d4ed8", icon: "bi bi-code-slash" },
  3: { bg: "rgba(190,18,60,0.10)", color: "#be123c", icon: "bi bi-heart" },
  4: { bg: "rgba(109,40,217,0.10)", color: "#6d28d9", icon: "bi bi-book" },
  5: { bg: "rgba(180,83,9,0.12)", color: "#b45309", icon: "bi bi-camera" },
};

// 深色主题：亮色文字 + 半透明亮色背景，保证深色卡片上可读
export const categoryColorMapDark = {
  1: { bg: "rgba(34,211,238,0.16)", color: "#67e8f9", icon: "bi bi-journal-text" },
  2: { bg: "rgba(59,130,246,0.16)", color: "#93c5fd", icon: "bi bi-code-slash" },
  3: { bg: "rgba(244,63,94,0.16)", color: "#fda4af", icon: "bi bi-heart" },
  4: { bg: "rgba(139,92,246,0.16)", color: "#c4b5fd", icon: "bi bi-book" },
  5: { bg: "rgba(245,158,11,0.16)", color: "#fcd34d", icon: "bi bi-camera" },
};
