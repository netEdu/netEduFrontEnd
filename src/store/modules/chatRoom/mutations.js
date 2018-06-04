import Vue from 'vue'
import * as types from './mutation-types'

export default {
  // 初始化组
  [types.INIT_THREADS] (state, { threads }) {
    Vue.set(state, 'threads', {})
    threads.forEach(thread => {
      createThread (state, thread)
    })
  },
  // 接收单个消息
  [types.RECEIVE_MESSAGE] (state, { message }) {
    // 如果这个组不存在，就创建新的组
    console.log(message)
    if (!state.threads[message.group_id]) {
      createThread(state, {
        group_id: message.group_id,
        group_name: message.group_name
      })
    }
    addMessage(state, message)
  },
  //删除讨论组
  [types.DELETE_THREAD](state,payload){
    Vue.delete(payload.threads,payload.id)
  },
  // 切换讨论组
  [types.SWITCH_THREAD] (state, { id, members }) {
    if(members.length != 0) {
      addMember(state, members, id)
      setCurrentThread(state, id)
    } else {
      setCurrentThread(state, id)
    }
  },
  // 创建讨论组
  [types.CREATE_THREAD](state, thread) {
    createThread(state, thread)
  }
}

// Vue.set(obj, newProp, value)
function createThread (state, thread) {
  Vue.set(state.threads, thread.group_id, {
    ...thread,
    messages: [],
    members: thread.members ? thread.members : [],
    lastMessage: null
  })
}

function addMessage (state, message) {
  // add a `isRead` field before adding the message
  message.isRead = message.group_id == state.currentThreadID

  // 添加到对应的聊天线程中
  const thread = state.threads[message.group_id]
  // 如果消息不存在就添加进组消息流中
  if (!thread.messages.some(id => id === message.id)) {
    thread.messages.push(message.id)
    thread.lastMessage = message
  }
  // 添加到message map中
  Vue.set(state.messages, message.id, message)
}

// 添加讨论组成员
function addMember (state, members, threadID) {
  const thread = state.threads[threadID]
  members.forEach(member => {
    thread.members.push(member)
  })
}

function setCurrentThread (state, id) {
  state.currentThreadID = id
  console.log(id)
  if (!state.threads[id]) {
    console.warn('[setCurrentThread]Unexist thread')
  }
  // mark thread as read
  state.threads[id].messages.forEach( e => {
    state.messages[e].isRead = true
  })
  if(state.threads[id].lastMessage) {
    state.threads[id].lastMessage.isRead = true
  }
}
