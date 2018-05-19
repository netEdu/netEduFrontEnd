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
    width: 50px;
    color: #99a9bf;
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
