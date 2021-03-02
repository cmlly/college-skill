<template>
  <div>
    <div class="link-btn" @click="visible = true">
      登录
    </div>
    <a-modal v-model="visible" title="登录" @ok="login" :confirm-loading="confirmLoading">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item ref="email" label="电子邮箱" prop="email">
          <a-input
            v-model="form.email"
            type="email"
            @blur="
              () => {
                $refs.email.onFieldBlur();
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item ref="password" label="密码" prop="password">
          <a-input
            v-model="form.password"
            type="password"
            @blur="
              () => {
                $refs.password.onFieldBlur();
              }
            "
          />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'LoginModal',
    data () {
      return {
        visible: false,
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
        form: {
          password: '',
          email: ''
        },
        rules: {
          email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
        },
        confirmLoading: false
      }
    },
    methods: {
      ...mapActions(['Login', 'Logout', 'GetInfo']),
      login () {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            this.confirmLoading = true
            this.Login(this.form)
              .then(() => {
                this.$message.success('登录成功')
                this.GetInfo()
                this.visible = false
                this.confirmLoading = false
              })
              .catch(() => {
                this.confirmLoading = false
              })
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .link-btn{
    cursor: pointer;
    &:hover{
      color: #722ED1;
    }
  }
</style>
