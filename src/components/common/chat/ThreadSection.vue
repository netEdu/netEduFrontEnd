<template>
  <div class="thread-section">
    <div class="thread-count">
      <span>
        <h3 style="display: inline-block">讨论组</h3>
        <el-tag v-show="unreadCount > 0">未读: {{ unreadCount }}</el-tag>
      </span>
    </div>
    <el-card class="thread-list">
      <ul>
        <thread
          v-for="thread in threads"
          :key="thread.group_id"
          :thread="thread"
          :active="thread.group_id === currentThread.group_id"
          @switch-thread="switchThread"
          @delete-thread="deleteThread">

        </thread>
      </ul>
    </el-card>
  </div>
</template>

<script>
import Thread from './Thread.vue'
import { mapGetters } from 'vuex'
import {URL_DATA} from "../../../js/util-data";

export default {
  name: 'ThreadSection',
  components: { Thread },
  computed: {
    ...mapGetters('chat', {
      threads: 'threads',
      currentThread: 'currentThread',
      currentMessage: 'currentMessage'
    }),
    unreadCount () {
      const threads = this.threads
      let count = 0
      Object.keys(threads).forEach( id => {
        threads[id].messages.forEach( e => {
          this.currentMessage[e].isRead ? count : count++
        })
      })
      return count
    }
  },
  methods: {
    //删除讨论组
    deleteThread(id){
      const loading = this.$loading({
        lock: true,
        text: '删除中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let url=URL_DATA.DELETE_THREAD
        this.$store.dispatch('chat/deleteThread', {id:id,threads:this.threads})
        this.$axios({
          url:url,
          method:'delete',
          data:{group_id:id}
        }).then((res)=>{
          setTimeout(()=>{
            loading.close()
            this.$message({
              message:'删除成功',
              type:'success'
            })
          },500)
        }).catch((res)=>{
          setTimeout(()=>{
            loading.close()
            this.$message({
              message:'网络异常',
              type:'error'
            })
          },500)
        })
    },
    // 切换讨论组
    switchThread (id) {
      this.$store.dispatch('chat/switchThread', {
        id,
        membersId: this.threads[id].person_id,
        membersLength: this.threads[id].members.length,
      })
    }
  }
}
</script>
