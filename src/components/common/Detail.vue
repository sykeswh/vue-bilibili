<template>
  <div class="detailItem" @click="pathPush">
    <div class="imgparent">
      <img :src="detailitem.img" alt="" style="width:100%">
      <div class="bottom">
        <span class="video iconfont icon-play">1234</span> 
        <span class="comment iconfont icon-file-text">{{detailitem.commentlen}}</span>
      </div>
    </div>
    <p>{{detailitem.name}}</p>
  </div>
</template>

<script>
export default {
  props:['detailitem'],
  methods: {
    pathPush(){
      if(this.$route.path !=`/article/${this.detailitem.id}`){
        this.$router.push(`/article/${this.detailitem.id}`)
      }
    }
  },
}
</script>

<style lang="less">
  .detailItem{
    margin: 1.389vw 0;
    .imgparent{
      position: relative;
      .bottom{
        background: linear-gradient(0deg,rgba(0,0,0,.85),transparent);
        color: #fff;
        width: 100%;
        height: 5.556vw;
        position: absolute;
        bottom: 0;
        .video{
          position: absolute;
          left: 1.389vw;
          bottom: 2.222vw;
           font-size: 3.2vw;
        }
        .comment{
          position: absolute;
          right: 1.389vw;
          font-size: 3.2vw;
        }
      }
    }
    p{
      font-size: 3.333vw;
      margin:1.389vw 0 3.333vw 0;
    }
  }
</style>