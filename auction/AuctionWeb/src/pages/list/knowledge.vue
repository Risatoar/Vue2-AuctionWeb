<template>
	<div>
		<div class="knowledge-wrap">
			<div class="knowledge-body">
				<div class="knowledge-body-top">
					<span class="knowledge-body-top-content" v-touch-ripple>拍卖知识</span>
				</div>
				<div class="knowledge-body-list">
					<div class="knowledge-body-list-block" v-for="item in infolist" v-touch-ripple>
						<div class="list-block-left">
							<img class="left-img" src="../../../static/img/mi6.jpg" >
						</div>
						<div class="list-block-right">
							<h3><a class="block-right-title">{{ item.title }}</a></h3>
							<p class="block-right-description">{{ item.description }}</p>
							<div class="block-right-foot">
								<p>
									<span class="block-right-author">{{ item.author }}</span>
									<i>.</i>
									<span class="block-right-date">{{ item.date }}</span>
								</p>
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
import VueTouchRipple from 'vue-touch-ripple'
export default {
	components: {
		VueTouchRipple
	},
	data() {
		return {
			infolist: []
		}
	},
	mounted() {
		this.getinfo()
	},
	methods: {
		getinfo() {
			axios.get("/information").then((result)=>{
				let res = result.data;
				this.infolist = res.result.list;
			});
		}
	}
}
</script>

<style scoped>
@import '/static/css/list.css'
</style>