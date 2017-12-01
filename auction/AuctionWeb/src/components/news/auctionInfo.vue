<template>
	<div>
		<div class="auctioninfo">
			<div class="auctioninfo-head">
				<span class="head-words">拍卖公告</span>
				<a class="head-more">更多</a>
			</div>
			<div class="biaodan">
			输入标题  <input type="text" class="productId form-control" v-model="auction.acTitle">
			输入时间  <input type="text" class="productName form-control" v-model="auction.acTime">
			<button class="btn btn-info" @click="addproduct">add</button>
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
				auctioninfo: [],
				auction: {
					acTitle: '',
					acTime: ''
				}
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
			addproduct() {
				////JSON.stringify（）JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。 为了清除不想要的东西
				axios.post("/auction",this.auction).then((res)=> {
					console.log(res);
				}).catch((error)=> {
					console.log(error);
				});
			},
		}
	}
</script>

<style scoped>
@import '/static/css/auctioninfo.css'
</style>