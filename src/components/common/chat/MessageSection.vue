<template>
  <div class="message-section">
    {{ currentMessage }}
    <h3 class="message-thread-heading">{{ thread.group_name }}</h3>
    <ul class="message-list" ref="list">
      <message
        v-for="message in sortedMessages"
        :key="message.id"
        :message="message">
      </message>
    </ul>
    <textarea class="message-composer"
              @keyup.enter="sendMessage"
              placeholder="请输入你的消息"></textarea>
	<input type="text"
	       v-model="author"
	       placeholder="please input author here">
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
    ...mapGetters({
      thread: 'chat/currentThread',
      messages: 'chat/currentMessages'
    }),
    webSocketObj() {
      return webSocket()
    },
    sortedMessages() {
      return this.messages
        .slice()
        .sort((a, b) => a.timestamp - b.timestamp)
    },
    currentMessage() {
      webSocket().onmessage = (evt) => {
        console.log(evt.data)
        let protocol = evt.data.split(']')[0]
        let text = evt.data.split(']')[1]
        // 组id
        let group_id = protocol.split(',')[1]
        // 消息id
        let id = protocol.split(',')[2]
        // 组名
        let group_name = protocol.split(',')[3]
        // 消息发送者
        let author = protocol.split(',')[4]
        // 时间戳
        let timestamp = protocol.split(',')[5]
        // let thread = _this.$store.state.threads[threadID]
        console.log('onreceive')
        this.$store.dispatch('chat/receiveMessage', {
          group_id,
          id,
          group_name,
          author,
          timestamp,
          text
        })
      }
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
      let timestamp = Date.now()
      console.log(this.thread)
      console.log(e.target.value)
      // console.log(this.webSocketObj)
      setTimeout(() => {
        this.webSocketObj.send(
          // 消息类型:index-0
          '1,'+
          // group-id:index-1
          this.thread.group_id + ',' +
          // msg-id:index-2
          'm_' + timestamp + ',' + 
          // group_name:index-3
          this.thread.group_name + ',' + 
          // author:index-4
          // timestamp:index-5
          this.author + ']' + 
          // msg
          e.target.value
        )
        e.target.value = ''
      }, 16);
    }
  }
}
</script>
