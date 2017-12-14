<template>
	<div class="detailnav" style="background-color: #6D4C41;">
		<h1>拍卖知识</h1>
	    <ul v-for="item in showsLists">
	      <router-link :to="{ path: '/detail/knowledge/'+ item.path }" tag="li">
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

<style scoped>
@import '/static/css/listnav.css'
</style>