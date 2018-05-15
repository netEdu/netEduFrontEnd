<template>
	<div class="login-wrap">
		<div class="ms-title"><strong>网络教学管理系统</strong></div>
    <div class="ms-banner ms-blocker" @mouseover="setTransition" @mousemove="updateXY" @mouseout="clearXY"></div>
    <div ref="msBannerNav" class="ms-banner-nav ms-shadow"></div>
    <div ref="msBannerAside" class="ms-banner-aside ms-shadow"></div>
    <div ref="msBannerBlock" class="ms-banner-block ms-shadow"></div>
    <img ref="msBannerWindow1" class="ms-banner-window-1" src="../../../static/img/window1.png"/>
    <img ref="msBannerWindow2" class="ms-banner-window-2" src="../../../static/img/window2.png"/>
    <div ref="msBanner" class="ms-banner ms-shadow"></div>
		<div ref="canvas" class="ms-login ms-shadow">
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
</template>

<script>
import { URL_DATA, SOCKET_IP } from '../../js/util-data'
import { webSocket } from '../../js/web-socket'

export default {
  data: function() {
    return {
      // 鼠标坐标
      x: 0,
      y: 0,
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
      this.x = event.offsetX
      this.y = event.offsetY
      this.$refs.canvas.style.transition = ''
      this.$refs.msBanner.style.transition = ''
      this.$refs.msBannerAside.style.transition = ''
      this.$refs.msBannerNav.style.transition = ''
      this.$refs.msBannerBlock.style.transition = ''
      this.$refs.msBannerWindow1.style.transition = ''
      this.$refs.msBannerWindow2.style.transition = ''
      this.$refs.msBanner.style.transform = 'rotateY(' + (-event.offsetX + 450) / 140 + 'deg) rotateX(' + (event.offsetY - 250) / 140 + 'deg)'
      this.$refs.canvas.style.transform = 'rotateY(' + (-event.offsetX + 450) / 140 + 'deg) rotateX(' + (event.offsetY - 250) / 140 + 'deg)' 
        + ' matrix(1, 0, 0, 1, '+ Math.round((-event.offsetX + 450) / 90) +', ' + Math.round(-(event.offsetY - 250) / 50) + ')'
      this.$refs.msBannerAside.style.transform = 'rotateY(' + (-event.offsetX + 450) / 140 + 'deg) rotateX(' + (event.offsetY - 250) / 140 + 'deg)' 
        + ' matrix(1, 0, 0, 1, '+ Math.round((-event.offsetX + 450) / 90) +', ' + Math.round(-(event.offsetY - 250) / 50) + ')'
      this.$refs.msBannerNav.style.transform = 'rotateY(' + (-event.offsetX + 450) / 140 + 'deg) rotateX(' + (event.offsetY - 250) / 140 + 'deg)' 
        + ' matrix(1, 0, 0, 1, '+ Math.round((-event.offsetX + 450) / 90) +', ' + Math.round(-(event.offsetY - 250) / 50) + ')'
      this.$refs.msBannerBlock.style.transform = 'rotateY(' + (-event.offsetX + 450) / 140 + 'deg) rotateX(' + (event.offsetY - 250) / 140 + 'deg)' 
        + ' matrix(1, 0, 0, 1, '+ Math.round((-event.offsetX + 450) / 45) +', ' + Math.round(-(event.offsetY - 250) / 25) + ')'
      this.$refs.msBannerWindow1.style.transform = 'rotateY(' + (-event.offsetX + 450) / 140 + 'deg) rotateX(' + (event.offsetY - 250) / 140 + 'deg)' 
        + ' matrix(1, 0, 0, 1, '+ Math.round((-event.offsetX + 450) / 45) +', ' + Math.round(-(event.offsetY - 250) / 25) + ')'
      this.$refs.msBannerWindow2.style.transform = 'rotateY(' + (-event.offsetX + 450) / 140 + 'deg) rotateX(' + (event.offsetY - 250) / 140 + 'deg)' 
        + ' matrix(1, 0, 0, 1, '+ Math.round((-event.offsetX + 450) / 45) +', ' + Math.round(-(event.offsetY - 250) / 25) + ')'
    },
    setTransition() {
      this.$refs.canvas.style.transition = '300ms cubic-bezier(0.03, 0.98, 0.52, 0.99)'
      this.$refs.msBanner.style.transition = '300ms cubic-bezier(0.03, 0.98, 0.52, 0.99)'
      this.$refs.msBannerAside.style.transition = '300ms cubic-bezier(0.03, 0.98, 0.52, 0.99)'
      this.$refs.msBannerNav.style.transition = '300ms cubic-bezier(0.03, 0.98, 0.52, 0.99)'
      this.$refs.msBannerBlock.style.transition = '300ms cubic-bezier(0.03, 0.98, 0.52, 0.99)'
      this.$refs.msBannerWindow1.style.transition = '300ms cubic-bezier(0.03, 0.98, 0.52, 0.99)'
      this.$refs.msBannerWindow2.style.transition = '300ms cubic-bezier(0.03, 0.98, 0.52, 0.99)'
    },
    // 鼠标离开时清空角度
    clearXY(event) {
      this.$refs.canvas.style.transform = 'rotateY(0deg) rotateX(0deg)'
      this.$refs.msBanner.style.transform = 'rotateY(0deg) rotateX(0deg)'
      this.$refs.msBannerAside.style.transform = 'rotateY(0deg) rotateX(0deg)'
      this.$refs.msBannerNav.style.transform = 'rotateY(0deg) rotateX(0deg)'
      this.$refs.msBannerBlock.style.transform = 'rotateY(0deg) rotateX(0deg)'
      this.$refs.msBannerWindow1.style.transform = 'rotateY(0deg) rotateX(0deg)'
      this.$refs.msBannerWindow2.style.transform = 'rotateY(0deg) rotateX(0deg)'
      this.$refs.canvas.style.transition = '300ms cubic-bezier(0.03, 0.98, 0.52, 0.99)'
      this.$refs.msBanner.style.transition = '300ms cubic-bezier(0.03, 0.98, 0.52, 0.99)'
      this.$refs.msBannerAside.style.transition = '300ms cubic-bezier(0.03, 0.98, 0.52, 0.99)'
      this.$refs.msBannerNav.style.transition = '300ms cubic-bezier(0.03, 0.98, 0.52, 0.99)'
      this.$refs.msBannerBlock.style.transition = '300ms cubic-bezier(0.03, 0.98, 0.52, 0.99)'
      this.$refs.msBannerWindow1.style.transition = '300ms cubic-bezier(0.03, 0.98, 0.52, 0.99)'
      this.$refs.msBannerWindow2.style.transition = '300ms cubic-bezier(0.03, 0.98, 0.52, 0.99)'
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
            sessionStorage.setItem('userId',res.data)
            this.$router.push({path: '/adminSidebar1'})
          }else{
            var identified=res.data.split(':')[0]
            // 教师
            if (identified=='Teacher'){
              // 开启webSocket连接
              const ws = webSocket(SOCKET_IP)
              ws.onopen = () => {
                console.log('TEACHER CONNECTING')
                // 添加  0,  并将字符串返回
                ws.send('0,' + res.data)
              }
              // 初始化讨论组
              this.$store.dispatch('chat/initThreads', {
                person_id: res.data.split(':')[1]
              })
              sessionStorage.setItem('userId', res.data.split(':')[1])
              this.$router.push({ path: '/Course' })
              // 学生
            }else if(identified=='Student'){
              const ws = webSocket(SOCKET_IP)
              ws.onopen = () => {
                console.log('STUDENT CONNECTING')
                // 添加  0,  并将字符串返回
                ws.send('0,' + res.data)
              }
              // 初始化讨论组
              this.$store.dispatch('chat/initThreads', {
                person_id: res.data.split(':')[1]
              })
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
}
.ms-shadow {
  -moz-box-shadow: 0px 0px 20px #969696;
  -webkit-box-shadow: 0px 0px 20px #969696;
  box-shadow: 0px 0px 20px #969696;
}
.login-wrap>.ms-blocker {
  z-index: 95;
  background:rgba(0, 0, 0, 0)
}
.ms-banner {
  background-image: url('../../../static/img/bg.png');
  z-index: 90;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 900px;
  height: 550px;
  box-sizing: border-box;
  border-radius: 10px;
  margin: -290px 0 0 -460px;
}
.ms-banner-nav {
  z-index: 91;
  background-image: url('../../../static/img/header.png');
  box-sizing: border-box;
  border-radius: 10px;
  width: 870px;
  height: 50px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -278px 0 0 -445px;
}
.ms-banner-aside {
  z-index: 91;
  width: 140px;
  height: 460px;
  background-image: url('../../../static/img/aside.png');
  box-sizing: border-box;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -214px 0 0 -445px;
}
.ms-banner-block {
  transform: translateZ(800);
  z-index: 92;
  width: 140px;
  height: 60px;
  background: url('../../../static/img/block.png');
  box-sizing: border-box;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: 70px 0 0 -464px;
}
.ms-banner-window-1 {
  transform: translateZ(800);
  z-index: 91;
  border: 0;
  width: 238px;
  height: 153px;
  box-sizing: border-box;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -240px 0 0 280px;
}
.ms-banner-window-2 {
  transform: translateZ(800);
  z-index: 91;
  padding: 0;
  border: 0;
  width: 182px;
  height: 149px;
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -50px 0 0 380px;
}
.ms-title {
  z-index: 95;
  position: absolute;
  box-sizing: border-box;
  padding-top: 5px;
  top: 5%;
  left: 35%;
  width: 30%;
  height: 50px;
  text-align: center;
  font-size: 30px;
  color: #606060;
  border-radius: 5px;
}

.ms-login {
  z-index: 200;
  position: absolute;
  left: 50%;
  top: 50%;
  box-sizing: border-box;
  width: 380px;
  height: 240px;
  margin: -150px 0 0 -190px;
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
