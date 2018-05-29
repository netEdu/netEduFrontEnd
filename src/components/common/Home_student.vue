<template>
  <div class="wrapper">
    <v-head> </v-head>
    <v-sidebar> </v-sidebar>
    <div class="content">
      <transition enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutRight"  mode="out-in">
        <router-view> </router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import vHead from './Header_student.vue';
  import vSidebar from './Sidebar_student.vue';
  import { webSocket } from '../../js/web-socket'
  export default {
    // websocket全局接收消息
    data() {
      webSocket().onmessage = (evt) => {
        let protocol = evt.data.split(']')[0]
        let text = evt.data.split(']')[1]
        // 组id
        let group_id = protocol.split(',')[1]
        // 消息id
        let id = protocol.split(',')[2]
        // 组名
        let group_name = protocol.split(',')[3]
        // 消息发送者
        let author = protocol.split(',')[4]
        // 时间戳
        let timestamp = protocol.split(',')[5]
        // let thread = _this.$store.state.threads[threadID]
        console.log('onreceive')
        this.updateMessage({
          group_id,
          id,
          group_name,
          author,
          timestamp,
          text
        })
      }
      return {}
    },
    methods: {
      updateMessage(payload) {
        this.$store.dispatch('chat/receiveMessage', payload)
      }
    },
    components:{
      vHead,
      vSidebar
    }
  }
</script>
