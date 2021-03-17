<template>
  <div>
    <course-swiper></course-swiper>
    <time-course></time-course>
    <course-list></course-list>
  </div>
</template>

<script>
  import CourseSwiper from '@/views/user/components/course/CourseSwiper'
  import TimeCourse from '@/views/user/components/course/TimeCourse'
  import CourseList from '@/views/user/components/course/CourseList'
  export default {
    name: 'Course',
    components: { CourseList, TimeCourse, CourseSwiper }
  }
</script>

<style scoped>

</style>
