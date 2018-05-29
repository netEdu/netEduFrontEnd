<template>
	<el-card>
    <course-form title="申请课程"> </course-form>
	</el-card>
</template>

<script>
import courseForm from '../teacherComponent/courseForm'
export default {
  name: 'sidebar1',
  components: {
    courseForm
  }
}
</script>

<style scoped>
.el-card {
  width: 70%;
  margin: 0 auto;
}
</style>