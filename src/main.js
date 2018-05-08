// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css'
import '../node_modules/animate.css/animate.css'
Vue.config.productionTip = false

Vue.use(ElementUI)
// 设置超时时间为3000毫秒
axios.defaults.timeout = 10000
// 将axios添加进vue原型链
Vue.prototype.$axios = axios
// 设置时间过滤器
Vue.filter('time', timestamp => {
  return new Date(timestamp).toLocaleTimeString()
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
