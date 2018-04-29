import * as TeacherGetters from './getters'
import * as TeacherActions from './actions'
import TeacherMutations from './mutations'

// 状态树模块化
export default {
  namespaced: true,
  state: {
    // 教师端数据
    // 课程
    courses: {
      /*
      course_id: {
        course_id,
        course_name,
        class_num,
        credit,
        hours,
        class_time,
        assessment_method,
        auditor
      }
      */
    },
    coursesLength: 0,
    // TODO: 试卷，题库，资料
  },
  getters: TeacherGetters,
  actions: TeacherActions,
  mutations: TeacherMutations
}