<!--
导航详情界面
author：risatoar
date：2017/12/13
-->
<template>
  <!-- 导航详情界面背景层 -->
  <div class="detail-wrap">
  	<!-- 导航详情界面主体 -->
  	<div class="detail-body">
  		<!-- 导航详情界面左侧,利用route-view展示不同的导航 -->
  		<div class="detail-left">
  		  <div class="left-nav">
  		  	<router-view name="left"></router-view>
  		  </div>
  		</div>
  		<!-- 导航详情界面右侧,利用route-view展示不同的消息列表 -->
  		<div class="detail-right">
  		    <router-view name="right" class="child-view"></router-view>
  		</div>
  	</div>
  </div>
</template>

<script>
export default {
	data() {
		return {
			transitionName: 'slide-left',
			showLists: [
			{
				name: '拍卖公告',
				path: 'info',
				active: false
			},
			{
				name: '法律法规',
				path: 'law',
				active: false
			},
			{
				name: '拍卖知识',
				path: 'knowledge',
				active: false
			},
			{
				name: '拍卖预告',
				path: 'preview',
				active: false
			}]
		}
	},
	mounted() {
		this.gotop()
	},
	methods: {
		gotop() {
			window.scrollTo(0,0)
		}
	},
	// 监控路由变化来展示不同的路由过度动画
	watch: {
	    '$route' (to, from) {
	      if(to.path == '/'){
	        this.transitionName = 'slide-right';
	      }else{
	        this.transitionName = 'slide-left';
	      }
	    }
	}
}
</script>

<style>
  @import '/static/css/detail.css'
</style>