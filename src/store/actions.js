/* 
通过mutation间接更新state的多个方法的对象
*/
import {RECEIVE_USER,RESET_USER,RECEIVE_IMG,RECEIVE_COMMENTS,RECEIVE_FOLLOWS} from './mutation-types'
import {reqRegister,reqSmsLogin,reqPwdLogin,reqUserInfo,reqLogout,reqUpload,reqUpdateUser,reqAddComment,reqComments,reqFollows} from '../api'
import router from '../router'
import {Dialog} from 'vant' 
export default {
  async getRegister({commit},data){
    const {phone,code,pwd} = data
    const result = await reqRegister(phone,code,pwd)
    if (result.code === 0) {
      const user = result.data
      commit(RECEIVE_USER,{user})
      router.replace('/userinfo')
    }else{
      Dialog.alert({
        title: '错误提示',
        message: result.msg,
      })
    }
  },
  async getSmsLogin({commit},data){
    const {phone,code} = data
    const result = await reqSmsLogin(phone,code)
    if (result.code === 0) {
      const user = result.data
      commit(RECEIVE_USER,{user})
      router.replace('/userinfo')
    }else{
      Dialog.alert({
        title: '错误提示',
        message: result.msg,
      })
    }
  },
  async getPwdLogin({commit},data){
    const {account,pwd} = data
    const result = await reqPwdLogin(account,pwd)
    if (result.code === 0) {
      const user = result.data
      commit(RECEIVE_USER,{user})
      router.replace('/')
    }else{
      Dialog.alert({
        title: '错误提示',
        message: result.msg,
      })
    }
  },
  async getUserInfo({commit}){
    const result = await reqUserInfo()
    if (result.code === 0) {
      const user = result.data
      commit(RECEIVE_USER,{user})
    }
  },
  async getLogout({commit}){
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USER)
      router.replace('/login')
    }
  },
  async getUpload({commit},file){
    let formData = new FormData()
    formData.append('image', file.file)
    const result = await reqUpload(formData)
    if (result.status === 0) {
      const header = result.data
      commit(RECEIVE_IMG,{header})
    }
  },
  async getUpdate({commit},user){
    const result = await reqUpdateUser(user)
    if (result.code === 0) {
      const user = result.data
      commit(RECEIVE_USER,{user})
    }
  },
  async getComments({commit},article_id){
    const result = await reqComments(article_id)
    if (result.code === 0) {
      const comments = result.data
      commit(RECEIVE_COMMENTS,{comments})
    }
  },
  async getAddComments({commit},comment){
    const result = await reqAddComment(comment)
    if (result.code === 0) {
      console.log('添加成功！');
    }
  },
  async getFollows({commit},user_id){
    const result = await reqFollows(user_id)
    if (result.code === 0) {
      const follows = result.data
      commit(RECEIVE_FOLLOWS,{follows})
    }
  },
}