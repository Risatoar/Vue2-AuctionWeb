<template>
	<div class="detailnav" style="background-color: #e53935;s">
		<h1>拍卖预告</h1>
	    <ul v-for="item in showsLists">
	      <router-link :to="{ path: '/detail/preview/'+ item.path }" tag="li">
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
					name: '查看三天以内',
					path: 'info',
					active: false
				},
				{
					name: '查看一周以内',
					path: 'law',
					active: false
				},
				{
					name: '查看一个月内',
					path: 'knowledge',
					active: false
				},
				{
					name: '查看三个月内',
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