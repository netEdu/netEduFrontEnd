<template>
  <el-form :model="formData" :rules="rules" ref="courseForm" label-width="100px" label-position="left">
    <h2 v-if="title">{{ title }}</h2>
    <el-form-item prop="course_name" label="课程名称">
      <el-input v-model="formData.course_name" placeholder="请输入课程名称" />
    </el-form-item>
    <el-form-item prop="credit" label="课程学分">
      <el-input v-model="formData.credit" placeholder="请输入课程学分" />
    </el-form-item>
    <el-form-item prop="hours" label="学时">
      <el-input v-model="formData.hours" placeholder="请输入学时" />
    </el-form-item>
    <el-form-item prop="class_time" label="课时">
      <el-input v-model="formData.class_time" placeholder="请输入课时" />
    </el-form-item>
    <el-form-item prop="class_num" label="上课班级">
      <el-select v-model="formData.class_num" placeholder="请选择上课班级" clearable>
        <el-option label="一班" value="1" />
        <el-option label="二班" value="2" />
        <el-option label="三班" value="3" />
        <el-option label="四班" value="4" />
        <el-option label="五班" value="5" />
        <el-option label="六班" value="6" />
      </el-select>
    </el-form-item>
    <el-form-item prop="assessment_method" label="审核方法">
      <el-select v-model="formData.assessment_method" placeholder="请选择期末审核方法" clearable>
        <el-option label="论文" value="论文" />
        <el-option label="笔试" value="笔试" />
        <el-option label="笔试+上机" value="笔试+上机" />
      </el-select>
    </el-form-item>
    <el-form-item prop="course_introduce" label="课程简介">
      <el-input type="textarea" :rows="5" v-model="formData.course_introduce" placeholder="请输入课程简介" />
    </el-form-item>
    <el-button type="primary" @click.prevent="onSubmit('courseForm')">提交申请</el-button>
  </el-form>
</template>

<script>
import { courseRules, URL_DATA } from '../../js/util-data'

export default {
  name: 'courseForm',
  props: {
    objData: {
      type: Object,
      default: () => { return {} }
    },
    dialogFormVisible: {
      type: Boolean
    },
    title: {
      type: String
    }
  },
  watch: {
    objData: {
      handler(val) {
        console.log(val)
        this.formData = Object.assign({}, val.initFormData)
      },
      deep: true
    }
  },
  data () {
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
  },
  methods: {
    onSubmit (formName) {
      this.formData.teacher_id = sessionStorage.getItem('userId')
      this.$refs[formName].validate(valid => {
        const loading = this.$loading({
          lock: true,
          text: '拼命上传中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        if (valid) {
          this.$axios({
            method: 'post',
            url: this.objData === {} ? URL_DATA.APPLY_COURSE : URL_DATA.UPDATE_COURSE,
            data: this.formData
          }).then(res => {
            if (res.data === 'FAIL') {
              this.$notify.error({
                title: '添加失败了',
                message: '课程：' + this.formData.course_name
              })
              loading.close()
              this.dialogFormVisible = false
            } else if (res.data === 'REPEAT') {
              this.$notify.warning({
                title: '课程重复了',
                message: '课程：' + this.formData.course_name
              })
              loading.close()
              this.dialogFormVisible = false
            } else {
              this.$notify.success({
                title: '添加成功啦！',
                message: '课程：' + this.formData.course_name
              })
              loading.close()
              this.dialogFormVisible = false
            }
          }).catch(err => {
            console.log(err)
            this.$message.error('网络错误')
            loading.close()
          })
        } else {
          loading.close()
          this.dialogFormVisible = false
          return false
        }
      })
    }
  },
  created() {
    console.log('created')
    this.formData = Object.assign({}, this.objData.initFormData)
  }
}
</script>