// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import '../static/css/theme-green/index.css';       // 浅绿色主题
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
