<template>
  <div class="student-information">
    <div class="el-card box-card">
      <div class="card-style">
      <h2>查看学生个人资料</h2>
      <el-row :gutter="20">
        <el-col :span="12"><div class="grid-content">
          <span class="fstyle">学生ID:</span><span class="fstyle">{{$data.formData.studentInformation.student_id}}</span>
        </div></el-col>
        <el-col :span="12">
          <div class="grid-content">
            <span class="fstyle">学生姓名:</span><span class="fstyle">{{$data.formData.studentInformation.name}}</span>
          </div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content">
            <span class="fstyle">性别:</span><span class="fstyle">{{$data.formData.studentInformation.sex}}</span>
          </div></el-col>
        <el-col :span="12">
          <div class="grid-content">
            <span class="fstyle">生日:</span><span class="fstyle">{{$data.formData.studentInformation.birth}}</span>
          </div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content">
            <span class="fstyle">身份证号:</span><span class="fstyle">{{$data.formData.studentInformation.identity}}</span>
          </div></el-col>
        <el-col :span="12">
          <div class="grid-content">
            <span class="fstyle">邮箱:</span><span class="fstyle">{{$data.formData.studentInformation.email}}</span>
          </div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content">
            <span class="fstyle">籍贯:</span><span class="fstyle">{{$data.formData.studentInformation.origin}}</span>
          </div></el-col>
        <el-col :span="12">
          <div class="grid-content">
            <span class="fstyle">电话:</span><span class="fstyle">{{$data.formData.studentInformation.phone}}</span>
          </div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="grid-content">
            <span class="fstyle">班级:</span><span class="fstyle">{{$data.formData.studentInformation.class_num}}班</span>
          </div></el-col>
        <el-col :span="12">
          <div class="grid-content">

          </div></el-col>
      </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import { URL_DATA } from '../../js/util-data'
  export default {
    name: "studentSidebar1",
    data () {
      return {
        formData: {
          studentId:'',
          studentInformation:{}
        }
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
        if (res.data.sex==0){
            res.data.sex="男";
        }else if (res.data.sex==1){
            res.data.sex="女";
        }
        if ("birth" in res.data){
          var birth= res.data.birth
          //birth=birth.substring(0,9)
         // res.data.birth=birth.split('-')[0]+"年"+birth.split('-')[1]+"月"+birth.split('-')[2]+"日"
        }
        this.formData.studentInformation=res.data
      })
    }

  }

</script>


<style scoped>
  .student-information{
    position: absolute;
    top: 70px;
    bottom: 0;
    width:90%;
    padding: 40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    content: 'center';
  }
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    max-height: 36px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }


  .fstyle{
    font-size:20px;
    line-height: 36px;
  }
  .card-style{
    padding: 20px
  }
</style>
