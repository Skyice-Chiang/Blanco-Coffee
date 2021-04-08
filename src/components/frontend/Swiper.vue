<template>
  <swiper class="swiper" ref="fadeSwiper" :options="swiperOptions">
    <div class="intro font-weight-bold letter-spacing text-white text-center">
      了解更多的咖啡知識
      <br />
      <i class="fas fa-angle-double-down down-ani"></i>
    </div>
    <swiper-slide class="slide-1"> </swiper-slide>
    <swiper-slide class="slide-2"> </swiper-slide>
    <swiper-slide class="slide-3"> </swiper-slide>
    <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
    <div class="swiper-button-prev swiper-button-white ml-4" slot="button-prev"></div>
    <div class="swiper-button-next swiper-button-white mr-4" slot="button-next"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
// 匯入要用到的參數套件
import {
  Swiper as SwiperClass,
  Navigation,
  Pagination,
  Autoplay,
  EffectFade
} from 'swiper/core'

SwiperClass.use([Navigation, Pagination, Autoplay, EffectFade])

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      swiperOptions: {
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        autoplay: {
          delay: 5000
        },
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.fadeSwiper.$swiper
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper {
  height: 100vh;
  .swiper-slide {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    &.slide-1 {
      background-image: url("../../assets/images/banner/banner-index01.jpg");
    }
    &.slide-2 {
      background-image: url("../../assets/images/banner/banner-index02.jpg");
    }
    &.slide-3 {
      background-image: url("../../assets/images/banner/banner-index03.jpg");
    }
    &::after {
      content: "";
      height: 100%;
      width: 100%;
      background-color: #000;
      position: absolute;
      z-index: 1;
      opacity: 0.2;
    }
  }
}
.intro {
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 1);
  position: absolute;
  bottom: 4%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  .down-ani {
    animation: down 1s ease-in-out infinite;
  }
}
@keyframes down {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: translateY(6px);
  }
}
@media (max-width: 1200px) {
  .swiper {
    height: 50vh;
  }
}
</style>
