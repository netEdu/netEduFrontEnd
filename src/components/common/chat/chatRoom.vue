<style src="./chat.css"></style>

<template>
  <el-card>
    <h2>课堂讨论</h2>
    <!-- TODO: 聊天室功能 -->
    <thread-section></thread-section>
    <message-section></message-section>
  </el-card>
</template>

<script>
  import ThreadSection from './ThreadSection.vue'
  import MessageSection from './MessageSection.vue'

  export default {
    name: 'chatRoom',
    components: {
      ThreadSection,
      MessageSection
    }
  }
</script>

<style scoped>
</style>
