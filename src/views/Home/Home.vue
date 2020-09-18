<template>
  <div class="home" v-if="categorys">
    <NavBar />
    <div class="categorytab">
      <div class="category-ico" @click="$router.push('/editcategory')"><van-icon name="setting-o"/></div>
      <van-tabs v-model="active" swipeable sticky>
        <van-tab v-for="(category, index) in categorys" :key="index" :title="category.title">
          <van-list v-model="category.loading" :immediate-check="false" :finished="category.finished" finished-text="我也是有底线的~~" @load="onLoad">
            <div class="detailparent">
              <Detail
                class="detailitem"
                v-for="(categoryitem, index) in category.list"
                :key="index"
                :detailitem="categoryitem"
              />
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/common/NavBar.vue";
import Detail from "../../components/common/Detail.vue";
export default {
  data() {
    return {
      active: 0,
      categorys: [],
    };
  },
  components: {
    NavBar,
    Detail,
  },
  created() {
    console.log('created')
    this.selectCategory();
  },
  //一进入页面就触发activated
  activated() {
    if (localStorage.getItem('newCat')) {
      let newCat = JSON.parse(localStorage.getItem('newCat'))
      this.changeCategory(newCat);
    }
    this.selectArticle()
  },
  methods: {
    //获取所有分类
    async selectCategory() {
      console.log('selectCategory')
      if (localStorage.getItem('newCat')) {
        return
      }else{
        const res = await this.$http.get("/category");
        console.log(res);
        this.changeCategory(res.data);
      }
    },
    //给类添加条件
    changeCategory(data) {
      console.log('changeCategory')
      const category1 = data.map((item, index) => {
        item.list = []
        item.page = 0
        item.pagesize = 10
        item.finished = false
        item.loading = false
        return item;
      });
      this.categorys = category1;
    },
    //得到每个分类
    categoryItem() {
      console.log('categoryItem')
      const categoryitem = this.categorys[this.active];
      return categoryitem;
    },
    //根据得到的某个分类获取相应的视频数据
    async selectArticle() {
      console.log('selectArticle')
      const categoryitem = this.categoryItem();
      const res = await this.$http.get("/detail/" + categoryitem._id, {
        params: {
          page: categoryitem.page,
          pagesize: categoryitem.pagesize,
        },
      });
      categoryitem.list.push(...res.data)
      categoryitem.loading = false
      if (res.data.length<categoryitem.pagesize) {
        categoryitem.finished = true
      }
    },
    onLoad(){
      const categoryitem = this.categoryItem()
      categoryitem.page +=1
      this.selectArticle()
    }
  },
  watch: {
    active:{
      handler(newName, oldName) {
        console.log('watch')
        setTimeout(() => {
          this.selectArticle()
        }, 200);
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true
    }
  },
};
</script>

<style lang="less">
.home {
  background-color: white;
  .categorytab{
    position: relative;
    .category-ico{
      position: absolute;
      z-index: 5;
      right: 0;
      top: 1.944vw;
      background-color: white;
      padding: 1.389vw 2.778vw;
    }
    .detailparent {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .detailitem {
        width: 45%;
      }
    }
  }
}
</style>