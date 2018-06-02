<template>
  <el-form :model="questionaireForm">
    <el-form-item 
      label="请选择评教问卷" 
      :rules="[
        { required: true, message: '请选择一张问卷' }
      ]"
      prop="selectedQuestionaireId">
      <el-select v-model="questionaireForm.selectedQuestionaireId" placeholder="请选择一张问卷">
        <el-option 
          v-for="questionaire of questionaires" 
          :label="questionaire.questionnaire_name" 
          :value="questionaire.questionnaire_id"
          :key="questionaire.questionnaire_id"></el-option>
      </el-select>
    </el-form-item>
    <el-button type="primary" @click.prevent="startExam">开始考试</el-button>
  </el-form>
</template>
<script>
import { URL_DATA } from '../../../js/util-data'
import { webSocket } from '../../../js/web-socket'
export default {
  name: 'questionaireForm',
  props: {
    // type3 教师评价
    // type4 学生评价
    objData: Object
  },
  data() {
    return {
      questionaireForm: {
        selectedQuestionaireId: null
      },
      questionaires: []
    }
  },
  watch: {
    objData: {
      handler(val) {
        if(val == 3){
          this.questionaires = []
          this.$axios({
            method: 'post',
            url: URL_DATA.QUERY_QUESTIONNAIRES,
            data: {}
          }).then( res => {
            this.questionaires = res.data.data.list.concat()
          })
        } else {
          this.questionaires = [
            { questionnaire_name: '学生互评问卷1', questionnaire_id: 1 },
            { questionnaire_name: '学生互评问卷2', questionnaire_id: 2 },
            { questionnaire_name: '学生互评问卷3', questionnaire_id: 3 }
          ]
          this.questionaireForm.selectedQuestionaireId = null
        }
      },
      deep: true
    }
  },
  methods: {
    startExam() {
      webSocket().send(
        this.objData.type + ',' + 
        (this.objData.type == 3 ? (sessionStorage.getItem('userId') + ',') : '') +
        sessionStorage.getItem('class') + ',' + 
        this.questionaireForm.selectedQuestionaireId)

      this.$message.success(this.objData.type == 3 ? '成功开始教师评价' : '成功开始学生评价')
      this.$emit('close-dialog')
    }
  },
  mounted() {
    if(this.objData.type == 3){
      this.questionaires = []
      this.$axios({
        method: 'post',
        url: URL_DATA.QUERY_QUESTIONNAIRES,
        data: {}
      }).then( res => {
        this.questionaires = res.data.data.list.concat()
      })
    } else {
      this.questionaires = this.questionaires = [
        { questionnaire_name: '学生互评问卷1', questionnaire_id: 1 },
        { questionnaire_name: '学生互评问卷2', questionnaire_id: 2 },
        { questionnaire_name: '学生互评问卷3', questionnaire_id: 3 }
      ]
      this.questionaireForm.selectedQuestionaireId = null
    }
  }
}
</script>