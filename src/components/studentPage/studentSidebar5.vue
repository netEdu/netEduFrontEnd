<template>
  <el-table :data="formData" style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="课程ID">
            <span>{{ props.row.course_id }}</span>
          </el-form-item>
          <el-form-item label="课程名称">
            <span>{{ props.row.course_name }}</span>
          </el-form-item>
          <el-form-item label="学分">
            <span>{{ props.row.credit }}</span>
          </el-form-item>
          <el-form-item label="学时">
            <span>{{ props.row.hours }}</span>
          </el-form-item>
          <el-form-item label="上课时间">
            <span>{{ props.row.class_time }}</span>
          </el-form-item>
          <el-form-item label="课程简介">
            <span>{{ props.row.course_introduce }}</span>
          </el-form-item>
          <el-form-item label="课程考核方法">
            <span>{{ props.row.assessment_method }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="课程 ID"
      prop="course_id">
    </el-table-column>
    <el-table-column
      label="课程名称"
      prop="course_name">
    </el-table-column>
    <el-table-column
      label="课程描述"
      prop="course_introduce">
    </el-table-column>
  </el-table>

</template>

<script>
  import { URL_DATA } from '../../js/util-data';
  export default {
    name: "studentSidebar5",
    data () {
      return {
        formData:[{
          course_id:"",
          course_name:"",
          credit:"",
          hours:"",
          class_time:"",
          course_introduce:"",
          assessment_method:""
        }]
      }
      },
    created(){
      var url=URL_DATA.QUERY_STUDENT_COURSE_INFORMATION;
      var studentId=sessionStorage.getItem("userId")
      this.$axios({
        method: 'post',
        url: url,
        params:{student_id:studentId}
      }).then(res => {
        this.formData=res.data
        console.info(this.formData)
      })
    },
  }
</script>

<style scoped>

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

</style>
