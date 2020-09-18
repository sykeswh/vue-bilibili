<template>
  <van-nav-bar left-text="返回" class="NavBar">
    <template #left>
      <router-link to="/" class="logo">
        <i class="iconfont icon-Navbar_logo"></i>
      </router-link>
    </template>
    <template #right>
      <router-link to="/search" class="search">
        <i class="iconfont icon-ic_search"></i>
      </router-link>
      <router-link :to="user._id ? '/userinfo' : '/login'" class="face">
        <img :src="user.header ? user.header : '../../assets/bilibili.jpg'" alt="" v-if="user._id">
        <img src="../../assets/akari.jpg" alt="" v-else>
      </router-link>
      <router-link to="/download_app">
        <button class="openapp">下载App</button>
      </router-link>
    </template>
  </van-nav-bar>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState(['user'])
  },
}
</script>

<style lang="less">
  .NavBar{
    line-height: 11.73333vw;
    height: 11.73333vw;
    .logo{
      i{
        color: #fb7299;
        vertical-align: middle;
        font-size: 7.46667vw;
      }
    }
    .search{
      margin-right: 5.86667vw;
      width: 5.86667vw;
      height: 5.86667vw;
      margin-bottom: 5.556vw;
      i{
        color:#ccc;
        font-size: 5.86667vw;
      }
    }
    .face{
      width: 6.4vw;
      height: 6.4vw;
      display: inline-block;
      margin-bottom: 0.66667vw;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .openapp{
      margin-left: 3.2vw;
      width: 21.33333vw;
      height: 8.4vw;
      background: #fb7299;
      border: none;
      border-radius: 0.53333vw;
      color: #fff;
      font-size: 3.46667vw;
      line-height: 3.056vw;
    }
  }
</style>