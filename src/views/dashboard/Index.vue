<template>
    <div class="dashboard">
        <div class="menu">1</div>
        <div class="content">2</div>
        <div class="nav">3</div>
    </div>
</template>

<script setup>
import { ref } from "vue";

</script>

<style lang="scss" scoped>
.dashboard {
    display: flex;
    .menu {
        width: 30%;
    }
    .content {
        flex: 1;
    }
    .nav {
        width: 30%;
    }
}
</style>