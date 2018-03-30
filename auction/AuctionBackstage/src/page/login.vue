<template>
	<section id="login">
		<div class="login-wrap">
			<div class="login-inner login-form">
				<div class="login-title">
					<span>管理员登录</span>
				</div>
				<div class="username-input">
					<input type="text" placeholder="请输入用户名" class="sign-input" v-model="sign.usernamelogin">
				</div>
				<div class="password-input">
					<i class="eye" @click="changeShow"></i>
					<input :type="pwdtype" placeholder="请输入密码" class="sign-input" v-model="sign.pwdlogin">
				</div>
				<div class="sign-btn">
					<button class="button-sign" @click="Signin">登录</button>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				sign: {
					usernamelogin: '',
					pwdlogin: ''
				},
				// 密码的type类型
				pwdtype: 'password',
				// 密码显示隐藏状态
				changepwd: true,
			}
		},
		methods: {
			// 切换输入密码框密码显示隐藏
			changeShow() {
				this.changepwd = !this.changepwd
				this.pwdtype = this.changepwd == true?'password':'text'
			},
			// 输入错误延迟显示，并在初期隐藏错误提示
			showError(str) {
				setTimeout(()=>{
					this[str] = true
				},1000)
			},
			// 登录操作
			Signin() {
				axios.post("/login",this.sign)
				.then(res=> {
					if(res.data.list == 'success' && res.data.user.admin){
						setTimeout(()=>{
							this.$Notice.success({
							    title: '登录成功'
							});
							this.$router.push("/")
						},1000)
					}else {
						this.$Message.warning('请确认登录权限');
					}
				})
				.catch(err=> {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="less">
	#login {
		top: 0;
		left: 0;
		position: fixed;
		z-index: 1000;
		width: 100%;
		height: 100vh;
		font-size: 16px;
		background-color: #fff;
		.login-wrap {
			width: 100%;
			height: 100%;
			background-image: url("../../static/background.png");
			background-size: cover;
			position: relative;
			display: flex;
			.login-inner {
				width: 400px;
				height: 400px;
				padding: 40px 20px;
				position: absolute;
				top: 0;
				left: 0;
				bottom: 0;
				right: 0;
				margin: auto;
				background-color: rgba(255,255,255,.8);
				.login-title {
					color: #000;
					font-size: 24px;
					font-weight: bolder;
					margin-bottom: 20px;
				}
				.username-input {
					width: 100%;
					margin-bottom: 30px;
				}
				.password-input {
					width: 100%;
					margin-bottom: 30px;
					position: relative;
					.eye {
						top: 18px;
						bottom: 18px;
						right: 10px;
						position: absolute;
						width: 25px;
						height: 15px;
						background-image: url("../../static/eye.png");
						background-size: cover;
					}
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
						color: #606266;
						display: inline-block;
						font-size: inherit;
						height: 51px;
						line-height: 1;
						outline: 0;
						padding: 0 15px;
						-webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
						-o-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
						transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
						width: 100%;
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
						font-weight: 550;
						color: #999999;
						font-size: 14px;
						vertical-align: middle;
					}
					input:-moz-placeholder, textarea:-moz-placeholder {
						font-weight: 550;
						color: #999999;
						font-size: 14px;
						vertical-align: middle;
					}
					input::-moz-placeholder, textarea::-moz-placeholder {
						font-weight: 550;
						color: #999999;
						font-size: 14px;
						vertical-align: middle;
					}
					input:-ms-input-placeholder, textarea:-ms-input-placeholder {
						font-weight: 550;
						color: #999999;
						font-size: 14px;
						vertical-align: middle;
					}
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
		}
	}
</style>