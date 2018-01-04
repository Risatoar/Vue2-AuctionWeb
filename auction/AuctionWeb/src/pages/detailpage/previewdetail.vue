<template>
<div class="previewdetail-wrap">
	<div class="previewdetail-nav">
		<nav class="pre-nav-li">
			<ul>
				<li>首页</li>
				<li>拍卖公告</li>
				<li>法律法规</li>
				<li>拍卖知识</li>
				<li>拍卖预告</li>
			</ul>
		</nav>
	</div>
	<div class="previewdetail-body">
		<div class="previewdetail-information" v-for="item in PreList">
			<div class="previewdetail-information-left">
				<img v-lazy="'/static/img/' + item.image" class="previewdetail-img">
			</div>
			<div class="previewdetail-information-right">
				<!-- 过长的class采用简写 -->
				<div class="pre-info-right-detail">
					<div class="pre-info-right-title">
						<h2>{{ item.title }}</h2>
					</div>
					<div class="pre-content">
						<div class="pre-content-wrap">
							<div class="pre-description"><Icon type="chatbox-working"></Icon><span>{{ item.description }}</span></div>
							<div class="pre-startdate"><Icon type="ios-time"></Icon><span>开始时间</span>{{ item.startdate }}</div>
							<div class="finaldate"><Icon type="ios-stopwatch"></Icon><span>结束时间</span>{{ item.finaldate }}</div>
							<div class="watchcount"><Icon type="eye"></Icon><span>浏览次数</span>{{ item.watchcount }}</div>
							<div class="timeToEnd">
								<span><h2>距离结束还有</h2></span>
								<br>
								<div>10天10时10分10秒</div>
							</div>
						</div>
						<div class="pre-info-right-warning">
							<div class="pre-warning-title">
								拍卖须知
							</div>
							<article>
								<p>佛像，珊瑚，象牙，高额金银珠宝制品，燃气灶，热水器，音响，喇叭，刀具，打火机，电池，精密仪器，药品，高压气体，酒水，易燃易爆品，汽车摩托车配件，动植物等以及其他一切国家禁止入境的商品，无法运输，其中给您造成的损失洋觅网不予承担</p>
								<p>如因您购买了重量或者体积超出邮局规定的商品而造成无法邮寄的损失，洋觅网概不承担，详情请参考邮局运输标准；</p>
								<p>竞拍成功的商品一律不接受以任何形式的原因而造成的弃标，一旦发生弃标行为，洋觅网将扣除该商品金额的30%~50%+53元服务费作为弃标费。</p>
								<p>商品名中出现“垃圾”、“出租”、商品详情不完整、卖家整体信誉过低的商品，不建议竞拍。具体详情请咨询小觅在线客服。</p>
							</article>
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
export default {
	data() {
		return {
			PreList: [
			{
				image: '10.jpg',
				title: 'vue-lazyload',
				description: '用于图片延迟加载的 Vue 模块',
				startdate: '2017-12-01',
				finaldate: '2018-01-02',
				watchcount: '1'
			}
			]
		}
	}
}
</script>

<style>
@import '/static/css/detailpage.css'
</style>