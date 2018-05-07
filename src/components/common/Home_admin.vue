<template>
  <div class="wrapper">
    <v-head> </v-head>
    <v-sidebar> </v-sidebar>
    <div class="content">
      <transition enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutRight">
        <router-view> </router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import vHead from './Header_admin.vue';
  import vSidebar from './Sidebar_admin.vue';
  export default {
    components:{
      vHead,
      vSidebar
    }
  }
</script>
