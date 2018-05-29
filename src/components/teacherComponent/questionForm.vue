<template>
  <el-form :model="formData" :rules="rules" ref="questionForm" label-width="100px" label-position="left">
    <h2 v-if="title">{{ title }}</h2>
    <el-form-item prop="question_type" label="题目类型">
      <el-select v-model="formData.question_type" placeholder="请选择题目类型" clearable>
        <el-option label="选择题" value="1" />
        <el-option label="判断题" value="0" />
      </el-select>
    </el-form-item>
    <el-form-item prop="difficulty" label="难度">
      <el-select v-model="formData.difficulty" placeholder="请选择题目类型" clearable>
        <el-option label="简单" value="1" />
        <el-option label="中等" value="2" />
        <el-option label="困难" value="3" />
      </el-select>
    </el-form-item>
    <el-form-item prop="question_answer" label="正确答案">
      <el-select v-model="formData.question_answer" placeholder="请选择正确答案" clearable>
        <el-option 
          v-for="(option, index) in correctAnswer" 
          :key="index"
          :label="option.label" 
          :value="option.key" />
      </el-select>
    </el-form-item>
    <el-form-item prop="question_content" label="考题内容">
      <el-input type="textarea" :rows="5" v-model="formData.question_content" placeholder="请输入考题内容" />
    </el-form-item>
    <el-collapse-transition>
      <div class="form-detial" v-if="formData.question_type == 1">
        <el-form-item
          label="选项A"
          prop="options1">
          <el-input v-model="options1"></el-input>
        </el-form-item>
        <el-form-item
          label="选项B"
          prop="options1">
          <el-input v-model="options2"></el-input>
        </el-form-item>
        <el-form-item
          label="选项C"
          prop="options1">
          <el-input v-model="options3"></el-input>
        </el-form-item>
        <el-form-item
          label="选项D"
          prop="options1">
          <el-input v-model="options4"></el-input>
        </el-form-item>
      </div>
    </el-collapse-transition>
    <el-button type="primary" @click.prevent="onSubmit('questionForm')">提交</el-button>
  </el-form>
</template>
<script>
import { questionRules, URL_DATA } from '../../js/util-data.js'
export default {
  name: 'questionForm',
  props: {
    objData: {
      type: Object,
      default: () => { return {} }
    },
    dialogFormVisible: {
      type: Boolean
    },
    title: {
      type: String
    }
  },
  watch: {
    formData: {
      handler(val) {
        if(val.question_type == 1){
          this.correctAnswer = this.correctAnswerOfChoice.concat()
        } else {
          this.correctAnswer = this.correctAnswerOfJudge.concat()
        }
      },
      deep: true
    },
    objData: {
      handler(val) {
        if(JSON.stringify(val) !== '{}'){
          let currentQuestion = this.$store.getters['teacher/currentQuestion'](this.objData.question_id)
          // 对象属性拷贝
          for(let param in this.formData) {
            this.formData[param] = currentQuestion[param]
          }
          if(currentQuestion.questionOptionList.length > 0) {
            this.options1 = currentQuestion.questionOptionList[0].option_content
            this.options2 = currentQuestion.questionOptionList[1].option_content
            this.options3 = currentQuestion.questionOptionList[2].option_content
            this.options4 = currentQuestion.questionOptionList[3].option_content
          }
        }
      },
      deep: true
    }
  },
  data() {
    return {
      // 表单内容
      formData: {
        teacher_id: '',
        question_id: 0,
        question_type: null,
        question_content: '',
        question_answer: '',
        difficulty: '',
        options: ''
      },
      options1: '',
      options2: '',
      options3: '',
      options4: '',
      correctAnswerOfChoice: [
        { label: 'A', key: 1 },
        { label: 'B', key: 2 },
        { label: 'C', key: 3 },
        { label: 'D', key: 4 }
      ],
      correctAnswerOfJudge: [
        { label: '正确', key: 1 },
        { label: '错误', key: 0 }
      ],
      correctAnswer: [],
      // 表单规则
      rules: questionRules
    }
  },
  methods: {
    onSubmit(formName) {
      this.formData.teacher_id = sessionStorage.getItem('userId')
      this.$refs[formName].validate( valid => {
        // const loading = this.$loading({
        //   lock: true,
        //   text: '拼命上传中',
        //   spinner: 'el-icon-loading',
        //   background: 'rgba(0, 0, 0, 0.7)'
        // })
        // console.log(JSON.stringify(this.objData))
        if(valid) {
          console.log('valid')
          // TODO: 编辑题目、添加题目提交接口
          if(this.formData.question_id > 0) {
            this.formData.options = this.options1 + ',' 
              + this.options2 + ',' 
              + this.options3 + ',' 
              + this.options4
            this.$axios({
              method: 'put',
              url: URL_DATA.MODIFY_QUESTION,
              data: this.formData
            }).then( res => {
              loading.close()
              this.$message.success(JSON.stringify(this.objData) === '{}' ? '添加成功' : '编辑成功')
              this.dialogFormVisible = false
            }).catch( res => {
              loading.close()
              this.$message.error('网络错误')
            })
          }
        } else {
          loading.close()
        }
      })
    }
  },
  mounted() {
    if(JSON.stringify(this.objData) !== '{}'){
      let currentQuestion = this.$store.getters['teacher/currentQuestion'](this.objData.question_id)
      console.log(currentQuestion)
      // 对象属性拷贝
      for(let param in this.formData) {
        console.log(currentQuestion[param])
        this.formData[param] = currentQuestion[param]
      }
      // 计算正确答案
      this.formData.question_answer = (function() {
        let correctAnswer = 0;
        currentQuestion.questionOptionList.forEach( e => {
          if(e.option_id == currentQuestion.question_answer){
            correctAnswer = e.option_id
          }
        })
        return correctAnswer
      })()
      if(currentQuestion.questionOptionList.length > 0) {
        this.options1 = currentQuestion.questionOptionList[0].option_content
        this.options2 = currentQuestion.questionOptionList[1].option_content
        this.options3 = currentQuestion.questionOptionList[2].option_content
        this.options4 = currentQuestion.questionOptionList[3].option_content
      }
    }
  }
}
</script>
