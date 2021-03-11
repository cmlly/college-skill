<template>
  <div>
    <a-row :gutter="[8, 8]">
      <a-col :span="8" v-for="(item, index) of list" :key="index">
        <a-card hoverable :bordered="false" @click="$router.push('/user/login/newsDetail/'+ item.id)">
          <img
            style="width: 100%;height: 150px"
            slot="cover"
            alt="example"
            :src="item.cover"
          />
          <a-card-meta :title="item.title">
            <template slot="description">
              <ellipsis :length="30" :tooltip="true">{{ item.description }}</ellipsis>
            </template>
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>
    <a-button
      v-if="pageInfo.pageNo < pageInfo.lastPageNo"
      style="margin-top: 10px"
      type="primary"
      block
      @click="loadMore(pageInfo.pageNo + 1)"
    ><a-icon type="down-circle" />查看更多</a-button>
  </div>
</template>

<script>
  import { fetchArticleList } from '@/api/article'
  import Ellipsis from '@/components/Ellipsis/Ellipsis'

  export default {
    name: 'NewsCards',
    components: { Ellipsis },
    data () {
      return {
        list: [],
        pageInfo: {}
      }
    },
    created () {
      this.getNewsList()
    },
    methods: {
      async getNewsList () {
        const res = await fetchArticleList({ pageIndex: 1, pageSize: 9 })
        this.list = res.result.data
        this.pageInfo = res.result
      },
      async loadMore (page) {
        const res = await fetchArticleList({ pageIndex: page, pageSize: 9 })
        for (const el of res.result.data) {
          this.list.push(el)
        }
        this.pageInfo = res.result
      }
    }
  }
</script>

<style scoped>

</style>
