<template>
<el-card>
  <el-table
    :data="submitData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="student_id"
      label="学生id" width="100">
    </el-table-column>
    <el-table-column
      prop="student_name"
      label="学生姓名" width="100">
    </el-table-column>
    <el-table-column
      label="思想成绩">
      <template slot-scope="ideology">
        <el-rate
          allow-half
          v-model="ideology.row.ideology"
          :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
        </el-rate>
      </template>
    </el-table-column>
    <el-table-column
      label="学习热情">
      <template slot-scope="study">
        <el-rate
          allow-half
          v-model="study.row.study"
          :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
        </el-rate>
      </template>
    </el-table-column>
    <el-table-column
      label="品德成绩">
      <template slot-scope="morality">
        <el-rate
          allow-half
          v-model="morality.row.morality"
          :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
        </el-rate>
      </template>
    </el-table-column>
  </el-table>
  <el-button type="primary" @click="onSubmit()" class="button-style">提交</el-button>
</el-card>

</template>

<script>
  import {URL_DATA} from "../../js/util-data";

  export default {
   name:'studentQuestionnaire',
    props: {
      objData: {
        type: Object,
        default: () => { return {} }
      }
    },
    data(){
     return {
       studentList:[],
       submitData:[]
     }
    },
    created(){
      let url=URL_DATA.ENTER_CLASS
      this.$axios({
        url:url,
        method:'post',
        params:{id:this.objData.class_num}
      }).then((res)=>{
         res.data.forEach((val,index)=>{
           this.submitData.push({student_id:val.student_id,student_name:val.name,ideology:1,study:1,morality:1})
         })
      }).catch( err => {
        this.$message.error('网络错误')
      })
    },
    methods:{
     onSubmit(){
       const loading = this.$loading({
         lock:true,
         lock: true,
         text: '添加中....',
         spinner: 'el-icon-loading',
         background: 'rgba(0, 0, 0, 0.7)',
       })
       let url = URL_DATA.ADD_STUDENT_QUESTIONNAIRE
       this.$axios({
         url:url,
         method:'post',
         data:this.submitData
       }).then((res)=>{
         setTimeout(()=>{
           loading.close()
           this.$message({
             message:'添加学生评价成功',
             type:'success'
           })
           this.$emit('close-dialog')
         },500)
       }).catch((res)=>{
         setTimeout(()=>{
           loading.close()
           this.$message({
             message:'网络异常',
             type:'error'
           })
           this.$emit('close-dialog')
         },500)
       })
     }
    }
 }

</script>

<style scoped>
  .button-style{
    margin: 10px;
  }

</style>
