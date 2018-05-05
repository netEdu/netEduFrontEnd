import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

export default {
  state: {
    // 启用命名空间
    namespaced: true,
    messages: {
      /*
      id: {
        id,
        threadId,
        threadName,
        authorName,
        text,
        timestamp,
        isRead
      }
      */
    },
    threads: {
      /*
      id: {
        id,
        name,
        messages: [...ids],
        lastMessage
      }
      */
    },
    currentThread: null
  },
  getters,
  actions,
  mutations
}