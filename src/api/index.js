import ajax from "./ajax";
import axios from 'axios'
const BASE = '/api'
// [6、用户名密码登陆](#6用户名密码登陆)<br/>
export const reqPwdLogin = (account,pwd) => ajax(BASE+'/login_pwd',{account,pwd},'POST')
// [7、发送短信验证码](#7发送短信验证码)<br/>
export const reqSendCode = (phone) => ajax(BASE+'/sendcode',{phone})
export const reqSendLoginCode = (phone) => ajax(BASE+'/sendlogincode',{phone})
// [8、手机号验证码登陆](#8手机号验证码登陆)<br/>
export const reqSmsLogin = (phone,code) => ajax(BASE+'/login_sms',{phone,code},'POST')
// [9、根据会话获取用户信息](#9根据会话获取用户信息)<br/>
export const reqUserInfo = () => ajax(BASE+'/userinfo')
// [10、用户登出](#10用户登出)<br/>
export const reqLogout = () => ajax(BASE+'/logout')
//注册
export const reqRegister = (phone,code,pwd) => ajax(BASE+'/register',{phone,code,pwd},'POST')
//上传图片
export const reqUpload = (formData) => ajax(BASE+'/manage/img/upload',formData,'POST')
//删除指定图片
export const reqDeleteImg = (name) => ajax(BASE+'/manage/img/delete',{name},'POST')
//更新用户信息
export const reqUpdateUser = (user) => ajax(BASE+'/update',user,'POST')
//添加评论 
export const reqAddComment = (comment) => ajax(BASE+'/addcomment',comment,'POST')
//获取评论
export const reqComments = (article_id) => ajax(BASE+'/comment',{article_id})
//视频收藏/取消
export const reqCollection = (user_id,video_id) => ajax(BASE+'/collection',{user_id,video_id},'POST')
//查询是否收藏
export const reqCol = (user_id,video_id) => ajax(BASE+'/collection',{user_id,video_id})
//关注/取消
export const reqFollow = (user_id,sub_id) => ajax(BASE+'/follow',{user_id,sub_id},'POST')
//查询是否关注
export const reqFol = (user_id,sub_id) => ajax(BASE+'/follow',{user_id,sub_id})
//得到所有已关注用户
export const reqFollows = (user_id) => ajax(BASE+'/follows',{user_id})

export const http = axios.create({
  baseURL:'http://112.74.99.5:3000/web/api'
})
