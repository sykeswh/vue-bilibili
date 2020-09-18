<template>
  <div class="login">
    <LoginTop title="登录bilibili" class="logintop">
      <div slot="left"></div>
      <div slot="right" class="right" @click="showLogin = !showLogin">{{showLogin ? '密码登录' : '短信登录'}}</div>
    </LoginTop>
    <LoginForm showPwd="登录" v-if="showLogin">
      <div class="loginbutton" slot="loginButton">
        <van-button type="info" color="#ff9db5" block native-type="submit">验证登录</van-button>
      </div>
    </LoginForm>
    <van-form @submit="onSubmit" v-else>
      <van-field
        v-model="account"
        clearable
        type="text"
        name="account"
        label="账号"
        placeholder="你的手机号/邮箱"
        style="margin:4.167vw 0"
      />
      <van-field
        v-model="pwd"
        clearable
        type="password"
        name="pwd"
        label="密码"
        placeholder="请输入密码"
        style="margin:4.167vw 0"
      />
      <div class="login-button">
        <router-link to="/register">
          <van-button type="info" color="#ff9db5" plain>注册</van-button>
        </router-link>
        <van-button type="info" color="#ff9db5" native-type="submit">登录</van-button>
      </div>
      <p>登录即代表你同意
        <a href="https://www.bilibili.com/blackboard/account-useragreement.html">用户协议</a>和
        <a href="https://www.bilibili.com/blackboard/privacy-h5.html">隐私协议</a>
      </p>
    </van-form>
  </div>
</template>

<script>
import LoginTop from '../../components/common/LoginTop.vue'
import LoginForm from '../../components/common/LoginForm.vue'
import {mapState} from 'vuex'
export default {
  components:{
    LoginTop,
    LoginForm
  },
  mounted() {
    if (this.user._id) {
      this.$router.push('/userinfo')
    }
  },
  computed: {
    ...mapState(['user'])
  },
  data() {
    return {
      showLogin:true,
      account:'',//账号
      pwd:'',
    }
  },
  methods: {
    onSubmit(values){
      const {account,pwd} = values
      if (account!=='' || pwd!=='') {
        this.$store.dispatch('getPwdLogin',{account,pwd})
      }
      
    }
  },
}
</script>

<style lang="less">
  .login{
    .logintop{
      .right{
        font-size: 3.333vw;
      }
    }
    .loginbutton{
      margin: 12px 10px 0 10px;
    }
    .login-button{
      text-align: center;
      button{
        display: inline-block;
        width: 44.444vw;
        &:first-child{
          margin-right:4.167vw;
          background-color: #f4f4f4;
        }
      }
    }
    p{
      text-align: center;
      font-size: 13px;
      margin-top: 20px;
      color: #757575;
      a{
        color:#fb7299;
      }
    }
  }
</style>