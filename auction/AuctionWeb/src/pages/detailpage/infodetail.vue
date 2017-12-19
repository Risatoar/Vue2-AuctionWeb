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
						<div class="detail-loading" v-if="loading"><h1>loading</h1></div>
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
			},
			loading : true
		}
	},
	// created() {
	// 	this.toTest()
	// },
	mounted() {
		this.getUrl()
	},
	watch: {
	  '$route': 'getUrl'
	},
	// beforeRouteEnter (to, from, next) {
	//   getPost(to.params.id, (err, post) => {
	//     next(vm => vm.setData(err, post))
	//   })
	// },
	// // 路由改变前，组件就已经渲染完了
	// // 逻辑稍稍不同
	// beforeRouteUpdate (to, from, next) {
	//   this.post = null
	//   getPost(to.params.id, (err, post) => {
	//     this.setData(err, post)
	//     next()
	//   })
	// },
	methods: {
		// toTest() {
		// 	this.$router.push('/test')
		// },
		getUrl() {
			this.info.infoid = this.$route.params.id;
			console.log(this.info.infoid)
			if(this.info.infoid){
				this.getinfo()
			}
		},
		getinfo() {
			axios.post("/infodetail",this.info).then((res)=> {
				this.loading = false;
				this.infodetaillist = res.data.result.list;
	        }).catch((error)=> {
	          console.log(error);
	        });
		}
	}
}
</script>

<style scoped>
@import '/static/css/detailpage.css'
</style>