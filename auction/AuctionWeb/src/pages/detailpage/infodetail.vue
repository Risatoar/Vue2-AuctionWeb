<!--
拍卖公告信息详情界面
author：risatoar
date：2017/12/20
-->
<template>
	<!-- 拍卖公告详情页面背景 -->
	<div class="infodetail-wrap">
		<!-- 拍卖公告详情页面内容部分 -->
		<div class="infodetail-body">
			<!-- 拍卖公告详情页面顶部标题,根据数据库查询结果异步更改标题 -->
			<div class="infodetail-body-top">
				<span class="infodetail-body-top-content" v-touch-ripple>Title:{{ infodetaillist.title }}</span>
			</div>
			<!-- 拍卖公告详情页面顶部标题,根据数据库查询结果异步更改标题 -->
			<div class="infodetail-body-wrap">
				<!-- 页面加载时loading动画 -->
				<div class="detail-loading" v-if="loading"><h1>loading</h1></div>
				<!-- 采用iview的tabs组件来分布展示拍卖公告详细信息 -->
				<Row :gutter="32">
				       <i-col span="12" class="demo-tabs-style1" style="background: #e3e8ee;padding:16px;width:100%;height:100%;">
				       	<!-- tab分为两个区块：消息简介/详情页面 -->
				           <Tabs type="card">
				               <Tab-pane label="消息简介">
				               	<div style="text-align:center;">
				               		<p style="padding-top:5px;padding-bottom:5px;font-size:24px;color:#464c5b;font-family:Main Head;font-weight: bold;">
				               		  {{ infodetaillist.title }}
				               		</p>
				               		<p style="padding-top:5px;font-size:14px;color:#464c5b;font-family:Main Head;font-weight: bold;">
				               		  <Icon type="person"></Icon>  作者：{{ infodetaillist.author }} | <Icon type="calendar"></Icon>  发布时间：{{ infodetaillist.date }} | <Icon type="wand"></Icon>  评分: {{ infodetaillist.stars }} 颗星
				               		</p>
				               		<!-- 评分区块利用iview的rate组件实现 -->
				               		<div style="margin-top:50px;">
				               			<Rate show-text :value.sync="valueHalf" @on-change="clickstar" v-model="stars"></Rate>
				               		</div>
				               		<span>觉得内容怎么样？给作者打个星吧！</span>
				               		<div style="padding:60px;width:600px;margin:0 auto;">
					               		<Card :bordered="false">
		               		                <p slot="title">消息简介</p>
		               		                <p>{{ infodetaillist.description }}</p>
		               		            </Card>
				               		</div>
				               	</div>
				               </Tab-pane>
				               <!-- 详情页面tab展示 -->
				               <Tab-pane label="详情页面">
				               	<p style="padding:20px 20px;font-size:16px;float:left;text-indent:25px;color:#657180;font-family:Text;line-height:2;" v-html="infodetaillist.maintext"></p>
				               </Tab-pane>
				           </Tabs>
				       </i-col>
				</Row>
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
	mounted() {
		this.getUrl()
		this.gotop()
	},
	// 利用vue的watch来监控路由变化,执行getUrl函数
	watch: {
	  '$route': 'getUrl'
	},
	methods: {
		gotop() {
			window.scrollTo(0,0)
		},
		// 获取当前url的params所带的id属性,赋值给info对象的infoid属性
		getUrl() {
			this.info.infoid = this.$route.params.id;
			if(this.info.infoid){
				this.getinfo()
			}
		},
		// 通过infoid查询对应的详情信息
		getinfo() {
			axios.post("/infodetail",this.info).then((res)=> {
				this.loading = false;
				this.infodetaillist = res.data.result.list;
	        }).catch((error)=> {
	          console.log(error);
	        });
		},
		// 判断当前评分是否为第一次评分
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

<style>
@import '/static/css/detailpage.css'
</style>