<template>

  <li
    class="thread-list-item"
    :class="{ active: active }">
    <div @click="$emit('switch-thread', thread.group_id)" style="float: left;width: 100px;margin: 0px;padding: 0px">
    <h5 class="thread-name">{{ thread.group_name }}</h5>
    <div class="thread-time">
      <span v-if="thread.lastMessage">{{ thread.lastMessage.timestamp | time }}</span>
    </div>
    <div class="thread-last-message">
      {{ thread.lastMessage === null ? '暂时没有消息' : thread.lastMessage.text }}
    </div>
    </div>
    <div class="delete-thread" v-if="thread.group_id.toString().indexOf('_') == -1">
      <el-button type="danger" icon="el-icon-delete" circle @click="$emit('delete-thread', thread.group_id)"></el-button>
    </div>
  </li>


</template>

<script>
export default {
  name: 'Thread',
  props: {
    thread: Object,
    active: Boolean
  },
  methods:{
    deleteByGroupId(row){
      this.thread.forEach
    }
  }
}
</script>

<style scoped>


</style>
