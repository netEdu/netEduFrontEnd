<template>
	<el-card class="box-card" shadow="always">
		<el-form :model="formData"
		         :rules="rules"
		         ref="courseForm"
		         label-position="top">

			<el-form-item prop="course_name" label="课程名称">
				<el-input v-model="formData.course_name" placeholder="请输入课程名称"/>
			</el-form-item>
			<el-form-item prop="credit" label="课程学分">
				<el-input v-model.number="formData.credit" placeholder="请输入课程学分"/>
			</el-form-item>
			<el-form-item prop="hours" label="学时">
				<el-input v-model.number="formData.hours" placeholder="请输入学时"/>
			</el-form-item>
			<el-form-item prop="class_time" label="课时">
				<el-input v-model.number="formData.hours" placeholder="请输入课时"/>
			</el-form-item>
			<el-form-item prop="course_name" label="课程简介">
				<el-input type="textarea"
				          :rows="5"
				          v-model="formData.course_name"
				          placeholder="请输入课程名称"/>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
  import { courseRules } from "../../js/util-data";

  export default {
    name: "sidebar1",
    data() {
      return {
        formData: {
          course_name: '',
          credit: '',
          hours: '',
          teacher_id: '',
          class_time: '',
          course_introduce: '',
          class_num: '',
          assessment_method: ''
        },
        rules: courseRules
      }
    }
  }
</script>

<style scoped>
	.el-card{
		width: 40%;
		margin: 0 auto;
	}
</style>
