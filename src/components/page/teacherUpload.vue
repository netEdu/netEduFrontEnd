<template>
  <el-card>
    <el-form
      :model="allInfomation"
      label-position="top"
      label-width="150px"
      ref="informationForm"
      status-icon>
      <el-form-item
        prop="formData.course_id"
        label="请输入课程id:"
        :rules="{
          required: true, message: '课程id不能为空', trigger: 'blur'
        }">
        <el-input v-model="allInfomation.formData.course_id"/>
      </el-form-item>
      <el-form-item
        prop="formData.data_type"
        label="请选择文件类型:"
        :rules="{
          required: true, message: '资料类型不能为空', trigger: 'blur'
        }">
        <el-select v-model="allInfomation.formData.data_type">
          <el-option value="1" label="文档资料"></el-option>
          <el-option value="2" label="PPT资料"></el-option>
          <el-option value="3" label="视频资料"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-for="(val,index) in allInfomation.title"
        :label="'请输入 '+val.name+' 的文件标题'"
        :key="val.key"
        :prop="'title.'+index+'.value'"
        :rules="{
          required: true, message: '文件标题不能为空', trigger: 'blur'
        }">
        <el-input v-model="val.value"/>
      </el-form-item>
      <el-form-item
        v-for="(val, index) in allInfomation.share"
        :label="'请选择 '+val.name+' 的可见性'"
        :key="val.key"
        :prop="'share.'+index+'.value'">
        <el-radio-group v-model="val.value" size="mini">
          <el-radio-button label="0">可见</el-radio-button>
          <el-radio-button label="1">不可见</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <div style="margin-top: 10px">
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
    name: "TeacherUpload",
    data () {
      return {
        allInfomation:{
          title: [],
          share: [],
          formData:{
            course_id: '',
            data_titles: '',
            data_type: '',
            share: ''
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
        var fileName=new Array()
        fileName =file.name.split('.');
        const extension = ['xls','docx','doc','txt','swf','ppt']
        if (!extension.some(e => fileName[fileName.length - 1] === e)){
          this.$notify.error({
            title: '错误',
            message: file.name+'文件上传失败，上传模板只能是xls、docx,doc,txt,swf,ppt格式!',
          });
          this.allInfomation.title.splice(0,1)
          return false
        }
        const isLt2M = file.size / 1024 / 1024 < 50
        if(!isLt2M){
          this.$notify.error({
            title: '错误',
            message: file.name+'文件上传失败，文件上传最大为50MB!',
          });
          this.allInfomation.title.splice(0,1)
          return false
        }
        const loading = this.$loading({
          lock: true,
          text: '上传中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        let data_titles = this.allInfomation.title[0].value
        let shares = this.allInfomation.share[0].value
        let course_id = this.allInfomation.formData.course_id
        let teacher_id = sessionStorage.getItem("userId")
        // 表单文件
        let fd = new FormData()
        fd.append('files', file)
        this.$axios({
          url: URL_DATA.TEACHER_UPLOAD_MANY,
          data: fd,
          params: {
            course_id: course_id,
            teacher_id: teacher_id,
            data_titles: data_titles,
            shares
          },
          method: 'post'
        }).then(res => {
          setTimeout(() => {
            loading.close()
            this.$message({
              showClose: true,
              message: '上传成功',
              type: 'success'
            });
            this.allInfomation.title.splice(0,1)
          }, 500)
        }).catch(() =>{
          loading.close()
          this.$message({
            showClose: true,
            message: '上传失败',
            type: 'error'
          });
          this.allInfomation.title.splice(0,1)
          return false
        })
        return false
      },
      newhandleChange(file, fileNum){
        this.allInfomation.title.push({
          value: '',
          key: Math.random() * -1000,
          name: fileNum[fileNum.length - 1].name
        });
        this.allInfomation.share.push({
          value: '',
          key: Math.random() * 1000,
          name: fileNum[fileNum.length - 1].name
        });
      },
      newhandleRemove(file){
        this.allInfomation.title.forEach((e, index) => {
          if(e.name == file.name) {
            this.allInfomation.title.splice(index, 1)
            this.allInfomation.share.splice(index, 1)
          }
        })
      }
    }
  }
</script>
