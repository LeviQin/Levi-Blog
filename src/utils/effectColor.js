const parseHex = (hex) => {
  const value = String(hex || "#22d3ee").replace("#", "");
  return {
    r: parseInt(value.slice(0, 2), 16) || 34,
    g: parseInt(value.slice(2, 4), 16) || 211,
    b: parseInt(value.slice(4, 6), 16) || 238,
  };
};

// 浅色背景上自动压低亮色，保留色相并提高对比度
export const getEffectRgb = (hex, theme = (typeof document !== "undefined" ? document.documentElement.dataset.theme : "dark")) => {
  const rgb = parseHex(hex);
  if (theme !== "light") return rgb;

  const luminance = (rgb.r * 0.2126 + rgb.g * 0.7152 + rgb.b * 0.0722) / 255;
  const factor = luminance > 0.62 ? 0.52 : 0.68;
  return {
    r: Math.max(12, Math.round(rgb.r * factor)),
    g: Math.max(12, Math.round(rgb.g * factor)),
    b: Math.max(12, Math.round(rgb.b * factor)),
  };
};

export const getEffectColor = (hex, theme) => {
  const { r, g, b } = getEffectRgb(hex, theme);
  return `${r}, ${g}, ${b}`;
};
