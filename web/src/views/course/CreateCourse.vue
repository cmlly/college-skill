<template>
  <page-header-wrapper>
    <a-card class="card" title="基本信息" :bordered="false">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-row class="form-row" :gutter="16">
          <a-col :lg="8" :md="12" :sm="24">
            <a-form-model-item ref="title" label="课程标题" prop="title">
              <a-input
                v-model="form.title"
                @blur="
                  () => {
                    $refs.title.onFieldBlur();
                  }
                "
              />
            </a-form-model-item>
          </a-col>
          <a-col :lg="8" :md="12" :sm="24">
            <a-form-model-item label="课程分类" prop="classify">
              <a-select v-model="form.classify" placeholder="请选择文章分类">
                <a-select-option v-for="(item, index) of classifyOptions" :key="index" :value="item.name">
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :lg="8" :md="12" :sm="24">
            <a-form-model-item ref="description" label="课程摘要" prop="description">
              <a-input
                v-model="form.description"
                @blur="
                  () => {
                    $refs.description.onFieldBlur();
                  }
                "
              />
            </a-form-model-item>
          </a-col>
          <a-col :lg="8" :md="12" :sm="24">
            <a-form-model-item ref="detail" label="课程详情" prop="detail">
              <a-textarea
                auto-size
                v-model="form.detail"
                @blur="
                  () => {
                    $refs.detail.onFieldBlur();
                  }
                "
              />
            </a-form-model-item>
          </a-col>
          <a-col :lg="8" :md="12" :sm="24">
            <a-form-model-item ref="createBy" label="课程讲师" prop="createBy">
              <a-input
                v-model="form.createBy"
                @blur="
                  () => {
                    $refs.createBy.onFieldBlur();
                  }
                "
              />
            </a-form-model-item>
          </a-col>
          <a-col :lg="8" :md="12" :sm="24">
            <a-form-model-item ref="learnNum" label="学习人数" prop="learnNum">
              <a-input
                type="number"
                v-model="form.learnNum"
                @blur="
                  () => {
                    $refs.learnNum.onFieldBlur();
                  }
                "
              />
            </a-form-model-item>
          </a-col>
          <a-col :lg="8" :md="12" :sm="24">
            <a-form-model-item label="文章封面" prop="cover">
              <a-upload
                name="pic"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                action="http://localhost:3000/api/public/uploadPic"
                :before-upload="beforeUpload"
                @change="handleChangeUpload"
                style="width: 341px;height: 170px"
              >
                <img style="width: 341px;height: 170px" v-if="form.cover" :src="form.cover" alt="avatar" />
                <div v-else>
                  <a-icon :type="loading ? 'loading' : 'plus'" />
                  <div class="ant-upload-text">
                    点击上传
                  </div>
                </div>
              </a-upload>
            </a-form-model-item>
          </a-col>
        </a-row>
        <!--        <a-form-model-item label="文章内容" prop="content">-->
        <!--          <wang-editor :value="form.content" @change="getContent"></wang-editor>-->
        <!--        </a-form-model-item>-->
        <!--        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">-->
        <!--          <a-button type="primary" @click="onSubmit">-->
        <!--            提交-->
        <!--          </a-button>-->
        <!--          <a-button style="margin-left: 10px;" @click="resetForm">-->
        <!--            重置-->
        <!--          </a-button>-->
        <!--        </a-form-model-item>-->
      </a-form-model>
    </a-card>

    <!-- table -->
    <a-card :bordered="false" title="课程目录详情">
      <a-table
        :columns="columns"
        :dataSource="data"
        :pagination="false"
        :loading="memberLoading"
      >
        <template v-for="(col, i) in ['name', 'workId', 'department']" :slot="col" slot-scope="text, record">
          <a-input
            :key="col"
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            :placeholder="columns[i].title"
            @change="e => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>{{ text }}</template>
        </template>
        <template slot="operation" slot-scope="text, record">
          <template v-if="record.editable">
            <span v-if="record.isNew">
              <a @click="saveRow(record)">添加</a>
              <a-divider type="vertical" />
              <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key)">
                <a>删除</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="saveRow(record)">保存</a>
              <a-divider type="vertical" />
              <a @click="cancel(record.key)">取消</a>
            </span>
          </template>
          <span v-else>
            <a @click="toggle(record.key)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key)">
              <a>删除</a>
            </a-popconfirm>
          </span>
        </template>
      </a-table>
      <a-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus" @click="newMember">新增目录</a-button>
    </a-card>

    <!-- fixed footer toolbar -->
    <footer-tool-bar :is-mobile="isMobile" :collapsed="sideCollapsed">
      <span class="popover-wrapper">
        <a-popover title="表单校验信息" overlayClassName="antd-pro-pages-forms-style-errorPopover" trigger="click" :getPopupContainer="trigger => trigger.parentNode">
          <template slot="content">
            <li v-for="item in errors" :key="item.key" @click="scrollToField(item.key)" class="antd-pro-pages-forms-style-errorListItem">
              <a-icon type="cross-circle-o" class="antd-pro-pages-forms-style-errorIcon" />
              <div class="">{{ item.message }}</div>
              <div class="antd-pro-pages-forms-style-errorField">{{ item.fieldLabel }}</div>
            </li>
          </template>
          <span class="antd-pro-pages-forms-style-errorIcon" v-if="errors.length > 0">
            <a-icon type="exclamation-circle" />{{ errors.length }}
          </span>
        </a-popover>
      </span>
      <a-button type="primary" @click="validate" :loading="loading">提交</a-button>
    </footer-tool-bar>
  </page-header-wrapper>
</template>

<script>
  // import RepositoryForm from '../form/advancedForm/RepositoryForm'
  // import TaskForm from '../form/advancedForm/TaskForm'
  import FooterToolBar from '@/components/FooterToolbar'
  import { baseMixin } from '@/store/app-mixin'
  // import WangEditor from '@/components/Editor/WangEditor'
  import { fetchCreateArticle } from '@/api/article'
  import { fetchCourseClassify } from '@/api/course'

  function getBase64 (img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  export default {
    name: 'CreateCourse',
    mixins: [baseMixin],
    components: {
      FooterToolBar
    },
    data () {
      return {
        loading: false,
        memberLoading: false,
        // table
        columns: [
          {
            title: '成员姓名',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            scopedSlots: { customRender: 'name' }
          },
          {
            title: '工号',
            dataIndex: 'workId',
            key: 'workId',
            width: '20%',
            scopedSlots: { customRender: 'workId' }
          },
          {
            title: '所属部门',
            dataIndex: 'department',
            key: 'department',
            width: '40%',
            scopedSlots: { customRender: 'department' }
          },
          {
            title: '操作',
            key: 'action',
            scopedSlots: { customRender: 'operation' }
          }
        ],
        data: [
          {
            key: '1',
            name: '小明',
            workId: '001',
            editable: false,
            department: '行政部'
          },
          {
            key: '2',
            name: '李莉',
            workId: '002',
            editable: false,
            department: 'IT部'
          },
          {
            key: '3',
            name: '王小帅',
            workId: '003',
            editable: false,
            department: '财务部'
          }
        ],
        errors: [],
        form: {
          title: '',
          classify: '',
          description: '',
          content: '',
          cover: ''
        },
        rules: {
          title: [{ required: true, message: '请输入课程标题', trigger: 'blur' }],
          classify: [{ required: true, message: '请选择课程类型', trigger: 'change' }],
          description: [{ required: true, message: '请输入课程摘要', trigger: 'blur' }],
          detail: [{ required: true, message: '请输入课程详情介绍', trigger: 'blur' }],
          createBy: [{ required: true, message: '请输入课程讲师', trigger: 'blur' }],
          learnNum: [{ required: true, message: '请输入课程学习人数', trigger: 'blur' }],
          cover: [{ required: true, message: '请上传文章封面', trigger: 'blur' }]
        },
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
        classifyOptions: []
      }
    },
    created () {
      this.getClassify()
    },
    methods: {
      handleSubmit (e) {
        e.preventDefault()
      },
      newMember () {
        const length = this.data.length
        this.data.push({
          key: length === 0 ? '1' : (parseInt(this.data[length - 1].key) + 1).toString(),
          name: '',
          workId: '',
          department: '',
          editable: true,
          isNew: true
        })
      },
      remove (key) {
        const newData = this.data.filter(item => item.key !== key)
        this.data = newData
      },
      saveRow (record) {
        this.memberLoading = true
        const { key, name, workId, department } = record
        if (!name || !workId || !department) {
          this.memberLoading = false
          this.$message.error('请填写完整成员信息。')
          return
        }
        // 模拟网络请求、卡顿 800ms
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({ loop: false })
          }, 800)
        }).then(() => {
          const target = this.data.find(item => item.key === key)
          target.editable = false
          target.isNew = false
          this.memberLoading = false
          console.log(this.data)
        })
      },
      toggle (key) {
        const target = this.data.find(item => item.key === key)
        target._originalData = { ...target }
        target.editable = !target.editable
      },
      getRowByKey (key, newData) {
        const data = this.data
        return (newData || data).find(item => item.key === key)
      },
      cancel (key) {
        const target = this.data.find(item => item.key === key)
        Object.keys(target).forEach(key => { target[key] = target._originalData[key] })
        target._originalData = undefined
      },
      handleChange (value, key, column) {
        const newData = [...this.data]
        const target = newData.find(item => key === item.key)
        if (target) {
          target[column] = value
          this.data = newData
        }
      },

      // 最终全页面提交
      validate () {
        const { $refs: { repository, task }, $notification } = this
        const repositoryForm = new Promise((resolve, reject) => {
          repository.form.validateFields((err, values) => {
            if (err) {
              reject(err)
              return
            }
            resolve(values)
          })
        })
        const taskForm = new Promise((resolve, reject) => {
          task.form.validateFields((err, values) => {
            if (err) {
              reject(err)
              return
            }
            resolve(values)
          })
        })

        // clean this.errors
        this.errors = []
        Promise.all([repositoryForm, taskForm]).then(values => {
          $notification['error']({
            message: 'Received values of form:',
            description: JSON.stringify(values)
          })
        }).catch(() => {
          const errors = Object.assign({}, repository.form.getFieldsError(), task.form.getFieldsError())
          const tmp = { ...errors }
          this.errorList(tmp)
        })
      },
      scrollToField (fieldKey) {
        const labelNode = document.querySelector(`label[for="${fieldKey}"]`)
        if (labelNode) {
          labelNode.scrollIntoView(true)
        }
      },

      handleChangeUpload (info) {
        if (info.file.status === 'uploading') {
          this.loading = true
          return
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl => {
            this.form.cover = imageUrl
            this.loading = false
          })
        }
      },
      beforeUpload (file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
        if (!isJpgOrPng) {
          this.$message.error('You can only upload JPG file!')
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          this.$message.error('Image must smaller than 2MB!')
        }
        return isJpgOrPng && isLt2M
      },
      async getClassify () {
        const res = await fetchCourseClassify()
        this.classifyOptions = res.result.classify
      },
      onSubmit () {
        this.$refs.ruleForm.validate(async valid => {
          if (valid) {
            await fetchCreateArticle(this.form)
            this.$message.success('新增成功')
            await this.$router.push('/article/list')
            this.form = {}
          } else {
            this.$message.error('新增失败')
            return false
          }
        })
      },
      resetForm () {
        this.$refs.ruleForm.resetFields()
      }
    }
  }
</script>

<style lang="less" scoped>
  .card{
    margin-bottom: 24px;
  }
  .popover-wrapper {
    /deep/ .antd-pro-pages-forms-style-errorPopover .ant-popover-inner-content {
      min-width: 256px;
      max-height: 290px;
      padding: 0;
      overflow: auto;
    }
  }
  .antd-pro-pages-forms-style-errorIcon {
    user-select: none;
    margin-right: 24px;
    color: #f5222d;
    cursor: pointer;
    i {
      margin-right: 4px;
    }
  }
  .antd-pro-pages-forms-style-errorListItem {
    padding: 8px 16px;
    list-style: none;
    border-bottom: 1px solid #e8e8e8;
    cursor: pointer;
    transition: all .3s;

    &:hover {
      background: #e6f7ff;
    }
    .antd-pro-pages-forms-style-errorIcon {
      float: left;
      margin-top: 4px;
      margin-right: 12px;
      padding-bottom: 22px;
      color: #f5222d;
    }
    .antd-pro-pages-forms-style-errorField {
      margin-top: 2px;
      color: rgba(0,0,0,.45);
      font-size: 12px;
    }
  }
</style>
<style scoped>
  .avatar-uploader >>> .ant-upload {
    width: 341px;
    height: 170px;
  }
  .ant-upload.ant-upload-select-picture-card {
    width: 341px;
    height: 170px;
  }
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
