<template>
  <div class="wrapper">
    <v-head> </v-head>
    <v-sidebar> </v-sidebar>
    <div class="content">
      <transition name="slide-fade" mode="out-in">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import vHead from './Header.vue'
import vSidebar from './Sidebar.vue'
import { webSocket } from '../../js/web-socket'
export default {
  // websocket全局接收消息
  data() {
    webSocket().onmessage = (evt) => {
      let protocol = evt.data.split(']')[0]
      switch(protocol.split(',')[0]){
        case '1': case '6':
          let text = evt.data.split(']')[1]
          // 组id
          let group_id = protocol.split(',')[1]
          // 消息id
          let id = protocol.split(',')[2]
          // 组名
          let group_name = protocol.split(',')[3]
          // 消息发送者
          let author = protocol.split(',')[4]
          let person_id = protocol.split(',')[5]
          // 时间戳
          let timestamp = protocol.split(',')[6]
          // let thread = _this.$store.state.threads[threadID]
          console.log('onreceive')
          this.updateMessage({
            group_id,
            id,
            group_name,
            author,
            timestamp,
            person_id,
            text
          })
          break
        case '7':
          this.$notify({
            title: '学生举手',
            message: protocol.split(',')[1],
            type: 'success'
          })
          break
      }
    }
    return {}
  },
  methods: {
    updateMessage(payload) {
      this.$store.dispatch('chat/receiveMessage', payload)
    }
  },
  components: {
    vHead,
    vSidebar
  }
}
</script>
<style scoped>
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter {
  transform: translateY(800px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateY(-800px);
  opacity: 0;
}
.content {
  background: #2e363f;
}
.el-card {
  width: 100%;
  margin: 0 auto;
}
</style>
