<template>
<div>
  <div style="margin-bottom: 10px">
    <el-row :gutter="24">
      <el-col :span="7"><div class="grid-content bg-purple">
        <span>请输入资料标题：</span>
        <el-input v-model="submitData.data_title" placeholder="请输入内容" style="width: 60%"></el-input>
      </div></el-col>
      <el-col :span="7"><div class="grid-content bg-purple">
        <span>请输入课程id：</span>
        <el-input v-model="submitData.course_id" placeholder="请输入内容" style="width: 60%"></el-input>
      </div></el-col>
      <el-col :span="7"><div class="grid-content bg-purple">
        <span>请输入资料类型：</span>
        <el-input v-model="submitData.data_type" placeholder="请输入内容" style="width: 60%"></el-input>
      </div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple">
        <el-button type="primary" @click.prevent="onSubmit()">提交筛选</el-button>
      </div>
      </el-col>
    </el-row>
  </div>
  <hr/>
  <div style="margin-top: 10px">
    <el-table :data="formData" style="width: 100%">
      <el-table-column
        label="课程 ID"
        prop="course_id">
      </el-table-column>
      <el-table-column
        label="资料标题"
        prop="data_title">
      </el-table-column>
      <el-table-column
        label="上传时间"
        prop="upload_time">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="downloadFile(scope.row.data_id)">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
  import { URL_DATA } from '../../js/util-data';
  export default {
    name: "studentSidebar6",
    data(){
      return {
        submitData:{
          data_title:"",
          course_id:"",
          data_type:"",
        },
        formData:[{
          data_id:"",
          data_title:"",
          course_id:"",
          savepath:"",
          data_type:"",
          upload_time:"",
          course_name:"",
          name:"",
          class_num:""
        }]
      }
    },
    created(){
      var url=URL_DATA.QUERY_TEACHER_DATA
        this.$axios({
          method: 'post',
          url: url,
          data:this.submitData
        }).then(res=>{
          this.formData=res.data
        })
    },
    methods:{
      onSubmit(){
        const loading = this.$loading({
          lock: true,
          text: '搜索中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        var url=URL_DATA.QUERY_TEACHER_DATA
        this.$axios({
          method: 'post',
          url: url,
          data:this.submitData
        }).then(res=>{
          setTimeout(_=>{
            loading.close()
            this.formData=res.data
          },500)
        })
      },
      downloadFile(dataId){
        var url=URL_DATA.STUDENT_DOWNLOAD_FILE
        this.$axios({
          method:'get',
          url:url,
          params:{data_id:dataId}
        }).then(res=>{
          console.info(res)
        })
      }
  }
  }
</script>

<style scoped>

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

</style>
