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
			</div>
		</div>
		<!-- 发出过的拍卖信息功能界面消息列表 -->
		<div class="hpreviewlist-body">
			<div class="hpreviewlist-body-list" v-for="item in mypreviewlist">
				<div class="hpreviewlist-block">
					<div class="hpreviewlist-block-left">
						<img v-lazy="'/static/img/uploads/' + item.covermap">
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
import axios from 'axios'
export default {
	data() {
		return {
			mypreviewlist: []
		}
	},
	mounted() {
		this.getUserPre();
	},
	computed: {
		username() {
			return this.$store.state.username
		}
	},
	methods: {
		getUserPre() {
			axios.post("/userpreview",this.usernmae).then((res)=> {
			    if(res.data.status == 10001){
			    	this.mypreviewlist = res.data.result.list;
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
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: horizontal;
	-webkit-box-direction: normal;
	    -ms-flex-direction: row;
	        flex-direction: row;
	-ms-flex-pack: distribute;
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
    -o-text-overflow: ellipsis;
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