import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  mode: 'history',
  base: '/netEduFrontEnd/',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },

    {
      path: '/teacher',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children: [
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
      children: [
        {
          path: '/ChatRoom',
          component: resolve => require(['../components/common/chat/chatRoom.vue'], resolve)
        }
      ]
    },
    {
      path: '/teacher',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children: [
        {
          path: '/paper',
          component: resolve => require(['../components/page/paper.vue'], resolve)
        },
        {
          path: '/question',
          component: resolve => require(['../components/page/question.vue'], resolve)
        },
        {
          path: '/createQuestion',
          component: resolve => require(['../components/page/createQuestion.vue'], resolve)
        }
      ]
    },
    {
      path: '/teacher',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children: [
        {
          path: '/teacherFiles',
          component: resolve => require(['../components/page/teacherFiles.vue'], resolve)
        },
        {
          path: '/teacherUpload',
          component: resolve => require(['../components/page/teacherUpload.vue'], resolve)
        }
      ]
    },
    {
      path: '/teacher',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children: [
        {
          path: '/studentFiles',
          component: resolve => require(['../components/page/studentFiles.vue'], resolve)
        },
        {
          path: '/Sidebar7',
          component: resolve => require(['../components/page/Sidebar7.vue'], resolve)
        },
        {
          path: '/Sidebar8',
          component: resolve => require(['../components/page/Sidebar8.vue'], resolve)
        },
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
      path: '/student',
      component: resole => require(['../components/common/Home_student.vue'], resole),
      children: [
        {
          path: '/studentSidebar1',
          component: resole => require(['../components/studentPage/studentSidebar1.vue'], resole)
        },
        {
          path: '/studentSidebar2',
          component: resolve => require(['../components/studentPage/studentSidebar2.vue'], resolve)
        }
      ]
    },
    {
      path: '/student',
      component: resole => require(['../components/common/Home_student.vue'], resole),
      children: [
        {
          path: '/studentSidebar3',
          component: resole => require(['../components/studentPage/studentSidebar3.vue'], resole)
        },
        {
          path: '/studentSidebar4',
          component: resolve => require(['../components/studentPage/studentSidebar4.vue'], resolve)
        }
      ]
    },
    {
      path: '/student',
      component: resole => require(['../components/common/Home_student.vue'], resole),
      children: [
        {
          path: '/studentSidebar5',
          component: resole => require(['../components/studentPage/studentSidebar5.vue'], resole)
        },
        {
          path: '/studentSidebar6',
          component: resolve => require(['../components/studentPage/studentSidebar6.vue'], resolve)
        }
      ]
    },
    {
      path: '/student',
      component: resole => require(['../components/common/Home_student.vue'], resole),
      children: [
        {
          path: '/ChatStudentRoom',
          component: resolve => require(['../components/common/chat/chatRoom.vue'], resolve)
        }
      ]
    },
    {
      path: '/student',
      component: resole => require(['../components/common/Home_student.vue'], resole),
      children: [
        {
          path: '/studentSidebar3',
          component: resole => require(['../components/studentPage/studentSidebar3.vue'], resole)
        }
      ]
    },
    {
      path: '/admin',
      component: resole => require(['../components/common/Home_admin.vue'], resole),
      children: [
        {
          path: '/adminSidebar1',
          component: resole => require(['../components/adminPage/adminSidebar1.vue'], resole)
        },
        {
          path: '/adminSidebar2',
          component: resolve => require(['../components/adminPage/adminSidebar2.vue'], resolve)
        }
      ]
    },
    {
      path: '/admin',
      component: resole => require(['../components/common/Home_admin.vue'], resole),
      children: [
        {
          path: '/adminSidebar3',
          component: resole => require(['../components/adminPage/adminSidebar3.vue'], resole)
        },
        {
          path: '/adminSidebar4',
          component: resolve => require(['../components/adminPage/adminSidebar4.vue'], resolve)
        }
      ]
    },
    {
      path: '/admin',
      component: resole => require(['../components/common/Home_admin.vue'], resole),
      children: [
        {
          path: '/adminSidebar5',
          component: resole => require(['../components/adminPage/adminSidebar5.vue'], resole)
        }
      ]
    },
    {
      path: '/admin',
      component: resole => require(['../components/common/Home_admin.vue'], resole),
      children: [
        {
          path: '/adminSidebar6',
          component: resole => require(['../components/adminPage/adminSidebar6.vue'], resole)
        },
        {
          path: '/adminSidebar7',
          component: resole => require(['../components/adminPage/adminSidebar7.vue'], resole)
        }
      ]
    },
    {
      path: '/admin',
      component: resole => require(['../components/common/Home_admin.vue'], resole),
      children: [
        {
          path: '/adminSidebar8',
          component: resole => require(['../components/adminPage/adminSidebar8.vue'], resole)
        },
        {
          path: '/adminSidebar9',
          component: resole => require(['../components/adminPage/adminSidebar9.vue'], resole)
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    }
  ]
})

