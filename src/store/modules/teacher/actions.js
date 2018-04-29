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