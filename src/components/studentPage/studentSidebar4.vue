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
        <el-table-column
          label="资料类型"
          prop="data_type">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="downloadFile(scope.row.data_id)">下载</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteFile(scope.row.data_id,scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { URL_DATA } from '../../js/util-data';
  export default {
    name: "studentSidebar4",
    data(){
      return {
        submitData:{
          student_id:"",
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
      var url=URL_DATA.QUERY_STUDENT_DATA
      this.submitData.student_id=sessionStorage.getItem("userId")
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
        var url=URL_DATA.QUERY_STUDENT_DATA
        this.submitData.student_id=sessionStorage.getItem("userId")
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
        var url=URL_DATA.STUDENT_DOWNLOAD_FILE+"?data_id="+dataId
        window.location.href=url
      },
      deleteFile(dataId,index){
        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const loading = this.$loading({
            lock: true,
            text: '删除中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          var url=URL_DATA.DELETE_PERSON_FILE
          this.$axios({
            method:'delete',
            url:url,
            params:{data_ids:dataId}
          }).then(res=>{
            setTimeout(_=>{
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              loading.close()
              this.formData.splice(index, 1)
            },500)

          }).catch((res)=>{
            setTimeout(_=>{
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
              loading.close()
            },500)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      }
    }
  }

</script>

<style>


</style>
