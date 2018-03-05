<!--
layout全局组件
author：risatoar
date：null
-->
<template>
	<div>
		<!-- layout头部,用来展示导航栏信息 -->
		<div class="head">
			<div class="head-wrap">
					<div class="head-inner">
						<!-- 公司标志 -->
						<div class="head-inner-company">
						<router-link :to="{path: '/'}">
							<span> {{ company }} </span>
						</router-link>
						</div>
						<!-- 导航栏 -->
						<nav class="head-inner-nav">
							<ul>
								<router-link :to="{path: '/detail/' + 'info'}" tag="li">
								拍卖公告
							    </router-link>
								<router-link :to="{path: '/detail/' + 'law'}" tag="li"> 法律法规
								</router-link>
								<router-link :to="{path: '/detail/' + 'knowledge'}" tag="li"> 拍卖知识
								</router-link>
								<router-link :to="{path: '/detail/' + 'preview'}" tag="li"> 拍卖预告
								</router-link>
							</ul>
						</nav>
						<div class="search">
							<AutoComplete
						        v-model="value4"
						        icon="ios-search"
						        placeholder="请输入文章名称/作者 进行查询"
						        style="width:300px"
						        @on-search="SearchSomething">
						        <div class="search-auto-complete-item" v-for="item in data4">
						            <div class="search-auto-complete-group">
						                <span>{{ item.title }}</span>
						                <a>更多</a>
						            </div>
						            <Option v-for="option in item.children" :value="option.title" :key="option.title">
						                <span class="search-auto-complete-title">{{ option.title }}</span>
						                <span class="search-auto-complete-author">作者: {{ option.author}}</span>
						            </Option>
						        </div>
						    </AutoComplete>
						</div>
						<!-- 登录注册模块 -->
						<div class="head-inner-login">
							<!-- <router-link :to="{ path : '/user/'+username}" tag="li" v-if="username !== ''"> <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" /></router-link> -->
							<!-- <router-link :to="{ path : '/user/'+username}" tag="li" v-if="username !== ''"> -->
							<li v-if="username !== ''">
								<!-- 下拉组件 -->
								<Dropdown trigger="custom" :visible="visible" style="margin-left: 20px">
									<!-- 头像 -->
								    <a href="javascript:void(0)" @click="handleOpen">
								        <!-- <img v-lazy="'/static/img/uploads/' + icon" height="40" width="40" style="border-radius: 40px;"> -->
								        <Avatar icon="person" size="large" />
								    </a>
								    <!-- 下拉组件详情 -->
								    <Dropdown-menu slot="list">
								    	<ul class="user-list" @click="handleClose">
								    		<router-link :to="{ path : '/user/'+username}" tag="a">
								    			<Icon type="person"></Icon> 个人中心
								    		</router-link>
								    		<router-link :to="{ path : '/infoadd/'}" tag="a">
								    			<Icon type="edit"></Icon> 写个公告
								    	    </router-link>
								    		<router-link :to="{ path : '/previewadd/'}" tag="a">
								    			<Icon type="compose"></Icon> 发个预告
								    		</router-link>
								    		<a v-if="username !== ''" @click="quit">
								    			<Icon type="log-out"></Icon> 退出登录
								    		</a>
								    	</ul>
								        <div style="text-align: center;margin:10px;">
								            <i-button type="primary" @click="handleClose">关闭</i-button>
								        </div>
								    </Dropdown-menu>
								</Dropdown>
							</li>
						    <!-- </router-link> -->
							<li v-if="username === ''" @click="loginClick">登录</li>
							<li class="nav-pile" v-if="username === ''">|</li>
							<li v-if="username === ''" @click="regClick">注册</li>
							<li class="nav-pile" >|</li>
							<li @click="aboutClick">关于我们</li>
							<li class="nav-pile" v-if="isAdmin === 'true'">|</li>
							<li v-if="isAdmin === 'true'" >管理员界面</li>
						</div>
					</div>
			</div>
		</div>
		<!-- layout内容详情区块 -->
		<div class="content" @click="handleClose">
		  <keep-alive>
		  	<transition :name="transitionName">
			<router-view class="child-view"></router-view>
			</transition>
		  </keep-alive>
		</div>
		<!-- layout脚注区块 -->
		<div class="foot">
			<p>
				Proudly By XuXiang Copyright © 2017. All rights reserved.
			</p>
		</div>
		<login :is-show="isLoginDialog"
		       @on-close="closeDialog('isLoginDialog')"
		       @has-log="onSuccessLog"
		       @on-change="changetoRegister">
		</login>
		<register :is-show="isRegDialog"
				  @on-close="closeDialog('isRegDialog')"
				  @on-change="changetoLogin">
		</register>
		<dialog-box :is-show="isShowAboutDialog"
		            @on-close="closeDialog('isShowAboutDialog')">
			<p>公司名称：{{ company }}</p>
			<p>公司电话：1111111111111</p>
			<p>法人：risatoar</p>
		</dialog-box>
		<loading></loading>
		<Back-top :height="100" :bottom="100">
        <div class="top">返回顶端</div>
        </Back-top>
	</div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
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
			visible: false,
			ucookie: '',
			isLoginDialog: false,
			isRegDialog: false,
			isShowAboutDialog: false,
			transitionName: 'slide-left',
			company: '台州始丰拍卖有限公司',
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
			],
			postUrl: [
			{
				title: '拍卖公告',
				url: '/infosearch'
			},
			{
				title: '法律法规',
				url: '/infosearch'
			},
			{
				title: '拍卖知识',
				url: '/infosearch'
			},
			{
				title: '拍卖预告',
				url: '/previewsearch'
			}
			],
			value4: '',
            data4: [
            {
                title: '拍卖公告',
                children: []
            },
            {
                title: '拍卖法规',
                children: []
            },
            {
                title: '拍卖知识',
                children: []
            },
            {
                title: '拍卖预告',
                children: []
            }
            ]
		}
	},
	mounted() {
		this.setUsername();
		this.setAdmin()
		this.setIcon()
		this.gotop()
	},
	computed: {
		// 利用mapState简化从vuex取值操作
		...mapState(['username','isAdmin','icon'])
		// username() {
		// 	return this.$store.state.username
		// },
		// isAdmin() {
		// 	return this.$store.state.isAdmin
		// }
	},
	methods: {
		gotop() {
			window.scrollTo(0,0)
		},
		// 获取当前路径cookie
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
        // 设置cookie的属性
        setCookie (cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
        },
        // 通过cookie获取username的值,把username的值放入Vuex中
        setUsername () {
        	let usernameCookie = this.getCookie("user")
		    this.$store.commit("updateUserName",usernameCookie)
        },
        // 通过cookie获取管理员权限的值,把isAdmin的值放入Vuex中
        setAdmin() {
        	let isAdminCookie = this.getCookie("admin")
        	this.$store.commit("updateIsAdmin",isAdminCookie)
        },
        setIcon() {
        	let iconCookie = this.getCookie("icon")
        	this.$store.commit("updateIcon",iconCookie)
        },
        // 登录成功事件
        onSuccessLog (data) {
		  this.closeDialog ('isLoginDialog')
		  this.setUsername(),
		  this.setAdmin(),
		  this.setIcon()
		},
		aboutClick() {
		  this.isShowAboutDialog = true
		},
		// 显示登录界面
		loginClick() {
			this.isLoginDialog = true
			this.isRegDialog = false
		},
		// 显示注册界面
		regClick() {
			this.isRegDialog = true
			this.isLoginDialog = false
		},
		// 关闭弹出层
		closeDialog(attr) {
          this[attr] = false
        },
        // 退出登录
        quit() {
        	this.setCookie("user", "", -1);
        	this.setCookie("admin", "", -1);
        	this.$router.replace("/")
        	this.username = ''
        	this.isAdmin = false
        	this.icon = ''
        	this.quitsuccess(true)
        },
        // 退出成功全局提示
        quitsuccess (nodesc) {
           this.$Notice.success({
               title: '退出成功'
           });
        },
        // 从注册转到登录
        changetoLogin() {
        	let _this = this
        	this.timeout = setTimeout(()=>{
        		_this.isRegDialog = false;
        		_this.isLoginDialog = true;
        	},1000)
        },
        // 从登录转到注册
        changetoRegister() {
        	let _this = this
        	this.timeout = setTimeout(()=>{
        		_this.isRegDialog = true;
        		_this.isLoginDialog = false;
        	},500)
        },
        SearchSomething(val) {
    		let parmas = {
    			keywords: val
    		};
    		axios.get("/searchfor/all",parmas).then((res)=> {
    			console.log(res.data.result.list1.list)
    			this.data4[0].children = res.data.result.list1.list
    			this.data4[3].children = res.data.result.list2.list
    		}).catch((error)=>{
    			console.log(error);
    		})
        },
        // 头像处下拉框显示
        handleOpen () {
            this.visible = true;
        },
        // 头像处下拉框隐藏
        handleClose () {
            this.visible = false;
        }
	},
	// watch监听路由跳转,设置跳转动画
	watch: {
	    '$route' (to, from) {
	      if(to.path == '/'){
	        this.transitionName = 'slide-right';
	      }else{
	        this.transitionName = 'slide-left';
	      }
	    }
	}
}
</script>

<style>
@import '/static/css/layout.css'
</style>