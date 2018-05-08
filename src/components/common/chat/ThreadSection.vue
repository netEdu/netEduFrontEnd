<template>
  <div class="thread-section">
    <div class="thread-count">
      <span v-show="unreadCount">
        Unread threads: {{ unreadCount }}
      </span>
    </div>
    <ul class="thread-list">
      <thread
        v-for="thread in threads"
        :key="thread.group_id"
        :thread="thread"
        :active="thread.group_id === currentThread.group_id"
        @switch-thread="switchThread">
      </thread>
    </ul>
  </div>
</template>

<script>
import Thread from './Thread.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'ThreadSection',
  components: { Thread },
  computed: {
    ...mapGetters({
      threads: 'chat/threads',
      currentThread: 'chat/currentThread'
    }),
    unreadCount () {
      const threads = this.threads
      return Object.keys(threads).reduce((count, id) => {
        return threads[id].lastMessage == null 
          ? 0 
          : threads[id].lastMessage.isRead
            ? count
            : count + 1
      }, 0)
    }
  },
  methods: {
    // 切换讨论组
    switchThread (id) {
      console.log(id)
      console.log(this.threads[id].members.length)
      this.$store.dispatch('chat/switchThread', { 
        id,
        membersId: this.threads[id].person_id,
        membersLength: this.threads[id].members.length,
      })
    }
  }
}
</script>
