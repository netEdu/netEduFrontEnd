// create by RicardoSong 2018-4-18 7:29
// WebSocket 通用数据
// 0 登录绑定
// 1 消息转发
// 2 开始考试
// 3 教师评价
// 4 学生互评
// 5 警告
// 6 班群信息

// 公网ip和war包前缀
// 39.105.58.192
// /netEdu-1.0-SNAPSHOT
const IPADDR = 'localhost:8011'
let WAR_NAME = ''
const PROTOCOL_HTTP = 'http://'
const PROTOCOL_WEBSOCKET = 'ws://'
// '0,' + 字符串
export const SOCKET_IP = PROTOCOL_WEBSOCKET + 'localhost:7117' + WAR_NAME + '/websocket'

export const URL_DATA = {
  LOGIN: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/login',
  // 教师端
  APPLY_COURSE: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/Course/applyCourse',
  COURSE_LIST: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/Course/courseList',
  UPDATE_COURSE: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/Course/updateApplication',
  CANCEL_COURSE: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/Course/cancelCourse',
  // 学生端
  QUERY_STUDENT_INFO: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/Client/studentInfo',
  UPDATE_STUDENT_INFORMATION: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/Client/updateStudentInfo',
  QUERY_STUDENT_COURSE_INFORMATION: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/StudentData/queryCourse',
  QUERY_STUDENT_DATA: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/StudentData/queryStudentData',
  QUERY_TEACHER_DATA: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/StudentData/queryTeacherData',
  STUDENT_DOWNLOAD_FILE: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/StudentData/downloadFile',
  DELETE_PERSON_FILE: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/StudentData/deleteFiles'
}

// 教师端侧边索引
export const TeacherSideBarItem = [
  {
    icon: 'el-icon-menu',
    index: '/ChatRoom',
    title: '聊天室'
  },
  {
    icon: 'el-icon-menu',
    index: '1',
    title: '课程管理',
    subs: [
      {
        index: '/Course',
        title: '申请课程'
      },
      {
        index: '/ShowCourse',
        title: '所有课程'
      }
    ]
  },
  {
    icon: 'el-icon-menu',
    index: '2',
    title: '试卷管理',
    subs: [
      {
        index: '/Sidebar5',
        title: '添加试卷'
      },
      {
        index: '/Sidebar6',
        title: '查看试卷'
      }
    ]
  },
  {
    icon: 'el-icon-menu',
    index: '3',
    title: '考题编辑',
    subs: [
      {
        index: '/Sidebar7',
        title: '添加考题'
      },
      {
        index: '/Sidebar8',
        title: '编辑考题'
      }
    ]
  },
  {
    icon: 'el-icon-menu',
    index: '4',
    title: '问卷',
    subs: [
      {
        index: '/Sidebar9',
        title: '添加问卷'
      },
      {
        index: '/Sidebar10',
        title: '编辑问卷'
      },
      {
        index: '/Sidebar11',
        title: '添加问题'
      },
      {
        index: '/Sidebar12',
        title: '编辑问题'
      }
    ]
  }
]

// 学生端侧边索引
export const StudentSideBarItem = [
  {
    icon: 'el-icon-menu',
    index: '0',
    title: '个人信息管理',
    subs: [
      {
        index: '/studentSidebar1',
        title: '查看个人信息'
      },
      {
        index: '/studentSidebar2',
        title: '修改个人信息'
      }
    ]
  },
  {
    icon: 'el-icon-menu',
    index: '1',
    title: '资料',
    subs: [
      {
        index: '/studentSidebar3',
        title: '删除个人资料'
      },
      {
        index: '/studentSidebar4',
        title: '下载资料'
      },
      {
        index: '/studentSidebar5',
        title: '查看可用课程'
      },
      {
        index: '/studentSidebar4',
        title: '查看个人资料'
      },
      {
        index: '/studentSidebar6',
        title: '查看教师资料'
      },
      {
        index: '/studentSidebar4',
        title: '批量添加资料'
      },
      {
        index: '/studentSidebar4',
        title: '添加资料'
      }
    ]
  },
  {
    icon: 'el-icon-menu',
    index: '2',
    title: '评价教师',
    subs:[
      {
        index:'/studentSidebar4',
        title:'添加教师评价'
      },
      {
        index:'/studentSidebar4',
        title:'删除教师评价'
      },
      {
        index:'/studentSidebar4',
        title:'查询教师评价'
      },
      {
        index:'/studentSidebar4',
        title:'修改教师评价'
      }
    ]
  }
]

// 申请课程规则
export const courseRules = {
  course_name: [
    { required: true, message: '请输入课程名称' }
  ],
  credit: [
    { required: true, message: '请输入课程名称' }
  ],
  hours: [
    { required: true, message: '请输入学时' }
  ],
  class_time: [
    { required: true, message: '请输入课时' }
  ],
  course_introduce: [
    { required: true, message: '请输入课程简介' }
  ],
  class_num: [
    { required: true, message: '请选择上课班级' }
  ],
  assessment_method: [
    { required: true, message: '请输入考核方法'}
  ]
}
