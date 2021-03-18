<template>
  <div>
    <div v-if="user.isLogin">
      <a-card style="margin-bottom: 12px" v-for="(item, index) of choseList" :key="index" :bordered="false">
        <div class="flex">
          <img style="height: 123px;margin-right: 20px" src="../../assets/course/card-pic.png" alt="">
          <div style="display: flex;flex-direction: column;justify-content: space-between">
            <div>
              <h2>{{ item.course_title }}</h2>
              <div class="flex" style="margin-top: 8px">
                <div class="tag-item">{{ item.author }}</div>
                <div class="tag-item">{{ item.classify }}</div>
              </div>
            </div>
            <div>
              <a-button type="primary" @click="$router.push(`/user/login/courseDetail/${item.cid}`)">继续学习</a-button>
            </div>
          </div>
        </div>
      </a-card>
    </div>
    <a-card v-else :bordered="false">
      <a-result status="403" title="您还没有登录" sub-title="登录后即可查看已选课程">
        <template #extra>
          <a-button type="primary">
            点击右上角登录
          </a-button>
        </template>
      </a-result>
    </a-card>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { fetchChoseCourseList } from '@/api/course'
  export default {
    name: 'Learn',
    data () {
      return {
        choseList: []
      }
    },
    computed: {
      ...mapState(['user'])
    },
    created () {
      if (this.user.isLogin) {
        this.getChoseCourse()
      }
    },
    methods: {
      async getChoseCourse () {
        const res = await fetchChoseCourseList()
        this.choseList = res.result.data
        // console.log(res)
      }
    }
  }
</script>

<style scoped>
  .tag-item {
    background: #f8f9fa;
    border-radius: 4px;
    padding: 11px 16px;
    font-size: 14px;
    font-family: "PingFang SC";
    color: #666666;
    line-height: 14px;
    margin-right: 16px;
  }
</style>
