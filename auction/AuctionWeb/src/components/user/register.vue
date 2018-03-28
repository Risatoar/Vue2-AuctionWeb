<template>
  <div class="dialog">
    <!-- 设置遮罩,点击触发注册框隐藏事件 -->
    <div class="dialog-cover"  v-if="isShow" @click="close"></div>
    <!-- 注册框隐藏及展示动画 -->
    <transition name="pass">
      <!-- 注册框整体 -->
      <div class="dialog-content"  v-if="isShow">
        <!-- 设置关闭,点击触发登录框隐藏事件 -->
        <p class="dialog-close" @click="close">x</p>
        <h3 style="padding:15px 0;">还没有账号吗？快来注册一个吧！</h3>
          <div class="form-content">
            <div class="form-group">
              <!-- 注册用户名输入 -->
              <input type="text" placeholder="请输入用户名" class="register-input" v-model="reguser.username" v-on:input="showError('error1')">
              <!-- 错误信息提示 -->
              <div class="error">
                <span class="regerror" v-if="error1">{{ userErrors.errorText }}</span>
              </div>
            </div>
            <div class="form-group">
              <input type="password" placeholder="请输入密码" class="register-input" v-model="reguser.pwd" v-on:input="showError('error2')">
              <div class="error">
                <span class="regerror" v-if="error2">{{ passwordErrors.errorText }}</span>
              </div>
            </div>
           <!--  <div class="form-group">
              <Input type="text" id="reg-nickname" style="width: 200px" placeholder="请输入昵称" v-model="reguser.nickname"></Input>
            </div>
            <div class="form-group">
              <Input type="text" id="reg-age" style="width: 200px" placeholder="请输入年龄" v-model="reguser.age"></Input>
            </div>
            <div class="form-group">
              <Input type="text" id="reg-truename" style="width: 200px" placeholder="请输入真实姓名" v-model="reguser.truename"></Input>
              <span class="regerror">{{ truenameErrors.errorText }}</span>
            </div> -->
            <div class="form-group">
              <input type="text" placeholder="请输入公司名" class="register-input" v-model="reguser.company" v-on:input="showError('error3')">
              <div class="error">
               <span class="regerror" v-if="error3">{{ companyErrors.errorText }}</span>
              </div>
            </div>
            <div class="form-group">
              <input type="text" placeholder="请输入电话号码" class="register-input" v-model="reguser.telephone" v-on:input="showError('error4')">
              <div class="error">
                <span class="regerror" v-if="error4">{{ telephoneErrors.errorText }}</span>
              </div>
            </div>
            <div class="form-group">
              <!-- <Input type="text" class="form-control" id="reg-mail" placeholder="请输入邮箱" v-model="reguser.mail"> -->
              <AutoComplete
                  v-model="reguser.mail"
                  @on-search="handleSearch2"
                  placeholder="请输入邮箱"
                  >
                  <Option v-for="item in data2" :value="item" :key="item">{{ item }}</Option>
              </AutoComplete>
              <div class="error">
               <span class="regerror" v-if="error5">{{ mailErrors.errorText }}</span>
              </div>
            </div>
          </div>
        <button class="button-reg" @click="addUser">注册</button>
        <br><span>{{ errortext }}</span>
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'dialogBox',
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
      reguser: {
        username: '',
        pwd: '',
        nickname: '',
        age: '',
        company: '',
        telephone: '',
        mail: '',
      },
      errortext: '',
      value2: '',
      data2: [],
      // 通过error控制错误提示框内部文字显示
      error1: false,
      error2: false,
      error3: false,
      error4: false,
      error5: false,
    }
  },
  computed: {
    // 用户名输入验证
    userErrors () {
      let errorText, status
      if (!/^\w{6,10}$/g.test(this.reguser.username)) {
        status = false
        errorText = '账号应该为6-10位'
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
      if (!/^\w{6,10}$/g.test(this.reguser.pwd)) {
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
    },
    // 真实姓名输入验证
    truenameErrors() {
      let errorText, status
      if (/^\s*$/g.test(this.reguser.truename)) {
        status = false
        errorText = '姓名不能为空'
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
    // 公司名输入验证
    companyErrors () {
      let errorText, status
      if (/^\s*$/g.test(this.reguser.company)) {
        status = false
        errorText = '公司名不能为空'
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
    // 电话号码输入验证
    telephoneErrors () {
      let errorText, status
      if (/^\s*$/g.test(this.reguser.telephone)) {
        status = false
        errorText = '电话号不能为空'
      }
      else if (!/^0?1[3|4|5|8][0-9]\d{8}$/.test(this.reguser.telephone)) {
        status = false
        errorText = '电话号码格式错误'
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
    // 电子邮箱输入验证
    mailErrors () {
      let errorText, status
      if (/^\s*$/g.test(this.reguser.mail)) {
        status = false
        errorText = '邮箱不能为空'
      }
      else if (!/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(this.reguser.mail)) {
        status = false
        errorText = '邮箱格式错误'
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
    // 输入错误是否存在判断
    errorfind() {
      if (this.userErrors.status || this.passwordErrors.status || this.companyErrors.status || this.telephoneErrors.status || this.mailErrors.status || this.truenameErrors.status) {
        this.errortext = ''
      }
    }
  },
  // mounted() {
  //     this.getUser()
  // },
  methods: {
    handleSearch2 (value) {
        this.data2 = !value || value.indexOf('@') >= 0 ? [] : [
            value + '@qq.com',
            value + '@sina.com',
            value + '@163.com'
        ];
    },
    close () {
      this.$emit('on-close')
    },
    // getUser() {
    //   axios.get("/users").then((result)=>{
    //       let res = result.data;
    //     });
    // },
    // 输入错误延迟显示，并在初期隐藏错误提示
    showError(str) {
      setTimeout(()=>{
        this[str] = true
      },1000)
    },
    // 注册成功全局提示
    regsuccess (nodesc) {
       this.$Notice.success({
           title: '注册成功'
       });
    },
    // 利用post向后台传注册表单,验证注册信息
    addUser() {
      if (!this.userErrors.status || !this.passwordErrors.status || !this.companyErrors.status || !this.telephoneErrors.status || !this.mailErrors.status || !this.truenameErrors.status) {
        this.errortext = '请验证输入信息'
      }else{
        this.errortext = ''
        axios.post("/register",this.reguser).then((res)=> {
          if(res.data.list == '用户名已注册'){
            this.errortext = '用户名已注册'
          }else if(res.data.list == '该昵称已被使用'){
            this.errortext = '该昵称已被使用'
          }else{
            if(res.data.save == '注册成功'){
              this.$emit('on-change')
              this.regsuccess(true)
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
  text-align: left;
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
  border: 1px solid #dddee1;
  border-radius: 16px;
  width: 40%;
  position: fixed;
  max-height: 80%;
  overflow: auto;
  background: #fff;
  top: 10%;
  left: 50%;
  margin-left: -20%;
  z-index: 10;
  padding: 2%;
  line-height: 1.6;
}

.form-group {
  width: 100%;
}
 .dialog-content {
  border-radius: 4px;
  width: 500px;
  height: 600px;
  position: fixed;
  background-color: rgba(255, 255, 255, .95);
  top: 20%;
  left: 55%;
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
.regerror{
  color: red;
}

.register-input {
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
  width: 100%;
}

.register-input:focus, .register-input:hover {
  border-color: #57a3f3;
}

.register-input:active {
  border-color: #57a3f3;
}

.register-input:active {
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

.button-reg {
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
}

.button-reg:hover {
  color: #fff;
  background-color: #35495e;
}

.button-reg:focus, .button-reg:hover {
  background: rgba(12, 50, 138, .8);
  border-color: rgba(12, 50, 138, .8);
  color: #fff
}

.button-reg:active {
  background: rgba(12, 50, 138, .8);
  border-color: rgba(12, 50, 138, .8);
  color: #fff
}

.button-reg:active {
  outline: 0
}

</style>
