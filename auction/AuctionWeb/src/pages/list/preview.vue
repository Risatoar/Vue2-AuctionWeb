<template>
	<div>
		<div class="preview-wrap">
			<div class="preview-body">
				<div class="preview-body-top">
					<span class="preview-body-top-content">拍卖预告</span>
				</div>
				<div class="preview-body-list">
					<div class="preview-body-list-card" v-for="item in prelist">
					    <router-link :to="{path: 'preview/auctionname/' + item._id}">
							<!-- <div class="preview-card-top">
								<img class="preview-card-img" src="../../../static/img/mi6.jpg" >
							</div>
							<ul>
								<li class="preview-card-name">{{ item.name }}</li>
								<li class="preview-card-date">开始时间： {{ item.date }}</li>
								<li class="preview-card-rest">剩余时间： {{ item.rest }}</li>
							</ul> -->

							<Card style="width:330px">
						        <div style="text-align:center">
						            <img v-lazy="'/static/img/' + item.image" style="width:50%">
						            <li class="preview-card-name">{{ item.title }}</li>
						            <li class="preview-card-startdate">拍卖开始时间: {{ item.startdate }}</li>
						            <li class="preview-card-deadline">拍卖结束时间： {{ item.finaldate }}</li>
						        </div>
						    </Card>
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
			loading: true,
			prelist: []
		}
	},
	mounted() {
		this.getAllPreview()
	},
	methods: {
		getAllPreview() {
			axios.get("/allpreviews").then((result)=>{
				let res = result.data;
				this.prelist = res.result.list;
			});
		}
	}
}
</script>

<style scoped>
@import '/static/css/list.css'
</style>