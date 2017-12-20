<template>
  <div class="detail-wrap">
  	<div class="detail-body">
  		<div class="detail-left">
  		  <div class="left-nav">
  		  	<router-view name="left" transition="back"></router-view>
  		  </div>
  		</div>
  		<div class="detail-right">
  		    <router-view name="right" transition="back"></router-view>
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