<template>
	<div class="home-changepwd">
	<label>老密码</label>
        <input type="password" class="form-control" id="reg-pwd" placeholder="老密码" v-model="oldPwd">
        <label>新密码</label>
        <input type="password" class="form-control" id="reg-pwd" placeholder="老密码" v-model="newPwd1">
        <label>再输入一次新密码</label>
        <input type="password" class="form-control" id="reg-pwd" placeholder="老密码" v-model="newPwd2">
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
    computed: {
        username() {
         return this.$store.state.username
        },
    },
    methods: {
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
                }
            }).catch((error)=> {
              console.log(error);
            });
        },
        success (msg) {
            this.$Message.success(msg);
        },
        warning () {
            this.$Message.warning('这是一条警告的提示');
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