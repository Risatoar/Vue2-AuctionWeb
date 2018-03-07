<!--
法律法规右侧列表组件界面
author：risatoar
date：2017/12/13
-->
<template>
	<!-- 法律法规列表组件界面背景层 -->
	<div class="law-wrap">
		<!-- 法律法规列表组件界面主体层 -->
		<div class="law-body">
			<div class="law-body-top">
				<!-- 法律法规列表组件界面副标题 -->
				<span class="law-body-top-content">法律法规</span>
			</div>
			<div class="law-body-list">
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
				<!-- 法律法规信息列表展示 -->
				<div v-for="item in lawlist">
					<router-link :to="{path: 'law/' + item._id}">
						<div class="law-body-list-block" v-touch-ripple>
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
export default {
	components: {
	},
	data() {
		return {
			lawlist: [],
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
		// 获取法律法规消息列表
		getinfo() {
			axios.get("/law").then((result)=>{
				let res = result.data;
				this.loading = false
				this.lawlist = res.result.list;
			});
		}
	}
}
</script>

<style scoped>
@import '/static/css/list.css'
</style>