/*************************************** 课程 ***************************************/
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

/*************************************** 试卷 ***************************************/
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
// 当前试卷的id
export const currentPaperId = (state) => state.currentPaperId
// 当前试卷已添加的题目id
export const existQuestionsId = (state) => state.existQuestionsId
// 判断当前的试卷是否和当前登录人相同
export const isLoginUserPaper = (state, getters) => (currentTeacherId) => {
  return getters.currentPaperId == 0 
    ? false 
    : state.papers[getters.currentPaperId].teacher_id == currentTeacherId
}
// 获取当前试卷的已添加题目
export const existQuestions = (state) => {
  let existQuestions = []
  for(let question in state.existQuestions) {
    existQuestions.push(state.existQuestions[question])
  }
  return existQuestions || []
}
// 获取当前试卷未添加的题目
export const unExistQuestions = (state) => {
  let unExistQuestions = []
  for(let question in state.unExistQuestions) {
    unExistQuestions.push(state.unExistQuestions[question])
  }
  return unExistQuestions || []
}


/*************************************** 题目 ***************************************/
// 获取考题总数
export const questionsCount = state => state.questionsCount
// 获取考题列表
export const questionsList = (state) => {
  let questionsList = []
  for(let id in state.questions) {
    questionsList.push(state.questions[id])
  }
  return questionsList
}
// 根据id获取考题
export const currentQuestion = (state) => (questionId) => {
  return state.questions[questionId]
    ? state.questions[questionId]
    : {}
}