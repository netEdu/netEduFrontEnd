<template>
  <div id="app">
    <router-view> </router-view>
  </div>
</template>

<style>
  @import "../static/css/main.css";
  @import "../static/css/color-dark.css";     /*深色主题*/
  #app {
    -webkit-font-smoothing: antialiased;
  }
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
  .warning-card {
    background: oldlace;
  }
  .danger-card {
    background: rgb(253, 183, 183);
  }
  .success-card {
    background: #f0f9eb;
  }
  /* 折叠表格卡片 */
  .paper-table-expand {
    font-size: 0;
  }
  .paper-table-expand label {
    width: 70px;
    color: #99a9bf;
  }
  .paper-table-expand>.paper-table-answer {
    background: #6fd9ff;
    border-radius: 4px;
    padding: 10px;
  }
  .paper-table-expand>.paper-table-answer label {
    color: #ffffff;
  }
  .paper-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  ::-webkit-scrollbar {
    display:none
  }
  h2 {
    margin: 0 auto 20px auto;
  }
</style>
