import Vue from 'vue'
import * as types from './mutation-types'

export default {
  // // 接收所有的消息
  // [types.RECEIVE_ALL] (state, { messages }) {
  //   let latestMessage
  //   messages.forEach(message => {
  //     // create new thread if the thread doesn't exist
  //     if (!state.threads[message.threadID]) {
  //       createThread(state, message.threadID, message.threadName)
  //     }
  //     // mark the latest message
  //     if (!latestMessage || message.timestamp > latestMessage.timestamp) {
  //       latestMessage = message
  //     }
  //     // add message
  //     addMessage(state, message)
  //   })
  //   // set initial thread to the one with the latest message
  //   setCurrentThread(state, latestMessage.threadID)
  // },

  // 发送单个消息
  [types.RECEIVE_MESSAGE] (state, { message }) {
    // 如果这个组不存在，就创建新的组
    if (!state.threads[message.threadID]) {
      createThread(state, message.threadID, message.threadName)
    }
    addMessage(state, message)
  },
  // 切换聊天线程
  [types.SWITCH_THREAD] (state, { id }) {
    setCurrentThread(state, id)
  }
}

// Vue.set(obj, newProp, value)
function createThread (state, id, name) {
  Vue.set(state.threads, id, {
    id,
    name,
    messages: [],
    lastMessage: null
  })
}

function addMessage (state, message) {
  // add a `isRead` field before adding the message
  message.isRead = message.threadID === state.currentThreadID

  // 添加到对应的聊天线程中
  const thread = state.threads[message.threadID]
  // 如果消息不存在就添加进组消息流中
  if (!thread.messages.some(id => id === message.id)) {
    thread.messages.push(message.id)
    thread.lastMessage = message
  }
  // 添加到message map中
  Vue.set(state.messages, message.id, message)
}

function setCurrentThread (state, id) {
  state.currentThreadID = id
  if (!state.threads[id]) {
    console.log('[setCurrentThread]Unexist thread')
  }
  // mark thread as read
  state.threads[id].lastMessage.isRead = true
}