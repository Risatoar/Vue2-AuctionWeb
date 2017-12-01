<template>
	<div>
		<div class="hotnews">
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
				information: []
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