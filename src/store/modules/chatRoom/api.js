import axios from 'axios'
import { URL_DATA } from '../../../js/util-data'
// const LATENCY = 16

// // 前面的对象是载荷，传递三个参数，分别是消息，线程和发出者
// export function sendMessage ({ text, thread, author, websocket }) {
//   let timestamp = Date.now()
//   // Websocket 消息发送(异步方法，es2017)
//   const send = async () => {
//     await websocket.ws.send(
//       '0,'+ 
//       'm_' + timestamp + ',' + 
//       thread.id + ',' + 
//       thread.name + ',' + 
//       author + ']' + 
//       text
//     )
//   }
//   send().then().catch( err => {
//     console.log(err)
//   })
// }

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
  console.log(payload.membersId)
  axios({
    method: 'post',
    url: URL_DATA.THREAD_PERSON,
    params: { ids: payload.membersId }
  }).then( res => {
    cb(res.data.studentList)
  })
}