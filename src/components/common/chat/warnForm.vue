<template>
  <el-form :model="chosen">
    <el-form-item 
      prop="chosenStudents" 
      label="学生列表" 
      :rules="[
        { required: true, message: '请选择至少一个学生' }
      ]">
      <el-select v-model="chosen.chosenStudents" multiple placeholder="请选择学生" >
        <el-option
          v-for="student of students"
          :key="student.student_id"
          :label="student.name"
          :value="student.student_id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-button type="warning" @click.prevent="warnStudents">发出警告</el-button>
  </el-form>
</template>
<script>
import { URL_DATA } from '../../../js/util-data'
import { webSocket } from '../../../js/web-socket' 
export default {
  name: 'ClassForm',
  data() {
    return {
      chosen: {
        chosenStudents: []
      },
      classNum: null,
      students: []
    }
  },
  methods: {
    warnStudents() {
      webSocket().send('5,' + this.chosen.chosenStudents.join('_') + ',' + this.classNum)
      this.$emit('close-dialog')
      this.$message.warning('已对所选学生发出警告')
    }
  },
  mounted() {
    let classThread = this.$store.getters['chat/classThread']
    this.classNum = classThread.group_id.split('_')[1]
    this.students = classThread.members
  }
}
</script>