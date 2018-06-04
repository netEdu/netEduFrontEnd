<template>
  <el-card>
    <h2>查看/编辑题目</h2>
    <!-- ****************************** 表单 ****************************** -->
    <el-form class="card-form" :model="selectForm" :inline="true" ref="courseList">
      <el-form-item label="教师姓名">
        <el-input v-model="selectForm.name" placeholder="教师姓名" />
      </el-form-item>
      <el-form-item label="考题类型">
        <el-select v-model="selectForm.question_type" placeholder="请选择考题类型">
          <el-option label="全部" value=""></el-option>
          <el-option label="判断" value="0"></el-option>
          <el-option label="选择" value="1"></el-option>
        </el-select>
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
          <el-form-item label="出题次数">
            <el-input-number v-model="selectForm.frequency" controls-position="right" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="错误次数">
            <el-input-number v-model="selectForm.error_times" controls-position="right" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="考题难度">
            <el-select v-model="selectForm.difficulty" placeholder="请选择考题难度">
              <el-option label="全部" value=""></el-option>
              <el-option label="简单" value="1"></el-option>
              <el-option label="中等" value="2"></el-option>
              <el-option label="困难" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="考题内容" style="display: block">
            <el-input type="textarea"  v-model="selectForm.question_content" placeholder="考题内容" style="width: 717px"/>
          </el-form-item>
        </div>
      </el-collapse-transition>
    </el-form>
    <!-- ****************************** 表格 ****************************** -->
    <el-table
      id="table-question"
      :data="questionsList"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="paper-table-expand">
            <el-form-item label="题目:" style="width: 100%">
              <span>{{ props.row.question_content }}</span>
            </el-form-item>
            <div class="paper-table-answer" v-if="props.row.question_type == 1">
              <el-form-item label="选项A:">
                <span>{{ props.row.questionOptionList[0].option_content }}</span>
              </el-form-item>
              <el-form-item label="选项B:">
                <span>{{ props.row.questionOptionList[1].option_content }}</span>
              </el-form-item>
              <el-form-item label="选项C:">
                <span>{{ props.row.questionOptionList[2].option_content }}</span>
              </el-form-item>
              <el-form-item label="选项D:">
                <span>{{ props.row.questionOptionList[3].option_content }}</span>
              </el-form-item>
            </div>
            <el-form-item label="答案:">
              <span>{{ showCorrectAns(props.row) }}</span>
            </el-form-item>
            <el-form-item label="难度:">
              <span>{{ showDifficulty(props.row) }}</span>
            </el-form-item>
            <el-form-item label="被使用:">
              <span>{{ props.row.frequency }}次</span>
            </el-form-item>
            <el-form-item label="错误率:">
              <span>{{ props.row.error_times == 0 ? '0' : Math.floor(props.row.error_times/props.row.frequency * 100) }}%</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="题目名称"
        prop="question_content">
      </el-table-column>
      <el-table-column
        label="难度"
        width="100"
        prop="difficulty">
        <template slot-scope="props">
          <p>{{ showDifficulty(props.row) }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="出题人"
        width="100"
        prop="name">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="props">
          <el-button type="text" @click="removeQuestion(props.row)" :disabled="!isMyQuestion(props.row)">移除</el-button>
          <el-button type="text" @click="alterQuestion(props.row)" :disabled="!isMyQuestion(props.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- ****************************** 弹出框 ****************************** -->
    <form-dialog 
      :dialog-form-visible.sync="dialogFormVisible" 
      :obj-data="objData" 
      current-view="questionForm" 
      title="编辑考题"></form-dialog>
  </el-card>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { throttle, URL_DATA } from '../../js/util-data'
  import formDialog from '../common/dialog'
  export default {
    name: "question",
    data() {
      return {
        selectForm: {
          name: '',
          question_type: '',
          frequency: undefined,
          error_times: undefined,
          difficulty: '',
          question_content: ''
        },
        // 分页参数
        pagement: {
          page: 1,
          pageSize: 10000
        },
        // 表格选中项
        tableSelection: [],
        objData: {
          question_id: 0
        },
        dialogFormVisible: false,
        expendDetial: false
      }
    },
    computed: {
      ...mapGetters('teacher', {
        questionsList: 'questionsList'
      })
    },
    methods: {
      // 表单提交
      submitMethod() {
        const loading = this.$loading({
          lock: true,
          text: '读取中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
          target: document.querySelector('#table-question')
        })
        this.$store.dispatch('teacher/receiveQuestions', {
          selectForm: this.selectForm,
          pagement: this.pagement,
          loading
        })
      },
      // 函数节流，防止用户疯狂点击导致疯狂请求
      onSubmit() {
        this.throttle()
      },
      // 计算题目难度
      showDifficulty(row) {
        switch(row.difficulty){
          case '1':
            return '简单'
            break
          case '2':
            return '中等'
            break
          case '3':
            return '困难'
            break
        }
      },
      // 计算正确答案
      showCorrectAns(row) {
        if(row.question_type == 1){
          switch(row.question_answer){
            case 1:
              return 'A'
              break
            case 2:
              return 'B'
              break
            case 3:
              return 'C'
              break
            case 4:
              return 'D'
              break
            default:
              break
          }
        } else {
          console.log(row.question_answer)
          return row.question_answer == -1 ? '错误' : '正确'
        }
      },
      // 判断是否当前登陆者出的题目
      isMyQuestion(row) {
        return row.teacher_id == sessionStorage.getItem('userId')
      },
      // 编辑题目
      alterQuestion(row) {
        this.objData.question_id = row.question_id
        this.dialogFormVisible = true
      },
      // 删除题目
      removeQuestion(row) {
        this.$confirm('此操作将永久删除该题目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            url: URL_DATA.REMOVE_QUESTION,
            method: 'delete',
            params: {
              ids: row.question_id
            }
          }).then( res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.onSubmit()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })       
        })
      },
    },
    components: {
      formDialog
    },
    created() {
      this.throttle = throttle(this.submitMethod, 500)
    }
  }
</script>