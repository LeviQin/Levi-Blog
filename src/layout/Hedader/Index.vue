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
                <div class="nav-bar">
                    <ul>
                        <li>首页</li>
                        <li>前端导航</li>
                        <li>前端资料</li>
                        <li>小工具</li>
                        <li>关于我</li>
                    </ul>
                    <div class="menu-icon-card">
                        <el-icon><Expand /></el-icon>
                        <el-icon><Fold /></el-icon>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
// import {Expand, Fold} from "element-plus"

const router = useRouter();
</script>

<style lang="scss" scoped>
@media (max-width: 330px) {
    .logText {
        display: none;
    }
}
@media (max-width: 800px) {
    .nav-bar ul {
        display: none !important;
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
    .nav-bar {
        flex: 1;
        .menu-icon-card {
            display: none;
        }
        ul {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            li {
                padding: 0 15px;
                color: var(--themeTextColor);
                cursor: pointer;
            }
        }
    }
}
</style>