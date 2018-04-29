<template>
  <el-card class="box-card" shadow="always">
    <h2>申请课程查询
      <span class="tips">
        <span class="tips-warning">待审核&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span class="tips-success">审核通过&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span class="tips-danger">审核不通过</span>
      </span>
    </h2>
    <!-- 查询参数表单 -->
    <el-form class="card-form" :inline="true" :model="selectForm" ref="courseList">
      <el-form-item label="课程名称">
        <el-input v-model="selectForm.course_name" placeholder="课程名称" />
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
        <el-card shadow="hover" class="card-courses" v-for="course in courses" :class="{
            'warning-card': course.audit_status === '0',
            'success-card': course.audit_status === '1',
            'danger-card': course.audit_status === '2'
          }" :key="course.course_id">
          <div slot="header" class="clearfix">
            <el-button @click="deleteCourse(course)" v-show="course.audit_status === '0'" class="card-modify-btn" type="text">取消申请</el-button>
            <el-button @click="modifyCourse(course)" v-show="course.audit_status === '0'" class="card-modify-btn" type="text">修改</el-button>
            <h4 class="card-header-title">{{ course.course_name }}</h4>
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
      <transition name="el-zoom-in-top">
        <el-card class="card-courses none-data" v-if="ifNoCourses">
          <center>
            <p>暂时没有数据噢</p>
          </center>
        </el-card>
      </transition>

    </div>
    <form-dialog :dialog-form-visible.sync="dialogFormVisible" :obj-data="objData" current-view="courseForm" title="修改课程申请"></form-dialog>
  </el-card>
</template>

<script>
  import { URL_DATA } from '../../js/util-data'
  import formDialog from '../common/dialog'
  import { mapGetters } from 'vuex'
  export default {
    name: 'showCourse',
    components: {
      formDialog
    },
    data() {
      return {
        selectForm: {
          course_name: '',
          region: '',
          class_num: '',
          teacher_id: sessionStorage.getItem('userId')
        },
        // 当课程列表长度为0
        ifNoCourses: false,
        // 对话框显示隐藏
        dialogFormVisible: false,
        // 点击修改后的表单数据
        objData: {
          course_id: 0
        }
      }
    },
    computed: {
      // 对象展开运算符, es2015 stage-4阶段
      ...mapGetters({
        courses: 'courses',
        coursesLength: 'coursesLength'
      })
    },
    methods: {
      // 点击修改按钮
      modifyCourse(course) {
        this.objData.course_id = course.course_id
        this.dialogFormVisible = true
      },
      // 点击删除按钮
      deleteCourse(course){
        this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 调用action删除课程
          this.$store.dispatch('cancelCourse', {
            ids: course.course_id
          })
          setTimeout(() => {
            if(this.coursesLength === 0)
              this.ifNoCourses = true
          }, 1000)
        }).catch(() => {
          this.$message.info('已取消删除')
        })
      },
      // 表单提交
      onSubmit() {
        this.ifNoCourses = false
        const loading = this.$loading({
          lock: true,
          text: '读取中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
          target: document.getElementsByClassName('box-card')[0]
        })
        // 调用action更改状态树
        this.$store.dispatch('getAllCourses', {
          selectForm: this.selectForm,
          loading: loading
        })
        setTimeout(() => {
          if(this.coursesLength === 0)
            this.ifNoCourses = true
        }, 1000)
      }
    },
    mounted() {
      if(!this.coursesLength)
        this.onSubmit()
    },
  }

</script>

<style scoped>
  .card-header-container {
    font-size: 14px;
  }

  .tips {
    font-size: 10px;
    padding-left: 15px;
  }

  .tips-warning {
    color: rgb(146, 95, 0);
    background: rgb(252, 221, 164);
    border: 1px rgb(252, 221, 164) solid;
    padding: 3px 0 3px 12px;
    border-radius: 4px;
  }

  .tips-danger {
    color: rgb(172, 0, 0);
    background: rgb(253, 183, 183);
    border: 1px rgb(253, 183, 183) solid;
    padding: 3px 10px 3px 12px;
    border-radius: 4px;
  }

  .tips-success {
    color: #3dad00;
    background: #bcfc99;
    border: 1px #bcfc99 solid;
    padding: 3px 0 3px 12px;
    border-radius: 4px;
  }

  .card-modify-btn {
    float: right;
    padding: 3px 5px;
  }

  .card-header-title {
    margin: 0 0 15px 0;
    width: 10rem;
    text-align: center;
    -moz-box-shadow: 0px 1px 5px #bababa;
    -webkit-box-shadow: 0px 1px 5px #bababa;
    box-shadow: 0px 1px 5px #bababa;
    border-radius: 4px;
    padding: 5px;
    background: #ffffff;
  }

  .card-info-container {
    padding-bottom: 15px;
    font-size: 13px;
  }

  .card-form {
    border: 1px #cccccc solid;
    border-radius: 4px;
    padding: 15px 10px 0 10px;
    -moz-box-shadow: 0px 10px 20px #696969;
    -webkit-box-shadow: 0px 10px 20px #696969;
    box-shadow: 0px 10px 20px #696969;
    margin-bottom: 0;
    position: relative;
    z-index: 101;
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
    margin: 10px 0 1rem 0;
  }

  .none-data{
    margin-top: 1rem;
    padding: 50px 0;
  }

  .courses-card-container {
    position: relative;
    height: 500px;
    overflow-y: auto;
    z-index: 99;
  }

  .box-card {
    height: 42rem;
  }

</style>
