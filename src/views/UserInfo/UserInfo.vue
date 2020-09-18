<template>
  <div class="userInfo">
    <NavBar/>
    <div class="space-info">
      <div class="banner"></div>
      <div class="part clearfix">
        <div class="face">
          <img src="../../assets/bilibili.jpg" alt="" slot="right" v-if="!user.header">
          <img :src="user.header" alt="" slot="right" v-else>
        </div>
        <div class="relation">
          <div class="count">
            <span class="fans">
              <span class="num">0</span>
              <br>
              <span class="type">粉丝</span>
            </span>
            <span class="split"></span>
            <span class="follow">
              <span class="num">{{follows.length}}</span>
              <br>
              <span class="type">关注</span>
            </span>
            <span class="split"></span>
            <span class="likes">
              <span class="num">0</span>
              <br>
              <span class="type">获赞</span>
            </span>
          </div>
          <div class="follow-btn" @click="$router.push('/edit')">
            <button class="white">编辑资料</button>
          </div>
        </div>
      </div>
      <div class="part2">
        <div class="base">
          <div class="name">{{user.name}}</div>
          <div class="level">
            <i :class="'iconfont icon-level-'+user.level"></i>
          </div>
        </div>
        <div class="desc clearfix">
          <span class="content">{{user.personal ? user.personal : '这个人很神秘，什么也没有留下'}}</span>
          <a class="spread-btn" @click="showTags = !showTags">{{showTags ? '展开' : '收起'}}</a>
        </div>
        <div class="tags" v-show="!showTags">
          <span>uid:{{user.uid}}</span>
        </div>
      </div>
    </div>
    <van-tabs v-model="activeName" class="tabs">
      <van-tab title="动态" name="动态">
        <div class="dynamic">
          <div class="cardHeader clearfix">
            <div class="avatar">
              <img src="../../assets/bilibili.jpg" alt="" slot="right" v-if="!user.header">
              <img :src="user.header" alt="" slot="right" v-else>
            </div>
            <div class="namebox">
              <span class="username">{{user.name}}</span>
              <p class="userExtra">2019-10-11</p>
            </div>
            <div class="top-right">
              <span>+ 关注</span>
            </div>
          </div>
          <div class="content">
            我已成为哔哩哔哩第52456928位转正会员，挑战转正答题考试获得63分，获得"全明星"挂件，有效期10天
          </div>
          <div class="imageSingle">
            <p>
              <img src="../../assets/imageSingle.png" alt="imageSingle">
            </p>
          </div>
          <ul class="footer clearfix">
            <li class="transmit">
              <i class="iconfont icon-transmit"></i>
              <span>转发</span>
            </li>
            <li class="comment">
              <i class="iconfont icon-comment-o"></i>
              <span>评论</span>
            </li>
            <li class="support">
              <i class="iconfont icon-ic_support"></i>
              <span>3</span>
            </li>
          </ul>
          <div class="ending">到达动态的尽头惹～</div>
        </div>
        <div class="m-footer">
          <p>信息网络传播视听节目许可证：0910417</p>
          <p>网络文化经营许可证 沪网文【2019】3804-274号</p>
          <p>广播电视节目制作经营许可证：（沪）字第01248号</p>
          <p>增值电信业务经营许可证 沪B2-20100043</p>
        </div>
      </van-tab>
      <van-tab title="视频" name="视频">
        <div class="archive-list"> 
          <div class="empty-arc">
            <img src="//s1.hdslb.com/bfs/static/jinkela/mstation-h5/asserts/noContent.png"> 
            <p>Ta还没有投过稿~</p> 
            <p>快去发现 <router-link to="/">新内容</router-link> 吧！</p>
          </div>
        </div>
        <div class="m-footer">
          <p>信息网络传播视听节目许可证：0910417</p>
          <p>网络文化经营许可证 沪网文【2019】3804-274号</p>
          <p>广播电视节目制作经营许可证：（沪）字第01248号</p>
          <p>增值电信业务经营许可证 沪B2-20100043</p>
        </div>
      </van-tab>
      <van-tab title="相簿" name="相簿">
        <div class="album-list">
          <div class="album-item-space"></div>
        </div>
        <div class="m-footer">
          <p>信息网络传播视听节目许可证：0910417</p>
          <p>网络文化经营许可证 沪网文【2019】3804-274号</p>
          <p>广播电视节目制作经营许可证：（沪）字第01248号</p>
          <p>增值电信业务经营许可证 沪B2-20100043</p>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import NavBar from '../../components/common/NavBar'
import {mapState} from 'vuex'
export default {
  data() {
    return {
      showTags:true,
      activeName: '动态',
    }
  },
  components:{
    NavBar
  },
  computed: {
    ...mapState(['user','follows'])
  },
  created() {
    this.$store.dispatch('getFollows',this.user._id)
  },
}
</script>

<style lang="less">
  .userInfo{
    .space-info{
      background: #fff;
      font-size: 0;
      .banner{
        width: 100vw;
        height: 24vw;
        overflow: hidden;
        background:url(../../assets/bannerTop_new.png);
        background-size: cover;
        background-position: 50%;
      }
      .part{
        padding: 0 3.2vw;
        .face{
          float: left;
          position: relative;
          width: 22.4vw;
          height: 22.4vw;
          img{
            position: absolute;
            width: 22.4vw;
            height: 22.4vw;
            border-radius: 11.2vw;
            margin-top: -1.6vw;
          }
        }
        .relation{
          float: right;
          width: 58.66667vw;
          padding-top: 2.13333vw;
          color: #e7e7e7;
          .count{
            >span{
              width: 19.2vw;
              display: inline-block;
              text-align: center;
              vertical-align: middle;
              height: 30px;
            }
            .num{
              font-size: 3.73333vw;
              color: #212121;
              line-height: 4.26667vw;
            }
            .type{
              font-size: 2.93333vw;
              color: #999;
            }
            .split{
              vertical-align: middle; 
              width: 1px;
              height: 4.26667vw;
              background: #e7e7e7;
            }
          }
          .follow-btn{
            display: block;
            .white{
              background: #fff;
              width: 100%;
              height: 8vw;
              border: 1px solid #fb7299;
              color: #fb7299;
              border-radius: 1.06667vw;
              font-size: 3.73333vw;
              margin-top: 3.2vw;
              box-sizing: border-box;
              outline: none;
            }
          }
        }
      }
      .part2{
        padding: 3.2vw;
        .base{
          .name{
            font-size: 4.8vw;
            color: #212121;
            max-width: 62.66667vw;
            vertical-align: middle;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-block;
          }
          .level{
            margin-left: 2.5vw;
            vertical-align: middle;
            display: inline-block;
            i{
              color: #92D1E5;
              font-size: 6.4vw;
              vertical-align: middle;
            }
          }
        }
        .desc{
          .content{
            margin-top: 2.13333vw;
            font-size: 3.46667vw;
            color: #999;
            line-height: 4.53333vw;
            width: 83.46667vw;
            height: 4.53333vw;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            float: left;
          }
          .spread-btn{
            margin-top: 1.86667vw;
            float: right;
            font-size: 3.46667vw;
            color: #1389bf;
          }
        }
        .tags{
          margin-top: 1.86667vw;
          margin-bottom: -1.33333vw;
          span{
            display: inline-block;
            font-size: 3.73333vw;
            padding: 0.53333vw 1.33333vw;
            margin-right: -2.66667vw;
            color: #505050;
            background: #f4f4f4;
            border-radius: 0.53333vw;
            -webkit-transform: scale(.71);
            transform: scale(.71);
            -webkit-transform-origin: left;
            transform-origin: left;
          }
        }
      }
    }
    .tabs{
      border-top: 1px solid #e7e7e7;
      background-color: #fff;
      .dynamic{
        .cardHeader{
          padding: 3.889vw 3.333vw;
          .avatar{
            float: left;
            margin-right: 1.944vw;
            img{
              width: 11.111vw;
              height: 11.111vw;
              border-radius: 50%;
            }
          }
          .namebox{
            display: inline-block;
            .userName{
              font-size: 15px;
              font-weight: 500;
              margin-top: 2px;
            }
            p{
              font-size: 12px;
              color: #999;
              margin-top: 7px;
            }
          }
          .top-right{
            float: right;
            span{
              color: #fb7299;
              font-size: 13px;
            }
          }
        }
        .content{
          padding: 0 12px;
          max-height: 92px;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 16px;
          line-height: 23px;
        }
        .imageSingle{
          padding: 8px 12px 0;
          p{
            width: 134px;
            height: 178px;
            border-radius: 4px;
            overflow: hidden;
            display: inline-block;
            img{
              width: 100%;
              height: 100%;
            }
          }
        }
        .footer{
          padding: 0 3.889vw 3.333vw;
          li{
            float: left;
            font-size: 3.611vw;
            line-height: 5.556vw;
            color: #757575;
            i{
              padding-left: 15vw;
              font-size: 3.611vw;
              margin-right: 1.389vw;
            }
          }
        }
        .ending{
          text-align: center;
          font-size: 13px;
          line-height: 40px;
          background: #f4f4f4;
          color: #757575;
        }
      }
      .m-footer{
        text-align: center;
        background-color: #f4f4f4;
        padding: 3.2vw 1.33333vw;
        p{
          color: #999;
          font-size: 3.2vw;
          line-height: 6.4vw;
        }
      }
      .archive-list{
        padding-left: 3.2vw;
        background: #fff;
        .empty-arc{
          padding: 22.66667vw 0 4.26667vw;
          text-align: center;
          img{
            width: 74.66667vw;
            margin-bottom: 4vw;
          }
          p{
            font-size: 4.26667vw;
            color: #999;
            line-height: 5.33333vw;
            a{
              color: #fb7299;
            }
          }
        }
      }
      .album-list{
        padding:0 3.2vw;
        background: #fff;
        .album-item-space{
          height: 27.73333vw;
          padding: 2.13333vw 0;
          box-sizing: border-box;
        }
      }
    }
  }
</style>