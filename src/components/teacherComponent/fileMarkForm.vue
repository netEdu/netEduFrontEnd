<template>
  <div class="file-mark-form">
    <h4>
      请选择分值（每个文件仅能评分一次，请谨慎选择）: 
    </h4>
    <el-rate
      style="margin: 10px 0"
      v-model="score"
      :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
      show-text>
    </el-rate>
    <el-button type="primary" @click.prevent="submitMark">提交</el-button>
  </div>
</template>
<script>
import { URL_DATA } from '../../js/util-data'
export default {
  name: 'FileMarkForm',
  props: {
    objData: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      score: 0
    }
  },
  methods: {
    submitMark() {
      this.$axios({
        url: URL_DATA.MARK_STUDENT_DATA,
        method: 'post',
        data: {
          data_id: this.objData.data_id,
          score: this.score
        }
      }).then( res => {
        this.score = 0
        this.$emit('close-dialog')
      })
    }
  }
}
</script>

