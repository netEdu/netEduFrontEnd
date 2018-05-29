import * as api from './api'
import * as types from './mutation-types'

// export const getAllMessages = ({ commit }) => {
//   // 这是个函数，将函数传入了api中，并在api中进行调用
//   api.getAllMessages(messages => {
//     commit(types.RECEIVE_ALL, { messages })
//   })
// }

// export const sendMessage = ({ commit }, payload) => {
//   api.sendMessage(payload)
// }
// 初始化讨论组
export const initThreads = ({ commit }, payload) => {
  api.receiveAllThreads(payload, threads => {
    commit(types.INIT_THREADS, { threads })
  })
}

// 接收到消息
export const receiveMessage = ({ commit }, payload) => {
  // TODO: 接收消息方法
  commit(types.RECEIVE_MESSAGE, { message: payload })
}

// 切换讨论组
export const switchThread = ({ commit }, payload) => {
  // TODO: 当人数为空时，添加人数
  if(payload.membersLength == 0){
    api.receiveAllMembers(payload, members => {
      commit(types.SWITCH_THREAD, { id: payload.id, members })
    })
  }else {
    commit(types.SWITCH_THREAD, { id: payload.id, members: [] })
  }
}

// 新建讨论组
export const createGroup = ({ commit }, payload) => {
  api.createGroup(payload, groupId => {
    // TODO: 新增讨论组action
    // commit(types.CREATE_GROUP, { groupId, ...payload })
  })
}