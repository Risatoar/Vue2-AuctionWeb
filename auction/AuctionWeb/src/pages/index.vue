<!--
主页组件界面
author：risatoar
date：2017/10/29
-->
<template>
	<div>
	  <news></news>
	</div>
</template>

<script>
import news from '../components/news.vue'
export default {
	components: {
		news
	}
}
</script>

<style scoped>
.particles{
	z-index: 0;
}
</style>