<style>
    #addknowledge {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.addknow-inner {
		width: 100%;
		height: 100%;
		background-color: #fff;
		font-size: 16px;
		display: flex;
		flex-flow: column wrap;
		justify-content: flex-start;
	}

	.title {
		font-weight: 550;
		color: #000;
		font-size: 20px;
		width: 100%;
		height: 40px;
		line-height: 40px;
	}

	.title::before {
		content: ".";
		width: 3px;
		height: 20px;
		background-color: #000;
		margin-right: 10px;
	}

	.addkonw-btn {
	  width: 100px;
	  height: 51px;
	  display: inline-block;
	  border-radius: 4px;
	  border: 1px solid #35495e;
	  color: #fff;
	  background-color: #0c328a;
	  text-decoration: none;
	  margin-bottom: 10px;
	  overflow: hidden;
	  font-family: Main Head;
	  font-size: 16px;
	  position: absolute;
	  top: 10px;
	  right: 10px;
	}

	.addkonw-btn:hover {
	  color: #fff;
	  background-color: #35495e;
	}

	.addkonw-btn:focus, .addkonw-btn:hover {
	  background: rgba(12, 50, 138, .8);
	  border-color: rgba(12, 50, 138, .8);
	  color: #fff
	}

	.addkonw-btn:active {
	  background: rgba(12, 50, 138, .8);
	  border-color: rgba(12, 50, 138, .8);
	  color: #fff
	}

	.addkonw-btn:active {
	  outline: 0
	}

	.addinfo-content-addtitle {
	  padding: 15px 10px;
	  font-weight: bolder;
	}
	.addinfo-content-addtitle .input-title {
	  width: 100%;
	  text-align: center;
	}
	.addinfo-content-adddescription {
	  padding: 15px 10px;
	  font-weight: bolder;
	}
	.addinfo-content-adddescription .input-description {
	  width: 100%;
	  text-align: center;
	  text-indent: 25px;
	}
</style>

<template>
	<section id="addknowledge">
		<div class="addknow-inner">
			<div class="title"><span>添加拍卖知识</span>
				<button class="addkonw-btn" @click="addInfo">立即发布!</button>
			</div>
			<div class="addinfo-content-addtitle">
				<label>点击这里输入标题</label>
				<input type="text" class="form-control input-title" label="点击这里输入标题" v-model="add.title"></input>
			</div>
			<!-- 拍卖信息添加界面简介添加 -->
			<div class="addinfo-content-adddescription">
				<label>请输入简介</label>
				<input type="text" class="form-control input-description" label="请输入简介" v-model="add.description"></input>
			</div>
			<vue-editor v-model="add.maintext"></vue-editor>
		</div>
	</section>
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
					author: 'risatoar',
					title: '',
					description: '',
					maintext: '',
					covermap: '151515430396129900_a480x270.jpg',
					watcher: ''
				},
				username: '',
			}
		},
		mounted() {
			this.gotop()
		},
		methods: {
			gotop() {
				window.scrollTo(0,0)
			},
			success () {
	        	this.$Message.success('发送成功');
	        },
	        // 通过axios封装的ajax操作来与后台进行异步post操作,添加拍卖公告
			addInfo() {
				if(this.add.title == '') {
					this.$Message.error('请添加标题');
				}else if(this.add.maintext == '') {
					this.$Message.error('请添加主要信息');
				}else {
					axios.post("/knowledge/add",this.add).then((res)=> {
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