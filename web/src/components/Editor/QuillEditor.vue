<template>
  <div :class="prefixCls">
    <quill-editor
      class="editor-quill"
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      @change="onEditorChange($event)">
    </quill-editor>

  </div>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  import { quillEditor } from 'vue-quill-editor'

  export default {
    name: 'QuillEditor',
    components: {
      quillEditor
    },
    props: {
      prefixCls: {
        type: String,
        default: 'ant-editor-quill'
      },
      // 表单校验用字段
      // eslint-disable-next-line
      value: {
        type: String
      }
    },
    data () {
      return {
        content: null,
        editorOption: {
          // some quill options
          placeholder: '请输入文章内容',
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
              ['blockquote', 'code-block'], // 引用，代码块
              [{ 'header': 1 }, { 'header': 2 }], // 标题，键值对的形式；1、2表示字体大小
              [{ 'list': 'ordered' }, { 'list': 'bullet' }], // 列表
              [{ 'script': 'sub' }, { 'script': 'super' }], // 上下标
              [{ 'indent': '-1' }, { 'indent': '+1' }], // 缩进
              [{ 'direction': 'rtl' }], // 文本方向
              [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // 几级标题
              [{ 'color': [] }, { 'background': [] }], // 字体颜色，字体背景颜色
              [{ 'font': [] }], // 字体
              [{ 'align': [] }], // 对齐方式
              ['clean'], // 清除字体样式
              ['image', 'video'] // 上传图片、上传视频
            ]
          }
        }
      }
    },
    created () {
      this.content = this.value
    },
    methods: {
      onEditorBlur (quill) {
        // console.log('editor blur!', quill)
      },
      onEditorFocus (quill) {
        // console.log('editor focus!', quill)
      },
      onEditorReady (quill) {
        // console.log('editor ready!', quill)
      },
      onEditorChange ({ quill, html, text }) {
        // console.log('editor change!', quill, html, text)
        this.$emit('change', html)
      }
    },
    watch: {
      value (val) {
        this.content = val
      }
    }
  }
</script>

<style lang="less" scoped>
  @import url('../index.less');
  /* 覆盖 quill 默认边框圆角为 ant 默认圆角，用于统一 ant 组件风格 */
  .ant-editor-quill {
    line-height: initial;
    /deep/ .ql-toolbar.ql-snow {
      border-radius: @border-radius-base @border-radius-base 0 0;
    }
    /deep/ .ql-container.ql-snow {
      border-radius: 0 0 @border-radius-base @border-radius-base;
    }
  }
  .editor-quill /deep/ .ql-editor {
    height: 300px;
  }
</style>
