<template>
  <div id="app">
    <router-view> </router-view>
  </div>
</template>
<style>
  @import "../static/css/main.css";
  @import "../static/css/color-dark.css";     /*深色主题*/
  .el-table .warning-row {
    background: oldlace;
  }
  .el-table .danger-row {
    background: rgb(253, 183, 183);
  }
  .el-table .success-row {
    background: #f0f9eb;
  }
  h2 {
    margin: 0 auto 20px auto;
  }
</style>
