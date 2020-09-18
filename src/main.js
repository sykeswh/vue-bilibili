import Vue from 'vue'
import {Form,Field,Button,Popup,Picker,Icon,Toast,NavBar,Tab,Tabs,Uploader,Divider,Dialog,ActionSheet,DatetimePicker,List,Search} from 'vant'
import App from './App.vue'
import router from './router'
import store from './store'
import {http} from './api'
Vue.prototype.$http = http
Vue.prototype.$Toast = Toast

Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Popup)
Vue.use(Picker)
Vue.use(Toast)
Vue.use(NavBar)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Uploader)
Vue.use(Dialog)
Vue.use(ActionSheet)
Vue.use(DatetimePicker)
Vue.use(List)
Vue.use(Icon)
Vue.use(Divider)
Vue.use(Search)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
