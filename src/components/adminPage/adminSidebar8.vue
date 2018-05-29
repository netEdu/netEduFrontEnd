<template>
<el-card style="width: 90%;">
  <el-card class="card-style" v-for="(val,index) in questionnaireList" :key="index">
    <span>创建者:{{val.creator}}</span><br/>
    <span>试卷名称:{{val.questionnaire_name}}</span><br/>
    <span>试卷描述:{{val.remarks}}</span><br/>
    <el-button class="button-style" @click="editQuestionnaire(val.questionnaire_id)">编辑</el-button> <el-button class="button-style" type="danger" @click="deleteQuestionnaire(index,val.questionnaire_id)">删除</el-button>
  </el-card>
  <el-dialog title="修改教师评价试卷信息" :visible.sync="dialogFormVisible">
    <el-card class="box-card">
      <el-card class="div-margins card-width">
        <el-form
          ref="editTeacherQuestion"
          :model="submitData">
          <el-row :gutter="24">
            <el-col :span="7"><div class="grid-content bg-purple">
              <el-form-item prop="questionnaire_name" label="请输入试卷名称：" :rules="{required: true, message: '试卷名称不能为空'}">
                <el-input v-model="submitData.questionnaire_name"  placeholder="请输入内容" class="input-widths"></el-input>
              </el-form-item>
            </div></el-col>
            <el-col :span="7"><div class="grid-content bg-purple">
              <el-form-item prop="creator" label="请输入创建人姓名：" :rules="{required: true, message: '创建人姓名不能为空'}">
                <el-input v-model="submitData.creator"  placeholder="请输入内容" class="input-widths"></el-input>
              </el-form-item>
            </div></el-col>
            <el-col :span="7"><div class="grid-content bg-purple">
              <el-form-item prop="remarks" label="请输入说明：" :rules="{required: true, message: '说明不能为空'}">
                <el-input v-model="submitData.remarks"  placeholder="请输入内容" class="input-widths"></el-input>
              </el-form-item>
            </div></el-col>
            <el-col :span="3"><div class="grid-content bg-purple">
              <el-button type="primary" @click.prevent="onSubmit('editTeacherQuestion')">提交</el-button>
            </div>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <div class="table-container" >
        <!-- 已添加考题列表 -->
        <div class="table-left">
          <el-table :data="existQuestions" max-height="500" height="500" border>
            <el-table-column prop="survey_content" label="已添加的考题">
            </el-table-column>
            <el-table-column
              label="题目类型"
              width="100"
              prop="question_type"
              :filter-multiple="false"
              :filter-method="filterType"
              :filters="[
              { text: '单选', value: '0' },
              { text: '简答', value: '1' }]">
              <template slot-scope="props">
                <el-tag
                  :type="props.row.survey_type === '0' ? 'primary' : 'success'"
                  disable-transitions>{{props.row.survey_type === '0' ? '单选' : '简答'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="80">
              <template slot-scope="props">
                <el-button type="text" @click="removeQuestion(props.$index,props.row)">移除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 未添加考题列表 -->
        <div class="table-right">
          <el-table :data="checkboxGroupInformation" max-height="500" height="500" border>
            <el-table-column prop="survey_content" label="未添加的考题">
            </el-table-column>
            <el-table-column
              label="题目类型"
              width="100"
              prop="survey_type"
              :filter-multiple="false"
              :filter-method="filterType"
              :filters="[
              { text: '单选', value: '0' },
              { text: '简答', value: '1' }]">
              <template slot-scope="props">
                <el-tag
                  disable-transitions>{{props.row.survey_type == '0' ? '单选' : '简答'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="60">
              <template slot-scope="props">
                <el-button type="text" @click="addQuestion(props.$index,props.row)">添加</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>
  </el-dialog>
</el-card>
</template>

<script>
import {URL_DATA} from "../../js/util-data";
export default {
  name:'adminSidebar8',
  data(){
    return {
      value:"",
      teacherList:[],
      submitData:{
        questionnaire_id:"",
        creator:"",
        remarks:"",
        survey_questions:"",
        questionnaire_name:"",
        create_time:new Date()
      },
      existQuestions:[],
      checkboxGroupInformation:[],
      dialogFormVisible:false,
      questionnaireList:[]
    }
  },
  created(){
    this.$axios({
      url:URL_DATA.QUERY_TEACHER_QUESTION_LIST,
      method:'POST',
      data:{pageSize:200}
    }).then((res)=>{
      this.questionnaireList=res.data.data.list
    })
  },
  methods:{
    filterType(value, row){
      return row.survey_type === value
    },
    addQuestion(index,row){
      this.checkboxGroupInformation.splice(index,1)
      this.existQuestions.push(row)
      this.existQuestions.sort(this.condition("question_id"))
    },
    editQuestionnaire(id){
      this.dialogFormVisible=true
      var questionUrl=URL_DATA.QUERY_SURVEY_QUESTION
      var queryOneQuestionnaire=URL_DATA.QUERY_ONE_QUESTIONNAIRE+"?questionnaire_id="+id
      this.$axios.all([
        this.$axios.post(questionUrl,{pageSize:200}),
        this.$axios.post(queryOneQuestionnaire)
      ]).then(this.$axios.spread((questionList, questionnaire)=> {
          // 上面两个请求都完成后，才执行这个回调方法
        questionnaire.data.data.surveyQuestionList.forEach((questionnaireVal,questionnaireIndex)=>{
           questionList.data.data.Page.list.forEach((val,index)=>{
             if (questionnaireVal.question_id == val.question_id){
               questionList.data.data.Page.list.splice(index,1)
             }
           })
         })
        this.submitData.questionnaire_id=id
        this.teacherList=questionList.data.data.Teacher
        this.value=questionnaire.data.data.teacher_id
        this.submitData.remarks=questionnaire.data.data.remarks
        this.submitData.creator=questionnaire.data.data.creator
        this.submitData.questionnaire_name=questionnaire.data.data.questionnaire_name
        this.checkboxGroupInformation=questionList.data.data.Page.list
        this.existQuestions=questionnaire.data.data.surveyQuestionList
        }));

    },
    onSubmit(formName){
      var url=URL_DATA.UPADTE_TEACHER_QUESTION
      this.$refs[formName].validate((valid) => {
        if (valid){
          if (this.existQuestions.length==0){
            this.$message({
              showClose: true,
              message: '问题不能为空',
              type: 'error'
            });
            return;
          }else if (this.existQuestions.length!=10){
            this.$message({
              showClose: true,
              message: '题目满分为100分，请选择正确的题目数量',
              type: 'error'
            });
            return;
          }
          this.existQuestions.forEach((val,index)=>{
            if (this.submitData.survey_questions==""){
              this.submitData.survey_questions=val.question_id
            }else{
              this.submitData.survey_questions+=","+val.question_id
            }
          })
          this.submitData.teacher_id=this.value
          const loading = this.$loading({
            lock: true,
            text: '拼命修改中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          this.$axios({
            url:url,
            method:"POST",
            data:this.submitData
          }).then((res)=>{
            setTimeout(()=>{
              if (res.status==200){
                this.$message({
                  showClose: true,
                  message: '修改成功',
                  type: 'success'
                });
                this.formData={}
              }else{
                this.$message({
                  showClose: true,
                  message: '修改失败',
                  type: 'error'
                });
              }
              loading.close()
            },1000)
            var name=""
            this.teacherList.forEach((val,index)=>{
              if (this.value==val.teacher_id){
               name= this.teacherList[index].username
              }
            })
            this.questionnaireList.forEach((questionnaireListVal,questionnaireListIndex)=>{
              if (questionnaireListVal.questionnaire_id==this.submitData.questionnaire_id){
                this.questionnaireList[questionnaireListIndex].creator=this.submitData.creator
                this.questionnaireList[questionnaireListIndex].teacher_id=this.submitData.teacher_id
                this.questionnaireList[questionnaireListIndex].remark=this.submitData.remark
                this.questionnaireList[questionnaireListIndex].name=name
              }
            })
          })
        }
      })
    },
    removeQuestion(index,row){
      this.existQuestions.splice(index,1)
      this.checkboxGroupInformation.push(row)
      this.checkboxGroupInformation.sort(this.condition("question_id"))
    },
    condition(name){
      return function(o, p){
        var a, b;
        if (typeof o === "object" && typeof p === "object" && o && p) {
          a = o[name];
          b = p[name];
          if (a === b) {
            return 0;
          }
          if (typeof a === typeof b) {
            return a < b ? -1 : 1;
          }
          return typeof a < typeof b ? -1 : 1;
        }
        else {
          throw ("error");
        }
      }
    },
    deleteQuestionnaire(index,id){
      var url=URL_DATA.DELETE_TEACHER_QUESTION_LIST+"?ids="+id
      const loading=this.$loading({
        lock: true,
        text: '拼命添加中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$axios({
        url:url,
        method:"delete",
      }).then((res)=>{
        setTimeout(()=>{
          if (res.status==200){
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            });
          }else{
            this.$message({
              showClose: true,
              message: '删除失败',
              type: 'error'
            });
          }
          loading.close()
          this.questionnaireList.splice(index,1)
        },1000)
      })
    }
  }
}

</script>

<style scoped>
.card-style{
  height: 200px;
  width: 30%;
  float: left;
  margin: 10px;
}
.button-style{
  float: right;
  margin: 5px;
}
</style>
