import Vue from 'vue'
import * as types from './mutation-types'

export default {
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
    delete state.courses[courseId]
  },

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
  [types.RECEIVE_EXIST_QUESTIONS] (state, { questions }) {
    state.currentPaperQuestionsState.existQuestions = {}
    // 更新state
    questions.forEach(question => {
      Vue.set(state.currentPaperQuestionsState.existQuestions, question.question_id, question)
    })
    state.currentPaperQuestionsState.existQuestionsLength = questions.length
  },

  // 获取试卷未添加的考题
  [types.RECEIVE_UNEXIST_QUESTIONS] (state, { questions }) {
    state.currentPaperQuestionsState.unExistQuestions = {}
    // 更新state
    questions.forEach(question => {
      Vue.set(state.currentPaperQuestionsState.unExistQuestions, question.question_id, question)
    })
    state.currentPaperQuestionsState.unExistQuestionsLength = questions.length
  }
}
