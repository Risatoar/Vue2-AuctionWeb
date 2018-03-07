<!--
拍卖公告信息详情界面
author：risatoar
date：2017/12/20
-->
<template>
	<!-- 拍卖公告详情页面背景 -->
	<div class="knowledgedetail-wrap">
		<!-- 拍卖公告详情页面内容部分 -->
		<div class="knowledgedetail-body">
			<!-- 拍卖公告详情页面顶部标题,根据数据库查询结果异步更改标题 -->
			<div class="knowledgedetail-body-top">
				<span class="knowledgedetail-body-top-content" v-touch-ripple>Title:{{ knowledgedetaillist.title }}</span>
			</div>
			<!-- 拍卖公告详情页面顶部标题,根据数据库查询结果异步更改标题 -->
			<div class="knowledgedetail-body-wrap">
				<!-- 采用iview的tabs组件来分布展示拍卖公告详细信息 -->
				<Row :gutter="32">
				       <i-col span="12" class="demo-tabs-style1" style="background: #e3e8ee;padding:16px;width:100%;height:100%;">
				       	<!-- tab分为两个区块：消息简介/详情页面 -->
				           <Tabs type="card">
				               <Tab-pane label="消息简介">
				               	<div style="text-align:center;">
				               		<p style="padding-top:5px;padding-bottom:5px;font-size:24px;color:#464c5b;font-family:Main Head;font-weight: bold;">
				               		  {{ knowledgedetaillist.title }}
				               		</p>
				               		<p style="padding-top:5px;font-size:14px;color:#464c5b;font-family:Main Head;font-weight: bold;">
				               		  <Icon type="person"></Icon>  作者：{{ knowledgedetaillist.author }} | <Icon type="calendar"></Icon>  发布时间：{{ knowledgedetaillist.date }}
				               		</p>
				               		<div style="padding:60px;width:600px;margin:0 auto;">
					               		<Card :bordered="false">
		               		                <p slot="title">消息简介</p>
		               		                <p>{{ knowledgedetaillist.description }}</p>
		               		            </Card>
				               		</div>
				               	</div>
				               </Tab-pane>
				               <!-- 详情页面tab展示 -->
				               <Tab-pane label="详情页面">
				               	<p style="padding:20px 20px;font-size:16px;float:left;text-indent:25px;color:#657180;font-family:Text;line-height:2;" v-html="knowledgedetaillist.maintext"></p>
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
			knowledgedetaillist: [],
			knowledge: {
				knowledgeid:''
			},
			stars: 3,
			firstStars: null,
			valueHalf: 3,
			valueCustomText: 3,
			isFirstStar: true,
		}
	},
	mounted() {
		this.getUrl()
	},
	// 利用vue的watch来监控路由变化,执行getUrl函数
	watch: {
	  '$route': 'getUrl'
	},
	methods: {
		// 获取当前url的params所带的id属性,赋值给info对象的infoid属性
		getUrl() {
			this.knowledge.knowledgeid = this.$route.params.id;
			if(this.knowledge.knowledgeid){
				this.getKnowledge()
				this.postPv()
			}
		},
		// 通过infoid查询对应的详情信息
		getKnowledge() {
			axios.post("/knowledge/detail",this.knowledge).then((res)=> {
				this.knowledgedetaillist = res.data.result.list;
	        }).catch((error)=> {
	          console.log(error);
	        });
		},
		// 记录当前页面被访问的pv
		postPv() {
			axios.post("/pv/knowledge/add",{
				knowledge_id: this.$route.params.id,
				pvid: returnCitySN["cip"]
			}).then((res)=> {
	        }).catch((error)=> {
	          console.log(error);
	        });
		}
	}
}
</script>

<style>
@import '/static/css/detailpage.css'
</style>