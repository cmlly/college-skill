<template>
  <div>
    <news-swiper></news-swiper>
    <news-row style="margin-top: 16px"></news-row>
  </div>
</template>

<script>
  import NewsSwiper from '@/views/user/components/news/NewsSwiper'
  import NewsRow from '@/views/user/components/news/NewsRow'
  export default {
    name: 'News',
    components: { NewsRow, NewsSwiper }
  }
</script>

<style scoped>

</style>
