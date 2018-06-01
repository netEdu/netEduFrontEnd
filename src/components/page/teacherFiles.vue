<template>
  <el-card>
    <!-- 表单 -->
    <el-form class="card-form" :inline="true" :model="selectForm" ref="courseList">
      <el-form-item label="资料标题">
        <el-input v-model="selectForm.data_title" placeholder="资料标题" />
      </el-form-item>
      <el-form-item label="课程名">
        <el-input v-model="selectForm.course_name" placeholder="课程名" />
      </el-form-item>
      <el-form-item label="资料类型">
        <el-select v-model="selectForm.data_type" placeholder="资料类型">
          <el-option label="全部" value="" />
          <el-option label="文档" value="0" />
          <el-option label="PPT" value="1" />
          <el-option label="视频" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="primary" @click="onSubmit()">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 表单 -->
    <el-table
      id="table-teacher-files"
      :data="tableData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="paper-table-expand">
            <el-form-item label="资料 id">
              <span>{{ props.row.data_id }}</span>
            </el-form-item>
            <el-form-item label="上传时间">
              <span>{{ props.row.upload_time }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="资料标题"
        prop="data_title">
      </el-table-column>
      <el-table-column
        label="课程名称"
        width="100"
        prop="course_name">
      </el-table-column>
      <el-table-column
        label="教师姓名"
        width="100"
        prop="name">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="props">
          <el-button @click.prevent="deleteFile(props.row.data_id)" type="text">删除</el-button>
          <el-button @click.prevent="downloadFile(props.row.data_id)" type="text">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
import { URL_DATA } from '../../js/util-data'
import { throttle } from '../../js/util-data'
export default {
  name: 'TeacherFiles',
  data() {
    return {
      selectForm: {
        data_title: '',
        course_name: '',
        data_type: '',
        teacher_id: sessionStorage.getItem('userId')
      },
      tableData: []
    }
  },
  methods: {
    onSubmit() {
      this.throttle()
    },
    deleteFile(data_id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          url: URL_DATA.DELETE_TEACHER_FILE,
          method: 'delete',
          params: {
            data_ids: data_id
          }
        }).then( res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.onSubmit()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    downloadFile(data_id) {
      window.location = URL_DATA.TEACHER_DOWNLOAD_FILE + 'data_id=' + data_id
    },
    submitMethod() {
      const loading = this.$loading({
        lock: true,
        text: '读取中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
        target: document.querySelector('#table-teacher-files')
      })
      setTimeout(() => {
        this.$axios({
          url: URL_DATA.QUERY_TEACHER_DATA_TEACHER,
          method: 'post',
          data: this.selectForm
        }).then( res => {
          loading.close()
          this.tableData = res.data
        })
      }, 500)
    }
  },
  created() {
    this.throttle = throttle(this.submitMethod, 500)
  }
}
</script>