import * as api from './api'
import * as types from './mutation-types'

// 初始化讨论组
export const initThreads = ({ commit }, payload) => {
  api.receiveAllThreads(payload, threads => {
    commit(types.INIT_THREADS, { threads })
  })
}

// 接收到消息
export const receiveMessage = ({ commit }, payload) => {
  console.log(payload)
  commit(types.RECEIVE_MESSAGE, { message: payload })
}


// 切换讨论组
export const switchThread = ({ commit }, payload) => {
  console.log(payload)
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
  api.createGroup(payload, group => {
    commit(types.CREATE_THREAD, group)
  })
}

// 新建课堂讨论组
export const createClassGroup = ( { commit }, payload) => {
  commit(types.CREATE_THREAD, payload)
}
