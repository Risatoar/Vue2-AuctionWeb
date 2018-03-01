<!--
查看发出过的拍卖信息功能界面
author：risatoar
date：2017/12/26
-->
<template>
	<!-- 发出过的拍卖信息功能界面主体 -->
	<div class="home-newslist">
		<!-- 发出过的拍卖信息功能界面头部 -->
		<div class="hnewslist-top">
			<!-- 发出过的拍卖信息功能界面头部背景层 -->
			<div class="hnewslist-top-wrap">
				<h3>您发出过的拍卖信息都在这里</h3>
				<button @click="toAddInfo" class="btn btn-info infoadd">
					发布一个呗~
				</button>
			</div>
		</div>
		<!-- 发出过的拍卖信息功能界面消息列表 -->
		<div class="hnewslist-body">
			<div class="hnewslist-body-list" v-for="item in mynewslist">
				<router-link :to="{path: '/detail/info/' + item._id}">
					<div class="hnewslist-block">
						<div class="hnewslist-block-left">
							<img v-lazy="'/static/img/uploads/' + item.covermap">
						</div>
						<div class="hnewslist-block-right">
							<li class="un-title ecl">
								{{ item.title }}
							</li>
							<li class="un-date ecl">
							  {{ item.date }}
						    </li>
						</div>
					</div>
				</router-link>
			</div>
		</div>
		<!-- 分页功能 -->
		<div class="page">
			<Page :total="100"></Page>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	data() {
		return {
			mynewslist: []
		}
	},
	mounted() {
		this.getUserInfo();
	},
	computed: {
		username() {
			return this.$store.state.username
		}
	},
	methods: {
		toAddInfo() {
			this.$router.push({path:'/infoadd'})
		},
		getUserInfo() {
			axios.post("/userinfo",this.usernmae).then((res)=> {
			    if(res.data.status == 10001){
			    	this.mynewslist = res.data.result.list;
			        this.success('修改成功')
			    }else if(res.data.status == 1002){
			        this.error('修改失败,密码错误')
			    }else if(res.data.status == 1003){
			    	this.warning('数据没有修改过')
			    }
			}).catch((error)=> {
			  console.log(error);
			});
		}
	}
}
</script>

<style scoped>
.hnewslist-top{
	height: 80px;
	width: 598px;
	text-align: left;
}
.hnewslist-top-wrap{
	position: relative;
	width: 598px;
	padding:20px 5px;
	background-color: #fff;
	vertical-align:middle;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}
h3{
	padding:0 5px;
	font-family: Helvetica;
}
.hnewslist-body{
	display: block;
	padding:20px 5px;
	height: 630px;
	width: 598px;
}
.hnewslist-block{
	height: 90px;
	width: 100%;
	text-align: left;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	border-bottom: 1px solid #d7dde4;
}
.hnewslist-block img{
	width: 108px;
	height: 90px;
	margin: 0 20px;
}
.hnewslist-block-right{
	width: 320px;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.ecl{
	overflow: hidden;
    width: 240px;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.hnewslist-block-right li{
	padding:10px 0;
}
.hnewslist-block-right a{
	color: inherit;
	font-size: 16px;
    font-weight: 600;
    line-height: 1.2;
    color: #2e3135;
}
</style>