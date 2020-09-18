/* 
直接更新state的多个方法的对象
*/
import {RECEIVE_USER,RESET_USER,RECEIVE_IMG,RECEIVE_COMMENTS,RECEIVE_FOLLOWS} from './mutation-types'
export default {
  [RECEIVE_USER](state,{user}){
    state.user = user
  },
  [RESET_USER](state){
    state.user = {}
  },
  [RECEIVE_IMG](state,{header}){
    state.header = header
  },
  [RECEIVE_COMMENTS](state,{comments}){
    state.comments = comments
  },
  [RECEIVE_FOLLOWS](state,{follows}){
    state.follows = follows
  },
}