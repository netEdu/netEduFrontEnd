<template>
  <el-dialog :title="title" :visible.sync="_this_dialogFormVisible">
    <component :is="currentView" 
               :obj-data="objData" 
               :dialog-form-visible.sync="_this_dialogFormVisible"></component>
  </el-dialog>
</template>
<script>
  import courseForm from '../teacherComponent/courseForm'
  export default {
    name: 'formDialog',
    props: {
      // 弹出框标题
      title: {
        type: String,
        required: true
      },
      // 弹出框内置组件
      currentView: {
        type: String,
        required: true
      },
      // 用于给dialog中的组件传递数据，可以自由设置参数，默认值为空对象
      objData: {
        type: Object,
        default: () => {
          return {
            // 自己要使用的参数在这里要返回空数据类型，避免undefined错误
            initFormData: {}
          }
        }
      },
      // 控制对话框的显示与隐藏
      dialogFormVisible: {
        type: Boolean,
        required: true
      }
    },
    computed: {
      _this_dialogFormVisible: {
        get() {
          return this.dialogFormVisible
        },
        set(val) {
          this.$emit('update:dialogFormVisible', val)
        }
      }
    },
    // 组件都在这里注册
    components: {
      courseForm
    }
  }
</script>
