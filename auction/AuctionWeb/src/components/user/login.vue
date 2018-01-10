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
        <input type="text" class="form-control" id="login-username" placeholder="请输入用户名" v-model="userlogin.usernamelogin">
        </Poptip>
        <br>
        <!-- 用户名错误信息提示 -->
        <span class="loginerror">{{ userErrors.errorText }}</span>
        </div>
        <div class="form-group">
        <!-- 输入提示 -->
        <Poptip trigger="focus" title="温馨小提示" content="请输入6-10位的密码">
        <!-- 密码输入 -->
        <input type="password" class="form-control" id="login-pwd" placeholder="请输入密码" v-model="userlogin.pwdlogin">
        </Poptip>
        <br>
        <!-- 密码错误信息提示 -->
        <span class="loginerror">
          <Poptip title="提示标题" content="提示内容">
                  {{ passwordErrors.errorText }}
          </Poptip>
        </span>
        </div>
        <!-- 总体错误检查提示 -->
        <span>{{ errorText }}</span><br>
        <button type="button" class="btn btn-info login" @click="login">LOGIN</button>
        <div class="findpwd">找回密码</div>
        <div class="toregister" @click="changeToReg">注册</div>
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
      errorText: ''
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
  transition: all .5s ease;
}
.pass-leave-active {
  transition: all .5s ease;
}
.pass-enter {
  transform: translateX(-500px);
}
.pass-leave-active {
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
@media screen and (max-width: 575px){
 .dialog-content {
  border: 1px solid #dddee1;
  border-radius: 16px;
  width: 100%;
  height: 290px;
  position: fixed;
  max-height: 40%;
  background: #fff;
  top: 20%;
  z-index: 999;
  padding: 10px;
  display: inline-block;
  overflow: auto;
}
}
@media screen and (min-width: 576px) and (max-width: 767px){
 .dialog-content {
  border: 1px solid #dddee1;
  border-radius: 16px;
  width: 460px;
  height: 290px;
  position: fixed;
  max-height: 40%;
  background: #fff;
  top: 20%;
  left: 35%;
  margin-left: -20%;
  z-index: 999;
  padding: 10px;
  display: inline-block;
  overflow: auto;
}
}
@media screen and (min-width: 768px) and (max-width: 991px){
 .dialog-content {
  border: 1px solid #dddee1;
  border-radius: 16px;
  width: 495px;
  height: 290px;
  position: fixed;
  max-height: 40%;
  background: #fff;
  top: 20%;
  left: 40%;
  margin-left: -20%;
  z-index: 999;
  padding: 10px;
  display: inline-block;
  overflow: auto;
}
}
@media screen and (min-width: 992px) and (max-width: 1199px){
 .dialog-content {
  border: 1px solid #dddee1;
  border-radius: 16px;
  width: 495px;
  height: 290px;
  position: fixed;
  max-height: 40%;
  background: #fff;
  top: 20%;
  left: 45%;
  margin-left: -20%;
  z-index: 999;
  padding: 10px;
  display: inline-block;
  overflow: auto;
}
}
@media screen and (min-width: 1200px){
 .dialog-content {
  border: 1px solid #dddee1;
  border-radius: 16px;
  width: 495px;
  height: 290px;
  position: fixed;
  max-height: 40%;
  background: #fff;
  top: 20%;
  left: 35%;
  z-index: 999;
  padding: 10px;
  display: inline-block;
  overflow: auto;
}
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
  position: absolute;
  right: 10px;
  bottom: 15px;
  width: 40px;
  height: 20px;
  text-align: center;
  cursor: pointer;
}
.loginerror{
  color: red;
}
.login{
  position: relative;
  width: 100px;
  cursor: pointer;
}
</style>
