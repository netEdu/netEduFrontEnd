<template>
	<div class="login-wrap">
		<header class="ms-title"><strong>网络教学管理系统</strong></header>
    <main ref="jumbotron" class="ms-jumbotron" @mousemove="updateXY" @mouseout="clearXY">
      <div class="banner-img" ref="bannerComponents">
        <img class="ms-banner-plant-1" src="data:image/png;base64,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">
        <img class="ms-banner ms-shadow" src="../../../static/img/bg.png"/>
        <img class="ms-banner-nav" src="../../../static/img/header.png"/>
        <img class="ms-banner-aside" src="../../../static/img/aside.png"/>
        <img class="ms-banner-plant-2" src="../../../static/img/plant2.png">
        <img class="ms-banner-person-1" src="data:image/png;base64,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">
        <img class="ms-banner-person-2" src="data:image/png;base64,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">
      </div>

      <div class="banner-img" ref="windows">
        <img class="ms-banner-block ms-shadow" src="../../../static/img/block.png"/>
        <img class="ms-banner-window-1" src="../../../static/img/window1.png"/>
        <img class="ms-banner-window-2" src="../../../static/img/window2.png"/>
      </div>

      <div class="banner-img">
        <div class="ms-login" @mouseover="clearXY" @mousemove.stop>
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
    </main>
    <footer>
      <p>created by Team404 前端团队</p>
      <p>如有雷同，纯属抄袭</p>
    </footer>
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
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 刷新鼠标坐标，更改图层旋转角度
    updateXY(event) {
      // 移除transition，计算角度，计算位移
      this.$refs.jumbotron.style.transition = ''
      this.$refs.windows.style.transition = ''
      this.$refs.jumbotron.style.transform = `rotateY(${ (-event.offsetX + 450) / 480 }deg) rotateX(${ (event.offsetY - 250) / 480 }deg)`
      this.$refs.windows.style.transform = `matrix(1, 0, 0, 1, ${ Math.round((-event.offsetX + 450) / 45) }, ${ Math.round(-(event.offsetY - 250) / 45) })`
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
      setTimeout(() => {
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
                sessionStorage.setItem('identity', identified)
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
                sessionStorage.setItem('identity', identified)
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
      }, 500);

    }
  }
}
</script>

<style scoped>
.login-wrap {
  padding-top: 50px;
  position: relative;
  width: 100%;
  height: 100%;
  background: #ffffff;
  /* 给父元素添加视距550 */
  perspective: 550;
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
  height: 50px;
  text-align: center;
  font-size: 30px;
  color: #606060;
  border-radius: 5px;
}
.ms-jumbotron {
  position: relative;
  height: 550px;
  width: 890px;
  margin: 60px auto;
}
.banner-img {
  position: absolute;
  width: 100%;
  height: 100%;
}
.ms-banner {
  position: absolute;
  width: 84.5%;
  left: 69px;
  box-sizing: border-box;
  border-radius: 10px;
}

/* img结点 */
.ms-banner-plant-1 {
  box-sizing: border-box;
  bottom: 125px;
  left: 5px;
  position: absolute;
  width: 61px;
}
.ms-banner-plant-2 {
  box-sizing: border-box;
  bottom: 25px;
  left: -35px;
  position: absolute;
  width: 207px;
}
.ms-banner-person-1 {
  box-sizing: border-box;
  bottom: 25px;
  right: 138px;
  position: absolute;
  width: 101px;
}
.ms-banner-person-2 {
  box-sizing: border-box;
  bottom: 25px;
  right: -61px;
  position: absolute;
  width: 219px;
}
.ms-banner-nav {
  box-sizing: border-box;
  border-radius: 10px;
  top: 10px;
  left: 78px;
  position: absolute;
  width: 735px;
}
.ms-banner-aside {
  box-sizing: border-box;
  border-radius: 10px;
  top: 60px;
  left: 80px;
  position: absolute;
  width: 118px;
}
.ms-banner-block {
  top: 300px;
  left: 50px;
  border-radius: 10px;
  position: absolute;
  width: 122px;
}
.ms-banner-window-1 {
  left: 701px;
  top: 40px;
  box-sizing: border-box;
  position: absolute;
  width: 208px;
}
.ms-banner-window-2 {
  top: 230px;
  left: 701px;
  box-sizing: border-box;
  position: absolute;
  width: 153px;
}

/* 登录框 */
.ms-login {
  position: absolute;
  left: 280px;
  top: 125px;
  box-sizing: border-box;
  width: 321px;
  height: 235.5px;
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

footer {
  position: fixed;
  bottom: 50px;
  width: 100%;
  text-align: center;
  background: linear-gradient(white 0%, rgb(198, 237, 255) 80%, rgb(161, 225, 255) 100%);
  padding: 10px 0
}


</style>
