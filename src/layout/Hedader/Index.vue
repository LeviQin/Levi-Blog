<template>
    <div class="header">
        <div class="w">
            <div class="logCrad">
                <div class="logTitle" @click="router.push('/')">
                    <span>{{ "</>" }}JavaScript
                    </span>
                </div>
                <div class="logText">
                    <span>Levi Qin的博客</span>
                </div>
                <div class="nav-bar-box">
                   <nav-bar></nav-bar>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import NavBar from "./components/NavBar/Index.vue";

const router = useRouter(); 
</script>

<style lang="scss" scoped>
@media (max-width: 380px) {
    .logText {
        display: none;
    }
}
@media (max-width: 800px) {
    .nav-bar ul {
        display: none !important;
    }
    .menu-icon-card {
        display: flex !important;
        align-items: center;
        justify-content: flex-end;
        padding-right: 15px;
        .collapse-icon {
            color: var(--themeTextColor);
        }
    }
}

.header {
    height: 70px;
    background: var(--themeColor);
    min-width: var(--minWidth);
}

.logCrad {
    height: 70px;
    display: flex;
    align-items: center;

    span {
        color: var(--themeTextColor);
    }

    .logTitle {
        font-weight: bold;
        font-size: 25px;
        margin-right: 20px;
        min-width: var(--minWidth);
        cursor: pointer !important;
    }

    .logText {
        font-size: 16px;
    }
    .nav-bar-box {
        flex: 1;
    }
}
</style>