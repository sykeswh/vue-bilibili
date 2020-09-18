<template>
  <div class="editBanner" @click="bannerClick">
    <span>{{left}}</span>
    <span><slot name="right"></slot></span>
  </div>
</template>

<script>
export default {
  props:{
    left:String,
    right:String
  },
  methods: {
    bannerClick(){
      this.$emit('bannerClick')
    }
  },
}
</script>

<style lang="less">
  .editBanner{
    padding: 2.66667vw 3.2vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    span:first-child{
      color: #505050;
    }
    span:nth-child(2){
      color: #999;
      max-width: 48vw;
    }
  }
</style>