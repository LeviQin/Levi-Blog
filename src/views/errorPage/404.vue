<template>
  <div class="wscn-http404-container">
    <div class="wscn-http404">
      <div class="pic-404">404</div>
      <div class="bullshit">
        <div class="bullshit__oops">出错了!</div>
        <div class="bullshit__headline">博主提示：此页面暂时找不到哦..</div>
        <div class="bullshit__info">
          请检查您输入的URL是否正确，或单击下面的按钮返回首页。
        </div>
        <a href="/" class="bullshit__return-home">返回首页</a>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.wscn-http404-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wscn-http404 {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 60px;
  border-radius: var(--theme-radius);
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
  background-color: #000000ab;

  .bullshit {
    position: relative;
    padding: 30px 0;
    overflow: hidden;
  }
}

.pic-404 {
  position: relative;
  overflow: hidden;
  width: 350px;
  font-size: 180px;
  color: #fff;
  animation-name: slideUp;
  animation-duration: 0.5s;
  animation-delay: 0.3s;
  animation-fill-mode: forwards;
  opacity: 0;
}

.bullshit__oops {
  font-size: 32px;
  font-weight: bold;
  line-height: 40px;
  color: #fff;
  opacity: 0;
  margin-bottom: 20px;
  animation-name: slideUp;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}

.bullshit__headline {
  font-size: 20px;
  line-height: 24px;
  color: #fff;
  font-weight: bold;
  opacity: 0;
  margin-bottom: 10px;
  animation-name: slideUp;
  animation-duration: 0.5s;
  animation-delay: 0.1s;
  animation-fill-mode: forwards;
}

.bullshit__info {
  font-size: 13px;
  line-height: 21px;
  color: #fff;
  opacity: 0;
  margin-bottom: 30px;
  animation-name: slideUp;
  animation-duration: 0.5s;
  animation-delay: 0.2s;
  animation-fill-mode: forwards;
}

.bullshit__return-home {
  display: block;
  float: left;
  width: 110px;
  height: 36px;
  background: var(--btn-tag-bg-color);
  border-radius: 100px;
  text-align: center;
  color: #ffffff;
  opacity: 0;
  font-size: 14px;
  line-height: 36px;
  cursor: pointer;
  animation-name: slideUp;
  animation-duration: 0.5s;
  animation-delay: 0.3s;
  animation-fill-mode: forwards;
}

.bullshit__return-home:hover {
  background-color: var(--theme-btn-hover-color);
}

@keyframes slideUp {
  0% {
    transform: translateY(60px);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 860px) {
  .wscn-http404 {
    display: block;
  }

  .pic-404 {
    width: 100%;
  }

  .bullshit__oops {
    font-size: 28px;
  }

  .bullshit__headline {
    font-size: 18px;
  }

  .bullshit__info {
    font-size: 12px;
    margin-bottom: 15px;
  }
}
</style>
