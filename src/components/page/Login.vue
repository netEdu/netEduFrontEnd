<template>
    <div class="login-wrap">
        <div class="ms-title">网络教学管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="login($data.ruleForm.username,$data.ruleForm.password)">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data: function(){
            return {
                ruleForm: {
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
            login(username,password,userType) {
                let that = this;
                that.$router.push({ path: '/Sidebar1' })
                // var params = new  URLSearchParams()
                // params.append("username",username);
                // params.append("password",password);
                // params.append("userType",1);
                // axios.post("http://localhost:8082/project/auth/login",params,{
                // }).then(function (response) {
                //     localStorage.setItem("username",username)
                //     /**
                //      * 判断有无token，
                //      * 有则登陆成功
                //      */
                //     if( response.data.data != undefined){
                //         sessionStorage.setItem("authKey", response.data.data);
                //         that.$router.push({ path: '/showService' })
                //     }else {
                //         alert("用户名或密码错误")
                //     }
                // }).catch(function (error) {
                //     console.info(error)
                // });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        /*border-radius: 5px;*/
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>
