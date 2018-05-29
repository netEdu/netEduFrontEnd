<style src="./chat.css"></style>

<template>
  <el-card>
    <h2>课堂讨论</h2>
    <thread-section></thread-section>
    <member-section></member-section>
    <message-section></message-section>
  </el-card>
</template>

<script>
  import ThreadSection from './ThreadSection.vue'
  import MessageSection from './MessageSection.vue'
  import MemberSection from './MemberSection.vue'

  export default {
    name: 'chatRoom',
    components: {
      ThreadSection,
      MessageSection,
      MemberSection
    }
  }
</script>

<style scoped>
</style>
