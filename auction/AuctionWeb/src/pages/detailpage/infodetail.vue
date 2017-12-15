<template>
	<div>
		<div class="infodetail-wrap">
			<div class="infodetail-body">
				<div class="infodetail-body-top">
					<span class="infodetail-body-top-content" v-touch-ripple>最新消息:{{ infodetaillist.title }}</span>
				</div>
				<div class="infodetail-body">
					<!-- <ul>
						<li>{{ infodetaillist._id }}</li>
						<li>{{ infodetaillist.author }}</li>
						<li>{{ infodetaillist.date }}</li>
						<li>{{ infodetaillist.title }}</li>
						<li>{{ infodetaillist.description }}</li>
					</ul> -->
					<div class="infodetail-body-wrap">
						<div class="infode-head">
							<h2>{{ infodetaillist.title }}</h2>
							<p>作者：{{ infodetaillist.author }}</p>
							<p>发布时间：{{ infodetaillist.date }}</p>
						</div>
						<div class="infode-body">
							<p>
								内容：{{ infodetaillist.description }}
							</p>
						</div>
						<div class="infode-foot">所有解释权归本网站所有</div>
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
			infodetaillist: [],
			info: {
				infoid:''
			}
		}
	},
	mounted() {
		this.getId()
		this.getinfo()
	},
	methods: {
		getinfo() {
			axios.post("/infodetail",this.info).then((res)=> {
				this.infodetaillist = res.data.result.list;
	        }).catch((error)=> {
	          console.log(error);
	        });
		},
		getId() {
			this.info.infoid = this.$route.params.id
		}
	}
}
</script>

<style scoped>
@import '/static/css/detailpage.css'
</style>