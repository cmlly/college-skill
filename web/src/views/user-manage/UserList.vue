<template>
  <page-header-wrapper>
    <a-card :bordered="false">
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
      </s-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import { STable, Ellipsis } from '@/components'
  import StepByStepModal from '../list/modules/StepByStepModal'
  import CreateForm from '../list/modules/CreateForm'
  import { fetchDeleteArticle } from '@/api/article'
  import { fetchUserList } from '@/api/user'

  const columns = [
    {
      title: 'id',
      dataIndex: 'id'
    },
    {
      title: '用户名',
      dataIndex: 'username'
    },
    {
      title: '名字',
      dataIndex: 'name'
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      scopedSlots: { customRender: 'description' }
    },
    {
      title: '角色',
      dataIndex: 'role_id',
      customRender: text => text
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
          return fetchUserList(requestParameters)
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
