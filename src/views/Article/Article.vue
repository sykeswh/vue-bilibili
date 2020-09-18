<template>
  <div v-if="model">
    <NavBar/>
    <div class="detailinfo">
      <div class="video">
        <video :src="model.content" controls></video>
      </div>
      <div class="detailinfoText">
        <div class="title">
          <span class="iconfont icon-ic_popular">{{model.category.title}}</span>
          <span>{{model.name}}</span>
          <span class="iconfont icon-xiala"></span>
        </div>
        <div class="data">
          <span class="iconfont icon-icon_UPzhu"> {{model.userinfo.name}}</span>
          <span>41.5万观看</span>
          <span>6394弹幕</span>
          <span>{{model.date}}</span>
          <button :class="{color:btnColor}" @click="follow">{{btnColor ? '已关注' : '+关注'}}</button>
        </div>
        <div class="fold-area"></div>
      </div>
      <div class="video-toolbar clearfix">
        <div class="left">
          <span class="toolbar-item">
            <i class="iconfont icon-zan"></i>
            <span>点赞</span>
          </span>
          <span class="toolbar-item" @click="collection">
            <i class="iconfont icon-Favor" :class="{activeColor:collectionColor}"></i>
            <span>收藏</span>
          </span>
          <span class="toolbar-item">
            <i class="iconfont icon-huancun"></i>
            <span>缓存</span>
          </span>
        </div>
        <div class="right">
          <span class="toolbar-item">
            <i class="iconfont icon-qingxidu"></i>
            <span>清晰度</span>
          </span>
        </div>
      </div>
      <div class="video-bottom-tab">
        <van-tabs v-model="active" color="#fb7299" title-active-color="#fb7299">
          <van-tab title="相关推荐" >
            <div class="affix">
              <Detail v-for="(item, index) in commendList" :key="index" :detailitem="item" class="detailitem"/>
            </div>
          </van-tab>
          <van-tab :title="'评论'+num">
            <div class="comment">
              <div class="comment-user">
                <img :src="user.header ? user.header : '../../assets/bilibili.jpg'" alt="" v-if="user._id">
                <img src="../../assets/akari.jpg" alt="" v-else>
                <input type="text" v-model="comcontent" :placeholder="user._id ? '说点什么吧' : '请先登录'" :disabled="user._id ? false : true">
                <button @click="sendComment(null)">发送</button>
              </div>
              <div class="comment-item clearfix" v-for="(comment, index) in commentList" :key="index">
                <div class="head">
                  <img :src="comment.userinfo.header" alt="" v-if="comment.userinfo.header">
                  <img src="../../assets/bilibili.jpg" alt="" v-else>
                </div>
                <div class="detail" @click="reply(comment._id,comment.userinfo.name)">
                  <div class="user">
                    <span>{{comment.userinfo.name}}</span>
                  </div>
                  <p class="time">{{comment.comment_date}}</p>
                  <p class="content">{{comment.comment_content}}</p>
                </div>
                <div class="preview">
                  <CommentItem :commentChild="comment.child"></CommentItem>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
      <van-popup v-model="show" position="bottom" :style="{height:'50%'}" class="release">
        <van-field v-model="comcontent" :placeholder="'回复 @'+userid" />
        <button @click="sendComment(parent_id)">发布</button>
      </van-popup>
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/common/NavBar.vue'
import CommentItem from '../../components/common/CommentItem'
import Detail from '../../components/common/Detail.vue'
import {addCommentDate} from '../../utils/dateUtils'
import {mapState} from 'vuex'
import Bus from '../../assets/bus'
import {reqCollection,reqCol,reqFollow,reqFol} from '../../api'
export default {
  data() {
    return {
      model:null,
      commendList:null,
      active:'0',
      commentList:null,
      num:0,
      show:false,
      comcontent:'',//评论内容
      userid:'',//发布评论的用户id
      parent_id:null,
      collectionColor:null,
      btnColor:null
    }
  },
  computed: {
    ...mapState(['user','comments'])
  },
  components:{
    NavBar,
    Detail,
    CommentItem
  },
  methods: {
    async articleitemData(){
      const res = await this.$http.get('/article/'+this.$route.params.id)
      this.model = res.data[0]
      this.fol()
    },
    async commendData(){
      const res = await this.$http.get('/commend')
      this.commendList = res.data
    },
    changeCommentData(arr){
      function fn(temp){
        let arr1 =[]
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].parent_id == temp) {
            arr1.push(arr[i])
            arr[i].child = fn(arr[i]._id)
          }
        }
        return arr1
      }
      return fn(null)
    },
    //接收一级评论
    sendComment(data){
      if (!this.comcontent.trim()) {
        return
      }
      // 'article_id':{type:String},//哪个视频的评论
      const article_id = this.$route.params.id
      // 'user_id':{type:String},//哪个用户发的评论
      const user_id = this.user._id
      // 'comment_date':{type:String},//什么时间发送的评论
      const comment_date = addCommentDate(new Date())
      // 'comment_content':{type:String},//评论内容
      const comment_content = this.comcontent
      // 'parent_id':{type:String}//回复的哪条评论
      const parent_id = data
      this.$store.dispatch('getAddComments',{article_id,user_id,comment_date,comment_content,parent_id})
      this.comcontent = ''
      this.show = false
      this.$store.dispatch('getComments',this.$route.params.id)
    },
    //获取评论id和发布人姓名，并打开输入框
    reply(id,name){
      console.log(id,name);
      this.parent_id = id
      this.show = true
      this.userid = name
    },
    async collection(){
      if (this.user._id) {
        const user_id = this.user._id
        const video_id = this.$route.params.id
        const res = await reqCollection(user_id,video_id) 
        if (res.msg === '收藏成功') {
          this.collectionColor = true
          this.$Toast('收藏成功~')
        }else if (res.msg === '取消收藏成功') {
          this.collectionColor = false
          this.$Toast('取消收藏成功')
        }
      }
    },
    async col(){
      if (this.user._id) {
        //查询是否已收藏
        console.log('2')
        const user_id = this.user._id
        const video_id = this.$route.params.id
        const res = await reqCol(user_id,video_id)
        if (res.code === 0) {
          this.collectionColor = true
        }else if (res.code === 1) {
          this.collectionColor = false
        }
      }
    },
    async follow(){
      if (this.user._id) {
        const user_id = this.user._id
        const sub_id = this.model.userid
        const res = await reqFollow(user_id,sub_id) 
        if (res.msg === '关注成功') {
          this.btnColor = true
          this.$Toast('关注成功~')
        }else if (res.msg === '取消关注成功') {
          this.btnColor = false
          this.$Toast('已取消关注')
        }
      }else{
        this.$Toast('请登录~')
      }
    },
    async fol(){
      if (this.user._id) {
        //查询是否已关注
        const user_id = this.user._id
        const sub_id = this.model.userid
        const res = await reqFol(user_id,sub_id)
        if (res.code === 0) {
          this.btnColor = true
        }else if (res.code === 1) {
          this.btnColor = false
        }
      }
    }
  },
  created() {
    this.articleitemData()
    this.commendData()
    this.$store.dispatch('getComments',this.$route.params.id)
  },
  mounted() {
    //父级组件订阅
     Bus.$on('reply-item', (id,name) => {  
        console.log(id,name);
        this.parent_id = id
        this.show = true
        this.userid = name  
    });
    this.col()
  },
  watch: {
    '$route.path'(){
      setTimeout(() => {
        this.articleitemData()
        this.commendData()
        window,scrollTo(0,0)
      }, 200);
    },
    '$store.state.comments'(){
      this.num = this.comments.length
      this.commentList = this.changeCommentData(this.comments)
    },
    '$store.state.user'(){
      this.col()
    }
  },
}
</script>

<style lang="less">
  .detailinfo{
    background: white;
    .video{
      width: 100%;
      video{
        width: 100%;
      }
    }
    .detailinfoText{
      margin-top: 4vw;
      padding: 0 3.2vw;
      .title{
        width: 100%;
        position: relative;
        span:nth-child(1){
          position: absolute;
          font-size: 3.2vw;
          padding: 0 1.6vw;
          height: 5.33333vw;
          line-height: 5.33333vw;
          color: #fb7299;
          background: #f4f4f4;
          border-radius: 3.2vw;
          vertical-align: middle;
        }
        span:nth-child(2){
          padding-left: 14.66667vw;
          white-space: normal;
          height: auto;
          font-size: 4.26667vw;
          font-weight: 400;
          box-sizing: border-box;
          display: inline-block;
          color: #212121;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 86.66667vw;
          height: 6.4vw;
          line-height: 6.4vw;
        }
        span:nth-child(3){
          position: absolute;
          right: 0;
        }
      }
      .data{
        margin-top: 2.13333vw;
        color: #999;
        position: relative;
        span{
          font-size: 3.2vw;
          display: inline-block;
          vertical-align: middle;
        }
        span:nth-child(1){
          color: #212121;
          margin-right: 4.8vw;
          vertical-align: middle;
        }
        span:nth-child(2),span:nth-child(3){
          margin-right: 2.13333vw;
        }
        button{
          color: white;
          font-size: 3.2vw;
          border: none;
          border-radius: 0.556vw;
          background-color: #fb7299;
          height: 5.278vw;
          line-height: 5.278vw;
          position: absolute;
          right: 0;
          top: -0.833vw;
        }
        .color{
          color: #212121;
          background-color: #999;
        }
      }
    }
    .video-toolbar{
      border-bottom: 0.139vw solid #999;
      padding: 2.93333vw 3.2vw;
      color: #999;
      .toolbar-item{
        margin-right: 5.33333vw;
        i{
          margin-right: 1.33333vw;
          font-size: 5.33333vw;
          color: #757575;
          vertical-align: middle;
        }
        .activeColor{
          color: #fb7299;
        }
        span{
          font-size: 2.66667vw;
          vertical-align: middle;
        }
      }
      .left{
        float: left;
      }
      .right{
        float: right;
      }
    }
    .video-bottom-tab{
      .affix{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .detailitem{
          display: inline-block;
          width: 45%;
        }
      }
      .comment{
        padding: 3.2vw;
        border-bottom: 1px solid #e7e7e7;
        .comment-user{
          display: flex;
          img{
            height: 6.944vw;
            width: 6.944vw;
            border-radius: 50%;
          }
          input{
            outline: none;
            border: 0;
            background-color: #f4f4f4;
            border-radius: 3.611vw;
            font-size: 3.333vw;
            padding: 0 5.556vw 0 2.778vw;
            margin-left: 3.778vw;
            display: inline-block;
            width: 55.444vw;
          }
          button{
            width: 50px;
            font-size: 3.333vw;
            border-radius: 12px;
            border: none;
            margin-left: 15px;
            background-color: #fb7299;
            color: white;
          }
        }
        .comment-item{
          border-bottom: 1px solid #e7e7e7;
          padding: 2.778vw 0 3.2vw 0;
          .head{
            float: left;
            margin-top: 0.53333vw;
            img{
              width: 8vw;
              height: 8vw;
              border-radius: 4vw;
            }
          }
          .detail{
            margin-left: 12vw;
            .user{
              span{
                font-size: 3.46667vw;
                color: #757575;
              }
            }
            .time{
              margin-top: 1.86667vw;
              font-size: 3.2vw;
              height: 3.2vw;
              line-height: 3.2vw;
              color: #999;
            }
            .content{
              margin-top: 2.4vw;
              font-size: 3.46667vw;
              color: #212121;
              white-space: pre-line;
              word-break: break-word;
            }
          }
          .preview{
            margin-left: 12vw;
            margin-top: 2.66667vw;
            background: #f4f4f4;
            // padding: 2.66667vw;
            // padding-top: 0.278vw;
            border-radius: 1.06667vw;
          }
        }
      }
    }
    .release{
      display: flex;
      input{
        background-color: #f4f4f4;
        border-radius: 12px;
        padding:0 15px;
        width: 300px;
      }
      button{
       height: 40px;
       width: 60px;
       color: thistle;
       background-color: white;
       border: none;
      }
    }
  }
</style>