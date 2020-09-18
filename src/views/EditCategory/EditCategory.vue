<template>
  <div>
    <NavBar/>
    <van-divider dashed :style="{color:'#1a73e8',borderColor:'#1a73e8',padding:'0 20px'}">现有栏目</van-divider>
    <div class="new-category newcategory">
      <p v-for="(item, index) in newCat" :key="index" @click="handleCategory(index)">{{item.title}}</p>
    </div>
    <van-divider dashed :style="{color:'#ee0a24',borderColor:'#ee0a24',padding:'0 20px'}">已删除栏目</van-divider>
    <div class="new-category delcategory">
      <p v-for="(item, index) in delCat" :key="index" @click="delCategory(index)">{{item.title}}</p>
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/common/NavBar.vue'
export default {
  data() {
    return {
      newCat:[],
      delCat:[]
    }
  },
  components:{
    NavBar
  },
  methods: {
    async selectCategory(){
      const res = await this.$http.get("/category");
      this.newCat = res.data
    },
    handleCategory(index){
      if (this.newCat.length<4) {
        this.$Toast('最少保留三个栏目')
        return
      }
      this.delCat.push(this.newCat[index])
      this.newCat.splice(index,1)
    },
    delCategory(index){
      this.newCat.push(this.delCat[index])
      this.delCat.splice(index,1)
    }
  },
  created() {
    if (localStorage.getItem('newCat') || localStorage.getItem('delCat')) {
      this.newCat = JSON.parse(localStorage.getItem('newCat'))
      this.delCat = JSON.parse(localStorage.getItem('delCat'))
      return
    }
    this.selectCategory()
  },
  watch: {
    newCat(){
      localStorage.setItem('newCat',JSON.stringify(this.newCat))
      localStorage.setItem('delCat',JSON.stringify(this.delCat))
    }
  },
}
</script>

<style lang="less">
  .new-category{
    padding: 0 2.778vw;
    display: flex;
    flex-wrap: wrap;
    p{
      width: 20%;
      text-align: center;
      margin: 1.389vw 1.944vw;
      padding: 1.944vw 0vw;
    }
  }
  .newcategory{
    p{
      color: #1a73e8;
      border: 0.278vw solid #1a73e8;
    }
  }
  .delcategory{
    p{
      color: #ee0a24;
      border: 0.278vw solid #ee0a24;
    }
  }
</style>