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
          path: '/ShowCourse',
          component: resolve => require(['../components/page/ShowCourse.vue'], resolve)
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
      path: '/teacher',
      component: resolve => require(['../components/common/Home.vue'], resolve),
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
      path: '/teacher',
      component: resolve => require(['../components/common/Home.vue'], resolve),
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
      path:"/student",
      component:resole=>require(['../components/common/Home_student.vue'],resole),
      children:[
        {
          path:'/studentSidebar1',
          component:resole=>require(['../components/studentPage/studentSidebar1.vue'],resole)
        },
        {
          path:'/studentSidebar2',
          component:resolve=>require(['../components/studentPage/studentSidebar2.vue'],resolve)
        }
      ]
    },
    {
      path:"/student",
      component:resole=>require(['../components/common/Home_student.vue'],resole),
      children:[
        {
          path:'/studentSidebar3',
          component:resole=>require(['../components/studentPage/studentSidebar3.vue'],resole)
        },
        {
          path:'/studentSidebar4',
          component:resolve=>require(['../components/studentPage/studentSidebar4.vue'],resolve)
        }
      ]
    },
    {
      path:"/student",
      component:resole=>require(['../components/common/Home_student.vue'],resole),
      children:[
        {
          path:'/studentSidebar5',
          component:resole=>require(['../components/studentPage/studentSidebar5.vue'],resole)
        },
        {
          path:'/studentSidebar6',
          component:resolve=>require(['../components/studentPage/studentSidebar6.vue'],resolve)
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    },
  ]
})

