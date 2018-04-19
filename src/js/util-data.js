// create by RicardoSong 2018-4-18 7:29
// WebSocket 通用数据
// 0 登录绑定
// 1 消息转发
// 2 开始考试
// 3 教师评价
// 4 学生互评
// 5 警告
// 6 班群信息

const IPADDR = 'http://192.168.43.168:8011';
// '0,' + 字符串
export const SOCKET_IP = 'ws://192.168.3.11:7117/websocket';

export const URL_DATA = {
  LOGIN: IPADDR + '/login',
  APPLY_COURSE: IPADDR + '/Course/applyCourse'
};

// 侧边索引
export const TeacherSideBarItem = [
  {
    icon: 'el-icon-menu',
    index: '0',
    title: '课程管理',
    subs: [
      {
        index: '/Course',
        title: '申请课程'
      },
      {
        index: '/Sidebar2',
        title: '所有课程'
      },
      {
        index: '/Sidebar3',
        title: '正在申请'
      }
    ]
  },
  {
    icon: 'el-icon-menu',
    index: '1',
    title: '讨论组管理',
    subs: [
      {
        index: '/Sidebar4',
        title: '分组管理'
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
];

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
};