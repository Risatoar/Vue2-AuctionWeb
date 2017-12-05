<template>
	<div>
		<div class="hotnews">
			<!-- <div class="biaodan">
			输入标题  <input type="text" class="productId form-control" v-model="info.time">
			输入时间  <input type="text" class="productName form-control" v-model="info.title">
			输入时间  <input type="text" class="productName form-control" v-model="info.msg">
			<button class="btn btn-info" @click="addproduct">add</button> -->
			<div class="hotnews-block" v-for="(item,index) in information">
				<div class="hotnews-block-left" :class="['block' + index]">
					{{ item.time }}
				</div>
				<div class="hotnews-block-right">
					<p class="hotnews-title">{{ item.title }}</p>
					<p class="hotnews-msg">{{ item.msg }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
	export default {
		data() {
			return {
				information: [],
				info: [
				
				]
			}
		},
		mounted() {
			this.getinfo();
		},
		methods: {
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