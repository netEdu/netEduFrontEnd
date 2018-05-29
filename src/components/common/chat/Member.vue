<template>
  <li 
    class="member-list-item"
    @click="$emit('new-group', member.student_id)">
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
