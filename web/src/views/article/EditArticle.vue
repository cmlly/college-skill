<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <a-button @click="$router.go(-1)" type="dashed"><a-icon type="left" />返回</a-button>
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item ref="title" label="文章标题" prop="title">
          <a-input
            v-model="form.title"
            @blur="
              () => {
                $refs.title.onFieldBlur();
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item label="文章分类" prop="classify">
          <a-select v-model="form.classify" placeholder="请选择文章分类">
            <a-select-option v-for="(item, index) of classifyOptions" :key="index" :value="item.name">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item ref="description" label="文章摘要" prop="description">
          <a-input
            v-model="form.description"
            @blur="
              () => {
                $refs.description.onFieldBlur();
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item label="文章内容" prop="content">
          <!--          <wang-editor :value="form.content" @change="getContent"></wang-editor>-->
          <quill-editor :value="form.content" @change="getContent"></quill-editor>
        </a-form-model-item>
        <a-form-model-item label="文章封面" prop="cover">
          <a-upload
            name="pic"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            action="http://localhost:3000/api/public/uploadPic"
            :before-upload="beforeUpload"
            @change="handleChange"
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
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">
            提交
          </a-button>
          <a-button style="margin-left: 10px;" @click="resetForm">
            重置
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import { fetchArticleClassify, fetchArticleDetail, fetchEditArticle } from '@/api/article'
  import WangEditor from '@/components/Editor/WangEditor'
  import QuillEditor from '@/components/Editor/QuillEditor'
  function getBase64 (img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }
  export default {
    name: 'EditArticle',
    components: { WangEditor, QuillEditor },
    data () {
      return {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
        classifyOptions: [],
        loading: false,
        form: {
          title: '',
          classify: '',
          description: '',
          content: '',
          cover: ''
        },
        rules: {
          title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
          classify: [{ required: true, message: '请选择文章类型', trigger: 'change' }],
          description: [{ required: true, message: '请输入文章摘要', trigger: 'blur' }],
          content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }],
          cover: [{ required: true, message: '请上传文章封面', trigger: 'blur' }]
        }
      }
    },
    created () {
      this.getClassify()
      this.getArticleDetail()
    },
    methods: {
      // 获取表单信息回显数据
      async getArticleDetail () {
        const res = await fetchArticleDetail({ id: this.$route.params.id })
        this.form = res.result
      },
      handleChange (info) {
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
      getContent (val) {
        this.form.content = val
      },
      async getClassify () {
        const res = await fetchArticleClassify()
        this.classifyOptions = res.result.classify
      },
       onSubmit () {
        this.$refs.ruleForm.validate(async valid => {
          if (valid) {
            await fetchEditArticle(this.form)
            this.$message.success('编辑文章成功')
            await this.$router.push('/article/list')
            this.form = {}
          } else {
            this.$message.error('编辑文章失败')
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
