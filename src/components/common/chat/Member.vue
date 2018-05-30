<template>
  <li 
    class="member-list-item"
    @click="$emit('new-group', { student_id: member.student_id, student_name: member.name })">
    <h4 class="member-name">
      {{ member.name }}
    </h4>
  </li>
</template>
<script>
export default {
  name: 'Member',
  props: {
    member: Object
  }
}
</script>
