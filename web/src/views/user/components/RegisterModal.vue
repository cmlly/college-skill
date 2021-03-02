<template>
  <div>
    <div class="link-btn" @click="visible = true">
      注册
    </div>
    <a-modal v-model="visible" title="注册" @ok="onSubmit" :confirm-loading="confirmLoading">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item ref="name" label="真实姓名" prop="name">
          <a-input
            v-model="form.name"
            @blur="
              () => {
                $refs.name.onFieldBlur();
              }
            "
          />
        </a-form-model-item>
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
        <a-form-model-item ref="repassword" label="确认密码" prop="repassword">
          <a-input
            v-model="form.repassword"
            type="password"
            @blur="
              () => {
                $refs.repassword.onFieldBlur();
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item ref="code" label="验证码" prop="code">
          <a-row :gutter="16">
            <a-col :span="16">
              <a-input
                v-model="form.code"
                type="number"
                @blur="
                  () => {
                    $refs.code.onFieldBlur();
                  }
                "
              />
            </a-col>
            <a-col :span="8">
              <a-button :disabled="state" @click="getEmailCode" type="primary">{{ btnText }}</a-button>
            </a-col>
          </a-row>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
  import { fetchEmailCode, fetchRegister } from '@/api/login'

  export default {
    name: 'Register',
    data () {
      return {
        visible: false,
        state: false,
        btnText: '发送验证码',
        time: 5,
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
        form: {
          name: '',
          password: '',
          repassword: '',
          email: '',
          code: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入您的真实姓名', trigger: 'blur' },
            { min: 2, max: 5, message: '请输入有效的姓名', trigger: 'blur' }
          ],
          email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
          repassword: [{ required: true, message: '请再次输入密码', trigger: 'blur' }],
          code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
        },
        confirmLoading: false
      }
    },
    methods: {
      onSubmit () {
        this.$refs.ruleForm.validate(async (valid) => {
          if (valid) {
            this.confirmLoading = true
            setTimeout(() => {
              this.confirmLoading = false
            }, 5000)
            await fetchRegister(this.form)
            this.$message.success('注册成功')
            this.visible = false
            this.form = {}
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 获取验证码
      async getEmailCode () {
        if (this.form.email) {
          this.time = 5
          this.timer()
          const res = await fetchEmailCode({ email: this.form.email })
          this.$message.success(res.msg)
        } else {
          this.$message.warning('请输入电子邮箱')
        }
      },
      // 倒计时
      timer () {
        if (this.time > 0) {
          this.state = true
          this.time--
          this.btnText = this.time + '秒后再次发送'
          setTimeout(this.timer, 1000)
        } else {
          this.time = 0
          this.btnText = '发送验证码'
          this.state = false
        }
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
