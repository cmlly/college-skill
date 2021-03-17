<template>
  <div>
    <h2>课程列表</h2>
    <a-tabs @tabClick="getCourseList">
      <a-tab-pane v-for="item of classify" :key="item.name" :tab="item.name">
        <a-row :gutter="[16,16]">
          <a-col :span="8" v-for="(itemj, indexj) of list" :key="indexj">
            <div class="card-item flex" @click="$router.push(`/user/login/courseContent/${itemj.id}`)">
              <img style="margin-right: 10px" src="../../../../assets/course/card-pic.png" alt="">
              <div style="display: flex;flex-direction: column;justify-content: space-between">
                <div>
                  <h3>{{ itemj.title }}</h3>
                  <div style="color: #999999;font-size: 13px">{{ itemj.description }}</div>
                  <div style="color: #999999;font-size: 13px;margin-top: 5px">{{ itemj.create_by }}</div>
                </div>
                <div>
                  已有<span class="num">{{ itemj.learn_num }}</span>人学习
                </div>
              </div>
            </div>
          </a-col>
        </a-row>
        <a-empty v-if="list.length === 0" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
  import { fetchCourseClassify, fetchCourseList } from '@/api/course'

  export default {
    name: 'CourseList',
    data () {
      return {
        classify: [],
        list: []
      }
    },
    created () {
      this.getCourseClassify()
      this.getCourseList()
    },
    methods: {
      async getCourseClassify () {
        const res = await fetchCourseClassify()
        this.classify = res.result.classify
      },
      async getCourseList (classify = '全部') {
        if (classify === '全部') {
          const res = await fetchCourseList({ pageIndex: 1, pageSize: 10000 })
          this.list = res.result.data
        } else {
          const res = await fetchCourseList({ pageIndex: 1, pageSize: 10000, classify })
          this.list = res.result.data
        }
      }
    }
  }
</script>

<style scoped lang="less">
.card-item {
  position: relative;
  top: 0;
  padding: 20px;
  background: url("../../../../assets/course/card-bg.png") no-repeat center;
  background-size: cover;
  border-radius: 10px;
  cursor: pointer;
  transition: top .5s;
  img {
    height: 123px;
    border-radius: 4px;
  }
}
.card-item:hover{
  top: -10px;
  box-shadow: -1px 1px 10px rgba(154,162,160,.3);
}
  .num {
    font-size: 20px;
    color: @primary-color;
    font-family: Calibri,serif
  }
</style>
