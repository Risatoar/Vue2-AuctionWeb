<!--
拍卖预告左侧导航组件界面
author：risatoar
date：2017/12/13
-->
<template>
	<div class="detailnav" style="background-color: #e53935">
		<h1>拍卖预告</h1>
	    <ul v-for="item in showsLists">
	      <router-link :to="{ path: '/detail/preview/'+ item.path }" tag="li">
	      	<!-- 利用iview的Affix组件实现图钉效果 -->
	        <Affix :offset-top="item.offsettop">
                <span class="demo-affix">{{ item.name }}</span>
            </Affix>
	      </router-link>
	    </ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				showsLists: [
				{
					name: '查看三天以内',
					path: 'info',
					active: false,
				    offsettop: 100,
				},
				{
					name: '查看一周以内',
					path: 'law',
					active: false,
				    offsettop: 150,
				},
				{
					name: '查看一个月内',
					path: 'knowledge',
					active: false,
				    offsettop: 200,
				},
				{
					name: '查看三个月内',
					path: 'preview',
					active: false,
				    offsettop: 250,
				}]
			}
		}
	}
</script>

<style scoped>
@import '/static/css/listnav.css'
</style>