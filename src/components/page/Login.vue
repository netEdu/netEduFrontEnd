<template>
	<div class="login-wrap">
		<div class="ms-title"><strong>网络教学管理系统</strong></div>
    <div ref="jumbotron" class="ms-jumbotron" @mousemove="updateXY" @mouseout="clearXY">
      <div class="banner-components" ref="bannerComponents">
        <img class="ms-banner-nav ms-shadow" src="../../../static/img/header.png"/>
        <img class="ms-banner-aside ms-shadow" src="../../../static/img/aside.png"/>
      </div>

      <div class="banner-windows" ref="windows">
        <img class="ms-banner-block ms-shadow" src="../../../static/img/block.png"/>
        <img class="ms-banner-window-1" src="../../../static/img/window1.png"/>
        <img class="ms-banner-window-2" src="../../../static/img/window2.png"/>
      </div>

      <div class="banner-container" ref="bannerContainer">
        <img class="ms-banner ms-shadow" src="../../../static/img/bg.png"/>
      </div>

      <div class="banner-blocker" ref="bannerBlocker">
        <div class="ms-login ms-shadow" @mouseover="clearXY" @mousemove.stop>
          <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0px" class="demo-ruleForm">
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" placeholder="用户名（您的姓名）"/>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" placeholder="密码" v-model="loginForm.password"
                        @keyup.enter.native="login($data.loginForm.username, $data.loginForm.password)"/>
            </el-form-item>
            <div class="login-btn">
              <el-button type="primary" @click.prevent="login($data.loginForm.username, $data.loginForm.password)">
                登录
              </el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>

	</div>
</template>

<script>
import { URL_DATA, SOCKET_IP } from '../../js/util-data'
import { webSocket } from '../../js/web-socket'

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
    // 刷新鼠标坐标，更改图层旋转角度
    updateXY(event) {
      // 移除transition，计算角度，计算位移
      this.$refs.jumbotron.style.transition = ''
      this.$refs.windows.style.transition = ''
      this.$refs.jumbotron.style.transform = 'rotateY(' + (-event.offsetX + 450) / 480 + 'deg) rotateX(' + (event.offsetY - 250) / 480 + 'deg)'
      this.$refs.windows.style.transform = 'matrix(1, 0, 0, 1, '+ Math.round((-event.offsetX + 450) / 45) +', ' + Math.round(-(event.offsetY - 250) / 45) + ')'
    },
    // 鼠标离开时清空角度
    clearXY(event) {
      // 角度还原，位移还原，添加transition
      this.$refs.jumbotron.style.transform = 'rotateY(0deg) rotateX(0deg)'
      this.$refs.windows.style.transform = 'matrix(1, 0, 0, 1, 0, 0)'
      this.$refs.jumbotron.style.transition = '300ms cubic-bezier(0.03, 0.98, 0.52, 0.99)'
      this.$refs.windows.style.transition = '300ms cubic-bezier(0.03, 0.98, 0.52, 0.99)'
    },
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
          // 管理员
          if (res.data=="ADMIN"){
            sessionStorage.setItem('identity', res.data.split(':')[0])
            sessionStorage.setItem('userId',res.data)
            this.$router.push({path: '/adminSidebar1'})
          }
          // 非管理员
          else{
            var identified = res.data.split(':')[0]
            // 教师
            if (identified=='Teacher'){
              // 开启webSocket连接
              const ws = webSocket()
              ws.onopen = () => {
                console.log('TEACHER CONNECTING')
                // 添加  0,  并将字符串返回
                ws.send('0,' + res.data)
              }
              // 初始化讨论组
              this.$store.dispatch('chat/initThreads', {
                person_id: res.data.split(':')[1]
              })
              sessionStorage.setItem('identity', res.data.split(':')[0])
              sessionStorage.setItem('userId', res.data.split(':')[1])
              this.$router.push({ path: '/ChatRoom' })
            }
            // 学生
            else if(identified=='Student'){
              const ws = webSocket()
              ws.onopen = () => {
                console.log('STUDENT CONNECTING')
                // 添加  0,  并将字符串返回
                ws.send('0,' + res.data)
              }
              // 初始化讨论组
              this.$store.dispatch('chat/initThreads', {
                person_id: res.data.split(':')[1].split(',')[1]
              })
              sessionStorage.setItem('identity', res.data.split(':')[0])
              sessionStorage.setItem('userId', res.data.split(':')[1].split(',')[1])
              this.$router.push({path: '/studentSidebar1'})
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
  background: #ffffff;
  /* 给父元素添加视距600 */
  perspective: 50;
  perspective-origin: 50% 50%;
  -webkit-perspective: 550;
  -webkit-perspective-origin: 50% 50%;
  transform: scale3d(1, 1, 1);
}
.ms-shadow {
  -moz-box-shadow: 0px 0px 20px #969696;
  -webkit-box-shadow: 0px 0px 20px #969696;
  box-shadow: 0px 0px 20px #969696;
}

/* 需要进行图像旋转的元素的父节点 */
.ms-title {
  position: relative;
  box-sizing: border-box;
  margin: 5% 0 0 0;
  height: 50px;
  text-align: center;
  font-size: 30px;
  color: #606060;
  border-radius: 5px;
}
.ms-jumbotron {
  position: relative;
  width: 900px;
  height: 550px;
  margin: 30px auto;
}
.banner-components {
  position: absolute;
  z-index: 91;
  width: 100%;
  height: 100%;
}
.banner-windows {
  position: absolute;
  z-index: 92;
  width: 100%;
  height: 100%;
}
.banner-container {
  position: absolute;
  z-index: 90;
  width: 100%;
  height: 100%;
}
.banner-blocker {
  position: absolute;
  z-index: 94;
  width: 100%;
  height: 100%;
}
.ms-banner {
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 10px;
}

/* img结点 */
.ms-banner-nav {
  box-sizing: border-box;
  border-radius: 10px;
  top: 10px;
  left: 15px;
  position: absolute;
}
.ms-banner-aside {
  box-sizing: border-box;
  border-radius: 10px;
  top: 80px;
  left: 15px;
  position: absolute;
}
.ms-banner-block {
  top: 360px;
  left: -10px;
  border-radius: 10px;
  position: absolute;
}
.ms-banner-window-1 {
  left: 750px;
  top: 40px;
  box-sizing: border-box;
  position: absolute;
}
.ms-banner-window-2 {
  top: 230px;
  left: 750px;
  box-sizing: border-box;
  position: absolute;
}

/* 登录框 */
.ms-login {
  position: absolute;
  left: 260px;
  top: 155px;
  box-sizing: border-box;
  width: 380px;
  height: 240px;
  padding: 40px;
  border-radius: 5px;
  border: 1px #cccccc solid;
  background: #ffffff;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
}
</style>
