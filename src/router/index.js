import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/teacher',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children:[
        {
          path: '/Course',
          component: resolve => require(['../components/page/Course.vue'], resolve)
        },
        {
          path: '/Sidebar2',
          component: resolve => require(['../components/page/Sidebar2.vue'], resolve)
        }
      ]
    },
    {
      path: '/teacher',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children:[
        {
          path: '/Sidebar3',
          component: resolve => require(['../components/page/Sidebar3.vue'], resolve)
        },
        {
          path: '/Sidebar4',
          component: resolve => require(['../components/page/Sidebar4.vue'], resolve)
        }
      ]
    },
    {
      path: '/teacher',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children:[
        {
          path: '/Sidebar5',
          component: resolve => require(['../components/page/Sidebar5.vue'], resolve)
        },
        {
          path: '/Sidebar6',
          component: resolve => require(['../components/page/Sidebar6.vue'], resolve)
        }
      ]
    },
    {
      path: '/student',
      component: resolve => require(['../components/common/Home_student.vue'], resolve),
      children:[
        {
          path: '/Sidebar7',
          component: resolve => require(['../components/page/Sidebar7.vue'], resolve)
        },
        {
          path: '/Sidebar8',
          component: resolve => require(['../components/page/Sidebar8.vue'], resolve)
        }
      ]
    },
    {
      path: '/student',
      component: resolve => require(['../components/common/Home_student.vue'], resolve),
      children:[
        {
          path: '/Sidebar9',
          component: resolve => require(['../components/page/Sidebar9.vue'], resolve)
        },
        {
          path: '/Sidebar10',
          component: resolve => require(['../components/page/Sidebar10.vue'], resolve)
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    },
  ]
})

