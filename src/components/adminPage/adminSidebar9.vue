<template>
<el-card class="box-card">
  <el-card class="div-margins card-width">
    <el-form
      ref="addTeacherQuestion"
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
        <el-button type="primary" @click.prevent="onSubmit('addTeacherQuestion')">提交</el-button>
      </div>
      </el-col>
    </el-row>
    </el-form>
  </el-card>
  <div class="table-container" >
    <!-- 已添加考题列表 -->
    <div class="table-left">
      <el-table :data="existQuestions" max-height="500" height="500" border>
        <el-table-column prop="survey_content" label="已添加的考题(每题10分，满分100分)">
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
            <el-button type="text" @click="removeQuestion(props.row)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 未添加考题列表 -->
    <div class="table-right">
      <el-table :data="checkboxGroupInformation" max-height="500" height="500" border>
        <el-table-column prop="survey_content" label="未添加的考题(每题10分，满分100分)">
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
            <el-button type="text" @click="addQuestion(props.row)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</el-card>
</template>
<script>
  import { URL_DATA } from '../../js/util-data'
  export default {
    name: "adminSidebar9",
    data(){
      return {
        value:"",
        teacherList:[],
        existQuestions:[],
        checkboxGroupInformation:[],
        submitData:{
          questionnaire_name:"",
          creator:"",
          remarks:"",
          survey_questions:"",
          create_time:new Date()
        }
      }
    },
    created(){
      var url=URL_DATA.QUERY_SURVEY_QUESTION
      this.$axios({
        method: 'post',
        url: url,
        data:{pageSize:200}
      }).then(res => {
        this.total=res.data.data.Page.count
        setTimeout(()=>{
          this.checkboxGroupInformation=res.data.data.Page.list
          this.teacherList=res.data.data.Teacher
        })
      })
    },
    methods:{
      onSubmit(formName){
        var url=URL_DATA.ADD_TEACHER_QUESTION
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
            console.info(this.submitData)
            const loading = this.$loading({
              lock: true,
              text: '拼命添加中',
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
                    message: '添加成功',
                    type: 'success'
                  });
                  this.formData={}
                }else{
                  this.$message({
                    showClose: true,
                    message: '添加失败',
                    type: 'error'
                  });
                }
                loading.close()
              },1000)
              this.submitData.survey_questions=""
              this.existQuestions.forEach((val,index)=>{
                this.checkboxGroupInformation.push(val)
              })
              this.existQuestions=[]
              this.checkboxGroupInformation.sort(this.condition("question_id"))
            })
          }
        })
      },
      filterType(value, row) {
        return row.survey_type === value
      },
      addQuestion(row){
        this.checkboxGroupInformation.forEach( (e, index) => {
          if(e.question_id == row.question_id ){
            this.checkboxGroupInformation.splice(index, 1)
          }
        })
        this.existQuestions.push(row)
        this.existQuestions.sort(this.condition("question_id"))
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
      removeQuestion(row){
        this.existQuestions.forEach( (e, index) => {
          if(e.question_id == row.question_id ){
            this.existQuestions.splice(index, 1)
          }
        })
        this.checkboxGroupInformation.push(row)
        this.checkboxGroupInformation.sort(this.condition("question_id"))
      }
    }
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
    width: 50%;
    border-right: 1px #ababab solid;
    float: left;
  }
  .table-right {
    box-sizing: border-box;
    width: 50%;
    float: left;
    overflow-y: scroll
  }
</style>
