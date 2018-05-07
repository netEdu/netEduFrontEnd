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
        // 组id
        id,
        // 组名
        name,
        // 信息流
        messages: [...ids],
        // 最新信息
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