/**
 * @author levi
 * @name 页面滚动动画
 */

let isMoving = false;

/**
 * 滚动动画
 * @param {Number} start 开始数值
 * @param {String} type 滚动类型，top or bottom
 * @param {Number} time 延迟时间启动
 * @returns 
 */
export const scrollAnimation = (start, type = "top", time = 100) => {
    if (isMoving) return;

    const targetPosition = type === "top" ? 0 : start;
    const startPosition = window.scrollY || window.pageYOffset;

    let startTime;

    const animateScroll = (timestamp) => {
        if (!startTime) {
            startTime = timestamp;
        }

        const progress = (timestamp - startTime) / time;

        if (progress >= 1) {
            window.scrollTo(0, targetPosition);
            isMoving = false;
        } else {
            const next = Math.floor(easeInOutQuad(10 * progress, startPosition, targetPosition - startPosition, 1));

            window.scrollTo(0, next);

            requestAnimationFrame(animateScroll);
        }
    };

    isMoving = true;
    requestAnimationFrame(animateScroll);

    const easeInOutQuad = (t, b, c, d) => {
        if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
        return (-c / 2) * (--t * (t - 2) - 1) + b;
    };
};