<template>
  <el-card>
    <el-form class="card-form" :model="selectForm" :inline="true" ref="courseList">
      <el-form-item label="学生姓名">
        <el-input v-model="selectForm.name" placeholder="学生姓名" />
      </el-form-item>
      <el-form-item label="资料标题">
        <el-input v-model="selectForm.data_title" placeholder="资料标题" />
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="primary" @click="onSubmit()">查询</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-switch
          active-text="详细条件"
          v-model="expendDetial">
        </el-switch>
      </el-form-item>
      <el-collapse-transition>
        <div class="form-detial" v-if="expendDetial">
          <el-form-item label="课程名称">
            <el-input v-model="selectForm.course_name" placeholder="请输入课程名"></el-input>
          </el-form-item>
          <el-form-item label="课程ID">
            <el-input v-model="selectForm.course_id" placeholder="请输入课程ID"></el-input>
          </el-form-item>
          <el-form-item label="班号">
            <el-select v-model="selectForm.class_num" placeholder="请选择班号">
              <el-option label="全部" value=""></el-option>
              <el-option label="一班" value="1"></el-option>
              <el-option label="二班" value="2"></el-option>
              <el-option label="三班" value="3"></el-option>
              <el-option label="四班" value="4"></el-option>
              <el-option label="五班" value="5"></el-option>
              <el-option label="六班" value="6"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="资料类型" style="display: block">
            <el-select v-model="selectForm.class_num" placeholder="请选择类型">
              <el-option label="全部" value=""></el-option>
              <el-option label="文档" value="1"></el-option>
              <el-option label="PPT" value="2"></el-option>
              <el-option label="视频" value="3"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-collapse-transition>
    </el-form>
    <el-table
      id="table-student-files"
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
            <el-form-item label="得分">
              <span>{{ props.row.score ? props.row.score + '分' : '未打分' }}</span>
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
        label="学生姓名"
        width="100"
        prop="name">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="props">
          <el-button @click.prevent="markFile(props.row.data_id)" :disabled="props.row.scroll != null" type="text">打分</el-button>
          <el-button @click.prevent="downloadFile(props.row.data_id)" type="text">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
    <mark-dialog
      :obj-data="objData"
      :dialog-form-visible.sync="dialogFormVisible"
      current-view="fileMarkForm"
      title="学生资料评分">
    </mark-dialog>
  </el-card>
</template>

<script>
  import { URL_DATA } from '../../js/util-data'
  import { throttle } from '../../js/util-data'
  import markDialog from '../common/dialog'
  export default {
    name: 'studentFiles',
    data() {
      return {
        selectForm: {
          name: '',
          data_title: '',
          course_name: '',
          course_id: '',
          class_num: '',
          data_type: ''
        },
        expendDetial: false,
        tableData: [],
        dialogFormVisible: false,
        objData: {
          data_id: -1
        }
      }
    },
    methods: {
      // 函数节流
      onSubmit() {
        this.throttle()
      },
      // 表单提交
      submitMethod() {
        const loading = this.$loading({
          lock: true,
          text: '读取中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
          target: document.querySelector('#table-student-files')
        })
        setTimeout(() => {
          this.$axios({
            url: URL_DATA.QUERY_STUDENT_DATA_TEACHER,
            method: 'post',
            data: this.selectForm
          }).then( res => {
            loading.close()
            this.tableData = res.data
          })
        }, 500)
      },
      // 打分
      markFile(data_id) {
        this.objData.data_id = data_id
        this.dialogFormVisible = true
      },
      downloadFile(data_id) {
        window.location = URL_DATA.STUDENT_DOWNLOAD_FILE + '?data_id=' + data_id
      }
    },
    components: {
      markDialog
    },
    created() {
      this.throttle = throttle(this.submitMethod, 500)
    }
  }
</script>
