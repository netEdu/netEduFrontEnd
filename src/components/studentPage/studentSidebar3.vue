<template>
  <el-card class="box-card" shadow="always">
    <el-form
      :model="allInfomation"
      ref="informationForm"
      status-icon>
      <el-form-item
        prop="formData.course_id"
        label="请输入课程id:"
        :rules="{required: true, message: '课程id不能为空', trigger: 'blur'}">
        <el-input v-model="allInfomation.formData.course_id"/>
      </el-form-item>
      <el-form-item
        v-for="(val,index) in allInfomation.title"
        :label="'请输入'+val.name+'的文件标题'"
        :key="val.key"
        :prop="'title.'+index+'.value'"
        :rules="{
      required: true, message: '文件标题不能为空', trigger: 'blur'
    }">
        <el-input v-model="val.value"/>
      </el-form-item>
        <div style="text-align: center;margin-top: 10px">
          <el-form-item>
            <el-upload
              class="upload-demo"
              ref="upload"
              drag
              :auto-upload="false"
              action="123"
              :on-change="newhandleChange"
              :on-remove="newhandleRemove"
              :before-upload="beforeUploadFile"
              multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传txt/doc/docx/ptf文件</div>
              </el-upload>
          </el-form-item>
        </div>
      <el-form-item style="text-align:center">
        <el-button type="primary" @click="newSubmitForm('informationForm')" class="yes-btn">
          确 定
        </el-button>
        <el-button @click="resetForm('informationForm')">
          重 置
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import { URL_DATA } from '../../js/util-data'
  export default {
    name: "studentSidebar3",
    data () {
      return {
        allInfomation:{
          fileList:[],
          title:[],
          formData:{
            course_id:"",
            student_id:"",
            data_titles:""
          }
        }
      }
    },
    methods:{
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      newSubmitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid){
            this.$refs.upload.submit()
          }else{

            this.$message.error('请完善信息')
          }
        })

    },
    beforeUploadFile(file){
        const loading = this.$loading({
          lock: true,
          text: '上传中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        let data_titles = this.allInfomation.title[0].value
        let course_id = this.allInfomation.formData.course_id
        let student_id = sessionStorage.getItem("userId")
        let fd = new FormData()
        fd.append('files', file)
        let url = URL_DATA.UPLOAD_MANY_FILES + '?course_id=' + course_id + "&student_id=" + student_id + "&data_titles=" + data_titles
        this.$axios({
          url: url,
          data: fd,
          method: 'post'
        }).then(res => {
          setTimeout(() => {
            loading.close()
            this.$message({
              showClose: true,
              message: '上传成功',
              type: 'success'
            });
            this.resetForm('informationForm')
          }, 500)
        }).catch(() =>{
          this.$message({
            showClose: true,
            message: '上传失败',
            type: 'error'
          });
          return false
        })
        return false
      },
      newhandleChange(file,fileNum){
          this.allInfomation.title.push({
            value: '',
            key: Date.now(),
            name: fileNum[fileNum.length-1].name
          });
      },
      newhandleRemove(file,fileNum){
        for(var i=0;i<this.allInfomation.title.length;i++){
          if (this.allInfomation.title[i].name==file.name){
            this.allInfomation.title.splice(i,1);
          }
        }
      }
    }
  }
</script>
<style scoped>
  .el-card {
    width: 70%;
    margin: 0 auto;
  }

</style>
