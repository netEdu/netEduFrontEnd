<style src="./chat.css"></style>

<template>
  <el-card>
    <h2>
      讨论组
      <el-button v-if="!classExist && !isStudent" type="text" @click.prevent="openDialog">加入课堂讨论组</el-button>
      
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
  import { webSocket } from '../../../js/web-socket'

  export default {
    name: 'chatRoom',
    data() {
      return {
        classExist: false,
        dialogFormVisible: false,
        hasBeenExam: false,
        hasBeenTeacherComment: false,
        hasBeenStudentComment: false,
        isStudent: sessionStorage.getItem('identity') === 'Student'
      }
    },
    methods: {
      openDialog() {
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
          webSocket().send('2,' + sessionStorage.getItem('class') + ',' + paper_id)
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消考试开始'
          });
        })
      },
      // 举手
      giveQuestion() {

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
