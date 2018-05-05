<template>
  <el-card>
    <h2>查看/编辑试卷</h2>
    <el-form class="card-form" :model="selectForm" :inline="true" ref="courseList">
      <el-form-item label="试卷标题">
        <el-input v-model="selectForm.paper_name" placeholder="试卷标题" />
      </el-form-item>
      <el-form-item label="试卷备注">
        <el-input v-model="selectForm.remarks" placeholder="试卷备注" />
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
          :editable="false"
          v-model="selectDate"
          type="daterange"
          range-separator="-"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="table-container">
      <div class="table-left">
        <el-table :data="papers" max-height="500" height="500">
          <el-table-column type="expand" label="试卷">
            <template slot-scope="props">
              <div class="table-expand-remarks-card">
                <div>试卷备注: </div>
                <div>{{ props.row.remarks }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="paper_name">
          </el-table-column>
          <el-table-column 
            label="试卷所属" 
            width="100" 
            :filter-method="filterPeople" 
            :filter-multiple="false"
            :filters="[
              { text: '本人', value: '0' },
              { text: '他人', value: '1' }]">
          </el-table-column>
        </el-table>
      </div>
      <div class="table-middle">
        <el-table max-height="500" height="500">
          <el-table-column label="未添加的考题">
            <template slot-scope="props">
              <el-form label-position="left" inline class="paper-table-expand">
                <el-form-item label="出题教师id">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="备注">
                  <span>{{ props.row.remarks }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column 
            label="题目类型" 
            width="100" 
            :filter-method="filterType" 
            :filters="[
              { text: '判断', value: '0' }, 
              { text: '选择', value: '1' }]">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.question_type === '0' ? 'primary' : 'success'"
                disable-transitions>{{scope.row.question_type === '0' ? '判断' : '选择'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="60">
          </el-table-column>
        </el-table>
      </div>
      <div class="table-right">
        <el-table max-height="500" height="500">
          <el-table-column label="已添加的考题" height="100">
            <span></span>
          </el-table-column>
          <el-table-column 
            label="题目类型" 
            width="100" 
            :filters="[
              { text: '判断', value: '0' }, 
              { text: '选择', value: '1' }]">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.question_type === '0' ? 'primary' : 'success'"
                disable-transitions>{{scope.row.question_type === '0' ? '判断' : '选择'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="60">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </el-card>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: "paper",
    data() {
      return {
        selectForm: {
          paper_name: '',
          remarks: '',
          startDate: '',
          endDate: ''
        },
        // 时间范围，是一个数组
        selectDate: null
      }
    },
    computed: {
      ...mapGetters({
        papers: 'teacher/currentPapersList',
        papersLength: 'teacher/papersLength'
      })
    },
    methods: {
      // 表单根据标签过滤（单选、多选）
      filterType(value, row) {
        return row.question_type === value;
      },
      // 表单根据人物id过滤
      filterPeople(value, row) {
        console.log(value)
        if(value === 0) return row.teacher_id === sessionStorage.getItem('userId')
        else if(value === 1) return row.teacher_id !== sessionStorage.getItem('userId')
      },
      onSubmit() {
        // 处理表单
        if(this.selectDate !== null){
          this.selectForm.startDate = this.selectDate[0]
          this.selectForm.endDate = this.selectDate[1]
        } else {
          this.selectForm.startDate = ''
          this.selectForm.endDate = ''
        }
        // 生成loading
        const loadingLeft = this.$loading({
          lock: true,
          text: '读取中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
          target: document.getElementsByClassName('table-left')[0]
        })
        const loadingMiddle = this.$loading({
          lock: true,
          text: '读取中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
          target: document.getElementsByClassName('table-middle')[0]
        })
        const loadingRight = this.$loading({
          lock: true,
          text: '读取中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
          target: document.getElementsByClassName('table-right')[0]
        })
        this.$store.dispatch('teacher/getAllPaper', {
          selectForm: this.selectForm,
          loading: loadingLeft
        })
        loadingMiddle.close()
        loadingRight.close()
      }
    },
  }
</script>

<style scoped>
  .el-card {
    padding-bottom: 20px;
  }
  /* 试卷和题目显示区域 */
  .table-container {
    margin: 10px 0;
  }
  .table-left {
    width: 20%;
    border-right: 1px #ababab solid;
    float: left;
  }
  .table-middle {
    width: 39.5%;
    border-right: 1px #ababab solid;
    float: left;
  }
  .table-right {
    width: 39.5%;
    float: left;
  }
  /* 折叠表格卡片 */
  .paper-table-expand {
    font-size: 0;
  }
  .paper-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .paper-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-table__expanded-cell {
    background: #cccccc;
  }
  /* 表单 */
  .card-form {
    border: 1px #cccccc solid;
    border-radius: 4px;
    padding: 15px 10px 0 10px;
    -moz-box-shadow: 0px 5px 10px #696969;
    -webkit-box-shadow: 0px 5px 10px #696969;
    box-shadow: 0px 5px 10px #696969;
    margin-bottom: 0;
    position: relative;
    z-index: 101;
  }
</style>