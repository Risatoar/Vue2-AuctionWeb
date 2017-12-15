<template>
	<div>
		<div class="head">
			<div class="head-inner">
				<div class="head-inner-company">
				<router-link :to="{path: '/'}">
					<span> {{ company }} </span>
				</router-link>
				</div>
				<div class="head-inner-nav">
					<ul>
						<keep-alive>
						<router-link :to="{path: '/detail/' + 'info'}">
						<li> 拍卖公告 </li>
					    </router-link>
					    </keep-alive>
						<router-link :to="{path: '/detail/' + 'law'}" tag="li"> 法律法规 </router-link>
						<router-link :to="{path: '/detail/' + 'knowledge'}" tag="li"> 拍卖知识 </router-link>
						<router-link :to="{path: '/detail/' + 'preview'}" tag="li"> 拍卖预告 </router-link>
					</ul>
				</div>
				<div class="head-inner-login">
					<router-link :to="{ path : '/user'+'?'+username}" tag="li">{{ username }}</router-link>
					<li v-if="username === ''" @click="loginClick">登录</li>
					<li class="nav-pile" >|</li>
					<li v-if="username === ''" @click="regClick">注册</li>
					<li v-if="username !== ''" @click="quit">退出</li>
					<li class="nav-pile" >|</li>
					<li @click="aboutClick">关于我们</li>
					<li class="nav-pile" v-if="isAdmin === 'true'">|</li>
					<li v-if="isAdmin === 'true'" >管理员界面</li>
				</div>
			</div>
		</div>
		<div class="content">
		  <keep-alive>
			<router-view></router-view>
		  </keep-alive>
		</div>
		<div class="foot">
			<p>
				Proudly By XuXiang Copyright © 2017. All rights reserved.
			</p>
		</div>
		<login :is-show="isLoginDialog" @on-close="closeDialog('isLoginDialog')" @has-log="onSuccessLog"></login>
		<register :is-show="isRegDialog" @on-close="closeDialog('isRegDialog')" @on-change="changetoLogin"></register>
		<dialog-box :is-show="isShowAboutDialog" @on-close="closeDialog('isShowAboutDialog')">
			公司名称：{{ company }}
		</dialog-box>
		<loading></loading>
	</div>
</template>

<script>
import axios from 'axios'
import loading from './LoadingPage.vue'
import dialogBox from './dialog.vue'
import login from './user/login.vue'
import register from './user/register.vue'
import VueTouchRipple from 'vue-touch-ripple'
export default{
	name: 'layout',
	components: {
		loading,
		dialogBox,
		login,
		register
	},
	data() {
		return {
			ucookie: '',
			username: '',
			isAdmin: '',
			isLoginDialog: false,
			isRegDialog: false,
			isShowAboutDialog: false,
			company: '天台始丰拍卖有限公司',
			navLists: [
			{
				name: '拍卖公告'
			},
			{
				name: '法律法规'
			},
			{
				name: '拍卖知识'
			},
			{
				name: '拍卖预告'
			}
			]
		}
	},
	mounted() {
		this.setUsername();
		this.setAdmin()
	},
	methods: {
	    getCookie (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
        },
        setCookie (cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
        },
        setUsername () {
		    this.username = this.getCookie("user")
        },
        setAdmin() {
        	this.isAdmin = this.getCookie("admin")
        },
        onSuccessLog (data) {
		  this.closeDialog ('isLoginDialog')
		  // this.username = data.username
		  // var ucookie = this.cookie
		  this.username = this.getCookie("user")
		  this.isAdmin = this.getCookie("admin")
		},
		aboutClick() {
		  this.isShowAboutDialog = true
		},
		loginClick() {
			this.isLoginDialog = true
		},
		regClick() {
			this.isRegDialog = true
		},
		closeDialog(attr) {
          this[attr] = false
        },
        quit() {
        	this.setCookie("user", "", -1);
        	this.setCookie("admin", "", -1);
        	this.username = this.getCookie("user")
        	this.isAdmin = false
        },
        changetoLogin() {
        	let _this = this
        	this.timeout = setTimeout(()=>{
        		_this.isRegDialog = false;
        		_this.isLoginDialog = true;
        	},1000)
        }
	}
}
</script>

<style>
*
{
    font: inherit;
    font-size: 100%;

    margin: 0;
    padding: 0;

    vertical-align: baseline;

    border: 0;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}

a
{
    text-decoration-line: none;
}

p
{
    text-decoration: none;
}

ul,
li
{
    list-style: none;
}

table
{
    border-spacing: 0;
    border-collapse: collapse;
}

body
{
    font-size: 16px;
    line-height: 1;

    color: #000;
}

.head
{
    line-height: 50px;

    width: 100%;
    height: 80px;

    background-color: #222;
    -webkit-box-shadow: 2px 2px 5px #333;
            box-shadow: 2px 2px 5px #333;
    position:fixed;
    left:0;
    top:0;
    z-index:10
}

.head-inner
{
    width: 1200px;
    margin: 0 auto;
}

.head-inner-company
{
    font-size: 24px;
    line-height: 80px;

    float: left;

    width: 300px;

    color: #fff;
}

.head-inner-nav
{
    font-size: 24px;
    line-height: 80px;

    float: left;

    margin: 0 auto;

    color: #fff;

}

.head-inner-nav li
{
    font-size: 20px;
    line-height: 80px;

    float: left;

    width: 100px;

    text-align: center;

    color: #fff;
    background-color: #080808;
}

.head-inner-nav li:hover
{
    cursor: pointer;

    background-color: #222;
}

.head-inner-login
{
    float: right;

    color: #fff;
}

.head-inner-login li
{
    line-height: 80px;

    float: left;

    cursor: pointer;
}

.nav-pile
{
    padding: 0 10px;
}

.foot
{
    line-height: 80px;

    clear: both;

    text-overflow: ellipsis;
     white-space: nowrap;

    width: 100%;
    height: 80px;

    text-align: center;

    background: #e3e4e8;
}
.form-control{
	margin: 0 auto;
	width: 400px;
}
</style>