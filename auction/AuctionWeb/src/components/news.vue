<template>
	<div>
		<div class="message">
			<div class="message-inner">
				<div class="message-inner-head">
					<h3>信 息 中 心</h3>
					<div class="line"></div>
					<p>随时掌握行业动态 即刻了解热点资讯</p>
				</div>
				<div class="message-inner-top">
					<div class="message-inner-top-background">
						<div class="message-inner-top-left">
							<hotnews></hotnews>
						</div>
						<div class="message-inner-top-right">
							<auctioninfo></auctioninfo>
						</div>
					</div>
				</div>
				<div class="message-inner-middle">
					<div class="message-inner-middle-title">
						<li>我们的拍卖网站每周登记<b>{{ aucCount }}</b>件拍卖品</li>
					</div>
					<div class="message-inner-middle-body">
						<div class="auctionlist">
							<ul>
								<li v-for="(item,index) in blocklist">
									<div class="listcard">
										<div class="pic">
											<a href="#">
											<img :src="item.img" class="card-img" >
											</a>
										</div>
										<div class="mainmsg">
											<div class="auctionname">{{ item.auctionname }}</div>
											<div class="auctiondate">{{ item.auctiondate }}</div>
											  <router-link class="btn btn-info detailbtn" :to="{path: 'detail/previews'}" v-touch-ripple>查看详情页</router-link>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div class="message-inner-foot">
						<div class="message-inner-foot-background">
							<h2 class="message-inner-foot-title">
								如何玩转拍卖网
							</h2>
							<div class="message-inner-foot-body">
								<div class="mifb-img">
									<a href="#">
									<img :src="showimg" class="showimg">
									</a>
								</div>
								<ul class="mifb-ul">
									<li class="col-md-3 asda">
										<h3>注册帐号完全免费</h3>
										<p>使用电子邮箱注册新账号。</p>
									</li>
									<li class="col-md-3">
										<h3>开价竞价仅 €1起</h3>
										<p>开价竞拍，赢取心仪拍品！</p>
									</li>
									<li class="col-md-3">
										<h3>交易付款安全可靠</h3>
										<p>选择您的付款方式提交您的支付款项。</p>
									</li>
									<li class="col-md-3">
										<h3>中标拍品快速配送</h3>
										<p>您成功投得的拍品将于3个工作日内安排配送。</p>
									</li>
								</ul>
								<router-link class="btn btn-warning auction-knowledge" :to="{path:'/detail/knowledge'}">
									查看更多
								</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import hotnews from './news/hotnews.vue'
import auctioninfo from './news/auctionInfo.vue'
export default {
	components: {
		hotnews,
		auctioninfo
	},
	data() {
		return {
			aucCount: 10000,
			showimg: require('../../static/img/1a.jpg'),
			blocklist: [
			{
				auctionid: 1,
				auctionname: '顶级珠宝竞品',
				auctiondate: '2017/12/10',
				img: require('../../static/img/1.jpg')
			},
			{
				auctionid: 2,
				auctionname: '顶级珠宝竞品',
				auctiondate: '2017/12/10',
				img: require('../../static/img/2.jpg')
			},
			{
				auctionid: 3,
				auctionname: '顶级珠宝竞品',
				auctiondate: '2017/12/10',
				img: require('../../static/img/3.jpg')
			},
			{
				auctionid: 4,
				auctionname: '顶级珠宝竞品',
				auctiondate: '2017/12/10',
				img: require('../../static/img/4.jpg')
			},
			{
				auctionid: 5,
				auctionname: '顶级珠宝竞品',
				auctiondate: '2017/12/10',
				img: require('../../static/img/5.jpg')
			},
			{
				auctionid: 6,
				auctionname: '顶级珠宝竞品',
				auctiondate: '2017/12/10',
				img: require('../../static/img/6.jpg')
			},{
				auctionid: 7,
				auctionname: '顶级珠宝竞品',
				auctiondate: '2017/12/10',
				img: require('../../static/img/7.jpg')
			},
			{
				auctionid: 8,
				auctionname: '顶级珠宝竞品',
				auctiondate: '2017/12/10',
				img: require('../../static/img/7.jpg')
			},
			{
				auctionid: 9,
				auctionname: '顶级珠宝竞品',
				auctiondate: '2017/12/10',
				img: require('../../static/img/7.jpg')
			},
			{
				auctionid: 10,
				auctionname: '顶级珠宝竞品',
				auctiondate: '2017/12/10',
				img: require('../../static/img/7.jpg')
			}]
		}
	}
}
</script>

<style scoped>
	@import '/static/css/news.css'
</style>