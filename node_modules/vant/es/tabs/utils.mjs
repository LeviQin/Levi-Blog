import { raf } from "@vant/use";
import { getScrollTop, setScrollTop } from "../utils/index.mjs";
function scrollLeftTo(scroller, to, duration) {
  let count = 0;
  const from = scroller.scrollLeft;
  const frames = duration === 0 ? 1 : Math.round(duration * 1e3 / 16);
  function animate() {
    scroller.scrollLeft += (to - from) / frames;
    if (++count < frames) {
      raf(animate);
    }
  }
  animate();
}
function scrollTopTo(scroller, to, duration, callback) {
  let current = getScrollTop(scroller);
  const isDown = current < to;
  const frames = duration === 0 ? 1 : Math.round(duration * 1e3 / 16);
  const step = (to - current) / frames;
  function animate() {
    current += step;
    if (isDown && current > to || !isDown && current < to) {
      current = to;
    }
    setScrollTop(scroller, current);
    if (isDown && current < to || !isDown && current > to) {
      raf(animate);
    } else if (callback) {
      raf(callback);
    }
  }
  animate();
}
export {
  scrollLeftTo,
  scrollTopTo
};
