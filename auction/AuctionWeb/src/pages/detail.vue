<template>
  <div class="detail-wrap">
  	<div class="detail-body">
  		<div class="detail-left">
  		  <div class="left-nav">
  		  	<transition :name="transitionName">
  		  	<router-view name="left" class="child-view"></router-view>
  		  	</transition>
  		  </div>
  		</div>
  		<div class="detail-right">
  			<transition :name="transitionName">
  		    <router-view name="right" class="child-view"></router-view>
  		    </transition>
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
	},
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