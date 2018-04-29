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
  }
}
