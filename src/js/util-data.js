// create by RicardoSong 2018-4-18 7:29
// WebSocket 通用数据
// 0 登录绑定 √
// 1 消息转发 √
// 2 开始考试 √
// 3 教师评价 √
// 4 学生互评 √
// 5 警告 √
// 6 班群信息 √
// 7 举手提问   7,classId,msg √
// 8 添加老师   8,teacherID,classID √

// 公网ip和war包前缀
// 39.105.58.192
// /netEdu-1.0-SNAPSHOT
export const LOCAL_IPADDR = 'localhost:8888'
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
  PAPER_ADD: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/Paper/addPaper',
  PAPER_LIST: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/Paper/showPaperList',
  PAPER_INFO: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/Paper/showPaper',
  PAPER_DELETE: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/Paper/deletePaper',
  PAPER_SHOW: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/Paper/showPaper',
  QUESTION_NOT_EXIST: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/Question/selectNotExistQuestion',
  PAPER_MODIFY: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/Paper/updatePaper',
  RECEIVE_QUESTION: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/Question/queryAllQuestion',
  MODIFY_QUESTION: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/Question/updateQuestion',
  ADD_QUESTION: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/Question/addQuestion',
  REMOVE_QUESTION: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/Question/deleteQuestion',
  QUERY_STUDENT_DATA_TEACHER: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/TeacherData/queryStudentData',
  QUERY_TEACHER_DATA_TEACHER: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/TeacherData/queryTeacherData',
  DELETE_TEACHER_FILE: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/TeacherData/deleteFiles',
  MARK_STUDENT_DATA: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/TeacherData/markData',
  TEACHER_DOWNLOAD_FILE: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/TeacherData/downloadFile?',
  QUERY_ALL_STUDENT_AVG_SCORE:PROTOCOL_HTTP + IPADDR + WAR_NAME + '/Score/AVGAllStudent',
  QUERY_MY_STUDENT:PROTOCOL_HTTP + IPADDR + WAR_NAME + '/Client/queryMyStudent',
  QUERY_ONE_STUDENT_ALL_PAPER:PROTOCOL_HTTP + IPADDR + WAR_NAME + '/Client/queryMyStudentPaper',
  TEACHER_UPLOAD_MANY: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/TeacherData/uploadMany',
  QUERY_QUESTIONNAIRES: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/Questionnaire/pageQuestionnaire',
  STUDENT_EVALUATE: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/StudentEvaluate/SelectByStudentId',
  MULTI_EVALUATE: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/MEvaluate/SelectByStudentId',
  // 学生端
  QUERY_STUDENT_INFO: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/Client/studentInfo',
  UPDATE_STUDENT_INFORMATION: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/Client/updateStudentInfo',
  QUERY_STUDENT_COURSE_INFORMATION: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/StudentData/queryCourse',
  QUERY_STUDENT_DATA: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/StudentData/queryStudentData',
  QUERY_TEACHER_DATA: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/StudentData/queryTeacherData',
  STUDENT_DOWNLOAD_FILE: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/StudentData/downloadFile',
  DELETE_PERSON_FILE: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/StudentData/deleteFiles',
  QUERY_STUDENT_EXAM_INFORMATION:PROTOCOL_HTTP + IPADDR + WAR_NAME + '/Exam/showExam',
  CHECK_PAPER:PROTOCOL_HTTP + IPADDR + WAR_NAME + '/Check/checkPaper',
  ADD_TEACHER_QUESTIONNAIRE:PROTOCOL_HTTP + IPADDR + WAR_NAME + '/TeacherEvaluate/addTeacherEvaluate',
  ADD_STUDENT_QUESTIONNAIRE:PROTOCOL_HTTP + IPADDR + WAR_NAME + '/MEvaluate/addMEvaluate',

  // 管理员端
  QUERY_TEACHER_INFORMATION:PROTOCOL_HTTP+IPADDR+WAR_NAME+'/Person/queryTeacher',
  ADD_TEACHER_INFORMATION:PROTOCOL_HTTP+IPADDR+WAR_NAME+'/Person/addTeacher',
  TEST_TEACHER_USERNAME_REPEAT:PROTOCOL_HTTP+IPADDR+WAR_NAME+'/Person/checkTeacher',
  QUERY_STUDENT_INFORMATION:PROTOCOL_HTTP+IPADDR+WAR_NAME+'/Person/queryStudent',
  ADD_STUDENT_INFORMATION:PROTOCOL_HTTP+IPADDR+WAR_NAME+'/Person/addStudent',
  TEST_STUDENT_USERNAME_REPEAT:PROTOCOL_HTTP+IPADDR+WAR_NAME+'/Person/checkStudent',
  QUERY_COURSE_LIST:PROTOCOL_HTTP+IPADDR+WAR_NAME+'/Admin/courseList',
  VERIFY_COURSE:PROTOCOL_HTTP+IPADDR+WAR_NAME+'/Admin/verify',
  ADD_SURVEY_QUESTION: PROTOCOL_HTTP+IPADDR+WAR_NAME+'/SurveyQuestion/addSurveyQuestion',
  QUERY_SURVEY_QUESTION:PROTOCOL_HTTP+IPADDR+WAR_NAME+'/SurveyQuestion/selectBypage',
  DELETE_SURVEY_QUESTION:PROTOCOL_HTTP+IPADDR+WAR_NAME+'/SurveyQuestion/delSurveyQuestion',
  QUERY_ONE_SURVEY_QUESTION:PROTOCOL_HTTP+IPADDR+WAR_NAME+'/SurveyQuestion/selectByQuestionid',
  UPDATE_SURVEY_QUESTION:PROTOCOL_HTTP+IPADDR+WAR_NAME+'/SurveyQuestion/upSurveyQuestion',
  ADD_TEACHER_QUESTION:PROTOCOL_HTTP+IPADDR+WAR_NAME+'/Questionnaire/addQuestionnaire',
  QUERY_TEACHER_QUESTION_LIST:PROTOCOL_HTTP+IPADDR+WAR_NAME+'/Questionnaire/pageQuestionnaire',
  DELETE_TEACHER_QUESTION_LIST:PROTOCOL_HTTP+IPADDR+WAR_NAME+'/Questionnaire/deleteQuestionnaire',
  QUERY_ONE_QUESTIONNAIRE:PROTOCOL_HTTP+IPADDR+WAR_NAME+'/Questionnaire/selectByQuestionnaireId',
  UPADTE_TEACHER_QUESTION:PROTOCOL_HTTP+IPADDR+WAR_NAME+'/Questionnaire/upQuestionnaire',
  UPLOAD_MANY_FILES:PROTOCOL_HTTP+IPADDR+WAR_NAME+'/StudentData/uploadMany',

  // 聊天室
  INIT_THREADS: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/group/getGroupById',
  THREAD_PERSON: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/group/selectPersonWithId',
  ADD_GROUP: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/group/addGroup',
  ENTER_CLASS: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/group/selectAllClassStudent',
  DELETE_THREAD: PROTOCOL_HTTP + IPADDR + WAR_NAME + '/group/delGroup'
}

// 教师端侧边索引
export const TeacherSideBarItem = [
  {
    icon: 'el-icon-news',
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
    icon: 'el-icon-document',
    index: '2',
    title: '试卷管理',
    subs: [
      {
        index: '/paper',
        title: '组装/查看试卷'
      },
      {
        index: '/question',
        title: '查看/编辑考题'
      },
      {
        index: '/createQuestion',
        title: '添加考题'
      }
    ]
  },
  {
    icon: 'el-icon-document',
    index: '3',
    title: '文件管理',
    subs: [
      {
        index: '/teacherUpload',
        title: '资料上传'
      },
      {
        index: '/teacherFiles',
        title: '资料查看/下载'
      },
    ]
  },
  {
    icon: 'el-icon-document',
    index: '4',
    title: '学生信息管理',
    subs: [
      {
        index: '/studentFiles',
        title: '资料查看/打分'
      },
      {
        index: '/Sidebar7',
        title:'查看/打印学生平均成绩'
      },
      {
        index: '/Sidebar8',
        title:'查看学生答题情况'
      },
      {
        index: '/Sidebar9',
        title:'查看学生互评'
      },
      {
        index: '/Sidebar10',
        title:'查看学生自评'
      }
    ]
  }
]

// 学生端侧边索引
export const StudentSideBarItem = [
  {
    icon: 'el-icon-news',
    index: '/ChatStudentRoom',
    title: '聊天室'
  },
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
        index: '/studentSidebar3',
        title: '批量添加资料'
      }
    ]
  }
]

//管理员侧边索引栏
export const AdminSideBarItem = [
  {
    icon: 'el-icon-menu',
    index: '0',
    title: '教师管理',
    subs: [
      {
        index: '/adminSidebar1',
        title: '查询教师信息'
      },
      {
        index: '/adminSidebar2',
        title: '添加教师'
      }
    ]
  },
  {
    icon: 'el-icon-menu',
    index: '1',
    title: '学生管理',
    subs: [
      {
        index: '/adminSidebar3',
        title: '查询学生信息'
      },
      {
        index: '/adminSidebar4',
        title: '添加学生'
      }
    ]
  },
  {
    icon: 'el-icon-menu',
    index: '2',
    title: '课程审核',
    subs: [
      {
        index: '/adminSidebar5',
        title: '查看申请列表'
      }
    ]
  },
  {
    icon: 'el-icon-menu',
    index: '3',
    title: '问卷问题',
    subs: [
      {
        index: '/adminSidebar6',
        title: '查询教师问卷问题'
      },
      {
        index: '/adminSidebar7',
        title: '添加教师问卷问题'
      }
    ]
  },
  {
    icon: 'el-icon-menu',
    index: '4',
    title: '教师评价问卷',
    subs: [
      {
        index: '/adminSidebar8',
        title: '查询教师问卷'
      },
      {
        index: '/adminSidebar9',
        title: '添加教师问卷'
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
    { required: true, message: '请输入学分' }
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
// 试卷问题规则
export const questionRules = {
  question_type: [
    { required: true, message: '请选择考题类型' }
  ],
  question_content: [
    { required: true, message: '请输入题目' }
  ],
  question_answer: [
    { required: true, message: '请输入正确答案' }
  ],
  difficulty: [
    { required: true, message: '请选择难度' }
  ]
}

// 函数节流
export const throttle = function (fn, delay) {
  var timer = null
  return function () {
    clearTimeout(timer)
    timer = setTimeout(function() {
      fn()
    }, delay)
  }
}
