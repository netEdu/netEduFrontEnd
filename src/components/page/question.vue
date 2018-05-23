<template>
  <el-card>
    <h2>查看/编辑题目</h2>
    <el-form class="card-form" :model="selectForm" :inline="true" ref="courseList">
      <el-form-item label="教师姓名">
        <el-input v-model="selectForm.name" placeholder="教师姓名" />
      </el-form-item>
      <el-form-item label="考题类型">
        <el-select v-model="selectForm.question_type" placeholder="请选择活动区域">
          <el-option label="判断" value="0"></el-option>
          <el-option label="选择" value="1"></el-option>
          <el-option label="主观" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="primary" @click="onSubmit()">查询</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    name: "question",
    data() {
      return {
        selectForm: {
          name: '',
          question_type: '',
          startDate: '',
          endDate: ''
        },
      }
    }
  }
</script>

<style scoped>
  /* 表单 */
  .card-form {
    border: 1px #cccccc solid;
    border-radius: 4px;
    padding: 15px 10px 0 10px;
    -moz-box-shadow: 0px 5px 10px #696969;
    -webkit-box-shadow: 0px 5px 10px #696969;
    box-shadow: 0px 5px 10px #696969;
    margin-bottom: 0;
    position: relative;
    z-index: 101;
  }
</style>