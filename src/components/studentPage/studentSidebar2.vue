<template>
  <el-card class="box-card" shadow="always">
    <el-form :model="formData"
             label-width="100px"
             label-position="left">
      <h2>修改个人信息</h2>
      <el-form-item prop="course_name" label="姓名">
        <el-input v-model="formData.username" placeholder="请输入课程名称"/>
      </el-form-item>
      <el-form-item prop="course_name" label="出生日期">
        <el-date-picker type="date" placeholder="选择日期" v-model="formData.username"></el-date-picker>
      </el-form-item>
      <el-form-item prop="course_name" label="籍贯">
        <el-input v-model="formData.username" placeholder="请输入籍贯"/>
      </el-form-item>
      <el-form-item prop="credit" label="邮箱">
        <el-input v-model="formData.username" placeholder="请输入课程学分"/>
      </el-form-item>
      <el-form-item prop="hours" label="身份证号">
        <el-input v-model="formData.username" placeholder="请输入学时"/>
      </el-form-item>
      <el-form-item prop="class_time" label="联系电话">
        <el-input v-model="formData.username" placeholder="请输入课时"/>
      </el-form-item>
      <el-form-item prop="class_time" label="班号">
        <el-input v-model="formData.username" placeholder="请输入课时"/>
      </el-form-item>
      <el-form-item prop="class_num" label="性别">
          <el-radio v-model="formData.username" label="0" border>男</el-radio>
          <el-radio v-model="formData.username" label="1" border>女</el-radio>
      </el-form-item>
      <el-button type="primary" @click.prevent="onSubmit('courseForm')">提交申请</el-button>
    </el-form>
  </el-card>
</template>

<script>
  import { URL_DATA } from '../../js/util-data'
  export default {
    name: "studentSidebar2",
    data () {
      return {
        formData: {
            studentId:'',
            username: '',
            sex:'',
            phone:'',
            name:'',
            identity:'',
            email:'',
            birth:'',
            class_num:'',
            origin:''
        }
      }
    },
    created(){
      this.formData.studentId=sessionStorage.getItem("userId")
      console.info(this.formData.studentId)
      var url=URL_DATA.QUERY_STUDENT_INFO+"?student_id="+1
      this.$axios({
        method: 'get',
        url: url,
        data: this.formData
      }).then(res => {
        this.formData.studentInformation=res.data
        console.info(this.formData.studentInformation)
      })
    },
  }

</script>

<style scoped>
  .el-card {
    width: 70%;
    margin: 0 auto;
  }

</style>
