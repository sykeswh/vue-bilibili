<template>
  <div class="loginForm">
    <!-- 
      readonly:只读状态
      clickable：是否开启点击反馈
    -->
    <van-form @submit="onSubmit">
      <van-field
        readonly
        clickable
        name="country"
        :value="text"
        placeholder="点击选择国家"
        @click="showPicker = true"
        right-icon="arrow"
        style="margin:4.167vw 0"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <van-field
        v-model="phone"
        clearable
        name="phone"
        :label="area"
        placeholder="请输入常用手机号"
        style="border-bottom:none"
      >
        <template #button>
          <van-button size="small" color="#fb7299" plain @click.prevent="getCode">
            {{computeTime>0 ? `已发送${computeTime}秒` : '获取验证码'}}
          </van-button>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="code"
        name="code"
        label="验证码"
        placeholder="请输入验证码"
        style="border-top: 1px solid #e7e7e7"
      />
      <van-field
        v-model="pwd"
        type="password"
        name="pwd"
        label="密码"
        placeholder="6~16个字符，区分大小写"
        style="margin:4.167vw 0"
        v-show="showPwd==='完成注册'"
      />
      <slot name="loginButton"></slot>
    </van-form>
    <p>{{showPwd}}即代表你同意
      <a href="https://www.bilibili.com/blackboard/account-useragreement.html">用户协议</a>和
      <a href="https://www.bilibili.com/blackboard/privacy-h5.html">隐私协议</a>
    </p>
  </div>
</template>

<script>
import columns from '../../assets/columns'
import {reqSendCode,reqSendLoginCode} from '../../api'
import {Toast} from 'vant'
export default {
  props:{
    showPwd:String
  },
  data() {
    return {
      phone:'',//手机号
      code:'',//验证码
      computeTime:0,
      text: '中国大陆',
      area:'+86',//区号
      columns: columns,
      showPicker: false,
      pwd:'',//密码
    }
  },
  methods: {
    onConfirm(value) {
      this.text = value.text
      this.area = value.area
      this.showPicker = false
    },
    //异步注册/登录
    onSubmit(values) {
      const {phone,code,pwd} = values
      if(!(/^1[2|3|4|5|6|7|8|9][0-9]{9}$/.test(phone))){
        Toast('手机号格式错误');
        return
      }else if (code.length<6) {
        Toast('验证码格式错误');
        return
      }else if(this.showPwd === '完成注册' && !(/^[0-9a-zA-Z]{6,16}$/.test(pwd))){
        Toast('密码格式错误');
        return
      }else if(this.showPwd === '完成注册'){
        this.$store.dispatch('getRegister',{phone,code,pwd})
      }else{
        this.$store.dispatch('getSmsLogin',{phone,code})
      }
    },
    //发送验证码
    async getCode(){
      const {phone} = this
      if (!phone) {
        Toast('手机号不能为空哦');
      }else if (!(/^1[3456789]\d{9}$/.test(phone))) {
        Toast('手机号格式错误');
      }else{
        if (this.computeTime===0) {
          this.computeTime = 30
          this.intervalId = setInterval(() => {
            this.computeTime--
            if (this.computeTime<=0) {
              clearInterval(this.intervalId)
            }
          }, 1000);
          let result
          if (this.showPwd === '完成注册') {
            result = await reqSendCode(this.phone)
          }else{
            result = await reqSendLoginCode(this.phone)
          }
          if (result.code===1) {
            Toast(result.msg)
            if (this.computeTime) {
              this.computeTime = 0
              clearInterval(this.intervalId)
              this.intervalId = undefined
            }
          }
        }
      }
    },
  },
}
</script>

<style lang="less">
  .loginForm{
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