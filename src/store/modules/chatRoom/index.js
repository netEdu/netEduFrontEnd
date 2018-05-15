import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

export default {
  // 启用命名空间
  namespaced: true,
  state: {
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
      group_id: {
        // 组id
        group_id,
        // 组名
        group_name,
        // 讨论组参与者
        members: [...{personInfo}],
        // 信息流
        messages: [...ids],
        // 最新信息
        lastMessage
      }
      */
    },
    currentThread: null,
    currentThreadID: null,
  },
  getters,
  actions,
  mutations
}