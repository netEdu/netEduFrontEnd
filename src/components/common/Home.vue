<template>
  <div class="wrapper">
    <v-head> </v-head>
    <v-sidebar> </v-sidebar>
    <div class="content">
      <transition name="slide-fade" mode="out-in">
	      <router-view> </router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import vHead from './Header.vue'
import vSidebar from './Sidebar.vue'
export default {
  components: {
    vHead,
    vSidebar
  }
}
</script>
<style scoped>
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter {
  transform: translateY(800px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateY(-800px);
  opacity: 0;
}
.content {
  background: #2e363f;
}
.el-card {
  width: 100%;
  margin: 0 auto;
}
</style>
