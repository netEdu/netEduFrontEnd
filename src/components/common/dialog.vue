<template>
  <el-dialog
    :title="title"
    :visible.sync="_this_dialogFormVisible"
    :close-on-press-escape="closeOnPressEscape"
    :close-on-click-modal="closeOnClickModal"
    :show-close="showClose">
    <component :is="currentView"
               :obj-data="objData"
               @close-dialog="closeDialog"></component>
  </el-dialog>
</template>
<script>
  import courseForm from '../teacherComponent/courseForm'
  import questionForm from '../teacherComponent/questionForm'
  import classForm from './chat/ClassForm'
  import beginTest from '../studentComponent/beginTest'
  import fileMarkForm from '../teacherComponent/fileMarkForm'
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
      // 是否显示关闭按钮
      showClose: {
        type: Boolean,
        default: true
      },
      // 按esc是否能关闭模态框
      closeOnPressEscape: {
        type: Boolean,
        default: true
      },
      // 点击模态框周围是否能关闭模态框
      closeOnClickModal: {
        type: Boolean,
        default: true
      },
      // 用于给dialog中的组件传递数据，可以自由设置参数，默认值为空对象
      objData: {
        type: Object,
        default: () => {
          return {
            // 自己要使用的参数在这里要返回空数据类型，避免undefined错误
            course_id: 0,
            question_id: 0,
            paper_id: 0,
            file_id: 0
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
    methods: {
      closeDialog() {
        this._this_dialogFormVisible = false
      }
    },
    // 组件都在这里注册
    components: {
      courseForm,
      questionForm,
      classForm,
      beginTest,
      fileMarkForm
    }
  }
</script>
