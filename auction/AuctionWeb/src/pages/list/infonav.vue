<template>
	<div class="detailnav" style="background-color: #009bff;">
		<h1>拍卖公告</h1>
	    <ul v-for="item in showsLists">
	      <router-link :to="{ path: '/detail/info/'+ item.path }" tag="li">
	        {{ item.name }}
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
		}
	}
</script>

<style>
@import '/static/css/detail.css'
</style>