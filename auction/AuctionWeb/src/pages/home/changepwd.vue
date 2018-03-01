<!--
修改密码界面
author：risatoar
date：2017/12/26
-->
<template>
    <!-- 修改密码页面 -->
	<div class="home-changepwd">
	    <label>老密码</label>
        <input type="password" class="form-control cpwd1" id="reg-pwd" placeholder="老密码" v-model="oldPwd">
        <label>新密码</label>
        <input type="password" class="form-control cpwd2" id="reg-pwd" placeholder="老密码" v-model="newPwd1">
        <label>再输入一次新密码</label>
        <input type="password" class="form-control cpwd3" id="reg-pwd" placeholder="老密码" v-model="newPwd2">
        <Button type="primary" @click="postPwd">修改密码</Button>
	</div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            oldPwd: '',
            newPwd1: '',
            newPwd2: ''
        }
    },
    // 通过vuex获取当前usernmae
    computed: {
        username() {
         return this.$store.state.username
        },
    },
    methods: {
        // 通过axios向后台传新旧密码输入表单,通过result传来的不同status值展示不同全局提示
        postPwd() {
            let PWD = {
                username: this.username,
                oldPwd: this.oldPwd,
                newPwd1: this.newPwd1,
                newPwd2: this.newPwd2
            }
            axios.post("/ChangePwd",PWD).then((res)=> {
                if(res.data.status == 1001){
                    this.success('修改成功')
                }else if(res.data.status == 1002){
                    this.error('修改失败,密码错误')
                }else if(res.data.status == 1003){
                    this.warning('新密码两次输入不同')
                }
            }).catch((error)=> {
              console.log(error);
            });
        },
        success (msg) {
            this.$Message.success(msg);
        },
        warning (msg) {
            this.$Message.warning(msg);
        },
        error (msg) {
            this.$Message.error(msg);
        }
    }
}
</script>

<style>
.home-changepwd{
	margin-top: 50px;
}
.form-control{
	margin-bottom: 30px;
}
</style>