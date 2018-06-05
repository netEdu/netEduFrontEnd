import axios from 'axios'
import { URL_DATA } from '../../../js/util-data'
// const LATENCY = 16

// 接收所有讨论组
export function receiveAllThreads(payload, cb) {
  axios({
    method: 'post',
    url: URL_DATA.INIT_THREADS,
    data: { person_id: payload.person_id }
  }).then( res => {
    cb(res.data)
  })
}

// 接收讨论组成员
export function receiveAllMembers(payload, cb){
  if (payload.membersId == undefined){
    axios({
      url:URL_DATA.INIT_THREADS,
      method:'post',
      data:{group_id:payload.id}
    }).then((res)=>{
      payload.membersId=res.data[0].person_id
      axios({
        method: 'post',
        url: URL_DATA.THREAD_PERSON,
        params: { ids: payload.membersId }
      }).then( res => {
        cb(res.data.studentList)
      })
    })
  }else{
    axios({
      method: 'post',
      url: URL_DATA.THREAD_PERSON,
      params: { ids: payload.membersId }
    }).then( res => {
      cb(res.data.studentList)
    })
  }
}

// 新建讨论组
export function createGroup(payload, cb) {
  axios({
    method: 'post',
    url: URL_DATA.ADD_GROUP,
    data: {
      group_name: payload.group_name,
      person_id: payload.person_id
    }
  }).then( res => {
    cb({
      group_name: payload.group_name,
      group_id: res.data,
      person_id: ',' + payload.person_id + ','
    })
  })
}
