<template>
  <el-card class="box-card" shadow="always">
    <h2>申请课程查询</h2>
    <!-- 查询参数表单 -->
    <el-form class="card-form" :inline="true" :model="selectForm" ref="courseList">
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
    <div class="courses-card-container">
      <transition-group name="el-zoom-in-top">
        <el-card class="card-courses" v-for="course of courses" :class="{
            'warning-card': course.audit_status === '0',
            'success-card': course.audit_status === '1',
            'danger-card': course.audit_status === '2'
          }" :key="course.course_id">
          <div slot="header" class="clearfix">
            <el-button v-show="course.aduit_status === '0'" class="card-modify-btn" type="text">取消</el-button>
            <el-button v-show="course.aduit_status === '0'" class="card-modify-btn" type="text">修改</el-button>
            <div class="card-header-title">{{ course.course_name }}</div>
            <div class="card-header-container">
              <el-col :span="4">
                <span>班号</span>
              </el-col>
              <el-col :span="4">
                <span>学分</span>
              </el-col>
              <el-col :span="4">
                <span>课时</span>
              </el-col>
              <el-col :span="4">
                <span>学时</span>
              </el-col>
              <el-col :span="4">
                <span>考核方法</span>
              </el-col>
              <el-col :span="4">
                <span>审批人</span>
              </el-col>
            </div>
          </div>
          <div class="card-info-container">
            <el-col :span="4">
              <span>{{ course.class_num }}</span>
            </el-col>
            <el-col :span="4">
              <span>{{ course.credit }}</span>
            </el-col>
            <el-col :span="4">
              <span>{{ course.hours }}</span>
            </el-col>
            <el-col :span="4">
              <span>{{ course.class_time }}</span>
            </el-col>
            <el-col :span="4">
              <span>{{ course.assessment_method }}</span>
            </el-col>
            <el-col :span="4">
              <span>{{ course.auditor }}</span>
            </el-col>
          </div>
        </el-card>
      </transition-group>
    </div>
  </el-card>
</template>

<script>
  import {
    URL_DATA
  } from '../../js/util-data'
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
        // 课程列表
        courses: [],
        // 当课程列表长度为0
        ifNoCourses: true
      }
    },
    methods: {
      onSubmit() {
        let _this = this
        _this.courses = []
        const loading = this.$loading({
          lock: true,
          text: '读取中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
          target: document.getElementsByClassName('box-card')[0]
        })
        setTimeout(() => {
          this.$axios({
            method: 'post',
            url: URL_DATA.COURSE_LIST,
            data: _this.selectForm
          }).then(res => {
            loading.close()
            for (let data of res.data) {
              _this.courses.push(data)
            }
            _this.ifNoCourses = _this.courses.length === 0
          }).catch((err) => {
            loading.close()
            console.log(err)
            this.$message.error('网络错误')
          })
        }, 500)
      }
    },
    created() {
      this.onSubmit()
    }
  }
</script>

<style scoped>
  .card-header-container {
    font-size: 14px;
  }

  .card-modify-btn {
    float: right; 
    padding: 3px 5px;
  }

  .card-header-title {
    margin: 0 0 15px 0;
  }

  .card-info-container {
    padding-bottom: 15px;
    font-size: 13px;
  }

  .card-form {
    border: 1px #cccccc solid;
    border-radius: 4px;
    padding: 15px 10px 0 10px;
    -moz-box-shadow:0px 0px 5px #f5f5f5;
    -webkit-box-shadow:0px 0px 5px #f5f5f5;
    box-shadow:0px 0px 5px #f5f5f5;
    background: #ffffff;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .card-courses {
    margin: 0 0 1rem 0;
  }

  .courses-card-container {
    overflow-y: auto;
  }

  .box-card {
    height: 35rem;
    overflow-y: auto;
  }

  .el-form {
    margin-bottom: 10px
  }
</style>
