<template>
  <div id="app">
    <router-view> </router-view>
  </div>
</template>
<style>
  @import "../static/css/main.css";
  @import "../static/css/color-dark.css";     /*深色主题*/
  .warning-card {
    background: oldlace;
  }
  .danger-card {
    background: rgb(253, 183, 183);
  }
  .success-card {
    background: #f0f9eb;
  }
  ::-webkit-scrollbar {
    display:none
  }
  h2 {
    margin: 0 auto 20px auto;
  }
</style>
