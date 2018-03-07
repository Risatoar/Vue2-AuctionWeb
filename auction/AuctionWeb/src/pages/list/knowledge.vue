<!--
拍卖知识右侧列表组件界面
author：risatoar
date：2017/12/13
-->
<template>
	<!-- 拍卖知识列表组件界面背景层 -->
	<div class="knowledge-wrap">
		<!-- 拍卖知识列表组件界面主体层 -->
		<div class="knowledge-body">
			<div class="knowledge-body-top">
				<!-- 拍卖知识列表组件界面副标题 -->
				<span class="knowledge-body-top-content" v-touch-ripple>拍卖知识</span>
			</div>
			<div class="knowledge-body-list">
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
				</div>
				<!-- 拍卖知识信息列表展示 -->
				<div v-for="item in knowledgelist">
					<router-link :to="{path: 'knowledge/' + item._id}">
						<div class="knowledge-body-list-block" v-touch-ripple>
							<div class="list-block-left">
								<img class="left-img" v-lazy="'/static/img/uploads/' + item.covermap" style="background-color:#fff;">
							</div>
							<div class="list-block-right">
								<a class="block-right-title">
									{{ item.title }}
								</a>
								<p class="block-right-description" v-html="item.description">
								</p>
								<div class="block-right-foot">
									<p>
										<span class="block-right-author">
											作者：{{ item.author }}
										</span>
										<span class="block-right-date">
											发布时间：{{ item.date }}
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
			knowledgelist: [],
			loading: true
		}
	},
	mounted() {
		this.getinfo()
		this.gotop()
	},
	methods: {
		gotop() {
			window.scrollTo(0,0)
		},
		// 获取拍卖知识消息列表
		getinfo() {
			axios.get("/knowledge").then((result)=>{
				this.loading = false;
				let res = result.data;
				this.knowledgelist = res.result.list;
			});
		}
	}
}
</script>

<style scoped>
@import '/static/css/list.css'
</style>