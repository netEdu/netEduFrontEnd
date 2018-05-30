<template>
  <center>
    <el-form :model="chosenClass">
        <el-select v-model="chosenClass.classNumber" placeholder="请选择班级">
        <el-option
          :rules="[
            { required: true, message: '请选择班级' }
          ]"
          v-for="item of classes"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" @click.prevent="enterClass">选择</el-button>
    </el-form>
  </center>
</template>
<script>
import { URL_DATA } from '../../../js/util-data'
import { webSocket } from '../../../js/web-socket' 
export default {
  name: 'ClassForm',
  data() {
    return {
      classes: [
        { label: '一班', value: 1 },
        { label: '二班', value: 2 },
        { label: '三班', value: 3 },
        { label: '四班', value: 4 },
        { label: '五班', value: 5 },
        { label: '六班', value: 6 }
      ],
      chosenClass: {
        classNumber: null
      }
    }
  },
  methods: {
    enterClass() {
      this.$axios({
        method: 'post',
        url: URL_DATA.ENTER_CLASS,
        params: {
          id: this.chosenClass.classNumber
        }
      }).then( res => {
        this.$store.dispatch('chat/createClassGroup', {
          group_name: this.chosenClass.classNumber + '班',
          group_id: 'class_' + Date.now(),
          members: res.data.concat()
        })
        // 8,teacherID,classID
        webSocket().send('8,' + sessionStorage.getItem('userId') + ',' + this.chosenClass.classNumber)
        this.$emit('close-dialog')
      })
    }
  }
}
</script>
