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
			<div class="hpreviewlist-body-list" v-for="(item,index) in mypreviewlist">
				<div class="hpreviewlist-block" :id="item._id">
					<router-link :to="{path: '/detail/info/' + item._id}">
					<div class="hpreviewlist-block-left">
						<img v-lazy="'/static/img/uploads/' + item.covermap">
					</div>
					</router-link>
					<div class="hpreviewlist-block-right">
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
						<Button class="un-edit" type="info" @click.native="showPreviewModify(index)">修改</Button>
						<Button class="un-del" type="warning" @click="postPreviewDel(item._id)">删除</Button>
					</div>
				</div>
			</div>
		</div>
		<!-- 分页功能 -->
		<div class="page">
			<Page :total="100"></Page>
		</div>
		<previewmodifydialog
					:is-show="isPreviewMoDialog"
					:modifydata="selectModify"
		      		@on-close="closeDialog('isPreviewMoDialog')">
  		</previewmodifydialog>
	</div>
</template>

<script>
import axios from 'axios'
import previewmodifydialog from '../../components/modifydialog/previewmodify.vue'
import dialogBox from '../../components/dialog.vue'
export default {
	components: {
		previewmodifydialog,
		dialogBox
	},
	data() {
		return {
			mypreviewlist: [],
			isPreviewMoDialog: false,
			selectModify: {}
		}
	},
	mounted() {
		this.getUserPreview();
	},
	computed: {
		username() {
			return this.$store.state.username
		}
	},
	methods: {
		// 显示修改弹出层
		showPreviewModify(number) {
			this.selectModify = this.mypreviewlist[number]
			this.isPreviewMoDialog = true;

		},
		// 关闭弹出层
		closeDialog(attr) {
          this.isPreviewMoDialog = false
        },
		getUserPreview() {
			axios.post("/userpreview",this.username).then((res)=> {
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
		},
		postPreviewDel(str) {
			let username = this.username;
			let delid = str;
			axios.post("/previewdetail/del",{
				username,
				delid
			}).then((res)=> {
			    if(res.data.status == 222){
			        for(let ls=0;ls<this.mypreviewlist.length;ls++){
			        	if(this.mypreviewlist[ls]._id == delid) {
			        		this.mypreviewlist.splice(ls,1)
			        		if (this.mypreviewlist.length<6) {
			        			this.getUserPreview()
			        		}
			        	}
			        	console.log(this,mypreviewlist)
			        	if (this.mypreviewlist.length<6) {
			        		this.getUserPreview()
			        	}
			        	console.log(this,mypreviewlist)
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
.hpreviewlist-top{
	height: 80px;
	width: 598px;
	text-align: left;
}
.hpreviewlist-top-wrap{
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
.hpreviewlist-body{
	display: block;
	padding:20px 5px;
	height: 630px;
	width: 598px;
}
.hpreviewlist-block{
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
.hpreviewlist-block img{
	width: 108px;
	height: 90px;
	margin: 0 20px;
}
.hpreviewlist-block-right{
	width: 320px;
    white-space: nowrap;
    -o-text-overflow: ellipsis;
       text-overflow: ellipsis;
}
.ecl{
	overflow: hidden;
    width: 240px;
    white-space: nowrap;
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