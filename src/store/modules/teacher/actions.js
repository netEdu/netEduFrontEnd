import * as api from './api'
import * as types from './mutation-types'

// 获得所有课程action
export const getAllCourses = ({ commit }, payload) => {
  api.getAllCourses(payload, courses => {
    commit(types.RECEIVE_ALL_COURSES, { courses })
  })
}

// 取消课程申请
export const cancelCourse = ({ commit }, payload) => {
  api.cancelCourse(payload, () => {
    commit(types.CANCEL_COURSE)
  })
}

// 获取所有试卷
export const getAllPaper = ({ commit }, payload) => {
  api.getAllPapers(payload, papers => {
    commit(types.RECEIVE_ALL_PAPER, { papers })
  })
}

// 获取已添加和未添加的考题
export const getCurrentPaperQuestionState = ({ commit }, payload) => {
  // 已添加的考题
  api.getExistQuestions(payload, questions => {
    commit(types.RECEIVE_EXIST_QUESTIONS, { questions })
  })
  // 未添加的考题
  api.getUnExistQuestsions(payload, questions => {
    commit(types.RECEIVE_UNEXIST_QUESTIONS, { questions })
  })
}