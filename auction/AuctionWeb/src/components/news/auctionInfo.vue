<template>
	<div>
		<div class="auctioninfo">
			<div class="auctioninfo-head">
				<a class="head-words">拍卖公告</a>
				<a class="head-more">更多</a>
			</div>
			<div class="auctioninfo-body" v-for="(item,index) in auctioninfo">
				<div class="auctioninfo-body-item">
					<span class="new">NEW</span>
					<li class="item-title"><a href="http://www.alltobid.com/contents/13/2158.html">{{ item.title }}</a></li>
					<li class="item time">拍卖时间：{{ item.time }}</li>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				auctioninfo: [
					{
						time: '2017/11/30',
						title: '2017年12月8日物资网络在线拍卖'
					},
					{
						time: '2017/11/30',
						title: '2017年12月8日物资网络在线拍卖'
					},
					{
						time: '2017/11/30',
						title: '2017年12月8日物资网络在线拍卖'
					},
					{
						time: '2017/11/30',
						title: '2017年12月8日物资网络在线拍卖'
					},
					{
						time: '2017/11/30',
						title: '2017年12月8日物资网络在线拍卖'
					},
				]
			}
		}
	}
</script>

<style scoped>
@import '/static/css/auctioninfo.css'
</style>