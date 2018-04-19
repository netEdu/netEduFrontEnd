<template>
  <div class="wrapper">
    <v-head> </v-head>
    <v-sidebar> </v-sidebar>
    <div class="content">
      <transition name="move" mode="out-in">
	      <router-view> </router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import vHead from './Header_student.vue';
  import vSidebar from './Sidebar_student.vue';
  export default {
    components:{
      vHead,
	    vSidebar
    }
  }
</script>
