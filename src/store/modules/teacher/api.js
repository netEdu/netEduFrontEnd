import { URL_DATA } from '../../../js/util-data'
import axios from 'axios'
import { Message } from 'element-ui'
// 与服务器的通信延迟
const LATENCY = 500

// 获得所有的课程
export function getAllCourses(payload, cb) {
  setTimeout(() => {
    axios({
      method: 'post',
      url: URL_DATA.COURSE_LIST,
      data: payload.selectForm
    }).then( res => {
      payload.loading.close()
      cb(res.data)
    }).catch( err => {
      console.log(err)
      Message.error('网络错误')
      payload.loading.close()
    })
  }, LATENCY)
}

// 取消课程申请
export function cancelCourse(payload, cb) {
  axios({
    method: 'delete',
    url: URL_DATA.CANCEL_COURSE,
    params: { ids: payload.ids }
  }).then( () => {
    Message.success('取消申请成功')
    cb()
  }).catch( () => {
    Message.error('网络错误')
  })
}

// 获取所有试卷
export function getAllPapers(payload, cb) {
  setTimeout( () => {
    axios({
      method: 'post',
      url: URL_DATA.PAPER_LIST,
      data: payload.selectForm
    }).then( res => {
      payload.loading.close()
      cb(res.data.data.list)
    }).catch( err => {
      console.log(err)
      Message.error('网络错误')
      payload.loading.close()
    })
  }, LATENCY)

}

// 获取试卷已添加的考题
export function getExistQuestions(payload, cb) {
  setTimeout( () => {
    axios({
      method: 'get',
      url: URL_DATA.PAPER_SHOW,
      params: { id: payload.paper_id }
    }).then( res => {
      cb(res.data, payload.paper_id)
      payload.loadingMiddle.close()
    }).catch( err => {
      console.log(err)
      Message.error('网络错误')
      payload.loadingMiddle.close()
    })
  }, LATENCY)

}

// 获取试卷未添加的考题
export function getUnExistQuestsions(payload, cb) {
  setTimeout( () => {
    axios({
      method: 'post',
      url: URL_DATA.QUESTION_NOT_EXIST,
      params: { existIds: payload.questions }
    }).then( res => {
      cb(res.data.data, payload.questions)
      payload.loadingRight.close()
    }).catch( err => {
      console.log(err)
      Message.error('网络错误')
      payload.loadingRight.close()
    })
  }, LATENCY)
}

// 编辑当前试卷
export function modifyCurrentPaper(payload, cb) {
  setTimeout( () => {
    axios({
      method: 'put',
      url: URL_DATA.PAPER_MODIFY,
      data: {
        paper_id: payload.currentPaperId,
        questions: payload.idAfterModify
      }
    }).then( () => {
      cb(payload.currentQuestion, payload.idAfterModify, payload.currentPaperId)
      payload.loadingMiddle.close()
      payload.loadingRight.close()
    }).catch( err => {
      console.log(err)
      Message.error('网络错误')
      payload.loadingMiddle.close()
      payload.loadingRight.close()
    })
  }, LATENCY)
}

// 根据分页条件获取试卷题目
export function receiveQuestions(payload, cp) {
  setTimeout( () => {
    axios({
      method: 'post',
      url: URL_DATA.RECEIVE_QUESTION,
      data: {
        ...payload.selectForm,
        ...payload.pagement
      }
    }).then( res => {
      cp(res.data.data.list, res.data.data.count)
      payload.loading.close()
    }).catch( err => {
      console.log(err)
      Message.error('网络错误')
      payload.loadingMiddle.close()
      payload.loadingRight.close()
    })
  }, LATENCY)
}