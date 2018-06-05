<style src="./chat.css"></style>

<template>
  <el-card>
    <h2>
      讨论组
      <el-button v-if="!classExist && !isStudent" type="text" @click.prevent="chooseClass">加入课堂讨论组</el-button>
      <el-button v-if="!isStudent" type="text" @click.prevent="createClass">组讨论组</el-button>
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
    <el-dialog
      :visible.sync="classFormDialogFormVisible"
      title="选择班级">
      <center>
        <el-form :model="chosenClass">
          <el-select v-model="chosenClass.classNumber" placeholder="请选择班级">
            <el-option
              :rules="[
            { required: true, message: '请选择班级' }
          ]"
              v-for="item of classes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" @click.prevent="enterClass">选择</el-button>
        </el-form>
      </center>
    </el-dialog>

    <el-dialog
      :visible.sync="classMumber.dialogFormVisible"
      title="选择成员">
      <center>
        <el-form :model="classMumber" ref="classMum" :inline="true">
          <el-form-item label="请输入组名:" prop="className" :rules="[{required:true,message:'组名不能为空'}]">
          <el-input type="text" placeholder="组名" v-model="classMumber.className"
          ></el-input>
          </el-form-item>
          <el-form-item label="请选择成员:" prop="hasChoosePeople" :rules="[
            { required: true, message: '请选择成员' }
          ]">
          <el-select  multiple v-model="classMumber.hasChoosePeople" placeholder="请选择成员">
            <el-option
              v-for="item of classMumber.people"
              :key="item.student_id"
              :label="item.name"
              :value="item.student_id">
            </el-option>
          </el-select>
          </el-form-item>
          <el-button type="primary" @click.prevent="choosePeople('classMum')">确定</el-button>
        </el-form>
      </center>
    </el-dialog>

  </el-card>
</template>

<script>
  import ThreadSection from './ThreadSection.vue'
  import MessageSection from './MessageSection.vue'
  import MemberSection from './MemberSection.vue'
  import ChooseDialog from '../dialog.vue'
  import { webSocket } from '../../../js/web-socket'
  import {URL_DATA} from "../../../js/util-data";

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
        classFormView:"",
        classFormDialogFormVisible:false,
        dialogObjData: {
          type: 0
        },
        classMumber:{
          people:[],
          dialogFormVisible:false,
          hasChoosePeople:[],
          className:""
        },
        classes: [
          { label: '一班', value: 1 },
          { label: '二班', value: 2 },
          { label: '三班', value: 3 },
          { label: '四班', value: 4 },
          { label: '五班', value: 5 },
          { label: '六班', value: 6 }
        ],
        chosenClass: {
          classNumber: null
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
      //查询所有学生(不包括自己)
      createClass(){
        this.classMumber.dialogFormVisible=true
        if (this.isStudent){
          let url = URL_DATA.QUERY_ALL_STUDENT_WITHOUT_MYSELF
          this.$axios({
            url:url,
            method:'post',
            params:{myId:sessionStorage.getItem("userId")}
          }).then((res)=>{
            console.info(res)
            this.classMumber.people = res.data
          })
        }else{
          let url = URL_DATA.QUERY_STUDENT_INFORMATION
          this.$axios({
            url:url,
            method:'post',
            data:{pageSize:200}
          }).then((res)=>{
            this.classMumber.people = res.data.data.list
          })
        }

      },
      //得到所有的学生并拼接成字符串
      choosePeople(formName){
        this.$refs[formName].validate( valid => {
            if(valid) {{
              let resultPeople = ''
              this.classMumber.hasChoosePeople.forEach((val,index)=>{
                resultPeople+=val+','
              })
              resultPeople +=sessionStorage.getItem("userId")
              this.$store.dispatch('chat/createGroup', {
                group_name: this.classMumber.className,
                person_id: resultPeople
              })
              this.classMumber.dialogFormVisible = false
            }
        }
        })
      },
      enterClass() {
        this.$axios({
          method: 'post',
          url: URL_DATA.ENTER_CLASS,
          params: {
            id: this.chosenClass.classNumber
          }
        }).then( res => {
          this.$store.dispatch('chat/createClassGroup', {
            group_name: this.chosenClass.classNumber + '班',
            group_id: 'class_' + this.chosenClass.classNumber,
            members: res.data.concat()
          })
          // 8,teacherID,classID
          webSocket().send('8,' + sessionStorage.getItem('userId') + ',' + this.chosenClass.classNumber)
          sessionStorage.setItem('class', this.chosenClass.classNumber)
          this.classExist=true
          this.classFormDialogFormVisible=false
          this.$emit('close-dialog')
        })
      },
      chooseClass() {
        this.classFormView = 'classForm'
        this.classFormDialogFormVisible = true
      },
      // 发出警告
      giveWarn() {
        this.dialogControl.closeOnClickModal = true
        this.dialogControl.closeOnPressEscape = true,
        this.dialogControl.showClose = true
        this.view = 'warnForm'
        this.dialogTitle = '向学生发出警告'
        this.dialogFormVisible = true
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
          this.dialogControl.closeOnClickModal = false
          this.dialogControl.closeOnPressEscape = false,
          this.dialogControl.showClose = false
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
          this.dialogControl.closeOnClickModal = false
          this.dialogControl.closeOnPressEscape = false
          this.dialogControl.showClose = false
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
