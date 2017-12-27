<template>
	<div>
		<div class="info-wrap">
			<div class="info-body">
				<div class="info-body-top">
					<span class="info-body-top-content" v-touch-ripple>最新消息</span>
				</div>
				<div class="info-body-list">
					<div v-if="loading">
						<content-placeholders v-if="loading">
						  <content-placeholders-heading :img="true" />
						</content-placeholders>
						<br><br>
						<content-placeholders v-if="loading">
						  <content-placeholders-heading :img="true" />
						</content-placeholders>
						<br><br>
						<content-placeholders v-if="loading">
						  <content-placeholders-heading :img="true" />
						</content-placeholders>
						<br><br>
						<content-placeholders v-if="loading">
						  <content-placeholders-heading :img="true" />
						</content-placeholders>
						<br><br>
						<content-placeholders v-if="loading">
						  <content-placeholders-heading :img="true" />
						</content-placeholders>
						<br><br>
						<content-placeholders v-if="loading">
						  <content-placeholders-heading :img="true" />
						</content-placeholders>
						<br><br>
					</div>
					<div v-for="item in infolist">
						<router-link  :to="{path: 'pages/' + item._id}">
							<div class="info-body-list-block" v-touch-ripple>
								<div class="list-block-left">
									<img class="left-img" src="/static/img/mi6.jpg" >
								</div>
								<div class="list-block-right">
									<h3><a class="block-right-title">{{ item.title }}</a></h3>
									<p class="block-right-description" v-html="item.description">
									</p>
									<div class="block-right-foot">
										<p>
											<span class="block-right-author">{{ item.author }}</span>
											<span class="block-right-date">{{ item.date }}</span>
										</p>
									</div>
								</div>
							</div>
						</router-link>
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
			infolist: [],
			loading: true
		}
	},
	mounted() {
		this.getinfo()
	},
	methods: {
		getinfo() {
			axios.get("/information").then((result)=>{
				this.loading = false;
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