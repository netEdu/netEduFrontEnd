<template>
  <div>
    <div class="div-margins">
      <el-row :gutter="24">
        <el-col :span="10"><div class="grid-content bg-purple">
          <span>请输入学生姓名：</span>
          <el-input v-model="submitData.name" placeholder="请输入内容" class="input-widths"></el-input>
        </div></el-col>
        <el-col :span="10"><div class="grid-content bg-purple">
          <span>请输入班号：</span>
          <el-input v-model="submitData.class_num" placeholder="请输入内容" class="input-widths"></el-input>
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
              <el-form-item label="学生id:">
                <span>{{ props.row.student_id}}</span>
              </el-form-item>
              <el-form-item label="学生登录名:">
                <span>{{ props.row.username }}</span>
              </el-form-item>
              <el-form-item label="学生姓名:">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="性别:">
                <span>{{ props.row.sex }}</span>
              </el-form-item>
              <el-form-item label="身份证号:">
                <span>{{ props.row.identity }}</span>
              </el-form-item>
              <el-form-item label="出生日期:">
                <span>{{ props.row.birth }}</span>
              </el-form-item>
              <el-form-item label="籍贯:">
                <span>{{ props.row.origin }}</span>
              </el-form-item>
              <el-form-item label="邮箱:">
                <span>{{ props.row.email }}</span>
              </el-form-item>
              <el-form-item label="联系方式:">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="班号:">
                <span>{{ props.row.class_num }}班</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="学生id"
          prop="student_id">
        </el-table-column>
        <el-table-column
          label="学生登录名"
          prop="username">
        </el-table-column>
        <el-table-column
          label="学生姓名"
          prop="name">
        </el-table-column>
        <el-table-column
          label="出生日期"
          prop="birth">
        </el-table-column>
      </el-table>
    </div>
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
    name: "adminSidebar3",
    data(){
      return {
        total:0,
        formData:[],
        submitData:{
          name:"",
          class_num:"",
          page:1,
          pageSize:5
        }
      }
    },
    created(){
      this.formData.studentId=sessionStorage.getItem("userId")
      var url=URL_DATA.QUERY_STUDENT_INFORMATION
      this.$axios({
        method: 'post',
        url: url,
        data: this.submitData
      }).then(res => {
        console.info(res)
        this.total=res.data.data.count
        res.data.data.list.forEach((val,index)=>{
          if (res.data.data.list[index].sex==0){
            res.data.data.list[index].sex="男"
          }else if (res.data.data.list[index].sex==1){
            res.data.data.list[index].sex="女"
          }
          if ("birth" in res.data.data.list[index]){
            var birth= res.data.data.list[index].birth
            //birth=birth.substring(0,9)
            // res.data.data.list[index].birth=birth.split('-')[0]+"年"+birth.split('-')[1]+"月"+birth.split('-')[2]+"日"
          }
        })
        this.formData=res.data.data.list
      })
    },
    methods: {
      handleSizeChange(val) {
        this.submitData.pageSize=val
        var url=URL_DATA.QUERY_STUDENT_INFORMATION
        const loading = this.$loading({
          lock: true,
          text: '拼命添加中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$axios({
          method: 'post',
          url: url,
          data: this.submitData
        }).then(res => {
          this.total=res.data.data.count
          res.data.data.list.forEach((val,index)=>{
            if (res.data.data.list[index].sex==0){
              res.data.data.list[index].sex="男"
            }else if (res.data.data.list[index].sex==1){
              res.data.data.list[index].sex="女"
            }
            if ("birth" in res.data.data.list[index]){
              var birth= res.data.data.list[index].birth
              //birth=birth.substring(0,9)
              // res.data.data.list[index].birth=birth.split('-')[0]+"年"+birth.split('-')[1]+"月"+birth.split('-')[2]+"日"
            }
          })
          setTimeout(()=>{
            loading.close()
            this.formData=res.data.data.list
          },1000)
        })
      },
      handleCurrentChange(val) {
        this.submitData.page=val
        var url=URL_DATA.QUERY_STUDENT_INFORMATION
        const loading = this.$loading({
          lock: true,
          text: '拼命添加中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$axios({
          method: 'post',
          url: url,
          data: this.submitData
        }).then(res => {
          this.total=res.data.data.count
          res.data.data.list.forEach((val,index)=>{
            if (res.data.data.list[index].sex==0){
              res.data.data.list[index].sex="男"
            }else if (res.data.data.list[index].sex==1){
              res.data.data.list[index].sex="女"
            }
            if ("birth" in res.data.data.list[index]){
              var birth= res.data.data.list[index].birth
              //birth=birth.substring(0,9)
              // res.data.data.list[index].birth=birth.split('-')[0]+"年"+birth.split('-')[1]+"月"+birth.split('-')[2]+"日"
            }
          })
          setTimeout(()=>{
            loading.close()
            this.formData=res.data.data.list
          },1000)
        })
      },
      handleprevclick(val){
        this.submitData.page=val
        console.info(val)
        var url=URL_DATA.QUERY_STUDENT_INFORMATION
        const loading = this.$loading({
          lock: true,
          text: '拼命添加中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$axios({
          method: 'post',
          url: url,
          data: this.submitData
        }).then(res => {
          this.total=res.data.data.count
          res.data.data.list.forEach((val,index)=>{
            if (res.data.data.list[index].sex==0){
              res.data.data.list[index].sex="男"
            }else if (res.data.data.list[index].sex==1){
              res.data.data.list[index].sex="女"
            }
            if ("birth" in res.data.data.list[index]){
              var birth= res.data.data.list[index].birth
              //birth=birth.substring(0,9)
              // res.data.data.list[index].birth=birth.split('-')[0]+"年"+birth.split('-')[1]+"月"+birth.split('-')[2]+"日"
            }
          })
          setTimeout(()=>{
            loading.close()
            this.formData=res.data.data.list
          },1000)
        })
      },
      handlenextclick(val){
        this.submitData.page=val
        var url=URL_DATA.QUERY_STUDENT_INFORMATION
        const loading = this.$loading({
          lock: true,
          text: '拼命添加中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$axios({
          method: 'post',
          url: url,
          data: this.submitData
        }).then(res => {
          this.total=res.data.data.count
          res.data.data.list.forEach((val,index)=>{
            if (res.data.data.list[index].sex==0){
              res.data.data.list[index].sex="男"
            }else if (res.data.data.list[index].sex==1){
              res.data.data.list[index].sex="女"
            }
            if ("birth" in res.data.data.list[index]){
              var birth= res.data.data.list[index].birth
              //birth=birth.substring(0,9)
              // res.data.data.list[index].birth=birth.split('-')[0]+"年"+birth.split('-')[1]+"月"+birth.split('-')[2]+"日"
            }
          })
          setTimeout(()=>{
            loading.close()
            this.formData=res.data.data.list
          },1000)
        })
      },
      onSubmit(){
        var url=URL_DATA.QUERY_STUDENT_INFORMATION
        const loading = this.$loading({
          lock: true,
          text: '拼命添加中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$axios({
          method: 'post',
          url: url,
          data: this.submitData
        }).then(res => {
          this.total=res.data.data.count
          res.data.data.list.forEach((val,index)=>{
            if (res.data.data.list[index].sex==0){
              res.data.data.list[index].sex="男"
            }else if (res.data.data.list[index].sex==1){
              res.data.data.list[index].sex="女"
            }
            if ("birth" in res.data.data.list[index]){
              var birth= res.data.data.list[index].birth
              //birth=birth.substring(0,9)
              // res.data.data.list[index].birth=birth.split('-')[0]+"年"+birth.split('-')[1]+"月"+birth.split('-')[2]+"日"
            }
          })
          setTimeout(()=>{
            loading.close()
            this.formData=res.data.data.list
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
