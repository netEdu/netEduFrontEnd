<template>
  <div>
    <div>
      <el-table :data="formData" class="table-widths">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="问题id:">
                <span>{{ props.row.question_id }}</span>
              </el-form-item>
              <el-form-item label="创建者:">
                <span>{{ props.row.creator }}</span>
              </el-form-item>
              <el-form-item label="题型:">
                <span>{{ props.row.survey_type }}</span>
              </el-form-item>
              <el-form-item label="问题内容:">
                <span>{{ props.row.survey_content }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="问题id"
          prop="question_id">
        </el-table-column>
        <el-table-column
          label="创建者"
          prop="creator">
        </el-table-column>
        <el-table-column
          label="题型"
          prop="survey_type">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row.question_id)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row.question_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="修改课程信息" :visible.sync="dialogFormVisible">
      <div class="el-card box-card" style="padding: 30px">
        <el-form :model="editData"
                 :rules="rules"
                 ref="editTeacherQuestion"
                 status-icon
                 label-width="100px"
                 label-position="left">
          <el-form-item label="创建者" prop="creator">
            <el-input v-model="editData.creator"/>
          </el-form-item>
          <el-form-item label="问题类型">
            <el-radio v-model="editData.survey_type" label="0" border >单选</el-radio>
            <el-radio v-model="editData.survey_type" label="1" border>简答</el-radio>
          </el-form-item>
          <el-form-item label="问题内容" prop="survey_content">
            <el-input type="textarea" v-model="editData.survey_content" placeholder="请输入问题内容"/>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editquestion()">确 定</el-button>
      </div>
    </el-dialog>
    <footer>
      <div class="div-floats">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          @prev-click="handleprevclick"
          @next-click="handlenextclick"
          :current-page.sync="submitData.page"
          :page-sizes="[5,10,20,50]"
          :page-size="5"
          layout="sizes, prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </footer>
  </div>
</template>

<script>
  import { URL_DATA } from '../../js/util-data'
  export default {
    name: "adminSidebar7",
    data(){
      return {
        index:"",
        total:0,
        editData:{
          question_id:"",
          creator:"",
          survey_type:"",
          survey_content:""
        },
        dialogFormVisible:false,
        formData:[],
        submitData:{
          page:1,
          pageSize:5
        },
        rules: {
          creator: [
            { required: true, message: '请输入创建者'}
          ],
          survey_content: [{ required: true, message: '请输入问题内容'}]
        }
      }
    },
    created(){
      this.formData.studentId=sessionStorage.getItem("userId")
      var url=URL_DATA.QUERY_SURVEY_QUESTION
      this.$axios({
        method: 'post',
        url: url,
        data: this.submitData
      }).then(res => {
        this.total=res.data.data.Page.count
          this.formData=res.data.data.Page.list
      })
    },
    methods: {
      handleSizeChange(val) {
        this.submitData.pageSize=val
        var url=URL_DATA.QUERY_SURVEY_QUESTION
        const loading = this.$loading({
          lock: true,
          text: '拼命加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$axios({
          method: 'post',
          url: url,
          data: this.submitData
        }).then(res => {
          this.total=res.data.data.Page.count
          setTimeout(()=>{
            this.formData=res.data.data.Page.list
            loading.close()
          },1000)
        })
      },
      handleCurrentChange(val) {
        this.submitData.page=val
        var url=URL_DATA.QUERY_SURVEY_QUESTION
        const loading = this.$loading({
          lock: true,
          text: '拼命加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$axios({
          method: 'post',
          url: url,
          data: this.submitData
        }).then(res => {
          this.total=res.data.data.Page.count
          setTimeout(()=>{
            this.formData=res.data.data.Page.list
            loading.close()
          },1000)
        })
      },
      handleprevclick(val){
        this.submitData.page=val
        var url=URL_DATA.QUERY_SURVEY_QUESTION
        const loading = this.$loading({
          lock: true,
          text: '拼命加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$axios({
          method: 'post',
          url: url,
          data: this.submitData
        }).then(res => {
          this.total=res.data.data.Page.count
          setTimeout(()=>{
            this.formData=res.data.data.Page.list
            loading.close()
          },1000)
        })
      },
      handlenextclick(val){
        this.submitData.page=val
        var url=URL_DATA.QUERY_SURVEY_QUESTION
        const loading = this.$loading({
          lock: true,
          text: '拼命加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$axios({
          method: 'post',
          url: url,
          data: this.submitData
        }).then(res => {
          this.total=res.data.data.Page.count
          setTimeout(()=>{
            this.formData=res.res.data.data.Page.list
            loading.close()
          },1000)
        })
      },
      handleEdit(index,id){
        this.dialogFormVisible=true
        var url=URL_DATA.QUERY_ONE_SURVEY_QUESTION+"?question_id="+id
        this.$axios({
          url:url,
          method:'POST',
        }).then(res=>{
          if (res.status==200){
            this.index=index
            this.editData=res.data.data
          }else{
            this.$message({
              showClose: true,
              message: '系统故障，请稍后再试',
              type: 'error'
            });
            this. dialogFormVisible=false
          }
        })
      },
      handleDelete(index,id){
        var url=URL_DATA.DELETE_SURVEY_QUESTION+"?question_ids="+id
        const loading = this.$loading({
          lock: true,
          text: '拼命加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
          this.$axios({
            url:url,
            method:'delete',
          }).then(res=>{
            setTimeout(()=>{
              this.formData.splice(index,1)
              loading.close()
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
            },1000)
          })
      },
      editquestion(){
        var id=this.editData.question_id
        var url=URL_DATA.UPDATE_SURVEY_QUESTION
        const loading = this.$loading({
          lock: true,
          text: '拼命加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$axios({
          url:url,
          data:this.editData,
          method:'post',
        }).then(res=>{
          setTimeout(()=>{
            loading.close()
            if (res.status==200){
              this.$message({
                showClose: true,
                message: '修改成功',
                type: 'success'
              });
              this.formData.splice(this.index,1,this.editData)
            }else{
              this.$message({
                showClose: true,
                message: '修改失败',
                type: 'error'
              });
            }
          },1000)
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
  .input-widths{
    width: 60%
  }
  .div-margins{
    margin-bottom: 10px
  }
  .table-widths{
    width: 100%
  }
  .div-floats{
    float:left
  }
</style>
