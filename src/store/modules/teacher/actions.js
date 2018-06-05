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
  api.getExistQuestions(payload, (questions, currentPaperId) => {
    commit(types.RECEIVE_EXIST_QUESTIONS, { questions, currentPaperId })
  })
  // 未添加的考题
  api.getUnExistQuestsions(payload, (questions, existQuestionsId) => {
    commit(types.RECEIVE_UNEXIST_QUESTIONS, { questions, existQuestionsId })
  })
}

// 从试卷中删除题目
export const removeQuestion = ({ commit }, payload) => {
  api.modifyCurrentPaper(payload, (currentQuestion, idAfterModify, currentPaperId) => {
    commit(types.REMOVE_EXIST_QUESTION, { currentQuestion, idAfterModify, currentPaperId })
  })
}
// 向试卷中添加题目
export const addQuestion = ({ commit }, payload) => {
  api.modifyCurrentPaper(payload, (currentQuestion, idAfterModify, currentPaperId) => {
    commit(types.ADD_QUESTION, { currentQuestion, idAfterModify, currentPaperId })
  })
}

// 根据分页条件所有的考题
export const receiveQuestions = ({ commit }, payload) => {
  api.receiveQuestions(payload, (questions, count) => {
    commit(types.RECEIVE_QUESTION, { questions, count })
  })
}