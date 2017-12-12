<template>
  <div>
    <div class="dialog">
      <div class="dialog-cover"  v-if="isShow" @click="close"></div>
      <transition name="pass">
        <div class="dialog-content"  v-if="isShow">
          <p class="dialog-close" @click="close">x</p>
          <div class="form-group">
          <label>用户名</label>
          <input type="text" class="form-control" id="login-username" placeholder="请输入用户名" v-model="userlogin.usernamelogin">
        <span class="loginerror">{{ userErrors.errorText }}</span>
          </div>
          <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" id="login-pwd" placeholder="Password" v-model="userlogin.pwdlogin">
        <span class="loginerror">{{ passwordErrors.errorText }}</span>
          </div>
           <span>{{ errorText }}</span><br>
          <button type="button" class="btn btn-success" @click="login">LOGIN</button>
          <slot></slot>
        </div>
      </transition>
    </div>
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
    userErrors () {
      let errorText, status
      if (!/^\w{6,10}$/g.test(this.userlogin.usernamelogin)) {
        status = false
        errorText = '账号应该为6-10位'
      }
      else {
        status = true
        errorText = ''
      }
      if (!this.userFlag) {
        errorText = ''
        this.userFlag = true
      }
      return {
        status,
        errorText
      }
    },
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
      if (!this.passwordFlag) {
        errorText = ''
        this.passwordFlag = true
      }
      return {
        status,
        errorText
      }
    }
  },
  mounted() {
  },
  methods: {
    close () {
      this.$emit('on-close')
    },
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
              this.errorText = '登录成功'
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
.dialog-content {
  width: 40%;
  position: fixed;
  max-height: 50%;
  overflow: auto;
  background: #fff;
  top: 20%;
  left: 50%;
  margin-left: -20%;
  z-index: 10;
  padding: 2%;
  line-height: 1.6;
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
.loginerror{
  color: red;
}
</style>
