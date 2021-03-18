<template>
  <div>
    <a-card :bordered="false">
      <div style="margin-bottom: 12px">
        <a-button @click="$router.go(-1)" type="dashed">
          <a-icon type="left"></a-icon>
          返回课程内容
        </a-button>
      </div>
    </a-card>
    <a-row :gutter="8" style="margin-top: 8px">
      <a-col :span="6">
        <a-card :bordered="false">
          <h2 style="font-weight: bold;margin-bottom: 20px">目录</h2>
          <a-menu
            style="width: 100%"
            :default-selected-keys="['1']"
            @click="handleClick"
          >
            <a-menu-item v-for="item of detail.content" :key="item.key">
              {{ item.name }} | {{ item.department }}
            </a-menu-item>
          </a-menu>
        </a-card>
      </a-col>
      <a-col :span="18">
        <a-card :bordered="false" class="card-box">
          <h2 style="font-weight: bold;margin-bottom: 30px;text-align: center">{{ currentArticle.department }}</h2>
          <div v-html="currentArticle.content"></div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import { fetchCourseDetail } from '@/api/course'
  import { jsonParse } from '@/utils/util'

  export default {
    name: 'CourseDetail',
    data () {
      return {
        detail: {},
        currentArticle: {}
      }
    },
    created () {
      this.getCourseDetail()
    },
    // watch: {
    //   openKeys (val) {
    //     console.log('openKeys', val)
    //   }
    // },
    methods: {
      async getCourseDetail () {
        const res = await fetchCourseDetail({ id: this.$route.params.id })
        this.detail = res.result
        this.detail.content = jsonParse(res.result.content, 'content')
        this.currentArticle = this.detail.content[0]
      },
      handleClick (e) {
        for (const element of this.detail.content) {
          if (e.key === element.key) {
            this.currentArticle = element
          }
        }
      }
    }
  }
</script>

<style scoped lang="less">
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
.ant-menu-inline, .ant-menu-vertical, .ant-menu-vertical-left{
  border-right: none;
}
  .card-box{
    overflow-y: auto;
    height: 100vh;
  }
/*滚动条样式*/
.card-box::-webkit-scrollbar {
  width: 8px;
  /*height: 4px;*/
}
.card-box::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: rgba(@primary-color);
  }
.card-box::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 0;
  background: rgba(0,0,0,0.1);
  }
</style>
