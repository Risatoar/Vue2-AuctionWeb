<!--
拍卖预告信息添加界面
author：risatoar
date：2017/12/27
-->
<template>
	<div class="addpreview">
		<div class="addpreview-wrap">
			<div class="addpreview-content">
				<div class="addpreview-content-head">
					<div class="addpreview-content-head-title">
						现在就来发布一则拍卖消息吧！
					</div>
					<button class="btn btn-info addpreview-btn" @click="addpreview">立即发布!</button>
				</div>
				<div class="addpreview-content-addtitle">
					<label>点击这里输入标题</label>
					<input type="text" class="form-control input-title" label="点击这里输入标题" v-model="add.title"></input>
				</div>
				<div class="addpreview-content-adddescription">
					<label>请输入简介</label>
					<input type="text" class="form-control input-description" label="请输入简介" v-model="add.description"></input>
				</div>
				<div class="timepicker">
					<span class="timepicker-title">请在这里选择拍卖开始及结束时间</span>
					<div class="timepicker-date">
						<Date-picker type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px" format="yyyy-MM-dd" @on-change="add.setdate=$event">
						</Date-picker>
					</div>
					<span class="timepicker-show">
		            	拍卖开始日期:{{ add.setdate[0] }}----拍卖结束时间:{{ add.setdate[1] }}
		            </span>
				</div>
				<div class="addpreview-content-body">
					<h3>请输入拍卖信息主要内容</h3>
					<vue-editor v-model="add.maintext"></vue-editor>
					<h2>预览</h2>
					<div class="addpreview-content-preview">
						<p v-html="add.maintext" class="addpreview-content-preview-maintext"></p>
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
				setdate: ''
			}
		}
	},
	methods: {
		success () {
        	this.$Message.success('发送成功');
        },
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
        setAuthor() {
        	this.add.author = this.getCookie("user")
        },
		addpreview() {
			////JSON.stringify（）JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。 为了清除不想要的东西
			this.setAuthor()
			axios.post("/addpreview",this.add).then((res)=> {
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