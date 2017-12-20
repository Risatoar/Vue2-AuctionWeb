<template>
	<div>
		<div class="law-wrap">
			<div class="law-body">
				<div class="law-body-top">
					<span class="law-body-top-content">法律法规</span>
				</div>
				<div class="law-body-list">
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
					</div>
					<div class="law-body-list-block" v-for="item in infolist">
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
export default {
	components: {
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
				let res = result.data;
				this.loading = false
				this.infolist = res.result.list;
			});
		}
	}
}
</script>

<style scoped>
@import '/static/css/list.css'
</style>