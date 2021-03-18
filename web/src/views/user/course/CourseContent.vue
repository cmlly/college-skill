<template>
  <div>
    <a-card :bordered="false">
      <div style="margin-bottom: 12px">
        <a-button @click="$router.go(-1)" type="dashed">
          <a-icon type="left"></a-icon>
          返回课程列表
        </a-button>
      </div>
      <a-row :gutter="24">
        <a-col :span="12">
          <div>
            <img style="width: 100%;height: 358px" :src="detail.cover" alt="">
          </div>
        </a-col>
        <a-col :span="12">
          <div style="display: flex;flex-direction: column;justify-content: space-between;height: 358px">
            <div>
              <h2>{{ detail.title }}</h2>
              <div style="color: #999999">{{ detail.description }}</div>
              <div class="flex" style="margin-top: 24px">
                <div class="tag-item">{{ detail.learn_num }}人已学</div>
                <div class="tag-item">讲师：{{ detail.create_by }}</div>
                <div class="tag-item">分类：{{ detail.classify }}</div>
              </div>
            </div>
            <div>
              <a-button type="primary" size="large" @click="goStudy">开始学习</a-button>
            </div>
          </div>
        </a-col>
      </a-row>
    </a-card>

    <a-card style="margin-top: 24px" :bordered="false">
      <h2 style="font-weight: bold;margin-bottom: 20px">目录</h2>
      <div v-for="(item, index) of detail.content" :key="index">
        <div class="contents-item">
          <span>{{ item.name }}</span>
          |
          <span>{{ item.department }}</span>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
  import { fetchChooseCourse, fetchCourseDetail } from '@/api/course'
  import { jsonParse } from '@/utils/util'

  export default {
    name: 'CourseContent',
    data () {
      return {
        detail: {}
      }
    },
    created () {
      this.getCourseDetail()
    },
    methods: {
      async getCourseDetail () {
        const res = await fetchCourseDetail({ id: this.$route.params.id })
        this.detail = res.result
        this.detail.content = jsonParse(res.result.content, 'content')
      },
      goStudy () {
        if (localStorage.getItem('Access-Token')) {
            fetchChooseCourse({ cid: this.$route.params.id, courseTitle: this.detail.title, author: this.detail.create_by, classify: this.detail.classify }).then(() => {
              this.$router.push(`/user/login/courseDetail/${this.$route.params.id}`)
            })
        } else {
          this.$message.warning('请在登录后进行学习')
        }
      }
    }

  }
</script>

<style scoped lang="less">
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
  .contents-item {
    font-size: 18px;
    padding: 10px;
    cursor: pointer;
    background: #ffffff;
    transition: background 0.5s;
    &:hover {
      background: #f8f8f8;
    }
  }
</style>
