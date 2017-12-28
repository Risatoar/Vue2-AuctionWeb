<!--
最新4条消息列表组件
author：risatoar
date：null
-->
<template>
	<div>
		<!-- 主页最新消息展示组件 -->
		<div class="hotnews">
			<!-- <div class="biaodan">
			输入标题  <input type="text" class="productId form-control" v-model="info.time">
			输入时间  <input type="text" class="productName form-control" v-model="info.title">
			输入时间  <input type="text" class="productName form-control" v-model="info.msg">
			<button class="btn btn-info" @click="addproduct">add</button> -->

			<!-- 展示数据库最新前四条数据 -->
			<div class="hotnews-block" v-for="(item,index) in information" :class="[{'hotnewsshow' : index - 3 > 0}]">
				<router-link :to="{path: '/detail/pages/' + item._id}">
				<div class="hotnews-block-left" :class="['block' + index]">
					{{ item.date }}
				</div>
				<div class="hotnews-block-right">
					<p class="hotnews-title">{{ item.title }}</p>
					<p class="hotnews-msg" v-html="item.description"></p>
				</div>
			    </router-link>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
	export default {
		data() {
			return {
				information: []
			}
		},
		mounted() {
			this.getinfo();
		},
		methods: {
			// 用get方法来获取数据库中消息列表
			getinfo() {
				axios.get("/information").then((result)=>{
					let res = result.data;
					this.information = res.result.list;
				});
			}
		}
	}
</script>

<style scoped>
@import '/static/css/hotnews.css'
</style>