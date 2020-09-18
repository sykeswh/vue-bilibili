<template>
  <div>
    <div v-for="(item, index) in commentChild" :key="index">
      <p class="preview-item" @click="reply(item._id,item.userinfo.name)">
        <a class="name" v-if="temp">{{item.userinfo.name+'&nbsp;'}}</a>
        <a class="name" v-else>{{item.userinfo.name+':'}}</a>
        <span class="content" v-if="temp">{{'回复&nbsp;@'+item.parent_user_info.name+':'+item.comment_content}}</span>
        <span class="content" v-else>{{item.comment_content}}</span>
      </p>
      <commentChild-item :commentChild="item.child" :temp="true"></commentChild-item>
    </div>
  </div>
  <!-- <a class="show-more">
    共90条回复
    <i class="iconfont icon-gengduo1"></i>
  </a> -->
</template>

<script>
import Bus from '../../assets/bus'
export default {
  name:'commentChildItem',
  props:['commentChild','temp'],
  methods: {
    reply(id,name){
      Bus.$emit('reply-item',id,name); 
    }
  },
}
</script>

<style lang="less">
  .preview-item{
    color: #212121;
    // margin: 2.6vw 0 0;
    padding: 2.66667vw;
    // padding-bottom:0;
    font-size: 3.46667vw;
    // overflow: hidden;
    // text-overflow: ellipsis;
    // display: -webkit-box;
    // -webkit-box-orient: vertical;
    // -webkit-line-clamp: 2;
    .name{
      color: #5090cc;
    }
    .content{
      vertical-align: middle;
      text-decoration: none;
      word-break: break-all;
      
    }
  }
  .show-more{
    display: block;
    margin-top: 2.13333vw;
    font-size: 3.2vw;
    color: #5090cc;
    .iconfont{
      font-size: 4.26667vw;
    }
  }
</style>