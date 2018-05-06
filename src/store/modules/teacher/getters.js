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

// 获取当前的试卷map
export const currentPapers = (state) => state.papers
// 获取当前的试卷array
export const currentPapersList = (state) => {
  let papersList = []
  for(let paper in state.papers) {
    papersList.push(state.papers[paper])
  }
  return papersList
}
// 试卷总数
export const papersLength = (state) => state.papersLength
// 获取当前试卷的已添加题目
export const existQuestions = (state) => {
  let existQuestions = []
  for(let question in state.currentPaperQuestionsState.existQuestions) {
    existQuestions.push(state.currentPaperQuestionsState.existQuestions[question])
  }
  return existQuestions || []
}
// 获取当前试卷未添加的题目
export const unExistQuestions = (state) => {
  let unExistQuestions = []
  for(let question in state.currentPaperQuestionsState.unExistQuestions) {
    unExistQuestions.push(state.currentPaperQuestionsState.unExistQuestions[question])
  }
  return unExistQuestions || []
}