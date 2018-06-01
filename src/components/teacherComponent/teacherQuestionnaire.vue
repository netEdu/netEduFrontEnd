<template>
<el-card>
  <el-form class="card-form">
    <el-form-item v-for="(val,index) in questionnaireInformation" :key="val.survey_content" v-if="val.survey_type == '0'">
      <label class="label-style" >{{val.survey_content}}</label>
        <el-rate
         style="margin-top: 10px;float: right"
         :allow-half="true"
        v-model="val.answers"
        :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
        </el-rate>
    </el-form-item>
    <el-form-item v-for="(val,index) in questionnaireInformation" :key="val.survey_content" v-if="val.survey_type == '1'" >
        <label class="label-style">{{val.survey_content}}</label>
        <div>
          <el-input type="textarea" v-model="val.answers"></el-input>
        </div>
    </el-form-item>
  </el-form>
  <el-button type="primary" @click="onSubmit()">提交</el-button>
</el-card>

</template>

<script>
  import { URL_DATA } from '../../js/util-data'
export default {
  name:'teacherQuestionnaire',
  props: {
    objData: {
      type: Object,
      default: () => { return {} }
    }
  },
  data(){
    return {
      questionnaireInformation:[],
      submitData:{
        questionnaire_id:"",
        student_id:"",
        teacher_id:"",
        answers:null
      }
    }
  },
  created(){
    let url=URL_DATA.QUERY_ONE_QUESTIONNAIRE
    this.$axios({
      url:url,
      method:'post',
      params:{questionnaire_id:this.objData.questionnaire_id}
    }).then((res)=>{
      res.data.data.surveyQuestionList.forEach((val,index)=>{
        this.questionnaireInformation.push({survey_content:val.survey_content,survey_type:val.survey_type,answers:null})
      })
    })
  },
  methods:{
    onSubmit(){
      const loading=this.$loading({
        lock: true,
        text: '拼命添加中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let url=URL_DATA.ADD_TEACHER_QUESTIONNAIRE
      this.submitData.student_id=sessionStorage.getItem("userId")
      this.submitData.teacher_id=this.objData.teacher_id
      this.submitData.questionnaire_id=this.objData.questionnaire_id
      for(let i=0;i<this.questionnaireInformation.length;i++){
        let val=this.questionnaireInformation[i]
        if (val.answer == 0 || val.answers == ""){
          this.submitData.answers=""
          this.$message({
            message:'请完成所有评价',
            type:'error'
          })
          return false
        }
        this.submitData.answers+=val.answers+","
      }
      this.submitData.answers=this.submitData.answers.substring(0,this.submitData.answers.length-1)
      this.$axios({
        url:url,
        method:'post',
        data:this.submitData
      }).then((res)=>{
        setTimeout(()=>{
          this.$message({
            message:'添加评价成功',
            type:'success'
          })
          loading.close()
          this.$emit('close-dialog')
        },500)
      }).catch((res)=>{
        setTimeout((res)=>{
          this.$message({
            message:'网络错误',
            type:'error'
          })
          loading.close()
          this.$emit('close-dialog')
        },500)
      })
    }
  }
}

</script>

<style>
.label-style{
  float: left;
  width: 70%;
}
</style>
