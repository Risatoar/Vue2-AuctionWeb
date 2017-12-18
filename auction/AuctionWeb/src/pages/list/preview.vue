<template>
	<div>
		<div class="preview-wrap">
			<div class="preview-body">
				<div class="preview-body-top">
					<span class="preview-body-top-content">拍卖预告</span>
				</div>
				<div class="preview-body-list">
						<div class="preview-body-list-card" v-for="item in prelist"  @click="refreshpage">
						    <router-link :to="{path: 'preview/auctionname/' + item._id}">
								<div class="preview-card-top">
									<img class="preview-card-img" src="../../../static/img/mi6.jpg" >
								</div>
								<ul>
									<li class="preview-card-name">{{ item.name }}</li>
									<li class="preview-card-date">开始时间： {{ item.date }}</li>
									<li class="preview-card-rest">剩余时间： {{ item.rest }}</li>
								</ul>
						    </router-link>
						</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import { touchRipple } from 'vue-touch-ripple'
export default {
	components: {
		touchRipple
	},
	data() {
		return {
			prelist: [
			{
				name: 'm16',
				date: '2017-12-14 13:14',
				rest: '5天'
			},
			{
				name: 'm16',
				date: '2017-12-14 13:14',
				rest: '5天'
			},{
				name: 'm16',
				date: '2017-12-14 13:14',
				rest: '5天'
			},
			{
				name: 'm16',
				date: '2017-12-14 13:14',
				rest: '5天'
			},
			{
				name: 'm16',
				date: '2017-12-14 13:14',
				rest: '5天'
			},
			{
				name: 'm16',
				date: '2017-12-14 13:14',
				rest: '5天'
			},{
				name: 'm16',
				date: '2017-12-19',
				rest: '5天'
			}]
		}
	},
	mounted() {
		// this.getinfo()
	},
	methods: {
		// getinfo() {
		// 	axios.get("/information").then((result)=>{
		// 		let res = result.data;
		// 		this.infolist = res.result.list;
		// 	});
		// }
		refreshpage() {
			this.$router.go(0)
		}
	}
}
</script>

<style scoped>
@import '/static/css/list.css'
</style>