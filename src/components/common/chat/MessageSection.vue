<template>
  <div class="message-section">
    <h3 class="message-thread-heading">{{ thread.name }}</h3>
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
// import * as websocket from '../store/mutation-status'

export default {
  name: 'MessageSection',
  components: { Message },
  data() {
    return {
      author: 'Stranger' + Date.now()
    }
  },
  computed: {
    ...mapGetters({
      thread: 'currentThread',
      messages: 'currentMessages'
    }),
    sortedMessages() {
      return this.messages
        .slice()
        .sort((a, b) => a.timestamp - b.timestamp)
    },
    websocket() {
      return sessionStorage.getItem('webSocket')
    },
    currentMessage() {
      this.websocket.onmessage = (evt) => {
        console.log(evt.data)
        // // 组id
        // let threadID = evt.data.split(',')[0]
        // // 消息发送者
        // let author = evt.data.split(',')[2]
        // // 消息内容
        // let text = evt.data.split(',')[3]
        // // 
        // let thread = _this.$store.state.threads[threadID]
        // this.$store.dispatch('sendMessage', {
        //   text,
        //   author,
        //   thread: thread
        // })
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
    sendMessage (e) {
      let timestamp = Date.now()
      // Websocket 消息发送(异步方法，es2017)
      const send = async () => {
        await this.websocket.send(
          '0,'+ 
          'm_' + timestamp + ',' + 
          this.thread.id + ',' + 
          this.thread.name + ',' + 
          this.author + ']' + 
          e.target.value
        )
      }
      send().then().catch( err => {
        console.log(err)
      })
      // const _this = this
      // // 调用actions的接口 'sendMessage' 发送信息，提供信息的内容和所在的线程
      // this.waitForConnection(function () {
      //   // 设置websocket发送的string的格式
      //   websocket.ws.send(
      //     _this.thread.id + ',' +
      //     _this.thread.name + ',' +
      //     author + ',' +
      //     text
      //   )
      //   if (typeof callback !== 'undefined') {
      //     callback()
      //   }
      // }, 1000)
      // if (text.trim()) {
      //   this.$store.dispatch('sendMessage', {
      //     text,
      //     author,
      //     thread: this.thread
      //   })
      //   e.target.value = ''
      // }
    },
    created() {
      sessionStorage.getItem('webSocket').send('aaa')
    }
  }
}
</script>
