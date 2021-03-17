<template>
  <div style="margin: 24px 0;">
    <div class="card">
      <div class="content">
        <div class="flex">
          <img src="../../../../assets/course/design-model-book.png" style="height: 128px;margin-right: 20px" alt="">
          <div style="display: flex;flex-direction: column;justify-content: space-between">
            <div>
              <h3 style="font-weight: bold">趣学设计模式</h3>
              <div style="color: #b2b2b2">黄靖锋  清华大学架构师</div>
            </div>
            <div style="font-size: 20px">1.04w人已经学习</div>
          </div>
        </div>
        <div class="flex items-center" style="padding-right: 50px">
          <div>
            <span>距离课程结束还有</span>
            <span class="left-time">{{ leftTime }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { countDown } from '@/utils/util'

  export default {
    name: 'TimeCourse',
    data () {
      return {
        leftTime: ''
      }
    },
    created () {
      this.getLeftTime()
    },
    methods: {
      getLeftTime () {
        setInterval(() => {
          this.leftTime = countDown('2021/6/17')
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .card {
    height: 148px;
    width:100%;
    min-width: 1200px;
    background: url('../../../../assets/course/time-course.png') no-repeat center;
    background-size: cover;
    .content {
      padding: 10px 0 10px 250px;
      display: flex;
      justify-content: space-between;
    }
  }
  .left-time {
    color: @primary-color;
    font-size: 28px;
    font-family: "Yu Gothic"
  }
</style>
