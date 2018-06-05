<template>

  <li
    class="thread-list-item"
    :class="{ active: active }" @click="$emit('switch-thread', thread.group_id)">

    <h5 class="thread-name">{{ thread.group_name }}</h5>
    <div class="thread-time">
      <span v-if="thread.lastMessage">{{ thread.lastMessage.timestamp | time }}</span>
    </div>
    <div class="thread-last-message">
      {{ thread.lastMessage === null ? '暂时没有消息' : thread.lastMessage.text }}
    </div>

  </li>
</template>

<script>
export default {
  name: 'Thread',
  props: {
    thread: Object,
    active: Boolean
  }
}
</script>

<style scoped>


</style>
