<template>
  <a-carousel autoplay draggable>
    <div>
      <img style="width: 100%;height: 100%" src="../../../../assets/news/swiper1.jpg" alt="">
    </div>
    <div>
      <img style="width: 100%;height: 100%" src="../../../../assets/news/swiper2.jpg" alt="">
    </div>
    <div>
      <img style="width: 100%;height: 100%" src="../../../../assets/news/swiper3.jpg" alt="">
    </div>
    <div>
      <img style="width: 100%;height: 100%" src="../../../../assets/news/swiper4.jpg" alt="">
    </div>
  </a-carousel>
</template>

<script>
  export default {
    name: 'IndexSwiper',
    data () {
      return {

      }
    },
    methods: {}
  }
</script>

<style scoped>
  .ant-carousel >>> .slick-slide {
    /*text-align: center;*/
    height: 400px;
    /*line-height: 500px;*/
    /*background: #FF8604;*/
    /*overflow: hidden;*/
  }

  .ant-carousel >>> .slick-slide h3 {
    color: #fff;
  }
</style>
