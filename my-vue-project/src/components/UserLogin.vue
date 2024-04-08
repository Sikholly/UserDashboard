<template>
    <div class="loginmain">
        <div class="login-title">
            <span>管理员登录</span>
        </div>

        <div class="login-con">
            <div class="login-user">
                <div class="icon">
                    <img src="../assets/cd-icon-username.png" alt="">
                </div>
                <input type="text" v-model="username" placeholder="用户名" autocomplete="off" value="">
            </div>
            <div class="login-pwd">
                <div class="icon">
                    <img src="../assets/cd-icon-password.png" alt="">
                </div>
                <input type="password" v-model="password" placeholder="密码" autocomplete="off" value="">
            </div>
            <div class="login-btn">
                <input type="button" @click="login" value="登录">
            </div>
        </div>

    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('http://localhost:3000/api/login', {
                    username: this.username,
                    password: this.password
                });
                const token = response.data.token;
                localStorage.setItem('token', token); // 将令牌存储在本地
                console.log('登录成功', token);
                this.$router.push('/dashboard'); // 登录成功后跳转到首页或者后台管理页面
            } catch (error) {
                console.error('登录失败', error);
                // 处理登录失败的情况，例如显示错误消息
            }
        }
    }
};
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
}




.loginmain {
    background: #ffffff;
    width: 540px;
    height: 300px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    padding: 100px 40px 40px 40px;
    box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
    z-index: 99999;
    border: 1px solid #ebebeb;
    border-radius: 3px;
}

.login-title {
    color: #000000;
    height: 60px;
    font-size: 20px;
    text-align: center;
    margin-top: -60px;
}

.login-con {
    height: 208px;
    position: absolute;
    left: 0;
    width: 60%;
    margin: 0 20%;
}

.login-user {
    position: relative;
    background: #ECEEF0;
    height: 53px;
    line-height: 53px;
    margin-bottom: 15px;
}

.icon {
    position: absolute;
    z-index: 1;
    left: 36px;
    top: 3px;
    opacity: 1;
    color: #000;

}

.icon img {
    width: 18px;
    height: 18px;
}

.login-con input {
    width: calc(100% - 130px);
    margin-top: -2px;
    background: rgba(57, 61, 82, 0);
    left: 0;
    padding: 10px 65px;
    border-top: 2px solid rgba(57, 61, 82, 0);
    border-bottom: 2px solid rgba(57, 61, 82, 0);
    border-right: none;
    border-left: none;
    outline: none;
    font-family: 'Gudea', sans-serif;
    box-shadow: none;
    color: #61BFFF !important;
}

.login-pwd,
.login-yan {
    position: relative;
    background: #ECEEF0;
    height: 53px;
    line-height: 53px;
    margin-bottom: 15px;
}

/*
.login-pwd .icon{
    position: absolute;
    z-index: 1;
    left: 36px;
    top: 8px;
    opacity: .5;
}*/
.login-btn {
    margin: 0 auto;
    position: relative;
}

.login-btn input {
    border-radius: 3px;
    background: #3277fcb8;
    border: 2px solid #4FA1D9;
    color: white !important;
    text-transform: uppercase;
    font-size: 11px;
    cursor: pointer;
    position: absolute;
    top: 30px;
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
    height: 53px;
    -webkit-transition-duration: .2s;
    transition-duration: .2s;
}

.login-btn input:hover {
    color: white !important;
    background: #4FA1D9;
    cursor: pointer;
    -webkit-transition-property: background, color;
    transition-property: background, color;
    -webkit-transition-duration: .2s;
    transition-duration: .2s;
}
</style>
  