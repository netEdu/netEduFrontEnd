<template>
  <el-card>
    <h2>查看学生自评</h2>
    <el-table
      id="studentEvaluateData"
      :data="studentCommentData"
      style="width: 100%">
      <el-table-column 
        prop="student_id"
        label="学号">
      </el-table-column>
      <el-table-column 
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column 
        prop="ideology"
        label="思想成绩">
      </el-table-column>
      <el-table-column 
        prop="study"
        label="学习成绩">
      </el-table-column>
      <el-table-column 
        prop="morality"
        label="品德成绩">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagement.page"
      :page-sizes="[5, 10, 20]"
      :page-size="pagement.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagement.count">
    </el-pagination>
  </el-card>
</template>

<script>
  import { URL_DATA } from '../../js/util-data'
  export default {
    name: "studentsComment",
    data() {
      return {
        studentCommentData: [],
        pagement: {
          count: null,
          page: 1,
          pageSize: 5
        }
      }
    },
    methods: {
      handleSizeChange(val) {
        this.pagement.pageSize = val
        this.submit()
      },
      handleCurrentChange(val) {
        this.pagement.page = val
        this.submit()
      },
      submit() {
        const loading = this.$loading({
          lock: true,
          text: '读取中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
          target: document.querySelector('#studentEvaluateData')
        })
        this.$axios({
          url: URL_DATA.STUDENT_EVALUATE,
          method: 'post',
          data: this.pagement
        }).then( res => {
          loading.close()
          this.pagement.count = res.data.data.count
          this.studentCommentData = res.data.data.list.concat()
        }).catch( err => {
          this.$message.error('网络错误')
          loading.close()
        })
      }
    },
    created() {
      this.submit()
    }
  }
</script>
