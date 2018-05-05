// 获取所有课程
export const courses = state => state.courses
// 获取课程长度
export const coursesLength = state => {
  return state.coursesLength
}
// 获取当前courseId的课程
export const currentCourse = (state) => (courseId) => {
  return state.courses[courseId]
    ? state.courses[courseId]
    : {}
}