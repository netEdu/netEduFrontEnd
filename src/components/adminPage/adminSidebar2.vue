<template>
  <el-card class="box-card" shadow="always">
    <el-form :model="formData"
             :rules="rules"
             ref="addStudentInformation"
             status-icon
             label-width="100px"
             label-position="left">
      <h2>添加教师信息</h2>
      <el-form-item label="登录名" prop="username">
        <el-input v-model="formData.username" id="username"/>
      </el-form-item>
      <el-form-item prop="name" label="姓名">
        <el-input v-model="formData.name"/>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="formData.sex" label="0" border >男</el-radio>
        <el-radio v-model="formData.sex" label="1" border>女</el-radio>
      </el-form-item>
      <el-form-item label="出生日期" prop="birth">
        <el-date-picker type="date"  :editable="false"  format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="formData.birth"></el-date-picker>
      </el-form-item>
      <el-form-item label="职务" prop="position">
        <el-input v-model="formData.position" placeholder="请输入职务"/>
      </el-form-item>
      <el-form-item label="籍贯" prop="origin">
        <el-input v-model="formData.origin" placeholder="请输入籍贯"/>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="formData.email" placeholder="请输入邮箱"/>
      </el-form-item>
      <el-form-item label="身份证号" prop="identity">
        <el-input v-model="formData.identity" placeholder="请输入身份证号"/>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="formData.phone" placeholder="请输入联系电话"/>
      </el-form-item>
      <el-button type="primary" @click.prevent="onSubmit('addStudentInformation')">提交</el-button>
    </el-form>
  </el-card>

</template>

<script>
  import { URL_DATA } from '../../js/util-data'
  export default {
    name: "adminSidebar2",
    data(){
      var validatePhone = (rule, value, callback) => {
        if (value==""){
          callback(new Error("联系电话不能为空"))
        }else{
          if (value.match('^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$')) {
            callback();
          }else{
            callback(new Error("请输入正确的电话号码"))
          }
        }
      }
      var testTeacherUsernameRepeat = (rule, value, callback) =>{
          if(this.formData.username!=""){
            var url=URL_DATA.TEST_TEACHER_USERNAME_REPEAT+"?username="+this.formData.username
            this.$axios({
              method:"get",
              url:url
            }).then(res=>{
              if (res.data=="ALREADY EXIST"){
                callback(new Error("登录名已存在"))
              }else{
                callback()
              }
            })
          }else{
            callback(new Error("请输入登录名"))
          }
      }
      return {
        formData:{
          username:"",
          name:"",
          sex:"0",
          identity:"",
          birth:"",
          origin:"",
          email:"",
          phone:"",
          position:""
        },
        rules:{
          username:[{required:true,validator: testTeacherUsernameRepeat,trigger: 'blur'}],
          name:[{required:true,message:"请输入姓名"}],
          sex:[{required:true,message:"请输入性别"}],
          identity:[{required:true,message:"请输入身份证号"}],
          birth:[{required:true,message:"请输入生日"}],
          origin:[{required:true,message:"请输入籍贯"}],
          position:[{required:true,message:"请输入职位"}],
          phone:[ {required: true, validator: validatePhone}],
          email:[
            {required: true,message:"请输入邮箱"},
            {type:'email',message:'请输入正确的邮箱格式'}
          ]}
      }
    },
    methods:{
      onSubmit(formName){
        this.$refs[formName].validate((valid) => {
          const loading = this.$loading({
            lock: true,
            text: '拼命添加中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          if (valid){
            this.$axios({
              method:"post",
              url:URL_DATA.ADD_TEACHER_INFORMATION,
              data:this.formData
            }).then(res=>{
              setTimeout(()=>{
                if (res.status==200){
                  this.$message({
                    showClose: true,
                    message: '添加成功',
                    type: 'success'
                  });
                  this.formData={}
                }else{
                  this.$message({
                    showClose: true,
                    message: '添加失败',
                    type: 'error'
                  });
                }
                loading.close()
              },1000)
            })
          }else{
            loading.close()
            return false
          }
        })
      }
    }
  }

</script>

<style scoped>
  .el-card {
    width: 70%;
    margin: 0 auto;
  }

</style>
