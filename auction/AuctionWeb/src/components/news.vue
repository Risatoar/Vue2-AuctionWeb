<!--
主页消息模块
author：risatoar
date：null
-->
<template>
	<div class="message">
		<div class="message-inner">
			<!-- 消息页面主标题 -->
			<div class="message-inner-head">
				<h3>信 息 中 心</h3>
				<div class="line"></div>
				<p>足不出户 即刻网罗天下资讯</p>
			</div>
			<!-- 消息页面最新消息及消息列表筛选模块 -->
			<div class="message-inner-top">
				<div class="message-inner-top-background">
					<div class="message-inner-top-left">
						<!-- 左侧导入最新消息（hotnews）组件 -->
						<hotnews></hotnews>
					</div>
					<div class="message-inner-top-right">
						<!-- 右侧导入消息列表筛选展示组件（auctioninfo） -->
						<auctioninfo></auctioninfo>
					</div>
				</div>
			</div>
			<!-- 消息页面中间段部分区块 -->
			<div class="message-inner-middle">
				<!-- 中间段区块标题,展示到目前为止已经登记了多少件拍卖品 -->
				<div class="message-inner-middle-title">
					<li>我们的拍卖网站已经登记<b>{{ aucCount }}</b>件拍卖品</li>
				</div>
				<!-- 中间段内容部分 -->
				<div class="message-inner-middle-body">
					<!-- 内容部分采用flex布局,每一个数据集以卡片形式展示,展示时间靠前的15条信息 -->
					<div class="message-preview-list">
						<ul>
							<li v-for="(item,index) in blocklist">
								<span v-if="index<=14">
									<!-- 采用iview的poptip为每个卡片提供消息提示样式 -->
									<Poptip trigger="hover" title="点击“查看详情页”按钮能看更多消息">
										<div class="message-preview-list-listcard">
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
												  <router-link class="btn btn-info detailbtn" :to="{path: '/predetail/' + item._id}" v-touch-ripple>查看详情页</router-link>
											</div>
										</div>
									</Poptip>
								</span>
							</li>
						</ul>
					</div>
				</div>
				<!-- 消息页面foot段部分区块 -->
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