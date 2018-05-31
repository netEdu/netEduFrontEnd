<template>
  <div>
    <div id="timer" style="color:red"></div>
    <div id="warring" style="color:red"></div>
    <div id="printInformation">
      <h2>选择题</h2>
      <div v-for="(chooseVal,chooseIndex) in chooseQuestions" class="choose-style">
        <div>{{chooseIndex+1}}. {{chooseVal.question_content}}</div>
        <span v-for="(optionVal,optionIndex) in chooseVal.questionOptionList" class="option-style">
          <span v-if="optionIndex == '0'"><el-radio v-model="chooseVal.question_answer" label="0">A.{{optionVal.option_content}}</el-radio></span>
          <span v-if="optionIndex == '1'"><el-radio v-model="chooseVal.question_answer" label="1">B.{{optionVal.option_content}}</el-radio></span>
          <span v-if="optionIndex == '2'"><el-radio v-model="chooseVal.question_answer" label="2">C.{{optionVal.option_content}}</el-radio></span>
          <span v-if="optionIndex == '3'"><el-radio v-model="chooseVal.question_answer" label="3">D.{{optionVal.option_content}}</el-radio></span>
        </span>
      </div>
      <h2 >判断题</h2>
      <div v-for="(val,index) in decideQuestions" class="decide-style">
        <span>{{index+1}}. {{val.question_content}}</span>
        <span class="option-style">
          <el-radio v-model="val.question_answer" label="1">正确</el-radio>
          <el-radio v-model="val.question_answer" label="0">错误</el-radio>
        </span>
      </div>
    </div>
    <el-button @click="onSubmit()">提交</el-button>
  </div>
</template>

<script>
  import {URL_DATA} from "../../js/util-data"
export default {
  name:'beginTest',
  props: {
    objData: {
      type: Object,
      default: () => { return {} }
    }
  },
  data(){
    return {
      submitData:{
        paper_id:"",
        student_answers:"",
        student_id:""
      },
      chooseQuestions:[],
      decideQuestions:[],
      timer:"",
      loading:null
    }
  },
  created(){
    let url=URL_DATA.QUERY_STUDENT_EXAM_INFORMATION
   this.$axios({
     method:'get',
     url:url,
     params:{id:this.objData.paper_id}
   }).then((res)=>{
     res.data.forEach((val,index)=>{
       if (val.question_type == '1'){
          this.chooseQuestions.push({index:index,question_content:val.question_content,questionOptionList:val.questionOptionList,question_answer:null})
       }else{
          this.decideQuestions.push({index:index,question_content:val.question_content,questionOptionList:val.questionOptionList,question_answer:null})
       }
     })
     var maxtime = 40 //一个小时，按秒计算，自己调整!
     var minutes=0
     var seconds=0
     var msg=""
     var time=maxtime-30
     this.timer = setInterval(()=>{
       if (time >= 0) {
         minutes = Math.floor(time / 60);
         seconds = Math.floor(time % 60);
         msg = "距离考试结束还有" + minutes + "分" + seconds + "秒";
         document.all["timer"].innerHTML = msg;
         if (time == 5 * 60){
           this.$message({
             message: '距离考试结束还有5分钟',
             type: 'warning'
           });
         }
         --maxtime;
         --time;
       } else if (maxtime <= 29 && maxtime > 0) {
         if (maxtime == 29){
            this.loading=this.$loading({
              lock: true,
              text: '试卷已被锁定，请提交试卷',
              background: 'rgba(0, 0, 0, 0.7)',
              target: document.getElementById('printInformation')
            })
           this.$message({
             message: '考试结束，30秒后将自动提交试卷',
             type: 'warning'
           });
         }
         --maxtime;
       }else if (maxtime == 0) {
         this.onSubmit()
         this.loading.close()
         clearInterval(this.timer);
       }
     }, 1000);
   })
  },
  methods:{
    quickSort (arr)  {
      if (arr.length < 2) { return arr }
      let left = []
      let right = []
      let privot = arr.splice(Math.floor(arr.length / 2), 1)[0]
      arr.forEach( element => {
        element.index < privot.index ? left.push(element) : right.push(element)
      })
      return [...this.quickSort(left), privot, ...this.quickSort(right)]
    },
    onSubmit(){
      clearInterval(this.timer)
      if (this.loading!=null){
        this.loading.close()
      }
      let arr=this.chooseQuestions.concat(this.decideQuestions)
      let student_answers=""
      let resultArray=this.quickSort(arr)
      resultArray.forEach((val,index)=>{
          if (val.question_answer == null){
            val.question_answer=""
          }
          student_answers+=val.question_answer+","
      })
      student_answers=student_answers.substring(0,student_answers.length-1)
      this.submitData.paper_id=this.objData.paper_id
      this.submitData.student_answers=student_answers
      this.submitData.student_id=sessionStorage.getItem('userId')
      console.info(this.submitData)
      let url=URL_DATA.CHECK_PAPER
      this.$axios({
        url:url,
        method:'post',
        data:this.submitData
      }).then((res)=>{
          console.info(res)
          this.$message({
          message: '试卷已提交',
          type: 'success'
        });
      }).catch((res)=>{
        this.$message({
          message: '网络异常',
          type: 'error'
        });
      })
      this.$emit('close-dialog')

    }
  }
}
</script>

<style>
  .choose-style{
    margin:20px;
  }
  .decide-style{
    margin: 20px;
  }
  .option-style{
    margin: 5px;
  }

</style>
