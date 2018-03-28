<!--
登录组件
author：risatoar
date：null
-->

<template>
  <div class="dialog">
    <!-- 设置遮罩,点击触发登录框隐藏事件 -->
    <div class="dialog-cover"  v-if="isShow" @click="close"></div>
    <!-- 登录框隐藏及展示动画 -->
    <transition name="pass">
      <!-- 登录框整体 -->
      <div class="dialog-content"  v-if="isShow">
        <h3 style="padding:15px 0;">账号密码登录</h3>
        <!-- 设置关闭,点击触发登录框隐藏事件 -->
        <p class="dialog-close" @click="close">x</p>
        <div class="form-group">
        <!-- 输入提示 -->
        <Poptip trigger="focus" title="温馨小提示" content="请输入6-10位的用户名">
        <!-- 用户名输入 -->
        <input type="text" class="sign-input" placeholder="请输入用户名" v-model="userlogin.usernamelogin" v-on:input="showError('error1')">
        </Poptip>
        <br>
        <!-- 用户名错误信息提示 -->
        <div class="error">
         <span class="loginerror" v-if="error1">{{ userErrors.errorText }}</span>
        </div>
        </div>
        <div class="form-group">
        <!-- 输入提示 -->
        <Poptip trigger="focus" title="温馨小提示" content="请输入6-10位的密码">
        <!-- 密码输入 -->
        <input type="password" class="sign-input" placeholder="请输入密码" v-model="userlogin.pwdlogin" v-on:input="showError('error2')">
        </Poptip>
        <br>
        <!-- 密码错误信息提示 -->
        <div class="error">
          <span class="loginerror" v-if="error2">
            <Poptip title="提示标题" content="提示内容">
                    {{ passwordErrors.errorText }}
            </Poptip>
          </span>
        </div>
        </div>
        <!-- 总体错误检查提示 -->
        <span>{{ errorText }}</span><br>
        <button class="button-sign" @click="login">登录</button>
        <!-- <div class="findpwd">找回密码</div> -->
        <div>还没有账号吗？<span class="toregister" @click="changeToReg">注册</span></div>
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    auctioninfo: {
      type: Array
    }
  },
  data () {
    return {
      userlogin:{
        usernamelogin: '',
        pwdlogin: ''
      },
      errorText: '',
      error1: false,
      error2: false,
    }
  },
  computed: {
    // 用户名输入验证
    userErrors () {
      let errorText, status
      if (!/^\w{6,20}$/g.test(this.userlogin.usernamelogin)) {
        status = false
        errorText = '账号应该为6-20位'
      }
      else {
        status = true
        errorText = ''
      }
      return {
        status,
        errorText
      }
    },
    // 密码输入验证
    passwordErrors () {
      let errorText, status
      if (!/^\w{6,10}$/g.test(this.userlogin.pwdlogin)) {
        status = false
        errorText = '密码应该为6-10位'
      }
      else {
        status = true
        errorText = ''
      }
      return {
        status,
        errorText
      }
    }
  },
  methods: {
    // 登录成功全局消息提醒,引用iview的全局消息插件
    success (nodesc) {
        this.$Notice.success({
            title: '登录成功'
        });
    },
    // 切换到注册组件
    changeToReg() {
      this.$emit('on-change')
    },
    // 关闭登录组件
    close () {
      this.$emit('on-close')
    },
    // 输入错误延迟显示，并在初期隐藏错误提示
    showError(str) {
      setTimeout(()=>{
        this[str] = true
      },1000)
    },
    // 利用post向后台传登录表单,验证登录信息
    login() {
      if (!this.userErrors.status || !this.passwordErrors.status) {
        this.errorText = '部分选项未通过'
      }
      else{
        this.errorText = ''
        axios.post("/login",this.userlogin).then((res)=> {
          if(res.data.list == '该用户未被注册'){
            this.errorText = '该用户未被注册'
          }else{
            if(res.data.list == 'success'){
              this.$emit('has-log', res.data.user)
              this.success(true)
            }else{
              if(res.data.list == 'fail'){
              this.errorText = '密码错误'
            }
          }
          }
        }).catch((error)=> {
          console.log(error);
        });
      }
    }
  }
}
</script>

<style scoped>
.pass-enter-active {
  -webkit-transition: all .5s ease;
  -o-transition: all .5s ease;
  transition: all .5s ease;
}
.pass-leave-active {
  -webkit-transition: all .5s ease;
  -o-transition: all .5s ease;
  transition: all .5s ease;
}
.pass-enter {
  -webkit-transform: translateX(-500px);
      -ms-transform: translateX(-500px);
          transform: translateX(-500px);
}
.pass-leave-active {
  -webkit-transform: translateY(-500px);
      -ms-transform: translateY(-500px);
          transform: translateY(-500px);
}

.dialog {
  position: fixed;
  width: 100%;
  height: 100%;
}
.dialog-cover {
  background: #000;
  opacity: .1;
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

 .dialog-content {
  border-radius: 4px;
  width: 495px;
  height: 490px;
  position: fixed;
  max-height: 40%;
  background-color: rgba(255, 255, 255, .95);
  top: 20%;
  left: 35%;
  font-size: 16px;
  word-break: break-all;
  z-index: 999;
  padding: 20px 40px;
  display: inline-block;
  overflow: auto;
}

.dialog-close {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 20px;
  height: 20px;
  text-align: center;
  cursor: pointer;
}
.error {
  min-height: 20px;
}
.findpwd {
  color: #2d8cf0;
  position: absolute;
  right: 50px;
  bottom: 15px;
  width: 80px;
  height: 20px;
  text-align: center;
  cursor: pointer;
}
.toregister {
  color: #2d8cf0;
  cursor: pointer;
}
.loginerror{
  color: red;
}
.login{
  position: relative;
  width: 100%;
  cursor: pointer;
}

.sign-input {
  cursor: pointer;
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #d0d0d0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #495060;
  display: inline-block;
  font-size: inherit;
  height: 32px;
  line-height: 1;
  outline: 0;
  padding: 4px 7px;
  -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
  -o-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
  transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
  width: 415px;
}

.sign-input:focus, .sign-input:hover {
  border-color: #0c328a;
}

.sign-input:active {
  border-color: #0c328a;
}

.sign-input:active {
  outline: 0
}

input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
  color: #c3c7d2;
  font-size: 12px;
  vertical-align: middle;
}

input:-moz-placeholder, textarea:-moz-placeholder {
  color: #c3c7d2;
  font-size: 12px;
  vertical-align: middle;
}

input::-moz-placeholder, textarea::-moz-placeholder {
  color: #c3c7d2;
  font-size: 12px;
  vertical-align: middle;
}

input:-ms-input-placeholder, textarea:-ms-input-placeholder {
  color: #c3c7d2;
  font-size: 12px;
  vertical-align: middle;
}

.button-sign {
  width: 100%;
  height: 51px;
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #fff;
  font-size: 18px;
  background-color: #0c328a;
  text-decoration: none;
  padding: 10px 30px;
  margin-bottom: 10px;
  overflow: hidden;
}

.button-sign:hover {
  color: #fff;
  background-color: #35495e;
}

.button-sign:focus, .button-sign:hover {
  background: rgba(12, 50, 138, .8);
  border-color: rgba(12, 50, 138, .8);
  color: #fff
}

.button-sign:active {
  background: rgba(12, 50, 138, .8);
  border-color: rgba(12, 50, 138, .8);
  color: #fff
}

.button-reg:active {
  outline: 0
}
</style>
