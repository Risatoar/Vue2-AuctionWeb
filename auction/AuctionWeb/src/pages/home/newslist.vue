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
			</div>
		</div>
		<!-- 发出过的拍卖信息功能界面消息列表 -->
		<div class="hnewslist-body">
			<div class="hnewslist-body-list" v-for="(item,index) in mynewslist">
				<div class="hnewslist-block" :id="item._id">
					<router-link :to="{path: '/detail/info/' + item._id}">
					<div class="hnewslist-block-left">
						<img v-lazy="'/static/img/uploads/' + item.covermap">
					</div>
					</router-link>
					<div class="hnewslist-block-right">
						<router-link :to="{path: '/detail/info/' + item._id}">
						<ul>
							<li class="un-title ecl">
								{{ item.title }}
							</li>
							<li class="un-date ecl">
							  {{ item.date }}
						    </li>
						</ul>
					    </router-link>
						<Button class="un-edit" type="info" @click.native="showInfoModify(index)">修改</Button>
						<Button class="un-del" type="warning" @click="postInfoDel(item._id)">删除</Button>
					</div>
				</div>
			</div>
		</div>
		<!-- 分页功能 -->
		<div class="page">
			<Page
			 :total="36"
			 :page-size="6"
			 simple
			 :current.sync="pageCount"
			 @on-change="showPageCount"></Page>
		</div>
		<infomodifydialog
					:is-show="isInfoMoDialog"
					:modifydata="selectModify"
		      		@on-close="closeDialog('isInfoMoDialog')">
  		</infomodifydialog>
	</div>
</template>

<script>
import axios from 'axios'
import infomodifydialog from '../../components/modifydialog/infomodify.vue'
import dialogBox from '../../components/dialog.vue'
export default {
	components: {
		infomodifydialog,
		dialogBox
	},
	data() {
		return {
			mynewslist: [],
			pageCount: 1,
			isInfoMoDialog: false,
			selectModify: {}
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
		// 显示修改弹出层
		showInfoModify(number) {
			this.selectModify = this.mynewslist[number]
			console.log(this.selectModify)
			this.isInfoMoDialog = true;

		},
		// 关闭弹出层
		closeDialog(attr) {
	      console.log(attr)
          this.isInfoMoDialog = false
        },
		getUserInfo() {
			let userInfoPost = {
				username: this.username,
				pagecount: this.pageCount
			}
			axios.post("/userinfo",userInfoPost).then((res)=> {
			    if(res.data.status == 10001){
			    	this.mynewslist = res.data.result.list;
			    	let countNum = res.data.result.count;
			    	this.totleCount = countNum;
			    	this.$emit('get-user-info-count',countNum)
			    }
			}).catch((error)=> {
			  console.log(error);
			});
		},
		showPageCount() {
			this.getUserInfo();
		},
		postInfoDel(str) {
			let username = this.username;
			let delid = str;
			axios.post("/infodel",{
				username,
				delid
			}).then((res)=> {
			    if(res.data.status == 222){
			        for(let ls=0;ls<this.mynewslist.length;ls++){
			        	if(this.mynewslist[ls]._id == delid) {
			        		this.mynewslist.splice(ls,1)
			        		if (this.mynewslist.length<6) {
			        			this.getUserInfo()
			        		}
			        	}
			        	console.log(this,mynewslist)
			        	if (this.mynewslist.length<6) {
			        		this.getUserInfo()
			        	}
			        	console.log(this,mynewslist)
			        }
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
	position: relative;
	height: 90px;
	width: 100%;
	text-align: left;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: horizontal;
	-webkit-box-direction: normal;
	    -ms-flex-direction: row;
	        flex-direction: row;
	-ms-flex-wrap: nowrap;
	    flex-wrap: nowrap;
	border-bottom: 1px solid #d7dde4;
}
.hnewslist-block img{
	width: 108px;
	height: 90px;
	margin-right: 20px;
}
.hnewslist-block-right{
	width: 320px;
    white-space: nowrap;
    -o-text-overflow: ellipsis;
       text-overflow: ellipsis;
}
.ecl{
	overflow: hidden;
    width: 340px;
    white-space: nowrap;
    -o-text-overflow: ellipsis;
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
.un-edit {
	float: right;
	right: 10px;
	top: 10px;
	position: absolute;
}
.un-del {
	float: right;
	right: 10px;
	bottom: 10px;
	position: absolute;
}
</style>