<style src="./chat.css"></style>

<template>
  <el-card>
    <h2>
      讨论组
      <el-button v-if="!classExist && !isStudent" type="text" @click.prevent="chooseClass">加入课堂讨论组</el-button>
      
      <el-button v-if="classExist && !isStudent" :disabled="hasBeenExam" type="text" @click.prevent="startExam">开始考试</el-button>
      <el-button v-if="classExist && !isStudent" :disabled="hasBeenTeacherComment" type="text" @click.prevent="startTeacherComment">开始教师评价</el-button>
      <el-button v-if="classExist && !isStudent" :disabled="hasBeenStudentComment" type="text" @click.prevent="startStudentComment">开始学生互评</el-button>
      <el-button v-if="classExist && !isStudent" type="text" @click.prevent="giveWarn">发出警告</el-button>
      <el-button v-if="isStudent" type="text" @click.prevent="giveQuestion">举手</el-button>
    </h2>
    
    <thread-section></thread-section>
    <member-section></member-section>
    <message-section></message-section>
    <choose-dialog 
      :dialog-form-visible.sync="dialogFormVisible" 
      :current-view="view" 
      :obj-data="dialogObjData"
      :close-on-press-escape="dialogControl.closeOnPressEscape"
      :close-on-click-modal="dialogControl.closeOnClickModal"
      :show-close="dialogControl.showClose"
      :title="dialogTitle"></choose-dialog>
  </el-card>
</template>

<script>
  import ThreadSection from './ThreadSection.vue'
  import MessageSection from './MessageSection.vue'
  import MemberSection from './MemberSection.vue'
  import ChooseDialog from '../dialog.vue'
  import { webSocket } from '../../../js/web-socket'

  export default {
    name: 'chatRoom',
    data() {
      return {
        view: '',
        dialogControl: {
          closeOnPressEscape: false,
          closeOnClickModal: false,
          showClose: false
        },
        dialogObjData: {
          type: 0
        },
        classExist: false,
        dialogFormVisible: false,
        dialogTitle: '',
        hasBeenExam: false,
        hasBeenTeacherComment: false,
        hasBeenStudentComment: false,
        isStudent: sessionStorage.getItem('identity') === 'Student'
      }
    },
    methods: {
      chooseClass() {
        this.dialogControl.closeOnClickModal = false
        this.dialogControl.closeOnPressEscape = false,
        this.dialogControl.showClose = false
        this.view = 'classForm'
        this.dialogTitle = '选择班级'
        this.dialogFormVisible = true
        this.classExist = true
      },
      // 发出警告
      giveWarn() {
        console.log('giving warn')
        let student_id = 1
        webSocket().send('5,' + student_id)
      },
      // 开始考试
      startExam() {
        this.$confirm('确定要开始考试吗（只可以进行一次）？', '考试开始', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.hasBeenExam = true
          let paper_id = '1'
          // TODO: 开始考试ws逻辑
          this.dialogControl.closeOnClickModal = true
          this.dialogControl.closeOnPressEscape = true,
          this.dialogControl.showClose = true
          this.view = 'paperForm'
          this.dialogTitle = '选择试卷'
          this.dialogFormVisible = true
          // webSocket().send('2,' + sessionStorage.getItem('class') + ',' + paper_id)
        }).catch(e => {
          console.log(e)
          this.$message({
            type: 'info',
            message: '已取消考试开始'
          });
        })
      },
      // 开始教师评价
      startTeacherComment() {
        this.$confirm('确定要开始教师评价吗（只可以进行一次）？', '教师评价', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.hasBeenTeacherComment = true
          // TODO: 教师评价ws逻辑
          this.dialogObjData.type = 3
          this.dialogControl.closeOnClickModal = true
          this.dialogControl.closeOnPressEscape = true
          this.dialogControl.showClose = true
          this.view = 'commentForm'
          this.dialogTitle = '选择评教问卷'
          this.dialogFormVisible = true
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消考试开始'
          });
        })
      },
      // 开始学生互评
      startStudentComment() {
        this.$confirm('确定要开始教学生互评吗（只可以进行一次）？', '学生互评', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.hasBeenStudentComment = true
          // TODO: 开始考试ws逻辑
          this.dialogObjData.type = 4
          this.dialogControl.closeOnClickModal = true
          this.dialogControl.closeOnPressEscape = true
          this.dialogControl.showClose = true
          this.view = 'commentForm'
          this.dialogTitle = '选择评教问卷'
          this.dialogFormVisible = true
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消考试开始'
          });
        })
      },
      // 举手
      giveQuestion() {
        this.dialogControl.closeOnClickModal = true
        this.dialogControl.closeOnPressEscape = true,
        this.dialogControl.showClose = true
        this.view = 'handUp'
        this.dialogTitle = '举手消息'
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
