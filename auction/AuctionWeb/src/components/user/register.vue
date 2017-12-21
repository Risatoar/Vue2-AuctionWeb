<template>
  <div>
    <div class="dialog">
      <div class="dialog-cover"  v-if="isShow" @click="close"></div>
      <transition name="pass">
        <div class="dialog-content"  v-if="isShow">
          <p class="dialog-close" @click="close">x</p>
          <h3 style="padding:15px 0;">还没有账号吗？快来注册一个吧！</h3>
          <p>带红色星号的都是必填项目</p>
          <div class="form-group">
          <label>用户名</label><Icon type="star" style="color:#ed3f14"></Icon>
          <input type="text" class="form-control" id="reg-username" placeholder="请输入用户名" v-model="reguser.username">
        <span class="regerror">{{ userErrors.errorText }}</span>
          </div>
          <div class="form-group">
            <label>密码</label><Icon type="star" style="color:#ed3f14"></Icon>
            <input type="password" class="form-control" id="reg-pwd" placeholder="Password" v-model="reguser.pwd">
            <span class="regerror">{{ passwordErrors.errorText }}</span>
          </div>
          <div class="form-group">
            <label>昵称</label>
            <input type="text" class="form-control" id="reg-nickname" placeholder="请输入昵称" v-model="reguser.nickname">
          </div>
          <div class="form-group">
            <label>年龄</label>
            <input type="text" class="form-control" id="reg-age" placeholder="请输入年龄" v-model="reguser.age">
          </div>
          <div class="form-group">
            <label>真实姓名</label><Icon type="star" style="color:#ed3f14"></Icon>
            <input type="text" class="form-control" id="reg-truename" placeholder="请输入真实姓名" v-model="reguser.truename">
            <span class="regerror">{{ truenameErrors.errorText }}</span>
          </div>
          <div class="form-group">
            <label>公司名称</label><Icon type="star" style="color:#ed3f14"></Icon>
            <input type="text" class="form-control" id="reg-company" placeholder="请输入公司名" v-model="reguser.company">
            <span class="regerror">{{ companyErrors.errorText }}</span>
          </div>
          <div class="form-group">
            <label>电话</label><Icon type="star" style="color:#ed3f14"></Icon>
            <input type="telephone" class="form-control" id="reg-telephone" placeholder="请输入电话/手机" v-model="reguser.telephone">
            <span class="regerror">{{ telephoneErrors.errorText }}</span>
          </div>
          <div class="form-group">
            <label>邮箱</label><Icon type="star" style="color:#ed3f14"></Icon>
            <input type="text" class="form-control" id="reg-mail" placeholder="请输入邮箱" v-model="reguser.mail">
            <span class="regerror">{{ mailErrors.errorText }}</span>
          </div>
          <button type="button" class="btn btn-success" @click="adduser" style="width:200px;">注册</button>
          <br><span>{{ errortext }}</span>
          <slot></slot>
        </div>
      </transition>
    </div>
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
      errortext: ''
    }
  },
  computed: {
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
    errorfind() {
      if (this.userErrors.status || this.passwordErrors.status || this.companyErrors.status || this.telephoneErrors.status || this.mailErrors.status || this.truenameErrors.status) {
        this.errortext = ''
      }
    }
  },
  mounted() {
      this.getuser()
  },
  methods: {
    close () {
      this.$emit('on-close')
    },
    getuser() {
      axios.get("/users").then((result)=>{
          let res = result.data;
        });
    },
    regsuccess (nodesc) {
       this.$Notice.success({
           title: '注册成功'
       });
    },
    adduser() {
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
.dialog-close {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 20px;
  height: 20px;
  text-align: center;
  cursor: pointer;
}
.regerror{
  color: red;
}
</style>
