<template>
  <div class="detail-wrap">
  	<div class="detail-body">
  		<div class="detail-left">
  		  <div class="left-nav">
  		  	<h1>详<br>情</h1>
  		    <ul v-for="item in showLists">
  		      <router-link :to="{ path: '/detail/'+ item.path }" tag="li" active-class="active" class="left-nav-li">
  		        {{ item.name }}
  		      </router-link>
  		    </ul>
  		  </div>
  		  <div class="left-board"></div>
  		</div>
  		<div class="detail-right">
  		  <keep-alive>
  		    <router-view></router-view>
  		  </keep-alive>
  		</div>
  	</div>
  </div>
</template>

<script>
	export default {
		data() {
			return {
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
		}
	}
</script>

<style scoped>
  @import '/static/css/detail.css'
</style>