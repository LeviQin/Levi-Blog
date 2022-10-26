<script setup>
import { onMounted } from "vue";
import { throttle } from "@/utils/utils";

onMounted(() => {
    document.addEventListener("mousemove", throttle(mouseMove, 100));
});

const mouseMove = (e) => {
    const oPanel = document.querySelector("#app");
    const oSpan = document.createElement("b");
    e = e || window.Event;
    oSpan.style.left = e.clientX + "px";
    oSpan.style.top = e.clientY - 20 + "px";
    const size = Math.random() * 10;
    oSpan.style.width = 4 + size + "px";
    oSpan.style.height = 4 + size + "px";
    oPanel.appendChild(oSpan);
    setTimeout(() => {
        oSpan.remove();
    }, 1000)
};
</script>

<style lang="scss">
#app {
    b {
        width: 4px;
        height: 4px;
        background: #55b9f3;
        border-radius: 50%;
        position: absolute;
        box-shadow: 5px 5px 15px #489dcf, -5px -5px 15px #62d5ff;
        animation: blow 4s linear infinite;
        -webkit-animation: blow 4s linear infinite;
    }
}

@keyframes blow {
    0% {
        transform: translate(-50%, -50%);
        opacity: 1;
        filter: hue-rotate(0deg);
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
    }

    100% {
        transform: translate(-50%, -1000%);
        opacity: 0;
        filter: hue-rotate(720deg);
        -webkit-transform: translate(-50%, -1000%);
        -moz-transform: translate(-50%, -1000%);
        -ms-transform: translate(-50%, -1000%);
        -o-transform: translate(-50%, -1000%);
        -webkit-filter: hue-rotate(720deg);
    }
}
</style>