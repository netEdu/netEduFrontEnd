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
    <form-dialog
      :dialog-form-visible.sync="studentDialogFormVisible" :obj-data="objData"
      current-view="studentQuestionnaire"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :show-close="false"
      title="开始学生评价"></form-dialog>
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
            break
          case '2':
            this.objData.paper_id = protocol.split(',')[1]
            this.dialogFormVisible = true
            break
          case '3':
            this.objData.questionnaire_id = protocol.split(',')[2]
            this.objData.teacher_id = protocol.split(',')[1]
            this.teacherDialogFormVisible = true
            break
          case '4':
            this.studentDialogFormVisible = true
            break
          case '5':
            this.$notify({
              title: '警告',
              message: '您收到了老师的警告',
              type: 'warning'
            });
            break
        }
      }
      return {
        // 控制开始测试的模态框弹出
        dialogFormVisible:false,
        // 控制教师评价的模态框弹出
        teacherDialogFormVisible:false,
        // 控制学生互评的模态框弹出
        studentDialogFormVisible:false,
        objData:{
          // 开始测试的试卷id
          paper_id: 0,
          // 学生评价教师的教师id和试卷id
          teacher_id: 0,
          questionnaire_id: 0,
          // 学生互评的班号
          class_num: sessionStorage.getItem('class_num')
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
