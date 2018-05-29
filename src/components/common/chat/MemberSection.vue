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
      currentMembers: 'currentMembers'
    })
  },
  components: {
    Member
  },
  methods: {
    newGroup() {
      // TODO: 新增讨论组vue
    }
  }
}
</script>
