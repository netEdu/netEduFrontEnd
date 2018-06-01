<template>
  <el-form 
    :model="handUpInfo" 
    label-position="top">
    <el-form-item
      prop="message">
      <el-input type="textarea" v-model="handUpInfo.message"></el-input>
    </el-form-item>
    <el-button type="primary">提交</el-button>
  </el-form>
</template>
<script>
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
    }
  }
}
</script>
