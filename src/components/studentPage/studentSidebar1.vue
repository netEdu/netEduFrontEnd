<template>
  <div class="student-information">
    <div class="el-card box-card">
      <el-row :gutter="20">
        <el-col :span="16"><div class="grid-content bg-purple">
          <span>{{$data.formData.studentInformation.name}}</span>
        </div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple"><span></span></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8"><div class="grid-content bg-purple"><span></span></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple"><span></span></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"><span></span></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"><span></span></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple"><span></span></div></el-col>
        <el-col :span="16"><div class="grid-content bg-purple"><span></span></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"><span></span></div></el-col>
      </el-row>
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
      console.info(this.formData.studentId)
      var url=URL_DATA.QUERY_STUDENT_INFO+"?student_id="+1
      this.$axios({
        method: 'get',
        url: url,
        data: this.formData
      }).then(res => {
        this.formData.studentInformation=res.data
      })
    },
    methods:{

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
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>
