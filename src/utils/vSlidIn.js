/**
 * 元素由下而上位移一段距离的通用型动画，使用自定义指令
 */

const DISTANCE = 120; // 位移距离
const DURACTION = 500; // 动画时间
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
                    opacity: 0.7,
                    transition: `opacity 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55), transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)`
                },
                {
                    transform: `translateY(0)`,
                    opacity: 1,
                    transition: `opacity 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55), transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)`
                }
            ], {
                duration: DURACTION,
                easing: "ease-in-out",
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
