<template>
  <a-row :gutter="16">
    <a-col :span="8">
      <img-story></img-story>
    </a-col>
    <a-col :span="16">
      <news-cards></news-cards>
    </a-col>
  </a-row>
</template>

<script>
  import ImgStory from '@/views/user/components/news/ImgStory'
  import NewsCards from '@/views/user/components/news/NewsCards'
  export default {
    name: 'NewsRow',
    components: { NewsCards, ImgStory }
  }
</script>

<style scoped>

</style>
