<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="$router.push('/article/create')">新建</a-button>
        <a-dropdown v-show="selectedRowKeys.length > 0">
          <a-menu slot="overlay">
            <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
            <!-- lock | unlock -->
            <!--            <a-menu-item key="2"><a-icon type="lock" />锁定</a-menu-item>-->
          </a-menu>
          <a-button style="margin-left: 8px">
            批量操作 <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </div>

      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        :alert="false"
        showPagination="auto"
      >
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="description" slot-scope="text">
          <ellipsis :length="50" tooltip>{{ text }}</ellipsis>
        </span>

        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <a @click="handleDelete(record)">删除</a>
          </template>
        </span>
      </s-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import { STable, Ellipsis } from '@/components'
  import StepByStepModal from '../list/modules/StepByStepModal'
  import CreateForm from '../list/modules/CreateForm'
  import { fetchArticleList, fetchDeleteArticle } from '@/api/article'

  const columns = [
    {
      title: 'id',
      dataIndex: 'id'
    },
    {
      title: '文章标题',
      dataIndex: 'title'
    },
    {
      title: '类型',
      dataIndex: 'classify'
    },
    {
      title: '描述',
      dataIndex: 'description',
      scopedSlots: { customRender: 'description' }
    },
    {
      title: '发布时间',
      dataIndex: 'createTime',
      customRender: text => text
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: '150px',
      scopedSlots: { customRender: 'action' }
    }
  ]

  export default {
    name: 'TableList',
    components: {
      STable,
      Ellipsis,
      CreateForm,
      StepByStepModal
    },
    data () {
      this.columns = columns
      return {
        // 查询参数
        queryParam: {},
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          const requestParameters = Object.assign({}, parameter, this.queryParam)
          return fetchArticleList(requestParameters)
            .then(res => {
              return res.result
            })
        },
        selectedRowKeys: [],
        selectedRows: []
      }
    },
    created () {},
    computed: {
      rowSelection () {
        return {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      }
    },
    methods: {
      onSelectChange (selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      },
      // 编辑
      handleEdit (record) {
        this.$router.push({ path: `/article/edit/${record.id}` })
      },
      // 删除
      handleDelete (record) {
        const that = this
        this.$confirm({
          title: '确定要删除吗?',
          content: '一旦删除，不可恢复',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk () {
            fetchDeleteArticle({ id: record.id }).then(() => {
              that.$message.success('删除成功')
              that.$refs.table.refresh()
            })
          }
        })
      }
    }
  }
</script>
