import Vue from 'vue'
import Vuex from 'vuex'
// 可以添加其他模块的vuex状态树
import teacher from './modules/teacher/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    // 将所有的状态树装填至vuex modules中
    teacher
  }
})