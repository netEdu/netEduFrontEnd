<template>

  <el-card class="box-card" shadow="always">
    <el-form :model="formData"
             :rules="rules"
             ref="studentInformationForm"
             status-icon
             label-width="100px"
             label-position="left">
      <h2>修改个人信息</h2>
      <el-form-item prop="name" label="姓名">
        <el-input v-model="formData.name"/>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="formData.sex" label="0" border disabled>男</el-radio>
        <el-radio v-model="formData.sex" label="1" border disabled>女</el-radio>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker type="date"  format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" v-model="formData.birth" disabled></el-date-picker>
      </el-form-item>
      <el-form-item label="班号">
        <el-input v-model="formData.class_num" disabled/>
      </el-form-item>
      <el-form-item label="籍贯">
        <el-input v-model="formData.origin" placeholder="请输入籍贯" disabled/>
      </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="formData.email" placeholder="请输入邮箱"/>
        </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="formData.identity" disabled/>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="formData.phone" placeholder="请输入联系电话"/>
      </el-form-item>
      <el-button type="primary" @click.prevent="onSubmit('studentInformationForm')">提交申请</el-button>
    </el-form>
  </el-card>

</template>

<script>
  import { URL_DATA } from '../../js/util-data';
  export default {
    name: "studentSidebar2",
    data () {
      var validatePhone = (rule, value, callback) => {
          if (value.match('^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$')) {
            callback();
          }else{
            callback(new Error("请输入正确的电话号码"))
          }

      };
      return {
        formData: {
            password:'',
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
        },
        rules:{
          name:[{required:true,message:"请输入姓名"}],
          phone:[ {required: true, validator: validatePhone}],
          email:[
            {required: true,message:"请输入邮箱"},
            {type:'email',message:'请输入正确的邮箱格式'}
          ]}
      }
    },
    created(){
      this.formData.studentId=sessionStorage.getItem("userId")
      var url=URL_DATA.QUERY_STUDENT_INFO+"?student_id="+this.formData.studentId
      this.$axios({
        method: 'get',
        url: url,
        data: this.formData
      }).then(res => {
        this.formData=res.data
      })
    },
    methods:{
      onSubmit(formName){
        this.formData.studentId=sessionStorage.getItem("userId")
        var _this=this
        this.$refs[formName].validate((valid) => {
          const loading = this.$loading({
            lock: true,
            text: '拼命上传中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          if (valid){
            this.$axios({
              method:"put",
              url:URL_DATA.UPDATE_STUDENT_INFORMATION,
              data:_this.formData
            }).then(res=>{
              if (res.status==200){
                this.$message({
                  showClose: true,
                  message: '修改成功',
                  type: 'success'
                });
              }else{
                this.$message({
                  showClose: true,
                  message: '修改失败',
                  type: 'error'
                });
              }
              loading.close();
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
