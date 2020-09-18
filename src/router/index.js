import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login/Login.vue'
import Register from '../views/Register/Register.vue'
import UserInfo from '../views/UserInfo/UserInfo.vue'
import DownloadApp from '../views/DownloadApp/DownloadApp.vue'
import Edit from '../views/Edit/Edit.vue'
import Home from '../views/Home/Home.vue'
import Article from '../views/Article/Article.vue'
import Discuss from '../views/Discuss/Discuss.vue'
import EditCategory from '../views/EditCategory/EditCategory.vue'
import Search from '../views/Search/Search.vue'

Vue.use(VueRouter)
export default new VueRouter({
  routes:[
    {
      path:'/login',
      component:Login
    },
    {
      path:'/register',
      component:Register
    },
    {
      path:'/userinfo',
      component:UserInfo
    },
    {
      path:'/download_app',
      component:DownloadApp
    },
    {
      path:'/edit',
      component:Edit
    },
    {
      path:'/article/:id',
      component:Article
    },
    {
      path:'/discuss',
      component:Discuss
    },
    {
      path:'/editcategory',
      component:EditCategory
    },
    {
      path:'/search',
      component:Search
    },
    {
      path:'/',
      component:Home,
      meta:{
        keepalive:true
      }
    }
  ]
})