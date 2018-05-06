<template>
	<div class="login-wrap">
		<div class="ms-title">网络教学管理系统</div>
		<div class="ms-login">
			<el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0px" class="demo-ruleForm">
				<el-form-item prop="username">
					<el-input v-model="loginForm.username" placeholder="username"/>
				</el-form-item>
				<el-form-item prop="password">
					<el-input type="password" placeholder="password" v-model="loginForm.password"
					          @keyup.enter.native="submitForm('loginForm')"/>
				</el-form-item>
				<div class="login-btn">
					<el-button type="primary" @click.prevent="login($data.loginForm.username, $data.loginForm.password)">
						登录
					</el-button>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script>
import { URL_DATA, SOCKET_IP } from '../../js/util-data'

export default {
  data: function() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    login(username, password) {
      const loading = this.$loading({
        lock: true,
        text: '登录中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$axios({
        method: 'post',
        url: URL_DATA.LOGIN,
        data: {
          username: username,
          password: password
        }
      }).then(res => {
        loading.close()
        // 如果不是错误的登录
        if (res.data !== 'BAD REQUEST') {
          // session中放入用户名和用户id
          sessionStorage.setItem('username', username)
          if (res.data=="ADMIN"){
            sessionStorage.setItem('userId',res.data)
            this.$router.push({path:'/adminSidebar1'})
          }else{
            var identified=res.data.split(':')[0]
            // 教师
            if (identified=='Teacher'){
              const ws = new WebSocket(SOCKET_IP)
              ws.onopen = () => {
                console.log('TEACHER CONNECTING')
                // 添加  0,  并将字符串返回
                ws.send('0,' + res.data)
              }
              sessionStorage.setItem('webSocket', ws)
              sessionStorage.setItem('userId', res.data.split(':')[1])
              this.$router.push({ path: '/Course' })
              // 学生
            }else if(identified=='Student'){
              const ws = new WebSocket(SOCKET_IP)
              ws.onopen = () => {
                console.log('STUDENT CONNECTING')
                // 添加  0,  并将字符串返回
                ws.send('0,' + res.data)
              }
              sessionStorage.setItem('webSocket', ws)
              sessionStorage.setItem('userId', res.data.split(':')[1].split(',')[1])
              this.$router.push({path:'/studentSidebar1'})
            }
          }
        } else {
          this.$message.error('用户名或密码错误')
        }
      }).catch(() => {
        loading.close()
        this.$message.error('登录出现了一点小问题')
      })
    }
  }
}
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}

.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 160px;
  margin: -150px 0 0 -190px;
  padding: 40px;
  /*border-radius: 5px;*/
  background: #fff;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
}
</style>
