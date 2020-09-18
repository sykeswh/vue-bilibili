<template>
  <div class="edit">
    <NavBar/>
    <div class="info-card">
      <div class="uploadfile">
        <van-uploader :after-read="afterRead" class="uploadimg" :accept="'image/*'" preview-size="100vw"/>
        <EditBanner left="头像">
          <img src="../../assets/bilibili.jpg" alt="" slot="right" v-if="!user.header">
          <img :src="user.header" alt="" slot="right" v-else>
        </EditBanner>
      </div>
      <EditBanner left="昵称" @bannerClick="show=true">
        <a href="javascript:;" slot="right">{{user.name}}</a>
      </EditBanner>
      <EditBanner left="UID">
        <a href="javascript:;" slot="right">{{user.uid}}</a>
      </EditBanner>
      <EditBanner left="性别" @bannerClick="gendershow=true">
        <a href="javascript:;" slot="right">{{user.sex}}</a>
      </EditBanner>
      <EditBanner left="出生日期" @bannerClick="dateshow=true">
        <a href="javascript:;" slot="right">{{date()}}</a>
      </EditBanner>
      <EditBanner left="个性签名"  @bannerClick="textShow=true">
        <a href="javascript:;" slot="right">{{user.personal===undefined ? '介绍一下自己吧' : user.personal}}</a>
      </EditBanner>
      <van-dialog v-model="show" title="昵称" show-cancel-button @confirm="confirm" @cancel="content=''">
        <van-field v-model="content"/>
      </van-dialog>
      <van-dialog v-model="textShow" title="个性签名" show-cancel-button @confirm="textConfirm" @cancel="content=''">
        <van-field v-model="content" type="textarea"/>
      </van-dialog>
      <van-action-sheet v-model="gendershow" :actions="actions" cancel-text="取消" @select="onSelect" />
      <van-popup v-model="dateshow" position="bottom" :style="{ height: '30%' }">
        <van-datetime-picker type="date" title="选择年月日" :min-date="minDate" 
          :max-date="maxDate" @confirm="dateConfirm" @cancel="dateshow=false"/>
      </van-popup>
    </div>
    <div class="op-card">
      <a class="item" @click="logout">退出登录</a> 
      <a class="item" @click="$router.back()">返回空间</a>
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/common/NavBar'
import EditBanner from '../../components/common/EditBanner'
import {mapState,mapActions} from 'vuex'
import {formateDate} from '../../utils/dateUtils'
export default {
  data() {
    return {
      model:{},
      show:false,
      textShow:false,
      gendershow:false,
      dateshow:false,
      content:'',//昵称、个性签名
      actions: [{ name: '男' }, { name: '女' }, { name: '保密' }],
      minDate: new Date(1949, 0, 1),
      maxDate: new Date(2025, 10, 1)
    }
  },
  watch: {
    //监听model变化，及时对user进行更新
    model:{
      handler(newVal,oldVal){
        if (!oldVal._id) {
          return
        }
        this.update()
      },
      immediate: false,
      deep: true // 表示开启深度监听
    },
    //监听header变化，改变model
    header(newval,oldVal){
      this.$set(this.model, 'header', newval.url)//从无到有赋值header，用$set设置成响应式属性
    }
  },
  mounted() {
    //由userinfo进入edit页面时，将user赋值给model
    if(this.user._id){
      this.model = this.user
    }
  },
  created() {
    //在页面刷新时将model里的信息保存到localStorage里
    window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("model",JSON.stringify(this.model))
    })
     //在页面加载时读取localStorage里的状态信息
    if (sessionStorage.getItem("model") ) {
        this.model = JSON.parse(sessionStorage.getItem("model"))
    }
  },
  components:{
    NavBar,
    EditBanner
  },
  computed: {
    ...mapState(['user','header'])
  },
  methods: {
    ...mapActions(['getLogout']),
    //退出登录
    logout(){
      this.getLogout()
    },
    //上传图片
    afterRead(file){
      this.$store.dispatch('getUpload',file)
    },
    //用户更新
    update(){
      this.$store.dispatch('getUpdate',this.model)
    },
    //昵称修改
    confirm(){
      if (this.content==='') {
        return
      }
      this.model.name = this.content
      this.content = ''
    },
    //个性签名修改
    textConfirm(){
      if (this.content==='') {
        return
      }
      this.$set(this.model, 'personal', this.content)
      this.content = ''
    },
    //转换时间
    date(){
      return formateDate(this.user.birthday)
    },
    //性别
    onSelect(data){
      this.model.sex = data.name
      this.gendershow = false
    },
    //时间
    dateConfirm(date){
      this.dateshow = false
      this.model.birthday = date
    }
  },
}
</script>

<style lang="less">
  .edit{
    .info-card{
      margin-top: 3.2vw;
      width: 100%;
      background: #fff;
      border-collapse: collapse;
      font-size: 4vw;
      img{
        width: 12.26667vw;
        height: 12.26667vw;
        border-radius: 6.13333vw;
      }
    }
    .op-card{
      margin-top: 5.33333vw;
      .item:first-child{
        border-bottom: 1px solid #eee;
      }
      .item{
        display: block;
        padding: 2.66667vw;
        text-align: center;
        color: #505050;
        background: #fff;
        font-size: 3.73333vw;
      }
    }
    .uploadfile{
      position: relative;
      overflow: hidden;
      .uploadimg{
        position: absolute;
        opacity: 0;
      }
    }
  }
</style>