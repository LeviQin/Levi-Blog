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
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<style lang="scss" scoped>
@media (max-width: 330px) {
    .logText {
        display: none;
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
}
</style>