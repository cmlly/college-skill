<template>
  <a-carousel autoplay draggable arrows>
    <div
      slot="prevArrow"
      class="custom-slick-arrow"
      style="left: 10px;zIndex: 1"
    >
      <a-icon type="left-circle" />
    </div>
    <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
      <a-icon type="right-circle" />
    </div>
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
    height: 400px;
  }
  .ant-carousel >>> .custom-slick-arrow {
    width: 50px;
    height: 50px;
    font-size: 50px;
    color: #fff;
    background-color: rgba(31, 45, 61, 0.11);
    opacity: 0.3;
  }
  .ant-carousel >>> .custom-slick-arrow:before {
    display: none;
  }
  .ant-carousel >>> .custom-slick-arrow:hover {
    opacity: 0.5;
  }
</style>
