<template>
  <el-form 
    :model="handUpInfo" 
    label-position="top">
    <el-form-item
      prop="message">
      <el-input type="textarea" v-model="handUpInfo.message"></el-input>
    </el-form-item>
    <el-button type="primary" @click.prevent="submitHandUp">举手</el-button>
  </el-form>
</template>
<script>
import { webSocket } from '../../../js/web-socket'
export default {
  name: 'HandUp',
  data() {
    return {
      handUpInfo: {
        message: "来自" + sessionStorage.getItem('username') + '的举手'
      }
    }
  },
  methods: {
    submitHandUp() {
      // TODO: 举手逻辑
      webSocket().send(
        '7,' + 
        sessionStorage.getItem('class_num') + ',' + 
        this.handUpInfo.message
      )
      this.$message.success('举手成功')
      this.$emit('close-dialog')
    }
  }
}
</script>
