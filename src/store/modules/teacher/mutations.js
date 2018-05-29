import Vue from 'vue'
import * as types from './mutation-types'

export default {
  /*************************************** 课程 ***************************************/
  // 向state中添加课程
  [types.RECEIVE_ALL_COURSES] (state, { courses }) {
    // 清空原有的课程
    state.courses = {}
    // 添加新课程
    courses.forEach(course => {
      Vue.set(state.courses, course.course_id, course)
    })
    state.coursesLength = courses.length
  },

  // 删除state中的课程
  [types.CANCEL_COURSE] (state, courseId) {
    Vue.delete(state.courses, courseId)
  },

  /*************************************** 试卷 ***************************************/
  // 获取所有的试卷
  [types.RECEIVE_ALL_PAPER] (state, { papers }) {
    state.papers = {}
    // 更新state
    papers.forEach(paper => {
      Vue.set(state.papers, paper.paper_id, paper)
    })
    state.papersLength = papers.length
  },

  // 获取试卷已添加的考题
  [types.RECEIVE_EXIST_QUESTIONS] (state, { questions, currentPaperId }) {
    Vue.set(state, 'existQuestions', {})
    // 更新state
    questions.forEach(question => {
      Vue.set(state.existQuestions, question.question_id, question)
    })
    // 设置当前试卷的id
    state.currentPaperId = currentPaperId
    state.existQuestionsLength = questions.length
  },

  // 获取试卷未添加的考题
  [types.RECEIVE_UNEXIST_QUESTIONS] (state, { questions, existQuestionsId }) {
    Vue.set(state, 'unExistQuestions', {})
    // 更新state
    questions.forEach(question => {
      Vue.set(state.unExistQuestions, question.question_id, question)
    })
    // 设置已添加的题目的id
    state.existQuestionsId = existQuestionsId
    state.unExistQuestionsLength = questions.length
  },

  // 从试卷中删除考题
  [types.REMOVE_EXIST_QUESTION] (state, { currentQuestion, idAfterModify, currentPaperId }) {
    state.existQuestionsId = idAfterModify
    state.papers[currentPaperId].questions = idAfterModify
    // 删除state中的 已添加 问题
    Vue.delete(state.existQuestions, currentQuestion.question_id)
    // 增加state中的 未添加 问题
    Vue.set(state.unExistQuestions, currentQuestion.question_id, currentQuestion)
  },
  // 向试卷中添加题目
  [types.ADD_QUESTION] (state, { currentQuestion, idAfterModify, currentPaperId }) {
    state.existQuestionsId = idAfterModify
    state.papers[currentPaperId].questions = idAfterModify
    // 删除state中的 未添加 问题
    Vue.delete(state.unExistQuestions, currentQuestion.question_id)
    // 增加state中的 已添加 问题
    Vue.set(state.existQuestions, currentQuestion.question_id, currentQuestion)
  },

  /*************************************** 考题 ***************************************/
  // 获取所有的考题
  [types.RECEIVE_QUESTION] (state, { questions }) {
    Vue.set(state, 'questions', {})
    questions.forEach( question => {
      Vue.set(state.questions, question.question_id, question)
    })
  }
}
