<template>
  <el-card class="box-card" shadow="always">
    <el-form :model="formData"
             :rules="rules"
             ref="addTeacherQuestion"
             status-icon
             label-width="100px"
             label-position="left">
      <h2>添加教师问卷问题</h2>
      <el-form-item label="创建者" prop="creator">
        <el-input v-model="formData.creator"/>
      </el-form-item>
      <el-form-item label="问题类型">
        <el-radio v-model="formData.survey_type" label="0" border >单选</el-radio>
        <el-radio v-model="formData.survey_type" label="1" border>简答</el-radio>
      </el-form-item>
      <el-form-item label="问题内容" prop="survey_content">
        <el-input type="textarea" v-model="formData.survey_content" placeholder="请输入问题内容"/>
      </el-form-item>
      <el-button type="primary" @click.prevent="onSubmit('addTeacherQuestion')">提交</el-button>
    </el-form>
  </el-card>

</template>

<script>
  import { URL_DATA } from '../../js/util-data'
  export default {
    data(){
      return{
        formData:{
          survey_type:"0",
          creator:"",
          survey_content:""
        },
        rules: {
          creator: [
            { required: true, message: '请输入创建者'}
          ],
          survey_content: [{ required: true, message: '请输入问题内容'}]
        }
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
            var url=URL_DATA.ADD_SURVEY_QUESTION
            this.$axios({
              url:url,
              method:'post',
              data:this.formData
            }).then(res=>{
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
              setTimeout(() => {
                loading.close()
              },1000)
            })
          }else{
            setTimeout(() => {
              loading.close()
            },1000)
            return false;
          }
        })
        }
      }
}
</script>

<style>


</style>
