<template>
	<div>
		<div class="auctioninfo">
			<div class="auctioninfo-head">
				<span class="head-words">拍卖公告</span>
				<a class="head-more">更多</a>
			</div>
			<div class="auctioninfo-body" v-for="(item,index) in auctioninfo">
				<div class="auctioninfo-body-item">
					<span class="new">NEW</span>
					<li class="item-title "><a href="http://www.alltobid.com/contents/13/2158.html"><strong>{{ item.acTitle }}</strong></a></li>
					<li class="item time">拍卖时间：{{ item.acTime }}</li>
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
				auctioninfo: []
			}
		},
		mounted() {
			this.getauctioninfo();
		},
		methods: {
			getauctioninfo() {
				axios.get("/auction").then((result)=>{
					let res = result.data;
					this.auctioninfo = res.result.list;
				});
			},
		}
	}
</script>

<style scoped>
@import '/static/css/auctioninfo.css'
</style>