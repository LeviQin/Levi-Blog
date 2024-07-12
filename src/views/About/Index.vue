<template>
  <Head>
    <meta
      name="keywords"
      content="前端开发，HTML5、CSS3、ES6、JavaScript，Vue2、Vue3，Flutter，跨平台开发，小程序，Node.js"
    />
    <meta
      name="description"
      content="我是一名Web前端开发，目前就职于深圳市笨鸟软件有限公司，有丰富的前端开发经验，熟练掌握HTML5、CSS3、ES6、JavaScript等Web开发技术，擅长使用Vue2、Vue3全家桶,并有Flutter跨平台开发经验,熟悉小程序和Node.js"
    />
    <meta
      property="og:description"
      content="我是一名Web前端开发，目前就职于深圳市笨鸟软件有限公司，有丰富的前端开发经验，熟练掌握HTML5、CSS3、ES6、JavaScript等Web开发技术，擅长使用Vue2、Vue3全家桶,并有Flutter跨平台开发经验,熟悉小程序和Node.js"
    />
    <meta
      name="twitter:description"
      content="我是一名Web前端开发，目前就职于深圳市笨鸟软件有限公司，有丰富的前端开发经验，熟练掌握HTML5、CSS3、ES6、JavaScript等Web开发技术, 擅长使用Vue2、Vue3全家桶,并有Flutter跨平台开发经验,熟悉小程序和Node.js"
    />
  </Head>
  <div class="about">
    <div class="about-header">
      <div class="about-header-nav w">
        <ul>
          <li class="nav-li about active-nav" @click="toPage(0)">关于</li>
          <li class="nav-li work" @click="toPage(1)">作品</li>
          <li @click="router.push(`/`)">
            <span class="nav-avatar">首页</span>
          </li>
          <li class="nav-li ability" @click="toPage(2)">能力</li>
          <li class="nav-li connect" @click="toPage(3)">联系</li>
        </ul>
      </div>
    </div>
    <el-carousel
      class="carousel"
      direction="vertical"
      :autoplay="false"
      trigger="click"
      ref="carouselRef"
      :loop="false"
      @mousewheel="rollScroll($event)"
      @change="changeCarousel"
    >
      <el-carousel-item name="0">
        <About @toNextPage="toNextPage" />
      </el-carousel-item>
      <el-carousel-item name="1">
        <Work @toNextPage="toNextPage" />
      </el-carousel-item>
      <el-carousel-item name="2">
        <Ability @toNextPage="toNextPage" />
      </el-carousel-item>
      <el-carousel-item name="3">
        <Connect @toOnePage="toOnePage" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import About from "./About.vue";
import Work from "./Work.vue";
import Ability from "./Ability.vue";
import Connect from "./Connect.vue";
import Hammer from "hammerjs";
import { Head } from "@vueuse/head";

onMounted(() => {
  const mc = new Hammer(carouselRef.value.$el);
  mc.get("pan").set({ direction: Hammer.DIRECTION_ALL });
  mc.get("swipe").set({ direction: Hammer.DIRECTION_VERTICAL });

  mc.on("panend", (e) => {
    e.preventDefault();
    // 检查是否是垂直方向的移动
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      // 检查移动方向
      if (e.deltaY > 0) {
        // 向下滑动
        carouselRef.value.prev();
      } else {
        // 向上滑动
        carouselRef.value.next();
      }
    }
  });
});

let timeId = ref(null);
let carouselRef = ref(null);
const router = useRouter();

const rollScroll = (event) => {
  // chrome、ie使用的wheelDelta，火狐使用detail
  let scrollVal = event.wheelDelta || event.detail;
  // 节流
  if (!timeId.value) {
    timeId.value = setTimeout(() => {
      timeId.value = null;
      scrollVal > 0 ? carouselRef.value.prev() : carouselRef.value.next();
    }, 300);
  }
};

const toPage = (val) => {
  changeCarousel(val);
  carouselRef.value.setActiveItem(val);
};

const toNextPage = () => {
  carouselRef.value.next();
};

const toOnePage = () => {
  carouselRef.value.setActiveItem("0");
};

const changeCarousel = (val) => {
  const navLiArr = document.querySelectorAll(".nav-li");
  for (let i = 0; i < navLiArr.length; i++) {
    if (i === val) {
      navLiArr[i].classList.add("active-nav");
    } else {
      navLiArr[i].classList.remove("active-nav");
    }
  }
};
</script>

<style lang="scss" scoped>
@media (max-width: 768px) {
  .about-header-nav ul li {
    font-size: 1rem !important;
  }

  li .nav-avatar {
    width: 4.5rem !important;
    height: 4.5rem !important;
    background-size: 4.5rem 4.5rem !important;
  }
}

.about-header-nav {
  height: 100%;
}

.about {
  display: flex;
  flex-direction: column;
  height: 100%;

  .carousel {
    height: 100%;
    flex: 1;
  }
}

.about-header {
  height: 80px;
  background-color: #000000;

  .about-header-nav ul {
    height: 100%;
    display: flex;
    justify-content: space-between;

    li {
      width: 20%;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      cursor: pointer;
      transition: all 0.4s;

      .nav-avatar {
        background: url(../../assets/images/levi2.jpg);
        background-size: 100px 100px;
        position: absolute;
        width: 100px;
        height: 100px;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 50%;
        border: 4px solid #fff;
        overflow: hidden;
        text-indent: -9999px;
        padding: 0 !important;
        z-index: 99999;
        top: 20px;
      }
    }

    li.about:hover {
      transition: all 0.4s;
      color: var(--aboutColor);
    }

    li.work:hover {
      transition: all 0.4s;
      color: var(--workColor);
    }

    li.ability:hover {
      transition: all 0.4s;
      color: var(--abilityColor);
    }

    li.connect:hover {
      transition: all 0.4s;
      color: var(--connectColor);
    }
  }
}

.active-nav.about {
  color: var(--aboutColor) !important;
}

.active-nav.work {
  color: var(--workColor) !important;
}

.active-nav.ability {
  color: var(--abilityColor) !important;
}

.active-nav.connect {
  color: var(--connectColor) !important;
}
</style>
