<!--
主页消息模块
author：risatoar
date：null
-->
<template>
	<div>
		<div class="message">
			<div class="message-inner">
				<div class="message-inner-head">
					<h3>信 息 中 心</h3>
					<div class="line"></div>
					<p>足不出户 即刻网罗天下资讯</p>
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
						<li>我们的拍卖网站已经登记<b>{{ aucCount }}</b>件拍卖品</li>
					</div>
					<div class="message-inner-middle-body">
						<div class="auctionlist">
							<ul>
								<li v-for="(item,index) in blocklist">
									<span v-if="index<=14">
										<Poptip trigger="hover" title="点击“查看详情页”按钮能看更多消息">
											<div class="listcard">
												<div class="pic">
													<img v-lazy="'/static/img/' + item.image" class="card-img" >
													<div class="detailwrap">
														<ul>
															<li>发布人:{{ item.author }}</li>
															<li>浏览:{{ item.watchcount }}次</li>
															<li>描述:{{ item.description }}</li>
														</ul>
													</div>
												</div>
												<div class="mainmsg">
													<div class="auctionname">{{ item.title }}</div>
													<div class="auctiondate">{{ item.startdate }}-{{ item.finaldate }}</div>
													  <router-link class="btn btn-info detailbtn" :to="{path: '/detail/preview/auctionname/' + item._id}" v-touch-ripple>查看详情页</router-link>
												</div>
											</div>
										</Poptip>
									</span>
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
									<li class="col-md-4 asda">
										<h3>注册帐号完全免费</h3>
										<p>注册你的专属企业账户。</p>
									</li>
									<li class="col-md-4">
										<h3>每日资讯一手送达</h3>
										<p>为您推送每日消息</p>
									</li>
									<li class="col-md-4">
										<h3>交易付款安全可靠</h3>
										<p>选择您的付款方式提交您的支付款项。</p>
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
import axios from 'axios'
import hotnews from './news/hotnews.vue'
import auctioninfo from './news/auctionInfo.vue'
export default {
	components: {
		hotnews,
		auctioninfo
	},
	data() {
		return {
			aucCount: '',
			showimg: require('../../static/img/1a.jpg'),
			blocklist: []
		}
	},
	mounted() {
		this.getAllPreview()
	},
	methods: {
		getAllPreview() {
			axios.get("/allpreviews").then((result)=>{
				let res = result.data;
				this.blocklist = res.result.list;
				this.aucCount = res.result.count;
			});
		}
	}
}
</script>

<style scoped>
	@import '/static/css/news.css'
</style>