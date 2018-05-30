<style src="./chat.css"></style>

<template>
  <el-card>
    <h2>讨论组<el-button v-if="!classExist" type="text" @click.prevent="openDialog">加入课堂讨论组</el-button></h2>
    
    <thread-section></thread-section>
    <member-section></member-section>
    <message-section></message-section>
    <choose-dialog 
      :dialog-form-visible.sync="dialogFormVisible" 
      current-view="classForm" 
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :show-close="false"
      title="选择班级"></choose-dialog>
  </el-card>
</template>

<script>
  import ThreadSection from './ThreadSection.vue'
  import MessageSection from './MessageSection.vue'
  import MemberSection from './MemberSection.vue'
  import ChooseDialog from '../dialog.vue'

  export default {
    name: 'chatRoom',
    data() {
      return {
        classExist: false,
        dialogFormVisible: false
      }
    },
    methods: {
      openDialog() {
        this.dialogFormVisible = true
      }
    },
    components: {
      ThreadSection,
      MessageSection,
      MemberSection,
      ChooseDialog
    }
  }
</script>
