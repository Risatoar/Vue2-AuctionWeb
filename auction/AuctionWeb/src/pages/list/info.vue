<!--
拍卖公告右侧列表组件界面
author：risatoar
date：2017/12/13
-->
<template>
	<!-- 拍卖公告列表组件界面背景层 -->
	<div class="info-wrap">
		<!-- 拍卖公告列表组件界面主体层 -->
		<div class="info-body">
			<div class="info-body-top">
				<!-- 拍卖公告列表组件界面副标题 -->
				<span class="info-body-top-content" v-touch-ripple>最新消息</span>
			</div>
			<div class="info-body-list">
				<!-- 页面加载loding动画 -->
				<div v-if="loading">
					<content-placeholders v-if="loading">
					  <content-placeholders-heading :img="true" />
					</content-placeholders>
					<br><br>
					<content-placeholders v-if="loading">
					  <content-placeholders-heading :img="true" />
					</content-placeholders>
					<br><br>
					<content-placeholders v-if="loading">
					  <content-placeholders-heading :img="true" />
					</content-placeholders>
					<br><br>
					<content-placeholders v-if="loading">
					  <content-placeholders-heading :img="true" />
					</content-placeholders>
					<br><br>
					<content-placeholders v-if="loading">
					  <content-placeholders-heading :img="true" />
					</content-placeholders>
					<br><br>
					<content-placeholders v-if="loading">
					  <content-placeholders-heading :img="true" />
					</content-placeholders>
					<br><br>
				</div>
				<!-- 拍卖公告信息列表展示 -->
				<div v-for="item in infolist">
					<router-link :to="{path: 'info/' + item._id}">
						<div class="info-body-list-block" v-touch-ripple>
							<div class="list-block-left">
								<img class="left-img" src="/static/img/mi6.jpg" >
							</div>
							<div class="list-block-right">
								<h3>
									<a class="block-right-title">
										{{ item.title }}
									</a>
								</h3>
								<p class="block-right-description" v-html="item.description">
								</p>
								<div class="block-right-foot">
									<p>
										<span class="block-right-author">
											{{ item.author }}
										</span>
										<span class="block-right-date">
											{{ item.date }}
										</span>
									</p>
								</div>
							</div>
						</div>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import VueTouchRipple from 'vue-touch-ripple'
export default {
	components: {
		VueTouchRipple
	},
	data() {
		return {
			infolist: [],
			loading: true
		}
	},
	mounted() {
		this.getinfo();
	},
	methods: {
		// 返回顶部
		gotop() {
			window.scrollTo(0,0);
		},
		// 获取拍卖公告消息列表
		getinfo() {
			this.gotop();
			axios.get("/information").then((result)=>{
				this.loading = false;
				let res = result.data;
				this.infolist = res.result.list;
			});
		}
	}
}
</script>

<style scoped>
@import '/static/css/list.css'
</style>