<template>
  <el-card class="box-card">
    <div class="table-container" >
      <div class="table-left">
        <el-table :data="studentInformation" max-height="500" height="500" border>
          <el-table-column
            label="学生id"
            prop="student_id">
          </el-table-column>
          <el-table-column prop="name"
           label="学生姓名">
          </el-table-column>
          <el-table-column
            label="学生班级"
            prop="class_num">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="props">
              <el-button type="text" @click="queryStudentAllPaper(props.row.student_id)">查询</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="table-middle">
        <el-table :data="oneStudentPaperInformation" max-height="500" height="500" border>
          <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="试卷id：">
                <span>{{ props.row.paper_id }}</span>
              </el-form-item>
              <el-form-item label="试卷名称：">
                <span>{{ props.row.paper_name }}</span>
              </el-form-item>
              <el-form-item label="创建时间：">
                <span>{{ props.row.create_date }}</span>
              </el-form-item>
              <el-form-item label="创建试卷教师id：">
                <span>{{ props.row.teacher_id }}</span>
              </el-form-item>
              <el-form-item label="创建试卷教师姓名：">
                <span>{{ props.row.teacher_name }}</span>
              </el-form-item>
              <el-form-item label="试卷描述：">
                <span>{{ props.row.remarks }}</span>
              </el-form-item>
            </el-form>
          </template>
          </el-table-column>
          <el-table-column
            prop="paper_id"
            label="试卷id">
          </el-table-column>
          <el-table-column
            label="试卷名称"
            prop="paper_name">
          </el-table-column>
          <el-table-column
            label="创建时间"
            prop="create_date">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="props">
              <el-button type="text" @click="queryPaperInformation(props.row.paper_id,props.$index)">查询详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="table-right">
        <h2>试卷作答详情</h2>
        <div class="result-information">
        <div v-for="(val,index) in result" class="question-detail">
          <div>{{index+1}}. {{val.questionContent}}</div>
          <div>学生答案:{{val.answer}}</div>
          <div>标准答案:{{val.currentAnswer}}</div>
        </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
  import { URL_DATA } from '../../js/util-data'
    export default {
        name: "sidebar8",
        data(){
          return {
            studentInformation:[],
            oneStudentPaperInformation:[],
            paperInformation:[],
            result:[]
          }
        },
      created(){
          let teacherId = sessionStorage.getItem('userId')
        let url=URL_DATA.QUERY_MY_STUDENT
        this.$axios({
          url:url,
          method:'get',
          params:{teacher_id:teacherId}
        }).then((res)=>{
          this.studentInformation=res.data
        })
      },
      methods:{
        queryStudentAllPaper(studentId){
          const loading = this.$loading({
            lock: true,
            text: '读取中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
            target: document.getElementsByClassName('table-middle')[0]
          })
          let url=URL_DATA.QUERY_ONE_STUDENT_ALL_PAPER
          this.$axios({
            url:url,
            method:'get',
            params:{student_id:studentId}
          }).then((res)=>{
            setTimeout(()=>{
              loading.close()
              this.oneStudentPaperInformation=res.data
            },500)
          }).catch((res)=>{
            setTimeout(()=>{
              loading.close()
              this.$message({
                message:'网络异常',
                type:'error'
              })
            },500)
          })
        },
        queryPaperInformation(paperId,index){
          const loading=this.$loading({
            lock: true,
            text: '读取中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
            target: document.getElementsByClassName('table-right')[0]
          })
          let url = URL_DATA.PAPER_SHOW
          this.$axios({
            url:url,
            method:'get',
            params:{id:paperId}
          }).then((res)=>{
            setTimeout(()=>{
              let studentAnswer = this.oneStudentPaperInformation[index]
              console.info(studentAnswer)
              let quertionId=studentAnswer.questions.split(",")
              let answer = studentAnswer.student_answers.split(",")
              let questionAnswer = studentAnswer.correct_answers.split(",")
              this.paperInformation=res.data
              this.result=[]
              quertionId.forEach((questionId,questionIndex)=>{
                this.paperInformation.forEach((val,index)=>{
                  if (questionId == val.question_id){
                    switch (answer[questionIndex]){
                      case '-1':
                        answer[questionIndex]='错误'
                        break
                      case '0':
                        answer[questionIndex]='正确'
                        break
                      case '1':
                        answer[questionIndex]='A'
                        break
                      case '2':
                        answer[questionIndex]='B'
                        break
                      case '3':
                        answer[questionIndex]='C'
                        break
                      case '4':
                        answer[questionIndex]='D'
                        break
                      default:
                        answer[questionIndex]='此题未作答'
                        break
                    }
                    switch (questionAnswer[questionIndex]){
                      case '-1':
                        questionAnswer[questionIndex]='错误'
                        break
                      case '0':
                        questionAnswer[questionIndex]='正确'
                        break
                      case '1':
                        questionAnswer[questionIndex]='A'
                        break
                      case '2':
                        questionAnswer[questionIndex]='B'
                        break
                      case '3':
                        questionAnswer[questionIndex]='C'
                        break
                      case '4':
                        questionAnswer[questionIndex]='D'
                        break
                      default:
                        questionAnswer[questionIndex]='此题未作答'
                        break
                    }
                      this.result.push({questionContent:this.paperInformation[index].question_content,answer:answer[questionIndex],currentAnswer:questionAnswer[questionIndex]})
                  }
                })
              })
              loading.close()
            },500)
          }).catch((res)=>{
            setTimeout(()=>{
              loading.close()
              this.$message({
                message:'网络异常',
                type:'error'
              })
            },500)
          })
        }
      },

    }
</script>

<style scoped>
  .input-widths{
    width: 40%;
  }
  .div-margins{
    margin: 20px;
  }
  .card-width{
    width: 95%;
  }
  .table-left {
    box-sizing: border-box;
    width:30%;
    border-right: 1px #ababab solid;
    float: left;
  }
  .table-middle {
    box-sizing: border-box;
    width:40%;
    border-right: 1px #ababab solid;
    float: left;
  }
  .table-right {
    box-sizing: border-box;
    width: 30%;
    float: left;
    overflow-y: scroll
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .result-information{
    margin: 10px;
    height: 400px;
  }
  .question-detail{
    margin: 10px;
  }
</style>
