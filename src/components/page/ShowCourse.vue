<template>
  <el-card class="box-card" shadow="always">
    <h2>申请课程查询</h2>
    <!-- 查询参数表单 -->
    <el-form :inline="true" :model="selectForm" ref="courseList">
      <el-form-item label="课程名称">
        <el-input v-model="selectForm.course_name" placeholder="审批人" />
      </el-form-item>
      <el-form-item label="班号">
        <el-input v-model="selectForm.class_num" placeholder="班号" />
      </el-form-item>
      <el-form-item label="审核状态">
        <el-select v-model="selectForm.audit_status">
          <el-option label="全部" value="" />
          <el-option label="等待审核" value="0" />
          <el-option label="通过审核" value="1" />
          <el-option label="审核失败" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="courses" :row-class-name="tableCourses">
      <el-table-column prop="course_name" label="课程名称">
      </el-table-column>
      <el-table-column prop="class_num" label="班号">
      </el-table-column>
      <el-table-column prop="credit" label="学分">
      </el-table-column>
      <el-table-column prop="hours" label="课时">
      </el-table-column>
      <el-table-column prop="class_time" label="学时">
      </el-table-column>
      <el-table-column prop="assessment_method" label="考核方法">
      </el-table-column>
      <el-table-column prop="auditor" label="审批人">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { URL_DATA } from '../../js/util-data'
export default {
  name: 'showCourse',
  data() {
    return {
      selectForm: {
        course_name: '',
        region: '',
        class_num: '',
        teacher_id: sessionStorage.getItem('userId')
      },
      courses: []
    }
  },
  methods: {
    tableCourses({ row }) {
      if (row.audit_status === '0') return 'warning-row'
      if (row.audit_status === '1') return 'success-row'
      if (row.audit_status === '2') return 'danger-row'
    },
    onSubmit() {
      let _this = this
      const loading = this.$loading({
        lock: true,
        text: '读取中',
        target: document.getElementsByClassName('content')[0]
      })
      setTimeout(() => {
        this.$axios({
          method: 'post',
          url: URL_DATA.COURSE_LIST,
          data: _this.selectForm
        }).then(res => {
          loading.close()
          _this.courses = []
          for (let data of res.data) {
            _this.courses.push(data)
          }
        })
      }, 1000)
    }
  }
}
</script>
