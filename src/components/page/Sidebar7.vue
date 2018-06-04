<template>
  <el-card>
    <el-card>
      <el-form
        :model="submitData"
        status-icon>
        <el-col :span="6"><div class="grid-content bg-purple">
        <el-form-item
          prop="student_id"
          label="请输入学生id:">
          <el-input v-model="submitData.student_id" class="input-style"/>
        </el-form-item>
        </div></el-col>
        <el-col :span="7"><div class="grid-content bg-purple">
        <el-form-item
          prop="student_name"
          label="请输入学生姓名:">
          <el-input v-model="submitData.student_name" class="input-style"/>
        </el-form-item>
        </div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">
        <el-form-item
          prop="class_num"
          label="请输入班号:">
          <el-input v-model="submitData.class_num" class="input-style"/>
        </el-form-item>
        </div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple">
        <el-form-item style="text-align:center">
          <el-button type="primary" @click="onSubmit()" class="yes-btn">
            确 定
          </el-button>
          <el-button type="primary" @click="printAll()" class="yes-btn">
            打印全部
          </el-button>
        </el-form-item>
        </div></el-col>
      </el-form>
    </el-card>
  <el-table
    :data="allStudentScore"
    style="width: 100%">
    <el-table-column
      fixed
      prop="student_name"
      label="学生姓名">
    </el-table-column>
    <el-table-column
      prop="paper_score"
      label="试卷成绩">
    </el-table-column>
    <el-table-column
      prop="sign_score"
      label="签到成绩">
    </el-table-column>
    <el-table-column
      prop="test_score"
      label="小测成绩">
    </el-table-column>
    <el-table-column
      label="成果成绩"
      prop="survey_type">
      <template slot-scope="scope">
        <span v-if=" scope.row.data_score == null">暂时没有成功成绩</span>
        <span v-else>{{scope.row.data_score}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button @click="printScore(scope.$index)" type="text" size="small">打印</el-button>
      </template>
    </el-table-column>
  </el-table>
  </el-card>
</template>

<script>
  import { URL_DATA } from '../../js/util-data'
    export default {
        name: "sidebar7",
        data(){
          return {
            allStudentScore:[],
            submitData:{
              student_id:"",
              student_name:"",
              class_num:""
            }
          }
        },
      created(){
        let url=URL_DATA.QUERY_ALL_STUDENT_AVG_SCORE
        this.$axios({
          url:url,
          method:"post",
          data:this.submitData
        }).then((res)=>{
          this.allStudentScore=res.data.data.list
        })
      },
      methods:{
        printScore(index){
          let studentScore=this.allStudentScore[index]
          if(studentScore.data_score == null){
            studentScore.data_score='暂时没有成果成绩'
          }
          let newstr="<table border='1'>" +
            "<th>学生姓名</th>" +
            "<th>试卷成绩</th>" +
            "<th>签到成绩</th>" +
            "<th>小测成绩</th>" +
            "<th>成果成绩</th>" +
            "<tr>"+
            "<td>"+studentScore.student_name+"</td>"+
            "<td>"+studentScore.paper_score+"</td>"+
            "<td>"+studentScore.sign_score+"</td>"+
            "<td>"+studentScore.test_score+"</td>"+
            "<td>"+studentScore.data_score+"</td>"+
            "</tr>" +
            "</table>"
          var w=window.open()
          w.document.write(newstr)
          w.print()
          w.close()
        },
        onSubmit(){
          let url=URL_DATA.QUERY_ALL_STUDENT_AVG_SCORE
          const loading = this.$loading({
            lock: true,
            text: '读取中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
          })
          this.$axios({
            url:url,
            method:"post",
            data:this.submitData
          }).then((res)=>{
            setTimeout(()=>{
              loading.close()
              this.allStudentScore=res.data.data.list
            },500)
          }).catch((res)=>{
            setTimeout(()=>{
              loading.close()
            },500)
          })
        },
        printAll(){
          if (this.allStudentScore.size == 0){
            this.$message({
              message:'没有数据可以打印',
              type:'error'
            })
            return false
          }
          let studentScore=this.allStudentScore
          let studentScoreInformation=""

          studentScore.forEach((val,index)=>{
            if(val.data_score == null){
              val.data_score='暂时没有成果成绩'
            }
            studentScoreInformation+=
              "<tr>"+
            "<td>"+(index+1)+"</td>"+
            "<td>"+val.student_name+"</td>"+
            "<td>"+val.paper_score+"</td>"+
            "<td>"+val.sign_score+"</td>"+
            "<td>"+val.test_score+"</td>"+
            "<td>"+val.data_score+"</td>"+
            "</tr>"
          })
          let newstr="<table border='1'>" +
            "<th>编号</th>"+
            "<th>学生姓名</th>" +
            "<th>试卷成绩</th>" +
            "<th>签到成绩</th>" +
            "<th>小测成绩</th>" +
            "<th>成果成绩</th>"+
            studentScoreInformation
            +"</table>"
          var w=window.open()
          w.document.write(newstr)
          w.print()
          w.close()
        }
      }
    }
</script>

<style scoped>
.input-style{
  width: 60%;
}
</style>
