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
  axios({
    method: 'post',
    url: URL_DATA.PAPER_LIST,
    params: payload.selectForm
  }).then( res => {
    payload.loading.close()
    cb(res.data)
  }).catch( err => {
    Message.error('网络错误')
    payload.loading.close()
  })
}