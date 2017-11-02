<template>
	<div id="HomepageNews">
		<div class="NewsHead">
			<em><a>拍</a></em>
			<em><a>卖</a></em>
			<em><a>公</a></em>
			<em><a>告</a></em>
		</div>
		<NewsBody></NewsBody>
	</div>
</template>

<script>
import NewsBody from '../components/NewsBody.vue'
export default{
	name: 'HomepageNews',
    components: {NewsBody}
}
</script>

<style scoped>
#HomepageNews{
	width: 100%;
	height: 800px;
}
.NewsHead{
	margin-top: 20px;
	font-weight: bolder;
	font-size: 24px;
}
</style>