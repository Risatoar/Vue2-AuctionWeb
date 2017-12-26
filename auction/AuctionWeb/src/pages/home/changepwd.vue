<template>
	<div class="home-changepwd">
	<label>老密码</label>
        <input type="password" class="form-control" id="reg-pwd" placeholder="老密码">
        <label>新密码</label>
        <input type="password" class="form-control" id="reg-pwd" placeholder="老密码">
        <label>再输入一次新密码</label>
        <input type="password" class="form-control" id="reg-pwd" placeholder="老密码">
        <Button type="primary">修改密码</Button>
	</div>
</template>

<script>
export default {
    methods: {
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