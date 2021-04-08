<template>
  <div class="check-area">
    <div class="mark-icon" v-if="state === 'success'">
      <span class="mark-line mark-tip"></span>
      <span class="mark-line mark-long"></span>
      <div class="mark-circle"></div>
      <div class="mark-fix"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['state']
}
</script>

<style lang="scss" scoped>
/* success logo*/
.mark-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid #4caf50;
  position: relative;
  box-sizing: content-box !important;

  &::before,
  &::after {
    content: "";
    height: 100px;
    position: absolute;
    background: #fff;
    transform: rotate(-45deg);
  }

  &::before {
    top: 3px;
    left: -2px;
    width: 30px;
    border-radius: 100px 0 0 100px; //左側bevel
    transform-origin: 100% 50%;
  }

  &::after {
    top: 0px;
    left: 30px;
    width: 60px;
    border-radius: 0 100px 100px 0; //右側bevel
    transform-origin: 0 50%;
    animation: rotate-circle 4.25s ease-in; //動畫
  }

  .mark-line {
    display: block;
    height: 5px;
    background-color: #4caf50;
    border-radius: 2px;
    position: absolute;
    z-index: 10;

    &.mark-tip {
      top: 46px;
      left: 14px;
      width: 25px;
      transform: rotate(45deg);
      animation: mark-line-tip 0.75s;
    }

    &.mark-long {
      top: 39px;
      right: 7.5px;
      width: 47px;
      transform: rotate(-45deg);
      animation: mark-line-long 0.75s;
    }
  }

  .mark-circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 4px solid rgba(76, 175, 80, 0.5);
    position: absolute;
    top: -4px;
    left: -4px;
    z-index: 10;
    box-sizing: content-box !important;
  }

  .mark-fix {
    width: 5px;
    height: 85px;
    background-color: #fff;
    position: absolute;
    top: 8px;
    left: 26px;
    z-index: 2;
    transform: rotate(-45deg);
  }
}

/* 動態 */
@keyframes rotate-circle {
  //外圈
  0% {
    transform: rotate(-45deg);
  }

  5% {
    transform: rotate(-45deg);
  }

  12% {
    transform: rotate(-405deg);
  }

  100% {
    transform: rotate(-405deg);
  }
}

//打勾
@keyframes mark-line-tip {
  0% {
    width: 0;
    left: 1px;
    top: 19px;
  }

  54% {
    width: 0;
    left: 1px;
    top: 19px;
  }

  70% {
    width: 50px;
    left: -8px;
    top: 37px;
  }

  84% {
    width: 17px;
    left: 21px;
    top: 48px;
  }

  100% {
    width: 25px;
    left: 14px;
    top: 45px;
  }
}

@keyframes mark-line-long {
  0% {
    width: 0;
    right: 47px;
    top: 54px;
  }

  65% {
    width: 0;
    right: 47px;
    top: 54px;
  }

  84% {
    width: 55px;
    right: 0px;
    top: 35px;
  }

  100% {
    width: 47px;
    right: 7.5px;
    top: 39px;
  }
}
</style>
