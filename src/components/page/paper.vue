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
      <el-form-item style="float: right">
        <el-button type="primary" @click="onSubmit()">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="table-container">
      <!-- 试卷列表 -->
      <div class="table-left">
        <el-table
          :data="papers"
          max-height="500"
          height="500"
          @row-click="showQuestions">
          <el-table-column type="expand" width="20">
            <template slot-scope="props">
              <div class="table-expand-remarks-card">
                <div>试卷备注: </div>
                <div>{{ props.row.remarks }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="paper_name" label="试卷">
          </el-table-column>
          <el-table-column
            label="试卷所属"
            width="100"
            prop="teacher_id"
            :filter-method="filterPeople"
            :filter-multiple="false"
            :filters="[
              { text: '本人', value: '本人' },
              { text: '他人', value: '他人' }]">
            <template slot-scope="scope">
              <el-tag class="my-tag"
                :type="scope.row.teacher_id == currentTeacherId ? 'success' : 'warning'"
                disable-transitions>{{scope.row.teacher_id == currentTeacherId ? '本人' : '他人'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="props">
              <el-button type="text" @click="printPaper(props.row.paper_id)">打印</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 已添加考题列表 -->
      <div class="table-middle">
        <el-table :data="existQuestions" max-height="500" height="500">
          <el-table-column type="expand" width="30">
            <template slot-scope="props">
              <el-form label-position="left" inline class="paper-table-expand">
                <el-form-item label="题目:" style="width: 100%">
                  <span>{{ props.row.question_content }}</span>
                </el-form-item>
                <el-form-item label="A:" v-if="props.row.question_type == 1">
                  <span>{{ props.row.questionOptionList[0].option_content }}</span>
                </el-form-item>
                <el-form-item label="B:" v-if="props.row.question_type == 1">
                  <span>{{ props.row.questionOptionList[1].option_content }}</span>
                </el-form-item>
                <el-form-item label="C:" v-if="props.row.question_type == 1">
                  <span>{{ props.row.questionOptionList[2].option_content }}</span>
                </el-form-item>
                <el-form-item label="D:" v-if="props.row.question_type == 1">
                  <span>{{ props.row.questionOptionList[3].option_content }}</span>
                </el-form-item>
                <el-form-item label="答案:">
                  <span>{{ showCorrectAns(props.row) }}</span>
                </el-form-item>
                <el-form-item label="难度:">
                  <span>{{ showDifficulty(props.row) }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="question_content" label="已添加的考题">
          </el-table-column>
          <el-table-column
            label="题目类型"
            width="100"
            prop="question_type"
            :filter-multiple="false"
            :filter-method="filterType"
            :filters="[
              { text: '判断', value: '0' },
              { text: '选择', value: '1' }]">
            <template slot-scope="props">
              <el-tag
                :type="props.row.question_type === '0' ? 'primary' : 'success'"
                disable-transitions>{{props.row.question_type === '0' ? '判断' : '选择'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template slot-scope="props">
              <el-button type="text" @click="removeQuestion(props.row)" :disabled="!isMyPaper">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 未添加考题列表 -->
      <div class="table-right">
        <el-table :data="unExistQuestions" max-height="500" height="500">
          <el-table-column type="expand" width="30">
            <template slot-scope="props">
              <el-form label-position="left" inline class="paper-table-expand">
                <el-form-item label="题目:" style="width: 100%">
                  <span>{{ props.row.question_content }}</span>
                </el-form-item>
                <el-form-item label="A:" v-if="props.row.question_type == 1">
                  <span>{{ props.row.questionOptionList[0].option_content }}</span>
                </el-form-item>
                <el-form-item label="B:" v-if="props.row.question_type == 1">
                  <span>{{ props.row.questionOptionList[1].option_content }}</span>
                </el-form-item>
                <el-form-item label="C:" v-if="props.row.question_type == 1">
                  <span>{{ props.row.questionOptionList[2].option_content }}</span>
                </el-form-item>
                <el-form-item label="D:" v-if="props.row.question_type == 1">
                  <span>{{ props.row.questionOptionList[3].option_content }}</span>
                </el-form-item>
                <el-form-item label="答案:">
                  <span>{{ showCorrectAns(props.row) }}</span>
                </el-form-item>
                <el-form-item label="难度:">
                  <span>{{ showDifficulty(props.row) }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="question_content" label="未添加的考题">
          </el-table-column>
          <el-table-column
            label="题目类型"
            width="100"
            prop="question_type"
            :filter-multiple="false"
            :filter-method="filterType"
            :filters="[
              { text: '判断', value: '0' },
              { text: '选择', value: '1' }]">
            <template slot-scope="props">
              <el-tag
                :type="props.row.question_type == '0' ? 'primary' : 'success'"
                disable-transitions>{{props.row.question_type == '0' ? '判断' : '选择'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="60">
            <template slot-scope="props">
              <el-button type="text" :disabled="!isMyPaper" @click="addQuestion(props.row)">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
     <!-- <form-dialog :dialog-form-visible.sync="dialogFormVisible" :obj-data="objData" current-view="printPaper" title="打印试题">
      </form-dialog>-->
    </div>
    <el-dialog title="打印试题" :visible.sync="dialogFormVisible">
      <div>
        <div id="printInformation">
          <h2>选择题</h2>
          <div v-for="(chooseVal,chooseIndex) in chooseQuestions" v-if="chooseVal.question_type =='1'" class="choose-style">
           <div>{{chooseIndex+1}}. {{chooseVal.question_content}}  (  )</div>
            <span v-for="(optionVal,optionIndex) in chooseVal.questionOptionList" class="option-style">
              <span v-if="optionIndex == '0'">A.{{optionVal.option_content}}</span>
              <span v-if="optionIndex == '1'">B.{{optionVal.option_content}}</span>
              <span v-if="optionIndex == '2'">C.{{optionVal.option_content}}</span>
              <span v-if="optionIndex == '3'">D.{{optionVal.option_content}}</span>
            </span>
          </div>
          <h2 >判断题</h2>
          <div v-for="(val,index) in decideQuestions" v-if="val.question_type =='0'" class="decide-style">
            <span>{{index+1}}. {{val.question_content}}    (  )</span>
          </div>
        </div>
        <el-button @click="print()">打印</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
  import { mapGetters } from 'vuex'
  import formDialog from '../common/dialog'
  export default {
    name: "paper",
    components: {
      formDialog
    },
    data() {
      return {
        choose_num:0,
        decide_num:0,
        objData:{
          paper_id:1,
        },
        dialogFormVisible: false,
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
      ...mapGetters('teacher', {
        papers: 'currentPapersList',
        papersLength: 'papersLength',
        existQuestions: 'existQuestions',
        unExistQuestions: 'unExistQuestions',
        currentPaperId: 'currentPaperId',
        existQuestionsId: 'existQuestionsId'
      }),
      // 当前登录的teacher_id
      currentTeacherId() {
        return sessionStorage.getItem('userId')
      },
      isMyPaper() {
        return this.$store.getters['teacher/isLoginUserPaper'](this.currentTeacherId)
      },
      chooseQuestions() {
        let array = []
        this.existQuestions.forEach( e => {
          if(e.question_type > 0) array.push(e)
        })
        return array
      },
      decideQuestions() {
        let array = []
        this.existQuestions.forEach( e => {
          if(e.question_type < 1) array.push(e)
        })
        return array
      }
    },
    methods: {
      printPaper(id){
        this.dialogFormVisible=true
      },
      print(){
        var newstr = document.getElementById('printInformation').innerHTML
        this.dialogFormVisible=false
        //打开一个新的标签，并将新标签对象赋予一个变量，通过变量写入html内容并将此标签页面打印
        var w=window.open()
        w.document.write(newstr)
        w.print();
        w.close()
      },
      // 表单根据标签过滤（单选、多选）
      filterType(value, row) {
        return row.question_type === value
      },
      // 表单根据人物id过滤
      filterPeople(value, row) {
        let scope = row.teacher_id == this.currentTeacherId ? '本人' : '他人'
        return scope === value
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
          return row.question_answer == 0 ? '错误' : '正确'
        }
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
      // 从试卷中移除考题
      removeQuestion(row) {
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
        let reg1 = new RegExp(',?[' + row.question_id + '],?')
        let reg2 = new RegExp(',[' + row.question_id + '],')
        this.$store.dispatch('teacher/removeQuestion', {
          currentQuestion: row,
          idAfterModify: reg2.exec(this.existQuestionsId)
            ? this.existQuestionsId.replace(reg1, ',')
            : this.existQuestionsId.replace(reg1, ''),
          currentPaperId: this.currentPaperId,
          loadingMiddle,
          loadingRight
        })
      },
      // 向试卷中添加考题
      addQuestion(row) {
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
        this.$store.dispatch('teacher/addQuestion', {
          currentQuestion: row,
          idAfterModify: this.existQuestionsId === ''
            ? row.question_id
            : this.existQuestionsId + ',' + row.question_id,
          currentPaperId: this.currentPaperId,
          loadingMiddle,
          loadingRight
        })
      },
      // 查看试卷的添加和未添加的考题
      showQuestions(row) {
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
        this.$store.dispatch('teacher/getCurrentPaperQuestionState', {
          paper_id: row.paper_id,
          questions: row.questions,
          loadingMiddle,
          loadingRight
        })
      },
      // 查询表单提交
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
        this.$store.dispatch('teacher/getAllPaper', {
          selectForm: this.selectForm,
          loading: loadingLeft
        })
      }
    }
  }
</script>

<style scoped>
  .choose-style{
    margin:20px;
  }
  .decide-style{
    margin: 20px;
  }
  .option-style{
    margin: 5px;
    margin-left: 15px;
  }
  .el-card {
    padding-bottom: 20px;
  }
  /* 试卷和题目显示区域 */
  .table-container {
    margin: 10px 0;
  }
  .table-left {
    box-sizing: border-box;
    width: 30%;
    border-right: 1px #ababab solid;
    float: left;
  }
  .table-middle {
    box-sizing: border-box;
    width: 35%;
    border-right: 1px #ababab solid;
    float: left;
  }
  .table-right {
    box-sizing: border-box;
    width: 35%;
    float: left;
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
