<!--
拍卖预告右侧列表组件界面
author：risatoar
date：2017/12/13
-->
<template>
	<!-- 拍卖预告列表组件界面背景层 -->
	<div class="preview-wrap">
		<!-- 拍卖预告列表组件界面主体层 -->
		<div class="preview-body">
			<div class="preview-body-top">
				<!-- 拍卖预告列表组件界面副标题 -->
				<span class="preview-body-top-content">拍卖预告</span>
			</div>
			<!-- 拍卖预告信息列表展示,采用iview的Card组件展示,添加Css3的hover展示阴影效果 -->
			<div class="preview-body-list">
				<div class="preview-body-list-card" v-for="item in prelist">
				    <router-link :to="{path: '/predetail/' + item._id}" v-if= "item.isChecked == true || parseInt((new Date() - new Date(item.date))) <= 2880000">
						<Card style="width:330px">
					        <div style="text-align:center">
					        	<div class="list-card-checked check" v-if="item.isChecked">已审核</div>
					        	<div class="list-card-checked uncheck" v-if="!item.isChecked">{{ checkedWord }}</div>
					            <img v-lazy="'/static/img/uploads/' + item.covermap" style="width:50%;height:148px;margin-bottom:10px;">
					            <li class="preview-card-name">{{ item.title }}</li>
					            <li class="preview-card-startdate">拍卖开始时间： {{ item.startdate }}</li>
					            <li class="preview-card-deadline">拍卖结束时间： {{ item.finaldate }}</li>
					        </div>
					    </Card>
				    </router-link>
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
			prelist: [],
			checkedWord: '未认证'
		}
	},
	mounted() {
		this.getAllPreview()
		this.gotop()
	},
	methods: {
		gotop() {
			window.scrollTo(0,0)
		},
		// 获取拍卖预告消息列表
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