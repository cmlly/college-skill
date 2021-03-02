<template>
  <div style="background: #ffffff;padding: 20px">
    <div style="padding-left: 15vw">
      <a-tabs default-active-key="1" tab-position="left">
        <a-tab-pane key="1" tab="基本信息">
          <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-model-item label="头像">
              <img :src="user.avatar" alt="" style="width: 100px">
            </a-form-model-item>
            <a-form-model-item label="邮箱">
              <a-input v-model="user.info.email" disabled/>
            </a-form-model-item>
            <a-form-model-item label="真实姓名">
              <a-input v-model="user.name" disabled/>
            </a-form-model-item>
          </a-form-model>
        </a-tab-pane>
        <a-tab-pane key="3" tab="进入后台管理系统" v-if="user.info.roleId === 'admin'">
          <div>
            您是{{ user.name }},拥有进入后台的权限
          </div>
          <div>
            点击<router-link to="/dashboard/workplace">这里</router-link>进入后台管理
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'PersonCenter',
    data () {
      return {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    },
    computed: {
      ...mapState(['user'])
    }
  }
</script>

<style scoped>

</style>
