<template>
	<div>
		<div class="message">
			<div class="message-inner">
				<div class="message-inner-head">
					<a>信</a>
					<a>息</a>
					<a>中</a>
					<a>心</a>
					<div class="line"></div>
					<p>随时掌握行业动态 即刻了解热点资讯</p>
				</div>
				<div class="message-inner-body">
					<div class="message-inner-body-left">
						<hotnews></hotnews>
					</div>
					<div class="message-inner-body-right">
						<auctioninfo></auctioninfo>
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
	}
}
</script>

<style scoped>
	@import '/static/css/news.css'
</style>