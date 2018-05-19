<template>
  <div>
    <div class="div-margins">
      <el-row :gutter="24">
        <el-col :span="5"><div class="grid-content bg-purple">
          <span>请输入课程名称:</span>
          <el-input v-model="submitData.course_name" placeholder="请输入课程名称" class="input-widths"></el-input>
        </div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple">
          <span>请输入教师姓名:</span>
          <el-input v-model="submitData.name" placeholder="请输入教师姓名" class="input-widths"></el-input>
        </div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple">
          <span>请输入班号:</span>
          <el-input v-model="submitData.class_num" placeholder="请输入班号" class="input-widths"></el-input>
        </div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple">
          <span>请选择审核状态:</span>
          <el-select v-model="submitData.audit_status" clearable placeholder="请选择" class="select-widths">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple">
          <el-button type="primary" @click.prevent="onSubmit()">提交筛选</el-button>
        </div>
        </el-col>
      </el-row>
    </div>
    <hr/>
    <div>
      <el-table :data="formData" class="table-widths">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="教师名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="课程名称">
                <span>{{ props.row.course_name }}</span>
              </el-form-item>
              <el-form-item label="学分">
                <span>{{ props.row.credit }}</span>
              </el-form-item>
              <el-form-item label="学时">
                <span>{{ props.row.hours }}</span>
              </el-form-item>
              <el-form-item label="上课时间">
                <span>{{ props.row.class_time }}</span>
              </el-form-item>
              <el-form-item label="课程简介">
                <span>{{ props.row.course_introduce }}</span>
              </el-form-item>
              <el-form-item label="课程考核方法">
                <span>{{ props.row.assessment_method }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="教师名称"
          prop="name">
        </el-table-column>
        <el-table-column
          label="课程名称"
          prop="course_name">
        </el-table-column>
        <el-table-column
          label="课程描述"
          prop="course_introduce">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div v-if="scope.row.audit_status == 0">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index,scope.row.course_id)">审核</el-button>
            </div>
           <div v-else>
              已审核
           </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 审核的模态框-->
    <el-dialog title="课程审核" :visible.sync="dialogFormVisible">
      <div class="el-card box-card" style="padding: 30px">
        <el-form>
          <el-form-item label="审核状态:" class="switch-position">
            <el-switch
              v-model="form.result"
              width='80'
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="通过"
              inactive-text="驳回">
            </el-switch>
          </el-form-item>
          <el-form-item label="审核意见" >
            <el-input v-model="verifyData.audit_opinion" />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeState()">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import { URL_DATA } from '../../js/util-data'
  export default {
    name: "adminSidebar5",
    data(){
      return {
        options: [{
          value: 1,
          label: '已审核'
        }, {
          value: 0,
          label: '未审核'
        }],
        formData:[],
        form:{
          result:true,
          index:""
        },
        dialogFormVisible:false,
        submitData:{
          name:"",
          course_name:"",
          class_num:"",
          audit_status:""
        },
        verifyData:{
          course_id:"",
          audit_status:"",
          audit_opinion:""
        }
      }
    },
    created(){
      this.formData.studentId=sessionStorage.getItem("userId")
      var url=URL_DATA.QUERY_COURSE_LIST
      this.$axios({
        method: 'post',
        url: url,
        data: this.submitData
      }).then(res => {
         this.formData=res.data
      })
    },
    methods: {
      onSubmit() {
        var url = URL_DATA.QUERY_COURSE_LIST
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
          setTimeout(()=>{
            this.formData=res.data
            loading.close()
          },1000)
        })
      },
      handleEdit(index,course_id){
        this.dialogFormVisible=true
        this.verifyData.course_id=course_id
        this.form.index=index
      },
      changeState(){
        const loading = this.$loading({
          lock: true,
          text: '处理中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        if (this.form.result==true){
          this.verifyData.audit_status=1
        }else{
          this.verifyData.audit_status=2
        }
        this.dialogFormVisible = false
        var url=URL_DATA.VERIFY_COURSE
        this.$axios({
          method: 'put',
          url: url,
          data: this.verifyData
        }).then(res => {
          setTimeout(()=>{
            this.formData[this.form.index].audit_status=1
            loading.close()
            this.verifyData={}
          })
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
    width: 50%
  }
  .div-margins{
    margin-bottom: 10px
  }
  .table-widths{
    width: 100%
  }
  .select-widths{
    width: 50%
  }
  .switch-position{
    text-align: center
  }
  .form-style{
    width:40%
  }
</style>
