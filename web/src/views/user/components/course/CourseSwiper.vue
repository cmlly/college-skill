<template>
  <div>
    <swiper class="swiper-container" style="height: 400px" ref="mySwiper" :options="swiperOption">
      <swiper-slide v-for="(item, index) in banners" :key="index" class="swiper-item">
        <img :src="item" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
  import { Swiper as SwiperClass, Pagination, Mousewheel, Autoplay, Navigation, EffectCoverflow } from 'swiper/core'
  import 'swiper/swiper-bundle.min.css'
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  SwiperClass.use([Pagination, Mousewheel, Autoplay, Navigation, EffectCoverflow])

  export default {
    components: {
      Swiper,
      SwiperSlide
    },
    data () {
      return {
        banners: [
          require('../../../../assets/course/banner1.jpg'),
          require('../../../../assets/course/banner2.jpg'),
          require('../../../../assets/course/banner3.jpg'),
          require('../../../../assets/course/banner4.jpg')
        ],
        swiperOption: {
          initialSlide: 0,
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: true
          },
          speed: 1000,
          loop: true,
          effect: 'coverflow',
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
      }
    }
  }

</script>

<style scoped lang="less">
  .swiper-button-next, .swiper-button-prev {
    color: rgba(@primary-color, 0.5);
    &:hover {
      color: rgba(@primary-color, 0.8);
    }
  }
</style>
