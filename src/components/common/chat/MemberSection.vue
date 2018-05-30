<template>
  <div class="member-section">
    <h3 class="message-thread-heading">成员</h3>
    <el-card class="member-list">
      <ul>
        <member 
          v-for="member of currentMembers"
          :key="member.student_id"
          :member="member"
          @new-group="newGroup"
        ></member>
      </ul>
    </el-card>
  </div>
</template>
<script>
import Member from './Member'
import { mapGetters } from 'vuex'
export default {
  name: 'MemberSection',
  computed: {
    ...mapGetters('chat', {
      currentMembers: 'currentMembers',
      threads: 'threads'
    })
  },
  components: {
    Member
  },
  methods: {
    // 在以前的基础上新建讨论组
    newGroup(student) {
      // 判断是否存在该讨论组
      let group_id = this.$store.getters['chat/ifExistThread'](
        ',' + sessionStorage.getItem('userId') + 
        ',' + student.student_id + 
        ',')
      if(group_id == null) {
        this.$store.dispatch('chat/createGroup', {
          group_name: sessionStorage.getItem('username') + '和' + student.student_name,
          person_id: sessionStorage.getItem('userId') + ',' + student.student_id
        })
      } else {
        this.$store.dispatch('chat/switchThread', { 
          id: group_id,
          membersId: this.threads[group_id].person_id,
          membersLength: this.threads[group_id].members.length,
        })
      }
    }
  }
}
</script>
