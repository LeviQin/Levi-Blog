const DISTANCE = 16;
const DURATION = 600;
const EASING = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
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

const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const isBelowViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top - DISTANCE > window.innerHeight;
}

export const vSlidIn = {
    mounted(el) {
        if (prefersReducedMotion() || !isBelowViewport(el)) {
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
                duration: DURATION,
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
