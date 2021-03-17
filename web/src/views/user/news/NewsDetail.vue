<template>
  <div>
    <a-card :bordered="false">
      <a-button type="dashed" @click="$router.go(-1)"><a-icon type="left" />返回上一页</a-button>
      <h2 style="margin-bottom: 30px;text-align: center">{{ detail.title }}</h2>
      <div class="flex justify-between" style="margin-bottom: 30px">
        <div class="text-primary">{{ detail.createBy }}</div>
        <div>{{ detail.createTime }}</div>
      </div>
      <div v-html="detail.content"></div>
    </a-card>
  </div>
</template>

<script>
  import { fetchArticleDetail } from '@/api/article'

  export default {
    name: 'NewsDetail',
    data () {
      return {
        detail: {}
      }
    },
    created () {
      this.getDetail()
    },
    methods: {
      async getDetail () {
        const res = await fetchArticleDetail({ id: this.$route.params.id })
        this.detail = res.result
      }
    }

  }
</script>

<style scoped>

</style>
