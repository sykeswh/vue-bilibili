<template>
  <div class="search">
    <van-search
      v-model="value"
      show-action
      placeholder="英雄联盟S10"
      @search="onSearch"
      @cancel="onCancel"
    />
    <div class="search-hot">
      <h2 class="title">大家都在搜</h2>
      <div class="list">
        <span class="hotword-item">看门狗2</span>
        <span class="hotword-item">看门狗2</span>
        <span class="hotword-item">看门狗2</span>
        <span class="hotword-item">看门狗2</span>
        <span class="hotword-item">看门狗2</span>
        <span class="hotword-item">看门狗2</span>
      </div>
    </div>
    <div class="search-history">
      <h2 class="title">历史搜索</h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value:''
    }
  },
  methods: {
    onSearch(val) {
      
    },
    onCancel() {
      this.$router.push('/')
    },
  },
}
</script>

<style lang="less">
  .search-hot{
    padding: 4.73333vw 3.2vw 6.66667vw;
    background-color: white;
    .title{
      color: #999;
      font-size: 3.73333vw;
      font-weight: 400;
    }
    .list{
      height: 24.53333vw;
      overflow: hidden;
      .hotword-item{
        display: inline-block;
        font-size: 3.46667vw;
        height: 9.06667vw;
        line-height: 8.8vw;
        padding: 0 3.2vw;
        color: #505050;
        border: 1px solid #ccc;
        border-radius: 4.53333vw;
        margin-right: 2.66667vw;
        margin-top: 3.2vw;
      }
    }
  }
  .search-history{
    background-color: white;
    border-top: 2.66667vw solid #f4f4f4;
    .title{
      height: 12.26667vw;
      padding-left: 3.2vw;
      line-height: 12.26667vw;
      font-weight: 400;
      color: #999;
      font-size: 3.73333vw;
    }
  }
</style>