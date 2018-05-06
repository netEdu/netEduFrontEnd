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
    // 课程数据长度
    coursesLength: 0,
    
    // 试卷列表
    papers: {
      
    },
    // 课程长度
    papersLength: 0,
    // 当前试卷的考题状态
    currentPaperQuestionsState: {
      // 已添加的考题
      existQuestions: {

      },
      // 未添加的考题
      unExistQuestions: {

      },
      existQuestionsLength: 0,
      unExistQuestionsLength: 0
    }
    // TODO: 资料
  },
  getters: TeacherGetters,
  actions: TeacherActions,
  mutations: TeacherMutations
}