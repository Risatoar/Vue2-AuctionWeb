<!--
拍卖信息添加界面
author：risatoar
date：2017/12/26
-->
<template>
	<!-- 拍卖信息添加界面 -->
	<div class="addinfo">
		<!-- 拍卖信息添加界面背景层 -->
		<div class="addinfo-wrap">
			<!-- 拍卖信息添加界面内容层 -->
			<div class="addinfo-content">
				<!-- 拍卖信息添加界面头部 -->
				<div class="addinfo-content-head">
					<!-- 拍卖信息添加界面头部标题 -->
					<div class="addinfo-content-head-title">
						现在就来发布一则拍卖消息吧！
					</div>
					<!-- 拍卖信息添加界面头部发布按钮 -->
					<button class="btn btn-info addinfo-btn" @click="addInfo">立即发布!</button>
				</div>
				<!-- 拍卖信息添加界面标题添加 -->
				<div class="addinfo-content-addtitle">
					<label>点击这里输入标题</label>
					<input type="text" class="form-control input-title" label="点击这里输入标题" v-model="add.title"></input>
				</div>
				<!-- 拍卖信息添加界面简介添加 -->
				<div class="addinfo-content-adddescription">
					<label>请输入简介</label>
					<input type="text" class="form-control input-description" label="请输入简介" v-model="add.description"></input>
				</div>
				<div style="padding: 20px 10px;width:300px;">
					<Upload
					    multiple
					    type="drag"
					    action="/uploads"
					    :on-success="handleSuccess"
					    >
					    <div>
					        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
					        <p>添加封面图片</p>
					    </div>
					</Upload>
				</div>
				<!-- 拍卖信息添加界面主要内容添加，富文本编辑器采用了vue-editor -->
				<div class="addinfo-content-body">
					<h3>请输入拍卖信息主要内容</h3>
					<vue-editor v-model="add.maintext"></vue-editor>
					<!-- 主要内容信息预览区块，可以看到输入的内容在实际界面的样式 -->
					<h2>预览</h2>
					<div class="addinfo-content-preview">
						<p v-html="add.maintext" class="addinfo-content-preview-maintext"></p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import { VueEditor } from 'vue2-editor'
export default {
	components: {
	   VueEditor
	},
	data() {
		return {
			add: {
				author: '',
				title: '',
				description: '',
				maintext: '',
				covermap: '',
				watcher: ''
			},
			username: '',
			visible: false,
		}
	},
	methods: {
		success () {
        	this.$Message.success('发送成功');
        },
        // 获取cookie
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
        // 通过cookie名获取username，设置拍卖公告作者
        setAuthor() {
        	this.add.author = this.getCookie("user")
        },
        handleSuccess (res, file) {
        	console.log(res)
            this.add.covermap = res.originalname;
        },
        // 通过axios封装的ajax操作来与后台进行异步post操作,添加拍卖公告
		addInfo() {
			this.setAuthor()
			axios.post("/addinfo",this.add).then((res)=> {
				console.log(res);
				if(res.status == '200'){
					this.success()
				}
			}).catch((error)=> {
				console.log(error);
			});
		}
	}
}
</script>

<style scoped>
@import '/static/css/addlist.css'
</style>