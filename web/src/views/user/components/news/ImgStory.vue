<template>
  <a-card :bordered="false">
    <h2 class="flex justify-center items-center">
      <img style="width: 30px;margin-right: 4px" src="../../../../assets/news/img-icon.png" alt="">
      图片故事
    </h2>
    <a-row :gutter="4">
      <a-col :span="12">
        <div style="margin-bottom: 4px">
          <img style="width: 100%;height: 120px" src="../../../../assets/news/1.jpg" alt="">
        </div>
        <div>
          <img style="width: 100%;height: 120px" src="../../../../assets/news/2.jpg" alt="">
        </div>
      </a-col>
      <a-col :span="12">
        <img style="width: 100%; height: 244px" src="../../../../assets/news/3.jpg" alt="">
      </a-col>
    </a-row>
    <a-row :gutter="4" style="margin-top: 4px">
      <a-col :span="12">
        <img style="width: 100%" src="../../../../assets/news/4.jpg" alt="">
      </a-col>
      <a-col :span="12">
        <div style="margin-bottom: 4px">
          <img style="width: 100%" src="../../../../assets/news/5.jpg" alt="">
        </div>
        <div>
          <img style="width: 100%" src="../../../../assets/news/6.jpg" alt="">
        </div>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
  export default {
    name: 'ImgStory'
  }
</script>

<style scoped>

</style>
