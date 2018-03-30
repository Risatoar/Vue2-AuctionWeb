<!--
拍卖预告信息添加界面
author：risatoar
date：2017/12/27
-->
<template>
	<!-- 拍卖预告信息添加界面 -->
	<div class="addpreview">
		<!-- 拍卖预告信息添加界面背景层 -->
		<div class="addpreview-wrap">
			<!-- 拍卖预告信息添加界面内容层 -->
			<div class="addpreview-content">
				<!-- 拍卖预告信息添加界面头部 -->
				<div class="addpreview-content-head">
					<!-- 拍卖预告信息添加界面头部标题 -->
					<div class="addpreview-content-head-title">
						现在就来发布一则拍卖消息吧！
					</div>
					<!-- 拍卖预告信息添加界面头部发布按钮 -->
					<button class="btn btn-info addpreview-btn" @click="addpreview">立即发布!</button>
				</div>
				<!-- 拍卖预告信息添加界面标题添加 -->
				<div class="addpreview-content-addtitle">
					<label>点击这里输入标题</label>
					<input type="text" class="form-control input-title" label="点击这里输入标题" v-model="add.title"></input>
				</div>
				<!-- 拍卖预告信息添加界面简介添加 -->
				<div class="addpreview-content-adddescription">
					<label>请输入简介</label>
					<input type="text" class="form-control input-description" label="请输入简介" v-model="add.description"></input>
				</div>
				<!-- 拍卖预告信息添加界面价格添加 -->
				<div class="addpreview-content-addsaleprice">
					<label>请输入价格</label>
					<InputNumber :min="1" class="form-control input-saleprice" label="请输入价格" v-model="add.saleprice">请输入价格</InputNumber>
				</div>
				<!-- 图片上传 -->
				<div style="padding: 20px 10px;width:300px;float:left;">
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
				<!-- 拍卖预告信息添加界面时间选择区块，采用了iview的datepicker和timepicker组件 -->
				<div class="timepicker">
					<span class="timepicker-title">请在这里选择拍卖开始及结束时间</span>
					<!-- 通过datepicker选择拍卖预告开始及结束日期 -->
					<div class="timepicker-date">
						<Date-picker type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px" format="yyyy-MM-dd" @on-change="add.setdate=$event">
						</Date-picker>
					</div>
		            </br>
		            <span class="timepicker-title">选择拍卖结束具体时间</span>
		            <!-- 通过datepicker选择拍卖预告具体结束时间 -->
		            <div class="timepicker-date">
						<Time-picker type="time" placeholder="选择时间" style="width: 168px" @on-change="timess=$event"></Time-picker>
					</div>
				</div>
				<div class="addpreview-content-body">
					<h3>请输入拍卖信息主要内容</h3>
					<!-- 拍卖预告添加界面主要内容添加，富文本编辑器采用了vue-editor -->
					<vue-editor v-model="add.maintext"></vue-editor>
					<h2>预览</h2>
					<!-- 主要内容信息预览区块，可以看到输入的内容在实际界面的样式 -->
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
			timess:'',
			add: {
				author: '',
				title: '',
				description: '',
				maintext: '',
				saleprice: 1000,
				setdate: [],
				covermap: ''
			}
		}
	},
	mounted() {
		this.gotop()
	},
	methods: {
		gotop() {
			window.scrollTo(0,0)
		},
		// 调用iview组件的emit事件展示全局发送成功提示
		success () {
        	this.$Message.success('发送成功');
        },
        handleSuccess (res, file) {
        	console.log(res)
            this.add.covermap = res.originalname;
        },
        // 设置获取cookie的代理方法
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
         // 通过cookie名获取username，设置拍卖预告作者
        setAuthor() {
        	this.add.author = this.getCookie("user")
        },
        // 将选择的具体拍卖预告结束时间利用push方法拼接到日期数组中
        pushTime() {
        	this.add.setdate.push(this.timess)
        },
        // 检查时间区间是否完全选择
        checkTime() {
        	let result
        	let count = 0
			for(let i= 0;i<this.add.setdate.length;i++) {
				count = this.add.setdate[i] == ""?count:count+1
				result = count >= 3?true:false
			}
			return result
        },
        // 通过axios封装的ajax操作来与后台进行异步post操作,添加拍卖预告
		addpreview() {
			this.setAuthor()
			this.pushTime()
			if(this.add.covermap == '') {
				this.$Message.error('请添加图片');
			}else if(this.add.title == '') {
				this.$Message.error('请添加标题');
			}else if(this.add.maintext == '') {
				this.$Message.error('请添加主要信息');
			}else if(this.checkTime() == false) {
				this.$Message.error('请添加完整的时间区间');
			}else if(this.add.maintext == '') {
				this.$Message.error('请添加主要信息');
			}else {
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
}
</script>

<style scoped>
@import '/static/css/addlist.css'
</style>