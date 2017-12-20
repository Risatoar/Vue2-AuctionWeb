<template>
	<div>
		<div class="infodetail-wrap">
			<div class="infodetail-body">
				<div class="infodetail-body-top">
					<span class="infodetail-body-top-content" v-touch-ripple>Title:{{ infodetaillist.title }}</span>
					<!-- <vue-star animate="animated rubberBand" color="#F05654">
					    <a slot="icon" class="fa fa-heart" @click="handleClick"></a>
					  </vue-star> -->
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
						<Row :gutter="32">
						       <i-col span="12" class="demo-tabs-style1" style="background: #e3e8ee;padding:16px;width:100%;height:1642px;">
						           <Tabs type="card">
						               <Tab-pane label="消息简介">
						               	<div >
						               		<p style="padding-top:5px;padding-bottom:5px;font-size:24px;color:#464c5b;font-family:Main Head;font-weight: bold;">
						               		  {{ infodetaillist.title }}
						               		</p>
						               		<p style="padding-top:5px;font-size:14px;color:#464c5b;font-family:Main Head;font-weight: bold;">
						               		  <Icon type="person"></Icon>  作者：{{ infodetaillist.author }} | <Icon type="calendar"></Icon>  发布时间：{{ infodetaillist.date }} | <Icon type="wand"></Icon>  评分: {{ firstStars }} 颗星
						               		</p>
						               		<div style="margin-top:50px;">
						               			<!-- <Rate show-text :value.sync="valueCustomText">
						               			                <span style="color: #f5a623">{{ valueCustomText }}</span>
						               			            </Rate> -->
						               			<Rate show-text :value.sync="valueHalf" @on-change="clickstar" v-model="stars"></Rate>
						               		</div>
						               		<i-button @click="success" v-if="false"></i-button>
						               		<i-button @click="error" v-if="false"></i-button>
						               		<span >觉得内容怎么样？给作者打个星吧！</span>
						               		<div style="padding:60px;width:600px;margin:0 auto;">
	   						               		<Card :bordered="false">
	   			               		                <p slot="title">消息简介</p>
	   			               		                <p>{{ infodetaillist.title }}</p>
	   			               		            </Card>
						               		</div>
						               	</div>
						               </Tab-pane>
						               <Tab-pane label="详情页面">
						               	<p style="padding:20px 20px;font-size:16px;float:left;text-indent:25px;color:#657180;font-family:Text">{{ infodetaillist.description }}</p>
						               </Tab-pane>
						           </Tabs>
						       </i-col>
						</Row>
						<!-- <div class="infode-head">
							<h2>{{ infodetaillist.title }}</h2>
							<p>作者：{{ infodetaillist.author }}</p>
							<p>发布时间：{{ infodetaillist.date }}</p>
						</div>
						<div class="infode-body">
							<p>
								内容：{{ infodetaillist.description }}
							</p>
						</div>
						<div class="infode-foot">所有解释权归本网站所有</div> -->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import VueTouchRipple from 'vue-touch-ripple'
import VueStar from 'vue-star'
export default {
	components: {
		VueTouchRipple,
		VueStar
	},
	data() {
		return {
			infodetaillist: [],
			info: {
				infoid:''
			},
			stars: 3,
			firstStars: null,
			loading : true,
			valueHalf: 3,
			valueCustomText: 3,
			isFirstStar: true,
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
		},
		clickstar() {
			if(this.isFirstStar){
				this.isFirstStar = false;
				this.firstStars = this.stars;
				this.success()
			}else {
				this.error()
			}
		},
		success () {
			this.$Message.config({
           	 duration: 3
            })
            this.$Message.success('评分成功');
        },
        error () {
           this.$Message.config({
           	duration: 5
           })
           this.$Message.error('对方不想说话，并告诉你只有你的第一次评分才会被记录');
        }

	}
}
</script>

<style scoped>
@import '/static/css/detailpage.css'
</style>