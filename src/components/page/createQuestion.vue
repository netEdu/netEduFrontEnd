<template>
  <el-card>
    <question-form title="添加问题"></question-form>
  </el-card>
</template>
<script>
import QuestionForm from '../teacherComponent/questionForm'
export default {
  name: 'CreateQuestion',
  components: {
    QuestionForm
  }
}
</script>
