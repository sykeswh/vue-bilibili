<template>
  <div class="register">
    <LoginTop title="注册bilibili"></LoginTop>
    <LoginForm showPwd="完成注册">
      <div class="login-button" slot="loginButton">
        <router-link to="/login">
          <van-button type="info" color="#ff9db5" plain>登录</van-button>
        </router-link>
        <van-button type="info" color="#ff9db5" native-type="submit">同意并注册</van-button>
      </div>
    </LoginForm>
  </div>
</template>

<script>
import LoginTop from '@/components/common/LoginTop.vue'
import LoginForm from '../../components/common/LoginForm.vue'
import {mapState} from 'vuex'
export default {
  components:{
    LoginTop,
    LoginForm
  },
  computed: {
    ...mapState(['user'])
  },
  mounted() {
    if (this.user._id) {
      this.$router.push('/userinfo')
    }
  },
}
</script>

<style lang="less">
  
</style>