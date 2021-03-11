<template>
  <div>
    <header style="position: fixed;z-index: 10;width: 100%;">
      <div class="flex items-center">
        <img style="width: 40px;margin-right: 10px" src="@/assets/logo.png" alt="">
        <div style="font-size: 22px">大学生技能培训</div>
      </div>
      <div class="flex items-center">
        <a-menu v-model="current" mode="horizontal">
          <a-menu-item key="course">
            <router-link to="/user/login/course">课程</router-link>
          </a-menu-item>
          <a-menu-item key="learn">
            <router-link to="/user/login/learn">学习</router-link>
          </a-menu-item>
          <a-menu-item key="news">
            <router-link to="/user/login/news">新闻动态</router-link>
          </a-menu-item>
        </a-menu>
        <div style="margin-left: 80px" class="flex items-center" v-if="!user.isLogin">
          <login-modal></login-modal>
          <a-divider type="vertical" />
          <register-modal></register-modal>
          <img style="width: 40px;margin-left: 20px" src="@/assets/course/primary-avatar.png" alt="">
        </div>
        <div style="margin-left: 80px" v-if="user.isLogin">
          <a-dropdown>
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              {{ user.name }} <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <router-link to="/user/login/personCenter" >个人中心</router-link>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;" @click="logout">退出登录</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <img style="width: 40px;margin-left: 20px" :src="user.avatar" alt="">
        </div>
      </div>
    </header>
    <div style="padding: 113px 15vw 25px">
      <router-view></router-view>
    </div>
    <footer-section style="padding: 30px 15vw"></footer-section>
  </div>
</template>

<script>
  import RegisterModal from '@/views/user/components/RegisterModal'
  import LoginModal from '@/views/user/components/LoginModal'
  import { mapState, mapActions } from 'vuex'
  import FooterSection from '@/views/user/components/FooterSection'
  export default {
    name: 'HeaderSection',
    components: {
      FooterSection,
      LoginModal,
      RegisterModal
    },
    computed: {
      ...mapState(['user'])
    },
    data () {
      return {
        current: ['course']
      }
    },
    created () {
      this.current = [ this.$route.name ]
      if (localStorage.getItem('isLogin')) {
        this.user.isLogin = true
      }
    },
    methods: {
      ...mapActions(['Logout']),
      logout () {
        this.Logout()
      }
    }
  }
</script>

<style scoped lang="less">
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
    padding: 20px 15vw;
  }
  .link-btn{
    cursor: pointer;
    &:hover{
        color: #722ED1;
    }
  }
</style>
