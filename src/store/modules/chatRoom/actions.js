import * as api from './api'
import * as types from './mutation-types'

// export const getAllMessages = ({ commit }) => {
//   // 这是个函数，将函数传入了api中，并在api中进行调用
//   api.getAllMessages(messages => {
//     commit(types.RECEIVE_ALL, { messages })
//   })
// }

export const sendMessage = ({ commit }, payload) => {
  api.sendMessage(payload)
}

export const receiveMessage = ({ commit }, payload) => {
  
}

export const switchThread = ({ commit }, payload) => {
  commit(types.SWITCH_THREAD, payload)
}