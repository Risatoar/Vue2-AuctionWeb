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
				<div class="hnewslist-block">
					<div class="hnewslist-block-left">
						<img src="../../../static/img/mi6.jpg">
					</div>
					<div class="hnewslist-block-right">
						<li>
							<a class="hnewslist-block-right-title">{{ item.title }}</a>
						</li>
						<li>
						  <a class="hnewslist-block-right-date">{{ item.date }}</a>
					    </li>
					</div>
				</div>
			</div>
		</div>
		<!-- 分页功能 -->
		<div class="page">
			<Page :total="100"></Page>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			mynewslist: [
			{
				"date" : "2017/11/30",
			    "author" : "risatoar",
			    "title" : "国内高校首个吉他专业工作室在上大音乐学院成立",
			    "description" : "中国核桃之乡”云南大理漾濞22棵百年核桃树两年的果实采摘权拍卖在上海国际商品拍卖有限公司圆满落槌"
			},
			{
				"date" : "2017/11/30",
			    "author" : "risatoar",
			    "title" : "国内高校首个吉他专业工作室在上大音乐学院成立",
			    "description" : "中国核桃之乡”云南大理漾濞22棵百年核桃树两年的果实采摘权拍卖在上海国际商品拍卖有限公司圆满落槌"
			},{
				"date" : "2017/11/30",
			    "author" : "risatoar",
			    "title" : "国内高校首个吉他专业工作室在上大音乐学院成立",
			    "description" : "中国核桃之乡”云南大理漾濞22棵百年核桃树两年的果实采摘权拍卖在上海国际商品拍卖有限公司圆满落槌"
			},
			{
				"date" : "2017/11/30",
			    "author" : "risatoar",
			    "title" : "国内高校首个吉他专业工作室在上大音乐学院成立",
			    "description" : "中国核桃之乡”云南大理漾濞22棵百年核桃树两年的果实采摘权拍卖在上海国际商品拍卖有限公司圆满落槌"
			},
			{
				"date" : "2017/11/30",
			    "author" : "risatoar",
			    "title" : "国内高校首个吉他专业工作室在上大音乐学院成立",
			    "description" : "中国核桃之乡”云南大理漾濞22棵百年核桃树两年的果实采摘权拍卖在上海国际商品拍卖有限公司圆满落槌"
			},
			{
				"date" : "2017/11/30",
			    "author" : "risatoar",
			    "title" : "国内高校首个吉他专业工作室在上大音乐学院成立",
			    "description" : "中国核桃之乡”云南大理漾濞22棵百年核桃树两年的果实采摘权拍卖在上海国际商品拍卖有限公司圆满落槌"
			}
			]
		}
	},
	methods: {
		toAddInfo() {
			this.$router.push({path:'/infoadd'})
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
.infoadd{

}
h3{
	padding:0 5px;
	font-family: Helvetica;
}

.hnewslist-body{
	padding:20px 5px;
	height: 630px;
	width: 598px;
}
.hnewslist-block{
	height: 90px;
	-webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    min-width: 0;
    text-align: left;
}
.hnewslist-block img{
	float: left;
	width: 108px;
	height: 90px;
}
.hnewslist-block-right{
	margin: .5em 0 1em;
    white-space: nowrap;
    overflow: hidden;
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