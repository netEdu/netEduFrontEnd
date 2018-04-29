import * as TeacherGetters from './getters'
import * as TeacherActions from './actions'
import * as TeacherMutations from './mutations'

// 状态树模块化
export default {
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
    // TODO: 试卷，题库，资料
  },
  TeacherGetters,
  TeacherActions,
  TeacherMutations
}