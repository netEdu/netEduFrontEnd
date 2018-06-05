<template>
  <div class="message-section">
    <h3 class="message-thread-heading">{{ thread.group_name }}</h3>
    <el-card class="message-list-container">
      <ul class="message-list" ref="list">
        <message
          v-for="message in sortedMessages"
          :key="message.id"
          :message="message">
        </message>
      </ul>
      <textarea class="message-composer"
                type="textarea"
                rows="4"
                cols="10"
                @keyup.enter="sendMessage"
                placeholder="请输入你的消息">
      </textarea>
    </el-card>
  </div>
</template>


<script>

import Message from './Message.vue'
import { mapGetters } from 'vuex'
import { webSocket } from '../../../js/web-socket'
// import * as websocket from '../store/mutation-status'
export default {
  name: 'MessageSection',
  components: { Message },
  data() {
    return {
      author: sessionStorage.getItem('username')
    }
  },
  computed: {
    ...mapGetters('chat', {
      thread: 'currentThread',
      messages: 'currentMessages',
    }),
    sortedMessages() {
      return this.messages
        .slice()
        .sort((a, b) => a.timestamp - b.timestamp)
    }
  },
  watch: {
    'thread.lastMessage': function () {
      this.$nextTick(() => {
        const ul = this.$refs.list
        ul.scrollTop = ul.scrollHeight
      })
    }
  },
  methods: {
    // 发送消息
    sendMessage(e) {
      if( e.target.value.length > 1 ){
        let timestamp = Date.now()
        let protocol = isNaN(this.thread.group_id) ? '6,' : '1,'
        let class_num = isNaN(this.thread.group_id) 
          ? this.thread.group_id.split('_')[1] + ',' 
          : ''
        console.log(this.thread.person_id)
        let existPerson = this.thread.person_id.replace(/\,/g, '_') + ','
        console.log(existPerson)
        setTimeout(() => {
          webSocket().send(
            // 消息类型:index-0
            protocol +
            class_num + 
            // group-id:index-1
            this.thread.group_id + ',' +
            // msg-id:index-2
            'm_' + timestamp + ',' + 
            // group_name:index-3
            this.thread.group_name + ',' + 
            // author:index-4
            this.author + ',' +
            // person_id:index-5
            // timestamp:index-6
            existPerson + ']' + 
            // msg
            e.target.value
          )
          e.target.value = ''
        }, 16);
      } else {
        e.target.value = ''
      }
    }
  }
}
</script>
