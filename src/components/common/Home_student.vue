<template>
  <div class="wrapper">
    <v-head> </v-head>
    <v-sidebar> </v-sidebar>
    <div class="content">
      <transition enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutRight"  mode="out-in">
        <router-view> </router-view>
      </transition>
    </div>
    <form-dialog
      :dialog-form-visible.sync="dialogFormVisible" :obj-data="objData"
      current-view="beginTest"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :show-close="false"
      title="开始测试"></form-dialog>
    <form-dialog
      :dialog-form-visible.sync="teacherDialogFormVisible" :obj-data="objData"
      current-view="teacherQuestionnaire"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :show-close="false"
      title="开始教师评价"></form-dialog>
  </div>
</template>

<script>
  import vHead from './Header_student.vue';
  import vSidebar from './Sidebar_student.vue';
  import { webSocket } from '../../js/web-socket'
  import FormDialog from "./dialog"
  export default {
    // websocket全局接收消息
    data() {
      webSocket().onmessage = (evt) => {
        let protocol = evt.data.split(']')[0]
        //WebSocket 通用数据
        let state=protocol.split(",")[0]
        let paper_id=protocol.split(",")[1]
        switch(state){
          case '1':
            return null
            break
          case '2':
            this.objData.paper_id=2
            this.dialogFormVisible=true
            break
          case '3':
            return null
            break
          case '4':
            return null
            break
          case '5':
            this.$notify({
              title: '警告',
              message: '您收到了老师的警告',
              type: 'warning'
            });
            break
          case '6':
            return null
            break
        }
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
      return {
        dialogFormVisible:false,
        teacherDialogFormVisible:true,
        objData:{
          paper_id:1,
          teacher_id:1001,
          questionnaire_id:3
        }
      }
    },
    methods: {
      updateMessage(payload) {
        this.$store.dispatch('chat/receiveMessage', payload)
      }
    },
    components:{
      FormDialog,
      vHead,
      vSidebar
    }
  }
</script>
