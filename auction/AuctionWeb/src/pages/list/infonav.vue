<template>
	<div class="detailnav" style="background-color: #009bff;">
		<h1>拍卖公告</h1>
	    <ul v-for="item in showsLists">
	      <router-link :to="{ path: '/detail/info/'+ item.path }" tag="li" v-touch-ripple>
	        <Affix :offset-top="item.offsettop">
                <span class="demo-affix">{{ item.name }}</span>
            </Affix>
	      </router-link>
	    </ul>
	</div>
</template>

<script>
import VueTouchRipple from 'vue-touch-ripple'
export default {
	data() {
		return {
			showsLists: [
			{
				name: '拍卖公告',
				path: 'info',
				active: false,
				offsettop: 100,
			},
			{
				name: '法律法规',
				path: 'law',
				active: false,
				offsettop: 150,
			},
			{
				name: '拍卖知识',
				path: 'knowledge',
				active: false,
				offsettop: 200,
			},
			{
				name: '拍卖预告',
				path: 'preview',
				active: false,
				offsettop: 250,
			}]
		}
	}
}
</script>

<style>
@import '/static/css/detail.css'
</style>