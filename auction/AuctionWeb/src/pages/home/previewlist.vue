<!--
查看发出过的拍卖预告功能界面
author：risatoar
date：2017/12/26
-->
<template>
	<!-- 发出过的拍卖信息功能界面主体 -->
	<div class="home-previewlist">
		<!-- 发出过的拍卖信息功能界面头部 -->
		<div class="hpreviewlist-top">
			<!-- 发出过的拍卖信息功能界面头部背景层 -->
			<div class="hpreviewlist-top-wrap">
				<h3>您发出过的拍卖信息都在这里</h3>
				<button @click="toAddPreview" class="btn btn-info previewadd">
					发布一个呗~
				</button>
			</div>
		</div>
		<!-- 发出过的拍卖信息功能界面消息列表 -->
		<div class="hpreviewlist-body">
			<div class="hpreviewlist-body-list" v-for="item in mypreviewlist">
				<div class="hpreviewlist-block">
					<div class="hpreviewlist-block-left">
						<img src="../../../static/img/mi6.jpg">
					</div>
					<div class="hpreviewlist-block-right">
						<li>
							<a class="hpreviewlist-block-right-title">{{ item.title }}</a>
						</li>
						<li>
						  <a class="hpreviewlist-block-right-date">{{ item.date }}</a>
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
			mypreviewlist: [
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
		toAddPreview() {
			this.$router.push({path:'/previewadd'})
		}
	}
}
</script>

<style scoped>
.hpreviewlist-top{
	height: 80px;
	width: 598px;
}
.hpreviewlist-top-wrap{
	width: 598px;
	padding:20px 5px;
	background-color: #fff;
	vertical-align:middle;
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}
h3{
	padding: 0 5px;
	font-family: Helvetica;
}
.hpreviewlist-body{
	padding:20px 5px;
	height: 630px;
	width: 598px;
}
.hpreviewlist-block{
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
.hpreviewlist-block img{
	float: left;
	width: 108px;
	height: 90px;
}
.hpreviewlist-block-right{
	margin: .5em 0 1em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.hpreviewlist-block-right li{
	padding:10px 0;
}
.hpreviewlist-block-right a{
	color: inherit;
	font-size: 16px;
    font-weight: 600;
    line-height: 1.2;
    color: #2e3135;
}
</style>