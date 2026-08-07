/**
 * 元素由下而上位移一段距离的通用型动画，使用自定义指令
 */

const DISTANCE = 60; // 位移距离(减小，更柔和)
const DURACTION = 1200; // 动画时间(加长，更缓慢)
const EASING = "cubic-bezier(0.25, 0.46, 0.45, 0.94)"; // 平滑缓出，无回弹
const map = new WeakMap();

const ob = new IntersectionObserver((entries) => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            const animation = map.get(entry.target);
            if (animation) {
                animation.play();
                ob.unobserve(entry.target);
            }
        }
    }
});

const isBelowViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top - DISTANCE > window.innerHeight;
}

export const vSlidIn = {
    mounted(el) {
        if (!isBelowViewport(el)) {
            return;
        }
        const animation = el.animate(
            [{
                    transform: `translateY(${DISTANCE}px)`,
                    opacity: 0.3,
                    transition: `opacity 0.6s ease, transform 0.6s ${EASING}`
                },
                {
                    transform: `translateY(0)`,
                    opacity: 1,
                    transition: `opacity 0.6s ease, transform 0.6s ${EASING}`
                }
            ], {
                duration: DURACTION,
                easing: EASING,
                fill: "forwards"
            }
        );
        animation.pause();
        ob.observe(el);
        map.set(el, animation);
    },
    unmounted(el) {
        ob.unobserve(el);
    }
};
