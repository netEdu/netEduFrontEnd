<template>
  <el-form :model="paperForm">
    <el-form-item 
      label="请选择考试试卷" 
      :rules="[
        { required: true, message: '请选择一张试卷' }
      ]"
      prop="selectedPaperId">
      <el-select v-model="paperForm.selectedPaperId" placeholder="请选择一张试卷">
        <el-option 
          v-for="paper of papers" 
          :label="paper.paper_name" 
          :value="paper.paper_id"
          :key="paper.paper_id"></el-option>
      </el-select>
    </el-form-item>
    <el-button type="primary" @click.prevent="startExam">开始考试</el-button>
  </el-form>
</template>
<script>
import { URL_DATA } from '../../../js/util-data'
import { webSocket } from '../../../js/web-socket'
export default {
  name: 'PaperForm',
  data() {
    return {
      paperForm: {
        selectedPaperId: null
      },
      papers: []
    }
  },
  methods: {
    startExam() {
      webSocket().send('2,' + sessionStorage.getItem('class') + ',' + this.paperForm.selectedPaperId)
      this.$message.success('成功开始考试，考试将在两小时后结束')
      this.$emit('close-dialog')
    }
  },
  created() {
    this.$axios({
      method: 'post',
      url: URL_DATA.PAPER_LIST,
      data: {}
    }).then( res => {
      this.papers = res.data.data.list.concat()
    })
  }
}
</script>
